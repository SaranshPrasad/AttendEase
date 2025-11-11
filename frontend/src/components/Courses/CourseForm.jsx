import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export default function CourseForm({ course, faculty, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    course_id: course?.course_id || "",
    name: course?.name || "",
    credits: course?.credits || "",
    semester: course?.semester || "",
    faculties: course?.faculties?.map((f) => f._id) || [], // store faculty IDs
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const submitData = {
        ...formData,
        credits: formData.credits ? Number(formData.credits) : undefined,
      };
      await onSubmit(submitData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setIsSubmitting(false);
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {course ? "Edit Course" : "Create New Course"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="course_id">Course Code *</Label>
              <Input
                id="course_id"
                value={formData.course_id}
                onChange={(e) => handleInputChange("course_id", e.target.value)}
                placeholder="e.g., CS101"
                required
              />
            </div>
            <div>
              <Label htmlFor="credits">Credits</Label>
              <Input
                id="credits"
                type="number"
                value={formData.credits}
                onChange={(e) => handleInputChange("credits", e.target.value)}
                placeholder="e.g., 3"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="name">Course Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="e.g., Introduction to Computer Science"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="semester">Semester *</Label>
              <Input
                id="semester"
                value={formData.semester}
                onChange={(e) => handleInputChange("semester", e.target.value)}
                placeholder="e.g, 1,2,3,4,5,6"
                required
              />
            </div>
            <div>
              <Label htmlFor="faculties" className="mb-2 block">
                Assigned Faculty
              </Label>
              <div className="border rounded-lg p-3 max-h-48 overflow-y-auto space-y-2">
                {faculty.map((member) => (
                  <div key={member._id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`faculty-${member._id}`}
                      checked={formData.faculties.includes(member._id)}
                      onChange={(e) => {
                        const updatedFaculties = e.target.checked
                          ? [...formData.faculties, member._id]
                          : formData.faculties.filter(
                              (id) => id !== member._id
                            );
                        handleInputChange("faculties", updatedFaculties);
                      }}
                      className="w-4 h-4 accent-blue-600 cursor-pointer"
                    />
                    <Label
                      htmlFor={`faculty-${member._id}`}
                      className="cursor-pointer select-none"
                    >
                      {member.name} ({member.faculty_id})
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
            >
              {isSubmitting
                ? "Saving..."
                : course
                ? "Update Course"
                : "Create Course"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
