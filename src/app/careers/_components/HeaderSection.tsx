/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Heart, Globe, Award } from "lucide-react";

const SimpleHeader = ({ totalJobs = 0 }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 pt-20">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      <div className="container mx-auto px-4 py-16">
        {/* Main Header */}
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 border-white/30 bg-white/10 text-white"
          >
            <Heart className="w-3 h-3 mr-1" />
            We're Hiring
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Join Our Amazing Team
          </h1>

          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-6">
            Build the future with us. We're looking for passionate people who
            want to make a real impact and grow their careers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 text-blue-100">
              <Globe className="w-5 h-5" />
              <span className="font-medium">{totalJobs} open positions</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-blue-200 rounded-full"></div>
            <div className="flex items-center gap-2 text-blue-100">
              <Award className="w-5 h-5" />
              <span className="font-medium">Best places to work</span>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        {/* <div className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <blockquote className="text-lg text-white italic">
              "We're not just building products, we're building the future. Join
              us in creating technology that makes a difference in people's
              lives."
            </blockquote>
            <div className="mt-4 text-sm text-blue-200">— Leadership Team</div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SimpleHeader;
