import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";

import StudentDetailsCard from "../components/student/StudentDetailsCard";
import TodayScheduleCard from "../components/student/TodayScheduleCard";
import LiveClassesCard from "../components/student/LiveClassesCard";
import { getUser } from "../lib/utils";

export default function StudentDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [liveSessions, setLiveSessions] = useState([]);
  const [markedSessions, setMarkedSessions] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const user = getUser();

  const dayName = format(new Date(), "EEEE");

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        if (!user?.semester || !user?.email) return setIsLoading(false);

        setCurrentUser(user);

        const [timetableRes, studentRes] = await Promise.all([
          axios.get(
            `${import.meta.env.VITE_API_URL}/student/view/timetable/${dayName}/${user.semester}`
          ),
          axios.get(`${import.meta.env.VITE_API_URL}/student/view/email/${user.email}`, {
            withCredentials: true,
          }),
        ]);

        setTodaySchedule(timetableRes.data?.timetable || []);
        const id = studentRes.data?.student?._id || "";
        setStudentId(id);

        if (id) await fetchMarkedSessions(id);
        await fetchLiveSessions();
      } catch (err) {
        console.error("Error loading dashboard:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (!todaySchedule.length) return;
    const interval = setInterval(fetchLiveSessions, 60000);
    return () => clearInterval(interval);
  }, [todaySchedule]);

  const fetchLiveSessions = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/attendance/active`,
        {
          withCredentials: true,
        }
      );
      const filteredSessions = data?.sessions?.filter(
        (s) => s.semester === user.semester
      );
      setLiveSessions(filteredSessions || []);
    } catch (err) {
      console.error("Error fetching live sessions:", err);
    }
  };

  const fetchMarkedSessions = async (studentId) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/attendance/total/marked/present/${studentId}`,
        { withCredentials: true }
      );
      const records = data.records || [];
      const filtered = records
        .filter((rec) => rec.status === "present" && rec.session)
        .map((rec) => rec.session._id);
      setMarkedSessions(filtered);
    } catch (err) {
      console.error("Error fetching marked sessions:", err);
    }
  };

  const handleMarkAttendance = async (sessionId, facultyId, subjectId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/attendance/mark`,
        {
          sessionId,
          class_id: subjectId,
          faculty: facultyId,
          student: studentId,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("✅ Attendance marked successfully!");
        setMarkedSessions((prev) => [...new Set([...prev, sessionId])]);
      }
    } catch (error) {
      alert(
        error.response?.data?.message || "Error marking attendance. Try again."
      );
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent mb-2">
            Student Dashboard
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Welcome back, {currentUser?.name || "Student"}! Here's your day at a
            glance.
          </p>
        </header>

        {/* Dashboard Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-8">
            {/* ✅ Scrollable container for Live Sessions */}
            <div className="max-h-[70vh] overflow-y-auto scrollbar-hide">
              <LiveClassesCard
                sessions={liveSessions}
                isLoading={isLoading}
                markedSessions={markedSessions}
                onMarkAttendance={handleMarkAttendance}
              />
            </div>

            <TodayScheduleCard
              schedule={todaySchedule[0]?.slots || []}
              isLoading={isLoading}
            />
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">
            <StudentDetailsCard student={currentUser} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
