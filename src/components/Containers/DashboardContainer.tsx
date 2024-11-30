"use client";

import React from "react";

interface DashboardContainerProps {
  title: string;
  description?: string;
  actionButton?: React.ReactNode;
  children: React.ReactNode;
}

export function DashboardContainer({
  title,
  description,
  actionButton,
  children,
}: DashboardContainerProps) {
  return (
    <div className="p-6 space-y-6 my-5 animate-fade-up">
      <div className="rounded-lg border shadow-card hover:shadow-card-hover transition-shadow duration-300">
        <div className="border-b border-gray-200 p-6 bg-gradient-to-r from-royalPurple/5 to-transparent">
          <div className="flex items-center justify-between">
            <div className="animate-fade-slide-in">
              <h2 className="text-2xl font-bold text-white">{title}</h2>
              {description && (
                <p className="text-sm text-silver mt-1">{description}</p>
              )}
            </div>
            <div className="animate-fade-scale-in">
              {actionButton && actionButton}
            </div>
          </div>
        </div>
        <div className="transition-all duration-300">{children}</div>
      </div>
    </div>
  );
}
