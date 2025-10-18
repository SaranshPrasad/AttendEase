// // // // // import React from "react";
// // // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // // // import { Button } from "@/components/ui/button";
// // // // // import { Badge } from "@/components/ui/badge";
// // // // // import {
// // // // //   DropdownMenu,
// // // // //   DropdownMenuContent,
// // // // //   DropdownMenuItem,
// // // // //   DropdownMenuTrigger,
// // // // // } from "@/components/ui/dropdown-menu";
// // // // // import { MoreHorizontal, Edit, Trash2, Clock, MapPin } from "lucide-react";
// // // // // import { Skeleton } from "@/components/ui/skeleton";

// // // // // const timeSlots24Hr = [
// // // // //   "08:00",
// // // // //   "09:00",
// // // // //   "10:00",
// // // // //   "11:00",
// // // // //   "12:00",
// // // // //   "13:00",
// // // // //   "14:00",
// // // // //   "15:00",
// // // // //   "16:00",
// // // // //   "17:00",
// // // // // ];

// // // // // const daysOfWeek = [
// // // // //   "Monday",
// // // // //   "Tuesday",
// // // // //   "Wednesday",
// // // // //   "Thursday",
// // // // //   "Friday",
// // // // //   "Saturday",
// // // // // ];

// // // // // const formatTimeTo12Hr = (time) => {
// // // // //   if (!time) return "";
// // // // //   const [hour, minute] = time.split(":");
// // // // //   const h = parseInt(hour, 10);
// // // // //   const ampm = h >= 12 ? "PM" : "AM";
// // // // //   const h12 = h % 12 || 12;
// // // // //   return `${String(h12).padStart(2, "0")}:${minute} ${ampm}`;
// // // // // };

// // // // // export default function TimetableGrid({
// // // // //   schedules,
// // // // //   courses,
// // // // //   onEdit,
// // // // //   onDelete,
// // // // //   userRole,
// // // // //   isLoading,
// // // // // }) {
// // // // //   if (isLoading) {
// // // // //     return (
// // // // //       <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
// // // // //         <CardHeader>
// // // // //           <CardTitle>Weekly Timetable</CardTitle>
// // // // //         </CardHeader>
// // // // //         <CardContent>
// // // // //           <div className="overflow-x-auto">
// // // // //             <div className="grid grid-cols-[auto_repeat(6,1fr)] gap-2 min-w-[900px]">
// // // // //               <div></div>
// // // // //               {daysOfWeek.map((day) => (
// // // // //                 <div
// // // // //                   key={day}
// // // // //                   className="text-center font-semibold text-gray-900 p-2"
// // // // //                 >
// // // // //                   {day}
// // // // //                 </div>
// // // // //               ))}
// // // // //               {timeSlots24Hr.map((time) => (
// // // // //                 <React.Fragment key={time}>
// // // // //                   <div className="text-sm font-medium text-gray-600 p-2 text-right">
// // // // //                     <Skeleton className="h-4 w-16" />
// // // // //                   </div>
// // // // //                   {daysOfWeek.map((day) => (
// // // // //                     <div
// // // // //                       key={`${day}-${time}`}
// // // // //                       className="min-h-[7rem] border border-gray-200 rounded-lg"
// // // // //                     >
// // // // //                       <Skeleton className="h-full w-full" />
// // // // //                     </div>
// // // // //                   ))}
// // // // //                 </React.Fragment>
// // // // //               ))}
// // // // //             </div>
// // // // //           </div>
// // // // //         </CardContent>
// // // // //       </Card>
// // // // //     );
// // // // //   }

// // // // //   const getScheduleForSlot = (day, time) => {
// // // // //     return schedules.find(
// // // // //       (s) =>
// // // // //         s.day_of_week === day &&
// // // // //         s.start_time.split(":")[0] === time.split(":")[0]
// // // // //     );
// // // // //   };

