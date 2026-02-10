import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-10">

      {/* HERO SECTION */}
      <div className="bg-gray-200 p-10 rounded-md">
        <p className="text-gray-700 text-xl mb-2">hero section</p>

        <h1 className="text-4xl font-bold mb-4">
          Discover short courses & workshop
        </h1>

        <p className="text-gray-500 text-2xl mb-6">
          Learn web Dev , UI/UX , Marketing , and more
        </p>

        <Link
          to="/courses"
          className="text-2xl font-bold underline"
        >
          Explore Courses
        </Link>
      </div>

      {/* WHY SKILLNEST */}
      <h2 className="text-5xl font-bold mt-14 mb-10">Why SkillNest ?</h2>

      <div className="grid grid-cols-3 gap-10">
        <div className="bg-gray-200 p-8 text-2xl font-bold">
          Expert mentors
        </div>

        <div className="bg-gray-200 p-8 text-2xl font-bold">
          flexibale learning
        </div>

        <div className="bg-gray-200 p-8 text-2xl font-bold">
          Affordable price
        </div>
      </div>

      {/* POPULAR COURSES */}
      <h2 className="text-5xl font-bold mt-16 mb-10">Popular courses</h2>

      <div className="grid grid-cols-3 gap-10">
        <div className="bg-gray-200 p-10 text-3xl font-bold">
          Web Development
        </div>

        <div className="bg-gray-200 p-10 text-3xl font-bold">
          UI/UX Design
        </div>

        <div className="bg-gray-200 p-10 text-3xl font-bold">
          Digital Marketing
        </div>
      </div>
    </div>
  );
}

