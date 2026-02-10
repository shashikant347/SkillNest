import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchEnrolled = async () => {
      try {
        const res = await API.get("/courses/user/enrolled");
        setCourses(res.data);
      } catch (error) {
        alert("Please login first!",error);
      }
    };

    fetchEnrolled();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">My Enrolled Courses</h2>

      {courses.length === 0 ? (
        <p>No courses enrolled yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course._id} className="border p-4 rounded shadow">
              <h3 className="text-xl font-bold">{course.title}</h3>
              <p>{course.description}</p>
              <p className="mt-2 font-semibold">{course.duration}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