// // // // //   return (
// // // // //     <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
// // // // //       <CardHeader>
// // // // //         <CardTitle>Weekly Timetable</CardTitle>
// // // // //       </CardHeader>
// // // // //       <CardContent>
// // // // //         <div className="overflow-x-auto">
// // // // //           <div className="grid grid-cols-[auto_repeat(6,1fr)] gap-2 min-w-[900px]">
// // // // //             {/* Header */}
// // // // //             <div></div>
// // // // //             {daysOfWeek.map((day) => (
// // // // //               <div
// // // // //                 key={day}
// // // // //                 className="text-center font-bold text-gray-800 p-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg"
// // // // //               >
// // // // //                 {day}
// // // // //               </div>
// // // // //             ))}

// // // // //             {/* Time slots */}
// // // // //             {timeSlots24Hr.map((time) => (
// // // // //               <React.Fragment key={time}>
// // // // //                 <div className="text-sm font-medium text-gray-500 p-2 text-right flex items-center justify-end gap-2 h-full">
// // // // //                   <span>{formatTimeTo12Hr(time)}</span>
// // // // //                   <Clock className="w-4 h-4" />
// // // // //                 </div>
// // // // //                 {daysOfWeek.map((day) => {
// // // // //                   const schedule = getScheduleForSlot(day, time);
// // // // //                   const course = schedule
// // // // //                     ? courses.find((c) => c.id === schedule.course_id)
// // // // //                     : null;

// // // // //                   return (
// // // // //                     <div
// // // // //                       key={`${day}-${time}`}
// // // // //                       className="min-h-[7rem] border border-dashed border-gray-200 rounded-lg p-1.5 relative"
// // // // //                     >
// // // // //                       {schedule && course ? (
// // // // //                         <div className="h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-2.5 flex flex-col justify-between group">
// // // // //                           <div>
// // // // //                             <div className="font-bold text-sm text-gray-900 truncate">
// // // // //                               {course.course_name}
// // // // //                             </div>
// // // // //                             <div className="text-xs text-gray-600 font-medium">
// // // // //                               {course.course_code}
// // // // //                             </div>
// // // // //                           </div>

// // // // //                           <div className="space-y-1 text-xs">
// // // // //                             <div className="flex items-center gap-1.5 text-gray-700">
// // // // //                               <Clock className="w-3 h-3 flex-shrink-0" />
// // // // //                               <span>
// // // // //                                 {formatTimeTo12Hr(schedule.start_time)} -{" "}
// // // // //                                 {formatTimeTo12Hr(schedule.end_time)}
// // // // //                               </span>
// // // // //                             </div>
// // // // //                             <div className="flex items-center gap-1.5 text-gray-700">
// // // // //                               <MapPin className="w-3 h-3 flex-shrink-0" />
// // // // //                               <span>{schedule.room_number}</span>
// // // // //                             </div>
// // // // //                           </div>

// // // // //                           <div className="flex items-center gap-2">
// // // // //                             <Badge
// // // // //                               variant="secondary"
// // // // //                               className="text-xs bg-white"
// // // // //                             >
// // // // //                               {schedule.class_type}
// // // // //                             </Badge>
// // // // //                           </div>

