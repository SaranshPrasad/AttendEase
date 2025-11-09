
import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, BookOpen, GraduationCap, Building2 } from "lucide-react";

export default function CourseCard({ course, faculty }) {
  return (
    <Card className="relative overflow-hidden group rounded-3xl border border-gray-100 bg-white/70 backdrop-blur-md shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-50 opacity-40 group-hover:opacity-60 transition-all duration-500"></div>

      {/* Header */}
      <CardHeader className="relative z-10 border-b border-gray-100 pb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-500" />
            {course.name}
          </h2>
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              
                 "bg-green-100 text-green-700"
                
            }`}
          >
            Active
          </span>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="relative z-10 p-5 space-y-4">
        <div className="flex items-center gap-2 text-gray-700">
          <GraduationCap className="w-4 h-4 text-blue-500" />
          <p className="text-base">
            <span className="font-semibold text-gray-800">Semester:</span>{" "}
            {course.semester || "N/A"}
          </p>
        </div>

        {faculty && (
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-700">Faculty:</span>{" "}
            {faculty.name || "Not Assigned"}
          </p>
        )}
      </CardContent>

      {/* Footer */}
      <CardFooter className="relative z-10 border-t border-gray-100 p-4 flex justify-between items-center">
        
      </CardFooter>

      {/* Hover glow border */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-indigo-300 transition-all duration-500"></div>
    </Card>
  );
}
