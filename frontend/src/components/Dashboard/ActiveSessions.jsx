
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ExternalLink, Users, MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { createPageUrl } from "@/utils";

export default function ActiveSessions({ sessions, isLoading }) {

  console.log("Sessions from active session page ",sessions);
  if (isLoading) {
    return (
      <Card className="bg-white border border-gray-100 shadow-lg">
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="p-4 border border-gray-100 rounded-xl">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/70 backdrop-blur-sm border border-gray-100 shadow-lg">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="text-xl font-bold flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </div>
          Active Sessions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {sessions.length > 0 ? (
          <div className="space-y-4">
            {sessions.map((session) =>
              session.slots.map((slot) => {
                const attendancePercentage =
                  session.total_students_expected > 0
                    ? (session.total_present / session.total_students_expected) * 100
                    : 0;

                return (
                  <div
                    key={`${session._id}_${slot.slot_number}`}
                    className="p-4 border border-gray-200 rounded-2xl bg-white hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg text-gray-900 mb-1">
                          {slot.subject?.name || `Class ${session.class_id}`}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {slot.start_time} - {slot.end_time}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users className="w-4 h-4" />
                            {slot.faculty.name}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            {slot.room}
                          </span>
                        </div>
                      </div>
                      <Link to={`/attendance/session/${session._id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-2 rounded-full"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Manage
                        </Button>
                      </Link>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1 text-sm">
                        <span className="font-medium text-gray-700">Attendance</span>
                        <span className="font-bold text-purple-700">
                          {session.total_present || 0} / {session.total_students_expected || 0}
                        </span>
                      </div>
                      <Progress value={attendancePercentage} className="h-2" />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <Clock className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Active Sessions
            </h3>
            <p className="text-gray-500 mb-4">
              Start taking attendance to see active sessions here
            </p>
            <Link to={createPageUrl("Attendance")}>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                Start New Session
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
