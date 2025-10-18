// // import React, { useState, useEffect, useCallback } from "react";
// // // import { Class } from "@/entities/Class";
// // // import { AttendanceSession } from "@/entities/AttendanceSession";
// // // import { AttendanceRecord } from "@/entities/AttendanceRecord";
// // // import { Student } from "@/entities/Student";
// // import { Button } from "@/components/ui/button";
// // import { QrCode, Users, Clock, CheckCircle } from "lucide-react";
// // import { AnimatePresence, motion } from "framer-motion";
// // import { useParams } from "react-router";
// // import axios from "axios";
// // import AttendanceHeader from "../components/Attendance/AttendanceHeader";
// // import ClassSelector from "../components/Attendance/ClassSelector";
// // import QRCodeDisplay from "../components/Attendance/QrCodeDisplay";
// // import LiveAttendanceFeed from "../components/Attendance/LiveAttendanceFeed";
// // import AttendanceSummary from "../components/Attendance/AttendanceSummary";

// // export default function AttendancePage() {
// //   const [classes, setClasses] = useState([]);
// //   const [selectedClass, setSelectedClass] = useState([]);
// //   const [activeSession, setActiveSession] = useState(null);
// //   const [attendanceRecords, setAttendanceRecords] = useState([]);
// //   const [students, setStudents] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const {id} = useParams();
// //   useEffect(() => {
// //     loadData();
// //     if(classes != null) setIsLoading(false);
// //   }, []);
// //   const loadData = async () => {
// //     const res = await axios.get(`http://localhost:5001/admin/view/timetable/${id}`);
// //     setClasses(res.data.timetables);
// //     console.log("Classes : ",res.data.timetables)
// //   }

// //   return (
// //     <div className="p-4 md:p-8 min-h-screen bg-gray-50 subtle-dots-bg">
// //       <div className="max-w-7xl mx-auto">
// //         <AttendanceHeader
// //           activeSession={activeSession}
// //           // onEndSession={endAttendanceSession}
// //           selectedClass={selectedClass}
// //         />

// //         <AnimatePresence mode="wait">
// //           {!activeSession ? (
// //             <motion.div
// //               key="selector"
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               exit={{ opacity: 0, y: -20 }}
// //             >
// //               <ClassSelector
// //                 selectedClass={classes}
// //                 setSelectedClass={setSelectedClass}
// //                 // onStartSession={startAttendanceSession}
// //                 isLoading={isLoading}
// //               />
// //             </motion.div>
// //           ) : (
// //             <motion.div
// //               key="active-session"
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               exit={{ opacity: 0, y: -20 }}
// //             >
// //               <div className="grid lg:grid-cols-3 gap-8">
// //                 {/* Main Content - QR Code */}
// //                 <div className="lg:col-span-2">
// //                   <QRCodeDisplay
// //                     session={activeSession}
// //                     selectedClass={selectedClass}
// //                   />
// //                 </div>

// //                 {/* Sidebar - Live Attendance */}
// //                 <div className="lg:col-span-1 space-y-6">
// //                   <AttendanceSummary
// //                     // expectedCount={getEligibleStudents().length}
// //                     presentCount={attendanceRecords.length}
// //                     session={activeSession}
// //                   />

// //                   <LiveAttendanceFeed
// //                     // presentStudents={getPresentStudents()}
// //                     // absentStudents={getAbsentStudents()}
// //                     isLoading={isLoading}
// //                   />
// //                 </div>
// //               </div>
// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useState, useEffect } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { useParams } from "react-router";
// import axios from "axios";

// import AttendanceHeader from "../components/Attendance/AttendanceHeader";
// import ClassSelector from "../components/Attendance/ClassSelector";
// import QRCodeDisplay from "../components/Attendance/QrCodeDisplay";
// import LiveAttendanceFeed from "../components/Attendance/LiveAttendanceFeed";
// import AttendanceSummary from "../components/Attendance/AttendanceSummary";

