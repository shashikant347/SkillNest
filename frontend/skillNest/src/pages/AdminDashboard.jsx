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
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>

      <form onSubmit={addCourse} className="border p-4 rounded mb-6">
        <h3 className="text-xl font-bold mb-3">Add New Course</h3>

        <input
          type="text"
          placeholder="Title"
          className="border p-2 w-full mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          className="border p-2 w-full mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Duration"
          className="border p-2 w-full mb-3"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          className="border p-2 w-full mb-3"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button className="bg-orange-600 text-white px-6 py-2 rounded">
          Add Course
        </button>
      </form>

      <h3 className="text-2xl font-bold mb-4">All Courses</h3>

      <div className="grid grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-bold">{course.title}</h3>
            <p>{course.description}</p>
            <p className="mt-2">{course.duration}</p>
            <p>₹{course.price}</p>

            <button
              onClick={() => deleteCourse(course._id)}
              className="mt-3 bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
