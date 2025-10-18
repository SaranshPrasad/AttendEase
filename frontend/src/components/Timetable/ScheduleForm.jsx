// // // // import React, { useState, useEffect, useMemo } from "react";
// // // // import {
// // // //   Dialog,
// // // //   DialogContent,
// // // //   DialogHeader,
// // // //   DialogTitle,
// // // // } from "@/components/ui/dialog";
// // // // import { Button } from "@/components/ui/button";
// // // // import { Input } from "@/components/ui/input";
// // // // import { Label } from "@/components/ui/label";
// // // // import {
// // // //   Select,
// // // //   SelectContent,
// // // //   SelectItem,
// // // //   SelectTrigger,
// // // //   SelectValue,
// // // // } from "@/components/ui/select";
// // // // import { motion } from "framer-motion";

// // // // export default function ScheduleForm({
// // // //   schedule,
// // // //   allCourses,
// // // //   departments,
// // // //   semesters,
// // // //   onSubmit,
// // // //   onCancel,
// // // //   userRole,
// // // // }) {
// // // //   const [formData, setFormData] = useState({
// // // //     department: "",
// // // //     semester: "",
// // // //     course_id: "",
// // // //     day_of_week: "",
// // // //     start_time: "",
// // // //     end_time: "",
// // // //     room_number: "",
// // // //     class_type: "lecture",
// // // //   });
// // // //   const [isSubmitting, setIsSubmitting] = useState(false);

// // // //   useEffect(() => {
// // // //     if (schedule) {
// // // //       const course = allCourses.find((c) => c.id === schedule.course_id);
// // // //       setFormData({
// // // //         department: course?.department || "",
// // // //         semester: course?.semester || "",
// // // //         : course?.subject.course_id,
// // // //         day_of_week: schedule.day_of_week,
// // // //         start_time: schedule.start_time,
// // // //         end_time: schedule.end_time,
// // // //         room_number: schedule.room_number,
// // // //         class_type: schedule.class_type,
// // // //       });
// // // //     }
// // // //   }, [schedule, allCourses]);

// // // //   const handleInputChange = (field, value) => {
// // // //     const newFormData = { ...formData, [field]: value };
// // // //     if (field === "department" || field === "semester") {
// // // //       newFormData.course_id = ""; // Reset course if department/semester changes
// // // //     }
// // // //     setFormData(newFormData);
// // // //   };

// // // //   const filteredCourses = useMemo(() => {
// // // //     if (!formData.department || !formData.semester) return [];
// // // //     return allCourses.filter(
// // // //       (course) =>
// // // //         course.department === formData.department &&
// // // //         course.semester === formData.semester
// // // //     );
// // // //   }, [formData.department, formData.semester, allCourses]);

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     setIsSubmitting(true);
// // // //     try {
// // // //       const { department, semester, ...submissionData } = formData;
// // // //       await onSubmit(submissionData);
// // // //     } catch (error) {
// // // //       console.error("Error submitting form:", error);
// // // //     }
// // // //     setIsSubmitting(false);
// // // //   };

// // // //   return (
// // // //     <Dialog open={true} onOpenChange={onCancel}>
// // // //       <DialogContent className="sm:max-w-lg bg-white rounded-lg p-0">
// // // //         <motion.div
// // // //           initial={{ opacity: 0, scale: 0.95 }}
// // // //           animate={{ opacity: 1, scale: 1 }}
// // // //           exit={{ opacity: 0, scale: 0.95 }}
// // // //         >
// // // //           <DialogHeader className="p-6 pb-4">
// // // //             <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// // // //               {schedule ? "Edit Schedule" : "Add New Schedule"}
// // // //             </DialogTitle>
// // // //           </DialogHeader>

// // // //           <form onSubmit={handleSubmit} className="space-y-4 p-6">
// // // //             <div className="grid grid-cols-2 gap-4">
// // // //               <div>
// // // //                 <Label htmlFor="department">Department *</Label>
// // // //                 <Select
// // // //                   value={formData.department}
// // // //                   onValueChange={(value) =>
// // // //                     handleInputChange("department", value)
// // // //                   }
// // // //                   required
// // // //                 >
// // // //                   <SelectTrigger>
// // // //                     <SelectValue placeholder="Select department" />
// // // //                   </SelectTrigger>
// // // //                   <SelectContent>
// // // //                     {departments.map((dep) => (
// // // //                       <SelectItem key={dep} value={dep}>
// // // //                         {dep}
// // // //                       </SelectItem>
// // // //                     ))}
// // // //                   </SelectContent>
// // // //                 </Select>
// // // //               </div>
// // // //               <div>
// // // //                 <Label htmlFor="semester">Semester *</Label>
// // // //                 <Select
// // // //                   value={formData.semester}
// // // //                   onValueChange={(value) =>
// // // //                     handleInputChange("semester", value)
// // // //                   }
// // // //                   required
// // // //                 >
// // // //                   <SelectTrigger>
// // // //                     <SelectValue placeholder="Select semester" />
// // // //                   </SelectTrigger>
// // // //                   <SelectContent>
// // // //                     {semesters.map((sem) => (
// // // //                       <SelectItem key={sem} value={sem}>
// // // //                         {sem}
// // // //                       </SelectItem>
// // // //                     ))}
// // // //                   </SelectContent>
// // // //                 </Select>
// // // //               </div>
// // // //             </div>

// // // //             <div>
// // // //               <Label htmlFor="course_id">Course *</Label>
// // // //               <Select
// // // //                 value={formData.course_id}
// // // //                 onValueChange={(value) => handleInputChange("course_id", value)}
// // // //                 required
// // // //                 disabled={!formData.department || !formData.semester}
// // // //               >
// // // //                 <SelectTrigger>
// // // //                   <SelectValue placeholder="Select course" />
// // // //                 </SelectTrigger>
// // // //                 <SelectContent>
// // // //                   {filteredCourses.length > 0 ? (
// // // //                     filteredCourses.map((course) => (
// // // //                       <SelectItem key={course.id} value={course.id}>
// // // //                         {course.course_name} ({course.course_code})
// // // //                       </SelectItem>
// // // //                     ))
// // // //                   ) : (
// // // //                     <div className="p-4 text-center text-sm text-gray-500">
// // // //                       No courses match filters
// // // //                     </div>
// // // //                   )}
// // // //                 </SelectContent>
// // // //               </Select>
// // // //             </div>

// // // //             <div className="grid grid-cols-2 gap-4">
// // // //               <div>
// // // //                 <Label htmlFor="day_of_week">Day *</Label>
// // // //                 <Select
// // // //                   value={formData.day_of_week}
// // // //                   onValueChange={(value) =>
// // // //                     handleInputChange("day_of_week", value)
// // // //                   }
// // // //                   required
// // // //                 >
// // // //                   <SelectTrigger>
// // // //                     <SelectValue placeholder="Select day" />
// // // //                   </SelectTrigger>
// // // //                   <SelectContent>
// // // //                     <SelectItem value="Monday">Monday</SelectItem>
// // // //                     <SelectItem value="Tuesday">Tuesday</SelectItem>
// // // //                     <SelectItem value="Wednesday">Wednesday</SelectItem>
// // // //                     <SelectItem value="Thursday">Thursday</SelectItem>
// // // //                     <SelectItem value="Friday">Friday</SelectItem>
// // // //                     <SelectItem value="Saturday">Saturday</SelectItem>
// // // //                   </SelectContent>
// // // //                 </Select>
// // // //               </div>
// // // //               <div>
// // // //                 <Label htmlFor="class_type">Type *</Label>
// // // //                 <Select
// // // //                   value={formData.class_type}
// // // //                   onValueChange={(value) =>
// // // //                     handleInputChange("class_type", value)
// // // //                   }
// // // //                   required
// // // //                 >
// // // //                   <SelectTrigger>
// // // //                     <SelectValue placeholder="Select type" />
// // // //                   </SelectTrigger>
// // // //                   <SelectContent>
// // // //                     <SelectItem value="lecture">Lecture</SelectItem>
// // // //                     <SelectItem value="lab">Lab</SelectItem>
// // // //                     <SelectItem value="tutorial">Tutorial</SelectItem>
// // // //                     <SelectItem value="exam">Exam</SelectItem>
// // // //                   </SelectContent>
// // // //                 </Select>
// // // //               </div>
// // // //             </div>

