import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCourses } from "../../lib/getCourses";

export default function FacultyForm({ faculty, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    faculty_id: faculty?.faculty_id || "",
    name: faculty?.name || "",
    phone: faculty?.phone || "",
    email: faculty?.email || "",
    account_created: faculty?.account_created || false,
    courses: faculty?.courses || [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coursesList, setCoursesList] = useState([]);

  useEffect(() => {
    const loadCourses = async () => {
      const courses = await getCourses();
      setCoursesList(courses);
    };
    loadCourses();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleCourse = (courseId) => {
    setFormData((prev) => {
      const alreadySelected = prev.courses.includes(courseId);
      return {
        ...prev,
        courses: alreadySelected
          ? prev.courses.filter((id) => id !== courseId)
          : [...prev.courses, courseId],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData); // send to parent → backend
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setIsSubmitting(false);
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="faculty_id">Faculty ID</Label>
            <Input
              id="faculty_id"
              value={formData.faculty_id}
              onChange={(e) => handleInputChange("faculty_id", e.target.value)}
              placeholder="e.g., FAC001"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="e.g., 1234567890"
            />
          </div>

          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter faculty name"
            />
          </div>

          <div>
            <Label htmlFor="email">Email Id</Label>
            <Input
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="name@xyz.com"
            />
          </div>

         
          <div>
            <Label>Courses</Label>
            <div className="space-y-2 max-h-40 overflow-y-auto border p-2 rounded-md">
              {coursesList.map((course) => (
                <div key={course._id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={course._id}
                    checked={formData.courses.includes(course._id)}
                    onChange={() => toggleCourse(course._id)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={course._id}
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {course.name}
                  </label>
                </div>
              ))}
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
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md hover:shadow-lg"
            >
              {isSubmitting
                ? "Saving..."
                : faculty
                ? "Update Faculty"
                : "Add Faculty"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
