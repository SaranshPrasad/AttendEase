// // // import React from "react";
// // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // import { Badge } from "@/components/ui/badge";
// // // import { Button } from "@/components/ui/button";
// // // import { Clock, Users, MapPin, QrCode } from "lucide-react";

// // // export default function LiveClassesCard({
// // //   sessions,
// // //   userLocation,
// // //   studentId,
// // //   isLoading,
// // // }) {
// // //   const calculateDistance = (lat1, lon1, lat2, lon2) => {
// // //     const R = 6371000;
// // //     const dLat = ((lat2 - lat1) * Math.PI) / 180;
// // //     const dLon = ((lon2 - lon1) * Math.PI) / 180;
// // //     const a =
// // //       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
// // //       Math.cos((lat1 * Math.PI) / 180) *
// // //         Math.cos((lat2 * Math.PI) / 180) *
// // //         Math.sin(dLon / 2) *
// // //         Math.sin(dLon / 2);
// // //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
// // //     return R * c;
// // //   };

// // //   const isWithinRange = (session) => {
// // //     if (!userLocation || !session.location_lat || !session.location_lng)
// // //       return true;
// // //     const distance = calculateDistance(
// // //       userLocation.lat,
// // //       userLocation.lng,
// // //       session.location_lat,
// // //       session.location_lng
// // //     );
// // //     return distance <= 50;
// // //   };

// // //   return (
// // //     <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
// // //       <CardHeader>
// // //         <CardTitle className="flex items-center gap-2">
// // //           <div className="relative flex h-3 w-3">
// // //             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
// // //             <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
// // //           </div>
// // //           Live Classes
// // //         </CardTitle>
// // //       </CardHeader>
// // //       <CardContent>
// // //         {sessions.length > 0 ? (
// // //           <div className="space-y-4">
// // //             {sessions.map((session) => {
// // //               const withinRange = isWithinRange(session);
// // //               return (
// // //                 <div
// // //                   key={session.id}
// // //                   className="p-4 border border-gray-200 rounded-xl bg-white"
// // //                 >
// // //                   <div className="flex justify-between items-start mb-3">
// // //                     <div>
// // //                       <h4 className="font-semibold text-gray-900">
// // //                         {session.topic || "Live Class"}
// // //                       </h4>
// // //                       <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
// // //                         <Clock className="w-4 h-4" />
// // //                         <span>{session.session_time}</span>
// // //                       </div>
// // //                     </div>
// // //                     <Badge
// // //                       className={
// // //                         withinRange
// // //                           ? "bg-green-100 text-green-800"
// // //                           : "bg-yellow-100 text-yellow-800"
// // //                       }
// // //                     >
// // //                       {withinRange ? "In Range" : "Out of Range"}
// // //                     </Badge>
// // //                   </div>

// // //                   <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
// // //                     <Users className="w-4 h-4" />
// // //                     <span>{session.total_present || 0} students present</span>
// // //                   </div>

// // //                   <Button
// // //                     disabled={!withinRange}
// // //                     size="sm"
// // //                     className={`w-full ${
// // //                       withinRange
// // //                         ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
// // //                         : "bg-gray-200 text-gray-500"
// // //                     }`}
// // //                   >
// // //                     <QrCode className="w-4 h-4 mr-2" />
// // //                     {withinRange
// // //                       ? "Mark Attendance"
// // //                       : "Move Closer to Classroom"}
// // //                   </Button>
// // //                 </div>
// // //               );
// // //             })}
// // //           </div>
// // //         ) : (
// // //           <div className="text-center py-8">
// // //             <Clock className="w-12 h-12 mx-auto text-gray-300 mb-3" />
// // //             <p className="text-gray-500">No live classes right now</p>
// // //           </div>
// // //         )}
// // //       </CardContent>
// // //     </Card>
// // //   );
// // // }

// // import React from "react";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// // import { Button } from "@/components/ui/button";
// // import { Clock, Users, QrCode } from "lucide-react";

// // export default function LiveClassesCard({
// //   sessions,
// //   userLocation,
// //   studentId,
// //   isLoading,
// //   onMarkAttendance, // ✅ added prop
// // }) {
// //   const calculateDistance = (lat1, lon1, lat2, lon2) => {
// //     const R = 6371000;
// //     const dLat = ((lat2 - lat1) * Math.PI) / 180;
// //     const dLon = ((lon2 - lon1) * Math.PI) / 180;
// //     const a =
// //       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
// //       Math.cos((lat1 * Math.PI) / 180) *
// //         Math.cos((lat2 * Math.PI) / 180) *
// //         Math.sin(dLon / 2) *
// //         Math.sin(dLon / 2);
// //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
// //     return R * c;
// //   };

// //   const isWithinRange = (session) => {
// //     if (!userLocation || !session.location_lat || !session.location_lng)
// //       return true;
// //     const distance = calculateDistance(
// //       userLocation.lat,
// //       userLocation.lng,
// //       session.location_lat,
// //       session.location_lng
// //     );
// //     return distance <= 50;
// //   };

