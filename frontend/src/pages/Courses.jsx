// // import React, { useState, useEffect, useCallback } from "react";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Plus, Search, BookOpen, Users, CornerDownLeft } from "lucide-react";

// // import CourseCard from "../components/courses/CourseCard";
// // import CourseForm from "../components/courses/CourseForm";
// // import CoursesHeader from "../Components/Courses/CoursesHeader"
// // import CoursesFilters from "../components/courses/CoursesFilters";
// // import Course from "../lib/Course";
// // import { getFaculty } from "../lib/getFacultyData";

// // export default function CoursesPage() {
// //   const [courses, setCourses] = useState([]);
// //   const [filteredCourses, setFilteredCourses] = useState([]);
// //   const [faculty, setFaculty] = useState([]);
// //   const [showForm, setShowForm] = useState(false);
// //   const [editingCourse, setEditingCourse] = useState(null);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [filters, setFilters] = useState({
// //     department: "all",
// //     semester: "all",
// //     status: "active",
// //   });

// //   useEffect(() => {
// //     const loadFaculty = async () => {
// //       const fac =  await getFaculty();
// //       setFaculty(fac);
// //     };
// //     loadFaculty();
// //     loadData();
// //   }, []);
// //  console.log(courses);
// //   const filterCourses = useCallback(() => {
// //     let filtered = courses;

// //     // Filter by search term
// //     if (searchTerm) {
// //       filtered = filtered.filter(
// //         (course) =>
// //           course.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //           course.course_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //           course.department.toLowerCase().includes(searchTerm.toLowerCase())
// //       );
// //     }

// //     // Filter by department
// //     if (filters.department !== "all") {
// //       filtered = filtered.filter(
// //         (course) => course.department === filters.department
// //       );
// //     }

// //     // Filter by semester
// //     if (filters.semester !== "all") {
// //       filtered = filtered.filter(
// //         (course) => course.semester === filters.semester
// //       );
// //     }

// //     // Filter by status
// //     if (filters.status !== "all") {
// //       const isActive = filters.status === "active";
// //       filtered = filtered.filter((course) => course.is_active === isActive);
// //     }

// //     setFilteredCourses(filtered);
// //   }, [courses, searchTerm, filters]); // Dependencies for useCallback

// //   useEffect(() => {
// //     filterCourses();
// //   }, [filterCourses]); // Dependency on the memoized filterCourses

// //   const loadData = async () => {
// //     setIsLoading(true);
// //     try {
// //       const [coursesData] = await Promise.all([
// //         Course.list("-created_date")
// //       ]);
// //       setCourses(coursesData);
// //       // setFaculty(
// //       //   courses.filter(
// //       //     (course) => course.role === "user" || user.role === "admin"
// //       //   )
// //       // );
// //     } catch (error) {
// //       console.error("Error loading data:", error);
// //     }
// //     setIsLoading(false);
// //   };

// //   const handleSubmit = async (courseData) => {
// //     if (editingCourse) {
// //       await Course.update(editingCourse.id, courseData);
// //     } else {
// //       await Course.create(courseData);
// //     }
// //     setShowForm(false);
// //     setEditingCourse(null);
// //     loadData();
// //   };

// //   const handleEdit = (course) => {
// //     setEditingCourse(course);
// //     setShowForm(true);
// //   };

// //   const handleDelete = async (courseId) => {
// //     if (confirm("Are you sure you want to delete this course?")) {
// //       await Course.delete(courseId);
// //       loadData();
// //     }
// //   };

// //   const handleToggleStatus = async (courseId, currentStatus) => {
// //     await Course.update(courseId, { is_active: !currentStatus });
// //     loadData();
// //   };

// //   const getDepartments = () => {
// //     const departments = [...new Set(courses.map((c) => c.department))];
// //     return departments.filter(Boolean);
// //   };

// //   const getSemesters = () => {
// //     const semesters = [...new Set(courses.map((c) => c.semester))];
// //     return semesters.filter(Boolean);
// //   };

