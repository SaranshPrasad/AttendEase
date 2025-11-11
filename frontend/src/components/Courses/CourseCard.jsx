import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Power,
  Users,
  Clock,
  User,
  Building2,
} from "lucide-react";
import { motion } from "framer-motion";

import Faculty from "../../lib/Faculty";

export default function CourseCard({
  course,
  onEdit,
  onDelete,
  onToggleStatus,
}) {
  const [facultyData, setFacultyData] = useState([]);

  useEffect(() => {
    const loadFaculty = async () => {
      const faculty = await Faculty.list();
      setFacultyData(faculty);
    };
    loadFaculty();
  }, []);

  const getAssignedFacultyNames = () => {
    if (!course.faculties || course.faculties.length === 0)
      return ["Not Assigned"];
    return course.faculties
      .map((id) => {
        const member = facultyData.find((f) => f._id === id);
        return member ? member.name : null;
      })
      .filter(Boolean);
  };

  const assignedFaculty = getAssignedFacultyNames();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white/70 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
        <CardHeader className="p-6 pb-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <Badge variant="outline" className="text-xs font-medium mb-2">
                {course.course_id}
              </Badge>
              <CardTitle className="text-lg font-bold text-gray-900 leading-tight">
                {course.name}
              </CardTitle>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEdit}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Course
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onToggleStatus}>
                  <Power className="w-4 h-4 mr-2" />
                  {course.is_active ? "Deactivate" : "Activate"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete} className="text-red-600">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Course
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-0">
          <div className="space-y-3">
            {/* Department */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Building2 className="w-4 h-4" />
              <span>{course.semester}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>{assignedFaculty.join(", ")}</span>
            </div>

            {/* Credits */}
            {course.credits && (
              <div className="text-sm text-gray-600">
                <strong>Credits:</strong> {course.credits}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-4 bg-gray-50/50">
          <Badge
            className="bg-green-100 text-green-800 border-green-200"
            variant="outline"
          >
            Active
          </Badge>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
