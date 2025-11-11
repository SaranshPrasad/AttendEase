import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Student from "../lib/Student";
import StudentCard from "../components/Students/StudentCard";
import StudentForm from "../components/Students/StudentForm";
import StudentsHeader from "../components/Students/StudentsHeader";
import { getStudents } from "../lib/getStudentData";
import UploadCSVButton from "../components/ui/csvuploadbutton";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSemester, setSelectedSemester] = useState(""); // ✅ new filter state

  // ✅ Fetch students
  const loadStudents = async () => {
    setIsLoading(true);
    try {
      const stu = await getStudents();
      if (stu) {
        setStudents(stu);
        setFilteredStudents(stu);
      }
    } catch (err) {
      console.error("Error fetching students:", err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // ✅ Search & filter logic (combined)
  useEffect(() => {
    let filtered = students;

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(term) ||
          s.email.toLowerCase().includes(term)
      );
    }

    // Semester filter
    if (selectedSemester) {
      filtered = filtered.filter(
        (s) => s.semester?.toString() === selectedSemester
      );
    }

    setFilteredStudents(filtered);
  }, [searchTerm, selectedSemester, students]);

  const handleSubmit = async (studentData) => {
    if (editingStudent) {
      await Student.update(editingStudent._id, studentData);
    } else {
      await Student.create(studentData);
    }
    setShowForm(false);
    setEditingStudent(null);
    loadStudents();
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleDelete = async (studentId) => {
    if (confirm("Are you sure you want to delete this student?")) {
      await Student.delete(studentId);
      loadStudents();
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50 subtle-dots-bg">
      <div className="max-w-7xl mx-auto">
        <StudentsHeader
          totalStudents={students.length}
          onAddStudent={() => setShowForm(true)}
        />

        {/* Search & Filter Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="flex-1 w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search students by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11 md:h-12 text-base md:text-lg"
                />
              </div>
            </div>

            {/* Semester Dropdown */}
            <div className="w-full md:w-52">
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="h-11 md:h-12 px-4 border border-gray-300 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              >
                <option value="">All Semesters</option>
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
                <option value="3">Semester 3</option>
                <option value="4">Semester 4</option>
                <option value="5">Semester 5</option>
                <option value="6">Semester 6</option>
              </select>
            </div>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {isLoading ? (
              Array(8)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 bg-gray-200 rounded-full mb-4" />
                      <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-20 mb-4" />
                      <div className="h-6 bg-gray-200 rounded w-24" />
                    </div>
                  </div>
                ))
            ) : filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <StudentCard
                  key={student._id}
                  student={student}
                  onEdit={() => handleEdit(student)}
                  onDelete={() => handleDelete(student._id)}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full"
              >
                <div className="text-center py-12">
                  <Users className="w-20 h-20 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {students.length === 0
                      ? "No students yet"
                      : "No students found"}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {students.length === 0
                      ? "Add your first student to get started"
                      : "Try adjusting your search or filters"}
                  </p>
                  {students.length === 0 && (
                    <Button
                      onClick={() => setShowForm(true)}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add First Student
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Student Form Modal */}
        <AnimatePresence>
          {showForm && (
            <StudentForm
              student={editingStudent}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingStudent(null);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