// // // // //                           {(userRole === "admin" || userRole === "user") && (
// // // // //                             <DropdownMenu>
// // // // //                               <DropdownMenuTrigger asChild>
// // // // //                                 <Button
// // // // //                                   variant="ghost"
// // // // //                                   size="icon"
// // // // //                                   className="absolute top-1 right-1 w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity bg-white/50 hover:bg-white/80"
// // // // //                                 >
// // // // //                                   <MoreHorizontal className="w-4 h-4" />
// // // // //                                 </Button>
// // // // //                               </DropdownMenuTrigger>
// // // // //                               <DropdownMenuContent>
// // // // //                                 <DropdownMenuItem
// // // // //                                   onClick={() => onEdit(schedule)}
// // // // //                                 >
// // // // //                                   <Edit className="w-4 h-4 mr-2" />
// // // // //                                   Edit
// // // // //                                 </DropdownMenuItem>
// // // // //                                 <DropdownMenuItem
// // // // //                                   onClick={() => onDelete(schedule.id)}
// // // // //                                   className="text-red-600"
// // // // //                                 >
// // // // //                                   <Trash2 className="w-4 h-4 mr-2" />
// // // // //                                   Delete
// // // // //                                 </DropdownMenuItem>
// // // // //                               </DropdownMenuContent>
// // // // //                             </DropdownMenu>
// // // // //                           )}
// // // // //                         </div>
// // // // //                       ) : (
// // // // //                         <div className="w-full h-full"></div>
// // // // //                       )}
// // // // //                     </div>
// // // // //                   );
// // // // //                 })}
// // // // //               </React.Fragment>
// // // // //             ))}
// // // // //           </div>
// // // // //         </div>
// // // // //       </CardContent>
// // // // //     </Card>
// // // // //   );
// // // // // }
// // // // import React from "react";
// // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // // import { Button } from "@/components/ui/button";
// // // // import { Badge } from "@/components/ui/badge";
// // // // import {
// // // //   DropdownMenu,
// // // //   DropdownMenuContent,
// // // //   DropdownMenuItem,
// // // //   DropdownMenuTrigger,
// // // // } from "@/components/ui/dropdown-menu";
// // // // import { MoreHorizontal, Edit, Trash2, Clock, MapPin } from "lucide-react";
// // // // import { Skeleton } from "@/components/ui/skeleton";

// // // // // Define your time slots and days
// // // // const timeSlots24Hr = [
// // // //   "08:00 AM",
// // // //   "09:00 AM",
// // // //   "10:00 AM",
// // // //   "11:00 AM",
// // // //   "12:00 PM",
// // // //   "01:00 PM",
// // // //   "02:00 PM",
// // // //   "03:00 PM",
// // // //   "04:00 PM",
// // // //   "05:00 PM",
// // // // ];

// // // // const daysOfWeek = [
// // // //   "Monday",
// // // //   "Tuesday",
// // // //   "Wednesday",
// // // //   "Thursday",
// // // //   "Friday",
// // // //   "Saturday",
// // // // ];

// // // // export default function TimetableGrid({
// // // //   timetables,
// // // //   onEdit,
// // // //   onDelete,
// // // //   userRole,
// // // //   isLoading,
// // // // }) {
// // // //   if (isLoading) {
// // // //     return (
// // // //       <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
// // // //         <CardHeader>
// // // //           <CardTitle>Weekly Timetable</CardTitle>
// // // //         </CardHeader>
// // // //         <CardContent>
// // // //           <div className="overflow-x-auto">
// // // //             <div className="grid grid-cols-[auto_repeat(6,1fr)] gap-2 min-w-[900px]">
// // // //               <div></div>
// // // //               {daysOfWeek.map((day) => (
// // // //                 <div
// // // //                   key={day}
// // // //                   className="text-center font-semibold text-gray-900 p-2"
// // // //                 >
// // // //                   {day}
// // // //                 </div>
// // // //               ))}
// // // //               {timeSlots24Hr.map((time) => (
// // // //                 <React.Fragment key={time}>
// // // //                   <div className="text-sm font-medium text-gray-600 p-2 text-right">
// // // //                     <Skeleton className="h-4 w-16" />
// // // //                   </div>
// // // //                   {daysOfWeek.map((day) => (
// // // //                     <div
// // // //                       key={`${day}-${time}`}
// // // //                       className="min-h-[7rem] border border-gray-200 rounded-lg"
// // // //                     >
// // // //                       <Skeleton className="h-full w-full" />
// // // //                     </div>
// // // //                   ))}
// // // //                 </React.Fragment>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         </CardContent>
// // // //       </Card>
// // // //     );
// // // //   }

// // // //   // Function to find a slot that matches a given day and time
// // // //   const getSlotForDayAndTime = (day, time) => {
// // // //     for (const table of timetables) {
// // // //       if (table.day === day) {
// // // //         for (const slot of table.slots) {
// // // //           // Compare start_time in 12hr format loosely
// // // //           const slotHour = slot.start_time?.split(":")[0];
// // // //           const timeHour = time.split(":")[0];
// // // //           if (slotHour === timeHour) {
// // // //             return { ...slot, class_id: table.class_id, day: table.day };
// // // //           }
// // // //         }
// // // //       }
// // // //     }
// // // //     return null;
// // // //   };

