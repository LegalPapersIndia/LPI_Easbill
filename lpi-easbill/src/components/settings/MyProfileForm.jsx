import { useState } from "react";
import { Camera, X } from "lucide-react";
import { currentUser } from "../../data/dummyData";

export default function MyProfileForm() {
  const [form, setForm] = useState(currentUser);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [passwordForm, setPasswordForm] = useState({ current: "", newPass: "", confirm: "" });

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
  const handlePasswordChange = (field, value) => setPasswordForm((prev) => ({ ...prev, [field]: value }));

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSaveProfile = () => {
    console.log("Profile saved (dummy):", form);
    alert("Profile update ho gaya! (Console mein dekho — abhi backend connect nahi hai)");
  };

  const handleChangePassword = () => {
    if (!passwordForm.current || !passwordForm.newPass) return alert("Sab fields bharo");
    if (passwordForm.newPass !== passwordForm.confirm) return alert("New password aur confirm password match nahi kar rahe");
    console.log("Password changed (dummy)");
    alert("Password change ho gaya! (Abhi backend connect nahi hai)");
    setPasswordForm({ current: "", newPass: "", confirm: "" });
  };

  const roleStyle = {
    Admin: "bg-brand-light text-brand",
    Accountant: "bg-status-pending/10 text-status-pending",
    "Sales Staff": "bg-status-paid/10 text-status-paid",
  };

  return (
    <div className="space-y-4">
      {/* Avatar + Basic Info */}
      <div className="bg-white border border-border rounded-xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row gap-5">
          <div>
            <label className="text-xs font-medium text-ink-muted block mb-2">Profile Photo</label>
            <label className="relative w-24 h-24 rounded-full border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-brand transition-colors overflow-hidden bg-paper">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="font-display font-semibold text-2xl text-brand">
                  {form.name.charAt(0)}
                </span>
              )}
              <div className="absolute bottom-0 right-0 bg-brand text-white p-1.5 rounded-full">
                <Camera size={12} />
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            </label>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-ink-muted">Full Name *</label>
              <input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ink-muted">Role</label>
              <div className="mt-1">
                <span className={`inline-block text-xs px-3 py-2 rounded-lg font-medium ${roleStyle[form.role]}`}>
                  {form.role}
                </span>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-ink-muted">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ink-muted">Phone Number</label>
              <input
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand tabular-num"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4 pt-4 border-t border-border">
          <button
            onClick={handleSaveProfile}
            className="bg-brand text-white font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-brand-dark transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white border border-border rounded-xl p-4 sm:p-5">
        <p className="font-display font-semibold text-ink mb-1">Change Password</p>
        <p className="text-xs text-ink-muted mb-4">Apna password update karo, security ke liye.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
          <div>
            <label className="text-xs font-medium text-ink-muted">Current Password</label>
            <input
              type="password"
              value={passwordForm.current}
              onChange={(e) => handlePasswordChange("current", e.target.value)}
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-ink-muted">New Password</label>
            <input
              type="password"
              value={passwordForm.newPass}
              onChange={(e) => handlePasswordChange("newPass", e.target.value)}
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-ink-muted">Confirm New Password</label>
            <input
              type="password"
              value={passwordForm.confirm}
              onChange={(e) => handlePasswordChange("confirm", e.target.value)}
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleChangePassword}
            className="border border-brand text-brand font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-brand-light transition-colors"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}