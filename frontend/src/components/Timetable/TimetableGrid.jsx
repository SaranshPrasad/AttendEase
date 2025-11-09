// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { MoreHorizontal, Edit, Trash2, Clock, MapPin } from "lucide-react";
// import { Skeleton } from "@/components/ui/skeleton";

// const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// export default function TimetableGrid({ timetables, onEdit, onDelete, userRole, isLoading }) {
//   if (isLoading) return <Skeleton />;

//   // Group timetable by day
//   const timetableByDay = {};
//   timetables.forEach((table) => {
//     if (!timetableByDay[table.day]) timetableByDay[table.day] = [];
//     table.slots.forEach((slot) => {
//       timetableByDay[table.day].push({ ...slot, class_id: table.class_id });
//     });
//   });

//   return (
//     <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
//       <CardHeader>
//         <CardTitle>Weekly Timetable</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="overflow-x-auto">
//           <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
//             {daysOfWeek.map((day) => (
//               <div key={day} className="flex flex-col gap-2">
//                 {/* Day Header */}
//                 <div className="text-center font-bold text-gray-800 p-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
//                   {day}
//                 </div>

//                 {/* Render all slots for this day */}
//                 {(timetableByDay[day] || []).length > 0 ? (
//                   timetableByDay[day].map((slot) => (
//                     <div
//                       key={`${slot._id}-${slot.start_time}`}
//                       className="border border-dashed border-gray-200 rounded-lg p-2 bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col gap-1 relative"
//                     >
//                       <div className="font-bold text-sm text-gray-900 truncate">{slot.subject?.name || "No Subject"}</div>
//                       <div className="text-xs text-gray-600">{slot.faculty?.name || "No Faculty"}</div>
//                       <div className="flex items-center gap-1.5 text-xs text-gray-700">
//                         <Clock className="w-3 h-3" />
//                         <span>{slot.start_time} - {slot.end_time}</span>
//                       </div>
//                       <div className="flex items-center gap-1.5 text-xs text-gray-700">
//                         <MapPin className="w-3 h-3" />
//                         <span>{slot.room || "N/A"}</span>
//                       </div>
                      

//                       {(userRole === "admin" || userRole === "user") && (
//                         <DropdownMenu>
//                           <DropdownMenuTrigger asChild>
//                             <Button variant="ghost" size="icon" className="absolute top-1 right-1 w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity bg-white/50 hover:bg-white/80">
//                               <MoreHorizontal className="w-4 h-4" />
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent>
//                             <DropdownMenuItem onClick={() => onEdit(slot)}>
//                               <Edit className="w-4 h-4 mr-2" /> Edit
//                             </DropdownMenuItem>
//                             <DropdownMenuItem onClick={() => onDelete(slot._id)} className="text-red-600">
//                               <Trash2 className="w-4 h-4 mr-2" /> Delete
//                             </DropdownMenuItem>
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       )}
//                     </div>
//                   ))
//                 ) : (
//                   <div className="p-4 text-center text-gray-400">No classes</div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, Clock, MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function TimetableGrid({ timetables, onEdit, onDelete, userRole, isLoading }) {
  if (isLoading) return <Skeleton />;

  // Group timetable by day
  const timetableByDay = {};
  timetables.forEach((table) => {
    if (!timetableByDay[table.day]) timetableByDay[table.day] = [];
    table.slots.forEach((slot) => {
      timetableByDay[table.day].push({ ...slot, class_id: table.class_id });
    });
  });

  return (
    <Card className="bg-white/80 backdrop-blur-md border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-extrabold text-gray-800 tracking-tight flex items-center gap-2">
          📅 Weekly Timetable
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="flex flex-col gap-3 bg-gradient-to-b from-gray-50 to-white rounded-2xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
              >
                {/* Day Header */}
                <div className="text-center font-extrabold text-lg text-gray-900 p-2 rounded-lg bg-gradient-to-r from-indigo-100 via-purple-100 to-blue-100 shadow-inner uppercase tracking-wide">
                  {day}
                </div>

                {/* Render all slots for this day */}
                {(timetableByDay[day] || []).length > 0 ? (
                  timetableByDay[day].map((slot) => (
                    <div
                      key={`${slot._id}-${slot.start_time}`}
                      className="relative border border-gray-200 rounded-xl p-3 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 group shadow-sm hover:shadow-md"
                    >
                      <div className="font-semibold text-base text-gray-900 leading-tight truncate">
                        {slot.subject?.name || "No Subject"}
                      </div>
                      <div className="text-sm font-medium text-gray-700">
                        👨‍🏫 {slot.faculty?.name || "No Faculty"}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-gray-800 font-semibold mt-1">
                        <Clock className="w-4 h-4 text-indigo-500" />
                        <span>
                          {slot.start_time} - {slot.end_time}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-gray-800 font-semibold">
                        <MapPin className="w-4 h-4 text-purple-500" />
                        <span>{slot.room || "N/A"}</span>
                      </div>

                      {/* Dropdown Actions (Edit/Delete) */}
                      {(userRole === "admin" || userRole === "user") && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity bg-white/60 hover:bg-white/90 shadow-sm"
                            >
                              <MoreHorizontal className="w-4 h-4 text-gray-700" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="text-sm">
                            <DropdownMenuItem onClick={() => onEdit(slot)} className="font-semibold">
                              <Edit className="w-4 h-4 mr-2 text-blue-600" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onDelete(slot._id)}
                              className="text-red-600 font-semibold"
                            >
                              <Trash2 className="w-4 h-4 mr-2 text-red-600" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-400 italic">No classes</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