// // // //   return (
// // // //     <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
// // // //       <CardHeader>
// // // //         <CardTitle>Weekly Timetable</CardTitle>
// // // //       </CardHeader>
// // // //       <CardContent>
// // // //         <div className="overflow-x-auto">
// // // //           <div className="grid grid-cols-[auto_repeat(6,1fr)] gap-2 min-w-[900px]">
// // // //             {/* Header */}
// // // //             <div></div>
// // // //             {daysOfWeek.map((day) => (
// // // //               <div
// // // //                 key={day}
// // // //                 className="text-center font-bold text-gray-800 p-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg"
// // // //               >
// // // //                 {day}
// // // //               </div>
// // // //             ))}

// // // //             {/* Time slots grid */}
// // // //             {timeSlots24Hr.map((time) => (
// // // //               <React.Fragment key={time}>
// // // //                 {/* Left time column */}
// // // //                 <div className="text-sm font-medium text-gray-500 p-2 text-right flex items-center justify-end gap-2 h-full">
// // // //                   <span>{time}</span>
// // // //                   <Clock className="w-4 h-4" />
// // // //                 </div>

// // // //                 {/* Each day column */}
// // // //                 {daysOfWeek.map((day) => {
// // // //                   const slot = getSlotForDayAndTime(day, time);

// // // //                   return (
// // // //                     <div
// // // //                       key={`${day}-${time}`}
// // // //                       className="min-h-[7rem] border border-dashed border-gray-200 rounded-lg p-1.5 relative"
// // // //                     >
// // // //                       {slot ? (
// // // //                         <div className="h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-2.5 flex flex-col justify-between group">
// // // //                           <div>
// // // //                             <div className="font-bold text-sm text-gray-900 truncate">
// // // //                               {slot.subject?.name || "No Subject"}
// // // //                             </div>
// // // //                             <div className="text-xs text-gray-600 font-medium">
// // // //                               {slot.faculty?.name || "No Faculty"}
// // // //                             </div>
// // // //                           </div>

// // // //                           <div className="space-y-1 text-xs">
// // // //                             <div className="flex items-center gap-1.5 text-gray-700">
// // // //                               <Clock className="w-3 h-3 flex-shrink-0" />
// // // //                               <span>
// // // //                                 {slot.start_time} - {slot.end_time}
// // // //                               </span>
// // // //                             </div>
// // // //                             <div className="flex items-center gap-1.5 text-gray-700">
// // // //                               <MapPin className="w-3 h-3 flex-shrink-0" />
// // // //                               <span>{slot.room || "N/A"}</span>
// // // //                             </div>
// // // //                           </div>

// // // //                           <div className="flex items-center justify-between mt-2">
// // // //                             <Badge
// // // //                               variant="secondary"
// // // //                               className="text-xs bg-white"
// // // //                             >
// // // //                               {slot.class_id}
// // // //                             </Badge>
// // // //                           </div>

