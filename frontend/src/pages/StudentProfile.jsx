import React, { useState, useEffect } from "react";
// import { Student } from "@/entities/Student";
// import { Course } from "@/entities/Course";
// import { Schedule } from "@/entities/Schedule";
// import { AttendanceSession } from "@/entities/AttendanceSession";
// import { AttendanceRecord } from "@/entities/AttendanceRecord";
// import { User } from "@/entities/User";
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
import { format } from "date-fns";

import StudentDetailsCard from "../components/student/StudentDetailsCard";
import TodayScheduleCard from "../components/student/TodayScheduleCard";
import LiveClassesCard from "../components/student/LiveClassesCard";
import AttendanceStatsCard from "../components/student/AttendanceStatsCard";
import QuickAttendanceCard from "../components/student/QuickAttendanceCard";
import { getUser } from "../lib/utils";

export default function StudentProfilePage() {
  const user = getUser();
  const [studentProfile, setStudentProfile] = useState(null);
  const [myCourses, setMyCourses] = useState([]);
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [liveSessions, setLiveSessions] = useState([]);
  const [attendanceStats, setAttendanceStats] = useState({});
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStudentData();
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  const loadStudentData = async () => {
    setIsLoading(true);
    try {
      const user = await User.me();
      setCurrentUser(user);

      // Get student profile
      const students = await Student.list();
      const studentProf = students.find((s) => s.email === user.email);
      setStudentProfile(studentProf);

      if (studentProf) {
        // Get enrolled courses
        const allCourses = await Course.list();
        const enrolledCourses = allCourses.filter(
          (c) =>
            c.enrolled_students?.includes(studentProf.id) ||
            c.course === studentProf.course
        );
        setMyCourses(enrolledCourses);

        // Get today's schedule
        const today = format(new Date(), "EEEE");
        const todayScheds = await Schedule.filter({ day_of_week: today });
        setTodaySchedule(todayScheds);

        // Get live sessions
        const activeSessions = await AttendanceSession.filter({
          is_active: true,
        });
        setLiveSessions(activeSessions);

        // Calculate attendance stats
        const allSessions = await AttendanceSession.list();
        const myRecords = await AttendanceRecord.filter({
          student_id: studentProf.id,
        });

        const statsData = {};
        enrolledCourses.forEach((course) => {
          const courseSessions = allSessions.filter((s) => {
            // You'll need to implement course-to-session relationship
            return true; // Placeholder
          });
          const courseRecords = myRecords.filter((r) =>
            courseSessions.some((s) => s.id === r.session_id)
          );

          statsData[course.id] = {
            totalSessions: courseSessions.length,
            attendedSessions: courseRecords.length,
            percentage:
              courseSessions.length > 0
                ? Math.round(
                    (courseRecords.length / courseSessions.length) * 100
                  )
                : 0,
          };
        });

        setAttendanceStats(statsData);
      }
    } catch (error) {
      console.error("Error loading student data:", error);
    }
    setIsLoading(false);
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Details */}
          <div className="lg:col-span-1 space-y-6">
            <StudentDetailsCard
              student={user}
              user={user}
              isLoading={isLoading}
            />

            <AttendanceStatsCard
              courses={myCourses}
              stats={attendanceStats}
              isLoading={isLoading}
            />
          </div>

          {/* Middle Column - Schedule & Classes */}
          <div className="lg:col-span-1 space-y-6">
            <TodayScheduleCard
              schedule={todaySchedule}
              courses={myCourses}
              isLoading={isLoading}
            />

            <LiveClassesCard
              sessions={liveSessions}
              userLocation={userLocation}
              studentId={studentProfile?.id}
              isLoading={isLoading}
            />
          </div>

          {/* Right Column - Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            <QuickAttendanceCard
              sessions={liveSessions}
              userLocation={userLocation}
              studentId={user?.student_id} 
            />

            {/* Notifications Card */}
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Recent Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">
                      Class Reminder
                    </p>
                    <p className="text-sm text-blue-700">
                      Mathematics lecture starts in 30 minutes
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-800">
                      Attendance Marked
                    </p>
                    <p className="text-sm text-green-700">
                      Successfully marked for Physics Lab
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
