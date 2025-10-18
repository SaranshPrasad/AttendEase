import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { AttendanceRecord } from "@/entities/AttendanceRecord";
import { QrCode, Scan, CheckCircle } from "lucide-react";

export default function QuickAttendanceCard({
  sessions,
  userLocation,
  studentId,
}) {
  const [qrInput, setQrInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleQuickAttendance = async () => {
    if (!qrInput.trim() || !studentId) return;

    setIsSubmitting(true);
    try {
      const session = sessions.find((s) => s.qr_code === qrInput.trim());
      if (!session) {
        setMessage({ type: "error", text: "Invalid QR code" });
        setIsSubmitting(false);
        return;
      }

      // Check if already marked
      const existingRecord = await AttendanceRecord.filter({
        session_id: session.id,
        student_id: studentId,
      });

      if (existingRecord.length > 0) {
        setMessage({ type: "warning", text: "Already marked!" });
        setIsSubmitting(false);
        return;
      }

      await AttendanceRecord.create({
        session_id: session.id,
        student_id: studentId,
        marked_at: new Date().toISOString(),
        status: "present",
        method: "qr_code",
        location: userLocation
          ? `${userLocation.lat},${userLocation.lng}`
          : null,
      });

      setMessage({ type: "success", text: "Attendance marked!" });
      setQrInput("");
    } catch (error) {
      console.error("Error marking attendance:", error);
      setMessage({ type: "error", text: "Failed to mark attendance" });
    }
    setIsSubmitting(false);

    // Clear message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="w-5 h-5" />
          Quick Attendance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {message && (
          <div
            className={`p-3 rounded-lg text-sm ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : message.type === "warning"
                ? "bg-yellow-50 text-yellow-800 border border-yellow-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="space-y-3">
          <Input
            placeholder="Scan QR code or enter manually..."
            value={qrInput}
            onChange={(e) => setQrInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleQuickAttendance()}
          />
          <Button
            onClick={handleQuickAttendance}
            disabled={!qrInput.trim() || isSubmitting}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Marking...
              </div>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark Present
              </>
            )}
          </Button>
        </div>

        <div className="text-center pt-4 border-t border-gray-200">
          <Button variant="outline" size="sm" className="w-full">
            <Scan className="w-4 h-4 mr-2" />
            Open Camera Scanner
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
