import React, { useState, useEffect } from "react";

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

import DashboardStats from "../components/Dashboard/DashboardStats";
import QuickActions from "../components/Dashboard/QuickActions";
import RecentActivity from "../components/Dashboard/RecentActivity";
import { adminQuickActions } from "../lib/adminQuickActions";
import { getStudents } from "../lib/getStudentData";
import { getFaculty } from "../lib/getFacultyData";
import { getCourses } from "../lib/getCourses";
import axios from "axios";
export default function AdminDashboard() {

  const [recentSessions, setRecentSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalFaculty, setTotalFaculty]= useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [avgAttendance, setAvgAttendance] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);

  useEffect(() => {
    loadDashboardData();
    
  }, []);
  
  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      
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

    
// ✅ Fetch sessions and attendance records
    const { data: sessions } = await axios.get(
      `${import.meta.env.VITE_API_URL}/attendance/all/sessions`,
      { withCredentials: true }
    );



    const { data: attendanceRecords } = await axios.get(
      `${import.meta.env.VITE_API_URL}/attendance/total/marked/present`,
      { withCredentials: true }
    );

    // ✅ Defensive checks
    
    const totalSessions = sessions.sessions?.length || 0;
    setTotalSessions(totalSessions);
    const totalPresentRecords = attendanceRecords.sessions?.length || 0;
    
    // ✅ Average Attendance = total present / (students × sessions)
    const averageAttendance =
      students.length > 0 && totalSessions > 0
        ? Math.round(
            (totalPresentRecords / (students.length * totalSessions)) * 100
          )
        : 0;
    

    setAvgAttendance(averageAttendance);


    } catch (error) {
      console.error("Error loading admin dashboard data:", error);
    }
    setIsLoading(false);
  };

 const calculateAvgAttendance = async () => {

 }

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
            value={avgAttendance+"%"}
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
