// // import React, { useState, useEffect } from "react";
// // // import { User } from "@/entities/User";
// // // import { Student } from "@/entities/Student";
// // // import { Course } from "@/entities/Course";
// // // import { Schedule } from "@/entities/Schedule";
// // // import { AttendanceSession } from "@/entities/AttendanceSession";
// // import { format } from "date-fns";
// // import { createPageUrl } from "@/utils";
// // import StudentDetailsCard from "../components/student/StudentDetailsCard";
// // import TodayScheduleCard from "../components/student/TodayScheduleCard";
// // import LiveClassesCard from "../components/student/LiveClassesCard";
// // import AttendanceStatsCard from "../components/student/AttendanceStatsCard";
// // import { getUser } from "../lib/utils";

// // export default function StudentDashboard() {
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [studentProfile, setStudentProfile] = useState(null);
// //   const [myCourses, setMyCourses] = useState([]);
// //   const [todaySchedule, setTodaySchedule] = useState([]);
// //   const [liveSessions, setLiveSessions] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);

// //   useEffect(() => {
// //     loadStudentData();
// //   }, []);

// //   const loadStudentData = async () => {
// //     setIsLoading(true);
// //     try {
// //       const user = getUser();
// //       setCurrentUser(user);

// //       const students = user;
// //       if (students.length > 0) {
// //         const studentProf = user;
// //         setStudentProfile(studentProf);

// //         const allCourses = await Course.list();
// //         const enrolledCourses = allCourses.filter(
// //           (c) =>
// //             c.enrolled_students?.includes(studentProf.id) ||
// //             c.course === studentProf.course
// //         );
// //         setMyCourses(enrolledCourses);

// //         const today = format(new Date(), "EEEE"); // e.g., "Monday"
// //         const schedules = await Schedule.list();
// //         const enrolledCourseIds = enrolledCourses.map((c) => c.id);
// //         const todayScheds = schedules.filter(
// //           (s) =>
// //             s.day_of_week === today && enrolledCourseIds.includes(s.course_id)
// //         );
// //         setTodaySchedule(todayScheds);

// //         const activeSessions = await AttendanceSession.filter({
// //           is_active: true,
// //         });
// //         setLiveSessions(
// //           activeSessions.filter((s) => enrolledCourseIds.includes(s.course_id))
// //         ); // Simplified
// //       }
// //     } catch (error) {
// //       console.error("Error loading student data:", error);
// //     }
// //     setIsLoading(false);
// //   };

// //   return (
// //     <div className="p-4 md:p-8 min-h-screen">
// //       <div className="max-w-7xl mx-auto">
// //         <div className="mb-8">
// //           <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent mb-2">
// //             Student Dashboard
// //           </h1>
// //           <p className="text-gray-600 text-base md:text-lg">
// //             Welcome back, {currentUser?.full_name || "Student"}! Here's your day
// //             at a glance.
// //           </p>
// //         </div>

// //         <div className="grid lg:grid-cols-3 gap-8">
// //           <div className="lg:col-span-2 space-y-8">
// //             <LiveClassesCard
// //               sessions={liveSessions}
// //               studentId={studentProfile?.id}
// //               isLoading={isLoading}
// //             />
// //             <TodayScheduleCard
// //               schedule={todaySchedule}
// //               courses={myCourses}
// //               isLoading={isLoading}
// //             />
// //           </div>
// //           <div className="space-y-8">
// //             <StudentDetailsCard
// //               student={currentUser

// //               }
// //               user={currentUser}
// //               isLoading={isLoading}
// //             />
// //             {/* We can add a simplified attendance stats card here if needed */}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { format } from "date-fns";
// // import StudentDetailsCard from "../components/student/StudentDetailsCard";
// // import TodayScheduleCard from "../components/student/TodayScheduleCard";
// // import LiveClassesCard from "../components/student/LiveClassesCard";
// // import AttendanceStatsCard from "../components/student/AttendanceStatsCard";
// // import { getUser } from "../lib/utils";
// // import { toast } from "@/components/ui/use-toast";

// // export default function StudentDashboard() {
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [studentProfile, setStudentProfile] = useState(null);
// //   const [myCourses, setMyCourses] = useState([]);
// //   const [todaySchedule, setTodaySchedule] = useState([]);
// //   const [liveSessions, setLiveSessions] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);

// //   useEffect(() => {
// //     loadStudentData();
// //   }, []);

// //   const loadStudentData = async () => {
// //     setIsLoading(true);
// //     try {
// //       const user = getUser();
// //       setCurrentUser(user);
// //       setStudentProfile(user);

// //       if (!user?.semester) {
// //         console.error("Semester not found for user");
// //         setIsLoading(false);
// //         return;
// //       }

// //       // ✅ Fetch active attendance session for this semester
// //       const activeSessionRes = await axios.get(
// //         `http://localhost:5001/attendance/active/${user.semester}`
// //       );