// //   return (
// //     <div className="p-4 md:p-8 min-h-screen bg-gray-50">
// //       <div className="max-w-7xl mx-auto">
// //         <CoursesHeader
// //           totalCourses={courses.length}
// //           onAddCourse={() => setShowForm(true)}
// //         />

// //         {/* Search and Filters */}
// //         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
// //           <div className="flex flex-col md:flex-row gap-4">
// //             <div className="flex-1">
// //               <div className="relative">
// //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //                 <Input
// //                   placeholder="Search courses by name, code, or department..."
// //                   value={searchTerm}
// //                   onChange={(e) => setSearchTerm(e.target.value)}
// //                   className="pl-10 h-12 text-lg"
// //                 />
// //               </div>
// //             </div>
// //             <CoursesFilters
// //               filters={filters}
// //               setFilters={setFilters}
// //               departments={getDepartments()}
// //               semesters={getSemesters()}
// //             />
// //           </div>
// //         </div>

// //         {/* Courses Grid */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {isLoading ? (
// //             Array(6)
// //               .fill(0)
// //               .map((_, i) => (
// //                 <div
// //                   key={i}
// //                   className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse"
// //                 >
// //                   <div className="space-y-4">
// //                     <div className="h-6 bg-gray-200 rounded w-3/4" />
// //                     <div className="h-4 bg-gray-200 rounded w-1/2" />
// //                     <div className="h-4 bg-gray-200 rounded w-full" />
// //                     <div className="flex gap-2">
// //                       <div className="h-6 bg-gray-200 rounded w-20" />
// //                       <div className="h-6 bg-gray-200 rounded w-16" />
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))
// //           ) : filteredCourses.length > 0 ? (
// //             filteredCourses.map((course) => (
// //               <CourseCard
// //                 key={course.id}
// //                 course={course}
// //                 faculty={faculty}
// //                 onEdit={() => handleEdit(course)}
// //                 onDelete={() => handleDelete(course.id)}
// //                 onToggleStatus={() =>
// //                   handleToggleStatus(course.id, course.is_active)
// //                 }
// //               />
// //             ))
// //           ) : (
// //             <div className="col-span-full text-center py-12">
// //               <BookOpen className="w-20 h-20 mx-auto text-gray-300 mb-4" />
// //               <h3 className="text-xl font-semibold text-gray-900 mb-2">
// //                 {courses.length === 0 ? "No courses yet" : "No courses found"}
// //               </h3>
// //               <p className="text-gray-500 mb-6">
// //                 {courses.length === 0
// //                   ? "Create your first course to get started"
// //                   : "Try adjusting your search or filters"}
// //               </p>
// //               {courses.length === 0 && (
// //                 <Button
// //                   onClick={() => setShowForm(true)}
// //                   className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
// //                 >
// //                   <Plus className="w-5 h-5 mr-2" />
// //                   Create First Course
// //                 </Button>
// //               )}
// //             </div>
// //           )}
// //         </div>

// //         {/* Course Form Modal */}
// //         {showForm && (
// //           <CourseForm
// //             course={editingCourse}
// //             faculty={faculty}
// //             onSubmit={handleSubmit}
// //             onCancel={() => {
// //               setShowForm(false);
// //               setEditingCourse(null);
// //             }}
// //           />
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useState, useEffect, useCallback } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Plus, Search, BookOpen } from "lucide-react";

// import CourseCard from "../components/courses/CourseCard";
// import CourseForm from "../components/courses/CourseForm";
// import CoursesHeader from "../Components/Courses/CoursesHeader";
// import CoursesFilters from "../components/courses/CoursesFilters";
// import Course from "../lib/Course";
// import Faculty from "../lib/Faculty";

