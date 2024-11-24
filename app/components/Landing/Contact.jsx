import React from "react";
import { MoveRight, BarChart, Calendar } from "lucide-react";

const ActionButton = ({ icon: Icon, label, primary }) => (
  <button className="group inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-300 bg-white text-neutral-800">
    <Icon className="h-4 w-4" />
    {label}
    <MoveRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
  </button>
);

const Contact = () => {
  return (
    <div className="relative bg-black py-24">
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-light text-white">
              Need a custom solution?
            </h2>
            <p className="text-lg text-neutral-200">
              Let's discuss your specific LLM deployment requirements
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <ActionButton icon={BarChart} label="View Demo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
