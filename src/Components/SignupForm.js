import { useState } from "react";
import AuthCard from "./AuthCard";
import HeaderSection from "./HeaderSection";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

Modal.setAppElement("#root");

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [emailForOtp, setEmailForOtp] = useState("");

  const [signupLoading, setSignupLoading] = useState(false);
  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);
  const [resendOtpLoading, setResendOtpLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignupLoading(true);
    try {
      const res = await fetch("https://blog-mern-jzhb.onrender.com/blogs/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setEmailForOtp(formData.email);
        setShowOtpModal(true);
      } else if (data.message === "User already exists and is verified") {
        toast.error("User already exists and is verified. Please login.");
        setShowOtpModal(false);
        setOtp("");
        setFormData({ name: "", email: "", password: "" });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setSignupLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setVerifyOtpLoading(true);
    try {
      const res = await fetch("https://blog-mern-jzhb.onrender.com/blogs/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailForOtp, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setShowOtpModal(false);
        setOtp("");
        setFormData({ name: "", email: "", password: "" });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(data.message || "OTP verification failed");
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setVerifyOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendOtpLoading(true);
    try {
      const res = await fetch("https://blog-mern-jzhb.onrender.com/blogs/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("OTP resent successfully");
      } else {
        toast.error(data.message || "Resend failed");
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setResendOtpLoading(false);
    }
  };

  return (
    <HeaderSection>
     <Helmet>
      <title>Signup - MindSpring</title>
  <meta name="description" content="View your favorite blogs on your personalized dashboard." />
  <meta name="keywords" content="blogs, favorites, dashboard, user, blog app" />
  <meta name="author" content="MindSpring" />
</Helmet>
      <AuthCard title="Create an Account">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F6F52]"
              required
            />
          </div>

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
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F6F52]"
              required
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
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F6F52]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={signupLoading}
            className={`w-full bg-[#4F6F52] hover:bg-[#3d5742] text-white font-semibold py-2 rounded-lg ${
              signupLoading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {signupLoading ? "Signing Up..." : "Sign Up"}
          </button>

          <p className="text-sm text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-[#4F6F52] hover:underline">
              Login
            </a>
          </p>
        </form>
      </AuthCard>
      <Modal
        isOpen={showOtpModal}
        onRequestClose={() => setShowOtpModal(false)}
        contentLabel="Verify OTP"
        className="bg-white p-6 rounded-md max-w-sm mx-auto mt-32 border shadow-md"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-lg font-semibold mb-4">Enter OTP</h2>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
          placeholder="Enter OTP"
        />
        <button
          onClick={handleVerifyOtp}
          disabled={verifyOtpLoading}
          className={`bg-[#4F6F52] hover:bg-[#3d5742] text-white font-semibold px-4 py-2 rounded w-full ${
            verifyOtpLoading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {verifyOtpLoading ? "Verifying..." : "Verify OTP"}
        </button>
        <button
          onClick={handleResendOtp}
          disabled={resendOtpLoading}
          className={`text-sm text-blue-600 hover:underline mt-2 block text-center ${
            resendOtpLoading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {resendOtpLoading ? "Resending..." : "Resend OTP"}
        </button>
      </Modal>
    </HeaderSection>
  );
}
