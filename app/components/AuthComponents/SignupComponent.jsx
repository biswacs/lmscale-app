"use client";
import React, { useState } from "react";
import { Loader, MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";

const SignupComponent = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "",
    expectedUsage: "",
  });

  const handleNextStep = (e) => {
    e.preventDefault();
    setAttemptedSubmit(true);

    if (!formData.email || !formData.password) {
      return;
    }

    setStep(2);
    setAttemptedSubmit(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setAttemptedSubmit(true);

    if (!formData.userType) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://server.lmscale.tech/v1/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create account");
      }

      const data = await response.json();
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getInputClassName = (field) => {
    const baseClasses =
      "w-full pl-3 pr-3 py-1.5 border bg-white/50 backdrop-blur-sm transition-all duration-200 focus:outline-none";
    const isEmpty = attemptedSubmit && !formData[field];

    if (isEmpty) {
      return `${baseClasses} border-rose-400 focus:border-rose-500`;
    }
    return `${baseClasses} border-neutral-200 focus:border-neutral-400`;
  };

  const getRadioClassName = (selected) => {
    return `relative flex items-center justify-between w-full p-4 cursor-pointer border transition-all ${
      selected
        ? "border-neutral-900 bg-neutral-50"
        : "border-neutral-200 hover:border-neutral-300"
    }`;
  };

  const usageOptions = [
    {
      value: "hobby",
      label: "Less than 100K tokens",
      description: "Perfect for small projects and testing",
    },
    {
      value: "startup",
      label: "100K - 1M tokens",
      description: "Ideal for growing applications",
    },
    {
      value: "business",
      label: "1M - 10M tokens",
      description: "For production workloads",
    },
    {
      value: "enterprise",
      label: "10M+ tokens",
      description: "Enterprise-scale deployments",
    },
    {
      value: "undecided",
      label: "No idea yet",
      description: "Still exploring options",
    },
  ];

  return (
    <div className="relative min-h-screen bg-white">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px] md:bg-[size:32px_32px]"
          style={{
            mask: "radial-gradient(circle at center, white 30%, transparent 70%)",
            WebkitMask:
              "radial-gradient(circle at center, white 30%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-md px-4">
        <div className="flex min-h-screen flex-col items-center justify-center py-16 md:py-24">
          <div className="w-full">
            <div className="mb-6 md:mb-8 inline-flex items-center justify-center w-full">
              <a href="/" className="flex items-center gap-2">
                <img
                  src="/icon.png"
                  alt="LmScale Logo"
                  className="h-9 w-9 object-contain"
                />
                <span className="text-xl sm:text-4xl font-light text-neutral-800">
                  LmScale
                </span>
              </a>
            </div>

            <div className="relative w-full p-4 shadow-md bg-white">
              <form
                onSubmit={step === 1 ? handleNextStep : handleSignup}
                className="relative space-y-6 p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg font-medium">Create Account</div>
                  <div className="text-sm text-neutral-500">
                    Step {step} of 2
                  </div>
                </div>

                {error && (
                  <div className="text-sm mb-4 bg-rose-50 p-3 border border-rose-200 text-rose-500">
                    {error}
                  </div>
                )}

                <div className="space-y-6">
                  {step === 1 ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label
                          className="text-sm text-neutral-600"
                          htmlFor="email"
                        >
                          Work Email
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className={getInputClassName("email")}
                            placeholder="name@company.com"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          className="text-sm text-neutral-600"
                          htmlFor="password"
                        >
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            id="password"
                            name="password"
                            className={getInputClassName("password")}
                            placeholder="8+ characters"
                            value={formData.password}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-sm text-neutral-600">
                          I am a...
                        </label>
                        <div className="grid grid-cols-1 gap-3">
                          <label
                            className={getRadioClassName(
                              formData.userType === "founder"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <div>
                                <div className="font-medium">
                                  Founder / Business
                                </div>
                                <div className="text-sm text-neutral-500">
                                  Building an AI-powered product
                                </div>
                              </div>
                            </div>
                            <input
                              type="radio"
                              name="userType"
                              value="founder"
                              checked={formData.userType === "founder"}
                              onChange={handleChange}
                              className="absolute opacity-0"
                            />
                          </label>

                          <label
                            className={getRadioClassName(
                              formData.userType === "developer"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <div>
                                <div className="font-medium">Developer</div>
                                <div className="text-sm text-neutral-500">
                                  Integrating LLMs into applications
                                </div>
                              </div>
                            </div>
                            <input
                              type="radio"
                              name="userType"
                              value="developer"
                              checked={formData.userType === "developer"}
                              onChange={handleChange}
                              className="absolute opacity-0"
                            />
                          </label>
                        </div>
                      </div>

                      {formData.userType && (
                        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4">
                          <label className="text-sm text-neutral-600">
                            Expected monthly usage
                          </label>
                          <div className="grid grid-cols-1 gap-3">
                            {usageOptions.map((option) => (
                              <label
                                key={option.value}
                                className={getRadioClassName(
                                  formData.expectedUsage === option.value
                                )}
                              >
                                <div className="flex items-center gap-3">
                                  <div>
                                    <div className="font-medium">
                                      {option.label}
                                    </div>
                                    <div className="text-sm text-neutral-500">
                                      {option.description}
                                    </div>
                                  </div>
                                </div>
                                <input
                                  type="radio"
                                  name="expectedUsage"
                                  value={option.value}
                                  checked={
                                    formData.expectedUsage === option.value
                                  }
                                  onChange={handleChange}
                                  className="absolute opacity-0"
                                />
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full inline-flex items-center gap-2 justify-center bg-neutral-900 px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base font-medium text-white transition-all duration-300 hover:bg-neutral-950 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
                >
                  {loading ? (
                    <Loader className="animate-spin h-4 w-4" />
                  ) : (
                    <>
                      {step === 1 ? "Continue" : "Create Account"}
                      <MoveRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <div className="text-center text-sm text-neutral-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/login")}
                    className="text-neutral-900 hover:underline ml-1"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
