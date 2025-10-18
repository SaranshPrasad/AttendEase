// // // import React, { useState, useEffect, useMemo } from "react";
// // // // import { Schedule } from "@/entities/Schedule";
// // // // import { Course } from "@/entities/Course";
// // // // import { User } from "@/entities/User";
// // // import { Button } from "@/components/ui/button";
// // // import {
// // //   Select,
// // //   SelectContent,
// // //   SelectItem,
// // //   SelectTrigger,
// // //   SelectValue,
// // // } from "@/components/ui/select";
// // // import { Plus, Calendar, Filter } from "lucide-react";

// // // import TimetableGrid from "../components/timetable/TimetableGrid";
// // // import ScheduleForm from "../components/timetable/ScheduleForm";

// // // export default function TimetablePage() {
// // //   const [schedules, setSchedules] = useState([]);
// // //   const [allCourses, setAllCourses] = useState([]);
// // //   const [showForm, setShowForm] = useState(false);
// // //   const [editingSchedule, setEditingSchedule] = useState(null);
// // //   const [currentUser, setCurrentUser] = useState(null);
// // //   const [isLoading, setIsLoading] = useState(true);

// // //   // New state for filters
// // //   const [departments, setDepartments] = useState([]);
// // //   const [semesters, setSemesters] = useState([]);
// // //   const [selectedDepartment, setSelectedDepartment] = useState("all");
// // //   const [selectedSemester, setSelectedSemester] = useState("all");

// // //   useEffect(() => {
// // //     loadData();
// // //   }, []);

// // //   const loadData = async () => {
// // //     setIsLoading(true);
// // //     try {
// // //       const user = await User.me();
// // //       setCurrentUser(user);

// // //       const [schedulesData, coursesData] = await Promise.all([
// // //         Schedule.list("-created_date"),
// // //         Course.list(),
// // //       ]);

// // //       setSchedules(schedulesData);
// // //       setAllCourses(coursesData);

// // //       // Derive unique departments and semesters for filters
// // //       const uniqueDepartments = [
// // //         ...new Set(coursesData.map((c) => c.department).filter(Boolean)),
// // //       ];
// // //       const uniqueSemesters = [
// // //         ...new Set(coursesData.map((c) => c.semester).filter(Boolean)),
// // //       ];
// // //       setDepartments(uniqueDepartments);
// // //       setSemesters(uniqueSemesters);
// // //     } catch (error) {
// // //       console.error("Error loading timetable data:", error);
// // //     }
// // //     setIsLoading(false);
// // //   };

// // //   const handleSubmit = async (scheduleData) => {
// // //     if (editingSchedule) {
// // //       await Schedule.update(editingSchedule.id, scheduleData);
// // //     } else {
// // //       await Schedule.create({
// // //         ...scheduleData,
// // //         faculty_id:
// // //           currentUser?.role === "user"
// // //             ? currentUser.id
// // //             : scheduleData.faculty_id, // Admin can assign faculty
// // //       });
// // //     }
// // //     setShowForm(false);
// // //     setEditingSchedule(null);
// // //     loadData();
// // //   };

// // //   const handleEdit = (schedule) => {
// // //     setEditingSchedule(schedule);
// // //     setShowForm(true);
// // //   };

// // //   const handleDelete = async (scheduleId) => {
// // //     if (confirm("Are you sure you want to delete this schedule?")) {
// // //       await Schedule.delete(scheduleId);
// // //       loadData();
// // //     }
// // //   };

// // //   // Filter schedules based on user role and selected filters
// // //   const filteredSchedules = useMemo(() => {
// // //     let schedulesToFilter = schedules;

// // //     // First, filter by user role
// // //     if (currentUser?.role === "user") {
// // //       // Faculty
// // //       schedulesToFilter = schedules.filter(
// // //         (s) => s.faculty_id === currentUser.id
// // //       );
// // //     }
// // //     // Students and Admins see all schedules by default, filtering is next

// // //     // Then, filter by department and semester
// // //     if (selectedDepartment === "all" && selectedSemester === "all") {
// // //       return schedulesToFilter;
// // //     }

// // //     const filteredCourseIds = allCourses
// // //       .filter(
// // //         (course) =>
// // //           (selectedDepartment === "all" ||
// // //             course.department === selectedDepartment) &&
// // //           (selectedSemester === "all" || course.semester === selectedSemester)
// // //       )
// // //       .map((course) => course.id);

