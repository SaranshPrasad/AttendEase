// // // import React, { useState } from "react";
// // // import {
// // //   Card,
// // //   CardContent,
// // //   CardHeader,
// // //   CardTitle,
// // //   CardFooter,
// // // } from "@/components/ui/card";
// // // import { Button } from "@/components/ui/button";
// // // import {
// // //   Select,
// // //   SelectContent,
// // //   SelectItem,
// // //   SelectTrigger,
// // //   SelectValue,
// // // } from "@/components/ui/select";
// // // import { Input } from "@/components/ui/input";
// // // import { Label } from "@/components/ui/label";
// // // import { Play } from "lucide-react";
// // // import { Skeleton } from "@/components/ui/skeleton";
// // // import { format } from "date-fns";

// // // export default function ClassSelector({
// // //   selectedClass,
// // //   setSelectedClass,
// // //   onStartSession,
// // //   isLoading,
// // // }) {
// // //   const [sessionDetails, setSessionDetails] = useState({
// // //     topic: "",
// // //     date: format(new Date(), "yyyy-MM-dd"),
// // //     time: format(new Date(), "HH:mm"),
// // //     duration: 60,
// // //   });

// // //   console.log("Classes  : ",selectedClass)

// // //   const handleInputChange = (field, value) => {
// // //     setSessionDetails((prev) => ({ ...prev, [field]: value }));
// // //   };

// // //   const handleStartSession = () => {
// // //     if (selectedClass) {
// // //       onStartSession(selectedClass, sessionDetails);
// // //     } else {
// // //       alert("Please select a class first.");
// // //     }
// // //   };

// // //   if (isLoading) {
// // //     return (
// // //       <Card className="bg-white/70 backdrop-blur-sm border border-gray-100 shadow-lg">
// // //         <CardHeader>
// // //           <Skeleton className="h-6 w-48" />
// // //         </CardHeader>
// // //         <CardContent className="space-y-6">
// // //           <Skeleton className="h-10 w-full" />
// // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //             <Skeleton className="h-10 w-full" />
// // //             <Skeleton className="h-10 w-full" />
// // //           </div>
// // //         </CardContent>
// // //         <CardFooter>
// // //           <Skeleton className="h-12 w-36" />
// // //         </CardFooter>
// // //       </Card>
// // //     );
// // //   }

// // //   return (
// // //     <Card className="bg-white/70 backdrop-blur-sm border border-gray-100 shadow-lg">
// // //       <CardHeader>
// // //         <CardTitle>Start New Attendance Session</CardTitle>
// // //       </CardHeader>
// // //       <CardContent className="space-y-6">
// // //         <div>
// // //           <Label>Select Class</Label>
// // //           <Select
// // //             onValueChange={(classId) => {
// // //               const classData = selectedClass.find((c) => c.id === classId);
// // //               setSelectedClass(classData);
// // //             }}
// // //           >
// // //             <SelectTrigger className="h-12 text-lg">
// // //               <SelectValue placeholder="Choose a class..." />
// // //             </SelectTrigger>
// // //             <SelectContent>
// // //               {selectedClass?.map((cls) => (
// // //                 <SelectItem key={cls.id} value={cls.id}>
// // //                   {cls.class_name} ({cls.class_code})
// // //                 </SelectItem>
// // //               ))}
// // //             </SelectContent>
// // //           </Select>
// // //         </div>

// // //         <div>
// // //           <Label htmlFor="topic">Session Topic (Optional)</Label>
// // //           <Input
// // //             id="topic"
// // //             placeholder="e.g., Introduction to React Hooks"
// // //             value={sessionDetails.topic}
// // //             onChange={(e) => handleInputChange("topic", e.target.value)}
// // //             className="h-12"
// // //           />
// // //         </div>

// // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // //           <div>
// // //             <Label htmlFor="date">Date</Label>
// // //             <Input
// // //               id="date"
// // //               type="date"
// // //               value={sessionDetails.date}
// // //               onChange={(e) => handleInputChange("date", e.target.value)}
// // //               className="h-12"
// // //             />
// // //           </div>
// // //           <div>
// // //             <Label htmlFor="time">Time</Label>
// // //             <Input
// // //               id="time"
// // //               type="time"
// // //               value={sessionDetails.time}
// // //               onChange={(e) => handleInputChange("time", e.target.value)}
// // //               className="h-12"
// // //             />
// // //           </div>
// // //           <div>
// // //             <Label htmlFor="duration">Duration (minutes)</Label>
// // //             <Input
// // //               id="duration"
// // //               type="number"
// // //               value={sessionDetails.duration}
// // //               onChange={(e) =>
// // //                 handleInputChange("duration", parseInt(e.target.value))
// // //               }
// // //               className="h-12"
// // //             />
// // //           </div>
// // //         </div>
// // //       </CardContent>
// // //       <CardFooter>
// // //         <Button
// // //           onClick={handleStartSession}
// // //           disabled={!selectedClass}
// // //           className="h-12 px-8 text-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
// // //         >
// // //           <Play className="w-5 h-5 mr-2" />
// // //           Start Session
// // //         </Button>
// // //       </CardFooter>
// // //     </Card>
// // //   );
// // // }
// // // import React, { useState } from "react";
// // // import {
// // //   Card,
// // //   CardContent,
// // //   CardHeader,
// // //   CardTitle,
// // //   CardFooter,
// // // } from "@/components/ui/card";
// // // import { Button } from "@/components/ui/button";
// // // import {
// // //   Select,
// // //   SelectContent,
// // //   SelectItem,
// // //   SelectTrigger,
// // //   SelectValue,
// // // } from "@/components/ui/select";
// // // import { Input } from "@/components/ui/input";
// // // import { Label } from "@/components/ui/label";
// // // import { Play } from "lucide-react";
// // // import { Skeleton } from "@/components/ui/skeleton";
// // // import { format } from "date-fns";

// // // export default function ClassSelector({
// // //   selectedClass,
// // //   setSelectedClass,
// // //   onStartSession,
// // //   isLoading,
// // // }) {
// // //   const [sessionDetails, setSessionDetails] = useState({
// // //     topic: "",
// // //     date: format(new Date(), "yyyy-MM-dd"),
// // //     time: format(new Date(), "HH:mm"),
// // //     duration: 60,
// // //   });

// // //   const handleInputChange = (field, value) => {
// // //     setSessionDetails((prev) => ({ ...prev, [field]: value }));
// // //   };

// // //   const handleStartSession = () => {
// // //     if (selectedClass) {
// // //       onStartSession(selectedClass, sessionDetails);
// // //     } else {
// // //       alert("Please select a class first.");
// // //     }
// // //   };
// // //   console.log(selectedClass)
// // //   if (isLoading) {
// // //     return (
// // //       <Card className="bg-white/70 backdrop-blur-sm border border-gray-100 shadow-lg">
// // //         <CardHeader>
// // //           <Skeleton className="h-6 w-48" />
// // //         </CardHeader>
// // //         <CardContent className="space-y-6">
// // //           <Skeleton className="h-10 w-full" />
// // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //             <Skeleton className="h-10 w-full" />
// // //             <Skeleton className="h-10 w-full" />
// // //           </div>
// // //         </CardContent>
// // //         <CardFooter>
// // //           <Skeleton className="h-12 w-36" />
// // //         </CardFooter>
// // //       </Card>
// // //     );
// // //   }

// // //   return (
// // //     <Card className="bg-white/70 backdrop-blur-sm border border-gray-100 shadow-lg">
// // //       <CardHeader>
// // //         <CardTitle>Start New Attendance Session</CardTitle>
// // //       </CardHeader>

// // //       <CardContent className="space-y-6">
// // //         {/* ✅ Class Selection */}
// // //         <div>
// // //           <Label>Select Class</Label>
// // //           <Select
// // //             onValueChange={(classId) => {
// // //               const classData = selectedClass.find((c) => c.id === classId || c._id === classId);
// // //               setSelectedClass(classData);
// // //             }}
// // //           >
// // //             <SelectTrigger className="h-12 text-lg">
// // //               <SelectValue placeholder="Choose a class..." />
// // //             </SelectTrigger>
// // //             <SelectContent>
// // //               {Array.isArray(selectedClass) && selectedClass.length > 0 ? (
// // //                 selectedClass.map((cls) => (
// // //                   <SelectItem key={cls.id || cls._id} value={cls.id || cls._id}>
// // //                     {cls.class_name || cls.name} ({cls.class_code || cls.code})
// // //                   </SelectItem>
// // //                 ))
// // //               ) : (
// // //                 <div className="p-2 text-gray-500">No classes found</div>
// // //               )}
// // //             </SelectContent>
// // //           </Select>
// // //         </div>

