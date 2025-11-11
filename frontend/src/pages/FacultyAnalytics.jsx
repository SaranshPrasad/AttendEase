import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Users, TrendingUp, Calendar, BookOpen } from "lucide-react";
import { getUser } from "../lib/utils";
import StudentPerformance from "../components/analytics/StudentPerformance";

export default function FacultyAnalyticsPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [myCourses, setMyCourses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [records, setRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const user = getUser();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // ✅ Faculty details
      const facultyRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/faculty/view/${user.email}`,
        { withCredentials: true }
      );
      const faculty = facultyRes.data.faculty;
      setCurrentUser(faculty);
      setMyCourses(faculty.courses || []);

      // ✅ Sessions
      const sessionsRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/attendance/sessions/all/done/${faculty._id}`,
        { withCredentials: true }
      );
      setSessions(sessionsRes.data.sessions || []);

      // ✅ Attendance Records
      const recordsRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/attendance/records/faculty/${faculty._id}`,
        { withCredentials: true }
      );
      setRecords(recordsRes.data.records || []);

      // ✅ Students
      const studentsRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/view/students`,
        { withCredentials: true }
      );
      setStudents(studentsRes.data.studentData || []);
    } catch (error) {
      console.error("Error loading analytics:", error);
    }
    setIsLoading(false);
  };

  // ✅ Filter data by selected course
  const getFilteredData = () => {
    const filteredSessions =
      selectedCourse === "all"
        ? sessions
        : sessions.filter(
            (s) => s.subject === selectedCourse || s.class_id === selectedCourse
          );

    const filteredRecords = records.filter((r) =>
      filteredSessions.some((s) => s._id === r.session._id)
    );

    let filteredStudents = students;
    if (selectedCourse !== "all") {
      const courseData = myCourses.find((c) => c._id === selectedCourse);
      if (courseData?.semester) {
        filteredStudents = students.filter(
          (s) => s.semester === courseData.semester
        );
      }
    }

    return { filteredSessions, filteredRecords, filteredStudents };
  };

  const { filteredSessions, filteredRecords, filteredStudents } =
    getFilteredData();

  // ✅ Stats
  const totalSessions = filteredSessions.length;
  const totalStudents = filteredStudents.length;
  const totalPresent = filteredRecords.filter(
    (r) => r.status === "present"
  ).length;
  const expected = totalSessions * totalStudents;
  const averageAttendance =
    expected > 0 ? Math.round((totalPresent / expected) * 100) : 0;

  // ✅ Weekly chart data
  const weeklyData = (() => {
    const weekly = {};
    filteredSessions.forEach((session) => {
      const dateKey = new Date(session.class_date).toISOString().split("T")[0];
      const presentCount = filteredRecords.filter(
        (r) => r.session._id === session._id && r.status === "present"
      ).length;
      if (!weekly[dateKey]) {
        weekly[dateKey] = {
          week: dateKey,
          expected: totalStudents,
          present: 0,
        };
      }
      weekly[dateKey].present += presentCount;
    });

    return Object.values(weekly).map((d) => ({
      ...d,
      percentage: d.expected ? Math.round((d.present / d.expected) * 100) : 0,
    }));
  })();

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-700">Loading analytics data...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            My Teaching Analytics
          </h1>
          <p className="text-gray-600 text-lg">
            Track attendance and engagement for your courses
          </p>
        </div>

        {/* Filter */}
        <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Label
                htmlFor="course-select"
                className="font-semibold text-gray-700"
              >
                Filter by Course:
              </Label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger id="course-select" className="w-64">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All My Courses</SelectItem>
                  {myCourses.map((course) => (
                    <SelectItem key={course._id} value={course._id}>
                      {course.course_name || course.name} (Sem {course.semester}
                      )
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="My Sessions"
            value={totalSessions}
            icon={<Calendar className="w-6 h-6 text-white" />}
            color="from-blue-500 to-blue-600"
          />
          <StatCard
            title="Total Students"
            value={totalStudents}
            icon={<Users className="w-6 h-6 text-white" />}
            color="from-green-500 to-green-600"
          />
          <StatCard
            title="Avg Attendance"
            value={`${averageAttendance}%`}
            icon={<TrendingUp className="w-6 h-6 text-white" />}
            color="from-purple-500 to-purple-600"
          />
          <StatCard
            title="Total Present Records"
            value={totalPresent}
            icon={<BookOpen className="w-6 h-6 text-white" />}
            color="from-orange-500 to-orange-600"
          />
        </div>

        {/* Weekly Trends */}
        <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
          <CardHeader>
            <CardTitle>Weekly Attendance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="percentage"
                  stroke="#8884d8"
                  strokeWidth={3}
                  name="Attendance (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <div className="mt-4">
          <StudentPerformance
            students={filteredStudents}
            records={filteredRecords}
            sessions={filteredSessions}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

// ✅ Reusable Stat Card
const StatCard = ({ title, value, icon, color }) => (
  <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);
