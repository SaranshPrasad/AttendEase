import {
  Users,
  BookOpen,
  Clock,
  TrendingUp,
  UserCog,
  BarChart3,
  FileText,
} from "lucide-react";
export const adminQuickActions = [
    {
      title: "Manage Students",
      description: "Add or edit student profiles",
      icon: Users,
      url: "/students",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Manage Faculty",
      description: "Onboard or manage faculty",
      icon: UserCog,
      url: "/faculty",
      gradient: "from-green-500 to-green-600",
    },
    {
      title: "Manage Courses",
      description: "Define and assign courses",
      icon: BookOpen,
      url: "/courses",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      title: "View Analytics",
      description: "Check attendance reports",
      icon: BarChart3,
      url: "/analytics",
      gradient: "from-orange-500 to-orange-600",
    },
  ];