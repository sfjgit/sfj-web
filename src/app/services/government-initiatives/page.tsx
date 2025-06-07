import React from "react";
import Naan from "./_components/Naan";
import Ksdc from "./_components/Ksdc";
import GovernmentTrainingRedesign from "./_components/GovernmentTrainingRedesign";

export default function page() {
  return (
    <div className="min-h-screen">
      {/* <div className="h-28"></div> */}
      <GovernmentTrainingRedesign />
      <Naan />
      <Ksdc />
      <section
        id="initiatives"
        className="py-20 bg-gradient-to-r from-orange-50 to-red-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Transforming Lives with{" "}
              <span className="text-orange-600">Skill India</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              SFJ Business Solutions is proud to be a dedicated partner in the
              Government of India&#39;s Skill India mission. Through our robust
              training programs and partnerships, we are equipping individuals
              with the knowledge and practical skills demanded by today&#39;s
              evolving industries.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