// // //         {/* ✅ Session Details */}
// // //         <div>
// // //           <Label htmlFor="topic">Session Topic (Optional)</Label>
// // //           <Input
// // //             id="topic"
// // //             placeholder="e.g., Introduction to React Hooks"
// // //             value={sessionDetails.topic}
// // //             onChange={(e) => handleInputChange("topic", e.target.value)}
// // //             className="h-12"
// // //           />
// // //         </div>

// // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // //           <div>
// // //             <Label htmlFor="date">Date</Label>
// // //             <Input
// // //               id="date"
// // //               type="date"
// // //               value={sessionDetails.date}
// // //               onChange={(e) => handleInputChange("date", e.target.value)}
// // //               className="h-12"
// // //             />
// // //           </div>
// // //           <div>
// // //             <Label htmlFor="time">Time</Label>
// // //             <Input
// // //               id="time"
// // //               type="time"
// // //               value={sessionDetails.time}
// // //               onChange={(e) => handleInputChange("time", e.target.value)}
// // //               className="h-12"
// // //             />
// // //           </div>
// // //           <div>
// // //             <Label htmlFor="duration">Duration (minutes)</Label>
// // //             <Input
// // //               id="duration"
// // //               type="number"
// // //               value={sessionDetails.duration}
// // //               onChange={(e) =>
// // //                 handleInputChange("duration", parseInt(e.target.value))
// // //               }
// // //               className="h-12"
// // //             />
// // //           </div>
// // //         </div>
// // //       </CardContent>

// // //       <CardFooter>
// // //         <Button
// // //           onClick={handleStartSession}
// // //           disabled={!selectedClass}
// // //           className="h-12 px-8 text-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
// // //         >
// // //           <Play className="w-5 h-5 mr-2" />
// // //           Start Session
// // //         </Button>
// // //       </CardFooter>
// // //     </Card>
// // //   );
// // // }
// // import React, { useState, useEffect } from "react";
// // import {
// //   Card,
// //   CardContent,
// //   CardHeader,
// //   CardTitle,
// //   CardFooter,
// // } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Play } from "lucide-react";
// // import { Skeleton } from "@/components/ui/skeleton";
// // import { format } from "date-fns";

// // export default function ClassSelector({
// //   selectedClass,
// //   setSelectedClass,
// //   onStartSession,
// //   isLoading,
// // }) {
// //   const [availableClasses, setAvailableClasses] = useState(selectedClass || []);
// //   const [selectedClassData, setSelectedClassData] = useState(null);

// //   const [sessionDetails, setSessionDetails] = useState({
// //     topic: "",
// //     date: format(new Date(), "yyyy-MM-dd"),
// //     time: format(new Date(), "HH:mm"),
// //     duration: 60,
// //     subject: "",
// //     room: "",
// //     faculty: "",
// //   });

// //   useEffect(() => {
// //     if (selectedClassData) {
// //       const slot = selectedClassData.slots?.[0];
// //       setSessionDetails((prev) => ({
// //         ...prev,
// //         subject: slot?.subject?.name || "",
// //         room: slot?.room || "",
// //         faculty: slot?.faculty?.name || "",
// //         time: slot?.start_time || prev.time,
// //       }));
// //     }
// //   }, [selectedClassData]);

// //   const handleInputChange = (field, value) => {
// //     setSessionDetails((prev) => ({ ...prev, [field]: value }));
// //   };

// //   const handleStartSession = () => {
// //     if (!selectedClassData) return alert("Please select a class first.");
// //     onStartSession(selectedClassData, sessionDetails);
// //   };

// //   if (isLoading) {
// //     return (
// //       <Card className="bg-white/70 backdrop-blur-sm border border-gray-100 shadow-lg">
// //         <CardHeader>
// //           <Skeleton className="h-6 w-48" />
// //         </CardHeader>
// //         <CardContent className="space-y-6">
// //           <Skeleton className="h-10 w-full" />
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <Skeleton className="h-10 w-full" />
// //             <Skeleton className="h-10 w-full" />
// //           </div>
// //         </CardContent>
// //         <CardFooter>
// //           <Skeleton className="h-12 w-36" />
// //         </CardFooter>
// //       </Card>
// //     );
// //   }

// //   return (
// //     <Card className="bg-white/70 backdrop-blur-sm border border-gray-100 shadow-lg">
// //       <CardHeader>
// //         <CardTitle>Start New Attendance Session</CardTitle>
// //       </CardHeader>

