
import Timetable from "../lib/Timetable";
import React, { useState, useEffect } from "react";
import { BookOpen, Clock, TrendingUp, QrCode, BookMarked, FileText } from "lucide-react";
import DashboardStats from "../components/Dashboard/DashboardStats";
import ActiveSessions from "../components/Dashboard/ActiveSessions";
import QuickActions from "../components/Dashboard/QuickActions";
import axios from "axios";


export default function FacultyDashboard() {
  const [stats, setStats] = useState({
    myClasses: 0,
    activeSessions: 0,
    avgAttendance: 0,
  });
  const [activeSessions, setActiveSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [todayClasses, setTodayClasses] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    loadDashboardData();
    
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/faculty/view/${storedUser.email}`);
      const { faculty } = res.data;
      const timetable = await Timetable.listByFaculty(storedUser.email);
      const now = new Date();
      const currentDay = now.toLocaleString("en-US", { weekday: "long" }); 
      const liveSessions = timetable.filter(cls => cls.day === currentDay);
      setActiveSessions(liveSessions);
      setTodayClasses(liveSessions);

      const totalSessionsRes = await axios.get(`${import.meta.env.VITE_API_URL}/attendance/sessions/all/done/${faculty._id}`, {withCredentials:true})
      const totalSessions = totalSessionsRes.data.sessions.length;


      const totalRecordsRes = await axios.get(`${import.meta.env.VITE_API_URL}/attendance/records/faculty/${faculty._id}`, {withCredentials:true});
      const totalRecords = totalRecordsRes.data.records.length;

      const avg = (totalRecords / totalSessions) * 100;
      console.log(totalSessions,totalRecords,avg)
      setStats({
        myClasses: faculty?.courses?.length || 0,
        activeSessions: liveSessions.length,
        avgAttendance: Math.round(avg),
      });
    } catch (error) {
      console.error("Error loading faculty dashboard data:", error);
    }
    setIsLoading(false);
  };
  
  const facultyQuickActions = [
    {
      title: "My Courses",
      description: "View your assigned courses",
      icon: BookMarked,
      url: "/courses",
      gradient: "from-green-500 to-green-600",
    },
    {
      title: "Generate Reports",
      description: "Export attendance data",
      icon: FileText,
      url: "/reports",
      gradient: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Faculty Dashboard
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Monitor attendance and manage your classes efficiently
          </p>
        </div>

        {/* 📊 Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <DashboardStats
            title="My Courses"
            value={stats.myClasses}
            icon={BookOpen}
            gradient="from-purple-500 to-purple-600"
            isLoading={isLoading}
          />
          <DashboardStats
            title="Today's Classes"
            value={stats.activeSessions}
            icon={Clock}
            gradient="from-green-500 to-green-600"
            isLoading={isLoading}
          />
          <DashboardStats
            title="My Avg. Attendance"
            value={`${stats.avgAttendance}%`}
            icon={TrendingUp}
            gradient="from-orange-500 to-orange-600"
            isLoading={isLoading}
          />
        </div>

        {/* 🟢 Active Sessions + Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ActiveSessions sessions={todayClasses} isLoading={isLoading} />
          </div>
          <div className="space-y-8">
            <QuickActions actions={facultyQuickActions} title="My Actions" />
          </div>
        </div>
      </div>
    </div>
  );
}
