
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { format } from "date-fns";
// import StudentDetailsCard from "../components/student/StudentDetailsCard";
// import TodayScheduleCard from "../components/student/TodayScheduleCard";
// import LiveClassesCard from "../components/student/LiveClassesCard";
// import { getUser } from "../lib/utils";

// export default function StudentDashboard() {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [todaySchedule, setTodaySchedule] = useState([]);
//   const [liveSessions, setLiveSessions] = useState([]);
//   const [studentId, setStudentId] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [markedSessions, setMarkedSessions] = useState([]);

//   const dayName = format(new Date(), "EEEE");

//   useEffect(() => {
//     const loadStudentData = async () => {
//       setIsLoading(true);
//       try {
//         const user = getUser();
//         if (!user?.semester || !user?.email) {
//           setIsLoading(false);
//           return;
//         }

//         setCurrentUser(user);

//         // Fetch timetable and student details together
//         const [timetableRes, studentRes] = await Promise.all([
//           axios.get(
//             `http://localhost:5001/student/view/timetable/${dayName}/${user.semester}`
//           ),
//           axios.get(`http://localhost:5001/student/view/email/${user.email}`, {
//             withCredentials: true,
//           }),
//         ]);

//         setTodaySchedule(timetableRes.data.timetable || []);
//         setStudentId(studentRes.data.student._id);

//         // Fetch active attendance sessions once after loading user data
//         await detectLiveSessions();
//       } catch {
//         // handle silently
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadStudentData();
//   }, []);

//   // Poll every minute for live sessions (only after schedule loaded)
//   useEffect(() => {
//     if (!todaySchedule.length) return;
//     const interval = setInterval(detectLiveSessions, 60000);
//     return () => clearInterval(interval);
//   }, [todaySchedule]);

//   const detectLiveSessions = async () => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:5001/attendance/active`,
//         { withCredentials: true }
//       );
//       setLiveSessions(data.sessions || []);
//     } catch {
//       // silently ignore errors to avoid UI flicker
//     }
//   };

//   const handleMarkAttendance = async (sessionId, facultyId, subjectId) => {
//     try {
//       const res = await axios.post(
//         "http://localhost:5001/attendance/mark",
//         {
//           sessionId,
//           class_id: subjectId,
//           faculty: facultyId,
//           student: studentId,
//         },
//         { withCredentials: true }
//       );

//       if (res.status === 200) {
//         alert("✅ Attendance marked successfully!");
//         setMarkedSessions((prev) => [...prev, sessionId]);
//       }
//     } catch (err) {
//       alert(
//         err.response?.data?.message || "Error marking attendance. Try again."
//       );
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
//             Welcome back, {currentUser?.name || "Student"}! Here's your day at a
//             glance.
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-8">
//             <LiveClassesCard
//               sessions={liveSessions}
//               isLoading={isLoading}
//               markedSessions={markedSessions}
//               onMarkAttendance={handleMarkAttendance}
//             />

//             <TodayScheduleCard
//               schedule={todaySchedule[0]?.slots || []}
//               isLoading={isLoading}
//             />
//           </div>

//           <div className="space-y-8">
//             <StudentDetailsCard student={currentUser} isLoading={isLoading} />
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
import { getUser } from "../lib/utils";

export default function StudentDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [liveSessions, setLiveSessions] = useState([]);
  const [markedSessions, setMarkedSessions] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const dayName = format(new Date(), "EEEE");

  // Fetch user, timetable, and live sessions initially
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const user = getUser();
        if (!user?.semester || !user?.email) return setIsLoading(false);

        setCurrentUser(user);

        // Fetch timetable and student details concurrently
        const [timetableRes, studentRes] = await Promise.all([
          axios.get(
            `http://localhost:5001/student/view/timetable/${dayName}/${user.semester}`
          ),
          axios.get(`http://localhost:5001/student/view/email/${user.email}`, {
            withCredentials: true,
          }),
        ]);
        console.log("Timetable Res : ", timetableRes)
        setTodaySchedule(timetableRes.data?.timetable || []);
        setStudentId(studentRes.data?.student?._id || "");

        // Fetch live sessions after initial load
        await fetchLiveSessions();
      } catch {
        // handle silently to prevent breaking UI
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Periodically check for new live sessions (every 60 seconds)
  useEffect(() => {
    if (!todaySchedule.length) return;

    const interval = setInterval(fetchLiveSessions, 60000);
    return () => clearInterval(interval);
  }, [todaySchedule]);

  // Fetch currently active attendance sessions
  const fetchLiveSessions = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5001/attendance/active`, {
        withCredentials: true,
      });
      setLiveSessions(data?.sessions || []);
    } catch {
      // ignore errors silently to avoid flicker
    }
  };

  // Mark attendance for a specific session
  const handleMarkAttendance = async (sessionId, facultyId, subjectId) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/attendance/mark",
        {
          sessionId,
          class_id: subjectId,
          faculty: facultyId,
          student: studentId,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("✅ Attendance marked successfully!");
        setMarkedSessions((prev) => [...prev, sessionId]);
      }
    } catch (error) {
      alert(
        error.response?.data?.message || "Error marking attendance. Try again."
      );
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent mb-2">
            Student Dashboard
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Welcome back, {currentUser?.name || "Student"}! Here's your day at a
            glance.
          </p>
        </header>

        {/* Dashboard Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <LiveClassesCard
              sessions={liveSessions}
              isLoading={isLoading}
              markedSessions={markedSessions}
              onMarkAttendance={handleMarkAttendance}
            />

            <TodayScheduleCard
              schedule={todaySchedule[0]?.slots || []}
              isLoading={isLoading}
            />
          </div>

          <div className="space-y-8">
            <StudentDetailsCard student={currentUser} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