// export default function CoursesPage() {
//   const [courses, setCourses] = useState([]);
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const [faculty, setFaculty] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingCourse, setEditingCourse] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState({
//     department: "all",
//     semester: "all",
//   }); // removed status
//   const [currentUser, setCurrentUser] = useState([]);

//   useEffect(() => {
//     const loadFaculty = async () => {
//       const fac = await Faculty.list();
//       setFaculty(fac);
//     };
//     const loadUser = async () => {
//       const user = await localStorage.getItem("User");
//       setCurrentUser(user);
//     }
//     loadUser();
//     loadFaculty();
//     loadData();
//   }, []);
//  console.log("Current User : - "+currentUser);
//   const filterCourses = useCallback(() => {
//     let filtered = courses;

//     // Filter by search term
//     if (searchTerm) {
//       filtered = filtered.filter(
//         (course) =>
//           course.name.toLowerCase().includes(searchTerm.toLowerCase())
//           // course.course_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           // course.semester.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Filter by department
//     if (filters.department !== "all") {
//       filtered = filtered.filter(
//         (course) => course.department === filters.department
//       );
//     }

//     // Filter by semester
//     if (filters.semester !== "all") {
//       filtered = filtered.filter(
//         (course) => course.semester === filters.semester
//       );
//     }

//     setFilteredCourses(filtered);
//   }, [courses, searchTerm, filters]);

//   useEffect(() => {
//     filterCourses();
//   }, [filterCourses]);

//   const loadData = async () => {
//     setIsLoading(true);
//     try {
//       const coursesData = await Course.list("-created_date");
//       setCourses(coursesData);
//     } catch (error) {
//       console.error("Error loading data:", error);
//     }
//     setIsLoading(false);
//   };

//   const handleSubmit = async (courseData) => {
//     if (editingCourse) {
//       await Course.update(editingCourse.id, courseData);
//     } else {
//       await Course.create(courseData);
//     }
//     setShowForm(false);
//     setEditingCourse(null);
//     loadData();
//   };

//   const handleEdit = (course) => {
//     setEditingCourse(course);
//     setShowForm(true);
//   };

//   const handleDelete = async (courseId) => {
//     if (confirm("Are you sure you want to delete this course?")) {
//       await Course.delete(courseId);
//       loadData();
//     }
//   };

//   const handleToggleStatus = async (courseId, currentStatus) => {
//     await Course.update(courseId, { is_active: !currentStatus });
//     loadData();
//   };

//   const getDepartments = () => {
//     const departments = [...new Set(courses.map((c) => c.department))];
//     return departments.filter(Boolean);
//   };

//   const getSemesters = () => {
//     const semesters = [...new Set(courses.map((c) => c.semester))];
//     return semesters.filter(Boolean);
//   };

//   return (
//     <div className="p-4 md:p-8 min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         <CoursesHeader
//           totalCourses={courses.length}
//           onAddCourse={() => setShowForm(true)}
//         />

//         {/* Search and Filters */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <Input
//                   placeholder="Search courses by name, code, or department..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 h-12 text-lg"
//                 />
//               </div>
//             </div>
//             <CoursesFilters
//               filters={filters}
//               setFilters={setFilters}
//               departments={getDepartments()}
//               semesters={getSemesters()}
//             />
//           </div>
//         </div>

//         {/* Courses Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {isLoading ? (
//             Array(6)
//               .fill(0)
//               .map((_, i) => (
//                 <div
//                   key={i}
//                   className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse"
//                 >
//                   <div className="space-y-4">
//                     <div className="h-6 bg-gray-200 rounded w-3/4" />
//                     <div className="h-4 bg-gray-200 rounded w-1/2" />
//                     <div className="h-4 bg-gray-200 rounded w-full" />
//                     <div className="flex gap-2">
//                       <div className="h-6 bg-gray-200 rounded w-20" />
//                       <div className="h-6 bg-gray-200 rounded w-16" />
//                     </div>
//                   </div>
//                 </div>
//               ))
//           ) : filteredCourses.length > 0 ? (
//             filteredCourses.map((course) => (
//               <CourseCard
//                 key={course.id}
//                 course={course}
//                 faculty={faculty}
//                 onEdit={() => handleEdit(course)}
//                 onDelete={() => handleDelete(course._id)}
//                 onToggleStatus={() =>
//                   handleToggleStatus(course._id, course.is_active)
//                 }
//               />
//             ))
//           ) : (
//             <div className="col-span-full text-center py-12">
//               <BookOpen className="w-20 h-20 mx-auto text-gray-300 mb-4" />
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 {courses.length === 0 ? "No courses yet" : "No courses found"}
//               </h3>
//               <p className="text-gray-500 mb-6">
//                 {courses.length === 0
//                   ? "Create your first course to get started"
//                   : "Try adjusting your search or filters"}
//               </p>
//               {courses.length === 0 && (
//                 <Button
//                   onClick={() => setShowForm(true)}
//                   className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
//                 >
//                   <Plus className="w-5 h-5 mr-2" />
//                   Create First Course
//                 </Button>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Course Form Modal */}
//         {showForm && (
//           <CourseForm
//             course={editingCourse}
//             faculty={faculty}
//             onSubmit={handleSubmit}
//             onCancel={() => {
//               setShowForm(false);
//               setEditingCourse(null);
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect, useCallback } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Plus, Search, BookOpen } from "lucide-react";

