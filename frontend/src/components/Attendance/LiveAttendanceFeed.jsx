import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserCheck, UserX, Loader2 } from "lucide-react";

// const StudentList = ({ title, students, icon: Icon, badgeClass }) => (
//   <div>
//     <h4 className="flex items-center gap-2 font-semibold mb-3 text-gray-800">
//       <Icon className="w-5 h-5" />
//       {title}
//       <Badge className={badgeClass}>{students.length}</Badge>
//     </h4>
//     <div className="max-h-60 overflow-y-auto pr-2 space-y-2">
//       {students.length > 0 ? (
//         students.map((student) => (
//           <div key={student.id} className="p-2 bg-gray-50 rounded-md text-sm">
//             {student.full_name}
//           </div>
//         ))
//       ) : (
//         <p className="text-sm text-gray-500 italic px-2">No students yet.</p>
//       )}
//     </div>
//   </div>
// );

export default function LiveAttendanceFeed({
  presentStudents,
  absentStudents,
  isLoading,
}) {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border border-gray-100 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Live Feed
          {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* <StudentList
          title="Present Students"
          students={presentStudents}
          icon={UserCheck}
          badgeClass="bg-green-100 text-green-800"
        />
        <StudentList
          title="Absent Students"
          students={absentStudents}
          icon={UserX}
          badgeClass="bg-red-100 text-red-800"
        /> */}
      </CardContent>
    </Card>
  );
}
