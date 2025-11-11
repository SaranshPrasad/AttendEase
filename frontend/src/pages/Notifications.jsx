import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Calendar,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const user = await User.me();
      setCurrentUser(user);

      const userNotifications = await Notification.filter({ user_id: user.id });
      setNotifications(
        userNotifications.sort(
          (a, b) => new Date(b.created_date) - new Date(a.created_date)
        )
      );
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
    setIsLoading(false);
  };

  const markAsRead = async (notificationId) => {
    try {
      await Notification.update(notificationId, { is_read: true });
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, is_read: true } : n))
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter((n) => !n.is_read);
      await Promise.all(
        unreadNotifications.map((n) =>
          Notification.update(n.id, { is_read: true })
        )
      );
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.is_read;
    return n.type === filter;
  });

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case "session_reminder":
        return <Clock className="w-5 h-5 text-blue-600" />;
      case "attendance_alert":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case "system_update":
        return <Info className="w-5 h-5 text-gray-600" />;
      case "assignment":
        return <Calendar className="w-5 h-5 text-purple-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "session_reminder":
        return "bg-blue-50 border-blue-200";
      case "attendance_alert":
        return "bg-red-50 border-red-200";
      case "system_update":
        return "bg-gray-50 border-gray-200";
      case "assignment":
        return "bg-purple-50 border-purple-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center relative">
              <Bell className="w-7 h-7 text-white" />
              {unreadCount > 0 && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {unreadCount}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Notifications
              </h1>
              <p className="text-gray-600 text-lg">
                {unreadCount > 0
                  ? `${unreadCount} unread notifications`
                  : "All caught up!"}
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <Button
              onClick={markAllAsRead}
              variant="outline"
              className="shadow-sm"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
          )}
        </div>

        {/* Filters */}
        <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-700">Filter:</span>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Notifications</SelectItem>
                  <SelectItem value="unread">Unread Only</SelectItem>
                  <SelectItem value="session_reminder">
                    Session Reminders
                  </SelectItem>
                  <SelectItem value="attendance_alert">
                    Attendance Alerts
                  </SelectItem>
                  <SelectItem value="system_update">System Updates</SelectItem>
                  <SelectItem value="assignment">Assignments</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className={`bg-white/80 backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                      !notification.is_read
                        ? "ring-2 ring-blue-200 ring-opacity-50"
                        : ""
                    } ${getNotificationColor(notification.type)}`}
                    onClick={() =>
                      !notification.is_read && markAsRead(notification.id)
                    }
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3
                              className={`font-semibold text-gray-900 ${
                                !notification.is_read ? "font-bold" : ""
                              }`}
                            >
                              {notification.title}
                            </h3>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-xs text-gray-500">
                                {format(
                                  new Date(notification.created_date),
                                  "MMM dd, HH:mm"
                                )}
                              </span>
                              {!notification.is_read && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              )}
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mt-1">
                            {notification.message}
                          </p>
                          <Badge
                            className={`mt-2 ${
                              notification.priority === "high"
                                ? "bg-red-100 text-red-800"
                                : notification.priority === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {notification.priority} priority
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Bell className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {filter === "unread" ? "All caught up!" : "No notifications"}
                </h3>
                <p className="text-gray-500">
                  {filter === "unread"
                    ? "You've read all your notifications"
                    : "No notifications to show"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