// //       <CardContent className="space-y-6">
// //         {/* ✅ Class Selection */}
// //         <div>
// //           <Label>Select Class</Label>
// //           <Select
// //             onValueChange={(classId) => {
// //               const classData = availableClasses.find(
// //                 (c) => c._id === classId || c.class_id === classId
// //               );
// //               setSelectedClassData(classData);
// //               setSelectedClass(classData);
// //             }}
// //           >
// //             <SelectTrigger className="h-12 text-lg">
// //               <SelectValue placeholder="Choose a class..." />
// //             </SelectTrigger>
// //             <SelectContent>
// //               {Array.isArray(availableClasses) && availableClasses.length > 0 ? (
// //                 availableClasses.map((cls) => (
// //                   <SelectItem key={cls._id} value={cls._id}>
// //                     {cls.class_id} (Sem {cls.semester})
// //                   </SelectItem>
// //                 ))
// //               ) : (
// //                 <div className="p-2 text-gray-500">No classes found</div>
// //               )}
// //             </SelectContent>
// //           </Select>
// //         </div>

// //         {/* ✅ Auto-Filled Class Info */}
// //         {selectedClassData && (
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
// //             <div>
// //               <Label>Subject</Label>
// //               <Input
// //                 readOnly
// //                 value={sessionDetails.subject}
// //                 className="h-12 bg-gray-100"
// //               />
// //             </div>
// //             <div>
// //               <Label>Faculty</Label>
// //               <Input
// //                 readOnly
// //                 value={sessionDetails.faculty}
// //                 className="h-12 bg-gray-100"
// //               />
// //             </div>
// //             <div>
// //               <Label>Room</Label>
// //               <Input
// //                 readOnly
// //                 value={sessionDetails.room}
// //                 className="h-12 bg-gray-100"
// //               />
// //             </div>
// //             <div>
// //               <Label>Time</Label>
// //               <Input
// //                 readOnly
// //                 value={`${selectedClassData.slots?.[0]?.start_time} - ${selectedClassData.slots?.[0]?.end_time}`}
// //                 className="h-12 bg-gray-100"
// //               />
// //             </div>
// //           </div>
// //         )}

// //         {/* ✅ Optional Topic + Session Details */}
// //         <div>
// //           <Label htmlFor="topic">Session Topic (Optional)</Label>
// //           <Input
// //             id="topic"
// //             placeholder="e.g., Introduction to React Hooks"
// //             value={sessionDetails.topic}
// //             onChange={(e) => handleInputChange("topic", e.target.value)}
// //             className="h-12"
// //           />
// //         </div>

// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //           <div>
// //             <Label htmlFor="date">Date</Label>
// //             <Input
// //               id="date"
// //               type="date"
// //               value={sessionDetails.date}
// //               onChange={(e) => handleInputChange("date", e.target.value)}
// //               className="h-12"
// //             />
// //           </div>
// //           <div>
// //             <Label htmlFor="time">Start Time</Label>
// //             <Input
// //               id="time"
// //               type="time"
// //               value={sessionDetails.time}
// //               onChange={(e) => handleInputChange("time", e.target.value)}
// //               className="h-12"
// //             />
// //           </div>
// //           <div>
// //             <Label htmlFor="duration">Duration (minutes)</Label>
// //             <Input
// //               id="duration"
// //               type="number"
// //               value={sessionDetails.duration}
// //               onChange={(e) =>
// //                 handleInputChange("duration", parseInt(e.target.value))
// //               }
// //               className="h-12"
// //             />
// //           </div>
// //         </div>
// //       </CardContent>

// //       <CardFooter>
// //         <Button
// //           onClick={handleStartSession}
// //           disabled={!selectedClassData}
// //           className="h-12 px-8 text-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
// //         >
// //           <Play className="w-5 h-5 mr-2" />
// //           Start Session
// //         </Button>
// //       </CardFooter>
// //     </Card>
// //   );
// // }
// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardFooter,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Play } from "lucide-react";
// import { Skeleton } from "@/components/ui/skeleton";
// import axios from "axios";

// export default function ClassSelector({
//   selectedClass,
//   setSelectedClass,
//   onStartSession,
//   isLoading,
// }) {
//   // const [availableClasses, setAvailableClasses] = useState([]);
//   const [selectedClassData, setSelectedClassData] = useState(null);
//   const [sessionPayload, setSessionPayload] = useState(null);
//   // console.log("Selected Class : ",selectedClass)
//   // ✅ Auto-generate session details whenever class is selected
//   // useEffect(() => {
//   //   setAvailableClasses(selectedClass)
//   // },[])
//   useEffect(() => {
//     if (selectedClassData) {
//       const slot = selectedClassData.slots?.[0];
//       const today = new Date();
//       const yyyy = today.getFullYear();
//       const mm = String(today.getMonth() + 1).padStart(2, "0"); // month is 0-indexed
//       const dd = String(today.getDate()).padStart(2, "0");
//       const payload = {
//         class_id: selectedClassData.class_id,
//         semester: selectedClassData.semester,
//         class_day: selectedClassData.day,
//         class_date: `${yyyy}-${mm}-${dd}`,
//         subject: slot?.subject?._id || "",
//         faculty: slot?.faculty?._id || "",
//         start_time: slot?.start_time || "",
//         end_time: slot?.end_time || "",
//         status: "upcoming",
//       };
//       setSessionPayload(payload);
//     }
//   }, [selectedClassData]);

