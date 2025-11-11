import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Download, Calendar, Filter } from "lucide-react";

export default function ReportsPage() {
  const [sessions, setSessions] = useState([]);
  const [records, setRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    course: "all",
    dateFrom: "",
    dateTo: "",
    reportType: "attendance_summary",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
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
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  const generateReport = () => {
    // Filter data based on selected filters
    let filteredSessions = sessions;
    let filteredRecords = records;

    if (filters.course !== "all") {
      const selectedCourse = courses.find((c) => c.id === filters.course);
      if (selectedCourse) {
        // Filter sessions by course (implement proper relationship)
        filteredSessions = sessions; // Placeholder
      }
    }

    if (filters.dateFrom) {
      filteredSessions = filteredSessions.filter(
        (s) => new Date(s.session_date) >= new Date(filters.dateFrom)
      );
    }

    if (filters.dateTo) {
      filteredSessions = filteredSessions.filter(
        (s) => new Date(s.session_date) <= new Date(filters.dateTo)
      );
    }

    const sessionIds = filteredSessions.map((s) => s.id);
    filteredRecords = records.filter((r) => sessionIds.includes(r.session_id));

    return { filteredSessions, filteredRecords };
  };

  const downloadReport = () => {
    const { filteredSessions, filteredRecords } = generateReport();

    // Generate CSV data
    let csvContent = "";

    if (filters.reportType === "attendance_summary") {
      csvContent = "Date,Class,Topic,Expected,Present,Attendance%\n";
      filteredSessions.forEach((session) => {
        const sessionRecords = filteredRecords.filter(
          (r) => r.session_id === session.id
        );
        const percentage =
          session.total_students_expected > 0
            ? Math.round(
                (sessionRecords.length / session.total_students_expected) * 100
              )
            : 0;

        csvContent += `${session.session_date},${session.topic || "Class"},${
          session.topic || "N/A"
        },${session.total_students_expected || 0},${
          sessionRecords.length
        },${percentage}%\n`;
      });
    } else if (filters.reportType === "student_detailed") {
      csvContent =
        "Student Name,Student ID,Course,Total Sessions,Attended,Attendance%\n";
      students.forEach((student) => {
        const studentRecords = filteredRecords.filter(
          (r) => r.student_id === student.id
        );
        const studentSessions = filteredSessions.length;
        const percentage =
          studentSessions > 0
            ? Math.round((studentRecords.length / studentSessions) * 100)
            : 0;

        csvContent += `${student.full_name},${student.student_id},${student.course},${studentSessions},${studentRecords.length},${percentage}%\n`;
      });
    }

    // Download CSV
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance_report_${filters.reportType}_${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const { filteredSessions, filteredRecords } = generateReport();

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Attendance Reports
              </h1>
              <p className="text-gray-600 text-lg">
                Generate and export detailed attendance reports
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Report Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label>Report Type</Label>
                <Select
                  value={filters.reportType}
                  onValueChange={(value) =>
                    setFilters({ ...filters, reportType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="attendance_summary">
                      Attendance Summary
                    </SelectItem>
                    <SelectItem value="student_detailed">
                      Student Detailed
                    </SelectItem>
                    <SelectItem value="course_wise">
                      Course-wise Report
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Course</Label>
                <Select
                  value={filters.course}
                  onValueChange={(value) =>
                    setFilters({ ...filters, course: value })
                  }
                >
                  <SelectTrigger>
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

              <div>
                <Label>From Date</Label>
                <Input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) =>
                    setFilters({ ...filters, dateFrom: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>To Date</Label>
                <Input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) =>
                    setFilters({ ...filters, dateTo: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                onClick={downloadReport}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download CSV Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Report Preview */}
        <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
          <CardHeader>
            <CardTitle>Report Preview</CardTitle>
            <p className="text-sm text-gray-600">
              Showing {filteredSessions.length} sessions and{" "}
              {filteredRecords.length} attendance records
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-2 font-semibold">Date</th>
                    <th className="text-left p-2 font-semibold">Session</th>
                    <th className="text-left p-2 font-semibold">Expected</th>
                    <th className="text-left p-2 font-semibold">Present</th>
                    <th className="text-left p-2 font-semibold">
                      Attendance %
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSessions.slice(0, 10).map((session) => {
                    const sessionRecords = filteredRecords.filter(
                      (r) => r.session_id === session.id
                    );
                    const percentage =
                      session.total_students_expected > 0
                        ? Math.round(
                            (sessionRecords.length /
                              session.total_students_expected) *
                              100
                          )
                        : 0;

                    return (
                      <tr key={session.id} className="border-b border-gray-100">
                        <td className="p-2">{session.session_date}</td>
                        <td className="p-2">
                          {session.topic || "Class Session"}
                        </td>
                        <td className="p-2">
                          {session.total_students_expected || 0}
                        </td>
                        <td className="p-2">{sessionRecords.length}</td>
                        <td className="p-2">
                          <span
                            className={`font-semibold ${
                              percentage >= 80
                                ? "text-green-600"
                                : percentage >= 60
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          >
                            {percentage}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
