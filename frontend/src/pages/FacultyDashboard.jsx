// // import React, { useState, useEffect } from "react";
// // // import { Student } from "@/entities/Student";
// // // import { Class } from "@/entities/Class";
// // // import { AttendanceSession } from "@/entities/AttendanceSession";
// // // import { AttendanceRecord } from "@/entities/AttendanceRecord";
// // import { Link } from "react-router-dom";
// // import { createPageUrl } from "@/utils";
// // import {
// //   Users,
// //   BookOpen,
// //   Clock,
// //   TrendingUp,
// //   QrCode,
// //   BookMarked,
// //   FileText,
// // } from "lucide-react";

// // import DashboardStats from "../components/dashboard/DashboardStats";
// // import ActiveSessions from "../components/dashboard/ActiveSessions";
// // import QuickActions from "../components/dashboard/QuickActions";
// // import axios from "axios";
import Timetable from "../lib/Timetable";

// // export default function FacultyDashboard() {
// //   const [stats, setStats] = useState({
// //     myClasses: 0,
// //     activeSessions: 0,
// //     avgAttendance: 0,
// //   });
// //   const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

// //   const [activeSessions, setActiveSessions] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);

// //   useEffect(() => {
// //     loadDashboardData();
// //   }, []);

// //   const loadDashboardData = async () => {
// //     setIsLoading(true);
// //     try {
// //       const res = await axios.get(
// //         `http://localhost:5001/faculty/view/${storedUser.email}`
// //       );
// //       console.log(res);
// //       if (!res) {
// //         throw new Error("Data not found");
// //       }
// //       const sessionData = await Timetable.listByFaculty(storedUser.email);

// //       // const currentActiveSessions = sessions.filter(
// //       //   (session) => session.is_active
// //       // );

// //       // const totalExpected = sessions.reduce(
// //       //   (sum, session) => sum + (session.total_students_expected || 0),
// //       //   0
// //       // );
// //       // const totalPresent = sessions.reduce(
// //       //   (sum, session) => sum + (session.total_present || 0),
// //       //   0
// //       // );
// //       // const avgAttendance =
// //       //   totalExpected > 0 ? (totalPresent / totalExpected) * 100 : 0;

// //       setStats({
// //         myClasses: res?.data?.courses.length, // Placeholder
// //         activeSessions: sessionData.length,
// //         // avgAttendance: Math.round(avgAttendance),
// //       });

// //       // setActiveSessions(currentActiveSessions);
// //     } catch (error) {
// //       console.error("Error loading faculty dashboard data:", error);
// //     }
// //     // loadCourses();
// //     // loadActiveSessions();
// //     setIsLoading(false);
// //   };
  
// //   const getActiveSessions = async () => {

// //   }
// //   const facultyQuickActions = [
// //     {
// //       title: "Take Attendance",
// //       description: "Start a new session",
// //       icon: QrCode,
// //       url: "/attendance",
// //       gradient: "from-blue-500 to-blue-600",
// //     },
// //     {
// //       title: "My Courses",
// //       description: "View your assigned courses",
// //       icon: BookMarked,
// //       url: "/courses",
// //       gradient: "from-green-500 to-green-600",
// //     },
// //     {
// //       title: "Generate Reports",
// //       description: "Export attendance data",
// //       icon: FileText,
// //       url: "/reports",
// //       gradient: "from-purple-500 to-purple-600",
// //     },
// //   ];

// //   return (
// //     <div className="p-4 md:p-8 min-h-screen">
// //       <div className="max-w-7xl mx-auto">
// //         <div className="mb-8">
// //           <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
// //             Faculty Dashboard
// //           </h1>
// //           <p className="text-gray-600 text-base md:text-lg">
// //             Monitor attendance and manage your classes efficiently
// //           </p>
// //         </div>

// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
// //           <DashboardStats
// //             title="My Courses"
// //             value={stats.myClasses}
// //             icon={BookOpen}
// //             gradient="from-purple-500 to-purple-600"
// //             isLoading={isLoading}
// //           />
// //           <DashboardStats
// //             title="Live Sessions"
// //             value={stats.activeSessions}
// //             icon={Clock}
// //             gradient="from-green-500 to-green-600"
// //             isLoading={isLoading}
// //           />
// //           <DashboardStats
// //             title="My Avg. Attendance"
// //             value={`${stats.avgAttendance}%`}
// //             icon={TrendingUp}
// //             gradient="from-orange-500 to-orange-600"
// //             isLoading={isLoading}
// //           />
// //         </div>

// //         <div className="grid lg:grid-cols-3 gap-8">
// //           <div className="lg:col-span-2 space-y-8">
// //             <ActiveSessions sessions={activeSessions} isLoading={isLoading} />
// //           </div>
// //           <div className="space-y-8">
// //             <QuickActions actions={facultyQuickActions} title="My Actions" />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useState, useEffect } from "react";
// import { BookOpen, Clock, TrendingUp, QrCode, BookMarked, FileText } from "lucide-react";
// import DashboardStats from "../components/dashboard/DashboardStats";
// import ActiveSessions from "../components/dashboard/ActiveSessions";
// import QuickActions from "../components/dashboard/QuickActions";
// import axios from "axios";

// export default function FacultyDashboard() {
//   const [stats, setStats] = useState({
//     myClasses: 0,
//     activeSessions: 0,
//     avgAttendance: 0,
//   });
//   const [activeSessions, setActiveSessions] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

//   useEffect(() => {
//     loadDashboardData();
//   }, []);

//   const loadDashboardData = async () => {
//     setIsLoading(true);
//     try {
//       const res = await axios.get(`http://localhost:5001/faculty/view/${storedUser.email}`);
//       const { faculty, timetable } = res.data;
//       console.log(timetable);

//       // 🕒 Get current time
//       const now = new Date();
//       const currentDay = now.toLocaleString("en-US", { weekday: "long" }); // Monday, Tuesday, etc.
//       const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(
//         now.getMinutes()
//       ).padStart(2, "0")}`;

//       // 🔍 Filter ongoing classes for the current time
//       const liveSessions = timetable
//         .filter((cls) => cls.day === currentDay)
//         .flatMap((cls) =>
//           cls.slots
//             .filter((slot) => {
//               const { start_time, end_time } = slot;

//               // Compare current time with start & end time
//               return currentTime >= start_time && currentTime <= end_time;
//             })
//             .map((slot) => ({
//               id: cls._id,
//               class_id: cls.class_id,
//               semester: cls.semester,
//               day: cls.day,
//               subject_name: slot.subject ? slot.subject.name : "N/A",
//               room: slot.room,
//               start_time: slot.start_time,
//               end_time: slot.end_time,
//               faculty_name: slot.faculty.name,
//               session_time: `${slot.start_time} - ${slot.end_time}`,
//               total_students_expected: 60, // example placeholder
//               total_present: 0, // can be updated from attendance data later
//               topic: slot.subject ? slot.subject.name : "Lecture",
//             }))
//         );
//       console.log("Live Session :",liveSessions);
//       setActiveSessions(liveSessions);

//       setStats({
//         myClasses: faculty?.courses?.length || 0,
//         activeSessions: liveSessions.length,
//         avgAttendance: 0, // Placeholder
//       });
//     } catch (error) {
//       console.error("Error loading faculty dashboard data:", error);
//     }
//     setIsLoading(false);
//   };
//   console.log("Active : ",activeSessions);

//   const facultyQuickActions = [
//     {
//       title: "Take Attendance",
//       description: "Start a new session",
//       icon: QrCode,
//       url: "/attendance",
//       gradient: "from-blue-500 to-blue-600",
//     },
//     {
//       title: "My Courses",
//       description: "View your assigned courses",
//       icon: BookMarked,
//       url: "/courses",
//       gradient: "from-green-500 to-green-600",
//     },
//     {
//       title: "Generate Reports",
//       description: "Export attendance data",
//       icon: FileText,
//       url: "/reports",
//       gradient: "from-purple-500 to-purple-600",
//     },
//   ];

