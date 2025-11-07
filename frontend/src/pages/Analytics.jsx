import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart3, Users, TrendingUp, Calendar } from "lucide-react";

import AnalyticsHeader from "../components/analytics/AnalyticsHeader";
import AttendanceChart from "../components/analytics/AttendanceChart";
import AttendanceTrends from "../components/analytics/AttendanceTrends";
import StudentPerformance from "../components/analytics/StudentPerformance";
import DepartmentStats from "../components/analytics/DepartmentStats";

export default function AnalyticsPage() {
  const [sessions, setSessions] = useState([]);
  const [records, setRecords] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedCourse, setSelectedCourse] = useState("all");

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    try {
      setIsLoading(true);

      const token = localStorage.getItem("token");

      // Fetch attendance sessions and records
      const [sessionRes, recordRes, courseRes, studentRes] = await Promise.all([
        axios.get("http://localhost:5001/attendance/all/sessions", {
          withCredentials: true,
        }),
        axios.get("http://localhost:5001/attendance/total/marked/present", {
          withCredentials: true,
        }),
        axios.get("http://localhost:5001/admin/view/courses", {
          withCredentials: true,
        }),
        axios.get("http://localhost:5001/admin/view/students", {
          withCredentials: true,
        }),
      ]);

      setSessions(sessionRes.data.sessions || []);
      setRecords(recordRes.data.sessions || []);
      setCourses(courseRes.data.courses || []);
      setStudents(studentRes.data.studentData || []);
    } catch (error) {
      console.error("Error loading analytics data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFilteredData = () => {
    let filteredSessions = [...sessions];
    let filteredRecords = [...records];
    let filteredStudents = [...students];

    // 🟢 Course filter
    if (selectedCourse !== "all") {
      // Find selected course details
      const selectedCourseData = courses.find((c) => c._id === selectedCourse);

      // Filter sessions linked to that course
      filteredSessions = filteredSessions.filter(
        (s) => s.subject === selectedCourse
      );

      const sessionIds = filteredSessions.map((s) => s._id);
      filteredRecords = filteredRecords.filter((r) =>
        sessionIds.includes(r.session)
      );

      // 🟢 Now filter students based on course semester
      if (selectedCourseData && selectedCourseData.semester) {
        filteredStudents = filteredStudents.filter(
          (stu) => stu.semester === selectedCourseData.semester
        );
      }
    }

    // 🟢 Time period filter
    const now = new Date();
    let startDate = new Date(0);
    let endDate = new Date(now);

    if (selectedPeriod === "week") {
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 7);
    } else if (selectedPeriod === "month") {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    } else if (selectedPeriod === "semester") {
      startDate = new Date(now);
      startDate.setMonth(now.getMonth() - 4);
    }

    filteredSessions = filteredSessions.filter((s) => {
      const sessionDate = new Date(s.class_date || s.createdAt);
      return sessionDate >= startDate && sessionDate <= endDate;
    });

    filteredRecords = filteredRecords.filter((r) => {
      const recordDate = new Date(r.markedAt || r.createdAt);
      return recordDate >= startDate && recordDate <= endDate;
    });

    return { filteredSessions, filteredRecords, filteredStudents };
  };

  const calculateStats = () => {
    const { filteredSessions, filteredRecords, filteredStudents } =
      getFilteredData();

    const totalSessions = filteredSessions.length;
    const totalAttendance = filteredRecords.filter(
      (r) => r.status === "present"
    ).length;

    // 🧮 Expected attendance = session count * filtered students
    const expectedAttendance = totalSessions * filteredStudents.length;
    const averageAttendance =
      expectedAttendance > 0
        ? Math.round((totalAttendance / expectedAttendance) * 100)
        : 0;

    return {
      totalSessions,
      totalAttendance,
      averageAttendance,
      totalStudents: filteredStudents.length,
    };
  };

  const stats = calculateStats();

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <AnalyticsHeader />

        {/* Filter Controls */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Time Period */}
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Time Period
              </label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="semester">This Semester</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Course Filter */}
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Course
              </label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {courses.map((course) => (
                    <SelectItem key={course._id} value={course._id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "Total Sessions",
              value: stats.totalSessions,
              icon: Calendar,
              color: "from-blue-500 to-blue-600",
            },
            {
              label: "Total Attendance",
              value: stats.totalAttendance,
              icon: Users,
              color: "from-green-500 to-green-600",
            },
            {
              label: "Average Attendance",
              value: `${stats.averageAttendance}%`,
              icon: TrendingUp,
              color: "from-purple-500 to-purple-600",
            },
            {
              label: "Total Students",
              value: stats.totalStudents,
              icon: BarChart3,
              color: "from-orange-500 to-orange-600",
            },
          ].map(({ label, value, icon: Icon, color }) => (
            <Card
              key={label}
              className="bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{label}</p>
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Graphs */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <AttendanceChart data={getFilteredData()} isLoading={isLoading} />
          <AttendanceTrends data={getFilteredData()} isLoading={isLoading} />
        </div>

        {/* Performance & Department Stats */}
        <div className="grid lg:grid-cols-2 gap-8">
          <StudentPerformance
            students={getFilteredData().filteredStudents}
            records={getFilteredData().filteredRecords}
            sessions={getFilteredData().filteredSessions}
            isLoading={isLoading}
          />
          <DepartmentStats data={{ courses, students }} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