// // //     return schedulesToFilter.filter((schedule) =>
// // //       filteredCourseIds.includes(schedule.course_id)
// // //     );
// // //   }, [
// // //     schedules,
// // //     allCourses,
// // //     currentUser,
// // //     selectedDepartment,
// // //     selectedSemester,
// // //   ]);

// // //   const userCourses = useMemo(() => {
// // //     if (currentUser?.role === "user") {
// // //       return allCourses.filter((c) => c.faculty_id === currentUser.id);
// // //     }
// // //     return allCourses;
// // //   }, [allCourses, currentUser]);

// // //   return (
// // //     <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
// // //       <div className="max-w-7xl mx-auto">
// // //         {/* Header */}
// // //         <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
// // //           <div className="flex items-center gap-4">
// // //             <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
// // //               <Calendar className="w-7 h-7 text-white" />
// // //             </div>
// // //             <div>
// // //               <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// // //                 Timetable Management
// // //               </h1>
// // //               <p className="text-gray-600 text-lg">
// // //                 View and manage class schedules across departments.
// // //               </p>
// // //             </div>
// // //           </div>
// // //           {/* {(currentUser?.role === "admin" || currentUser?.role === "user") && ( */}
// // //             <Button
// // //               onClick={() => {
// // //                 setEditingSchedule(null);
// // //                 setShowForm(true);
// // //               }}
// // //               className="bg-gradient-to-r from-blue-500 to-purple-600 text-white h-12 px-6 shadow-lg w-full md:w-auto"
// // //             >
// // //               <Plus className="w-5 h-5 mr-2" />
// // //               Add Schedule
// // //             </Button>
// // //           {/* )} */}
// // //         </div>

// // //         {/* Filters */}
// // //         <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-4 mb-8">
// // //           <div className="flex flex-col md:flex-row gap-4 items-center">
// // //             <div className="flex items-center gap-2 font-semibold text-gray-700">
// // //               <Filter className="w-5 h-5" />
// // //               <span>Filter by:</span>
// // //             </div>
// // //             <div className="w-full md:w-auto">
// // //               <Select
// // //                 value={selectedDepartment}
// // //                 onValueChange={setSelectedDepartment}
// // //               >
// // //                 <SelectTrigger className="w-full md:w-56">
// // //                   <SelectValue placeholder="Select Department" />
// // //                 </SelectTrigger>
// // //                 <SelectContent>
// // //                   <SelectItem value="all">All Departments</SelectItem>
// // //                   {departments.map((dep) => (
// // //                     <SelectItem key={dep} value={dep}>
// // //                       {dep}
// // //                     </SelectItem>
// // //                   ))}
// // //                 </SelectContent>
// // //               </Select>
// // //             </div>
// // //             <div className="w-full md:w-auto">
// // //               <Select
// // //                 value={selectedSemester}
// // //                 onValueChange={setSelectedSemester}
// // //               >
// // //                 <SelectTrigger className="w-full md:w-56">
// // //                   <SelectValue placeholder="Select Semester" />
// // //                 </SelectTrigger>
// // //                 <SelectContent>
// // //                   <SelectItem value="all">All Semesters</SelectItem>
// // //                   {semesters.map((sem) => (
// // //                     <SelectItem key={sem} value={sem}>
// // //                       {sem}
// // //                     </SelectItem>
// // //                   ))}
// // //                 </SelectContent>
// // //               </Select>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Timetable Grid */}
// // //         <TimetableGrid
// // //           schedules={filteredSchedules}
// // //           courses={allCourses}
// // //           onEdit={handleEdit}
// // //           onDelete={handleDelete}
// // //           userRole={currentUser?.role}
// // //           isLoading={isLoading}
// // //         />

// // //         {/* Schedule Form Modal */}
// // //         {showForm && (
// // //           <ScheduleForm
// // //             schedule={editingSchedule}
// // //             allCourses={allCourses}
// // //             departments={departments}
// // //             semesters={semesters}
// // //             onSubmit={handleSubmit}
// // //             onCancel={() => {
// // //               setShowForm(false);
// // //               setEditingSchedule(null);
// // //             }}
// // //             userRole={currentUser?.role}
// // //           />
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import React, { useState, useEffect, useMemo } from "react";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { Plus, Calendar, Filter } from "lucide-react";
// // import TimetableGrid from "../components/timetable/TimetableGrid";
// // import ScheduleForm from "../components/timetable/ScheduleForm";
// // import axios from "axios";
// // import { getFaculty } from "../lib/getFacultyData";
// // import { getCourses } from "../lib/getCourses";
// // import Timetable from "../lib/Timetable";

