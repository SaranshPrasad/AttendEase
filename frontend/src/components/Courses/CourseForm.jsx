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
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export default function CourseForm({ course, faculty, onSubmit, onCancel }) {
//   const [formData, setFormData] = useState({
//     course_id: course?.course_id || "",
//     name: course?.name || "",
//     credits: course?.credits || "",
//     semester: course?.semester || "",
//     faculties: course?.faculties || [],
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       // Convert credits and max_students to numbers
//       const submitData = {
//         ...formData,
//         credits: formData.credits ? Number(formData.credits) : undefined,
//         max_students: formData.max_students
//           ? Number(formData.max_students)
//           : undefined,
//         enrolled_students: course?.enrolled_students || [],
//       };
//       await onSubmit(submitData);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//     setIsSubmitting(false);
//   };
//  console.log(faculty);
//   return (
//     <Dialog open={true} onOpenChange={onCancel}>
//       <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//             {course ? "Edit Course" : "Create New Course"}
//           </DialogTitle>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <Label htmlFor="course_id">Course Code *</Label>
//               <Input
//                 id="course_id"
//                 value={formData.course_id}
//                 onChange={(e) =>
//                   handleInputChange("course_id", e.target.value)
//                 }
//                 placeholder="e.g., CS101"
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="credits">Credits</Label>
//               <Input
//                 id="credits"
//                 type="number"
//                 value={formData.credits}
//                 onChange={(e) => handleInputChange("credits", e.target.value)}
//                 placeholder="e.g., 3"
//               />
//             </div>
//           </div>

//           <div>
//             <Label htmlFor="name">Course Name *</Label>
//             <Input
//               id="name"
//               value={formData.name}
//               onChange={(e) => handleInputChange("name", e.target.value)}
//               placeholder="e.g., Introduction to Computer Science"
//               required
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <Label htmlFor="semester">Semester *</Label>
//               <Input
//                 id="semester"
//                 value={formData.semester}
//                 onChange={(e) =>
//                   handleInputChange("semester", e.target.value)
//                 }
//                 placeholder="e.g, 1,2,3,4,5,6"
//                 required
//               />
//             </div>
            
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <Label htmlFor="faculty_id">Assigned Faculty</Label>
//               <Select
//                 value={formData.faculty_id}
//                 onValueChange={(value) =>
//                   handleInputChange("faculty_id", value)
//                 }
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select faculty" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value={null}>Not Assigned</SelectItem>
//                   {faculty.map((member) => (
//                     <SelectItem key={member.id} value={member.id}>
//                       {member.full_name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
            
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
//               type="submit"
//               disabled={isSubmitting}
//               className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
//             >
//               {isSubmitting
//                 ? "Saving..."
//                 : course
//                 ? "Update Course"
//                 : "Create Course"}
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CourseForm({ course, faculty, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    course_id: course?.course_id || "",
    name: course?.name || "",
    credits: course?.credits || "",
    semester: course?.semester || "",
    faculties: course?.faculties?.map(f => f._id) || [], // store faculty IDs
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
            {/* <div>
              <Label htmlFor="faculties">Assigned Faculty</Label>
              <Select
                value={formData.faculties}
                onValueChange={(value) => handleInputChange("faculties", value)}
                multiple
                placeholder="Select Faculty"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select faculty" />
                </SelectTrigger>
                <SelectContent>
                  {faculty.map((member) => (
                    <SelectItem key={member._id} value={member._id}>
                      {member.name} ({member.faculty_id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}
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
              : formData.faculties.filter((id) => id !== member._id);
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

