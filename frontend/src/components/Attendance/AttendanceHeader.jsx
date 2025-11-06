import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { QrCode, StopCircle } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AttendanceHeader({
  activeSession,
  selectedClass,
}) {
 const [liveSessions, setLiveSessions] = useState({});
 const navigate = useNavigate();
  useEffect(() => {
    const checkActiveSession = async () => {
      const storedSession = localStorage.getItem("active-session");
      if (storedSession) {
          const activeSession = JSON.parse(storedSession);
          // console.log(activeSession);
            setLiveSessions(activeSession.session); 
          }
       
    };
    checkActiveSession();
  }, []);
  
  const handleEndSession = async (sessionId) => {
    const res = await axios.patch(`http://localhost:5001/attendance/end/session/${sessionId}`, {}, {withCredentials:true});
    alert("Session Deleted..");
    localStorage.removeItem("active-session");
    navigate('/facultyDashboard')
  }
  // console.log("Active Sessions : ",liveSessions);
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
          <QrCode className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {activeSession ? "Live Attendance" : "Take Attendance"}
          </h1>
          <p className="text-gray-600 text-lg mt-1">
            {activeSession
              ? `Session running for ${liveSessions?.subject?.name} By ${liveSessions?.faculty?.name}`
              : "Select a class to start a new session"}
          </p>
        </div>
      </div>
      {activeSession && (
        <Button
          onClick={() => handleEndSession(liveSessions._id)}
          variant="destructive"
          className="h-12 px-6 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <StopCircle className="w-5 h-5 mr-2" />
          End Session
        </Button>
      )}
    </div>
  );
}