// // export default function TimetablePage() {
// //   const [timetables, setTimetables] = useState([]);
// //   const [departments, setDepartments] = useState([]);
// //   const [semesters, setSemesters] = useState([]);
// //   const [selectedDepartment, setSelectedDepartment] = useState("all");
// //   const [selectedSemester, setSelectedSemester] = useState("all");
// //   const [showForm, setShowForm] = useState(false);
// //   const [editingTimetable, setEditingTimetable] = useState(null);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [allFaculties,setAllFaculties] = useState([]);
// //   const [allCourses, setAllCourses] = useState([]);

// //   // Load data on mount
// //   useEffect(() => {
// //     const loadData = async () => {
// //       const fac = await getFaculty();
// //       const course = await getCourses();
// //       setAllFaculties(fac);
// //       setAllCourses(course);
// //     }
// //     loadData();
// //     fetchTimetables();
// //   }, []);

// //   const fetchTimetables = async () => {
// //     setIsLoading(true);
// //     try {
// //       // const res = await axios.get("http://localhost:5001/admin/view/timetable");
// //       // const data = res.data.timetables;
// //       // setTimetables(data);
// //       const timetable  = await Timetable.list();
// //       setTimetables(timetable);

// //       // Derive departments and semesters from subjects (if they exist)
// //       // const allDepartments = new Set();
// //       // const allSemesters = new Set();

// //       // data.forEach((t) => {
// //       //   t.slots.forEach((s) => {
// //       //     if (s.subject?.department) allDepartments.add(s.subject.department);
// //       //     if (s.subject?.semester) allSemesters.add(s.subject.semester);
// //       //   });
// //       // });

// //       // setDepartments([...allDepartments]);
// //       // setSemesters([...allSemesters]);
// //     } catch (error) {
// //       console.error("Error fetching timetables:", error);
// //     }
// //     setIsLoading(false);
// //   };
// //   console.log(timetables);
// //   const handleSubmit = async (timetableData) => {
// //     try {
// //       if (editingTimetable) {
// //         alert("Editing functionality not implemented yet.");
// //       } else {
// //         // await axios.post("http://localhost:5001/admin/add/timetable", timetableData);
// //         await Timetable.create(timetableData);
// //         alert("Timetable created successfully!");
// //       }
// //       setShowForm(false);
// //       setEditingTimetable(null);
// //       fetchTimetables();
// //     } catch (error) {
// //       alert(error.response?.data?.message || "Error creating timetable");
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     if (!confirm("Are you sure you want to delete this timetable?")) return;
// //     try {
// //       await Timetable.delete(id);
// //       alert("Timetable deleted successfully");
// //       fetchTimetables();
// //     } catch (error) {
// //       alert(error.response?.data?.message || "Error deleting timetable");
// //     }
// //   };

// //   // Filtered timetables
// //   // const filteredTimetables = useMemo(() => {
// //   //   let data = [...timetables];
// //   //   if (selectedDepartment !== "all" || selectedSemester !== "all") {
// //   //     data = data.filter((t) =>
// //   //       t.slots.some((s) => {
// //   //         const matchDep =
// //   //           selectedDepartment === "all" ||
// //   //           s.subject?.department === selectedDepartment;
// //   //         const matchSem =
// //   //           selectedSemester === "all" ||
// //   //           s.subject?.semester === selectedSemester;
// //   //         return matchDep && matchSem;
// //   //       })
// //   //     );
// //   //   }
// //   //   return data;
// //   // }, [timetables, selectedDepartment, selectedSemester]);

// //   return (
// //     <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Header */}
// //         <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
// //           <div className="flex items-center gap-4">
// //             <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
// //               <Calendar className="w-7 h-7 text-white" />
// //             </div>
// //             <div>
// //               <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// //                 Timetable Management
// //               </h1>
// //               <p className="text-gray-600 text-lg">
// //                 View and manage class schedules across departments.
// //               </p>
// //             </div>
// //           </div>
// //           <Button
// //             onClick={() => {
// //               setEditingTimetable(null);
// //               setShowForm(true);
// //             }}
// //             className="bg-gradient-to-r from-blue-500 to-purple-600 text-white h-12 px-6 shadow-lg w-full md:w-auto"
// //           >
// //             <Plus className="w-5 h-5 mr-2" />
// //             Add Timetable
// //           </Button>
// //         </div>