//   // ✅ Handle session creation (completely automatic)
//   const handleStartSession = async () => {
//     if (!sessionPayload) return alert("Please select a class first!");

//     try {
//       const res = await axios.post(
//         "http://localhost:5001/attendance/create/active/session",
//         sessionPayload, {withCredentials:true}
//       );
//       alert("✅ Attendance session created successfully!");
//       if (onStartSession) onStartSession(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to create attendance session");
//     }
//   };

//   // ✅ Loading skeleton
//   if (isLoading) {
//     return (
//       <Card className="bg-white/70 backdrop-blur-sm border border-gray-100 shadow-lg">
//         <CardHeader>
//           <Skeleton className="h-6 w-48" />
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <Skeleton className="h-10 w-full" />
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <Skeleton className="h-10 w-full" />
//             <Skeleton className="h-10 w-full" />
//           </div>
//         </CardContent>
//         <CardFooter>
//           <Skeleton className="h-12 w-36" />
//         </CardFooter>
//       </Card>
//     );
//   }

//   console.log("Available: ", sessionPayload);

//   return (
//     <Card className="bg-white/70 backdrop-blur-sm border border-gray-100 shadow-lg">
//       <CardHeader>
//         <CardTitle>Start Attendance Session</CardTitle>
//       </CardHeader>

//       <CardContent className="space-y-6">
//         {/* ✅ Class Selector */}
//         <div>
//           <Label>Select Class</Label>
//           <Select
//             onValueChange={(classId) => {
//               // const classData = selectedClass.find(
//               //   (c) => c._id === classId || c.class_id === classId
//               // );
//               const classData = selectedClass;
//               setSelectedClassData(classData);
//               setSelectedClass(classData);
//             }}
//           >
//             <SelectTrigger className="h-12 text-lg">
//               <SelectValue placeholder="Choose a class..." />
//             </SelectTrigger>
//             <SelectContent>
//               {/* {Array.isArray(selectedClass) && selectedClass.length > 0 ? (
//                 selectedClass.map((cls) => (
//                   <SelectItem key={cls._id} value={cls._id}>
//                     {cls.class_id} (Sem {cls.semester})
//                   </SelectItem>
//                 ))
//               ) : (
//                 <div className="p-2 text-gray-500">No classes found</div>
//               )} */}
//               <SelectItem key={selectedClass._id} value={selectedClass._id}>
//                 {selectedClass.class_id}
//               </SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* ✅ Auto-filled details (no user input) */}
//         {sessionPayload && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
//             <div>
//               <Label>Class ID</Label>
//               <Input
//                 readOnly
//                 value={sessionPayload.class_id}
//                 className="h-12 bg-gray-100"
//               />
//             </div>
//             <div>
//               <Label>Semester</Label>
//               <Input
//                 readOnly
//                 value={sessionPayload.semester}
//                 className="h-12 bg-gray-100"
//               />
//             </div>
//             <div>
//               <Label>Class Day</Label>
//               <Input
//                 readOnly
//                 value={sessionPayload.class_day}
//                 className="h-12 bg-gray-100"
//               />
//             </div>
//             <div>
//               <Label>Date</Label>
//               <Input
//                 readOnly
//                 value={new Date(sessionPayload.class_date).toLocaleDateString()}
//                 className="h-12 bg-gray-100"
//               />
//             </div>
//             <div>
//               <Label>Start Time</Label>
//               <Input
//                 readOnly
//                 value={sessionPayload.start_time}
//                 className="h-12 bg-gray-100"
//               />
//             </div>
//             <div>
//               <Label>End Time</Label>
//               <Input
//                 readOnly
//                 value={sessionPayload.end_time}
//                 className="h-12 bg-gray-100"
//               />
//             </div>
//             <div>
//               <Label>Subject ID</Label>
//               <Input
//                 readOnly
//                 value={selectedClass.slots[0].subject.name}
//                 className="h-12 bg-gray-100"
//                 placeholder={selectedClass.slots[0].subject.name}
//               />
//             </div>
//             <div>
//               <Label>Faculty ID</Label>
//               <Input
//                 readOnly
//                 value={selectedClass.slots[0].faculty.name}
//                 className="h-12 bg-gray-100"
//               />
//             </div>
//           </div>
//         )}
//       </CardContent>

