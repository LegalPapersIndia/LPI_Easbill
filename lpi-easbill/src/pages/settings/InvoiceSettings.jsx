import DashboardLayout from "../../components/layout/DashboardLayout";
import SettingsLayout from "../../components/settings/SettingsLayout";
import InvoiceSettingsForm from "../../components/settings/InvoiceSettingsForm";

export default function InvoiceSettings() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink">Invoice Settings</h1>
        <p className="text-sm text-ink-muted mt-1">Invoice print/PDF layout customize karo.</p>
      </div>

      <SettingsLayout>
        <InvoiceSettingsForm />
      </SettingsLayout>
    </DashboardLayout>
  );
}