// // // //             <div className="grid grid-cols-2 gap-4">
// // // //               <div>
// // // //                 <Label htmlFor="start_time">Start Time *</Label>
// // // //                 <Input
// // // //                   id="start_time"
// // // //                   type="time"
// // // //                   value={formData.start_time}
// // // //                   onChange={(e) =>
// // // //                     handleInputChange("start_time", e.target.value)
// // // //                   }
// // // //                   required
// // // //                 />
// // // //               </div>
// // // //               <div>
// // // //                 <Label htmlFor="end_time">End Time *</Label>
// // // //                 <Input
// // // //                   id="end_time"
// // // //                   type="time"
// // // //                   value={formData.end_time}
// // // //                   onChange={(e) =>
// // // //                     handleInputChange("end_time", e.target.value)
// // // //                   }
// // // //                   required
// // // //                 />
// // // //               </div>
// // // //             </div>

// // // //             <div>
// // // //               <Label htmlFor="room_number">Room Number *</Label>
// // // //               <Input
// // // //                 id="room_number"
// // // //                 value={formData.room_number}
// // // //                 onChange={(e) =>
// // // //                   handleInputChange("room_number", e.target.value)
// // // //                 }
// // // //                 placeholder="e.g., Room 101 or Online"
// // // //                 required
// // // //               />
// // // //             </div>

// // // //             <div className="flex justify-end gap-3 pt-4">
// // // //               <Button
// // // //                 type="button"
// // // //                 variant="outline"
// // // //                 onClick={onCancel}
// // // //                 disabled={isSubmitting}
// // // //               >
// // // //                 Cancel
// // // //               </Button>
// // // //               <Button
// // // //                 type="submit"
// // // //                 disabled={isSubmitting}
// // // //                 className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
// // // //               >
// // // //                 {isSubmitting
// // // //                   ? "Saving..."
// // // //                   : schedule
// // // //                   ? "Update Schedule"
// // // //                   : "Add Schedule"}
// // // //               </Button>
// // // //             </div>
// // // //           </form>
// // // //         </motion.div>
// // // //       </DialogContent>
// // // //     </Dialog>
// // // //   );
// // // // }
// // // import React, { useState, useEffect, useMemo } from "react";
// // // import {
// // //   Dialog,
// // //   DialogContent,
// // //   DialogHeader,
// // //   DialogTitle,
// // // } from "@/components/ui/dialog";
// // // import { Button } from "@/components/ui/button";
// // // import { Input } from "@/components/ui/input";
// // // import { Label } from "@/components/ui/label";
// // // import {
// // //   Select,
// // //   SelectContent,
// // //   SelectItem,
// // //   SelectTrigger,
// // //   SelectValue,
// // // } from "@/components/ui/select";
// // // import { motion } from "framer-motion";

// // // export default function ScheduleForm({
// // //   schedule,
// // //   allCourses,
// // //   allFaculties,
// // //   departments,
// // //   semesters,
// // //   onSubmit,
// // //   onCancel,
// // // }) {
// // //   const [formData, setFormData] = useState({
// // //     class_id: "",
// // //     department: "",
// // //     semester: "",
// // //     day: "",
// // //     slot_number: "",
// // //     subject: "",
// // //     faculty: "",
// // //     room: "",
// // //     start_time: "",
// // //     end_time: "",
// // //   });

// // //   const [isSubmitting, setIsSubmitting] = useState(false);

// // //   useEffect(() => {
// // //     if (schedule) {
// // //       const slot = schedule.slots?.[0];
// // //       setFormData({
// // //         class_id: schedule.class_id || "",
// // //         department: schedule.department || "",
// // //         semester: schedule.semester?.toString() || "",
// // //         day: schedule.day || "",
// // //         slot_number: slot?.slot_number || "",
// // //         subject: slot?.subject?._id || "",
// // //         faculty: slot?.faculty?._id || "",
// // //         room: slot?.room || "",
// // //         start_time: slot?.start_time || "",
// // //         end_time: slot?.end_time || "",
// // //       });
// // //     }
// // //   }, [schedule]);

// // //   const handleInputChange = (field, value) => {
// // //     setFormData((prev) => ({ ...prev, [field]: value }));
// // //   };

// // //   const filteredCourses = useMemo(() => {
// // //     if (!formData.department || !formData.semester) return [];
// // //     return allCourses.filter(
// // //       (course) =>
// // //         course.department === formData.department &&
// // //         course.semester.toString() === formData.semester
// // //     );
// // //   }, [formData.department, formData.semester, allCourses]);

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setIsSubmitting(true);
// // //     try {
// // //       const submissionData = {
// // //         class_id: formData.class_id,
// // //         day: formData.day,
// // //         semester: parseInt(formData.semester),
// // //         slots: [
// // //           {
// // //             slot_number: parseInt(formData.slot_number),
// // //             subject: formData.subject,
// // //             faculty: formData.faculty,
// // //             room: formData.room,
// // //             start_time: formData.start_time,
// // //             end_time: formData.end_time,
// // //           },
// // //         ],
// // //       };
// // //       await onSubmit(submissionData);
// // //     } catch (error) {
// // //       console.error("Error submitting schedule:", error);
// // //     }
// // //     setIsSubmitting(false);
// // //   };

// // //   return (
// // //     <Dialog open={true} onOpenChange={onCancel}>
// // //       <DialogContent className="sm:max-w-lg bg-white rounded-xl shadow-lg p-0">
// // //         <motion.div
// // //           initial={{ opacity: 0, scale: 0.95 }}
// // //           animate={{ opacity: 1, scale: 1 }}
// // //         >
// // //           <DialogHeader className="p-6 pb-4">
// // //             <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// // //               {schedule ? "Edit Timetable Entry" : "Add Timetable Entry"}
// // //             </DialogTitle>
// // //           </DialogHeader>

// // //           <form onSubmit={handleSubmit} className="space-y-4 p-6">
// // //             {/* Department & Semester */}
// // //             <div className="grid grid-cols-2 gap-4">
// // //               <div>
// // //                 <Label>Department *</Label>
// // //                 <Select
// // //                   value={formData.department}
// // //                   onValueChange={(v) => handleInputChange("department", v)}
// // //                   required
// // //                 >
// // //                   <SelectTrigger>
// // //                     <SelectValue placeholder="Select department" />
// // //                   </SelectTrigger>
// // //                   <SelectContent>
// // //                     {departments.map((dep) => (
// // //                       <SelectItem key={dep} value={dep}>
// // //                         {dep}
// // //                       </SelectItem>
// // //                     ))}
// // //                   </SelectContent>
// // //                 </Select>
// // //               </div>

// // //               <div>
// // //                 <Label>Semester *</Label>
// // //                 <Select
// // //                   value={formData.semester}
// // //                   onValueChange={(v) => handleInputChange("semester", v)}
// // //                   required
// // //                 >
// // //                   <SelectTrigger>
// // //                     <SelectValue placeholder="Select semester" />
// // //                   </SelectTrigger>
// // //                   <SelectContent>
// // //                     {semesters.map((sem) => (
// // //                       <SelectItem key={sem} value={sem.toString()}>
// // //                         {sem}
// // //                       </SelectItem>
// // //                     ))}
// // //                   </SelectContent>
// // //                 </Select>
// // //               </div>
// // //             </div>

