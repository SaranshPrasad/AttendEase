// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export default function FacultyForm({ faculty, onSubmit, onCancel }) {
//   const [formData, setFormData] = useState({
//     faculty_id: faculty?.faculty_id || "",
//     name: faculty?.name || "",
//     phone: faculty?.phone || "",
//     email: faculty?.email || "",
//     account_created: false,
//     courses: faculty?.courses || [],
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       await onSubmit(formData);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//     setIsSubmitting(false);
//   };

//   return (
//     <Dialog open={true} onOpenChange={onCancel}>
//       <DialogContent className="sm:max-w-md">
//         {/* <DialogHeader>
//           <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//             {faculty ? "Edit Faculty Details" : "Add Faculty Member"}
//           </DialogTitle>
//         </DialogHeader> */}

//         {/* {!faculty && (
//           <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-4">
//             <p className="text-sm text-blue-800">
//               <strong>Note:</strong> New faculty members must be invited through
//               the user management system. This form is only for updating
//               existing faculty details.
//             </p>
//           </div>
//         )} */}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <Label htmlFor="faculty_id">Faculty ID</Label>
//             <Input
//               id="faculty_id"
//               value={formData.faculty_id}
//               onChange={(e) => handleInputChange("faculty_id", e.target.value)}
//               placeholder="e.g., FAC001"
//             />
//           </div>

//           <div>
//             <Label htmlFor="phone">Phone</Label>
//             <Input
//               id="phone"
//               value={formData.phone}
//               onChange={(e) => handleInputChange("phone", e.target.value)}
//               placeholder="e.g., 1234567890"
//             />
//           </div>

//           <div>
//             <Label htmlFor="name">Full Name</Label>
//             <Input
//               id="name"
//               value={formData.name}
//               onChange={(e) => handleInputChange("name", e.target.value)}
//               placeholder="Enter the name of faculty member."
//             />
//           </div>

//           <div>
//             <Label htmlFor="email">Email Id</Label>
//             <Input
//               id="email"
//               value={formData.email}
//               onChange={(e) => handleInputChange("email", e.target.value)}
//               placeholder="name@xyz.com"
//             />
//           </div>

//           <div>
//           </div>

//           <div className="flex justify-end gap-3 pt-4 border-t">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={onCancel}
//               disabled={isSubmitting}
//             >
//               Cancel
//             </Button>
//             <Button
//                            type="submit"
//                            disabled={isSubmitting}
//                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md hover:shadow-lg"
//                          >
//                            {isSubmitting
//                              ? "Saving..."
//                              : faculty
//                              ? "Update Student"
//                              : "Add Student"}
//                          </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }
// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export default function FacultyForm({ faculty, onSubmit, onCancel }) {
//   const [formData, setFormData] = useState({
//     faculty_id: faculty?.faculty_id || "",
//     name: faculty?.name || "",
//     phone: faculty?.phone || "",
//     email: faculty?.email || "",
//     account_created: false,
//     courses: faculty?.courses || [],
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [open, setOpen] = useState(true); // 👈 control dialog

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     alert("Form submit fired ✅", formData); 
//     setIsSubmitting(true);
//     try {
//       await onSubmit(formData);
//       setOpen(false); // close on success
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//     setIsSubmitting(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={() => { setOpen(false); onCancel(); }}>
//       <DialogContent className="sm:max-w-md">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <Label htmlFor="faculty_id">Faculty ID</Label>
//             <Input
//               id="faculty_id"
//               value={formData.faculty_id}
//               onChange={(e) => handleInputChange("faculty_id", e.target.value)}
//               placeholder="e.g., FAC001"
//             />
//           </div>

//           <div>
//             <Label htmlFor="phone">Phone</Label>
//             <Input
//               id="phone"
//               value={formData.phone}
//               onChange={(e) => handleInputChange("phone", e.target.value)}
//               placeholder="e.g., 1234567890"
//             />
//           </div>

//           <div>
//             <Label htmlFor="name">Full Name</Label>
//             <Input
//               id="name"
//               value={formData.name}
//               onChange={(e) => handleInputChange("name", e.target.value)}
//               placeholder="Enter the name of faculty member."
//             />
//           </div>

//           <div>
//             <Label htmlFor="email">Email Id</Label>
//             <Input
//               id="email"
//               value={formData.email}
//               onChange={(e) => handleInputChange("email", e.target.value)}
//               placeholder="name@xyz.com"
//             />
//           </div>

//           <div className="flex justify-end gap-3 pt-4 border-t">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => { setOpen(false); onCancel(); }}
//               disabled={isSubmitting}
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               disabled={isSubmitting}
//               className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md hover:shadow-lg"
//             >
//               {isSubmitting
//                 ? "Saving..."
//                 : faculty
//                 ? "Update Faculty"
//                 : "Add Faculty"}
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
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
    }
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

          {/* 🔹 Courses Multi-select */}
          {/* <div>
            <Label>Courses</Label>
            <div className="space-y-2 max-h-40 overflow-y-auto border p-2 rounded-md">
              {coursesList.map((course) => (
                <div
                  key={course._id}
                  className="flex items-center space-x-2"
                >
                  <Input
                    type='checkbox'
                    id={course._id}
                    checked={formData.courses.includes(course._id)}
                    onCheckedChange={() => toggleCourse(course._id)}
                  />
                  <label htmlFor={course._id} className="text-sm">
                    {course.name}
                  </label>
                </div>
              ))}
            </div>
          </div> */}
          {/* 🔹 Courses Multi-select */}
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
