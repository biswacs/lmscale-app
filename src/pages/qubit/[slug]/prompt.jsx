import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { QubitLayout } from "@/components/_shared/qubit-layout";

const PromptDisplay = () => {
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [updateStatus, setUpdateStatus] = useState('');
  const router = useRouter();
  const qubitId = router.query.slug;

  useEffect(() => {
    fetchPrompt();
  }, [qubitId]);

  const fetchPrompt = async () => {
    if (!qubitId) return;
    
    const lm_auth_token = localStorage.getItem('lm_auth_token');
    
    if (!lm_auth_token) {
      setError('Authentication token not found. Please login again.');
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch(`https://api.lmscale.tech/v1/prompt/get?qubitId=${qubitId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${lm_auth_token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prompt');
      }

      const responseData = await response.json();
      
      if (responseData.success && responseData.data && responseData.data.prompt) {
        setPrompt(responseData.data.prompt);
      } else {
        setPrompt('No prompt available');
      }
    } catch (err) {
      setError('Error fetching prompt. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleUpdate = async () => {
    const lm_auth_token = localStorage.getItem('lm_auth_token');
    
    if (!lm_auth_token) {
      setError('Authentication token not found. Please login again.');
      return;
    }

    try {
      setUpdateStatus('Updating...');
      const response = await fetch('https://api.lmscale.tech/v1/prompt/update', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${lm_auth_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          qubitId: qubitId,
          prompt: prompt
        })
      });

      const data = await response.json();

      if (data.success) {
        setUpdateStatus('Updated successfully!');
        setTimeout(() => setUpdateStatus(''), 3000);
      } else {
        throw new Error(data.message || 'Failed to update prompt');
      }
    } catch (err) {
      setError('Error updating prompt. Please try again.');
      setUpdateStatus('');
      console.error('Error:', err);
    }
  };

  return (
    <QubitLayout>
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Prompt Display</h2>
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              disabled={loading}
            >
              Update Prompt
            </button>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg text-center">
              {error}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-sm text-gray-500">
                Qubit ID: {qubitId}
              </div>
              {updateStatus && (
                <div className="bg-green-50 text-green-600 p-2 rounded-lg text-center">
                  {updateStatus}
                </div>
              )}
              <textarea
                className="w-full min-h-[400px] p-4 border-2 border-gray-200 rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          bg-white text-gray-800 text-base resize-y"
                value={prompt}
                onChange={handlePromptChange}
                placeholder="Enter your prompt here..."
              />
            </div>
          )}
        </div>
      </div>
    </div>
    </QubitLayout>
  );
};

export default PromptDisplay;