// // //             {/* Class ID */}
// // //             <div>
// // //               <Label>Class ID *</Label>
// // //               <Input
// // //                 placeholder="e.g. BCA2022A"
// // //                 value={formData.class_id}
// // //                 onChange={(e) => handleInputChange("class_id", e.target.value)}
// // //                 required
// // //               />
// // //             </div>

// // //             {/* Day & Slot Number */}
// // //             <div className="grid grid-cols-2 gap-4">
// // //               <div>
// // //                 <Label>Day *</Label>
// // //                 <Select
// // //                   value={formData.day}
// // //                   onValueChange={(v) => handleInputChange("day", v)}
// // //                   required
// // //                 >
// // //                   <SelectTrigger>
// // //                     <SelectValue placeholder="Select day" />
// // //                   </SelectTrigger>
// // //                   <SelectContent>
// // //                     {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
// // //                       (day) => (
// // //                         <SelectItem key={day} value={day}>
// // //                           {day}
// // //                         </SelectItem>
// // //                       )
// // //                     )}
// // //                   </SelectContent>
// // //                 </Select>
// // //               </div>

// // //               <div>
// // //                 <Label>Slot Number *</Label>
// // //                 <Input
// // //                   type="number"
// // //                   min="1"
// // //                   placeholder="e.g. 1"
// // //                   value={formData.slot_number}
// // //                   onChange={(e) => handleInputChange("slot_number", e.target.value)}
// // //                   required
// // //                 />
// // //               </div>
// // //             </div>

// // //             {/* Subject & Faculty */}
// // //             <div className="grid grid-cols-2 gap-4">
// // //               <div>
// // //                 <Label>Subject *</Label>
// // //                 <Select
// // //                   value={formData.subject}
// // //                   onValueChange={(v) => handleInputChange("subject", v)}
// // //                   required
// // //                 >
// // //                   <SelectTrigger>
// // //                     <SelectValue placeholder="Select subject" />
// // //                   </SelectTrigger>
// // //                   <SelectContent>
// // //                     {filteredCourses.map((subj) => (
// // //                       <SelectItem key={subj._id} value={subj._id}>
// // //                         {subj.name}
// // //                       </SelectItem>
// // //                     ))}
// // //                   </SelectContent>
// // //                 </Select>
// // //               </div>

// // //               <div>
// // //                 <Label>Faculty *</Label>
// // //                 <Select
// // //                   value={formData.faculty}
// // //                   onValueChange={(v) => handleInputChange("faculty", v)}
// // //                   required
// // //                 >
// // //                   <SelectTrigger>
// // //                     <SelectValue placeholder="Select faculty" />
// // //                   </SelectTrigger>
// // //                   <SelectContent>
// // //                     {allFaculties.map((fac) => (
// // //                       <SelectItem key={fac._id} value={fac._id}>
// // //                         {fac.name}
// // //                       </SelectItem>
// // //                     ))}
// // //                   </SelectContent>
// // //                 </Select>
// // //               </div>
// // //             </div>

// // //             {/* Time & Room */}
// // //             <div className="grid grid-cols-2 gap-4">
// // //               <div>
// // //                 <Label>Start Time *</Label>
// // //                 <Input
// // //                   type="time"
// // //                   value={formData.start_time}
// // //                   onChange={(e) => handleInputChange("start_time", e.target.value)}
// // //                   required
// // //                 />
// // //               </div>
// // //               <div>
// // //                 <Label>End Time *</Label>
// // //                 <Input
// // //                   type="time"
// // //                   value={formData.end_time}
// // //                   onChange={(e) => handleInputChange("end_time", e.target.value)}
// // //                   required
// // //                 />
// // //               </div>
// // //             </div>

// // //             <div>
// // //               <Label>Room *</Label>
// // //               <Input
// // //                 placeholder="e.g., Room 203"
// // //                 value={formData.room}
// // //                 onChange={(e) => handleInputChange("room", e.target.value)}
// // //                 required
// // //               />
// // //             </div>

// // //             <div className="flex justify-end gap-3 pt-4">
// // //               <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
// // //                 Cancel
// // //               </Button>
// // //               <Button
// // //                 type="submit"
// // //                 disabled={isSubmitting}
// // //                 className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
// // //               >
// // //                 {isSubmitting ? "Saving..." : schedule ? "Update" : "Add"}
// // //               </Button>
// // //             </div>
// // //           </form>
// // //         </motion.div>
// // //       </DialogContent>
// // //     </Dialog>
// // //   );
// // // }
// // // import React, { useState, useEffect, useMemo } from "react";
// // // import {
// // //   Dialog,
// // //   DialogContent,
// // //   DialogHeader,
// // //   DialogTitle,
// // // } from "@/components/ui/dialog";
// // // import { Button } from "@/components/ui/button";
// // // import { Input } from "@/components/ui/input";
// // // import { Label } from "@/components/ui/label";
// // // import {
// // //   Select,
// // //   SelectContent,
// // //   SelectItem,
// // //   SelectTrigger,
// // //   SelectValue,
// // // } from "@/components/ui/select";
// // // import { motion } from "framer-motion";

// // // export default function ScheduleForm({
// // //   schedule,
// // //   allCourses,
// // //   allFaculties,
// // //   onSubmit,
// // //   onCancel,
// // // }) {
// // //   const [formData, setFormData] = useState({
// // //     class_id: "",
// // //     department: "",
// // //     semester: "",
// // //     day: "",
// // //     slot_number: "",
// // //     subject: "",
// // //     faculty: "",
// // //     room: "",
// // //     start_time: "",
// // //     end_time: "",
// // //   });

// // //   const [isSubmitting, setIsSubmitting] = useState(false);

// // //   // Populate form if editing an existing schedule
// // //   useEffect(() => {
// // //     if (schedule) {
// // //       const slot = schedule.slots?.[0] || {};
// // //       setFormData({
// // //         class_id: schedule.class_id || "",
// // //         department: schedule.department || "",
// // //         semester: schedule.semester?.toString() || "",
// // //         day: schedule.day || "",
// // //         slot_number: slot.slot_number || "",
// // //         subject: slot.subject?._id || "",
// // //         faculty: slot.faculty?._id || "",
// // //         room: slot.room || "",
// // //         start_time: slot.start_time || "",
// // //         end_time: slot.end_time || "",
// // //       });
// // //     }
// // //   }, [schedule]);

// // //   const handleInputChange = (field, value) => {
// // //     setFormData((prev) => ({ ...prev, [field]: value }));
// // //   };

// // //   // Filter courses based on selected department & semester
// // //   const filteredCourses = useMemo(() => {
// // //     if (!formData.department || !formData.semester) return [];
// // //     return allCourses.filter(
// // //       (course) =>
// // //         course.department === formData.department &&
// // //         course.semester.toString() === formData.semester
// // //     );
// // //   }, [formData.department, formData.semester, allCourses]);

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setIsSubmitting(true);
// // //     try {
// // //       const submissionData = {
// // //         class_id: formData.class_id,
// // //         day: formData.day,
// // //         semester: parseInt(formData.semester),
// // //         slots: [
// // //           {
// // //             slot_number: parseInt(formData.slot_number),
// // //             subject: formData.subject,
// // //             faculty: formData.faculty,
// // //             room: formData.room,
// // //             start_time: formData.start_time,
// // //             end_time: formData.end_time,
// // //           },
// // //         ],
// // //       };
// // //       await onSubmit(submissionData);
// // //     } catch (error) {
// // //       console.error("Error submitting schedule:", error);
// // //     }
// // //     setIsSubmitting(false);
// // //   };

// // //   return (
// // //     <Dialog open={true} onOpenChange={onCancel}>
// // //       <DialogContent className="sm:max-w-lg bg-white rounded-xl shadow-lg p-0">
// // //         <motion.div
// // //           initial={{ opacity: 0, scale: 0.95 }}
// // //           animate={{ opacity: 1, scale: 1 }}
// // //         >
// // //           <DialogHeader className="p-6 pb-4">
// // //             <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// // //               {schedule ? "Edit Timetable Entry" : "Add Timetable Entry"}
// // //             </DialogTitle>
// // //           </DialogHeader>

