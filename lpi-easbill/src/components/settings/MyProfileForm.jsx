// import { useState } from "react";
// import { Camera, X } from "lucide-react";
// import { currentUser } from "../../data/dummyData";

// export default function MyProfileForm() {
//   const [form, setForm] = useState(currentUser);
//   const [avatarPreview, setAvatarPreview] = useState(null);
//   const [passwordForm, setPasswordForm] = useState({ current: "", newPass: "", confirm: "" });

//   const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
//   const handlePasswordChange = (field, value) => setPasswordForm((prev) => ({ ...prev, [field]: value }));

//   const handleAvatarUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) setAvatarPreview(URL.createObjectURL(file));
//   };

//   const handleSaveProfile = () => {
//     console.log("Profile saved (dummy):", form);
//     alert("Profile update ho gaya! (Console mein dekho — abhi backend connect nahi hai)");
//   };

//   const handleChangePassword = () => {
//     if (!passwordForm.current || !passwordForm.newPass) return alert("Sab fields bharo");
//     if (passwordForm.newPass !== passwordForm.confirm) return alert("New password aur confirm password match nahi kar rahe");
//     console.log("Password changed (dummy)");
//     alert("Password change ho gaya! (Abhi backend connect nahi hai)");
//     setPasswordForm({ current: "", newPass: "", confirm: "" });
//   };

//   const roleStyle = {
//     Admin: "bg-brand-light text-brand",
//     Accountant: "bg-status-pending/10 text-status-pending",
//     "Sales Staff": "bg-status-paid/10 text-status-paid",
//   };

//   return (
//     <div className="space-y-4">
//       {/* Avatar + Basic Info */}
//       <div className="bg-white border border-border rounded-xl p-4 sm:p-5">
//         <div className="flex flex-col sm:flex-row gap-5">
//           <div>
//             <label className="text-xs font-medium text-ink-muted block mb-2">Profile Photo</label>
//             <label className="relative w-24 h-24 rounded-full border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-brand transition-colors overflow-hidden bg-paper">
//               {avatarPreview ? (
//                 <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
//               ) : (
//                 <span className="font-display font-semibold text-2xl text-brand">
//                   {form.name.charAt(0)}
//                 </span>
//               )}
//               <div className="absolute bottom-0 right-0 bg-brand text-white p-1.5 rounded-full">
//                 <Camera size={12} />
//               </div>
//               <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
//             </label>
//           </div>

//           <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="text-xs font-medium text-ink-muted">Full Name *</label>
//               <input
//                 value={form.name}
//                 onChange={(e) => handleChange("name", e.target.value)}
//                 className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
//               />
//             </div>
//             <div>
//               <label className="text-xs font-medium text-ink-muted">Role</label>
//               <div className="mt-1">
//                 <span className={`inline-block text-xs px-3 py-2 rounded-lg font-medium ${roleStyle[form.role]}`}>
//                   {form.role}
//                 </span>
//               </div>
//             </div>
//             <div>
//               <label className="text-xs font-medium text-ink-muted">Email</label>
//               <input
//                 type="email"
//                 value={form.email}
//                 onChange={(e) => handleChange("email", e.target.value)}
//                 className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
//               />
//             </div>
//             <div>
//               <label className="text-xs font-medium text-ink-muted">Phone Number</label>
//               <input
//                 value={form.phone}
//                 onChange={(e) => handleChange("phone", e.target.value)}
//                 className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-end mt-4 pt-4 border-t border-border">
//           <button
//             onClick={handleSaveProfile}
//             className="bg-brand text-white font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-brand-dark transition-colors"
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>

//       {/* Change Password */}
//       <div className="bg-white border border-border rounded-xl p-4 sm:p-5">
//         <p className="font-display font-semibold text-ink mb-1">Change Password</p>
//         <p className="text-xs text-ink-muted mb-4">Apna password update karo, security ke liye.</p>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
//           <div>
//             <label className="text-xs font-medium text-ink-muted">Current Password</label>
//             <input
//               type="password"
//               value={passwordForm.current}
//               onChange={(e) => handlePasswordChange("current", e.target.value)}
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
//             />
//           </div>
//           <div>
//             <label className="text-xs font-medium text-ink-muted">New Password</label>
//             <input
//               type="password"
//               value={passwordForm.newPass}
//               onChange={(e) => handlePasswordChange("newPass", e.target.value)}
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
//             />
//           </div>
//           <div>
//             <label className="text-xs font-medium text-ink-muted">Confirm New Password</label>
//             <input
//               type="password"
//               value={passwordForm.confirm}
//               onChange={(e) => handlePasswordChange("confirm", e.target.value)}
//               className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
//             />
//           </div>
//         </div>

//         <div className="flex justify-end mt-4">
//           <button
//             onClick={handleChangePassword}
//             className="border border-brand text-brand font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-brand-light transition-colors"
//           >
//             Update Password
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { changePassword } from "../../api/userApi";

export default function MyProfileForm() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    try {
      setLoading(true);
      await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      setSuccess("Password changed successfully");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Info Card */}
        <div className="lg:col-span-1 bg-white border border-border rounded-xl p-5 h-fit">
          <p className="font-display font-semibold text-ink mb-4">Profile Info</p>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-ink-muted">
              <User size={15} />
              <span className="text-ink">{user.name}</span>
            </div>
            <div className="flex items-center gap-2 text-ink-muted">
              <Mail size={15} />
              <span className="text-ink">{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-ink-muted">
              <Phone size={15} />
              <span className="text-ink">{user.phone}</span>
            </div>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="lg:col-span-2 bg-white border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck size={18} className="text-brand" />
            <p className="font-display font-semibold text-ink">Change Password</p>
          </div>

          {error && (
            <div className="mb-4 text-sm text-status-overdue bg-status-overdue/10 border border-status-overdue/20 rounded-lg px-3 py-2">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 text-sm text-status-paid bg-status-paid/10 border border-status-paid/20 rounded-lg px-3 py-2">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-ink-muted">Current Password</label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted w-4 h-4" />
                  <input
                    type={showCurrent ? "text" : "password"}
                    name="currentPassword"
                    value={form.currentPassword}
                    onChange={handleChange}
                    required
                    className="w-full h-11 pl-10 pr-10 rounded-lg border border-border focus:border-brand focus:outline-none text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted"
                  >
                    {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-ink-muted">New Password</label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted w-4 h-4" />
                  <input
                    type={showNew ? "text" : "password"}
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                    required
                    className="w-full h-11 pl-10 pr-10 rounded-lg border border-border focus:border-brand focus:outline-none text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted"
                  >
                    {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-ink-muted">Confirm New Password</label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted w-4 h-4" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full h-11 pl-10 pr-10 rounded-lg border border-border focus:border-brand focus:outline-none text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted"
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-brand hover:bg-brand-dark transition-colors text-white h-11 px-6 rounded-lg font-medium text-sm disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}