// import CourseCard from "../components/courses/CourseCard";
// import CourseForm from "../components/courses/CourseForm";
// import CoursesHeader from "../Components/Courses/CoursesHeader";
// import CoursesFilters from "../components/courses/CoursesFilters";

// import Course from "../lib/Course";
// import Faculty from "../lib/Faculty";

// export default function CoursesPage() {
//   const [courses, setCourses] = useState([]);
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const [facultyData, setFacultyData] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingCourse, setEditingCourse] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [fac, setFac] = useState([]);
//   const [cor, setCor] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState({
//     department: "all",
//     semester: "all",
//   });
//   const role = localStorage.getItem("role");

//   // ✅ Get current logged-in user from localStorage
//   useEffect(() => {
//     if (role === "admin") {
//       loadFacAndCourses();
//     } else if (role === "faculty") {
//       const storedUser = localStorage.getItem("user");
//       if (storedUser) {
//         const parsedUser = JSON.parse(storedUser);
//         loadFacultyAndCourses(parsedUser.email);
//       } else {
//         console.warn("No user found in localStorage.");
//         setIsLoading(false);
//       }
//     }
//   }, []);

//   // useEffect(() => {
//   //   const loadFac = async () => {
//   //     const f = await Faculty.list();
//   //     setFac(f);
//   //   };
//   //   loadFac();
//   // }, []);

//   const loadFacAndCourses = async () => {
//     const f = await Faculty.list();
//     setFac(f);
//     const c = await Course.list();
//     setCor(c);
//   };

//   // ✅ Fetch faculty by email and then fetch their courses
//   const loadFacultyAndCourses = async (email) => {
//     setIsLoading(true);
//     try {
//       const allFaculty = await Faculty.list();
//       console.log("FAc : " + allFaculty);
//       const faculty = allFaculty.find((f) => f.email === email);

//       if (!faculty) {
//         console.warn("Faculty not found for email:", email);
//         setIsLoading(false);
//         return;
//       }

//       setFacultyData(faculty);

//       // ✅ Assuming faculty object contains an array `courses` (IDs or objects)
//       const allCourses = await Course.list("-created_date");

//       // If faculty has a `courses` array with IDs
//       const assignedCourses = allCourses.filter((course) =>
//         faculty.courses?.includes(course._id)
//       );

//       setCourses(assignedCourses);
//       setFilteredCourses(assignedCourses);
//     } catch (err) {
//       console.error("Error loading data:", err);
//     }
//     setIsLoading(false);
//   };

//   console.log(facultyData, filteredCourses);

//   // ✅ Search & filter logic
//   const filterCourses = useCallback(() => {
//     let filtered = courses;

//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         (course) =>
//           course.name?.toLowerCase().includes(term) ||
//           course.department?.toLowerCase().includes(term)
//       );
//     }

//     if (filters.department !== "all") {
//       filtered = filtered.filter(
//         (course) => course.department === filters.department
//       );
//     }

//     if (filters.semester !== "all") {
//       filtered = filtered.filter(
//         (course) => course.semester === filters.semester
//       );
//     }

//     setFilteredCourses(filtered);
//   }, [courses, searchTerm, filters]);

//   useEffect(() => {
//     filterCourses();
//   }, [filterCourses]);