// //   if (isLoading) {
// //     return (
// //       <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg p-6 text-center">
// //         <p className="text-gray-500">Loading live classes...</p>
// //       </Card>
// //     );
// //   }

// //   return (
// //     <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
// //       <CardHeader>
// //         <CardTitle className="flex items-center gap-2">
// //           <div className="relative flex h-3 w-3">
// //             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
// //             <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
// //           </div>
// //           Live Classes
// //         </CardTitle>
// //       </CardHeader>
// //       <CardContent>
// //         {sessions.length > 0 ? (
// //           <div className="space-y-4">
// //             {sessions.map((session) => {
// //               const withinRange = isWithinRange(session);
// //               return (
// //                 <div
// //                   key={session._id}
// //                   className="p-4 border border-gray-200 rounded-xl bg-white"
// //                 >
// //                   <div className="flex justify-between items-start mb-3">
// //                     <div>
// //                       <h4 className="font-semibold text-gray-900">
// //                         {session.subject?.name || session.topic || "Live Class"}
// //                       </h4>
// //                       <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
// //                         <Clock className="w-4 h-4" />
// //                         <span>
// //                           {session.start_time
// //                             ? new Date(session.start_time).toLocaleTimeString()
// //                             : "Ongoing"}
// //                         </span>
// //                       </div>
// //                     </div>
// //                     <Badge
// //                       className={
// //                         withinRange
// //                           ? "bg-green-100 text-green-800"
// //                           : "bg-yellow-100 text-yellow-800"
// //                       }
// //                     >
// //                       {withinRange ? "In Range" : "Out of Range"}
// //                     </Badge>
// //                   </div>

// //                   <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
// //                     <Users className="w-4 h-4" />
// //                     <span>{session.total_present || 0} students present</span>
// //                   </div>

// //                   <Button
// //                     disabled={!withinRange}
// //                     size="sm"
// //                     className={`w-full ${
// //                       withinRange
// //                         ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
// //                         : "bg-gray-200 text-gray-500"
// //                     }`}
// //                     onClick={() => onMarkAttendance(session._id)} // ✅ integrated
// //                   >
// //                     <QrCode className="w-4 h-4 mr-2" />
// //                     {withinRange
// //                       ? "Mark Attendance"
// //                       : "Move Closer to Classroom"}
// //                   </Button>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         ) : (
// //           <div className="text-center py-8">
// //             <Clock className="w-12 h-12 mx-auto text-gray-300 mb-3" />
// //             <p className="text-gray-500">No live classes right now</p>
// //           </div>
// //         )}
// //       </CardContent>
// //     </Card>
// //   );
// // }

// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Clock, Users, QrCode } from "lucide-react";

// export default function LiveClassesCard({
//   sessions = [],
//   onMarkAttendance,
//   isLoading,
// }) {
//   const canMarkAttendance = (session) => {
//     if (!session.end_time) return false;
//     const now = new Date();
//     const endTime = new Date(`1970-01-01T${session.end_time}:00`);
//     const diffMinutes = (endTime - now) / 60000;
//     return diffMinutes <= 5 && diffMinutes >= 0; // last 5 minutes
//   };