// // //           <form onSubmit={handleSubmit} className="space-y-4 p-6">
// // //             {/* Department & Semester */}
// // //             <div className="grid grid-cols-2 gap-4">
// // //               {/* <div>
// // //                 <Label>Department *</Label>
// // //                 <Select
// // //                   value={formData.department}
// // //                   onValueChange={(v) => handleInputChange("department", v)}
// // //                   required
// // //                 >
// // //                   <SelectTrigger>
// // //                     <SelectValue placeholder="Select department" />
// // //                   </SelectTrigger>
// // //                   <SelectContent>
// // //                     {departments.length > 0 ? (
// // //                       departments.map((dep) => (
// // //                         <SelectItem key={dep} value={dep}>
// // //                           {dep}
// // //                         </SelectItem>
// // //                       ))
// // //                     ) : (
// // //                       <div className="p-4 text-center text-sm text-gray-500">
// // //                         No departments available
// // //                       </div>
// // //                     )}
// // //                   </SelectContent>
// // //                 </Select>
// // //               </div> */}

// // //               <div>
// // //                 <Label>Semester *</Label>
// // //                 {/* <Select
// // //                   value={formData.semester}
// // //                   onValueChange={(v) => handleInputChange("semester", v)}
// // //                   required
// // //                 >
// // //                   <SelectTrigger>
// // //                     <SelectValue placeholder="Select semester" />
// // //                   </SelectTrigger>
// // //                   <SelectContent>
// // //                     {semesters.length > 0 ? (
// // //                       semesters.map((sem) => (
// // //                         <SelectItem key={sem} value={sem.toString()}>
// // //                           {sem}
// // //                         </SelectItem>
// // //                       ))
// // //                     ) : (
// // //                       <div className="p-4 text-center text-sm text-gray-500">
// // //                         No semesters available
// // //                       </div>
// // //                     )}
// // //                   </SelectContent>
// // //                 </Select> */}
// // //                 <Select
// // //                   value={formData.semester}
// // //                   onValueChange={(v) => handleInputChange("semester", v)}
// // //                   required
// // //                 >
// // //                   <SelectTrigger>
// // //                     <SelectValue placeholder="Select semester" />
// // //                   </SelectTrigger>
// // //                   <SelectContent>
// // //                     {[1, 2, 3, 4, 5, 6].map((sem) => (
// // //                       <SelectItem key={sem} value={sem}>
// // //                         {sem}
// // //                       </SelectItem>
// // //                     ))}
// // //                   </SelectContent>
// // //                 </Select>
// // //               </div>
// // //             </div>

// // //             {/* Class ID */}
// // //             <div>
// // //               <Label>Class ID *</Label>
// // //               <Input
// // //                 placeholder="e.g., BCA2022A"
// // //                 value={formData.class_id}
// // //                 onChange={(e) => handleInputChange("class_id", e.target.value)}
// // //                 required
// // //               />
// // //             </div>

// // //             {/* Day & Slot Number */}
// // //             <div className="grid grid-cols-2 gap-4">
// // //               <div>
// // //                 <Label>Day *</Label>
// // //                 <Select
// // //                   value={formData.day}
// // //                   onValueChange={(v) => handleInputChange("day", v)}
// // //                   required
// // //                 >
// // //                   <SelectTrigger>
// // //                     <SelectValue placeholder="Select day" />
// // //                   </SelectTrigger>
// // //                   <SelectContent>
// // //                     {[
// // //                       "Monday",
// // //                       "Tuesday",
// // //                       "Wednesday",
// // //                       "Thursday",
// // //                       "Friday",
// // //                       "Saturday",
// // //                     ].map((day) => (
// // //                       <SelectItem key={day} value={day}>
// // //                         {day}
// // //                       </SelectItem>
// // //                     ))}
// // //                   </SelectContent>
// // //                 </Select>
// // //               </div>

// // //               <div>
// // //                 <Label>Slot Number *</Label>
// // //                 <Input
// // //                   type="number"
// // //                   min="1"
// // //                   placeholder="e.g. 1"
// // //                   value={formData.slot_number}
// // //                   onChange={(e) =>
// // //                     handleInputChange("slot_number", e.target.value)
// // //                   }
// // //                   required
// // //                 />
// // //               </div>
// // //             </div>

// // //             {/* Subject & Faculty */}
// // //             <div className="grid grid-cols-2 gap-4">
// // //               <div>
// // //                 <Label>Subject *</Label>
// // //                 <Select
// // //                   value={allCourses}
// // //                   onValueChange={(v) => handleInputChange("subject", v)}
// // //                   required
// // //                   disabled={filteredCourses.length === 0}
// // //                 >
// // //                   <SelectTrigger>
// // //                     <SelectValue placeholder="Select subject" />
// // //                   </SelectTrigger>
// // //                   <SelectContent>
// // //                     {filteredCourses.length > 0 ? (
// // //                       filteredCourses.map((subj) => (
// // //                         <SelectItem key={subj._id} value={subj._id}>
// // //                           {subj.name}
// // //                         </SelectItem>
// // //                       ))
// // //                     ) : (
// // //                       <div className="p-4 text-center text-sm text-gray-500">
// // //                         No subjects available
// // //                       </div>
// // //                     )}
// // //                   </SelectContent>
// // //                 </Select>
// // //               </div>

// // //               <div>
// // //                 <Label>Faculty *</Label>
// // //                 <Select
// // //                   value={allFaculties}
// // //                   onValueChange={(v) => handleInputChange("faculty", v)}
// // //                   required
// // //                   disabled={allFaculties.length === 0}
// // //                 >
// // //                   <SelectTrigger>
// // //                     <SelectValue placeholder="Select faculty" />
// // //                   </SelectTrigger>
// // //                   <SelectContent>
// // //                     {allFaculties.length > 0 ? (
// // //                       allFaculties.map((fac) => (
// // //                         <SelectItem key={fac._id} value={fac._id}>
// // //                           {fac.name}
// // //                         </SelectItem>
// // //                       ))
// // //                     ) : (
// // //                       <div className="p-4 text-center text-sm text-gray-500">
// // //                         No faculties available
// // //                       </div>
// // //                     )}
// // //                   </SelectContent>
// // //                 </Select>
// // //               </div>
// // //             </div>

// // //             {/* Time & Room */}
// // //             <div className="grid grid-cols-2 gap-4">
// // //               <div>
// // //                 <Label>Start Time *</Label>
// // //                 <Input
// // //                   type="time"
// // //                   value={formData.start_time}
// // //                   onChange={(e) =>
// // //                     handleInputChange("start_time", e.target.value)
// // //                   }
// // //                   required
// // //                 />
// // //               </div>
// // //               <div>
// // //                 <Label>End Time *</Label>
// // //                 <Input
// // //                   type="time"
// // //                   value={formData.end_time}
// // //                   onChange={(e) =>
// // //                     handleInputChange("end_time", e.target.value)
// // //                   }
// // //                   required
// // //                 />
// // //               </div>
// // //             </div>

// // //             <div>
// // //               <Label>Room *</Label>
// // //               <Input
// // //                 placeholder="e.g., Room 203"
// // //                 value={formData.room}
// // //                 onChange={(e) => handleInputChange("room", e.target.value)}
// // //                 required
// // //               />
// // //             </div>

