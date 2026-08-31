import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import AdminBusinessDetailModal from "../components/AdminBusinessDetailModal";
import StatsCards from "../components/dashboard/StatsCards";
import BusinessList from "../components/dashboard/BusinessList";
import { getAllBusinesses, getStats, deleteUser } from "../api/adminApi";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");
      const [businessesRes, statsRes] = await Promise.all([getAllBusinesses(), getStats()]);
      setUsers(businessesRes.data.users);
      setStats(statsRes.data.stats);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("adminToken");
        navigate("/");
      } else {
        setError("Data load karne mein error aaya");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(
      `Kya aap "${name}" ko permanently delete karna chahte hain? Ye action wapas nahi ho sakta.`
    );
    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      setStats((prev) =>
        prev ? { ...prev, totalBusinesses: prev.totalBusinesses - 1 } : prev
      );
    } catch (err) {
      alert(err.response?.data?.message || "Delete karne mein error aaya");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-[#0F172A]">Dashboard</h1>
        <p className="text-sm text-[#64748B] mt-0.5">Platform and overview, from today.</p>
      </div>

      <StatsCards stats={stats} />

      {error && (
        <div className="mb-4 text-sm text-[#DC2626] bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <BusinessList
        users={users}
        loading={loading}
        onRefresh={fetchData}
        onView={setSelectedUser}
        onDelete={handleDelete}
        deletingId={deletingId}
      />

      {selectedUser && (
        <AdminBusinessDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </AdminLayout>
  );
}