import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen } from "lucide-react";

export default function CoursesHeader({ totalCourses, onAddCourse }) {
  const role = localStorage.getItem("role");
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
          <BookOpen className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Courses Management
          </h1>
          <p className="text-gray-600 text-lg mt-1">
            Manage {totalCourses} {totalCourses === 1 ? "course" : "courses"} in
            your system
          </p>
        </div>
      </div>
      {
        role === 'admin' && <Button
        onClick={onAddCourse}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white h-12 px-6 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Plus className="w-5 h-5 mr-2" />
        Create New Course
      </Button>
      }
    </div>
  );
}
