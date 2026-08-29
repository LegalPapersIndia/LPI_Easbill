import DashboardLayout from "../../components/layout/DashboardLayout";
import SettingsLayout from "../../components/settings/SettingsLayout";
import BusinessSettingsForm from "../../components/settings/BusinessSettingsForm";

export default function BusinessSettings() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">Business Settings</h1>
        <p className="text-sm text-ink-muted mt-1">Manage your company details.</p>
      </div>

      <SettingsLayout>
        <BusinessSettingsForm />
      </SettingsLayout>
    </DashboardLayout>
  );
}