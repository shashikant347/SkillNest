import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  console.log("Course ID from URL:", id);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await API.get(`/courses/${id}`);
      console.log("Fetched course data:", res.data);
      setCourse(res.data);
    };

    fetchCourse();
  }, [id]);

  const enrollCourse = async () => {
    try {
      await API.post(`/courses/enroll/${id}`);
      alert("Enrolled Successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Enroll Failed");
    }
  };

  if (!course) return <h2 className="text-center mt-20">Loading...</h2>;

  return (
    <div className="p-10">
      <h2 className="text-4xl font-bold">{course.title}</h2>
      <p className="mt-4 text-gray-700">{course.description}</p>

      <p className="mt-4 font-semibold">Duration: {course.duration}</p>
      <p className="font-semibold">Price: ₹{course.price}</p>

      <button
        onClick={enrollCourse}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded"
      >
        Enroll Now
      </button>
    </div>
  );
}