//   return (
//     <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <div className="relative flex h-3 w-3">
//             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//             <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//           </div>
//           Live Classes
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         {isLoading ? (
//           <p className="text-gray-500 text-center py-8">Loading sessions...</p>
//         ) : sessions.length > 0 ? (
//           <div className="space-y-4">
//             {sessions.map((session) => {
//               const markable = canMarkAttendance(session);
//               return (
//                 <div
//                   key={session._id || session.id}
//                   className="p-4 border border-gray-200 rounded-xl bg-white"
//                 >
//                   <div className="flex justify-between items-start mb-3">
//                     <div>
//                       <h4 className="font-semibold text-gray-900">
//                         {session.subject?.name || session.topic || "Live Class"}
//                       </h4>
//                       <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
//                         <Clock className="w-4 h-4" />
//                         <span>
//                           {session.start_time} - {session.end_time}
//                         </span>
//                       </div>
//                     </div>
//                     <Badge
//                       className={`${
//                         markable
//                           ? "bg-green-100 text-green-800"
//                           : "bg-yellow-100 text-yellow-800"
//                       }`}
//                     >
//                       {session.status === "active"? "Active" : "Ongoing"}
//                     </Badge>
//                   </div>

//                   <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
//                     <Users className="w-4 h-4" />
//                     <span>{session.total_present || 0} students present</span>
//                   </div>

//                   <Button
//                     disabled={!markable}
//                     onClick={() =>
//                       onMarkAttendance && onMarkAttendance(session._id)
//                     }
//                     size="sm"
//                     className={`w-full ${
//                       markable
//                         ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
//                         : "bg-gray-200 text-gray-500"
//                     }`}
//                   >
//                     <QrCode className="w-4 h-4 mr-2" />
//                     {markable
//                       ? "Mark Attendance"
//                       : "Attendance Opens Soon"}
//                   </Button>
//                 </div>
//               );
//             })}
//           </div>
//         ) : (
//           <div className="text-center py-8">
//             <Clock className="w-12 h-12 mx-auto text-gray-300 mb-3" />
//             <p className="text-gray-500">No live classes right now</p>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }
// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Clock, Users, QrCode } from "lucide-react";
// import axios from "axios";

// export default function LiveClassesCard({ sessions = [], onMarkAttendance, isLoading, isMarked }) {
//   const canMarkAttendance = (session) => session.status === "active";
   

//   const getStats = async (sessionId) => {
//     try {
//       const res = await axios.get(`http://localhost:5001/attendance/session/${sessionId}/stats`)
//     } catch (error) {
      
//     }
//   }
//   return (
//     <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <div className="relative flex h-3 w-3">
//             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//             <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//           </div>
//           Live Classes
//         </CardTitle>
//       </CardHeader>

//       <CardContent>
//         {isLoading ? (
//           <p className="text-gray-500 text-center py-8">Loading sessions...</p>
//         ) : sessions.length > 0 ? (
//           <div className="space-y-4">
//             {sessions.map((session) => (
//               <div key={session._id} className="p-4 border border-gray-200 rounded-xl bg-white">
//                 <div className="flex justify-between items-start mb-3">
//                   <div>
//                     <h4 className="font-semibold text-gray-900">
//                       {session.subject?.name +" By "+ session.faculty?.name}
//                     </h4>
//                     <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
//                       <Clock className="w-4 h-4" />
//                       <span>
//                         {session.start_time} - {session.end_time}
//                       </span>
//                     </div>
//                   </div>
//                   <Badge
//                     className={`${
//                       canMarkAttendance(session)
//                         ? "bg-green-100 text-green-800"
//                         : "bg-yellow-100 text-yellow-800"
//                     }`}
//                   >
//                     {session.status === "active" ? "Active" : "Ongoing"}
//                   </Badge>
//                 </div>

//                 <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
//                   <Users className="w-4 h-4" />
//                   <span>{session.total_present || 0} students present</span>
//                 </div>

//                 <Button
//                   disabled={isMarked}
//                   onClick={() => onMarkAttendance && onMarkAttendance(session._id, session.faculty?._id, session.subject._id)}
//                   size="sm"
//                   className={`w-full ${
//                     isMarked
//                       ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
//                       : "bg-gray-200 text-gray-500"
//                   }`}
//                 >
//                   {/* <QrCode className="w-4 h-4 mr-2" /> */}
//                   {isMarked ? "Mark Attendance" : "Already Marked"}
//                 </Button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-8">
//             <Clock className="w-12 h-12 mx-auto text-gray-300 mb-3" />
//             <p className="text-gray-500">No live classes right now</p>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users } from "lucide-react";
import axios from "axios";

export default function LiveClassesCard({
  sessions = [],
  onMarkAttendance,
  isLoading,
  isMarked,
}) {
  const [stats, setStats] = useState({}); // store stats for each session

  const canMarkAttendance = (session) => session.status === "active";

  // Fetch stats for all sessions
  useEffect(() => {
    if (sessions.length > 0) {
      fetchAllStats();
    }
  }, [sessions]);

  const fetchAllStats = async () => {
    try {
      const updatedStats = {};
      for (const session of sessions) {
        const res = await axios.get(
          `http://localhost:5001/attendance/session/${session._id}/stats`
        );
        updatedStats[session._id] = res.data.total_present;
      }
      setStats(updatedStats);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </div>
          Live Classes
        </CardTitle>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <p className="text-gray-500 text-center py-8">Loading sessions...</p>
        ) : sessions.length > 0 ? (
          <div className="space-y-4">
            {sessions.map((session) => {
              const markable = !isMarked;
              const totalPresent = stats[session._id] ?? 0;

              return (
                <div
                  key={session._id}
                  className="p-4 border border-gray-200 rounded-xl bg-white"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {session.subject?.name
                          ? `${session.subject.name} by ${session.faculty?.name}`
                          : "Live Class"}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          {session.start_time} - {session.end_time}
                        </span>
                      </div>
                    </div>
                    <Badge
                      className={`${
                        markable
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {session.status === "active" ? "Active" : "Ongoing"}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Users className="w-4 h-4" />
                    <span>{totalPresent} students present</span>
                  </div>

                  <Button
                    disabled={isMarked}
                    onClick={() =>
                      onMarkAttendance &&
                      onMarkAttendance(
                        session._id,
                        session.faculty?._id,
                        session.subject?._id
                      )
                    }
                    size="sm"
                    className={`w-full ${
                      isMarked
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {isMarked ? "Mark Attendance" : "Attendance Marked"}
                  </Button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No live classes right now</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