// //       if (activeSessionRes.status === 200) {
// //         setLiveSessions([activeSessionRes.data]); // Keep array for LiveClassesCard compatibility
// //       } else {
// //         setLiveSessions([]);
// //       }

// //       // You can later add your Course and Schedule fetching logic here if needed
// //     } catch (error) {
// //       console.error("Error loading student data:", error);
// //       setLiveSessions([]);
// //     }
// //     setIsLoading(false);
// //   };

// //   // ✅ Function to mark attendance (called from LiveClassesCard)
// //   const handleMarkAttendance = async (sessionId) => {
// //     try {
// //       const res = await axios.post("/api/attendance/mark", {
// //         studentEmail: currentUser.email,
// //         sessionId: sessionId,
// //       });

// //       if (res.status === 200) {
// //         toast({ title: "✅ Attendance marked successfully" });
// //         // Optionally disable further marking or reload
// //         setLiveSessions([]);
// //       }
// //     } catch (err) {
// //       console.error("Error marking attendance:", err);
// //       const msg =
// //         err.response?.data?.message || "Error marking attendance. Try again.";
// //       toast({ title: msg, variant: "destructive" });
// //     }
// //   };

// //   return (
// //     <div className="p-4 md:p-8 min-h-screen">
// //       <div className="max-w-7xl mx-auto">
// //         <div className="mb-8">
// //           <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent mb-2">
// //             Student Dashboard
// //           </h1>
// //           <p className="text-gray-600 text-base md:text-lg">
// //             Welcome back, {currentUser?.name || "Student"}! Here's your day
// //             at a glance.
// //           </p>
// //         </div>

// //         <div className="grid lg:grid-cols-3 gap-8">
// //           <div className="lg:col-span-2 space-y-8">
// //             <LiveClassesCard
// //               sessions={liveSessions}
// //               studentId={studentProfile?.student_id}
// //               isLoading={isLoading}
// //               onMarkAttendance={handleMarkAttendance} // ✅ Added this prop
// //             />
// //             <TodayScheduleCard
// //               schedule={todaySchedule}
// //               courses={myCourses}
// //               isLoading={isLoading}
// //             />
// //           </div>

// //           <div className="space-y-8">
// //             <StudentDetailsCard
// //               student={currentUser}
// //               user={currentUser}
// //               isLoading={isLoading}
// //             />
// //             {/* You can add attendance stats or progress card here */}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import StudentDetailsCard from "../components/student/StudentDetailsCard";
// import TodayScheduleCard from "../components/student/TodayScheduleCard";
// import LiveClassesCard from "../components/student/LiveClassesCard";
// import AttendanceStatsCard from "../components/student/AttendanceStatsCard";
// import { getUser } from "../lib/utils";

// export default function StudentDashboard() {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [studentProfile, setStudentProfile] = useState(null);
//   const [myCourses, setMyCourses] = useState([]);
//   const [todaySchedule, setTodaySchedule] = useState([]);
//   const [liveSessions, setLiveSessions] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     loadStudentData();
//   }, []);

//   const loadStudentData = async () => {
//     setIsLoading(true);
//     try {
//       const user = getUser();
//       setCurrentUser(user);
//       setStudentProfile(user);

//       if (!user?.semester) {
//         console.error("Semester not found for user");
//         setIsLoading(false);
//         return;
//       }

//       // ✅ Fetch active attendance session for this student's semester
//       const res = await axios.get(
//         `http://localhost:5001/attendance/active/${user.semester}`
//       );

//       if (res.status === 200 && res.data) {
//         setLiveSessions([res.data]); // array format for mapping
//       } else {
//         setLiveSessions([]);
//       }
//     } catch (error) {
//       console.error("Error loading student data:", error);
//       setLiveSessions([]);
//     }
//     setIsLoading(false);
//   };

//   // ✅ Student marks attendance
//   const handleMarkAttendance = async (sessionId) => {
//     if (!currentUser?.email) {
//       alert("Student email not found!");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:5001/attendance/mark",
//         {
//           studentEmail: currentUser.email,
//           sessionId: sessionId,
//         }
//       );

//       if (res.status === 200) {
//         alert("✅ Attendance marked successfully!");
//         setLiveSessions([]); // Optionally clear or reload
//       }
//     } catch (err) {
//       console.error("Error marking attendance:", err);
//       const msg =
//         err.response?.data?.message || "Error marking attendance. Try again.";
//       alert(msg);
//     }
//   };

//   return (
//     <div className="p-4 md:p-8 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent mb-2">
//             Student Dashboard
//           </h1>
//           <p className="text-gray-600 text-base md:text-lg">
//             Welcome back, {currentUser?.name || "Student"}! Here’s your day at a glance.
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-8">
//             <LiveClassesCard
//               sessions={liveSessions}
//               studentId={studentProfile?.student_id}
//               isLoading={isLoading}
//               onMarkAttendance={handleMarkAttendance} // ✅ connect function
//             />
//             <TodayScheduleCard
//               schedule={todaySchedule}
//               courses={myCourses}
//               isLoading={isLoading}
//             />
//           </div>

