import SalesInvoice from "../models/SalesInvoice.js";
import PurchaseInvoice from "../models/PurchaseInvoice.js";
import Item from "../models/Item.js";

export const getDashboardData = async (req, res) => {
  try {
    const companyId = req.companyId;

    // ── Current month ka range ──
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    // ── Sab Sales aur Purchase invoices lao (stats + trend dono ke liye) ──
    const allSales = await SalesInvoice.find({ companyId, isDraft: false });
    const allPurchases = await PurchaseInvoice.find({ companyId });

    // ── STATS ──
    const totalSalesThisMonth = allSales
      .filter((inv) => inv.date >= startOfMonth && inv.date <= endOfMonth)
      .reduce((sum, inv) => sum + inv.grandTotal, 0);

    const totalPurchaseThisMonth = allPurchases
      .filter((p) => p.date >= startOfMonth && p.date <= endOfMonth)
      .reduce((sum, p) => sum + p.grandTotal, 0);

    const outstandingReceivable = allSales
      .filter((inv) => inv.amountReceived < inv.grandTotal)
      .reduce((sum, inv) => sum + (inv.grandTotal - inv.amountReceived), 0);

    const outstandingPayable = allPurchases
      .filter((p) => p.amountPaid < p.grandTotal)
      .reduce((sum, p) => sum + (p.grandTotal - p.amountPaid), 0);

    // ── SALES TREND — pichhle 6 mahine ──
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const salesTrend = [];
    for (let i = 5; i >= 0; i--) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
      const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0, 23, 59, 59);

      const monthSales = allSales
        .filter((inv) => inv.date >= monthStart && inv.date <= monthEnd)
        .reduce((sum, inv) => sum + inv.grandTotal, 0);

      salesTrend.push({ month: monthNames[monthDate.getMonth()], sales: monthSales });
    }

    // ── RECENT INVOICES — last 5 ──
    const recentInvoices = await SalesInvoice.find({ companyId, isDraft: false })
      .populate("customerId", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    const recentInvoicesFormatted = recentInvoices.map((inv) => ({
      _id: inv._id,
      invoiceNo: inv.invoiceNo,
      customerName: inv.customerId?.name || "N/A",
      date: inv.date,
      total: inv.grandTotal,
      status: inv.amountReceived >= inv.grandTotal ? "paid" : inv.amountReceived > 0 ? "partial" : "pending",
    }));

    // ── LOW STOCK ITEMS ──
    const lowStockItems = await Item.find({
      companyId,
      itemType: "Product",
      lowStockEnabled: true,
      $expr: { $lte: ["$stockQty", "$lowStockThreshold"] },
    }).limit(10);

    const lowStockFormatted = lowStockItems.map((i) => ({
      _id: i._id,
      name: i.name,
      stockQty: i.stockQty,
      unit: i.unit,
    }));

    res.status(200).json({
      success: true,
      stats: {
        totalSalesThisMonth,
        totalPurchaseThisMonth,
        outstandingReceivable,
        outstandingPayable,
      },
      salesTrend,
      recentInvoices: recentInvoicesFormatted,
      lowStockItems: lowStockFormatted,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// ── SALES TREND (separate, filterable) ──
export const getSalesTrend = async (req, res) => {
  try {
    const companyId = req.companyId;
    const { range } = req.query; // "monthly" (default) ya "daily"

    const allSales = await SalesInvoice.find({ companyId, isDraft: false });
    const now = new Date();
    const salesTrend = [];

    if (range === "daily") {
      // ── Pichhle 30 din, day-wise ──
      for (let i = 29; i >= 0; i--) {
        const day = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
        const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate());
        const dayEnd = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23, 59, 59);

        const daySales = allSales
          .filter((inv) => inv.date >= dayStart && inv.date <= dayEnd)
          .reduce((sum, inv) => sum + inv.grandTotal, 0);

        salesTrend.push({
          label: day.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
          sales: daySales,
        });
      }
    } else {
      // ── Pichhle 6 mahine (default) ──
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      for (let i = 5; i >= 0; i--) {
        const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
        const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0, 23, 59, 59);

        const monthSales = allSales
          .filter((inv) => inv.date >= monthStart && inv.date <= monthEnd)
          .reduce((sum, inv) => sum + inv.grandTotal, 0);

        salesTrend.push({ label: monthNames[monthDate.getMonth()], sales: monthSales });
      }
    }

    res.status(200).json({ success: true, salesTrend });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};