// // // //                           {(userRole === "admin" || userRole === "user") && (
// // // //                             <DropdownMenu>
// // // //                               <DropdownMenuTrigger asChild>
// // // //                                 <Button
// // // //                                   variant="ghost"
// // // //                                   size="icon"
// // // //                                   className="absolute top-1 right-1 w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity bg-white/50 hover:bg-white/80"
// // // //                                 >
// // // //                                   <MoreHorizontal className="w-4 h-4" />
// // // //                                 </Button>
// // // //                               </DropdownMenuTrigger>
// // // //                               <DropdownMenuContent>
// // // //                                 <DropdownMenuItem
// // // //                                   onClick={() => onEdit(slot)}
// // // //                                 >
// // // //                                   <Edit className="w-4 h-4 mr-2" />
// // // //                                   Edit
// // // //                                 </DropdownMenuItem>
// // // //                                 <DropdownMenuItem
// // // //                                   onClick={() => onDelete(slot._id)}
// // // //                                   className="text-red-600"
// // // //                                 >
// // // //                                   <Trash2 className="w-4 h-4 mr-2" />
// // // //                                   Delete
// // // //                                 </DropdownMenuItem>
// // // //                               </DropdownMenuContent>
// // // //                             </DropdownMenu>
// // // //                           )}
// // // //                         </div>
// // // //                       ) : (
// // // //                         <div className="w-full h-full"></div>
// // // //                       )}
// // // //                     </div>
// // // //                   );
// // // //                 })}
// // // //               </React.Fragment>
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //       </CardContent>
// // // //     </Card>
// // // //   );
// // // // }
// // // import React from "react";
// // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // import { Button } from "@/components/ui/button";
// // // import { Badge } from "@/components/ui/badge";
// // // import {
// // //   DropdownMenu,
// // //   DropdownMenuContent,
// // //   DropdownMenuItem,
// // //   DropdownMenuTrigger,
// // // } from "@/components/ui/dropdown-menu";
// // // import { MoreHorizontal, Edit, Trash2, Clock, MapPin } from "lucide-react";
// // // import { Skeleton } from "@/components/ui/skeleton";

// // // const timeSlots24Hr = [
// // //   "08:00 AM",
// // //   "09:00 AM",
// // //   "10:00 AM",
// // //   "11:00 AM",
// // //   "12:00 PM",
// // //   "01:00 PM",
// // //   "02:00 PM",
// // //   "03:00 PM",
// // //   "04:00 PM",
// // //   "05:00 PM",
// // // ];

// // // const daysOfWeek = [
// // //   "Monday",
// // //   "Tuesday",
// // //   "Wednesday",
// // //   "Thursday",
// // //   "Friday",
// // //   "Saturday",
// // // ];

// // // export default function TimetableGrid({ timetables, onEdit, onDelete, userRole, isLoading }) {
// // //   if (isLoading) {
// // //     return (
// // //       <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
// // //         <CardHeader>
// // //           <CardTitle>Weekly Timetable</CardTitle>
// // //         </CardHeader>
// // //         <CardContent>
// // //           <div className="overflow-x-auto">
// // //             <div className="grid grid-cols-[auto_repeat(6,1fr)] gap-2 min-w-[900px]">
// // //               <div></div>
// // //               {daysOfWeek.map((day) => (
// // //                 <div key={day} className="text-center font-semibold text-gray-900 p-2">
// // //                   {day}
// // //                 </div>
// // //               ))}
// // //               {timeSlots24Hr.map((time) => (
// // //                 <React.Fragment key={time}>
// // //                   <div className="text-sm font-medium text-gray-600 p-2 text-right">
// // //                     <Skeleton className="h-4 w-16" />
// // //                   </div>
// // //                   {daysOfWeek.map((day) => (
// // //                     <div key={`${day}-${time}`} className="min-h-[7rem] border border-gray-200 rounded-lg">
// // //                       <Skeleton className="h-full w-full" />
// // //                     </div>
// // //                   ))}
// // //                 </React.Fragment>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </CardContent>
// // //       </Card>
// // //     );
// // //   }

// // //   // Return all slots that match day and time
// // //   const getSlotsForDayAndTime = (day, time) => {
// // //     const matchedSlots = [];
// // //     for (const table of timetables) {
// // //       if (table.day === day) {
// // //         for (const slot of table.slots) {
// // //           const slotHour = slot.start_time?.split(":")[0];
// // //           const timeHour = time.split(":")[0];
// // //           if (slotHour === timeHour) {
// // //             matchedSlots.push({ ...slot, class_id: table.class_id, day: table.day });
// // //           }
// // //         }
// // //       }
// // //     }
// // //     return matchedSlots;
// // //   };

// // //   return (
// // //     <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
// // //       <CardHeader>
// // //         <CardTitle>Weekly Timetable</CardTitle>
// // //       </CardHeader>
// // //       <CardContent>
// // //         <div className="overflow-x-auto">
// // //           <div className="grid grid-cols-[auto_repeat(6,1fr)] gap-2 min-w-[900px]">
// // //             <div></div>
// // //             {daysOfWeek.map((day) => (
// // //               <div key={day} className="text-center font-bold text-gray-800 p-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
// // //                 {day}
// // //               </div>
// // //             ))}

