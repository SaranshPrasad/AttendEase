// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Clock, MapPin, BookOpen, Calendar } from "lucide-react";
// import { Skeleton } from "@/components/ui/skeleton";

// export default function TodayScheduleCard({ schedule, courses, isLoading }) {
//   if (isLoading) {
//     return (
//       <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
//         <CardHeader>
//           <CardTitle>Today's Schedule</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-3">
//             {Array(4)
//               .fill(0)
//               .map((_, i) => (
//                 <div key={i} className="p-3 border border-gray-100 rounded-lg">
//                   <Skeleton className="h-4 w-32 mb-2" />
//                   <Skeleton className="h-3 w-24" />
//                 </div>
//               ))}
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
//   const todaySchedules = schedule.filter((s) => s.day_of_week === today);

//   return (
//     <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <Calendar className="w-5 h-5" />
//           Today's Schedule
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         {todaySchedules.length > 0 ? (
//           <div className="space-y-3">
//             {todaySchedules.map((scheduleItem) => {
//               const course = courses.find(
//                 (c) => c.id === scheduleItem.course_id
//               );
//               return (
//                 <div
//                   key={scheduleItem.id}
//                   className="p-4 border border-gray-200 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50"
//                 >
//                   <div className="flex justify-between items-start mb-2">
//                     <h4 className="font-semibold text-gray-900">
//                       {course?.course_name || "Unknown Course"}
//                     </h4>
//                     <Badge className="bg-blue-100 text-blue-800">
//                       {scheduleItem.class_type}
//                     </Badge>
//                   </div>
//                   <div className="space-y-1 text-sm text-gray-600">
//                     <div className="flex items-center gap-2">
//                       <Clock className="w-4 h-4" />
//                       <span>
//                         {scheduleItem.start_time} - {scheduleItem.end_time}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <MapPin className="w-4 h-4" />
//                       <span>{scheduleItem.room_number}</span>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         ) : (
//           <div className="text-center py-8">
//             <BookOpen className="w-12 h-12 mx-auto text-gray-300 mb-3" />
//             <p className="text-gray-500">No classes scheduled for today</p>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, BookOpen, Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function TodayScheduleCard({ schedule = [], isLoading }) {
  if (isLoading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="p-3 border border-gray-100 rounded-lg">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Today's Schedule
        </CardTitle>
      </CardHeader>
      <CardContent>
        {schedule.length > 0 ? (
          <div className="space-y-3">
            {schedule.map((slot) => (
              <div
                key={slot._id}
                className="p-4 border border-gray-200 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">
                    {slot.subject?.name || "Unknown Subject"}
                  </h4>
                  <Badge className="bg-blue-100 text-blue-800">
                    {slot.class_type || "Lecture"}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>
                      {slot.start_time} - {slot.end_time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{slot.room || "N/A"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <BookOpen className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No classes scheduled for today</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
