import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, BookOpen, Edit } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function StudentDetailsCard({ student, user, isLoading }) {
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
        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-4">
          {student?.photo_url ? (
            <img
              src={student.photo_url}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-12 h-12 text-gray-400" />
          )}
        </div>
        <CardTitle className="text-xl font-bold text-gray-900">
          {user?.name || "Student"}
        </CardTitle>
        <p className="text-gray-500">{student?.student_id || "No ID"}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Mail className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-700">{user?.email}</span>
        </div>

        {student?.phone && (
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Phone className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-700">{student.phone}</span>
          </div>
        )}

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <BookOpen className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-700">
            {student?.course || "No Course"}
          </span>
        </div>

        <div className="flex gap-2 justify-center">
          <Badge className="bg-blue-100 text-blue-800">
            {student?.session || "Unknown Year"}
          </Badge>
          <Badge
            className={
              student?.department === ("BCA" || "BSCIT")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }
          >
            {student?.department || "Unknown"}
          </Badge>
        </div>

        <Button variant="outline" className="w-full">
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
}
