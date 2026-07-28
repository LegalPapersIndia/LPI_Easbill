import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, KeyRound, Receipt } from "lucide-react";
import { sendOtp, verifyRegister } from "../api/authApi";

export default function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    if (step !== 2) return;
    setResendTimer(60);
    setCanResend(false);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Invalid phone number. Must be 10 digits starting with 6-9");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format");
      return;
    }

    try {
      setLoading(true);
      await sendOtp(formData);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      setError("Please enter 6 digit OTP");
      return;
    }

    try {
      setLoading(true);
      const { data } = await verifyRegister({ phone: formData.phone, otp });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    try {
      setLoading(true);
      await sendOtp(formData);
      setResendTimer(60);
      setCanResend(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
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

        {step === 1 && (
          <>
            <h2 className="text-lg font-semibold text-[#0F172A] mb-1">Create your account</h2>
            <p className="text-sm text-[#64748B] mb-5">Start managing your billing in minutes.</p>

            {error && (
              <div className="mb-4 text-sm text-[#DC2626] bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] w-4 h-4" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full h-11 pl-10 pr-4 rounded-lg border border-[#E2E8F0] focus:border-[#1D4ED8] focus:outline-none text-sm"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] w-4 h-4" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="w-full h-11 pl-10 pr-4 rounded-lg border border-[#E2E8F0] focus:border-[#1D4ED8] focus:outline-none text-sm"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] w-4 h-4" />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number (10 digits)"
                  maxLength={10}
                  required
                  className="w-full h-11 pl-10 pr-4 rounded-lg border border-[#E2E8F0] focus:border-[#1D4ED8] focus:outline-none text-sm tabular-num"
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
                {loading ? "Sending OTP..." : "Send OTP"}
                <ArrowRight size={16} />
              </button>
            </form>

            <p className="text-center text-[#64748B] text-sm mt-5">
              Already have an account?{" "}
              <Link to="/login" className="text-[#1D4ED8] font-medium">
                Login
              </Link>
            </p>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-lg font-semibold text-[#0F172A] mb-1">Enter OTP</h2>
            <p className="text-sm text-[#64748B] mb-5">
              6-digit OTP sent to <strong>{formData.phone}</strong> (check backend terminal for now)
            </p>

            {error && (
              <div className="mb-4 text-sm text-[#DC2626] bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-3">
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] w-4 h-4" />
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  required
                  className="w-full h-11 pl-10 pr-4 rounded-lg border border-[#E2E8F0] focus:border-[#1D4ED8] focus:outline-none text-center text-lg tracking-widest font-semibold"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1D4ED8] hover:bg-[#1E3A8A] transition-colors text-white h-11 rounded-lg font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? "Verifying..." : "Verify & Register"}
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-center text-[#64748B] hover:text-[#0F172A] text-sm transition-colors"
              >
                ← Back to Registration
              </button>

              <div className="text-center">
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={loading}
                    className="text-[#1D4ED8] font-medium text-sm"
                  >
                    Resend OTP
                  </button>
                ) : (
                  <p className="text-[#64748B] text-sm">
                    Resend OTP in <span className="font-semibold text-[#0F172A]">{resendTimer}s</span>
                  </p>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
}