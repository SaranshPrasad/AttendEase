
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
