import { motion } from "framer-motion";
import { Award, ChevronRight, Compass, Users } from "lucide-react";
import React from "react";

const RoadmapHero = (): JSX.Element => {
  const stats = [
    { icon: Users, label: "Active Learners", value: "10K+" },
    { icon: Award, label: "Success Rate", value: "92%" },
  ];
  return (
    <div className="relative overflow-hidden bg-steelGray/30 border-b border-royalPurple/20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-20 animate-gradient-shift bg-gradient-radial" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-slide-in">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-electricViolet/10 text-electricViolet">
              <Compass className="w-4 h-4" />
              <span className="text-sm font-medium">Learning Pathway</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Your Journey to
              <span className="text-electricViolet"> Mastery</span>
            </h1>

            <p className="text-silver text-lg">
              Follow our structured learning path designed to take you from
              beginner to expert. Track your progress and achieve your goals
              step by step.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="px-8 py-3 rounded-lg bg-electricViolet text-white font-medium 
                         flex items-center justify-center space-x-2 shadow-lg
                         hover:scale-102 active:scale-98 transition-transform"
              >
                <span>Start Learning</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                className="px-8 py-3 rounded-lg border border-royalPurple/30 text-white 
                         font-medium hover:bg-royalPurple/10 transition-colors
                         hover:scale-102 active:scale-98"
              >
                View Curriculum
              </button>
            </div>

            <div className="flex gap-8 pt-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 animate-fade-up delay-${
                    index * 200
                  }`}
                >
                  <stat.icon className="w-8 h-8 text-skyBlue" />
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-silver text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="relative animate-fade-scale-in">
            <div className="aspect-square relative">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 animate-pulse-scale delay-${
                    i * 1000
                  }`}
                >
                  <div className="w-full h-full rounded-full border-2 border-electricViolet/20" />
                </div>
              ))}

              <div className="absolute inset-0 flex items-center justify-center animate-spin-slow">
                <div className="p-8 rounded-full bg-royalPurple/20 backdrop-blur-sm">
                  <Compass className="w-16 h-16 text-electricViolet" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapHero;