// //         {/* Filters */}
// //         {/* <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-4 mb-8">
// //           <div className="flex flex-col md:flex-row gap-4 items-center">
// //             <div className="flex items-center gap-2 font-semibold text-gray-700">
// //               <Filter className="w-5 h-5" />
// //               <span>Filter by:</span>
// //             </div>
// //             <div className="w-full md:w-auto">
// //               <Select
// //                 value={selectedDepartment}
// //                 onValueChange={setSelectedDepartment}
// //               >
// //                 <SelectTrigger className="w-full md:w-56">
// //                   <SelectValue placeholder="Select Department" />
// //                 </SelectTrigger>
// //                 <SelectContent>
// //                   <SelectItem value="all">All Departments</SelectItem>
// //                   {departments.map((dep) => (
// //                     <SelectItem key={dep} value={dep}>
// //                       {dep}
// //                     </SelectItem>
// //                   ))}
// //                 </SelectContent>
// //               </Select>
// //             </div>
// //             <div className="w-full md:w-auto">
// //               <Select
// //                 value={selectedSemester}
// //                 onValueChange={setSelectedSemester}
// //               >
// //                 <SelectTrigger className="w-full md:w-56">
// //                   <SelectValue placeholder="Select Semester" />
// //                 </SelectTrigger>
// //                 <SelectContent>
// //                   <SelectItem value="all">All Semesters</SelectItem>
// //                   {semesters.map((sem) => (
// //                     <SelectItem key={sem} value={sem}>
// //                       {sem}
// //                     </SelectItem>
// //                   ))}
// //                 </SelectContent>
// //               </Select>
// //             </div>
// //           </div>
// //         </div> */}

// //         {/* Timetable Grid */}
// //         <TimetableGrid
// //           timetables={timetables}
// //           onDelete={handleDelete}
// //           onEdit={(t) => {
// //             setEditingTimetable(t);
// //             setShowForm(true);
// //           }}
// //           isLoading={isLoading}
// //         />

// //         {/* Timetable Form */}
// //         {showForm && (
// //           <ScheduleForm
// //             timetable={editingTimetable}
// //             allCourses={allCourses}
// //             allFaculties={allFaculties}
// //             onSubmit={handleSubmit}
// //             onCancel={() => {
// //               setShowForm(false);
// //               setEditingTimetable(null);
// //             }}
// //           />
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // import React, { useState, useEffect, useMemo } from "react";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { Plus, Calendar, Filter } from "lucide-react";
// // import TimetableGrid from "../components/timetable/TimetableGrid";
// // import ScheduleForm from "../components/timetable/ScheduleForm";
// // import axios from "axios";
// // import { getFaculty } from "../lib/getFacultyData";
// // import { getCourses } from "../lib/getCourses";
// // import Timetable from "../lib/Timetable";

// // export default function TimetablePage() {
// //   const [timetables, setTimetables] = useState([]);
// //   const [semesters, setSemesters] = useState([]);
// //   const [selectedSemester, setSelectedSemester] = useState("all");
// //   const [showForm, setShowForm] = useState(false);
// //   const [editingTimetable, setEditingTimetable] = useState(null);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [allFaculties, setAllFaculties] = useState([]);
// //   const [allCourses, setAllCourses] = useState([]);

// //   // Load faculties, courses, and timetable data
// //   useEffect(() => {
// //     const loadData = async () => {
// //       const fac = await getFaculty();
// //       const course = await getCourses();
// //       setAllFaculties(fac);
// //       setAllCourses(course);
// //       fetchTimetables();
// //     };
// //     loadData();
// //   }, []);

// //   const fetchTimetables = async () => {
// //     setIsLoading(true);
// //     try {
// //       const timetable = await Timetable.list();
// //       setTimetables(timetable);

// //       // Extract unique semesters from the timetable slots
// //       const allSemestersSet = new Set();
// //       timetable.forEach((t) =>
// //         t.slots.forEach((s) => {
// //           if (s.subject?.semester) allSemestersSet.add(s.subject.semester);
// //         })
// //       );
// //       setSemesters([...allSemestersSet]);
// //     } catch (error) {
// //       console.error("Error fetching timetables:", error);
// //     }
// //     setIsLoading(false);
// //   };

