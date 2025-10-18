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
import { X, Upload, User } from "lucide-react";
// import { UploadFile } from "@/integrations/Core";
import { motion } from "framer-motion";
import { getUser } from "../../lib/utils";

export default function StudentForm({ student, onSubmit, onCancel }) {
  const user = getUser();
  const [formData, setFormData] = useState({
    student_id: student?.student_id || "",
    name: student?.name || "",
    email: student?.email || "",
    session: student?.session || "",
    semester: student?.semester || "",
    dob: student?.dob || "",
    department: student?.department || "",
    account_created:student?.account_created || false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // const handlePhotoUpload = async (event) => {
  //   const file = event.target.files[0];
  //   if (!file) return;

  //   setIsUploadingPhoto(true);
  //   try {
  //     const { file_url } = await UploadFile({ file });
  //     setFormData((prev) => ({ ...prev, photo_url: file_url }));
  //   } catch (error) {
  //     console.error("Error uploading photo:", error);
  //     alert("Failed to upload photo. Please try again.");
  //   }
  //   setIsUploadingPhoto(false);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   try {
  //     if(user.role === "admin"){
  //       const res = await 
  //     }
  //     await onSubmit(formData);
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   }

  //   setIsSubmitting(false);
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    await onSubmit(formData); // Already calling Student.create or Student.update
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Failed to save student. Please try again.");
  }
  setIsSubmitting(false);
};


  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-md bg-white rounded-lg p-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {student ? "Edit Student" : "Add New Student"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-6">
            {/* Photo Upload */}
            {/* <div className="text-center">
              <div className="w-24 h-24 mx-auto rounded-full mb-4 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                {formData.photo_url ? (
                  <img
                    src={formData.photo_url}
                    alt="Student photo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <div>
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <Label htmlFor="photo-upload" className="cursor-pointer">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={isUploadingPhoto}
                    onClick={() =>
                      document.getElementById("photo-upload").click()
                    }
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {isUploadingPhoto ? "Uploading..." : "Upload Photo"}
                  </Button>
                </Label>
              </div>
            </div> */}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="student_id">Student ID *</Label>
                <Input
                  id="student_id"
                  value={formData.student_id}
                  onChange={(e) =>
                    handleInputChange("student_id", e.target.value)
                  }
                  placeholder="e.g., STU001"
                  required
                />
              </div>
              <div>
                <Label htmlFor="status">Session</Label>
                <Select
                  value={formData.session}
                  onValueChange={(value) => handleInputChange("session", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2022-2025">2022-2025</SelectItem>
                    <SelectItem value="2023-2026">2023-2026</SelectItem>
                    <SelectItem value="2024-2027">2024-2027</SelectItem>
                    <SelectItem value="2025-2028">2025-2028</SelectItem>

                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="student@email.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="semester">Semester</Label>
                <Input
                  id="semester"
                  value={formData.semester}
                  onChange={(e) => handleInputChange("semester", e.target.value)}
                  placeholder="Eg. 1,2,3,4,5,6"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="department">Department</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => handleInputChange("department", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BCA">BCA</SelectItem>
                    <SelectItem value="BSCIT">BSC IT</SelectItem>
                    <SelectItem value="BCOMCA">BCOMCA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dob">DOB</Label>
                <Input
                  id="dob"
                  value={formData.dob}
                  onChange={(e) => handleInputChange("dob", e.target.value)}
                  type="date"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
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
                  : student
                  ? "Update Student"
                  : "Add Student"}
              </Button>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