// // //             {/* Buttons */}
// // //             <div className="flex justify-end gap-3 pt-4">
// // //               <Button
// // //                 type="button"
// // //                 variant="outline"
// // //                 onClick={onCancel}
// // //                 disabled={isSubmitting}
// // //               >
// // //                 Cancel
// // //               </Button>
// // //               <Button
// // //                 type="submit"
// // //                 disabled={isSubmitting}
// // //                 className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
// // //               >
// // //                 {isSubmitting ? "Saving..." : schedule ? "Update" : "Add"}
// // //               </Button>
// // //             </div>
// // //           </form>
// // //         </motion.div>
// // //       </DialogContent>
// // //     </Dialog>
// // //   );
// // // }
// // // import React, { useState, useEffect, useMemo } from "react";
// // // import {
// // //   Dialog,
// // //   DialogContent,
// // //   DialogHeader,
// // //   DialogTitle,
// // // } from "@/components/ui/dialog";
// // // import { Button } from "@/components/ui/button";
// // // import { Input } from "@/components/ui/input";
// // // import { Label } from "@/components/ui/label";
// // // import {
// // //   Select,
// // //   SelectContent,
// // //   SelectItem,
// // //   SelectTrigger,
// // //   SelectValue,
// // // } from "@/components/ui/select";
// // // import { motion } from "framer-motion";

// // // export default function ScheduleForm({
// // //   schedule,
// // //   allCourses,
// // //   allFaculties,
// // //   onSubmit,
// // //   onCancel,
// // // }) {
// // //   const [formData, setFormData] = useState({
// // //     class_id: "",
// // //     semester:"",
// // //     day: "",
// // //     slot_number: "",
// // //     subject: "",
// // //     faculty: "",
// // //     room: "",
// // //     start_time: "",
// // //     end_time: "",
// // //   });

// // //   const [isSubmitting, setIsSubmitting] = useState(false);

// // //   // Populate form if editing an existing schedule
// // //   useEffect(() => {
// // //     if (schedule) {
// // //       const slot = schedule.slots?.[0] || {};
// // //       setFormData({
// // //         class_id: schedule.class_id || "",
// // //         semester: schedule.semester,
// // //         day: schedule.day || "",
// // //         slot_number: slot.slot_number,
// // //         subject: slot.subject?._id || "",
// // //         faculty: slot.faculty?._id || "",
// // //         room: slot.room || "",
// // //         start_time: slot.start_time || "",
// // //         end_time: slot.end_time || "",
// // //       });
// // //     }
// // //   }, [schedule]);

// // //   const handleInputChange = (field, value) => {
// // //     setFormData((prev) => ({ ...prev, [field]: value }));
// // //   };

// // //   // Filter courses based on semester
// // //   const filteredCourses = useMemo(() => {
// // //     if (!formData.semester) return [];
// // //     return allCourses.filter(
// // //       (course) => course.semester.toString() === formData.semester
// // //     );
// // //   }, [formData.semester, allCourses]);

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setIsSubmitting(true);
// // //     try {
// // //       const submissionData = {
// // //         class_id: formData.class_id,
// // //         semester: parseInt(formData.semester),
// // //         day: formData.day,
// // //         slots: [
// // //           {
// // //             slot_number: parseInt(formData.slot_number),
// // //             subject: formData.subject,
// // //             faculty: formData.faculty,
// // //             room: formData.room,
// // //             start_time: formData.start_time,
// // //             end_time: formData.end_time,
// // //           },
// // //         ],
// // //       };
// // //       await onSubmit(submissionData);
// // //     } catch (error) {
// // //       console.error("Error submitting schedule:", error);
// // //     }
// // //     setIsSubmitting(false);
// // //   };

// // //   return (
// // //     <Dialog open={true} onOpenChange={onCancel}>
// // //       <DialogContent className="sm:max-w-lg bg-white rounded-xl shadow-lg p-0">
// // //         <motion.div
// // //           initial={{ opacity: 0, scale: 0.95 }}
// // //           animate={{ opacity: 1, scale: 1 }}
// // //         >
// // //           <DialogHeader className="p-6 pb-4">
// // //             <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// // //               {schedule ? "Edit Timetable Entry" : "Add Timetable Entry"}
// // //             </DialogTitle>
// // //           </DialogHeader>

// // //           <form onSubmit={handleSubmit} className="space-y-4 p-6">
// // //             {/* Semester */}
// // //             <div>
// // //               <Label>Semester *</Label>
// // //               <Select
// // //                 value={formData.semester}
// // //                 onValueChange={(v) => handleInputChange("semester", v)}
// // //                 required
// // //               >
// // //                 <SelectTrigger>
// // //                   <SelectValue placeholder="Select semester" />
// // //                 </SelectTrigger>
// // //                 <SelectContent>
// // //                   {[1, 2, 3, 4, 5, 6].map((sem) => (
// // //                     <SelectItem key={sem} value={sem}>
// // //                       {sem}
// // //                     </SelectItem>
// // //                   ))}
// // //                 </SelectContent>
// // //               </Select>
// // //             </div>

// // //             {/* Class ID */}
// // //             <div>
// // //               <Label>Class ID *</Label>
// // //               <Input
// // //                 placeholder="e.g., BCA2022A"
// // //                 value={formData.class_id}
// // //                 onChange={(e) => handleInputChange("class_id", e.target.value)}
// // //                 required
// // //               />
// // //             </div>

// // //             {/* Day & Slot Number */}
// // //             <div className="grid grid-cols-2 gap-4">
// // //               <div>
// // //                 <Label>Day *</Label>
// // //                 <Select
// // //                   value={formData.day}
// // //                   onValueChange={(v) => handleInputChange("day", v)}
// // //                   required
// // //                 >
// // //                   <SelectTrigger>
// // //                     <SelectValue placeholder="Select day" />
// // //                   </SelectTrigger>
// // //                   <SelectContent>
// // //                     {[
// // //                       "Monday",
// // //                       "Tuesday",
// // //                       "Wednesday",
// // //                       "Thursday",
// // //                       "Friday",
// // //                       "Saturday",
// // //                     ].map((day) => (
// // //                       <SelectItem key={day} value={day}>
// // //                         {day}
// // //                       </SelectItem>
// // //                     ))}
// // //                   </SelectContent>
// // //                 </Select>
// // //               </div>

// // //               <div>
// // //                 <Label>Slot Number *</Label>
// // //                 <Input
// // //                   type="number"
// // //                   min="1"
// // //                   placeholder="e.g. 1"
// // //                   value={formData.slot_number}
// // //                   onChange={(e) =>
// // //                     handleInputChange("slot_number", e.target.value)
// // //                   }
// // //                   required
// // //                 />
// // //               </div>
// // //             </div>

// // //             {/* Subject & Faculty */}
// // //             <div className="grid grid-cols-2 gap-4">
// // //               <div>
// // //                 <Label>Subject *</Label>
// // //                 <Select
// // //                   value={formData.subject}
// // //                   onValueChange={(v) => handleInputChange("subject", v)}
// // //                   required
// // //                   disabled={filteredCourses.length === 0}
// // //                 >
// // //                   <SelectTrigger>
// // //                     <SelectValue placeholder="Select subject" />
// // //                   </SelectTrigger>
// // //                   <SelectContent>
// // //                     {filteredCourses.length > 0 ? (
// // //                       filteredCourses.map((subj) => (
// // //                         <SelectItem key={subj._id} value={subj._id}>
// // //                           {subj.name}
// // //                         </SelectItem>
// // //                       ))
// // //                     ) : (
// // //                       <div className="p-4 text-center text-sm text-gray-500">
// // //                         No subjects available
// // //                       </div>
// // //                     )}
// // //                   </SelectContent>
// // //                 </Select>
// // //               </div>

