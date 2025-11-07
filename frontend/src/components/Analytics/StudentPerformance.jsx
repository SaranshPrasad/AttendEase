
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, TrendingDown, TrendingUp } from "lucide-react";

export default function StudentPerformance({
  students = [],
  records = [],
  sessions = [],
  isLoading,
}) {
  if (isLoading) {
    return (
      <Card className="bg-white border border-gray-100 shadow-lg">
        <CardHeader>
          <CardTitle>Student Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16 mt-1" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-12" />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // 🧮 Compute stats for each student (even if not in records)
  const studentStats = useMemo(() => {
    const totalSessions = sessions.length;

    return students.map((student) => {
      // Find only PRESENT records for this student
      const studentRecords = records.filter(
        (r) => r.student === student._id && r.status === "present"
      );

      const attendedSessions = studentRecords.length;
      const attendanceRate =
        totalSessions > 0 ? (attendedSessions / totalSessions) * 100 : 0;

      return {
        ...student,
        attendanceCount: attendedSessions,
        attendanceRate: Math.round(attendanceRate),
        totalSessions,
      };
    });
  }, [students, records, sessions]);

  // 🔢 Sort by attendance rate (lowest → highest)
  const sortedStudents = useMemo(
  () => [...studentStats].sort((a, b) => b.attendanceRate - a.attendanceRate),
  [studentStats]
);


  // 🏷️ Helper to decide performance badge
  const getPerformanceBadge = (rate) => {
    if (rate >= 90)
      return {
        color: "bg-green-100 text-green-800",
        icon: TrendingUp,
        text: "Excellent",
      };
    if (rate >= 75)
      return {
        color: "bg-blue-100 text-blue-800",
        icon: TrendingUp,
        text: "Good",
      };
    if (rate >= 60)
      return {
        color: "bg-yellow-100 text-yellow-800",
        icon: Users,
        text: "Average",
      };
    return {
      color: "bg-red-100 text-red-800",
      icon: TrendingDown,
      text: "Needs Attention",
    };
  };

  return (
    <Card className="bg-white border border-gray-100 shadow-lg">
      <CardHeader>
        <CardTitle>Student Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {sortedStudents.map((student) => {
            const performance = getPerformanceBadge(student.attendanceRate);
            const IconComponent = performance.icon;

            return (
              <div
                key={student._id}
                className="flex items-center justify-between p-3 border border-gray-100 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      {student.name?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-500">
                      {student.attendanceCount}/{student.totalSessions} sessions
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">
                    {student.attendanceRate}%
                  </span>
                  <Badge className={performance.color} variant="outline">
                    <IconComponent className="w-3 h-3 mr-1" />
                    {performance.text}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

