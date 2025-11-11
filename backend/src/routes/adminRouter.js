require("dotenv").config();
const express = require("express");
const adminRouter = express.Router();
const Courses = require("../models/courses");
const Faculty = require("../models/faculty");
const Student = require("../models/students");
const Timetable = require("../models/timetable");
const cookieParser = require("cookie-parser");
const userAuth = require("../middleware/auth");
const MasterStudent = require("../models/master_students");
const MasterFaculty = require("../models/master_faculty");
adminRouter.use(express.json());
adminRouter.use(cookieParser());

// Student Routes
adminRouter.get("/view/students", userAuth, async (req, res) => {
  try {
    const studentData = await MasterStudent.find();
    const student = await Student.find();
    if (!studentData || studentData.length == 0) {
      throw new Error("Student data is empty!");
    }
    res.status(200).json({
      message: "Data fetched successfully....",
      studentData,
      student,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong : " + error.message });
  }
});

adminRouter.post("/add/student", userAuth, async (req, res) => {
  try {
    const { role } = req.user;
    if (role === "admin") {
      const { name, student_id, session, semester, dob, department, email } =
        req.body;
      const existingStudent = await MasterStudent.findOne({ student_id });
      if (existingStudent) {
        throw new Error("Student already exists...");
      } else {
        const student = new MasterStudent({
          name: name,
          email: email,
          session: session,
          department: department,
          semester: semester,
          dob: dob,
          student_id: student_id,
        });
        const data = await student.save();
        res.status(200).json({ message: "Student saved to database...", data });
      }
    } else {
      throw new Error("Admin not verified !");
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong : " + error.message });
  }
});

adminRouter.patch("/update/student", userAuth, async (req, res) => {});

adminRouter.delete("/delete/student", userAuth, async (req, res) => {
  try {
    const { role } = req.user;
    if (role === "admin") {
      const { _id } = req.body;
      const student = await MasterStudent.findByIdAndDelete(_id);
      if (!student) {
        throw new Error("Student data is not available Unable to delete...");
      } else {
        res
          .status(200)
          .json({ messgae: "Student data deleted sucessfully..", student });
      }
    } else {
      throw new Error("Admin not verified....");
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong : " + error.message });
  }
});
adminRouter.delete("/delete/second/student", userAuth, async (req, res) => {
  try {
    const { role } = req.user;
    if (role === "admin") {
      const { _id } = req.body;
      const student = await Student.findByIdAndDelete(_id);
      if (!student) {
        throw new Error("Student data is not available Unable to delete...");
      } else {
        res
          .status(200)
          .json({ messgae: "Student data deleted sucessfully..", student });
      }
    } else {
      throw new Error("Admin not verified....");
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong : " + error.message });
  }
});

// Faculty Routes
adminRouter.get("/view/faculty", async (req, res) => {
  try {
    const facultyData = await MasterFaculty.find().populate(
      "courses",
      "name course_id"
    );
    res.status(200).json({ message: "Faculty data fetched !", facultyData });
  } catch (error) {
    res
      .status(400)
      .json({ messgae: "Something went wrong : " + error.message });
  }
});

adminRouter.get("/view/second/faculty", userAuth, async (req, res) => {
  try {
    const { role } = req.user;
    if (role === "admin") {
      const facultyData = await Faculty.find().populate(
        "courses",
        "name course_id"
      );
      if (facultyData && facultyData.length > 0) {
        res
          .status(200)
          .json({ message: "Faculty data fetched !", facultyData });
      } else {
        throw new Error("Faculty data not available");
      }
    } else {
      throw new Error("Admin is not verified !");
    }
  } catch (error) {
    res
      .status(400)
      .json({ messgae: "Something went wrong : " + error.message });
  }
});

adminRouter.patch("/activate/student", userAuth, async (req, res) => {
  try {
    const { role } = req.user;
    const { _id } = req.body;
    if (role === "admin") {
      const existing = await Student.findByIdAndUpdate(_id, {
        is_verified: true,
      });
      const data = await existing.save();
      res.status(200).json({ message: "Student Verified..", data });
    } else {
      throw new Error("Admin not verified..");
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong : " + error.message });
  }
});

adminRouter.post("/add/faculty", userAuth, async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== "admin") {
      throw new Error("Admin is not verified.");
    }

    const { name, email, phone, faculty_id, courses } = req.body;

    const existingFaculty = await MasterFaculty.findOne({ faculty_id });
    if (existingFaculty) {
      throw new Error("Faculty data already exists..");
    }

    const newFaculty = new MasterFaculty({
      name,
      email,
      phone,
      faculty_id,
      courses,
    });

    const savedFaculty = await newFaculty.save();
    if (courses && courses.length > 0) {
      await Courses.updateMany(
        { _id: { $in: courses } },
        { $addToSet: { faculties: savedFaculty._id } }
      );
    }

    res.status(200).json({
      message: "Faculty and course relationships saved!",
      data: savedFaculty,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong : " + error.message });
  }
});

adminRouter.delete("/delete/faculty", userAuth, async (req, res) => {
  try {
    const { role } = req.user;
    if (role === "admin") {
      const { _id } = req.body;
      const faculty = await MasterFaculty.findByIdAndDelete(_id);
      if (!faculty) {
        throw new Error("Student data is not available Unable to delete...");
      } else {
        res
          .status(200)
          .json({ messgae: "Student data deleted sucessfully..", faculty });
      }
    } else {
      throw new Error("Admin not verified....");
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong : " + error.message });
  }
});

adminRouter.patch("/update/courses/faculty", userAuth, async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== "admin") {
      throw new Error("Admin not verified.");
    }

    const { courses, _id } = req.body;

    const faculty = await MasterFaculty.findByIdAndUpdate(
      _id,
      { courses },
      { new: true }
    );

    if (!faculty) {
      throw new Error("Faculty not found");
    }

    await Promise.all(
      courses.map(async (courseId) => {
        await Courses.findByIdAndUpdate(
          courseId,
          { $addToSet: { faculties: faculty._id } },
          { new: true }
        );
      })
    );

    res.status(200).json({
      message: "Faculty and course relationship updated successfully",
      data: faculty,
    });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong: " + error.message });
  }
});

adminRouter.patch("/activate/faculty", userAuth, async (req, res) => {
  try {
    const { role } = req.user;
    const { _id } = req.body;
    if (role === "admin") {
      const existingFaculty = await Faculty.findByIdAndUpdate(_id, {
        is_verified: true,
      });
      const data = await existingFaculty.save();
      res.status(200).json({ message: "Faculty Verified..", data });
    } else {
      throw new Error("Admin not verified..");
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong : " + error.message });
  }
});

adminRouter.patch(
  "/update/courses/second/faculty",
  userAuth,
  async (req, res) => {
    try {
      const { role } = req.user;

      if (role === "admin") {
        const { courses, faculty_id } = req.body;
        const existingFaculty = await Faculty.findByIdAndUpdate(faculty_id, {
          courses,
        });
        const data = await existingFaculty.save();
        res.status(200).json({ message: "Courses added..", data });
      } else {
        throw new Error("Admin not verified..");
      }
    } catch (error) {
      res
        .status(400)
        .json({ message: "Something went wrong : " + error.message });
    }
  }
);

// Courses

adminRouter.get("/view/courses", async (req, res) => {
  try {
    const courses = await Courses.find();
    res.status(200).json({ message: "Data Fetched..", courses });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong : " + error.message });
  }
});

adminRouter.post("/add/course", userAuth, async (req, res) => {
  try {
    const { role } = req.user;

    if (role !== "admin") {
      throw new Error("Admin not verified...");
    }

    const { course_id, name, credits, faculties, semester } = req.body;

    const existingCourse = await Courses.findOne({ course_id });
    if (existingCourse) {
      throw new Error("Course already exists!");
    }

    const newCourse = new Courses({
      course_id,
      name,
      credits,
      faculties,
      semester,
    });

    const savedCourse = await newCourse.save();

    if (faculties && faculties.length >= 0) {
      await Promise.all(
        faculties?.map(async (facultyId) => {
          await MasterFaculty.findByIdAndUpdate(
            facultyId,
            { $addToSet: { courses: savedCourse._id } },
            { new: true }
          );
        })
      );
    }

    res.status(200).json({
      message: "Course added and linked with faculties successfully.",
      data: savedCourse,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong: " + error.message,
    });
  }
});

adminRouter.delete("/delete/course", userAuth, async (req, res) => {
  try {
    const { role } = req.user;
    const { course_id } = req.body;
    if (role === "admin") {
      const course = await Courses.findByIdAndDelete(course_id);
      res.status(200).json({ message: "Course deleted sucessfully..", course });
    } else {
      throw new Error("Admin not verified..");
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong : " + error.message });
  }
});

// TimeTable
adminRouter.post("/add/timetable", userAuth, async (req, res) => {
  const role = req.user.role;
  try {
    if (role != "admin") {
      throw new Error("Admin not verified!");
    } else {
      const { class_id, day, slots, semester } = req.body;
      const existingTimeTable = await Timetable.findOne({ class_id });
      if (existingTimeTable) {
        throw new Error("Time Table already exisits.");
      }
      const newTimetable = new Timetable({
        class_id,
        day,
        slots,
        semester: semester,
      });

      const savedTimetable = await newTimetable.save();
      res
        .status(201)
        .json({ message: "Timetable created successfully!", savedTimetable });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating timetable", error: error.message });
  }
});

adminRouter.get("/view/timetable", async (req, res) => {
  try {
    const timetables = await Timetable.find()
      .populate("slots.subject", "name course_id")
      .populate("slots.faculty", "name");

    res.status(200).json({ message: "Data feteched successfully", timetables });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching timetables", error: error.message });
  }
});
adminRouter.get("/view/timetable/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const timetables = await Timetable.findById({ _id: id })
      .populate("slots.subject", "name course_id")
      .populate("slots.faculty", "name");

    res.status(200).json({ message: "Data feteched successfully", timetables });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching timetables", error: error.message });
  }
});

adminRouter.delete("/delete/timetable", userAuth, async (req, res) => {
  try {
    const { role } = req.user;
    const { _id } = req.body;
    if (role === "admin") {
      const timetable = await Timetable.findByIdAndDelete(_id);
      if (!timetable) {
        throw new Error("Timetable not found");
      }
      res
        .status(200)
        .json({ messgae: "Timetable deleted sucessfully.", timetable });
    } else {
      throw new Error("Admin not verified.");
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong : " + error.message });
  }
});

module.exports = adminRouter;