// // //               <div>
// // //                 <Label>Faculty *</Label>
// // //                 <Select
// // //                   value={formData.faculty}
// // //                   onValueChange={(v) => handleInputChange("faculty", v)}
// // //                   required
// // //                   disabled={allFaculties.length === 0}
// // //                 >
// // //                   <SelectTrigger>
// // //                     <SelectValue placeholder="Select faculty" />
// // //                   </SelectTrigger>
// // //                   <SelectContent>
// // //                     {allFaculties.length > 0 ? (
// // //                       allFaculties.map((fac) => (
// // //                         <SelectItem key={fac._id} value={fac._id}>
// // //                           {fac.name}
// // //                         </SelectItem>
// // //                       ))
// // //                     ) : (
// // //                       <div className="p-4 text-center text-sm text-gray-500">
// // //                         No faculties available
// // //                       </div>
// // //                     )}
// // //                   </SelectContent>
// // //                 </Select>
// // //               </div>
// // //             </div>

// // //             {/* Time & Room */}
// // //             <div className="grid grid-cols-2 gap-4">
// // //               <div>
// // //                 <Label>Start Time *</Label>
// // //                 <Input
// // //                   type="time"
// // //                   value={formData.start_time}
// // //                   onChange={(e) =>
// // //                     handleInputChange("start_time", e.target.value)
// // //                   }
// // //                   required
// // //                 />
// // //               </div>
// // //               <div>
// // //                 <Label>End Time *</Label>
// // //                 <Input
// // //                   type="time"
// // //                   value={formData.end_time}
// // //                   onChange={(e) =>
// // //                     handleInputChange("end_time", e.target.value)
// // //                   }
// // //                   required
// // //                 />
// // //               </div>
// // //             </div>

// // //             <div>
// // //               <Label>Room *</Label>
// // //               <Input
// // //                 placeholder="e.g., Room 203"
// // //                 value={formData.room}
// // //                 onChange={(e) => handleInputChange("room", e.target.value)}
// // //                 required
// // //               />
// // //             </div>

// // //             {/* Buttons */}
// // //             <div className="flex justify-end gap-3 pt-4">
// // //               <Button
// // //                 type="button"
// // //                 variant="outline"
// // //                 onClick={onCancel}
// // //                 disabled={isSubmitting}
// // //               >
// // //                 Cancel
// // //               </Button>
// // //               <Button
// // //                 type="submit"
// // //                 disabled={isSubmitting}
// // //                 className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
// // //               >
// // //                 {isSubmitting ? "Saving..." : schedule ? "Update" : "Add"}
// // //               </Button>
// // //             </div>
// // //           </form>
// // //         </motion.div>
// // //       </DialogContent>
// // //     </Dialog>
// // //   );
// // // }
// // import React, { useState, useEffect, useMemo } from "react";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// // } from "@/components/ui/dialog";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { motion } from "framer-motion";

// // export default function ScheduleForm({
// //   schedule,
// //   allCourses,
// //   allFaculties,
// //   onSubmit,
// //   onCancel,
// // }) {
// //   const [formData, setFormData] = useState({
// //     class_id: "",
// //     semester: "",
// //     day: "",
// //     slot_number: "",
// //     subject: "",
// //     faculty: "",
// //     room: "",
// //     start_time: "",
// //     end_time: "",
// //   });

// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   // Populate form if editing an existing schedule
// //   useEffect(() => {
// //     if (schedule) {
// //       const slot = schedule.slots?.[0] || {};
// //       setFormData({
// //         class_id: schedule.class_id || "",
// //         semester: schedule.semester?.toString() || "", // ensure string for UI
// //         day: schedule.day || "",
// //         slot_number: slot.slot_number?.toString() || "",
// //         subject: slot.subject?._id || "",
// //         faculty: slot.faculty?._id || "",
// //         room: slot.room || "",
// //         start_time: slot.start_time || "",
// //         end_time: slot.end_time || "",
// //       });
// //     }
// //   }, [schedule]);

// //   const handleInputChange = (field, value) => {
// //     setFormData((prev) => ({ ...prev, [field]: value }));
// //   };

// //   // Filter courses based on semester
// //   const filteredCourses = useMemo(() => {
// //     if (!formData.semester) return [];
// //     return allCourses.filter(
// //       (course) => course.semester.toString() === formData.semester
// //     );
// //   }, [formData.semester, allCourses]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsSubmitting(true);
// //     try {
// //       const submissionData = {
// //         class_id: formData.class_id,
// //         semester: parseInt(formData.semester), // ✅ convert to number for DB
// //         day: formData.day,
// //         slots: [
// //           {
// //             slot_number: parseInt(formData.slot_number),
// //             subject: formData.subject,
// //             faculty: formData.faculty,
// //             room: formData.room,
// //             start_time: formData.start_time,
// //             end_time: formData.end_time,
// //           },
// //         ],
// //       };
// //       await onSubmit(submissionData);
// //     } catch (error) {
// //       console.error("Error submitting schedule:", error);
// //     }
// //     setIsSubmitting(false);
// //   };

// //   return (
// //     <Dialog open={true} onOpenChange={onCancel}>
// //       <DialogContent className="sm:max-w-lg bg-white rounded-xl shadow-lg p-0">
// //         <motion.div
// //           initial={{ opacity: 0, scale: 0.95 }}
// //           animate={{ opacity: 1, scale: 1 }}
// //         >
// //           <DialogHeader className="p-6 pb-4">
// //             <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// //               {schedule ? "Edit Timetable Entry" : "Add Timetable Entry"}
// //             </DialogTitle>
// //           </DialogHeader>

// //           <form onSubmit={handleSubmit} className="space-y-4 p-6">
// //             {/* Semester */}
// //             <div>
// //               <Label>Semester *</Label>
// //               <Select
// //                 value={formData.semester?.toString() || ""}
// //                 onValueChange={(v) => handleInputChange("semester", v)}
// //                 required
// //               >
// //                 <SelectTrigger>
// //                   <SelectValue placeholder="Select semester" />
// //                 </SelectTrigger>
// //                 <SelectContent>
// //                   {[1, 2, 3, 4, 5, 6].map((sem) => (
// //                     <SelectItem key={sem} value={sem.toString()}>
// //                       {sem}
// //                     </SelectItem>
// //                   ))}
// //                 </SelectContent>
// //               </Select>
// //             </div>

// //             {/* Class ID */}
// //             <div>
// //               <Label>Class ID *</Label>
// //               <Input
// //                 placeholder="e.g., BCA2022A"
// //                 value={formData.class_id}
// //                 onChange={(e) => handleInputChange("class_id", e.target.value)}
// //                 required
// //               />
// //             </div>

// //             {/* Day & Slot Number */}
// //             <div className="grid grid-cols-2 gap-4">
// //               <div>
// //                 <Label>Day *</Label>
// //                 <Select
// //                   value={formData.day}
// //                   onValueChange={(v) => handleInputChange("day", v)}
// //                   required
// //                 >
// //                   <SelectTrigger>
// //                     <SelectValue placeholder="Select day" />
// //                   </SelectTrigger>
// //                   <SelectContent>
// //                     {[
// //                       "Monday",
// //                       "Tuesday",
// //                       "Wednesday",
// //                       "Thursday",
// //                       "Friday",
// //                       "Saturday",
// //                     ].map((day) => (
// //                       <SelectItem key={day} value={day}>
// //                         {day}
// //                       </SelectItem>
// //                     ))}
// //                   </SelectContent>
// //                 </Select>
// //               </div>

// //               <div>
// //                 <Label>Slot Number *</Label>
// //                 <Input
// //                   type="number"
// //                   min="1"
// //                   placeholder="e.g. 1"
// //                   value={formData.slot_number}
// //                   onChange={(e) =>
// //                     handleInputChange("slot_number", e.target.value)
// //                   }
// //                   required
// //                 />
// //               </div>
// //             </div>

