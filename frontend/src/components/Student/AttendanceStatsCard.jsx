import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, BookOpen } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AttendanceStatsCard({ courses, stats, isLoading }) {
  if (isLoading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
        <CardHeader>
          <CardTitle>Attendance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-2 w-full" />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const overallAttendance =
    courses.length > 0
      ? Math.round(
          Object.values(stats).reduce(
            (sum, stat) => sum + (stat.percentage || 0),
            0
          ) / courses.length
        )
      : 0;

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Attendance Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Stats */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-900">
              Overall Attendance
            </span>
            <span className="text-2xl font-bold text-purple-700">
              {overallAttendance}%
            </span>
          </div>
          <Progress value={overallAttendance} className="h-3" />
        </div>

        {/* Course-wise breakdown */}
        <div className="space-y-3">
          {courses.map((course) => {
            const courseStats = stats[course.id] || {
              percentage: 0,
              attendedSessions: 0,
              totalSessions: 0,
            };
            return (
              <div
                key={course.id}
                className="p-3 border border-gray-200 rounded-lg"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 truncate">
                    {course.course_name}
                  </span>
                  <span className="text-lg font-bold text-purple-700">
                    {courseStats.percentage}%
                  </span>
                </div>
                <Progress value={courseStats.percentage} className="h-2 mb-1" />
                <p className="text-xs text-gray-500">
                  {courseStats.attendedSessions} of {courseStats.totalSessions}{" "}
                  classes
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
