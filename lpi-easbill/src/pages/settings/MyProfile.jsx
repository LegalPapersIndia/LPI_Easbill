import DashboardLayout from "../../components/layout/DashboardLayout";
import SettingsLayout from "../../components/settings/SettingsLayout";
import MyProfileForm from "../../components/settings/MyProfileForm";

export default function MyProfile() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">My Profile</h1>
        <p className="text-sm text-ink-muted mt-1">Manage your profile details and password.</p>
      </div>

      <SettingsLayout>
        <MyProfileForm />
      </SettingsLayout>
    </DashboardLayout>
  );
}