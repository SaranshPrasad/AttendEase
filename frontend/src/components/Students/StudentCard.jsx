import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, Mail, User } from "lucide-react";
import { motion } from "framer-motion";

export default function StudentCard({ student, onEdit, onDelete }) {
  const getDepartmentColor = (department) => {
    const colors = {
      BCA: "bg-purple-100 text-purple-800",
      BSCIT: "bg-blue-100 text-blue-800",
      BCOMCA: "bg-green-100 text-green-800",
    };
    return colors[department] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status) => {
    if (status === true) return "bg-green-100 text-green-800 border-green-200";
    if (status === false) return "bg-red-100 text-red-800 border-red-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusLabel = (status) => {
    return status ? "Account Created" : "Pending";
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white/70 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group relative min-h-[260px] flex flex-col">
        <div className="absolute top-0 right-0 h-1.5 w-full bg-gradient-to-l from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        <CardContent className="p-6 flex-1 flex flex-col justify-between">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 leading-tight">
                    {student.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    ID: {student.student_id}
                  </p>
                </div>

                {/* Options Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 flex-shrink-0"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={onEdit}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={onDelete}
                      className="text-red-600 focus:bg-red-50 focus:text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Student
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Badges */}
              <div className="flex gap-2 mb-4 flex-wrap">
                <Badge
                  className={`${getDepartmentColor(
                    student.department
                  )} font-medium`}
                >
                  {student.department}
                </Badge>
                <Badge variant="outline">Semester: {student.semester}</Badge>
                <Badge
                  className={`${getStatusColor(
                    student.account_created
                  )} font-medium`}
                >
                  {getStatusLabel(student.account_created)}
                </Badge>
              </div>

              {/* Contact Info */}
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{student.email}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
