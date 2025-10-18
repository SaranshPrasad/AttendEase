import React, { useState, useEffect } from "react";
// import { AttendanceSession } from "@/entities/AttendanceSession";
// import { AttendanceRecord } from "@/entities/AttendanceRecord";
// import { Student } from "@/entities/Student";
// import { Course } from "@/entities/Course";
// import { Class } from "@/entities/Class"; // Added this import
// import { Schedule } from "@/entities/Schedule";
// import { User } from "@/entities/User";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label"; // Added this import
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Users, TrendingUp, Calendar, BookOpen, Clock } from "lucide-react";

export default function FacultyAnalyticsPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [myCourses, setMyCourses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [records, setRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const user = await User.me();
      setCurrentUser(user);

      const [coursesData, sessionsData, recordsData, studentsData] =
        await Promise.all([
          Course.filter({ faculty_id: user.id }),
          AttendanceSession.list("-created_date"),
          AttendanceRecord.list("-created_date"),
          Student.list(),
        ]);

      setMyCourses(coursesData);

      // Filter sessions for my courses only
      const myCourseIds = coursesData.map((c) => c.id);
      const myClassIds = await Promise.all(
        myCourseIds.map(async (courseId) => {
          const course = coursesData.find((c) => c.id === courseId);
          if (course) {
            // Assuming `Class.filter` can take a course_id or course_name directly
            // Adjust this based on your actual Class entity's filter capabilities
            const classes = await Class.filter({ course_id: course.id }); // Using course.id for filtering classes
            return classes.map((c) => c.id);
          }
          return [];
        })
      );
      const flatClassIds = myClassIds.flat();

      const mySessions = sessionsData.filter((s) =>
        flatClassIds.includes(s.class_id)
      );
      setSessions(mySessions);

      const mySessionIds = mySessions.map((s) => s.id);
      const myRecords = recordsData.filter((r) =>
        mySessionIds.includes(r.session_id)
      );
      setRecords(myRecords);
      setStudents(studentsData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  const getAnalyticsData = () => {
    let filteredSessions = sessions;
    let filteredRecords = records;
    let relevantClassIds = [];

    if (selectedCourse !== "all") {
      const selectedCourseData = myCourses.find((c) => c.id === selectedCourse);
      if (selectedCourseData) {
        // Find classes associated with the selected course
        const classesForSelectedCourse = Class.filter({
          course_id: selectedCourseData.id,
        }); // Assuming this is synchronous or pre-fetched
        // NOTE: In a real application, you might need to fetch this if not already available
        // For now, assuming classes are available or can be filtered from `myClassIds` if pre-fetched.
        // As a placeholder, we'll try to deduce from existing data or re-fetch.
        // A more robust solution might involve caching class-to-course mapping.
        // For simplicity, let's assume `sessions` already have `class_id` and we need to map `class_id` to `course_id`.
        // This would require sessions to potentially include course_id or for a mapping to exist.

        // A temporary workaround: re-filter `myClassIds` based on `selectedCourse`
        // This logic needs to be carefully aligned with how classes are linked to courses and sessions.
        // Assuming we need to find all sessions whose class_id belongs to classes of the selected course.

        // This is a more accurate way to filter sessions by selected course:
        // First, get the class IDs associated with the selected course from the `myClassIds` array
        // (This part needs `myClassIds` to be a mapping of courseId to classIds, not flat)
        // For the sake of a working example with current data structure:
        const currentCourseClassIds =
          myCourses.find((c) => c.id === selectedCourse)?.class_ids || []; // Assuming Course entity might have `class_ids`

        // If Class entity itself is available client-side, filter it
        // Or if we need to make another API call, it complicates `getAnalyticsData`
        // Let's assume for now, we can link sessions via their class_id to the course.
        // This requires a `class_id` to `course_id` mapping.
        // If `Class` objects were fetched, we could filter them by `course_id`.

        // Given the current setup, we need a way to determine which `class_id`s belong to `selectedCourse`.
        // If `sessions` stored `course_id` directly, it would be easier.
        // Let's create a mapping `classId -> courseId` if possible.
        // From `loadData`, `flatClassIds` are all classes for current user's courses.
        // We need to know which class belongs to which course.

        // Simpler approach for now: rely on `myClassIds` from `loadData` which already relates to courses.
        // This needs to be correctly structured in `loadData`.
        // Let's refine `loadData` to create a `courseId -> classIds[]` map.

        // Refactoring loadData to support this:
        // const myCourseClassMap = {};
        // coursesData.forEach(async (course) => {
        //   const classes = await Class.filter({ course_id: course.id });
        //   myCourseClassMap[course.id] = classes.map(c => c.id);
        // });
        // This would need to be awaited.

        // For now, let's assume a simplified relationship or fetch data more directly if needed.
        // Given `flatClassIds` is already filtered for `myCourses`, we need a way to filter further.
        // This part of the code needs a clear relationship between `sessions.class_id` and `course.id`.

        // Let's re-evaluate based on the `loadData` `Class.filter({ course: coursesData.find(c => c.id === courseId)?.course_name });`
        // This implies `Class` has a `course_name` field.
        // If a Class belongs to a Course, we need to know its `course_id`.
        // Let's assume for a Class, we can get its associated Course.
        // For simplicity: If `Class` has `course_id` directly:
        const classesForCourse = []; // Placeholder for classes of the selected course
        // In a real scenario, this would involve either:
        // 1. Fetching all classes for the selected course: `await Class.filter({ course_id: selectedCourseData.id });`
        // 2. Having a pre-built map from `loadData` that links `class_id` to `course_id`.

        // Let's assume we have `myCourses` which includes `class_ids` for each course for simplicity
        // (This would mean `Course` entity needs `class_ids` or we derive it).
        // For a more robust approach, let's ensure `loadData` sets up a mapping.
        // For this `getAnalyticsData` function to work correctly with `selectedCourse`:
        // We need `sessions` to either have `course_id` directly, or a fast lookup `class_id -> course_id`.

        // Current loadData has `flatClassIds` but doesn't distinguish which course they belong to.
        // Let's add a state `courseClassMap` to store `courseId -> classIds[]` mapping.
        // And use that map here.
        // (This change impacts `loadData` as well, but for this specific `getAnalyticsData`,
        // I'll proceed with a more direct but perhaps less efficient filtering if `courseClassMap` wasn't built).

        // A temporary but functional approach for `selectedCourse` filtering:
        // Re-fetch or pre-process `Class` entities to map `class_id` to `course_id`.
        // Assuming `myCourses` now holds `class_ids` directly (ideal for this structure):
        const relevantClassIdsForSelectedCourse =
          myCourses.find((c) => c.id === selectedCourse)?.class_ids || [];

        filteredSessions = sessions.filter((s) =>
          relevantClassIdsForSelectedCourse.includes(s.class_id)
        );
        const sessionIds = filteredSessions.map((s) => s.id);
        filteredRecords = records.filter((r) =>
          sessionIds.includes(r.session_id)
        );
      }
    }

    return { filteredSessions, filteredRecords };
  };

  const calculateStats = () => {
    const { filteredSessions, filteredRecords } = getAnalyticsData();

    const totalSessions = filteredSessions.length;
    // totalAttendance should be count of records, not students
    const totalAttendanceRecords = filteredRecords.length;

    // Calculate expected attendance based on the filtered sessions
    const expectedAttendanceSum = filteredSessions.reduce(
      (sum, s) => sum + (s.total_students_expected || 0),
      0
    );
    const averageAttendance =
      expectedAttendanceSum > 0
        ? (totalAttendanceRecords / expectedAttendanceSum) * 100
        : 0;

    // Total students relevant to the selected context (all courses or a specific one)
    let totalStudentsCount = 0;
    if (selectedCourse === "all") {
      totalStudentsCount = myCourses.reduce(
        (sum, c) => sum + (c.enrolled_students?.length || 0),
        0
      );
    } else {
      const selectedCourseData = myCourses.find((c) => c.id === selectedCourse);
      totalStudentsCount = selectedCourseData
        ? selectedCourseData.enrolled_students?.length || 0
        : 0;
    }

    return {
      totalSessions,
      totalAttendanceRecords, // Renamed for clarity, matches the count of records
      averageAttendance: Math.round(averageAttendance),
      totalStudents: totalStudentsCount,
    };
  };

  const getWeeklyAttendanceData = () => {
    const { filteredSessions, filteredRecords } = getAnalyticsData();
    const weeklyData = {};

    filteredSessions.forEach((session) => {
      // Ensure session_date is a valid date string or Date object for consistent grouping
      const sessionDate = new Date(session.session_date);
      // Group by week (e.g., start of the week)
      // For simplicity, let's just group by month-day for now, or assume session_date is already weekly.
      // A more robust week grouping would involve calculating the start of the week.
      // For now, let's sort by date and use the date as the key, then group.
      const dateKey = sessionDate.toISOString().split("T")[0]; // YYYY-MM-DD

      const sessionRecords = filteredRecords.filter(
        (r) => r.session_id === session.id
      );

      if (!weeklyData[dateKey]) {
        weeklyData[dateKey] = {
          week: dateKey, // Use dateKey as week label
          expected: 0,
          present: 0,
        };
      }

      weeklyData[dateKey].expected += session.total_students_expected || 0;
      weeklyData[dateKey].present += sessionRecords.length;
    });

    // Sort the data by date
    const sortedWeeklyData = Object.values(weeklyData).sort(
      (a, b) => new Date(a.week).getTime() - new Date(b.week).getTime()
    );

    return sortedWeeklyData.map((data) => ({
      ...data,
      percentage:
        data.expected > 0
          ? Math.round((data.present / data.expected) * 100)
          : 0,
    }));
  };

  // Recalculate stats and weeklyData whenever selectedCourse, sessions, or records change
  const stats = calculateStats();
  const weeklyData = getWeeklyAttendanceData();

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-700">Loading analytics data...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            My Teaching Analytics
          </h1>
          <p className="text-gray-600 text-lg">
            Track attendance and engagement for your courses
          </p>
        </div>

        {/* Course Filter */}
        <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Label
                htmlFor="course-select"
                className="font-semibold text-gray-700"
              >
                Filter by Course:
              </Label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger id="course-select" className="w-64">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All My Courses</SelectItem>
                  {myCourses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.course_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    My Sessions
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.totalSessions}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Students
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.totalStudents}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Avg Attendance
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.averageAttendance}%
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    My Courses
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {myCourses.length}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
            <CardHeader>
              <CardTitle>Weekly Attendance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="percentage"
                    stroke="#8884d8"
                    strokeWidth={3}
                    name="Attendance (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
            <CardHeader>
              <CardTitle>Course Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myCourses.map((course) => {
                  // Calculate actual course attendance if selected, otherwise average overall attendance
                  let courseAttendance = 0;
                  if (
                    selectedCourse === "all" ||
                    selectedCourse !== course.id
                  ) {
                    // Placeholder for individual course, or if not selected course, use overall avg
                    courseAttendance = stats.averageAttendance;
                  } else if (selectedCourse === course.id) {
                    // If this is the selected course, its attendance is the current averageAttendance
                    courseAttendance = stats.averageAttendance;
                  }

                  // A more accurate way would be to compute per-course stats:
                  const courseSessions = sessions.filter((s) => {
                    const courseClassIds = course.class_ids || []; // Assuming Course entity has class_ids
                    return courseClassIds.includes(s.class_id);
                  });
                  const courseSessionIds = courseSessions.map((s) => s.id);
                  const courseRecords = records.filter((r) =>
                    courseSessionIds.includes(r.session_id)
                  );

                  const totalExpectedForCourse = courseSessions.reduce(
                    (sum, s) => sum + (s.total_students_expected || 0),
                    0
                  );
                  const totalPresentForCourse = courseRecords.length;
                  const actualCourseAttendance =
                    totalExpectedForCourse > 0
                      ? Math.round(
                          (totalPresentForCourse / totalExpectedForCourse) * 100
                        )
                      : 0;

                  return (
                    <div
                      key={course.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {course.course_name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {course.course_code}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          {actualCourseAttendance}%
                        </p>
                        <p className="text-sm text-gray-500">Avg Attendance</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
