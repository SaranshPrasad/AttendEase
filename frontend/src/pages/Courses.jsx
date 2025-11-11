import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, BookOpen } from "lucide-react";

import CourseCard from "../components/Courses/CourseCard";
import CourseForm from "../components/Courses/CourseForm";
import CoursesHeader from "../Components/Courses/CoursesHeader";
import CoursesFilters from "../components/Courses/CoursesFilters";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    department: "all",
    semester: "all",
  });
  const role = localStorage.getItem("role");
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
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
  const loadFacultyAndCourses = async (email) => {
    setIsLoading(true);
    try {
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
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/faculty/view/${email}`
      );
      if (res) {
        return res.data;
      } else {
        throw "Something went wrong or data not fetched !";
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <CoursesHeader
          totalCourses={courses.length}
          onAddCourse={() => role === "admin" && setShowForm(true)}
        />
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
                faculty={fac}
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