// //   const handleSubmit = async (timetableData) => {
// //     try {
// //       if (editingTimetable) {
// //         alert("Editing functionality not implemented yet.");
// //       } else {
// //         await Timetable.create(timetableData);
// //         alert("Timetable created successfully!");
// //       }
// //       setShowForm(false);
// //       setEditingTimetable(null);
// //       fetchTimetables();
// //     } catch (error) {
// //       alert(error.response?.data?.message || "Error creating timetable");
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     if (!confirm("Are you sure you want to delete this timetable?")) return;
// //     try {
// //       await Timetable.delete(id);
// //       alert("Timetable deleted successfully");
// //       fetchTimetables();
// //     } catch (error) {
// //       alert(error.response?.data?.message || "Error deleting timetable");
// //     }
// //   };

// //   // Filter timetables based on selected semester
// //   const filteredTimetables = useMemo(() => {
// //     if (selectedSemester === "all") return timetables;
// //     return timetables.filter((t) =>
// //       t.slots.some((s) => s.subject?.semester === selectedSemester)
// //     );
// //   }, [timetables, selectedSemester]);

// //   return (
// //     <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Header */}
// //         <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
// //           <div className="flex items-center gap-4">
// //             <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
// //               <Calendar className="w-7 h-7 text-white" />
// //             </div>
// //             <div>
// //               <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// //                 Timetable Management
// //               </h1>
// //               <p className="text-gray-600 text-lg">
// //                 View and manage class schedules across departments.
// //               </p>
// //             </div>
// //           </div>
// //           <Button
// //             onClick={() => {
// //               setEditingTimetable(null);
// //               setShowForm(true);
// //             }}
// //             className="bg-gradient-to-r from-blue-500 to-purple-600 text-white h-12 px-6 shadow-lg w-full md:w-auto"
// //           >
// //             <Plus className="w-5 h-5 mr-2" />
// //             Add Timetable
// //           </Button>
// //         </div>

// //         {/* Semester Filter */}
// //         <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-4 mb-8">
// //           <div className="flex flex-col md:flex-row gap-4 items-center">
// //             <div className="flex items-center gap-2 font-semibold text-gray-700">
// //               <Filter className="w-5 h-5" />
// //               <span>Filter by Semester:</span>
// //             </div>
// //             <div className="w-full md:w-56">
// //               <Select
// //                 value={selectedSemester}
// //                 onValueChange={setSelectedSemester}
// //               >
// //                 <SelectTrigger className="w-full">
// //                   <SelectValue placeholder="Select Semester" />
// //                 </SelectTrigger>
// //                 {/* <SelectContent>
// //                   <SelectItem value="all">All Semesters</SelectItem>
// //                   {semesters.map((sem) => (
// //                     <SelectItem key={sem} value={sem}>
// //                       {sem}
// //                     </SelectItem>
// //                   ))}
// //                 </SelectContent> */}
// //                 <SelectContent>
// //                   <SelectItem value="all">All Semesters</SelectItem>
// //                   {[1, 2, 3, 4, 5, 6].map((sem) => (
// //                     <SelectItem key={sem} value={sem}>
// //                       Semester {sem}
// //                     </SelectItem>
// //                   ))}
// //                 </SelectContent>
// //               </Select>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Timetable Grid */}
// //         <TimetableGrid
// //           timetables={filteredTimetables}
// //           onDelete={handleDelete}
// //           onEdit={(t) => {
// //             setEditingTimetable(t);
// //             setShowForm(true);
// //           }}
// //           isLoading={isLoading}
// //         />

// //         {/* Timetable Form */}
// //         {showForm && (
// //           <ScheduleForm
// //             timetable={editingTimetable}
// //             allCourses={allCourses}
// //             allFaculties={allFaculties}
// //             onSubmit={handleSubmit}
// //             onCancel={() => {
// //               setShowForm(false);
// //               setEditingTimetable(null);
// //             }}
// //           />
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useState, useEffect, useMemo } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Plus, Calendar, Filter } from "lucide-react";
// import TimetableGrid from "../components/timetable/TimetableGrid";
// import ScheduleForm from "../components/timetable/ScheduleForm";
// import { getFaculty } from "../lib/getFacultyData";
// import { getCourses } from "../lib/getCourses";
// import Timetable from "../lib/Timetable";

// export default function TimetablePage() {
//   const [timetables, setTimetables] = useState([]);
//   const [semesters, setSemesters] = useState([]);
//   const [selectedSemester, setSelectedSemester] = useState("all");
//   const [showForm, setShowForm] = useState(false);
//   const [editingTimetable, setEditingTimetable] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [allFaculties, setAllFaculties] = useState([]);
//   const [allCourses, setAllCourses] = useState([]);

