import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-orange-600 text-white">
      <h1 className="text-xl font-bold">
        <Link to="/">SkillNest</Link>
      </h1>

      <div className="flex gap-4 items-center">
        <Link to="/courses">Courses</Link>

        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>

            {user?.role === "admin" && <Link to="/admin">Admin</Link>}

            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