// // //             {timeSlots24Hr.map((time) => (
// // //               <React.Fragment key={time}>
// // //                 <div className="text-sm font-medium text-gray-500 p-2 text-right flex items-center justify-end gap-2 h-full">
// // //                   <span>{time}</span>
// // //                   <Clock className="w-4 h-4" />
// // //                 </div>

// // //                 {daysOfWeek.map((day) => {
// // //                   const slots = getSlotsForDayAndTime(day, time);

// // //                   return (
// // //                     <div key={`${day}-${time}`} className="min-h-[7rem] border border-dashed border-gray-200 rounded-lg p-1.5 relative flex flex-col gap-1.5">
// // //                       {slots.length > 0 ? (
// // //                         slots.map((slot) => (
// // //                           <div key={slot._id} className="h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-2 flex flex-col justify-between group">
// // //                             <div>
// // //                               <div className="font-bold text-sm text-gray-900 truncate">
// // //                                 {slot.subject?.name || "No Subject"}
// // //                               </div>
// // //                               <div className="text-xs text-gray-600 font-medium">
// // //                                 {slot.faculty?.name || "No Faculty"}
// // //                               </div>
// // //                             </div>

// // //                             <div className="space-y-1 text-xs">
// // //                               <div className="flex items-center gap-1.5 text-gray-700">
// // //                                 <Clock className="w-3 h-3 flex-shrink-0" />
// // //                                 <span>{slot.start_time} - {slot.end_time}</span>
// // //                               </div>
// // //                               <div className="flex items-center gap-1.5 text-gray-700">
// // //                                 <MapPin className="w-3 h-3 flex-shrink-0" />
// // //                                 <span>{slot.room || "N/A"}</span>
// // //                               </div>
// // //                             </div>

// // //                             <div className="flex items-center justify-between mt-2">
// // //                               <Badge variant="secondary" className="text-xs bg-white">
// // //                                 {slot.class_id}
// // //                               </Badge>
// // //                             </div>

// // //                             {(userRole === "admin" || userRole === "user") && (
// // //                               <DropdownMenu>
// // //                                 <DropdownMenuTrigger asChild>
// // //                                   <Button
// // //                                     variant="ghost"
// // //                                     size="icon"
// // //                                     className="absolute top-1 right-1 w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity bg-white/50 hover:bg-white/80"
// // //                                   >
// // //                                     <MoreHorizontal className="w-4 h-4" />
// // //                                   </Button>
// // //                                 </DropdownMenuTrigger>
// // //                                 <DropdownMenuContent>
// // //                                   <DropdownMenuItem onClick={() => onEdit(slot)}>
// // //                                     <Edit className="w-4 h-4 mr-2" />
// // //                                     Edit
// // //                                   </DropdownMenuItem>
// // //                                   <DropdownMenuItem onClick={() => onDelete(slot._id)} className="text-red-600">
// // //                                     <Trash2 className="w-4 h-4 mr-2" />
// // //                                     Delete
// // //                                   </DropdownMenuItem>
// // //                                 </DropdownMenuContent>
// // //                               </DropdownMenu>
// // //                             )}
// // //                           </div>
// // //                         ))
// // //                       ) : (
// // //                         <div className="w-full h-full"></div>
// // //                       )}
// // //                     </div>
// // //                   );
// // //                 })}
// // //               </React.Fragment>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </CardContent>
// // //     </Card>
// // //   );
// // // }
// // import React from "react";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Badge } from "@/components/ui/badge";
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuTrigger,
// // } from "@/components/ui/dropdown-menu";
// // import { MoreHorizontal, Edit, Trash2, Clock, MapPin } from "lucide-react";
// // import { Skeleton } from "@/components/ui/skeleton";

