import React, { useState, useEffect, useMemo } from "react";
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
import { motion } from "framer-motion";

export default function ScheduleForm({
  schedule,
  allCourses,
  allFaculties,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    class_id: "",
    semester: "",
    day: "",
    slot_number: "",
    subject: "",
    faculty: "",
    room: "",
    start_time: "",
    end_time: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log("All Faculties : ", allFaculties);

  // Preload existing data when editing
  useEffect(() => {
    if (schedule) {
      const slot = schedule.slots?.[0] || {};
      setFormData({
        class_id: schedule.class_id || "",
        semester: schedule.semester?.toString() || "",
        day: schedule.day || "",
        slot_number: slot.slot_number?.toString() || "",
        subject: slot.subject?._id || "",
        faculty: slot.faculty?._id || "",
        room: slot.room || "",
        start_time: slot.start_time || "",
        end_time: slot.end_time || "",
      });
    }
  }, [schedule]);

  // Function to auto-generate class_id
  const generateClassId = (data) => {
    const { semester, day, slot_number } = data;
    if (!semester || !day || !slot_number) return "";

    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0].replace(/-/g, "");
    // Example: SEM3_Tuesday_20251006_SLOT2
    return `SEM${semester}_${day}_${formattedDate}_S${slot_number}`;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      // Update class_id whenever semester, day, or slot changes
      if (["semester", "day", "slot_number"].includes(field)) {
        updated.class_id = generateClassId(updated);
      }

      // Auto-calculate start_time & end_time
      if (
        (field === "slot_number" || field === "semester") &&
        updated.semester &&
        updated.slot_number
      ) {
        const semNum = parseInt(updated.semester);
        const slotNum = parseInt(updated.slot_number);
        let startHour = 10;
        let startMinute = semNum <= 4 ? 40 : 45;
        const duration = 45; // minutes per slot

        const totalMinutes =
          startHour * 60 + startMinute + (slotNum - 1) * duration;
        const startTimeHour = Math.floor(totalMinutes / 60);
        const startTimeMinute = totalMinutes % 60;

        const endMinutes = totalMinutes + duration;
        const endHour = Math.floor(endMinutes / 60);
        const endMinute = endMinutes % 60;

        const pad = (n) => n.toString().padStart(2, "0");
        updated.start_time = `${pad(startTimeHour)}:${pad(startTimeMinute)}`;
        updated.end_time = `${pad(endHour)}:${pad(endMinute)}`;
      }

      return updated;
    });
  };

  // Filter subjects by selected semester
  const filteredCourses = useMemo(() => {
    if (!formData.semester) return [];
    return allCourses.filter(
      (course) => course.semester.toString() === formData.semester
    );
  }, [formData.semester, allCourses]);

  // ✅ Filter faculties based on selected subject
  const filteredFaculties = useMemo(() => {
    if (!formData.subject) return [];
    return allFaculties.filter((faculty) =>
      faculty.courses.some((course) => course._id === formData.subject)
    );
  }, [formData.subject, allFaculties]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submissionData = {
        class_id: formData.class_id,
        semester: parseInt(formData.semester),
        day: formData.day,
        slots: [
          {
            slot_number: parseInt(formData.slot_number),
            subject: formData.subject,
            faculty: formData.faculty,
            room: formData.room,
            start_time: formData.start_time,
            end_time: formData.end_time,
          },
        ],
      };
      await onSubmit(submissionData);
    } catch (error) {
      console.error("Error submitting schedule:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-lg bg-white rounded-xl shadow-lg p-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {schedule ? "Edit Timetable Entry" : "Add Timetable Entry"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            {/* Semester */}
            <div>
              <Label>Semester *</Label>
              <Select
                value={formData.semester?.toString() || ""}
                onValueChange={(v) => handleInputChange("semester", v)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((sem) => (
                    <SelectItem key={sem} value={sem.toString()}>
                      {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Class ID */}
            <div>
              <Label>Class ID (Auto-generated)</Label>
              <Input value={formData.class_id} readOnly />
            </div>

            {/* Day & Slot */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Day *</Label>
                <Select
                  value={formData.day}
                  onValueChange={(v) => handleInputChange("day", v)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                    ].map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Slot Number *</Label>
                <Input
                  type="number"
                  min="1"
                  placeholder="e.g. 1"
                  value={formData.slot_number}
                  onChange={(e) =>
                    handleInputChange("slot_number", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            {/* Subject & Faculty */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Subject *</Label>
                <Select
                  value={formData.subject}
                  onValueChange={(v) => handleInputChange("subject", v)}
                  required
                  disabled={filteredCourses.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredCourses.length > 0 ? (
                      filteredCourses.map((subj) => (
                        <SelectItem key={subj._id} value={subj._id}>
                          {subj.name}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-4 text-center text-sm text-gray-500">
                        No subjects available
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Faculty *</Label>
                <Select
                  value={formData.faculty}
                  onValueChange={(v) => handleInputChange("faculty", v)}
                  required
                  disabled={filteredFaculties.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select faculty" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredFaculties.length > 0 ? (
                      filteredFaculties.map((fac) => (
                        <SelectItem key={fac._id} value={fac._id}>
                          {fac.name}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-4 text-center text-sm text-gray-500">
                        No faculties available
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Time (Auto)</Label>
                <Input type="time" value={formData.start_time} readOnly />
              </div>
              <div>
                <Label>End Time (Auto)</Label>
                <Input type="time" value={formData.end_time} readOnly />
              </div>
            </div>

            {/* Room */}
            <div>
              <Label>Room *</Label>
              <Input
                placeholder="e.g., Room 203"
                value={formData.room}
                onChange={(e) => handleInputChange("room", e.target.value)}
                required
              />
            </div>

            {/* Buttons */}
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
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
              >
                {isSubmitting ? "Saving..." : schedule ? "Update" : "Add"}
              </Button>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
