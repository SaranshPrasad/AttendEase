import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp } from "lucide-react";

export default function DashboardStats({
  title,
  value,
  icon: Icon,
  gradient,
  trend,
  isLoading,
}) {
  if (isLoading) {
    return (
      <Card className="relative overflow-hidden bg-white border border-gray-100 shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="w-12 h-12 rounded-xl" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden bg-white/70 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group">
      <div
        className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${gradient} opacity-10 rounded-full transition-transform duration-500 group-hover:scale-150`}
      />
      <CardContent className="p-6 relative">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">{title}</p>
            <p className="text-4xl font-bold text-gray-900 mb-3">{value}</p>
            {trend && (
              <div className="flex items-center text-sm text-green-600 font-medium">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>{trend}</span>
              </div>
            )}
          </div>
          <div
            className={`p-4 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
