import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

export default function CoursesFilters({
  filters,
  setFilters,
  departments,
  semesters,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center w-full">
      <div className="flex items-center gap-2 mb-2 sm:mb-0">
        <Filter className="w-5 h-5 text-gray-400 hidden sm:block" />
        <span className="hidden sm:inline text-gray-500 text-sm">Filters:</span>
      </div>

      <Select
        value={filters.department}
        onValueChange={(value) => setFilters({ ...filters, department: value })}
      >
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Department" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Departments</SelectItem>
          {departments.map((dept) => (
            <SelectItem key={dept} value={dept}>
              {dept}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.semester}
        onValueChange={(value) => setFilters({ ...filters, semester: value })}
      >
        <SelectTrigger className="w-full sm:w-32">
          <SelectValue placeholder="Semester" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Semesters</SelectItem>
          {semesters.map((sem) => (
            <SelectItem key={sem} value={sem}>
              {sem}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.status}
        onValueChange={(value) => setFilters({ ...filters, status: value })}
      >
        <SelectTrigger className="w-full sm:w-32">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