// export default function AttendancePage() {
//   const [classes, setClasses] = useState([]); // ✅ should be array
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [activeSession, setActiveSession] = useState(null);
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const { id } = useParams();

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         setIsLoading(true);
//         const res = await axios.get(`http://localhost:5001/admin/view/timetable/${id}`);
//         console.log("Fetched Classes:", res.data.timetables);
//         setClasses(res.data.timetables || []); // ✅ ensure array
//       } catch (err) {
//         console.error("Error fetching classes:", err);
//         setClasses([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadData();
//   }, [id]);

//   // ✅ optional: for now, just show alert when starting session
//   const handleStartSession = (selectedClassData, sessionDetails) => {
//     console.log("Starting Session for:", selectedClassData);
//     console.log("Session Details:", sessionDetails);
//     setActiveSession({
//       ...sessionDetails,
//       class: selectedClassData,
//       startedAt: new Date().toISOString(),
//     });
//   };

//   return (
//     <div className="p-4 md:p-8 min-h-screen bg-gray-50 subtle-dots-bg">
//       <div className="max-w-7xl mx-auto">
//         <AttendanceHeader
//           activeSession={activeSession}
//           selectedClass={selectedClass}
//         />

//         <AnimatePresence mode="wait">
//           {!activeSession ? (
//             <motion.div
//               key="selector"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//             >
//               <ClassSelector
//                 selectedClass={classes}
//                 setSelectedClass={setSelectedClass}
//                 onStartSession={handleStartSession}
//                 isLoading={isLoading}
//               />
//             </motion.div>
//           ) : (
//             <motion.div
//               key="active-session"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//             >
//               <div className="grid lg:grid-cols-3 gap-8">
//                 {/* Main Content - QR Code */}
//                 <div className="lg:col-span-2">
//                   <QRCodeDisplay
//                     session={activeSession}
//                     selectedClass={selectedClass}
//                   />
//                 </div>

//                 {/* Sidebar - Live Attendance */}
//                 <div className="lg:col-span-1 space-y-6">
//                   {/* <AttendanceSummary
//                     presentCount={attendanceRecords.length}
//                     session={activeSession}
//                   /> */}

//                   {/* <LiveAttendanceFeed
//                     isLoading={isLoading}
//                   /> */}
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

import AttendanceHeader from "../components/Attendance/AttendanceHeader";
import ClassSelector from "../components/Attendance/ClassSelector";
import QRCodeDisplay from "../components/Attendance/QrCodeDisplay";
import LiveAttendanceFeed from "../components/Attendance/LiveAttendanceFeed";
import AttendanceSummary from "../components/Attendance/AttendanceSummary";

export default function AttendancePage() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [activeSession, setActiveSession] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setIsActive] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const checkActiveSession = async () => {
      const storedSession = localStorage.getItem("active-session");
      if (storedSession) {
        try {
          const activeSession = JSON.parse(storedSession); // convert string back to object
          console.log(activeSession); // now it’s a proper object

          if (activeSession === null) {
            setIsActive(false);
          } else {
            setIsActive(true);
            setActiveSession(activeSession); // restore session state
          }
        } catch (err) {
          console.error("Failed to parse localStorage session:", err);
          setIsActive(false);
        }
      } else {
        setIsActive(false);
      }
    };
    loadData();
    checkActiveSession();
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5001/admin/view/timetable/${id}`
      );
      setClasses(res.data.timetables || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  console.log();
  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50 subtle-dots-bg">
      <div className="max-w-7xl mx-auto">
        <AttendanceHeader
          activeSession={activeSession}
          selectedClass={selectedClass}
        />

        <AnimatePresence mode="wait">
          {!activeSession ? (
            <motion.div
              key="selector"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {!isActive && (
                <ClassSelector
                  selectedClass={classes}
                  setSelectedClass={setSelectedClass}
                  onStartSession={(session) => setActiveSession(session)}
                  isLoading={isLoading}
                  setIsActive={setIsActive}
                />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="active-session"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid  gap-8">
                {/* Sidebar - Live Attendance */}
                <div className="lg:col-span-1 space-y-6">
                  <AttendanceSummary
                    presentCount={attendanceRecords.length}
                    session={activeSession}
                  />

                  <LiveAttendanceFeed isLoading={isLoading} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
