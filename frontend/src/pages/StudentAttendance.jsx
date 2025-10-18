import React, { useState, useEffect, useCallback } from "react";
// import { AttendanceSession } from "@/entities/AttendanceSession";
// import { AttendanceRecord } from "@/entities/AttendanceRecord";
// import { Student } from "@/entities/Student";
// import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  QrCode,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

export default function StudentAttendancePage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [studentProfile, setStudentProfile] = useState(null);
  const [activeSessions, setActiveSessions] = useState([]);
  const [qrInput, setQrInput] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const user = localStorage.getItem("user");
  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []); // No dependencies for this useCallback

  const loadActiveSessions = useCallback(async () => {
    try {
      const sessions = await AttendanceSession.filter({ is_active: true });
      setActiveSessions(sessions);
    } catch (error) {
      console.error("Error loading active sessions:", error);
    }
  }, []); // No dependencies for this useCallback

  const loadData = useCallback(async () => {
    try {
      const user = await User.me();
      setCurrentUser(user);

      const students = await Student.list();
      const studentProf = students.find((s) => s.email === user.email);
      setStudentProfile(studentProf);

      await loadActiveSessions();
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }, [loadActiveSessions]); // Depends on loadActiveSessions

  useEffect(() => {
    loadData();
    getCurrentLocation();

    // Auto-refresh active sessions every 10 seconds
    const interval = setInterval(loadActiveSessions, 10000);
    return () => clearInterval(interval);
  }, [loadData, getCurrentLocation, loadActiveSessions]); // Added dependencies for useCallback functions

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // Earth's radius in meters
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
  };

  const isWithinRange = (session) => {
    if (!userLocation || !session.location_lat || !session.location_lng)
      return true; // Allow if no location data

    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      session.location_lat,
      session.location_lng
    );

    return distance <= 50; // 50 meters range (more practical than 2m)
  };

  const markAttendance = async (sessionId, qrCode) => {
    if (!studentProfile) {
      setMessage({ type: "error", text: "Student profile not found" });
      return;
    }

    setIsSubmitting(true);
    try {
      // Check if already marked
      const existingRecord = await AttendanceRecord.filter({
        session_id: sessionId,
        student_id: studentProfile.id,
      });

      if (existingRecord.length > 0) {
        setMessage({
          type: "warning",
          text: "Attendance already marked for this session",
        });
        setIsSubmitting(false);
        return;
      }

      // Create attendance record
      await AttendanceRecord.create({
        session_id: sessionId,
        student_id: studentProfile.id,
        marked_at: new Date().toISOString(),
        status: "present",
        method: "qr_code",
        location: userLocation
          ? `${userLocation.lat},${userLocation.lng}`
          : null,
      });

      setMessage({ type: "success", text: "Attendance marked successfully!" });
      setQrInput("");
      loadActiveSessions();
    } catch (error) {
      console.error("Error marking attendance:", error);
      setMessage({
        type: "error",
        text: "Failed to mark attendance. Please try again.",
      });
    }
    setIsSubmitting(false);
  };

  const handleQrSubmit = async () => {
    if (!qrInput.trim()) return;

    const session = activeSessions.find((s) => s.qr_code === qrInput.trim());
    if (!session) {
      setMessage({
        type: "error",
        text: "Invalid QR code or session not found",
      });
      return;
    }

    if (!isWithinRange(session)) {
      setMessage({
        type: "error",
        text: "You must be within 50 meters of the classroom to mark attendance",
      });
      return;
    }

    await markAttendance(session.id, qrInput.trim());
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <QrCode className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Mark Attendance
              </h1>
              <p className="text-gray-600 text-lg">
                Scan QR code or enter code manually
              </p>
            </div>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-xl border ${
              message.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : message.type === "warning"
                ? "bg-yellow-50 border-yellow-200 text-yellow-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            <div className="flex items-center gap-2">
              {message.type === "success" ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span className="font-medium">{message.text}</span>
            </div>
          </motion.div>
        )}

        {/* QR Code Input */}
        <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg mb-8">
          <CardHeader>
            <CardTitle>Enter Attendance Code</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Input
                placeholder="Scan QR code or enter code manually..."
                value={qrInput}
                onChange={(e) => setQrInput(e.target.value)}
                className="flex-1 h-12 text-lg"
                onKeyDown={(e) => e.key === "Enter" && handleQrSubmit()}
              />
              <Button
                onClick={handleQrSubmit}
                disabled={!qrInput.trim() || isSubmitting}
                className="h-12 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white"
              >
                {isSubmitting ? "Marking..." : "Mark Present"}
              </Button>
            </div>
            {userLocation && (
              <div className="flex items-center gap-2 mt-3 text-sm text-green-600">
                <MapPin className="w-4 h-4" />
                <span>Location detected - Ready for attendance</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Sessions */}
        <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </div>
              Live Classes ({activeSessions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeSessions.length > 0 ? (
              <div className="space-y-4">
                {activeSessions.map((session) => {
                  const withinRange = isWithinRange(session);
                  return (
                    <div
                      key={session.id}
                      className="p-4 border border-gray-200 rounded-xl bg-white"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-lg text-gray-900">
                            {session.topic || "Class Session"}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {session.session_time}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {session.total_present || 0} present
                            </span>
                          </div>
                        </div>
                        <Badge
                          className={
                            withinRange
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {withinRange ? "In Range" : "Out of Range"}
                        </Badge>
                      </div>

                      <Button
                        onClick={() =>
                          markAttendance(session.id, session.qr_code)
                        }
                        disabled={!withinRange || isSubmitting}
                        className={`w-full ${
                          withinRange
                            ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {withinRange
                          ? "Mark Attendance"
                          : "Move closer to classroom"}
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Clock className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Live Classes
                </h3>
                <p className="text-gray-500">
                  No attendance sessions are currently active
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
