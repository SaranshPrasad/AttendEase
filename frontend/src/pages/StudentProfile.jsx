
import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  User as UserIcon,
  Calendar,
  Clock,
  MapPin,
  QrCode,
  BookOpen,
  TrendingUp,
  Bell,
  CheckCircle,
} from "lucide-react";

import StudentDetailsCard from "../components/Student/StudentDetailsCard";
import TodayScheduleCard from "../components/Student/TodayScheduleCard";
import LiveClassesCard from "../components/Student/LiveClassesCard";
import AttendanceStatsCard from "../components/Student/AttendanceStatsCard";
import { getUser } from "../lib/utils";

export default function StudentProfilePage() {
  const user = getUser();
  const [studentProfile, setStudentProfile] = useState(null);
  const [myCourses, setMyCourses] = useState([]);
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [liveSessions, setLiveSessions] = useState([]);
  const [attendanceStats, setAttendanceStats] = useState({});
  const [userLocation, setUserLocation] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const dayName = format(new Date(), "EEEE");

  // 🔹 Initial load: student details + schedule + live sessions
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        if (!user?.semester || !user?.email) {
          setIsLoading(false);
          return;
        }

        // Fetch timetable & student details concurrently
        const [timetableRes, studentRes] = await Promise.all([
          axios.get(
            `${import.meta.env.VITE_API_URL}/student/view/timetable/${dayName}/${user.semester}`
          ),
          axios.get(`${import.meta.env.VITE_API_URL}/student/view/email/${user.email}`, {
            withCredentials: true,
          }),
        ]);

        setTodaySchedule(timetableRes.data?.timetable || []);
        setStudentProfile(studentRes.data?.student || {});
        setStudentId(studentRes.data?.student?._id || "");
   
        await fetchLiveSessions(); // load active live sessions
      } catch (err) {
        console.error("Error loading student data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // 🔹 Poll every minute for active live sessions
  useEffect(() => {
    if (!todaySchedule.length) return;
    const interval = setInterval(fetchLiveSessions, 60000);
    return () => clearInterval(interval);
  }, [todaySchedule]);

  // 🔹 Fetch active sessions from backend
  const fetchLiveSessions = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/attendance/active`,
        {
          withCredentials: true,
        }
      );
      setLiveSessions(data?.sessions || []);
    } catch (err) {
      console.error("Error fetching live sessions:", err);
    }
  };

  // 🔹 (Optional) Fetch user location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Error getting location:", error)
      );
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            My Profile
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your academic profile and attendance
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Stats */}
          <div className="lg:col-span-1 space-y-6">
            <StudentDetailsCard
              student={studentProfile}
              isLoading={isLoading}
            />
          </div>

          {/* Middle Column - Schedule & Live Classes */}
          <div className="lg:col-span-2 space-y-6">
            <TodayScheduleCard
              schedule={todaySchedule[0]?.slots || []}
              isLoading={isLoading}
            />
            <AttendanceStatsCard
              courses={myCourses}
              stats={attendanceStats}
              isLoading={isLoading}
              studentId={studentId}
            
            />
          </div>
        </div>
      </div>
    </div>
  );
}
