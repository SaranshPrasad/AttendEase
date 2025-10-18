import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

export default function AttendanceChart({ data, isLoading }) {
  if (isLoading) {
    return (
      <Card className="bg-white border border-gray-100 shadow-lg">
        <CardHeader>
          <CardTitle>Attendance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  const { filteredSessions } = data;

  // Process data for chart
  const chartData = filteredSessions.slice(0, 10).map((session, index) => ({
    name: `Session ${index + 1}`,
    present: session.total_present || 0,
    expected: session.total_students_expected || 0,
    percentage:
      session.total_students_expected > 0
        ? Math.round(
            ((session.total_present || 0) / session.total_students_expected) *
              100
          )
        : 0,
  }));

  return (
    <Card className="bg-white border border-gray-100 shadow-lg">
      <CardHeader>
        <CardTitle>Recent Sessions Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value, name) => {
                if (name === "present") return [value, "Present"];
                if (name === "expected") return [value, "Expected"];
                return [value, name];
              }}
            />
            <Bar dataKey="expected" fill="#e5e7eb" name="expected" />
            <Bar dataKey="present" fill="#3b82f6" name="present" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