// //             {/* Subject & Faculty */}
// //             <div className="grid grid-cols-2 gap-4">
// //               <div>
// //                 <Label>Subject *</Label>
// //                 <Select
// //                   value={formData.subject}
// //                   onValueChange={(v) => handleInputChange("subject", v)}
// //                   required
// //                   disabled={filteredCourses.length === 0}
// //                 >
// //                   <SelectTrigger>
// //                     <SelectValue placeholder="Select subject" />
// //                   </SelectTrigger>
// //                   <SelectContent>
// //                     {filteredCourses.length > 0 ? (
// //                       filteredCourses.map((subj) => (
// //                         <SelectItem key={subj._id} value={subj._id}>
// //                           {subj.name}
// //                         </SelectItem>
// //                       ))
// //                     ) : (
// //                       <div className="p-4 text-center text-sm text-gray-500">
// //                         No subjects available
// //                       </div>
// //                     )}
// //                   </SelectContent>
// //                 </Select>
// //               </div>

// //               <div>
// //                 <Label>Faculty *</Label>
// //                 <Select
// //                   value={formData.faculty}
// //                   onValueChange={(v) => handleInputChange("faculty", v)}
// //                   required
// //                   disabled={allFaculties.length === 0}
// //                 >
// //                   <SelectTrigger>
// //                     <SelectValue placeholder="Select faculty" />
// //                   </SelectTrigger>
// //                   <SelectContent>
// //                     {allFaculties.length > 0 ? (
// //                       allFaculties.map((fac) => (
// //                         <SelectItem key={fac._id} value={fac._id}>
// //                           {fac.name}
// //                         </SelectItem>
// //                       ))
// //                     ) : (
// //                       <div className="p-4 text-center text-sm text-gray-500">
// //                         No faculties available
// //                       </div>
// //                     )}
// //                   </SelectContent>
// //                 </Select>
// //               </div>
// //             </div>

// //             {/* Time & Room */}
// //             <div className="grid grid-cols-2 gap-4">
// //               <div>
// //                 <Label>Start Time *</Label>
// //                 <Input
// //                   type="time"
// //                   value={formData.start_time}
// //                   onChange={(e) =>
// //                     handleInputChange("start_time", e.target.value)
// //                   }
// //                   required
// //                 />
// //               </div>
// //               <div>
// //                 <Label>End Time *</Label>
// //                 <Input
// //                   type="time"
// //                   value={formData.end_time}
// //                   onChange={(e) =>
// //                     handleInputChange("end_time", e.target.value)
// //                   }
// //                   required
// //                 />
// //               </div>
// //             </div>

// //             <div>
// //               <Label>Room *</Label>
// //               <Input
// //                 placeholder="e.g., Room 203"
// //                 value={formData.room}
// //                 onChange={(e) => handleInputChange("room", e.target.value)}
// //                 required
// //               />
// //             </div>

// //             {/* Buttons */}
// //             <div className="flex justify-end gap-3 pt-4">
// //               <Button
// //                 type="button"
// //                 variant="outline"
// //                 onClick={onCancel}
// //                 disabled={isSubmitting}
// //               >
// //                 Cancel
// //               </Button>
// //               <Button
// //                 type="submit"
// //                 disabled={isSubmitting}
// //                 className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
// //               >
// //                 {isSubmitting ? "Saving..." : schedule ? "Update" : "Add"}
// //               </Button>
// //             </div>
// //           </form>
// //         </motion.div>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // }
// import React, { useState, useEffect, useMemo } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { motion } from "framer-motion";

