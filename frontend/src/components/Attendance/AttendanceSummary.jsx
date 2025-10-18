import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, Clock } from "lucide-react";

export default function AttendanceSummary({
  expectedCount,
  presentCount,
  session,
}) {
  const attendancePercentage =
    expectedCount > 0 ? (presentCount / expectedCount) * 100 : 0;

  return (
    <Card className="bg-white/70 backdrop-blur-sm border border-gray-100 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Session Summary</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{session.session_time}</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1 text-sm">
            <span className="font-medium text-gray-700 flex items-center gap-2">
              <Users className="w-4 h-4" /> Attendance
            </span>
            <span className="font-bold text-purple-700 text-lg">
              {presentCount} / {expectedCount}
            </span>
          </div>
          <Progress value={attendancePercentage} className="h-3" />
        </div>
      </CardContent>
    </Card>
  );
}
