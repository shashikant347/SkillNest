import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold">Welcome to SkillNest</h1>
      <p className="mt-4 text-gray-600">
        Discover short courses and workshops easily.
      </p>

      <Link
        to="/courses"
        className="inline-block mt-6 bg-orange-600 text-white px-6 py-2 rounded"
      >
        Explore Courses
      </Link>
    </div>
  );
}
