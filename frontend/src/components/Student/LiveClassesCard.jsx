
// import React, { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Clock, Users } from "lucide-react";
// import axios from "axios";

// export default function LiveClassesCard({
//   sessions = [],
//   onMarkAttendance,
//   isLoading,
//   isMarked,
// }) {
//   const [stats, setStats] = useState({}); // store stats for each session

//   // const canMarkAttendance = (session) => session.status === "active";

//   // Fetch stats for all sessions
//   useEffect(() => {
//     if (sessions.length > 0) {
//       fetchAllStats();
//     }
//   }, [sessions]);

//   const fetchAllStats = async () => {
//     try {
//       const updatedStats = {};
//       for (const session of sessions) {
//         const res = await axios.get(
//           `http://localhost:5001/attendance/session/${session._id}/stats`
//         );
//         updatedStats[session._id] = res.data.total_present;
//       }
//       setStats(updatedStats);
//     } catch (error) {
//       console.error("Error fetching stats:", error);
//     }
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
//               const markable = !isMarked;
//               const totalPresent = stats[session._id] ?? 0;

//               return (
//                 <div
//                   key={session._id}
//                   className="p-4 border border-gray-200 rounded-xl bg-white"
//                 >
//                   <div className="flex justify-between items-start mb-3">
//                     <div>
//                       <h4 className="font-semibold text-gray-900">
//                         {session.subject?.name
//                           ? `${session.subject.name} by ${session.faculty?.name}`
//                           : "Live Class"}
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
//                       {session.status === "active" ? "Active" : "Ongoing"}
//                     </Badge>
//                   </div>

//                   <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
//                     <Users className="w-4 h-4" />
//                     <span>{totalPresent} students present</span>
//                   </div>

//                   <Button
//                     disabled={isMarked}
//                     onClick={() =>
//                       onMarkAttendance &&
//                       onMarkAttendance(
//                         session._id,
//                         session.faculty?._id,
//                         session.subject?._id
//                       )
//                     }
//                     size="sm"
//                     className={`w-full ${
//                       isMarked
//                         ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
//                         : "bg-gray-200 text-gray-500"
//                     }`}
//                   >
//                     {isMarked ? "Mark Attendance" : "Attendance Marked"}
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
  markedSessions = [], // ✅ received from parent
}) {
  const [stats, setStats] = useState({});

  // Fetch stats for all sessions in parallel
  useEffect(() => {
    if (sessions.length > 0) fetchAllStats();
  }, [sessions]);

  const fetchAllStats = async () => {
    try {
      const requests = sessions.map((session) =>
        axios
          .get(`http://localhost:5001/attendance/session/${session._id}/stats`)
          .then((res) => ({ id: session._id, total: res.data.total_present }))
      );

      const results = await Promise.all(requests);
      const updatedStats = Object.fromEntries(
        results.map((r) => [r.id, r.total])
      );
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
              const totalPresent = stats[session._id] ?? 0;
              const isAlreadyMarked = markedSessions.includes(session._id);

              return (
                <div
                  key={session._id}
                  className="p-4 border border-gray-200 rounded-xl bg-white transition hover:shadow-md"
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
                        session.status === "active"
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

                  {/* ✅ Hide button once marked */}
                  {!isAlreadyMarked && (
                    <Button
                      onClick={() =>
                        onMarkAttendance?.(
                          session._id,
                          session.faculty?._id,
                          session.subject?._id
                        )
                      }
                      size="sm"
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90"
                    >
                      Mark Attendance
                    </Button>
                  )}

                  {isAlreadyMarked && (
                    <p className="text-green-600 text-center font-medium">
                      ✅ Attendance Marked
                    </p>
                  )}
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
