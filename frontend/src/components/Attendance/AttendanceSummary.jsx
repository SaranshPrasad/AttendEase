
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, Clock, Loader2 } from "lucide-react";
import axios from "axios";

export default function AttendanceSummary({ session }) {
  const [totalStudents, setTotalStudents] = useState(0);
  const [presentStudents, setPresentStudents] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const sessionId = session?.session?._id;
  const semester = session?.session?.semester;
  const fetchTotalStudents = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/student/view/${semester}`,
        { withCredentials: true }
      );
      setTotalStudents(res.data.totalStudents || 0);
    } catch (error) {
      console.error("Error fetching total students:", error);
    }
  };
  const fetchPresentStudents = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/attendance/live/${sessionId}`,
        { withCredentials: true }
      );
      setPresentStudents(data.presentStudents?.length || 0);
    } catch (error) {
      console.error("Error fetching present students:", error);
    }
  };
  useEffect(() => {
    if (!sessionId || !semester) return;

    const init = async () => {
      setIsLoading(true);
      await fetchTotalStudents();
      await fetchPresentStudents();
      setIsLoading(false);
    };

    init();
    const interval = setInterval(fetchPresentStudents, 5000);
    return () => clearInterval(interval);
  }, [sessionId, semester]);

  const total = totalStudents || 0;
  const attendancePercentage =
    total > 0 ? (presentStudents / total) * 100 : 0;

  return (
    <Card className="bg-white/70 backdrop-blur-sm border border-gray-100 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            Session Summary {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>
              {session.session?.start_time} - {session.session?.end_time}
            </span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1 text-sm">
            <span className="font-medium text-gray-700 flex items-center gap-2">
              <Users className="w-4 h-4" /> Attendance
            </span>
            <span className="font-bold text-purple-700 text-lg">
              {isLoading ? "Loading..." : `${presentStudents} / ${total}`}
            </span>
          </div>
          <Progress value={attendancePercentage} className="h-3" />
          <p className="text-sm text-gray-600 mt-2 text-center">
            {attendancePercentage.toFixed(1)}% Present
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
