import React from "react";
import { MoveRight, BarChart, Calendar } from "lucide-react";

const Contact = () => {
  return (
    <div className="relative overflow-hidden pb-24 pt-8 font-mono bg-white">
      <div className="relative mx-auto max-w-7xl px-4">
        <div>
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-medium text-neutral-900">
                  Need a custom solution?
                </h3>
                <p className="mt-2 text-lg text-neutral-600">
                  Let's discuss your specific LLM deployment requirements
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="group relative inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-neutral-800">
                <Calendar className="h-4 w-4" />
                Schedule a Call
                <MoveRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button className="group relative inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition-all duration-300 hover:bg-neutral-50">
                <BarChart className="h-4 w-4" />
                View Demo
                <MoveRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