// export default function ScheduleForm({
//   schedule,
//   allCourses,
//   allFaculties,
//   onSubmit,
//   onCancel,
// }) {
//   const [formData, setFormData] = useState({
//     class_id: "",
//     semester: "",
//     day: "",
//     slot_number: "",
//     subject: "",
//     faculty: "",
//     room: "",
//     start_time: "",
//     end_time: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Populate form if editing an existing schedule
//   useEffect(() => {
//     if (schedule) {
//       const slot = schedule.slots?.[0] || {};
//       setFormData({
//         class_id: schedule.class_id || "",
//         semester: schedule.semester?.toString() || "",
//         day: schedule.day || "",
//         slot_number: slot.slot_number?.toString() || "",
//         subject: slot.subject?._id || "",
//         faculty: slot.faculty?._id || "",
//         room: slot.room || "",
//         start_time: slot.start_time || "",
//         end_time: slot.end_time || "",
//       });
//     }
//   }, [schedule]);

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => {
//       const updated = { ...prev, [field]: value };

//       // Automatically generate class_id based on today's date and slot number
//       if (field === "slot_number" && value) {
//         const today = new Date();
//         const formattedDate = today
//           .toISOString()
//           .split("T")[0]
//           .replace(/-/g, "");
//         updated.class_id = `${formattedDate}_${value}`;
//       }

//       // Auto calculate start_time and end_time
//       if (
//         (field === "slot_number" || field === "semester") &&
//         updated.semester &&
//         updated.slot_number
//       ) {
//         const semNum = parseInt(updated.semester);
//         const slotNum = parseInt(updated.slot_number);
//         let startHour = 10;
//         let startMinute = semNum <= 4 ? 40 : 45;
//         const duration = 45; // minutes per slot

//         // Calculate new start time by adding (slot - 1) * 45 mins
//         const totalMinutes = startHour * 60 + startMinute + (slotNum - 1) * duration;
//         const startTimeHour = Math.floor(totalMinutes / 60);
//         const startTimeMinute = totalMinutes % 60;

//         // End time = start time + 45 minutes
//         const endMinutes = totalMinutes + duration;
//         const endHour = Math.floor(endMinutes / 60);
//         const endMinute = endMinutes % 60;

//         // Format as HH:MM (24-hour)
//         const pad = (n) => n.toString().padStart(2, "0");
//         updated.start_time = `${pad(startTimeHour)}:${pad(startTimeMinute)}`;
//         updated.end_time = `${pad(endHour)}:${pad(endMinute)}`;
//       }

//       return updated;
//     });
//   };

//   // Filter courses based on semester
//   const filteredCourses = useMemo(() => {
//     if (!formData.semester) return [];
//     return allCourses.filter(
//       (course) => course.semester.toString() === formData.semester
//     );
//   }, [formData.semester, allCourses]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       const submissionData = {
//         class_id: formData.class_id,
//         semester: parseInt(formData.semester),
//         day: formData.day,
//         slots: [
//           {
//             slot_number: parseInt(formData.slot_number),
//             subject: formData.subject,
//             faculty: formData.faculty,
//             room: formData.room,
//             start_time: formData.start_time,
//             end_time: formData.end_time,
//           },
//         ],
//       };
//       await onSubmit(submissionData);
//     } catch (error) {
//       console.error("Error submitting schedule:", error);
//     }
//     setIsSubmitting(false);
//   };

//   return (
//     <Dialog open={true} onOpenChange={onCancel}>
//       <DialogContent className="sm:max-w-lg bg-white rounded-xl shadow-lg p-0">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//         >
//           <DialogHeader className="p-6 pb-4">
//             <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               {schedule ? "Edit Timetable Entry" : "Add Timetable Entry"}
//             </DialogTitle>
//           </DialogHeader>

//           <form onSubmit={handleSubmit} className="space-y-4 p-6">
//             {/* Semester */}
//             <div>
//               <Label>Semester *</Label>
//               <Select
//                 value={formData.semester?.toString() || ""}
//                 onValueChange={(v) => handleInputChange("semester", v)}
//                 required
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select semester" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {[1, 2, 3, 4, 5, 6].map((sem) => (
//                     <SelectItem key={sem} value={sem.toString()}>
//                       {sem}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Class ID (Auto-generated) */}
//             <div>
//               <Label>Class ID (Auto-generated)</Label>
//               <Input value={formData.class_id} readOnly />
//             </div>

//             {/* Day & Slot Number */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label>Day *</Label>
//                 <Select
//                   value={formData.day}
//                   onValueChange={(v) => handleInputChange("day", v)}
//                   required
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select day" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {[
//                       "Monday",
//                       "Tuesday",
//                       "Wednesday",
//                       "Thursday",
//                       "Friday",
//                       "Saturday",
//                     ].map((day) => (
//                       <SelectItem key={day} value={day}>
//                         {day}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div>
//                 <Label>Slot Number *</Label>
//                 <Input
//                   type="number"
//                   min="1"
//                   max="8"
//                   placeholder="e.g. 1"
//                   value={formData.slot_number}
//                   onChange={(e) =>
//                     handleInputChange("slot_number", e.target.value)
//                   }
//                   required
//                 />
//               </div>
//             </div>

//             {/* Subject & Faculty */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label>Subject *</Label>
//                 <Select
//                   value={formData.subject}
//                   onValueChange={(v) => handleInputChange("subject", v)}
//                   required
//                   disabled={filteredCourses.length === 0}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select subject" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {filteredCourses.length > 0 ? (
//                       filteredCourses.map((subj) => (
//                         <SelectItem key={subj._id} value={subj._id}>
//                           {subj.name}
//                         </SelectItem>
//                       ))
//                     ) : (
//                       <div className="p-4 text-center text-sm text-gray-500">
//                         No subjects available
//                       </div>
//                     )}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div>
//                 <Label>Faculty *</Label>
//                 <Select
//                   value={formData.faculty}
//                   onValueChange={(v) => handleInputChange("faculty", v)}
//                   required
//                   disabled={allFaculties.length === 0}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select faculty" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {allFaculties.length > 0 ? (
//                       allFaculties.map((fac) => (
//                         <SelectItem key={fac._id} value={fac._id}>
//                           {fac.name}
//                         </SelectItem>
//                       ))
//                     ) : (
//                       <div className="p-4 text-center text-sm text-gray-500">
//                         No faculties available
//                       </div>
//                     )}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             {/* Auto-calculated Time */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label>Start Time (Auto)</Label>
//                 <Input type="time" value={formData.start_time} readOnly />
//               </div>
//               <div>
//                 <Label>End Time (Auto)</Label>
//                 <Input type="time" value={formData.end_time} readOnly />
//               </div>
//             </div>

//             {/* Room */}
//             <div>
//               <Label>Room *</Label>
//               <Input
//                 placeholder="e.g., Room 203"
//                 value={formData.room}
//                 onChange={(e) => handleInputChange("room", e.target.value)}
//                 required
//               />
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-end gap-3 pt-4">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={onCancel}
//                 disabled={isSubmitting}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
//               >
//                 {isSubmitting ? "Saving..." : schedule ? "Update" : "Add"}
//               </Button>
//             </div>
//           </form>
//         </motion.div>
//       </DialogContent>
//     </Dialog>
//   );
// }
import React, { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

export default function ScheduleForm({
  schedule,
  allCourses,
  allFaculties,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    class_id: "",
    semester: "",
    day: "",
    slot_number: "",
    subject: "",
    faculty: "",
    room: "",
    start_time: "",
    end_time: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Preload existing data when editing
  useEffect(() => {
    if (schedule) {
      const slot = schedule.slots?.[0] || {};
      setFormData({
        class_id: schedule.class_id || "",
        semester: schedule.semester?.toString() || "",
        day: schedule.day || "",
        slot_number: slot.slot_number?.toString() || "",
        subject: slot.subject?._id || "",
        faculty: slot.faculty?._id || "",
        room: slot.room || "",
        start_time: slot.start_time || "",
        end_time: slot.end_time || "",
      });
    }
  }, [schedule]);

  // Function to auto-generate class_id
  const generateClassId = (data) => {
    const { semester, day, slot_number } = data;
    if (!semester || !day || !slot_number) return "";

    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0].replace(/-/g, "");
    // Example: SEM3_Tuesday_20251006_SLOT2
    return `SEM${semester}_${day}_${formattedDate}_S${slot_number}`;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      // Update class_id whenever semester, day, or slot changes
      if (["semester", "day", "slot_number"].includes(field)) {
        updated.class_id = generateClassId(updated);
      }

      // Auto-calculate start_time & end_time
      if (
        (field === "slot_number" || field === "semester") &&
        updated.semester &&
        updated.slot_number
      ) {
        const semNum = parseInt(updated.semester);
        const slotNum = parseInt(updated.slot_number);
        let startHour = 10;
        let startMinute = semNum <= 4 ? 40 : 45;
        const duration = 45; // minutes per slot

        const totalMinutes =
          startHour * 60 + startMinute + (slotNum - 1) * duration;
        const startTimeHour = Math.floor(totalMinutes / 60);
        const startTimeMinute = totalMinutes % 60;

        const endMinutes = totalMinutes + duration;
        const endHour = Math.floor(endMinutes / 60);
        const endMinute = endMinutes % 60;

        const pad = (n) => n.toString().padStart(2, "0");
        updated.start_time = `${pad(startTimeHour)}:${pad(startTimeMinute)}`;
        updated.end_time = `${pad(endHour)}:${pad(endMinute)}`;
      }

      return updated;
    });
  };

  // Filter subjects by selected semester
  const filteredCourses = useMemo(() => {
    if (!formData.semester) return [];
    return allCourses.filter(
      (course) => course.semester.toString() === formData.semester
    );
  }, [formData.semester, allCourses]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submissionData = {
        class_id: formData.class_id,
        semester: parseInt(formData.semester),
        day: formData.day,
        slots: [
          {
            slot_number: parseInt(formData.slot_number),
            subject: formData.subject,
            faculty: formData.faculty,
            room: formData.room,
            start_time: formData.start_time,
            end_time: formData.end_time,
          },
        ],
      };
      await onSubmit(submissionData);
    } catch (error) {
      console.error("Error submitting schedule:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-lg bg-white rounded-xl shadow-lg p-0">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {schedule ? "Edit Timetable Entry" : "Add Timetable Entry"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            {/* Semester */}
            <div>
              <Label>Semester *</Label>
              <Select
                value={formData.semester?.toString() || ""}
                onValueChange={(v) => handleInputChange("semester", v)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((sem) => (
                    <SelectItem key={sem} value={sem.toString()}>
                      {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Class ID */}
            <div>
              <Label>Class ID (Auto-generated)</Label>
              <Input value={formData.class_id} readOnly />
            </div>

            {/* Day & Slot */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Day *</Label>
                <Select
                  value={formData.day}
                  onValueChange={(v) => handleInputChange("day", v)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
                      (day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Slot Number *</Label>
                <Input
                  type="number"
                  min="1"
                  placeholder="e.g. 1"
                  value={formData.slot_number}
                  onChange={(e) => handleInputChange("slot_number", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Subject & Faculty */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Subject *</Label>
                <Select
                  value={formData.subject}
                  onValueChange={(v) => handleInputChange("subject", v)}
                  required
                  disabled={filteredCourses.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredCourses.length > 0 ? (
                      filteredCourses.map((subj) => (
                        <SelectItem key={subj._id} value={subj._id}>
                          {subj.name}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-4 text-center text-sm text-gray-500">
                        No subjects available
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Faculty *</Label>
                <Select
                  value={formData.faculty}
                  onValueChange={(v) => handleInputChange("faculty", v)}
                  required
                  disabled={allFaculties.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select faculty" />
                  </SelectTrigger>
                  <SelectContent>
                    {allFaculties.length > 0 ? (
                      allFaculties.map((fac) => (
                        <SelectItem key={fac._id} value={fac._id}>
                          {fac.name}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-4 text-center text-sm text-gray-500">
                        No faculties available
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Time (Auto)</Label>
                <Input type="time" value={formData.start_time} readOnly />
              </div>
              <div>
                <Label>End Time (Auto)</Label>
                <Input type="time" value={formData.end_time} readOnly />
              </div>
            </div>

            {/* Room */}
            <div>
              <Label>Room *</Label>
              <Input
                placeholder="e.g., Room 203"
                value={formData.room}
                onChange={(e) => handleInputChange("room", e.target.value)}
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
              >
                {isSubmitting ? "Saving..." : schedule ? "Update" : "Add"}
              </Button>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