//   // Load faculties, courses, and timetable data
//   useEffect(() => {
//     const loadData = async () => {
//       const fac = await getFaculty();
//       const course = await getCourses();
//       setAllFaculties(fac);
//       setAllCourses(course);
//       fetchTimetables();
//     };
//     loadData();
//   }, []);

//   const fetchTimetables = async () => {
//     setIsLoading(true);
//     try {
//       const timetable = await Timetable.list();
//       setTimetables(timetable);

//       // ✅ Extract unique semesters from timetables
//       const allSemestersSet = new Set();
//       timetable.forEach((t) => {
//         if (typeof t.semester === "number") {
//           allSemestersSet.add(t.semester);
//         } else if (t.semester && !isNaN(Number(t.semester))) {
//           allSemestersSet.add(Number(t.semester));
//         }
//       });
//       setSemesters([...allSemestersSet].sort((a, b) => a - b));
//     } catch (error) {
//       console.error("Error fetching timetables:", error);
//     }
//     setIsLoading(false);
//   };

//   const handleSubmit = async (timetableData) => {
//     try {
//       if (editingTimetable) {
//         alert("Editing functionality not implemented yet.");
//       } else {
//         await Timetable.create(timetableData);
//         alert("Timetable created successfully!");
//       }
//       setShowForm(false);
//       setEditingTimetable(null);
//       fetchTimetables();
//     } catch (error) {
//       alert(error.response?.data?.message || "Error creating timetable");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this timetable?")) return;
//     try {
//       await Timetable.delete(id);
//       alert("Timetable deleted successfully");
//       fetchTimetables();
//     } catch (error) {
//       alert(error.response?.data?.message || "Error deleting timetable");
//     }
//   };

//   // ✅ Filter timetables based on selected semester (convert string -> number)
//   const filteredTimetables = useMemo(() => {
//     if (selectedSemester === "all") return timetables;
//     const semNum = Number(selectedSemester);
//     return timetables.filter((t) => t.semester === semNum);
//   }, [timetables, selectedSemester]);

//   return (
//     <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
//           <div className="flex items-center gap-4">
//             <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
//               <Calendar className="w-7 h-7 text-white" />
//             </div>
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Timetable Management
//               </h1>
//               <p className="text-gray-600 text-lg">
//                 View and manage class schedules across departments.
//               </p>
//             </div>
//           </div>
//           <Button
//             onClick={() => {
//               setEditingTimetable(null);
//               setShowForm(true);
//             }}
//             className="bg-gradient-to-r from-blue-500 to-purple-600 text-white h-12 px-6 shadow-lg w-full md:w-auto"
//           >
//             <Plus className="w-5 h-5 mr-2" />
//             Add Timetable
//           </Button>
//         </div>

//         {/* Semester Filter */}
//         <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-4 mb-8">
//           <div className="flex flex-col md:flex-row gap-4 items-center">
//             <div className="flex items-center gap-2 font-semibold text-gray-700">
//               <Filter className="w-5 h-5" />
//               <span>Filter by Semester:</span>
//             </div>
//             <div className="w-full md:w-56">
//               <Select
//                 value={selectedSemester}
//                 onValueChange={(value) => setSelectedSemester(value)}
//               >
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Select Semester" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Semesters</SelectItem>
//                   {semesters.map((sem) => (
//                     <SelectItem key={sem} value={String(sem)}>
//                       Semester {sem}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </div>

//         {/* Timetable Grid */}
//         <TimetableGrid
//           timetables={filteredTimetables}
//           onDelete={handleDelete}
//           onEdit={(t) => {
//             setEditingTimetable(t);
//             setShowForm(true);
//           }}
//           isLoading={isLoading}
//         />

//         {/* Timetable Form */}
//         {showForm && (
//           <ScheduleForm
//             timetable={editingTimetable}
//             allCourses={allCourses}
//             allFaculties={allFaculties}
//             onSubmit={handleSubmit}
//             onCancel={() => {
//               setShowForm(false);
//               setEditingTimetable(null);
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// }
// import React, { useState, useEffect, useMemo } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Plus, Calendar, Filter } from "lucide-react";
// import TimetableGrid from "../components/timetable/TimetableGrid";
// import ScheduleForm from "../components/timetable/ScheduleForm";
// import { getFaculty } from "../lib/getFacultyData";
// import { getCourses } from "../lib/getCourses";
// import Timetable from "../lib/Timetable";
// import Faculty from "../lib/Faculty";
// import Course from "../lib/Course";

