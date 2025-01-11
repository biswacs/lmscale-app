import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Plus, Calendar, Loader2 } from "lucide-react";
import { useQubits } from "@/providers/qubits-provider";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-md shadow-xl relative animate-in fade-in duration-200">
        {children}
      </div>
    </div>
  );
}

function CreateQubitModal({ isOpen, onClose }) {
  const { createQubit } = useQubits();
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputError, setInputError] = useState("");

  const handleClose = () => {
    setFormData({ name: "" });
    setError(null);
    setInputError("");
    onClose();
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    if (value.length > 24) {
      setInputError("Name cannot exceed 24 characters");
    } else {
      setInputError("");
    }
    setFormData({ name: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = formData.name.trimEnd();

    if (trimmedName.length === 0) {
      setInputError("Name cannot be empty");
      return;
    }

    if (trimmedName.length > 24) {
      setInputError("Name cannot exceed 24 characters");
      return;
    }

    setIsLoading(true);
    setError(null);
    setInputError("");

    try {
      const result = await createQubit({ name: trimmedName });
      if (result?.data?.qubit?.id) {
        handleClose();
        router.push(`/qubit/${result.data.qubit.id}`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="border-b border-neutral-100">
        <div className="flex items-center justify-between px-6 py-3 bg-neutral-900">
          <h2 className="text-lg text-neutral-200">Create New Qubit</h2>
          <button
            onClick={handleClose}
            className="text-neutral-200 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {error && (
          <div className="mb-4 bg-red-50 border border-neutral-100 text-red-600 p-3 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-sm text-neutral-700">Qubit Name</label>
          <div className="space-y-1">
            <input
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              maxLength={24}
              placeholder="Enter qubit name"
              className={`w-full h-10 border px-3 text-sm 
                       placeholder:text-neutral-400 focus:outline-none focus:ring-1 
                       ${
                         inputError
                           ? "border-red-500 focus:ring-red-500"
                           : "border-neutral-200 focus:ring-neutral-400"
                       }
                       focus:border-transparent`}
              required
            />
            {inputError && <p className="text-sm text-red-500">{inputError}</p>}
            <p className="text-xs text-neutral-500">
              {formData.name.length}/24 characters
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-sm text-neutral-600 hover:text-neutral-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading || inputError}
            className="px-4 py-2 bg-neutral-900 text-sm text-white 
                     hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed 
                     flex items-center justify-center min-w-[100px]"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Create Qubit"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function CreateQubitCard({ onClick }) {
  return (
    <button onClick={onClick} className="block w-full h-full">
      <div className="h-full p-6 border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm transition-all duration-200  flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <h3 className="text-xl text-neutral-900">Create New Qubit</h3>
          <div className="size-10 border border-neutral-300 bg-neutral-50 flex items-center justify-center">
            <Plus className="h-5 w-5 text-neutral-600" />
          </div>
        </div>

        <div className="mt-4 text-start">
          <p className="text-neutral-600">Start building with a new qubit</p>
        </div>
      </div>
    </button>
  );
}

function QubitCard({ qubit }) {
  return (
    <Link href={`/qubit/${qubit.id}`} className="block h-full">
      <div className="h-full p-6 border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm transition-all duration-200 ">
        <div className="flex items-center justify-between">
          <h3 className="text-xl text-neutral-900">{qubit.name}</h3>
          <span
            className={`flex items-center gap-1.5 text-sm ${
              qubit.isActive ? "text-green-500" : "text-yellow-500"
            }`}
          >
            <span
              className={`size-2 rounded-full ${
                qubit.isActive ? "bg-green-500" : "bg-yellow-500"
              }`}
            />
            {qubit.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Calendar className="h-4 w-4" />
            {new Date(qubit.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function QubitsContainer() {
  const { qubits, isLoading, error, isCreateModalOpen, setIsCreateModalOpen } =
    useQubits();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-neutral-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full font-light">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <CreateQubitCard onClick={() => setIsCreateModalOpen(true)} />
            {qubits.map((qubit) => (
              <QubitCard key={qubit.id} qubit={qubit} />
            ))}
          </div>
        </div>
      </div>

      <CreateQubitModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
