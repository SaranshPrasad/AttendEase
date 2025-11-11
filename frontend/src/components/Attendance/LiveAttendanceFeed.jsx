import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserCheck, UserX, Loader2 } from "lucide-react";

const StudentList = ({ title, students, icon: Icon, badgeClass }) => (
  <div>
    <h4 className="flex items-center gap-2 font-semibold mb-3 text-gray-800">
      <Icon className="w-5 h-5" />
      {title}
      <Badge className={badgeClass}>{students.length}</Badge>
    </h4>
    <div className="max-h-60 overflow-y-auto pr-2 space-y-2">
      {students.length > 0 ? (
        students.map((student) => (
          <div key={student._id} className="p-2 bg-gray-50 rounded-md text-sm">
            {student.name}{" "}
            <span className="text-gray-500">({student.student_id})</span>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500 italic px-2">No students yet.</p>
      )}
    </div>
  </div>
);

export default function LiveAttendanceFeed({ activeSession }) {
  const [presentStudents, setPresentStudents] = useState([]);
  const [absentCount, setAbsentCount] = useState(0);
  const [totalStudents, setTotalStudents] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const sessionId = activeSession?.session?._id;

  const fetchTotalStudents = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/student/view/${activeSession.session.semester}`,
        { withCredentials: true }
      );
      setTotalStudents(res.data.totalStudents);
    } catch (error) {
      console.error("Error fetching total students:", error);
    }
  };

  const fetchLiveAttendance = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/attendance/live/${sessionId}`,
        { withCredentials: true }
      );

      const present = data.presentStudents || [];
      setPresentStudents(present);
      if (totalStudents !== null) {
        setAbsentCount(Math.max(totalStudents - present.length, 0));
      }
    } catch (error) {
      console.error("Error fetching live attendance:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!sessionId) return;

    const init = async () => {
      await fetchTotalStudents();
      await fetchLiveAttendance();
    };

    init();

    const interval = setInterval(fetchLiveAttendance, 5000);
    return () => clearInterval(interval);
  }, [sessionId, totalStudents]);

  return (
    <Card className="bg-white/70 backdrop-blur-sm border border-gray-100 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Live Feed
          {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <StudentList
          title="Present Students"
          students={presentStudents}
          icon={UserCheck}
          badgeClass="bg-green-100 text-green-800"
        />

        <div>
          <h4 className="flex items-center gap-2 font-semibold mb-3 text-gray-800">
            <UserX className="w-5 h-5" />
            Absent Students
            <Badge className="bg-red-100 text-red-800">
              {absentCount ?? "-"}
            </Badge>
          </h4>
        </div>
      </CardContent>
    </Card>
  );
}