// export default function TimetablePage() {
//   const [timetables, setTimetables] = useState([]);
//   const [semesters, setSemesters] = useState([]);
//   const [selectedSemester, setSelectedSemester] = useState("5"); // ✅ Default to Semester 5
//   const [showForm, setShowForm] = useState(false);
//   const [editingTimetable, setEditingTimetable] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [allFaculties, setAllFaculties] = useState([]);
//   const [allCourses, setAllCourses] = useState([]);
//   const role = localStorage.getItem("role");

//   // Load faculties, courses, and timetable data
//   useEffect(() => {
//     const loadData = async () => {
//       const fac = await Faculty.list();
//       const course = await Course.list();
//       setAllFaculties(fac);
//       setAllCourses(course);
//       fetchTimetables();
//     };
//     loadData();
//   }, []);

//   const fetchTimetables = async () => {
//     setIsLoading(true);
//     try {
//       const timetable = await Timetable.list();
//       setTimetables(timetable);

//       // ✅ Extract unique semesters from timetables
//       const allSemestersSet = new Set();
//       timetable.forEach((t) => {
//         if (typeof t.semester === "number") {
//           allSemestersSet.add(t.semester);
//         } else if (t.semester && !isNaN(Number(t.semester))) {
//           allSemestersSet.add(Number(t.semester));
//         }
//       });

//       const sortedSemesters = [...allSemestersSet].sort((a, b) => a - b);
//       setSemesters(sortedSemesters);

//       // ✅ If semester 5 not present, default to first available one
//       if (!sortedSemesters.includes(5) && sortedSemesters.length > 0) {
//         setSelectedSemester(String(sortedSemesters[0]));
//       }
//     } catch (error) {
//       console.error("Error fetching timetables:", error);
//     }
//     setIsLoading(false);
//   };

//   const handleSubmit = async (timetableData) => {
//     try {
//       if (editingTimetable) {
//         alert("Editing functionality not implemented yet.");
//       } else {
//         await Timetable.create(timetableData);
//         alert("Timetable created successfully!");
//       }
//       setShowForm(false);
//       setEditingTimetable(null);
//       fetchTimetables();
//     } catch (error) {
//       alert(error.response?.data?.message || "Error creating timetable");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this timetable?")) return;
//     try {
//       await Timetable.delete(id);
//       alert("Timetable deleted successfully");
//       fetchTimetables();
//     } catch (error) {
//       alert(error.response?.data?.message || "Error deleting timetable");
//     }
//   };

//   // ✅ Filter timetables based on selected semester
//   const filteredTimetables = useMemo(() => {
//     const semNum = Number(selectedSemester);
//     return timetables.filter((t) => t.semester === semNum);
//   }, [timetables, selectedSemester]);

//   return (
//     <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
//           <div className="flex items-center gap-4">
//             <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
//               <Calendar className="w-7 h-7 text-white" />
//             </div>
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Timetable Management
//               </h1>
//               <p className="text-gray-600 text-lg">
//                 View and manage class schedules across departments.
//               </p>
//             </div>
//           </div>
//           {role === "admin" && <Button
//             onClick={() => {
//               setEditingTimetable(null);
//               setShowForm(true);
//             }}
//             className="bg-gradient-to-r from-blue-500 to-purple-600 text-white h-12 px-6 shadow-lg w-full md:w-auto"
//           >
//             <Plus className="w-5 h-5 mr-2" />
//             Add Timetable
//           </Button> }
//         </div>

//         {/* Semester Filter */}
//         <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-4 mb-8">
//           <div className="flex flex-col md:flex-row gap-4 items-center">
//             <div className="flex items-center gap-2 font-semibold text-gray-700">
//               <Filter className="w-5 h-5" />
//               <span>Select Semester:</span>
//             </div>
//             <div className="w-full md:w-56">
//               <Select
//                 value={selectedSemester}
//                 onValueChange={(value) => setSelectedSemester(value)}
//               >
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Select Semester" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {semesters.map((sem) => (
//                     <SelectItem key={sem} value={String(sem)}>
//                       Semester {sem}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </div>

//         {/* Timetable Grid */}
//         <TimetableGrid
//           timetables={filteredTimetables}
//           onDelete={handleDelete}
//           onEdit={(t) => {
//             setEditingTimetable(t);
//             setShowForm(true);
//           }}
//           isLoading={isLoading}
//         />

