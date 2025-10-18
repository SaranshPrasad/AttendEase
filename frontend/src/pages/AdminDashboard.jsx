import React, { useState, useEffect } from "react";
// import { Student } from "@/entities/Student";
// import { Course } from "@/entities/Course";
// import { AttendanceSession } from "@/entities/AttendanceSession";
// import { User } from "@/entities/User";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Users,
  BookOpen,
  Clock,
  TrendingUp,
  UserCog,
  BarChart3,
  FileText,
} from "lucide-react";

import DashboardStats from "../components/dashboard/DashboardStats";
import QuickActions from "../components/dashboard/QuickActions";
import RecentActivity from "../components/dashboard/RecentActivity";
import { adminQuickActions } from "../lib/adminQuickActions";
import { getStudents } from "../lib/getStudentData";
import { getFaculty } from "../lib/getFacultyData";
import { getCourses } from "../lib/getCourses";
export default function AdminDashboard() {
  // const [stats, setStats] = useState({
  //   totalStudents: 0,
  //   totalFaculty: 0,
  //   totalCourses: 0,
  //   avgAttendance: 0,
  // });
  const [recentSessions, setRecentSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalFaculty, setTotalFaculty]= useState(0);
  const [totalCourses, setTotalCourses] = useState(0);

  useEffect(() => {
    loadDashboardData();
    
  }, []);
  console.log(totalStudents);
  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // const [students, users, courses, sessions] = await Promise.all([
      //   Student.list(),
      //   User.list(),
      //   Course.list(),
      //   AttendanceSession.list("-created_date", 10),
      // ]);
      const students = await getStudents();
      
      if(students){
        setTotalStudents(students.length);
      }

      const faculty = await getFaculty();
      if(faculty){
        setTotalFaculty(faculty.length);
        setIsLoading(false);
      }

      const courses = await getCourses();
      if(courses){
        setTotalCourses(courses.length);
        setIsLoading(false);
      }

      // const facultyUsers = users.filter(
      //   (u) => u.role === "user" || u.role === "admin"
      // );

      // const totalExpected = sessions.reduce(
      //   (sum, session) => sum + (session.total_students_expected || 0),
      //   0
      // );
      // const totalPresent = sessions.reduce(
      //   (sum, session) => sum + (session.total_present || 0),
      //   0
      // );
      // const avgAttendance =
      //   totalExpected > 0 ? (totalPresent / totalExpected) * 100 : 0;


      // setRecentSessions(sessions.slice(0, 5));
    } catch (error) {
      console.error("Error loading admin dashboard data:", error);
    }
    setIsLoading(false);
  };

 

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-2">
            Administrator Dashboard
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Oversee and manage the entire campus attendance system.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardStats
            title="Total Students"
            value={totalStudents}
            icon={Users}
            gradient="from-blue-500 to-blue-600"
            isLoading={isLoading}
          />
          <DashboardStats
            title="Total Faculty"
            value={totalFaculty}
            icon={UserCog}
            gradient="from-purple-500 to-purple-600"
            isLoading={isLoading}
          />
          <DashboardStats
            title="Total Courses"
            value={totalCourses}
            icon={BookOpen}
            gradient="from-green-500 to-green-600"
            isLoading={isLoading}
          />
          <DashboardStats
            title="Avg. Attendance"
            value={0}
            icon={TrendingUp}
            gradient="from-orange-500 to-orange-600"
            isLoading={isLoading}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <RecentActivity sessions={recentSessions} isLoading={isLoading} />
          </div>
          <div className="space-y-8">
            <QuickActions
              actions={adminQuickActions}
              title="System Management"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
