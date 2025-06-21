import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "./AuthCard";
import HeaderSection from "./HeaderSection";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

export default function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(process.env.REACT_APP_BASE_URL + "blogs/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        redirect: "follow",
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Login successful");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user || {}));
        localStorage.setItem("email", formData.email);
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error(data.message || "Invalid email or password");
      }
    } catch (error) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <HeaderSection>
     <Helmet>
      <title>Login - MindSpring</title>
  <meta name="description" content="View your favorite blogs on your personalized dashboard." />
  <meta name="keywords" content="blogs, favorites, dashboard, user, blog app" />
  <meta name="author" content="MindSpring" />
</Helmet>
      <AuthCard title="Login">
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F6F52]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F6F52]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#4F6F52] hover:bg-[#3d5742] text-white font-semibold py-2 rounded-lg ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-center mt-4 text-gray-600">
            Don’t have an account?{" "}
            <a href="/signup" className="text-[#4F6F52] hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </AuthCard>
    </HeaderSection>
  );
}
