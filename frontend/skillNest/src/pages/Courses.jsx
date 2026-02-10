import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await API.get("/courses");
      setCourses(res.data);
    };

    fetchCourses();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">All Courses</h2>

      <div className="grid grid-cols-3 gap-6">
        {courses
          .filter((course) => course._id) // only courses with _id
          .map((course) => {
            console.log("Course object:", course);
            return (
              <div key={course._id} className="border p-4 rounded shadow">
                <h3 className="text-xl font-bold">{course.title}</h3>
                <p className="text-gray-600">{course.description}</p>
                <p className="mt-2 font-semibold">
                  Duration: {course.duration}
                </p>
                <p className="font-semibold">Price: ₹{course.price}</p>

                <Link
                  to={`/courses/${course._id}`}
                  className="inline-block mt-3 bg-orange-600 text-white px-4 py-2 rounded"
                >
                  View Details
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}
