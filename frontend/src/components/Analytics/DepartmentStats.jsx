import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2 } from "lucide-react";

const COLORS = [
  "#3b82f6", // blue
  "#8b5cf6", // violet
  "#10b981", // green
  "#f59e0b", // yellow
  "#ef4444", // red
  "#6366f1", // indigo
];

export default function DepartmentStats({ data, isLoading }) {
  if (isLoading) {
    return (
      <Card className="bg-white border border-gray-100 shadow-lg">
        <CardHeader>
          <CardTitle>Semester Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-10">
            <Skeleton className="w-64 h-64 rounded-full" />
          </div>
        </CardContent>
      </Card>
    );
  }
  const { courses = [], students = [] } = data || {};
  const chartData = useMemo(() => {
    const semesterMap = {};
    students.forEach((student) => {
      const sem = student.semester || "Unknown";
      if (!semesterMap[sem]) {
        semesterMap[sem] = { name: `Semester ${sem}`, students: 0, courses: 0 };
      }
      semesterMap[sem].students += 1;
    });
    courses.forEach((course) => {
      const sem = course.semester || "Unknown";
      if (!semesterMap[sem]) {
        semesterMap[sem] = { name: `Semester ${sem}`, students: 0, courses: 0 };
      }
      semesterMap[sem].courses += 1;
    });

    const result = Object.values(semesterMap);
    return result.length > 0
      ? result
      : [{ name: "No Data", students: 1, courses: 0 }];
  }, [courses, students]);

  return (
    <Card className="bg-white border border-gray-100 shadow-lg">
      <CardHeader className="flex items-center gap-2">
        <Building2 className="w-5 h-5 text-violet-500" />
        <CardTitle>Semester Distribution</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="students"
                  label={(entry) => `${entry.name}`}
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, entry) => [
                    `${value} Students`,
                    entry.payload.name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Breakdown List */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Semester Breakdown</h4>
            {chartData.map((sem, index) => (
              <div
                key={sem.name}
                className="flex items-center justify-between p-2 border border-gray-100 rounded-md shadow-sm hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  />
                  <span className="text-sm font-medium">{sem.name}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {sem.students} students, {sem.courses} courses
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
