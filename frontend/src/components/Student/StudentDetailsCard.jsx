import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, BookOpen, Edit } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { format } from "date-fns";

export default function StudentDetailsCard({ student, isLoading }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!student?.semester) return;

    const loadCourses = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/student/courses/view/${student.semester}`,
          { withCredentials: true }
        );
        setCourses(res.data?.courses || []);
      } catch (error) {
        console.error("Failed to fetch courses:", error.message);
      }
    };

    loadCourses();
  }, [student?.semester]);

  if (isLoading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <Skeleton className="w-24 h-24 rounded-full mx-auto" />
            <Skeleton className="h-6 w-32 mx-auto" />
            <Skeleton className="h-4 w-24 mx-auto" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
      <CardHeader className="text-center pb-4">
        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center mb-4 shadow-md">
          {student?.photo_url ? (
            <img
              src={student.photo_url}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white text-3xl font-semibold">
              {student?.name
                ? student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                : "S"}
            </span>
          )}
        </div>

        <CardTitle className="text-xl font-bold text-gray-900">
          {student?.name || "Student"}
        </CardTitle>
        <p className="text-gray-500">{student?.student_id || "No ID"}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Mail className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-700">{student?.email}</span>
        </div>

        {student?.phone && (
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Phone className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-700">{student.phone}</span>
          </div>
        )}

        <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-700 font-medium">
              Courses ({courses.length})
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mt-1">
            {courses.length > 0 ? (
              courses.map((course) => (
                <Badge
                  key={course._id}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1"
                >
                  {course.course_id} - {course.name || "Unnamed Course"}
                </Badge>
              ))
            ) : (
              <span className="text-xs text-gray-500">
                No courses assigned yet
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2 justify-center">
          <Badge className="bg-blue-100 text-blue-800">
            {student?.session || "Unknown Year"}
          </Badge>
          <Badge
            className={
              student?.department === "BCA" || student?.department === "BSCIT"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }
          >
            {student?.department || "Unknown"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
