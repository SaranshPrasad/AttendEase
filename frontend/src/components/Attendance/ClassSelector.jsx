
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Play } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

export default function ClassSelector({ selectedClass, setSelectedClass, onStartSession, isLoading, setIsActive }) {
  const [selectedClassData, setSelectedClassData] = useState(null);
  const [sessionPayload, setSessionPayload] = useState(null);
  useEffect(() => {
    if (selectedClassData) {
      const slot = selectedClassData.slots?.[0];
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");

      const payload = {
        class_id: selectedClassData.class_id,
        semester: selectedClassData.semester,
        class_day: selectedClassData.day,
        class_date: `${yyyy}-${mm}-${dd}`,
        subject: slot?.subject?._id || "",
        faculty: slot?.faculty?._id || "",
        start_time: slot?.start_time || "",
        end_time: slot?.end_time || "",
        status: "upcoming",
      };

      setSessionPayload(payload);
    }
  }, [selectedClassData]);

  // Create session automatically
  const handleStartSession = async () => {
    if (!sessionPayload) return alert("Please select a class first!");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/attendance/create/active/session`,
        sessionPayload,
        { withCredentials: true }
      );

      alert("✅ Attendance session created successfully!");
     
      if (onStartSession) onStartSession(res.data);
      const active = res.data;
      localStorage.setItem("active-session", JSON.stringify(active));
      setIsActive(true);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create attendance session");
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-white/70 backdrop-blur-sm border border-gray-100 shadow-lg">
        <CardHeader><Skeleton className="h-6 w-48" /></CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-10 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
        <CardFooter><Skeleton className="h-12 w-36" /></CardFooter>
      </Card>
    );
  }

  return (
    <Card className="bg-white/70 backdrop-blur-sm border border-gray-100 shadow-lg">
      <CardHeader>
        <CardTitle>Start Attendance Session</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Class Selector */}
        <div>
          <Label>Select Class</Label>
          <Select
            onValueChange={() => {
              setSelectedClassData(selectedClass);
              setSelectedClass(selectedClass);
            }}
          >
            <SelectTrigger className="h-12 text-lg">
              <SelectValue placeholder="Choose a class..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={selectedClass._id} value={selectedClass._id}>
                {selectedClass.class_id} (Sem {selectedClass.semester})
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Auto-filled details */}
        {sessionPayload && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
            <div>
              <Label>Class ID</Label>
              <Input readOnly value={sessionPayload.class_id} className="h-12 bg-gray-100" />
            </div>
            <div>
              <Label>Semester</Label>
              <Input readOnly value={sessionPayload.semester} className="h-12 bg-gray-100" />
            </div>
            <div>
              <Label>Class Day</Label>
              <Input readOnly value={sessionPayload.class_day} className="h-12 bg-gray-100" />
            </div>
            <div>
              <Label>Date</Label>
              <Input readOnly value={sessionPayload.class_date} className="h-12 bg-gray-100" />
            </div>
            <div>
              <Label>Start Time</Label>
              <Input readOnly value={sessionPayload.start_time} className="h-12 bg-gray-100" />
            </div>
            <div>
              <Label>End Time</Label>
              <Input readOnly value={sessionPayload.end_time} className="h-12 bg-gray-100" />
            </div>
            <div>
              <Label>Subject</Label>
              <Input readOnly value={selectedClass.slots[0].subject.name} className="h-12 bg-gray-100" />
            </div>
            <div>
              <Label>Faculty</Label>
              <Input readOnly value={selectedClass.slots[0].faculty.name} className="h-12 bg-gray-100" />
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleStartSession}
          disabled={!sessionPayload}
          className="h-12 px-8 text-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
        >
          <Play className="w-5 h-5 mr-2" /> Create Session
        </Button>
      </CardFooter>
    </Card>
  );
}
