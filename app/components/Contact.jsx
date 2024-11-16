import React from "react";
import { MoveRight, BarChart, Phone, Mail, Calendar } from "lucide-react";

const Contact = () => {
  return (
    <div className="relative overflow-hidden bg-black py-12 font-space">
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="group relative overflow-hidden rounded-2xl border border-white/10  p-6 backdrop-blur-sm transition-all duration-300 hover:border-sky-500/30 hover:bg-sky-400/[0.02]">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute -left-20 -top-20 h-40 w-40 bg-sky-500/20 blur-[100px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-sky-500/20 bg-sky-500/10 px-6 py-2 text-sm text-sky-400">
                <Mail className="mr-2 h-4 w-4" />
                Get in Touch
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-white group-hover:text-sky-400 transition-colors duration-300">
                  Need a custom solution?
                </h3>
                <p className="mt-2 text-lg text-white/60">
                  Let's discuss your specific LLM deployment requirements
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="group relative inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-sky-600 hover:shadow-[0_0_20px_rgba(0,179,255,0.3)]">
                <Calendar className="h-4 w-4" />
                Schedule a Call
                <MoveRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute -inset-1 animate-pulse rounded-full bg-sky-500/20 blur-xl group-hover:bg-sky-500/30" />
              </button>

              <button className="group relative inline-flex items-center gap-2 rounded-full border border-sky-500/50 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-sky-500/10">
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
