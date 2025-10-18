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
import {
  MoreHorizontal,
  Edit,
  Power,
  Mail,
  Phone,
  User,
  Building2,
  Delete,
} from "lucide-react";

export default function FacultyCard({ faculty, onEdit, onToggleStatus,onDelete }) {
  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "user":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (isActive) => {
    return isActive
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200";
  };


  return (
    <Card className="bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          {/* Profile Image */}
          {/* <div className="w-20 h-20 rounded-full mb-4 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <User className="w-10 h-10 text-gray-400" />
          </div> */}

          {/* Faculty Info */}
          <h3 className="font-bold text-lg text-gray-900 mb-1">
            {faculty.name}
          </h3>
          <p className="text-sm text-gray-500 mb-2">
            {faculty.faculty_id
              ? `ID: ${faculty.faculty_id}`
              : "No Employee ID"}
          </p>

          {/* Badges */}
          <div className="flex gap-2 mb-4 flex-wrap justify-center">
            <Badge> {faculty.phone}
            </Badge>
            <Badge
              className={getStatusColor(faculty.account_created)}
              variant="outline"
            >
              {faculty.account_created ? "Active" : "Inactive"}
            </Badge>
          </div>

          {/* Department & Designation */}
          {faculty.department && (
            <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
              <Building2 className="w-4 h-4" />
              <span>{faculty.department}</span>
            </div>
          )}
          {faculty.designation && (
            <p className="text-sm text-gray-600 mb-4 font-medium">
              {faculty.designation}
            </p>
          )}

          {/* Contact Info */}
          <div className="w-full space-y-2 mb-4">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Mail className="w-4 h-4" />
              <span className="truncate">{faculty.email}</span>
            </div>
            {faculty.phone && (
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Phone className="w-4 h-4" />
                <span>{faculty.phone}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="w-full flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="flex-1"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={onDelete}>
                  <Delete className="w-4 h-4 mr-2 red" />
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onToggleStatus}>
                  <Power className="w-4 h-4 mr-2" />
                  {faculty.is_active ? "Deactivate" : "Activate"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
