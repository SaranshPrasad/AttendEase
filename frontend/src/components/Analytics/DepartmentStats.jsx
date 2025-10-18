import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2 } from "lucide-react";

const COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#6366f1",
];

export default function DepartmentStats({
  students,
  courses,
  data,
  isLoading,
}) {
  if (isLoading) {
    return (
      <Card className="bg-white border border-gray-100 shadow-lg">
        <CardHeader>
          <CardTitle>Department Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <Skeleton className="w-64 h-64 rounded-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate department-wise student distribution
  const departmentData = {};

  courses.forEach((course) => {
    const dept = course.department;
    if (!departmentData[dept]) {
      departmentData[dept] = { name: dept, students: 0, courses: 0 };
    }
    departmentData[dept].courses++;
    departmentData[dept].students += course.enrolled_students?.length || 0;
  });

  const chartData = Object.values(departmentData);

  return (
    <Card className="bg-white border border-gray-100 shadow-lg">
      <CardHeader>
        <CardTitle>Department Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="students"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">
              Department Breakdown
            </h4>
            {chartData.map((dept, index) => (
              <div
                key={dept.name}
                className="flex items-center justify-between p-2 border border-gray-100 rounded"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm font-medium">{dept.name}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {dept.students} students, {dept.courses} courses
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
