// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { Skeleton } from "@/components/ui/skeleton";

// export default function AttendanceChart({ data, isLoading }) {
//   if (isLoading) {
//     return (
//       <Card className="bg-white border border-gray-100 shadow-lg">
//         <CardHeader>
//           <CardTitle>Attendance Overview</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Skeleton className="h-64 w-full" />
//         </CardContent>
//       </Card>
//     );
//   }

//   const { filteredSessions } = data;

//   console.log("FilteredSessions : ",data);

//   // Process data for chart
//   const chartData = filteredSessions.slice(0, 10).map((session, index) => ({
//     name: `Session ${index + 1}`,
//     present: session.total_present || 0,
//     expected: session.total_students_expected || 0,
//     percentage:
//       session.total_students_expected > 0
//         ? Math.round(
//             ((session.total_present || 0) / session.total_students_expected) *
//               100
//           )
//         : 0,
//   }));

//   return (
//     <Card className="bg-white border border-gray-100 shadow-lg">
//       <CardHeader>
//         <CardTitle>Recent Sessions Attendance</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip
//               formatter={(value, name) => {
//                 if (name === "present") return [value, "Present"];
//                 if (name === "expected") return [value, "Expected"];
//                 return [value, name];
//               }}
//             />
//             <Bar dataKey="expected" fill="#e5e7eb" name="expected" />
//             <Bar dataKey="present" fill="#3b82f6" name="present" />
//           </BarChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// }
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

export default function AttendanceChart({ data, isLoading }) {
  if (isLoading) {
    return (
      <Card className="bg-white border border-gray-100 shadow-lg">
        <CardHeader>
          <CardTitle>Attendance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  const { filteredSessions = [], filteredRecords = [], filteredStudents = [] } = data;

  console.log("Filtered Data: ", data);

  // ✅ Build chartData dynamically by matching session _id to records
  const chartData = filteredSessions.map((session, index) => {
    const sessionId = session._id;

    // All attendance records for this session
    const sessionRecords = filteredRecords.filter(
      (record) => record.session === sessionId
    );

    // Count presents
    const totalPresent = sessionRecords.filter(
      (r) => r.status === "present"
    ).length;

    // Expected count can be total students of that semester or total registered students
    const expectedCount = filteredStudents.filter(
      (s) => s.semester === session.semester
    ).length;

    // Calculate percentage
    const percentage =
      expectedCount > 0 ? Math.round((totalPresent / expectedCount) * 100) : 0;

    // Format class date (optional for clarity)
    const date = new Date(session.class_date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });

    return {
      name: `${session.class_day} (${date})`,
      present: totalPresent,
      expected: expectedCount,
      percentage,
    };
  });

  // Only show last 10 sessions (optional)
  const recentData = chartData.slice(-10);

  return (
    <Card className="bg-white border border-gray-100 shadow-lg">
      <CardHeader>
        <CardTitle>Recent Sessions Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={recentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value, name) => {
                if (name === "present") return [value, "Present"];
                if (name === "expected") return [value, "Expected"];
                return [value, name];
              }}
            />
            <Bar dataKey="expected" fill="#e5e7eb" name="Expected Students" />
            <Bar dataKey="present" fill="#3b82f6" name="Present Students" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
