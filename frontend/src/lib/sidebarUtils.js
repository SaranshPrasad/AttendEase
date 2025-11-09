import { BarChart3, Bell, BookMarked, BookOpen, Calendar, FileText, GraduationCap, LayoutDashboard, QrCode, UserCheck, UserCog, Users } from "lucide-react";

const createPageUrl = (pageName) => `/${pageName.toLowerCase()}`;


// Role-based sidebar links
export const getNavigationItems = (userRole) => {

  const adminItems = [
    {
      title: "Dashboard",
      url: createPageUrl("AdminDashboard"),
      icon: LayoutDashboard,
    },
    { title: "Students", url: createPageUrl("Students"), icon: GraduationCap },
    { title: "Faculty", url: createPageUrl("Faculty"), icon: UserCog },
    { title: "Courses", url: createPageUrl("Courses"), icon: BookOpen },
    { title: "Timetable", url: createPageUrl("Timetable"), icon: Calendar },
    { title: "Analytics", url: createPageUrl("Analytics"), icon: BarChart3 },
    { title: "Reports", url: createPageUrl("Reports"), icon: FileText },
  ];

const facultyItems = [
    {
      title: "Dashboard",
      url: createPageUrl("FacultyDashboard"),
      icon: LayoutDashboard,
    },
    { title: "My Courses", url: createPageUrl("Courses"), icon: BookMarked },
    { title: "Timetable", url: createPageUrl("Timetable"), icon: Calendar },
    {
      title: "My Analytics",
      url: createPageUrl("FacultyAnalytics"),
      icon: BarChart3,
    },
    { title: "Reports", url: createPageUrl("Reports"), icon: FileText },
    { title: "Notifications", url: createPageUrl("Notifications"), icon: Bell },
  ];

  const studentItems = [
    {
      title: "Dashboard",
      url: createPageUrl("StudentDashboard"),
      icon: LayoutDashboard,
    },
    { title: "My Profile", url: createPageUrl("StudentProfile"), icon: Users },
    {
      title: "My Courses",
      url: createPageUrl("StudentCourses"),
      icon: BookOpen,
    },
    { title: "Timetable", url: createPageUrl("Timetable"), icon: Calendar },
    { title: "Notifications", url: createPageUrl("Notifications"), icon: Bell },
  ];

  switch (userRole) {
    case "admin":
      return adminItems;
    case "faculty":
      return facultyItems;
    default:
      return studentItems;
  }
};
// Role display
export const getRoleDisplayName = (role) => {
  switch (role) {
    case "admin":
      return "Administrator";
    case "faculty":
      return "Faculty";
    default:
      return "Student";
  }
};
// Role color tag
export const getRoleColor = (role) => {
  switch (role) {
    case "admin":
      return "bg-red-100 text-red-800 border-red-200";
    case "faculty":
      return "bg-green-100 text-blue-800 border-green-200";
    default:
      return "bg-blue-100 text-green-800 border-blue-200";
  }
};