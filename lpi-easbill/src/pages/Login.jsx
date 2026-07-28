import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Receipt } from "lucide-react";
import { loginUser } from "../api/authApi";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const { data } = await loginUser(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-6 sm:p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#1D4ED8] flex items-center justify-center mb-3">
            <Receipt className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-[#0F172A] font-display">BillFlow</h1>
        </div>

        <h2 className="text-lg font-semibold text-[#0F172A] mb-1">Welcome back</h2>
        <p className="text-sm text-[#64748B] mb-5">Login to manage your billing.</p>

        {error && (
          <div className="mb-4 text-sm text-[#DC2626] bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] w-4 h-4" />
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email or Phone Number"
              required
              className="w-full h-11 pl-10 pr-4 rounded-lg border border-[#E2E8F0] focus:border-[#1D4ED8] focus:outline-none text-sm"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] w-4 h-4" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full h-11 pl-10 pr-10 rounded-lg border border-[#E2E8F0] focus:border-[#1D4ED8] focus:outline-none text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1D4ED8] hover:bg-[#1E3A8A] transition-colors text-white h-11 rounded-lg font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
            <ArrowRight size={16} />
          </button>
        </form>

        <p className="text-center text-[#64748B] text-sm mt-5">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#1D4ED8] font-medium">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}