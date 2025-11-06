
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

import AttendanceHeader from "../components/Attendance/AttendanceHeader";
import ClassSelector from "../components/Attendance/ClassSelector";
import QRCodeDisplay from "../components/Attendance/QrCodeDisplay";
import LiveAttendanceFeed from "../components/Attendance/LiveAttendanceFeed";
import AttendanceSummary from "../components/Attendance/AttendanceSummary";

export default function AttendancePage() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [activeSession, setActiveSession] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setIsActive] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const checkActiveSession = async () => {
      const storedSession = localStorage.getItem("active-session");
      if (storedSession) {
        try {
          const activeSession = JSON.parse(storedSession); 
          console.log(activeSession);

          if (activeSession === null) {
            setIsActive(false);
          } else {
            setIsActive(true);
            setActiveSession(activeSession);
          }
        } catch (err) {
          console.error("Failed to parse localStorage session:", err);
          setIsActive(false);
        }
      } else {
        setIsActive(false);
      }

      

    };
    loadData();
    checkActiveSession();
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5001/admin/view/timetable/${id}`
      );
      setClasses(res.data.timetables || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  console.log();
  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50 subtle-dots-bg">
      <div className="max-w-7xl mx-auto">
        <AttendanceHeader
          activeSession={activeSession}
          selectedClass={selectedClass}
        />

        <AnimatePresence mode="wait">
          {!activeSession ? (
            <motion.div
              key="selector"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {!isActive && (
                <ClassSelector
                  selectedClass={classes}
                  setSelectedClass={setSelectedClass}
                  onStartSession={(session) => setActiveSession(session)}
                  isLoading={isLoading}
                  setIsActive={setIsActive}
                />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="active-session"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid  gap-8">
                {/* Sidebar - Live Attendance */}
                <div className="lg:col-span-1 space-y-6">
                  <AttendanceSummary
                    presentCount={attendanceRecords.length}
                    session={activeSession}
                    
                  />

                  <LiveAttendanceFeed isLoading={isLoading} activeSession={activeSession}/>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
