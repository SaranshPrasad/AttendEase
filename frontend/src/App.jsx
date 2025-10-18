import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

// Layouts and Pages
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Layout from "./components/Layout";

import ScrollToTop from "./components/ScrollToTop";

import Home from "./components/LandingPage/Home";
import Login from "./components/LoginSignUp/LoginPage";
import SignUp from "./components/LoginSignUp/SignUpPage";

import AdminDashboard from "./pages/AdminDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Students from "./pages/Students";
import Faculty from "./pages/Faculty";
import Courses from "./pages/Courses";
import Timetable from "./pages/Timetable";
import Attendance from "./pages/Attendance";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import FacultyAnalyticsPage from "./pages/FacultyAnalytics";
import NotificationsPage from "./pages/Notifications";
import StudentProfilePage from "./pages/StudentProfile";
import StudentCoursesPage from "./pages/StudentCourses";
import StudentAttendancePage from "./pages/StudentAttendance";

function App() {
  const location = useLocation();
  const publicRoutes = [
    "/",
    "/home",
    "/features",
    "/pricing",
    "/about",
    "/contact",
  ];
  const isPublic = publicRoutes.includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      {isPublic && <NavBar />}

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Dashboard + private routes inside Layout */}
        <Route path="/" element={<Layout />}>
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/facultydashboard" element={<FacultyDashboard />} />
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/attendance/session/:id" element={<Attendance />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/facultyanalytics" element={<FacultyAnalyticsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/studentprofile" element={<StudentProfilePage />} />
          <Route path="/studentcourses" element={<StudentCoursesPage />} />
          <Route
            path="/studentattendance"
            element={<StudentAttendancePage />}
          />
        </Route>
      </Routes>

      {isPublic && <Footer />}
    </>
  );
}

export default App;