//   return (
//     <div className="p-4 md:p-8 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
//             Faculty Dashboard
//           </h1>
//           <p className="text-gray-600 text-base md:text-lg">
//             Monitor attendance and manage your classes efficiently
//           </p>
//         </div>

//         {/* 📊 Dashboard Stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           <DashboardStats
//             title="My Courses"
//             value={stats.myClasses}
//             icon={BookOpen}
//             gradient="from-purple-500 to-purple-600"
//             isLoading={isLoading}
//           />
//           <DashboardStats
//             title="Live Sessions"
//             value={stats.activeSessions}
//             icon={Clock}
//             gradient="from-green-500 to-green-600"
//             isLoading={isLoading}
//           />
//           <DashboardStats
//             title="My Avg. Attendance"
//             value={`${stats.avgAttendance}%`}
//             icon={TrendingUp}
//             gradient="from-orange-500 to-orange-600"
//             isLoading={isLoading}
//           />
//         </div>

//         {/* 🟢 Active Sessions + Quick Actions */}
//         <div className="grid lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-8">
//             <ActiveSessions sessions={activeSessions} isLoading={isLoading} />
//           </div>
//           <div className="space-y-8">
//             <QuickActions actions={facultyQuickActions} title="My Actions" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { BookOpen, Clock, TrendingUp, QrCode, BookMarked, FileText } from "lucide-react";
import DashboardStats from "../components/dashboard/DashboardStats";
import ActiveSessions from "../components/dashboard/ActiveSessions";
import QuickActions from "../components/dashboard/QuickActions";
import axios from "axios";


export default function FacultyDashboard() {
  const [stats, setStats] = useState({
    myClasses: 0,
    activeSessions: 0,
    avgAttendance: 0,
  });
  const [activeSessions, setActiveSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`http://localhost:5001/faculty/view/${storedUser.email}`);
      const { faculty } = res.data;
      const timetable = await Timetable.listByFaculty(storedUser.email);
      const now = new Date();
      const currentDay = now.toLocaleString("en-US", { weekday: "long" }); // Example: "Wednesday" 
      const liveSessions = timetable.filter(cls => cls.day === currentDay)
      console.log("🟢 Live Sessions Found:", liveSessions);
      setActiveSessions(liveSessions);
      setStats({
        myClasses: faculty?.courses?.length || 0,
        activeSessions: liveSessions.length,
        avgAttendance: 0,
      });
    } catch (error) {
      console.error("Error loading faculty dashboard data:", error);
    }
    setIsLoading(false);
  };
  
  const facultyQuickActions = [
    {
      title: "My Courses",
      description: "View your assigned courses",
      icon: BookMarked,
      url: "/courses",
      gradient: "from-green-500 to-green-600",
    },
    {
      title: "Generate Reports",
      description: "Export attendance data",
      icon: FileText,
      url: "/reports",
      gradient: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Faculty Dashboard
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Monitor attendance and manage your classes efficiently
          </p>
        </div>

        {/* 📊 Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <DashboardStats
            title="My Courses"
            value={stats.myClasses}
            icon={BookOpen}
            gradient="from-purple-500 to-purple-600"
            isLoading={isLoading}
          />
          <DashboardStats
            title="Live Sessions"
            value={stats.activeSessions}
            icon={Clock}
            gradient="from-green-500 to-green-600"
            isLoading={isLoading}
          />
          <DashboardStats
            title="My Avg. Attendance"
            value={`${stats.avgAttendance}%`}
            icon={TrendingUp}
            gradient="from-orange-500 to-orange-600"
            isLoading={isLoading}
          />
        </div>

        {/* 🟢 Active Sessions + Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ActiveSessions sessions={activeSessions} isLoading={isLoading} />
          </div>
          <div className="space-y-8">
            <QuickActions actions={facultyQuickActions} title="My Actions" />
          </div>
        </div>
      </div>
    </div>
  );
}
