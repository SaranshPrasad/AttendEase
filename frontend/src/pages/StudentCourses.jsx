import React, { useState, useEffect } from "react";
// import { Course } from "@/entities/Course";
// import { Student } from "@/entities/Student";
// import { Schedule } from "@/entities/Schedule";
// import { AttendanceRecord } from "@/entities/AttendanceRecord";
// import { AttendanceSession } from "@/entities/AttendanceSession";
// import { User } from "@/entities/User";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Users, Clock, Calendar, TrendingUp } from "lucide-react";

export default function StudentCoursesPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [studentProfile, setStudentProfile] = useState(null);
  const [myCourses, setMyCourses] = useState([]);
  const [courseStats, setCourseStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
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

        // Calculate stats for each course
        const stats = {};
        for (const course of enrolledCourses) {
          const sessions = await AttendanceSession.list();
          const records = await AttendanceRecord.filter({
            student_id: studentProf.id,
          });

          // Filter sessions for this course (simplified)
          const courseSessions = sessions.filter((s) => {
            // Implement proper course-to-session relationship
            return true; // Placeholder
          });

          const courseRecords = records.filter((r) =>
            courseSessions.some((s) => s.id === r.session_id)
          );

          stats[course.id] = {
            totalSessions: courseSessions.length,
            attendedSessions: courseRecords.length,
            percentage:
              courseSessions.length > 0
                ? Math.round(
                    (courseRecords.length / courseSessions.length) * 100
                  )
                : 0,
            upcomingClasses: 3, // Placeholder
            credits: course.credits || 3,
          };
        }
        setCourseStats(stats);
      }
    } catch (error) {
      console.error("Error loading student courses:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                My Courses
              </h1>
              <p className="text-gray-600 text-lg">
                Track your enrolled courses and attendance
              </p>
            </div>
          </div>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(6)
              .fill(0)
              .map((_, i) => (
                <Card
                  key={i}
                  className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg animate-pulse"
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="h-6 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-4 bg-gray-200 rounded w-full" />
                      <div className="h-6 bg-gray-200 rounded" />
                    </div>
                  </CardContent>
                </Card>
              ))
          ) : myCourses.length > 0 ? (
            myCourses.map((course) => {
              const stats = courseStats[course.id] || {};
              return (
                <Card
                  key={course.id}
                  className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-900 mb-1">
                          {course.course_name}
                        </CardTitle>
                        <p className="text-gray-500 font-medium">
                          {course.course_code}
                        </p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        {stats.credits} Credits
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Attendance
                        </span>
                        <span className="text-lg font-bold text-purple-700">
                          {stats.percentage || 0}%
                        </span>
                      </div>
                      <Progress value={stats.percentage || 0} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">
                        {stats.attendedSessions || 0} of{" "}
                        {stats.totalSessions || 0} classes attended
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                        <p className="text-lg font-bold text-blue-900">
                          {stats.upcomingClasses || 0}
                        </p>
                        <p className="text-xs text-blue-700">Upcoming</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-green-600 mx-auto mb-1" />
                        <p className="text-lg font-bold text-green-900">
                          {course.credits || 3}
                        </p>
                        <p className="text-xs text-green-700">Credits</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <BookOpen className="w-20 h-20 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No courses enrolled
              </h3>
              <p className="text-gray-500">
                Contact your administrator to enroll in courses
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