//   // ✅ CRUD operations
//   const handleSubmit = async (courseData) => {
//     if (editingCourse) {
//       await Course.update(editingCourse._id, courseData);
//     } else {
//       await Course.create(courseData);
//     }
//     setShowForm(false);
//     setEditingCourse(null);
//     loadFacultyAndCourses(facultyData.email);
//   };

//   const handleEdit = (course) => {
//     setEditingCourse(course);
//     setShowForm(true);
//   };

//   const handleDelete = async (courseId) => {
//     if (confirm("Are you sure you want to delete this course?")) {
//       await Course.delete(courseId);
//       loadFacultyAndCourses(facultyData.email);
//     }
//   };

//   const getDepartments = () => {
//     const departments = [...new Set(courses.map((c) => c.department))];
//     return departments.filter(Boolean);
//   };

//   const getSemesters = () => {
//     const semesters = [...new Set(courses.map((c) => c.semester))];
//     return semesters.filter(Boolean);
//   };

//   // ✅ UI Rendering
//   return (
//     <div className="p-4 md:p-8 min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         <CoursesHeader
//           totalCourses={courses.length}
//           onAddCourse={() => setShowForm(true)}
//         />

//         {/* Search and Filters */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <Input
//                   placeholder="Search courses by name, code, or department..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 h-12 text-lg"
//                 />
//               </div>
//             </div>
//             <CoursesFilters
//               filters={filters}
//               setFilters={setFilters}
//               departments={getDepartments()}
//               semesters={getSemesters()}
//             />
//           </div>
//         </div>

//         {/* Courses Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {isLoading ? (
//             Array(6)
//               .fill(0)
//               .map((_, i) => (
//                 <div
//                   key={i}
//                   className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse"
//                 >
//                   <div className="space-y-4">
//                     <div className="h-6 bg-gray-200 rounded w-3/4" />
//                     <div className="h-4 bg-gray-200 rounded w-1/2" />
//                     <div className="h-4 bg-gray-200 rounded w-full" />
//                     <div className="flex gap-2">
//                       <div className="h-6 bg-gray-200 rounded w-20" />
//                       <div className="h-6 bg-gray-200 rounded w-16" />
//                     </div>
//                   </div>
//                 </div>
//               ))
//           ) : filteredCourses.length > 0 ? (
//             filteredCourses.map((course) => (
//               <CourseCard
//                 key={course._id}
//                 course={course}
//                 faculty={facultyData}
//                 onEdit={() => handleEdit(course)}
//                 onDelete={() => handleDelete(course._id)}
//               />
//             ))
//           ) : (
//             <div className="col-span-full text-center py-12">
//               <BookOpen className="w-20 h-20 mx-auto text-gray-300 mb-4" />
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 {courses.length === 0 ? "No courses yet" : "No courses found"}
//               </h3>
//               <p className="text-gray-500 mb-6">
//                 {courses.length === 0
//                   ? "No courses assigned to you yet."
//                   : "Try adjusting your search or filters"}
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Course Form Modal */}
//         {showForm && (
//           <CourseForm
//             course={editingCourse}
//             faculty={fac}
//             onSubmit={handleSubmit}
//             onCancel={() => {
//               setShowForm(false);
//               setEditingCourse(null);
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, BookOpen } from "lucide-react";

import CourseCard from "../components/courses/CourseCard";
import CourseForm from "../components/courses/CourseForm";
import CoursesHeader from "../Components/Courses/CoursesHeader";
import CoursesFilters from "../components/courses/CoursesFilters";

