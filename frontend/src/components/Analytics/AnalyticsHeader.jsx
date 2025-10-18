import React from "react";
import { BarChart3, TrendingUp } from "lucide-react";

export default function AnalyticsHeader() {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
        <BarChart3 className="w-7 h-7 text-white" />
      </div>
      <div>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Attendance Analytics
        </h1>
        <p className="text-gray-600 text-lg mt-1">
          Comprehensive insights into attendance patterns and trends
        </p>
      </div>
    </div>
  );
}