//           <div className="space-y-8">
//             <StudentDetailsCard
//               student={currentUser}
//               user={currentUser}
//               isLoading={isLoading}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import StudentDetailsCard from "../components/student/StudentDetailsCard";
import TodayScheduleCard from "../components/student/TodayScheduleCard";
import LiveClassesCard from "../components/student/LiveClassesCard";
import AttendanceStatsCard from "../components/student/AttendanceStatsCard";
import { getUser } from "../lib/utils";

export default function StudentDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [studentProfile, setStudentProfile] = useState(null);
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [liveSessions, setLiveSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [studentData, setStudentData] = useState({});
  const [classId, setClassId] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [isMarked,setMarked] = useState(false);
  useEffect(() => {
    loadStudentData();
    // findStudent();
  }, []);
  console.log("Student Data : ", studentData);
  useEffect(() => {
    const interval = setInterval(() => {
      detectLiveSessions();
    }, 60000); // Check every 1 minute

    detectLiveSessions(); // Initial detection
    return () => clearInterval(interval);
  }, [todaySchedule]);
  const today = new Date(); // Current date
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const dayName = days[today.getDay()];

  // ✅ Load student profile + today's schedule
  const loadStudentData = async () => {
    setIsLoading(true);
    try {
      const user = getUser();
      setCurrentUser(user);
      setStudentProfile(user);
      console.log(user?.semester);
      if (!user?.semester) {
        console.error("Semester not found for user");
        setIsLoading(false);
        return;
      }

      // Replace with your schedule endpoint (dummy example below)
      // const live =  await axios.get(`http://localhost:5001/attendance/active`, {withCredentials:true});
      
      const timetable = await axios.get(
        `http://localhost:5001/student/view/timetable/${dayName}/${user?.semester}`
      );
      setTodaySchedule(timetable.data.timetable || []);


    // const findStudent = async () => {
    const res = await axios.get(`http://localhost:5001/student/view/${user?.email}`);
    console.log("Data ",res.data)
    setStudentData(res.data.student);
    setStudentId(res.data.student._id);
    console.log("Student Id : ",studentId);
  // }
    } catch (error) {
      console.error("Error loading student data:", error);
    }
    setIsLoading(false);
  };
  console.log(todaySchedule);

 

  // ✅ Detect live sessions from today’s schedule
  const detectLiveSessions = async () => {
    const live = await axios.get(`http://localhost:5001/attendance/active`, {
      withCredentials: true,
    });
    console.log("Live Data : ", live.data.response);
    const liveSession = live.data.response;
    const filterLiveSessions = liveSession?.filter((s) => s.class_day === dayName);
    console.log("Filtered : ",filterLiveSessions);
    setLiveSessions(filterLiveSessions);
  };

  // ✅ Mark attendance (linked to backend)
  // const handleMarkAttendance = async (sessionId) => {
  //   if (!currentUser?.email) return;
  //   try {
  //     const res = await axios.post("http://localhost:5001/attendance/mark", {
  //       studentEmail: currentUser.email,
  //       sessionId,
  //     });

  //     if (res.status === 200) {
  //       alert("✅ Attendance marked successfully!");
  //       // Optionally disable further marking
  //       setLiveSessions([]);
  //     }
  //   } catch (err) {
  //     console.error("Error marking attendance:", err);
  //     alert(
  //       err.response?.data?.message || "Error marking attendance. Try again."
  //     );
  //   }
  // };
const handleMarkAttendance = async (sessionId,facultyId, classId) => {
  try {
    const res = await axios.post(
      "http://localhost:5001/attendance/mark",
      {
        sessionId,
        class_id: classId,
        faculty: facultyId,
        student:studentId
      },
      { withCredentials: true } 
    );

    if (res.status === 200) {
      alert("✅ Attendance marked successfully!");
      setMarked(true);
      setLiveSessions([]);
    }
  } catch (err) {
    console.error("Error marking attendance:", err);
    alert(
      err.response?.data?.message || "Error marking attendance. Try again."
    );
  }
};

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent mb-2">
            Student Dashboard
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Welcome back, {currentUser?.name || "Student"}! Here's your day at a
            glance.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <LiveClassesCard
              sessions={liveSessions}
              studentId={studentProfile?.student_id}
              isLoading={isLoading}
              isMarked={isMarked}
              onMarkAttendance={handleMarkAttendance}
            />
            {/* <TodayScheduleCard
              schedule={todaySchedule}
              courses={todaySchedule.slots[0].subject}
              isLoading={isLoading}
            /> */}
            <TodayScheduleCard
              schedule={todaySchedule.length > 0 ? todaySchedule[0].slots : []} // Flatten slots
              isLoading={isLoading}
            />
          </div>

          <div className="space-y-8">
            <StudentDetailsCard
              student={currentUser}
              user={currentUser}
              isLoading={isLoading}
            />
            {/* <AttendanceStatsCard /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