//         {/* Timetable Form */}
//         {showForm && (
//           <ScheduleForm
//             timetable={editingTimetable}
//             allCourses={allCourses}
//             allFaculties={allFaculties}
//             onSubmit={handleSubmit}
//             onCancel={() => {
//               setShowForm(false);
//               setEditingTimetable(null);
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Calendar, Filter } from "lucide-react";
import TimetableGrid from "../components/timetable/TimetableGrid";
import ScheduleForm from "../components/timetable/ScheduleForm";
import Timetable from "../lib/Timetable";
import Faculty from "../lib/Faculty";
import Course from "../lib/Course";

export default function TimetablePage() {
  const [timetables, setTimetables] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("5");
  const [showForm, setShowForm] = useState(false);
  const [editingTimetable, setEditingTimetable] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allFaculties, setAllFaculties] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const role = localStorage.getItem("role");

  // ✅ Fetch timetable data based on role
  useEffect(() => {
    const loadData = async () => {
      try {
        const fac = await Faculty.list();
        const course = await Course.list();
        setAllFaculties(fac);
        setAllCourses(course);
        await fetchTimetables();
      } catch (error) {
        console.error("Error loading initial data:", error);
      }
    };
    loadData();
  }, []);

  const fetchTimetables = async () => {
    setIsLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const email = user?.email;
      let timetableData = [];

      if (role === "faculty") {
        // ✅ Faculty: Fetch only their assigned timetable
        timetableData = await Timetable.listByFaculty(email);
      } else if (role === "admin") {
        // ✅ Admin: Fetch all
        timetableData = await Timetable.list();
      } else {
        // ✅ Optional: for students or other roles
        timetableData = await Timetable.list();
      }

      setTimetables(timetableData);

      // ✅ Extract unique semesters
      const allSemestersSet = new Set();
      timetableData.forEach((t) => {
        if (typeof t.semester === "number") {
          allSemestersSet.add(t.semester);
        } else if (t.semester && !isNaN(Number(t.semester))) {
          allSemestersSet.add(Number(t.semester));
        }
      });

      const sortedSemesters = [...allSemestersSet].sort((a, b) => a - b);
      setSemesters(sortedSemesters);

      if (!sortedSemesters.includes(5) && sortedSemesters.length > 0) {
        setSelectedSemester(String(sortedSemesters[0]));
      }
    } catch (error) {
      console.error("Error fetching timetables:", error);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (timetableData) => {
    try {
      if (editingTimetable) {
        alert("Editing functionality not implemented yet.");
      } else {
        await Timetable.create(timetableData);
        alert("Timetable created successfully!");
      }
      setShowForm(false);
      setEditingTimetable(null);
      fetchTimetables();
    } catch (error) {
      alert(error.response?.data?.message || "Error creating timetable");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this timetable?")) return;
    try {
      await Timetable.delete(id);
      alert("Timetable deleted successfully");
      fetchTimetables();
    } catch (error) {
      alert(error.response?.data?.message || "Error deleting timetable");
    }
  };

  // ✅ Filter timetables by semester
  const filteredTimetables = useMemo(() => {
    const semNum = Number(selectedSemester);
    return timetables.filter((t) => t.semester === semNum);
  }, [timetables, selectedSemester]);

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Timetable Management
              </h1>
              <p className="text-gray-600 text-lg">
                {role === "faculty"
                  ? "View your assigned classes and schedules."
                  : "View and manage class schedules across departments."}
              </p>
            </div>
          </div>

          {/* Only Admin can add timetable */}
          {role === "admin" && (
            <Button
              onClick={() => {
                setEditingTimetable(null);
                setShowForm(true);
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white h-12 px-6 shadow-lg w-full md:w-auto"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Timetable
            </Button>
          )}
        </div>

        {/* Semester Filter */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center gap-2 font-semibold text-gray-700">
              <Filter className="w-5 h-5" />
              <span>Select Semester:</span>
            </div>
            <div className="w-full md:w-56">
              <Select
                value={selectedSemester}
                onValueChange={(value) => setSelectedSemester(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map((sem) => (
                    <SelectItem key={sem} value={String(sem)}>
                      Semester {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Timetable Grid */}
        <TimetableGrid
          timetables={filteredTimetables}
          onDelete={handleDelete}
          onEdit={(t) => {
            setEditingTimetable(t);
            setShowForm(true);
          }}
          isLoading={isLoading}
          role={role}
        />

        {/* Timetable Form */}
        {showForm && role === "admin" && (
          <ScheduleForm
            timetable={editingTimetable}
            allCourses={allCourses}
            allFaculties={allFaculties}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingTimetable(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