// // const timeSlots24Hr = [
// //   "08:00 AM",
// //   "09:00 AM",
// //   "10:00 AM",
// //   "11:00 AM",
// //   "12:00 PM",
// //   "01:00 PM",
// //   "02:00 PM",
// //   "03:00 PM",
// //   "04:00 PM",
// //   "05:00 PM",
// // ];

// // const daysOfWeek = [
// //   "Monday",
// //   "Tuesday",
// //   "Wednesday",
// //   "Thursday",
// //   "Friday",
// //   "Saturday",
// // ];

// // export default function TimetableGrid({ timetables, onEdit, onDelete, userRole, isLoading }) {
// //   if (isLoading) {
// //     return (
// //       <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
// //         <CardHeader>
// //           <CardTitle>Weekly Timetable</CardTitle>
// //         </CardHeader>
// //         <CardContent>
// //           <div className="overflow-x-auto">
// //             <div className="grid grid-cols-[auto_repeat(6,1fr)] gap-2 min-w-[900px]">
// //               <div></div>
// //               {daysOfWeek.map((day) => (
// //                 <div key={day} className="text-center font-semibold text-gray-900 p-2">
// //                   {day}
// //                 </div>
// //               ))}
// //               {timeSlots24Hr.map((time) => (
// //                 <React.Fragment key={time}>
// //                   <div className="text-sm font-medium text-gray-600 p-2 text-right">
// //                     <Skeleton className="h-4 w-16" />
// //                   </div>
// //                   {daysOfWeek.map((day) => (
// //                     <div key={`${day}-${time}`} className="min-h-[7rem] border border-gray-200 rounded-lg">
// //                       <Skeleton className="h-full w-full" />
// //                     </div>
// //                   ))}
// //                 </React.Fragment>
// //               ))}
// //             </div>
// //           </div>
// //         </CardContent>
// //       </Card>
// //     );
// //   }

// //   // Return all slots that match day and time
// //   const getSlotsForDayAndTime = (day, time) => {
// //     const matchedSlots = [];
// //     for (const table of timetables) {
// //       if (table.day === day) {
// //         for (const slot of table.slots) {
// //           const slotHour = slot.start_time?.split(":")[0];
// //           const timeHour = time.split(":")[0];
// //           if (slotHour === timeHour) {
// //             matchedSlots.push({ ...slot, class_id: table.class_id, day: table.day });
// //           }
// //         }
// //       }
// //     }
// //     return matchedSlots;
// //   };

// //   return (
// //     <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
// //       <CardHeader>
// //         <CardTitle>Weekly Timetable</CardTitle>
// //       </CardHeader>
// //       <CardContent>
// //         <div className="overflow-x-auto">
// //           <div className="grid grid-cols-[auto_repeat(6,1fr)] gap-2 min-w-[900px]">
// //             <div></div>
// //             {daysOfWeek.map((day) => (
// //               <div key={day} className="text-center font-bold text-gray-800 p-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
// //                 {day}
// //               </div>
// //             ))}

// //             {timeSlots24Hr.map((time) => (
// //               <React.Fragment key={time}>
// //                 <div className="text-sm font-medium text-gray-500 p-2 text-right flex items-center justify-end gap-2 h-full">
// //                   <span>{time}</span>
// //                   <Clock className="w-4 h-4" />
// //                 </div>

// //                 {daysOfWeek.map((day) => {
// //                   const slots = getSlotsForDayAndTime(day, time);

// //                   return (
// //                     <div key={`${day}-${time}`} className="min-h-[7rem] border border-dashed border-gray-200 rounded-lg p-1.5 relative flex flex-col gap-1.5">
// //                       {slots.length > 0 ? (
// //                         slots.map((slot) => (
// //                           <div key={slot._id} className="h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-2 flex flex-col justify-between group">
// //                             <div>
// //                               <div className="font-bold text-sm text-gray-900 truncate">
// //                                 {slot.subject?.name || "No Subject"}
// //                               </div>
// //                               <div className="text-xs text-gray-600 font-medium">
// //                                 {slot.faculty?.name || "No Faculty"}
// //                               </div>
// //                             </div>

