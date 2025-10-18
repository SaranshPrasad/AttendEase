import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, UserCog, Building2 } from "lucide-react";

export default function FacultyHeader({ totalFaculty, onAddFaculty }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
          <UserCog className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Faculty Management
          </h1>
          <p className="text-gray-600 text-lg mt-1">
            Manage {totalFaculty} faculty{" "}
            {totalFaculty === 1 ? "member" : "members"}
          </p>
        </div>
      </div>
      <Button
        onClick={onAddFaculty}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white h-12 px-6 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Faculty Details
      </Button>
    </div>
  );
}
