import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Info } from "lucide-react";
import { formatDistanceToNow, parseISO } from "date-fns";

export default function QRCodeDisplay({ session, selectedClass }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (session?.qr_expires_at) {
      const updateTimer = () => {
        const expires = parseISO(session.qr_expires_at);
        const distance = formatDistanceToNow(expires, { addSuffix: true });
        setTimeLeft(distance);
      };

      updateTimer();
      const interval = setInterval(updateTimer, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [session]);

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=${encodeURIComponent(
    session.qr_code
  )}`;

  return (
    <Card className="bg-white/70 backdrop-blur-sm border border-gray-100 shadow-lg text-center">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {session.topic || selectedClass.class_name}
        </CardTitle>
        <CardDescription>
          Scan the QR code below to mark your attendance
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-8 gap-6">
        <div className="p-4 bg-white rounded-2xl shadow-inner border border-gray-100">
          <img
            src={qrCodeUrl}
            alt="Attendance QR Code"
            className="w-64 h-64 md:w-80 md:h-80 rounded-lg"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <Info className="w-5 h-5 text-blue-500" />
          <span>This QR code is unique for this session only.</span>
        </div>
        {timeLeft && (
          <Badge variant="outline" className="text-lg p-2">
            <Clock className="w-4 h-4 mr-2" />
            Expires {timeLeft}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