// //                             <div className="space-y-1 text-xs">
// //                               <div className="flex items-center gap-1.5 text-gray-700">
// //                                 <Clock className="w-3 h-3 flex-shrink-0" />
// //                                 <span>{slot.start_time} - {slot.end_time}</span>
// //                               </div>
// //                               <div className="flex items-center gap-1.5 text-gray-700">
// //                                 <MapPin className="w-3 h-3 flex-shrink-0" />
// //                                 <span>{slot.room || "N/A"}</span>
// //                               </div>
// //                             </div>

// //                             <div className="flex items-center justify-between mt-2">
// //                               <Badge variant="secondary" className="text-xs bg-white">
// //                                 {slot.class_id}
// //                               </Badge>
// //                             </div>

// //                             {(userRole === "admin" || userRole === "user") && (
// //                               <DropdownMenu>
// //                                 <DropdownMenuTrigger asChild>
// //                                   <Button
// //                                     variant="ghost"
// //                                     size="icon"
// //                                     className="absolute top-1 right-1 w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity bg-white/50 hover:bg-white/80"
// //                                   >
// //                                     <MoreHorizontal className="w-4 h-4" />
// //                                   </Button>
// //                                 </DropdownMenuTrigger>
// //                                 <DropdownMenuContent>
// //                                   <DropdownMenuItem onClick={() => onEdit(slot)}>
// //                                     <Edit className="w-4 h-4 mr-2" />
// //                                     Edit
// //                                   </DropdownMenuItem>
// //                                   <DropdownMenuItem onClick={() => onDelete(slot._id)} className="text-red-600">
// //                                     <Trash2 className="w-4 h-4 mr-2" />
// //                                     Delete
// //                                   </DropdownMenuItem>
// //                                 </DropdownMenuContent>
// //                               </DropdownMenu>
// //                             )}
// //                           </div>
// //                         ))
// //                       ) : (
// //                         <div className="w-full h-full"></div>
// //                       )}
// //                     </div>
// //                   );
// //                 })}
// //               </React.Fragment>
// //             ))}
// //           </div>
// //         </div>
// //       </CardContent>
// //     </Card>
// //   );
// // }
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

// // Days of week
// const daysOfWeek = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

// export default function TimetableGrid({ timetables, onEdit, onDelete, userRole, isLoading }) {
//   if (isLoading) {
//     return <Skeleton />;
//   }

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
//           <div className="grid grid-cols-[repeat(6,1fr)] gap-4 min-w-[700px]">
//             {daysOfWeek.map((day) => (
//               <div key={day} className="flex flex-col gap-2">
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
//                       <Badge variant="secondary" className="text-xs bg-white">{slot.class_id}</Badge>

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
import { Badge } from "@/components/ui/badge";
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
    <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
      <CardHeader>
        <CardTitle>Weekly Timetable</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {daysOfWeek.map((day) => (
              <div key={day} className="flex flex-col gap-2">
                {/* Day Header */}
                <div className="text-center font-bold text-gray-800 p-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  {day}
                </div>

                {/* Render all slots for this day */}
                {(timetableByDay[day] || []).length > 0 ? (
                  timetableByDay[day].map((slot) => (
                    <div
                      key={`${slot._id}-${slot.start_time}`}
                      className="border border-dashed border-gray-200 rounded-lg p-2 bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col gap-1 relative"
                    >
                      <div className="font-bold text-sm text-gray-900 truncate">{slot.subject?.name || "No Subject"}</div>
                      <div className="text-xs text-gray-600">{slot.faculty?.name || "No Faculty"}</div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-700">
                        <Clock className="w-3 h-3" />
                        <span>{slot.start_time} - {slot.end_time}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-700">
                        <MapPin className="w-3 h-3" />
                        <span>{slot.room || "N/A"}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs bg-white">{slot.class_id}</Badge>

                      {(userRole === "admin" || userRole === "user") && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="absolute top-1 right-1 w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity bg-white/50 hover:bg-white/80">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => onEdit(slot)}>
                              <Edit className="w-4 h-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onDelete(slot._id)} className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-400">No classes</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