import Course from "../lib/Course";
import Faculty from "../lib/Faculty";
import axios from "axios";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [facultyData, setFacultyData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fac, setFac] = useState([]);
  const [cor, setCor] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    department: "all",
    semester: "all",
  });

  const role = localStorage.getItem("role");
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  // ✅ Load based on role
  useEffect(() => {
    if (role === "admin") {
      loadFacAndCourses();
    } else if (role === "faculty" && storedUser.email) {
      loadFacultyAndCourses(storedUser.email);
    } else {
      console.warn("No user or role found in localStorage.");
      setIsLoading(false);
    }
  }, []);

  // ✅ Load for admin
  const loadFacAndCourses = async () => {
    setIsLoading(true);
    try {
      const f = await Faculty.list();
      setFac(f);
      const c = await Course.list();
      setCourses(c);
      setFilteredCourses(c);
    } catch (err) {
      console.error("Error loading admin data:", err);
    }
    setIsLoading(false);
  };

  // ✅ Load for faculty
  const loadFacultyAndCourses = async (email) => {
    setIsLoading(true);
    try {
      // fetch specific faculty by email using your backend route `/view/:email`
      const res = await getCoursesFromEmail(email);
      const faculty = res.faculty;
      const courses = res.courses || [];

      setFacultyData(faculty);
      setCourses(courses);
      setFilteredCourses(courses);
    } catch (err) {
      console.error("Error loading faculty data:", err);
    }
    setIsLoading(false);
  };

  // ✅ Filter logic
  const filterCourses = useCallback(() => {
    let filtered = courses;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.name?.toLowerCase().includes(term) ||
          course.department?.toLowerCase().includes(term)
      );
    }

    if (filters.department !== "all") {
      filtered = filtered.filter(
        (course) => course.department === filters.department
      );
    }

    if (filters.semester !== "all") {
      filtered = filtered.filter(
        (course) => course.semester === filters.semester
      );
    }

    setFilteredCourses(filtered);
  }, [courses, searchTerm, filters]);

  useEffect(() => {
    filterCourses();
  }, [filterCourses]);

  // ✅ CRUD (only admin)
  const handleSubmit = async (courseData) => {
    if (editingCourse) {
      await Course.update(editingCourse._id, courseData);
    } else {
      await Course.create(courseData);
    }
    setShowForm(false);
    setEditingCourse(null);

    if (role === "admin") loadFacAndCourses();
    else loadFacultyAndCourses(facultyData.email);
  };

  const handleEdit = (course) => {
    if (role === "admin") {
      setEditingCourse(course);
      setShowForm(true);
    }
  };

  const handleDelete = async (courseId) => {
    if (role !== "admin") return;
    if (confirm("Are you sure you want to delete this course?")) {
      await Course.delete(courseId);
      if (role === "admin") loadFacAndCourses();
      else loadFacultyAndCourses(facultyData.email);
    }
  };

  const getDepartments = () => {
    const departments = [...new Set(courses.map((c) => c.department))];
    return departments.filter(Boolean);
  };

  const getSemesters = () => {
    const semesters = [...new Set(courses.map((c) => c.semester))];
    return semesters.filter(Boolean);
  };

  const getCoursesFromEmail = async (email) => {
    try {
      const res =  await axios.get(`http://localhost:5001/faculty/view/${email}`);
      if(res){
        return res.data;
      }else{
        throw("Something went wrong or data not fetched !");
      }
    } catch (error) {
      alert(error.message);
    }
  }

  // ✅ UI Rendering
  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header — hide Add button for faculty */}
        <CoursesHeader
          totalCourses={courses.length}
          onAddCourse={() => role === "admin" && setShowForm(true)}
        />

        {/* Search + Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search courses by name, code, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
            </div>
            <CoursesFilters
              filters={filters}
              setFilters={setFilters}
              departments={getDepartments()}
              semesters={getSemesters()}
            />
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse"
                >
                  <div className="space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="flex gap-2">
                      <div className="h-6 bg-gray-200 rounded w-20" />
                      <div className="h-6 bg-gray-200 rounded w-16" />
                    </div>
                  </div>
                </div>
              ))
          ) : filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                faculty={facultyData}
                onEdit={() => handleEdit(course)}
                onDelete={() => handleDelete(course._id)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <BookOpen className="w-20 h-20 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {courses.length === 0 ? "No courses yet" : "No courses found"}
              </h3>
              <p className="text-gray-500 mb-6">
                {courses.length === 0
                  ? "No courses assigned to you yet."
                  : "Try adjusting your search or filters"}
              </p>
            </div>
          )}
        </div>

        {/* ✅ Only Admin can see form */}
        {showForm && role === "admin" && (
          <CourseForm
            course={editingCourse}
            faculty={fac}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingCourse(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
