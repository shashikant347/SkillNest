import { useEffect, useState } from "react";
import API from "../api";

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const addCourse = async (e) => {
    e.preventDefault();
    try {
      await API.post("/courses", { title, description, duration, price });
      alert("Course Added!");
      fetchCourses();

      setTitle("");
      setDescription("");
      setDuration("");
      setPrice("");
    } catch (error) {
      alert(error.response?.data?.message || "Only Admin can add course");
    }
  };

  const deleteCourse = async (id) => {
    try {
      await API.delete(`/courses/${id}`);
      alert("Course Deleted!");
      fetchCourses();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="flex">

      {/* SIDEBAR */}
      <div className="w-64 border-r min-h-screen p-6">
        <h2 className="text-2xl font-bold mb-10">Dashboard</h2>

        <ul className="space-y-8 text-xl font-semibold">
          <li>Dashboard</li>
          <li>Courses</li>
          <li>Students</li>
          <li>Add Course</li>
          <li>Logout</li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-10">
        <h1 className="text-5xl font-bold mb-10">Admin Dashboard</h1>

        {/* TOP BOXES */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          <div className="border p-6">
            <h3 className="text-xl font-bold">Total Courses</h3>
            <p className="text-4xl text-gray-400 font-bold mt-4">
              {courses.length}
            </p>
          </div>

          <div className="border p-6">
            <h3 className="text-xl font-bold">Total Students</h3>
            <p className="text-4xl text-gray-400 font-bold mt-4">00</p>
          </div>

          <div className="border p-6">
            <h3 className="text-xl font-bold">Revenue</h3>
            <p className="text-4xl text-gray-400 font-bold mt-4">00</p>
          </div>
        </div>

        {/* ADD COURSE FORM */}
        <form onSubmit={addCourse} className="border p-6 mb-10">
          <h2 className="text-3xl font-bold mb-6">Add New Course</h2>

          <input
            type="text"
            placeholder="Title"
            className="border p-3 w-full mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Description"
            className="border p-3 w-full mb-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="text"
            placeholder="Duration"
            className="border p-3 w-full mb-4"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            className="border p-3 w-full mb-4"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <button className="border px-6 py-2 font-bold">
            Add Course
          </button>
        </form>

        {/* COURSES LIST TABLE */}
        <h2 className="text-4xl font-bold mb-6">Courses List</h2>

        <div className="border">
          {/* Table Header */}
          <div className="grid grid-cols-4 bg-gray-200 p-4 font-bold text-xl">
            <p>Course Name</p>
            <p>Duration</p>
            <p>Price</p>
            <p>Action</p>
          </div>

          {/* Table Rows */}
          {courses.map((course) => (
            <div
              key={course._id}
              className="grid grid-cols-4 p-6 border-t items-center text-lg"
            >
              <p>{course.title}</p>
              <p className="text-gray-500">{course.duration}</p>
              <p className="text-gray-500">₹{course.price}</p>

              <div className="flex gap-4">
                <button className="border px-6 py-2 font-bold">
                  Edit
                </button>

                <button
                  onClick={() => deleteCourse(course._id)}
                  className="border px-6 py-2 font-bold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