//       <CardFooter>
//         <Button
//           onClick={handleStartSession}
//           disabled={!sessionPayload}
//           className="h-12 px-8 text-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
//         >
//           <Play className="w-5 h-5 mr-2" />
//           Create Session
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Play } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

export default function ClassSelector({ selectedClass, setSelectedClass, onStartSession, isLoading, setIsActive }) {
  const [selectedClassData, setSelectedClassData] = useState(null);
  const [sessionPayload, setSessionPayload] = useState(null);

  // Auto-generate session payload when class is selected
  useEffect(() => {
    if (selectedClassData) {
      const slot = selectedClassData.slots?.[0];
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");

      const payload = {
        class_id: selectedClassData.class_id,
        semester: selectedClassData.semester,
        class_day: selectedClassData.day,
        class_date: `${yyyy}-${mm}-${dd}`,
        subject: slot?.subject?._id || "",
        faculty: slot?.faculty?._id || "",
        start_time: slot?.start_time || "",
        end_time: slot?.end_time || "",
        status: "upcoming",
      };

      setSessionPayload(payload);
    }
  }, [selectedClassData]);

  // Create session automatically
  const handleStartSession = async () => {
    if (!sessionPayload) return alert("Please select a class first!");

    try {
      const res = await axios.post(
        "http://localhost:5001/attendance/create/active/session",
        sessionPayload,
        { withCredentials: true }
      );

      alert("✅ Attendance session created successfully!");
     
      if (onStartSession) onStartSession(res.data); // send session to parent
      const active = res.data;
      localStorage.setItem("active-session", JSON.stringify(active));
      setIsActive(true);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create attendance session");
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-white/70 backdrop-blur-sm border border-gray-100 shadow-lg">
        <CardHeader><Skeleton className="h-6 w-48" /></CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-10 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
        <CardFooter><Skeleton className="h-12 w-36" /></CardFooter>
      </Card>
    );
  }

  return (
    <Card className="bg-white/70 backdrop-blur-sm border border-gray-100 shadow-lg">
      <CardHeader>
        <CardTitle>Start Attendance Session</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Class Selector */}
        <div>
          <Label>Select Class</Label>
          <Select
            onValueChange={() => {
              setSelectedClassData(selectedClass);
              setSelectedClass(selectedClass);
            }}
          >
            <SelectTrigger className="h-12 text-lg">
              <SelectValue placeholder="Choose a class..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={selectedClass._id} value={selectedClass._id}>
                {selectedClass.class_id} (Sem {selectedClass.semester})
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Auto-filled details */}
        {sessionPayload && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
            <div>
              <Label>Class ID</Label>
              <Input readOnly value={sessionPayload.class_id} className="h-12 bg-gray-100" />
            </div>
            <div>
              <Label>Semester</Label>
              <Input readOnly value={sessionPayload.semester} className="h-12 bg-gray-100" />
            </div>
            <div>
              <Label>Class Day</Label>
              <Input readOnly value={sessionPayload.class_day} className="h-12 bg-gray-100" />
            </div>
            <div>
              <Label>Date</Label>
              <Input readOnly value={sessionPayload.class_date} className="h-12 bg-gray-100" />
            </div>
            <div>
              <Label>Start Time</Label>
              <Input readOnly value={sessionPayload.start_time} className="h-12 bg-gray-100" />
            </div>
            <div>
              <Label>End Time</Label>
              <Input readOnly value={sessionPayload.end_time} className="h-12 bg-gray-100" />
            </div>
            <div>
              <Label>Subject</Label>
              <Input readOnly value={selectedClass.slots[0].subject.name} className="h-12 bg-gray-100" />
            </div>
            <div>
              <Label>Faculty</Label>
              <Input readOnly value={selectedClass.slots[0].faculty.name} className="h-12 bg-gray-100" />
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleStartSession}
          disabled={!sessionPayload}
          className="h-12 px-8 text-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
        >
          <Play className="w-5 h-5 mr-2" /> Create Session
        </Button>
      </CardFooter>
    </Card>
  );
}
