import React, { useState, useEffect } from "react";
// import { AttendanceSession } from "@/entities/AttendanceSession";
// import { AttendanceRecord } from "@/entities/AttendanceRecord";
// import { Student } from "@/entities/Student";
// import { Course } from "@/entities/Course";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedCourse, setSelectedCourse] = useState("all");

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    setIsLoading(true);
    try {
      const [sessionsData, recordsData, studentsData, coursesData] =
        await Promise.all([
          AttendanceSession.list("-created_date"),
          AttendanceRecord.list("-created_date"),
          Student.list(),
          Course.list(),
        ]);

      setSessions(sessionsData);
      setRecords(recordsData);
      setStudents(studentsData);
      setCourses(coursesData);
    } catch (error) {
      console.error("Error loading analytics data:", error);
    }
    setIsLoading(false);
  };

  const getFilteredData = () => {
    let filteredSessions = sessions;
    let filteredRecords = records;

    // Filter by course
    if (selectedCourse !== "all") {
      filteredSessions = sessions.filter((s) => s.class_id === selectedCourse);
      const sessionIds = filteredSessions.map((s) => s.id);
      filteredRecords = records.filter((r) =>
        sessionIds.includes(r.session_id)
      );
    }

    // Filter by time period
    const now = new Date();
    let startDate;

    switch (selectedPeriod) {
      case "week":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "semester":
        startDate = new Date(now.getTime() - 120 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(0);
    }

    filteredSessions = filteredSessions.filter(
      (s) => new Date(s.created_date) >= startDate
    );
    filteredRecords = filteredRecords.filter(
      (r) => new Date(r.created_date) >= startDate
    );

    return { filteredSessions, filteredRecords };
  };

  const calculateStats = () => {
    const { filteredSessions, filteredRecords } = getFilteredData();

    const totalSessions = filteredSessions.length;
    const totalAttendance = filteredRecords.length;
    const expectedAttendance = filteredSessions.reduce(
      (sum, s) => sum + (s.total_students_expected || 0),
      0
    );
    const averageAttendance =
      expectedAttendance > 0 ? (totalAttendance / expectedAttendance) * 100 : 0;

    return {
      totalSessions,
      totalAttendance,
      averageAttendance: Math.round(averageAttendance),
      totalStudents: students.length,
    };
  };

  const stats = calculateStats();

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <AnalyticsHeader />

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Time Period
              </label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="semester">This Semester</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Course
              </label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.course_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border border-gray-100 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Sessions
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.totalSessions}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-100 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Attendance
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.totalAttendance}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-100 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Average Attendance
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.averageAttendance}%
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-100 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Students
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.totalStudents}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <AttendanceChart data={getFilteredData()} isLoading={isLoading} />
          <AttendanceTrends data={getFilteredData()} isLoading={isLoading} />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <StudentPerformance
            students={students}
            records={getFilteredData().filteredRecords}
            sessions={getFilteredData().filteredSessions}
            isLoading={isLoading}
          />
          <DepartmentStats
            students={students}
            courses={courses}
            data={getFilteredData()}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
