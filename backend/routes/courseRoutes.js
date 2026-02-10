const express = require("express");
const Course = require("../models/Course");
const User = require("../models/User");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// GET all courses
router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// GET single course
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Course ID missing" });

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// CREATE course (Admin)
router.post("/",protect, adminOnly, async (req, res) => {
  const course = await Course.create(req.body);
  res.json({ message: "Course created", course });
});

// UPDATE course (Admin)
router.put("/:id", protect, adminOnly, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ message: "Course updated", course });
});

// DELETE course (Admin)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: "Course deleted" });
});

// ENROLL course (User)
router.post("/enroll/:courseId", protect, async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user.enrolledCourses.includes(req.params.courseId)) {
    return res.status(400).json({ message: "Already enrolled" });
  }

  user.enrolledCourses.push(req.params.courseId);
  await user.save();

  res.json({ message: "Course enrolled successfully" });
});

// USER enrolled courses
router.get("/user/enrolled", protect, async (req, res) => {
  const user = await User.findById(req.user.id).populate("enrolledCourses");
  res.json(user.enrolledCourses);
});

module.exports = router;
