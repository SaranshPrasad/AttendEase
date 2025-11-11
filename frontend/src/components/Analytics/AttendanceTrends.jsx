import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export default function AttendanceTrends({ data, isLoading }) {
  if (isLoading) {
    return (
      <Card className="bg-white border border-gray-100 shadow-lg">
        <CardHeader>
          <CardTitle>Attendance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  const {
    filteredSessions = [],
    filteredRecords = [],
    filteredStudents = [],
  } = data;
  const trendData = filteredSessions.map((session) => {
    const sessionId = session._id;
    const sessionRecords = filteredRecords.filter(
      (record) => record.session === sessionId
    );
    const totalPresent = sessionRecords.filter(
      (r) => r.status === "present"
    ).length;
    const expectedCount = filteredStudents.filter(
      (s) => s.semester === session.semester
    ).length;
    const percentage =
      expectedCount > 0 ? Math.round((totalPresent / expectedCount) * 100) : 0;
    const date = format(new Date(session.class_date), "MMM dd");

    return {
      date,
      percentage,
      present: totalPresent,
      expected: expectedCount,
    };
  });

  const sortedTrendData = trendData.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <Card className="bg-white border border-gray-100 shadow-lg">
      <CardHeader>
        <CardTitle>Attendance Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sortedTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 100]} />
            <Tooltip
              formatter={(value, name) => {
                if (name === "percentage") return [`${value}%`, "Attendance %"];
                return [value, name];
              }}
            />
            <Line
              type="monotone"
              dataKey="percentage"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
