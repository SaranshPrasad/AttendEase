import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

export default function StudentsFilters({  }) {
  return (
    // <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center w-full">
    //   <div className="flex items-center gap-2 mb-2 sm:mb-0">
    //     <Filter className="w-5 h-5 text-gray-400 hidden sm:block" />
    //     <span className="hidden sm:inline text-gray-500 text-sm">Filters:</span>
    //   </div>

    //   {/* <Select
    //     value={filters.course}
    //     onValueChange={(value) => setFilters({ ...filters, course: value })}
    //   >
    //     <SelectTrigger className="w-full sm:w-40">
    //       <SelectValue placeholder="Course" />
    //     </SelectTrigger>
    //     <SelectContent>
    //       <SelectItem value="all">All Courses</SelectItem>
    //       {courses.map((course) => (
    //         <SelectItem key={course} value={course}>
    //           {course}
    //         </SelectItem>
    //       ))}
    //     </SelectContent>
    //   </Select> */}

    //   <Select
    //     value={filters.year}
    //     onValueChange={(value) => setFilters({ ...filters, year: value })}
    //   >
    //     <SelectTrigger className="w-full sm:w-32">
    //       <SelectValue placeholder="Year" />
    //     </SelectTrigger>
    //     <SelectContent>
    //       <SelectItem value="all">All Years</SelectItem>
    //       <SelectItem value="1st Year">1st Year</SelectItem>
    //       <SelectItem value="2nd Year">2nd Year</SelectItem>
    //       <SelectItem value="3rd Year">3rd Year</SelectItem>
    //       <SelectItem value="4th Year">4th Year</SelectItem>
    //     </SelectContent>
    //   </Select>

    //   <Select
    //     value={filters.status}
    //     onValueChange={(value) => setFilters({ ...filters, status: value })}
    //   >
    //     <SelectTrigger className="w-full sm:w-32">
    //       <SelectValue placeholder="Status" />
    //     </SelectTrigger>
    //     <SelectContent>
    //       <SelectItem value="all">All Status</SelectItem>
    //       <SelectItem value="active">Active</SelectItem>
    //       <SelectItem value="inactive">Inactive</SelectItem>
    //       <SelectItem value="graduated">Graduated</SelectItem>
    //     </SelectContent>
    //   </Select>
    // </div>
    <></>
  );
}
