
// Yahi structure future mein MongoDB API se aayega — isliye exact rakha hai

export const companyInfo = {
  name: "Legal Papers India",
  logo: null,
};

export const dashboardStats = {
  totalSalesThisMonth: 486200,
  totalPurchaseThisMonth: 218500,
  outstandingReceivable: 132400,
  outstandingPayable: 54300,
};

export const salesTrend = [
  { month: "Feb", sales: 320000 },
  { month: "Mar", sales: 358000 },
  { month: "Apr", sales: 410000 },
  { month: "May", sales: 389000 },
  { month: "Jun", sales: 452000 },
  { month: "Jul", sales: 486200 },
];

export const recentInvoices = [
  { _id: "inv1", invoiceNo: "INV-2026-014", customerName: "ABC Traders", date: "2026-07-14", total: 24500, status: "paid" },
  { _id: "inv2", invoiceNo: "INV-2026-013", customerName: "Shree Enterprises", date: "2026-07-13", total: 18200, status: "pending" },
  { _id: "inv3", invoiceNo: "INV-2026-012", customerName: "Kumar & Sons", date: "2026-07-11", total: 9800, status: "overdue" },
  { _id: "inv4", invoiceNo: "INV-2026-011", customerName: "Om Distributors", date: "2026-07-10", total: 32000, status: "paid" },
  { _id: "inv5", invoiceNo: "INV-2026-010", customerName: "Nova Textiles", date: "2026-07-09", total: 15400, status: "pending" },
];

export const lowStockItems = [
  { _id: "i1", name: "A4 Legal Paper Bundle", stockQty: 8, unit: "box" },
  { _id: "i2", name: "Stamp Paper Roll", stockQty: 3, unit: "pcs" },
  { _id: "i3", name: "Notary Seal Kit", stockQty: 5, unit: "pcs" },
];

export const categories = ["Stationery", "Legal Forms", "Stamp Papers", "Office Supplies", "Printing"];

export const itemsList = [
  {
    _id: "itm1",
    itemType: "Product",
    name: "A4 Legal Paper Bundle",
    sku: "LP-A4-001",
    category: "Stationery",
    purchasePrice: 320,
    purchasePriceType: "without_tax",
    salePrice: 420,
    salePriceType: "with_tax",
    gstPercent: 12,
    discountPercent: 0,
    hsnCode: "4802",
    stockQty: 8,
    unit: "box",
    altUnit: "",
    lowStockEnabled: true,
    lowStockThreshold: 10,
    description: "",
    asOfDate: "2026-07-01",
  },
  {
    _id: "itm2",
    itemType: "Product",
    name: "Stamp Paper Roll",
    sku: "SP-ROLL-002",
    category: "Stamp Papers",
    purchasePrice: 150,
    purchasePriceType: "without_tax",
    salePrice: 210,
    salePriceType: "with_tax",
    gstPercent: 5,
    discountPercent: 0,
    hsnCode: "4907",
    stockQty: 3,
    unit: "pcs",
    altUnit: "",
    lowStockEnabled: true,
    lowStockThreshold: 5,
    description: "",
    asOfDate: "2026-07-01",
  },
  {
    _id: "itm3",
    itemType: "Product",
    name: "Notary Seal Kit",
    sku: "NS-KIT-003",
    category: "Office Supplies",
    purchasePrice: 480,
    purchasePriceType: "without_tax",
    salePrice: 650,
    salePriceType: "with_tax",
    gstPercent: 18,
    discountPercent: 0,
    hsnCode: "8442",
    stockQty: 5,
    unit: "pcs",
    altUnit: "",
    lowStockEnabled: false,
    lowStockThreshold: 0,
    description: "",
    asOfDate: "2026-07-01",
  },
  {
    _id: "itm4",
    itemType: "Product",
    name: "Affidavit Format Booklet",
    sku: "AF-BK-004",
    category: "Legal Forms",
    purchasePrice: 60,
    purchasePriceType: "without_tax",
    salePrice: 90,
    salePriceType: "with_tax",
    gstPercent: 12,
    discountPercent: 0,
    hsnCode: "4901",
    stockQty: 45,
    unit: "pcs",
    altUnit: "",
    lowStockEnabled: false,
    lowStockThreshold: 0,
    description: "",
    asOfDate: "2026-07-01",
  },
  {
    _id: "itm5",
    itemType: "Product",
    name: "Office Letterhead Print (500)",
    sku: "PR-LH-005",
    category: "Printing",
    purchasePrice: 900,
    purchasePriceType: "without_tax",
    salePrice: 1250,
    salePriceType: "with_tax",
    gstPercent: 18,
    discountPercent: 0,
    hsnCode: "4911",
    stockQty: 22,
    unit: "set",
    altUnit: "",
    lowStockEnabled: true,
    lowStockThreshold: 15,
    description: "",
    asOfDate: "2026-07-01",
  },
];

export const unitOptions = ["PCS", "Box", "Set", "KG", "Litre", "Meter", "Dozen"];


export const companyProfile = {
  name: "Legal Papers India",
  state: "Uttar Pradesh",
  gstin: "09ABCDE1234F1Z5",
};

export const customersList = [
  { _id: "cust1", name: "ABC Traders", gstin: "09AAACT1234F1Z2", state: "Uttar Pradesh", phone: "9876543210" },
  { _id: "cust2", name: "Shree Enterprises", gstin: "27AAACS5678G1Z3", state: "Maharashtra", phone: "9123456780" },
  { _id: "cust3", name: "Kumar & Sons", gstin: "09AAACK9012H1Z4", state: "Uttar Pradesh", phone: "9988776655" },
  { _id: "cust4", name: "Om Distributors", gstin: "07AAACO3456I1Z5", state: "Delhi", phone: "9090909090" },
];

export const suppliersList = [
  { _id: "sup1", name: "Prakash Paper Mills", gstin: "09AABCP1234M1Z1", state: "Uttar Pradesh", phone: "9876501234" },
  { _id: "sup2", name: "National Stationery Co.", gstin: "27AABCN5678N1Z2", state: "Maharashtra", phone: "9123409876" },
  { _id: "sup3", name: "Delhi Print Supplies", gstin: "07AABCD9012O1Z3", state: "Delhi", phone: "9988001122" },
];


export const businessSettings = {
  businessName: "Legal Papers India",
  logo: null,
  phone: "9211037448",
  email: "info@legalpapersindia.com",
  billingAddress: "B-42, Sector 62, Industrial Area",
  state: "Uttar Pradesh",
  pincode: "201301",
  city: "Noida",
  isGstRegistered: true,
  gstin: "09ABCDE1234F1Z5",
  businessType: ["Service Provider"],
  industryType: "Legal Services",
  registrationType: "Private Limited Company",
  panNumber: "ABCDE1234F",
  accountHolderName: "Legal Papers India",
  bankName: "HDFC Bank",
  accountNumber: "50100123456789",
  ifscCode: "HDFC0001234",
  branchName: "Sector 62, Noida",
  paymentQrCode: null,
  signature: null,
  invoicePrefix: "INV-2026-",
  invoiceStartNumber: 1,
  defaultTerms: "1. Goods once sold will not be taken back or exchanged.\n2. All disputes are subject to Ghaziabad jurisdiction only.",
};

// export const stateCodeMap = {
//   "Andhra Pradesh": "37", "Arunachal Pradesh": "12", "Assam": "18", "Bihar": "10",
//   "Chhattisgarh": "22", "Delhi": "07", "Goa": "30", "Gujarat": "24", "Haryana": "06",
//   "Himachal Pradesh": "02", "Jharkhand": "20", "Karnataka": "29", "Kerala": "32",
//   "Madhya Pradesh": "23", "Maharashtra": "27", "Manipur": "14", "Meghalaya": "17",
//   "Mizoram": "15", "Nagaland": "13", "Odisha": "21", "Punjab": "03", "Rajasthan": "08",
//   "Sikkim": "11", "Tamil Nadu": "33", "Telangana": "36", "Tripura": "16",
//   "Uttar Pradesh": "09", "Uttarakhand": "05", "West Bengal": "19",
// };


export const stateCodeMap = {
  "Andaman and Nicobar Islands": "35",
  "Andhra Pradesh": "37",
  "Andhra Pradesh (Old)": "28",
  "Arunachal Pradesh": "12",
  "Assam": "18",
  "Bihar": "10",
  "Chandigarh": "04",
  "Chhattisgarh": "22",
  "Dadra and Nagar Haveli": "26",
  "Daman and Diu": "25",
  "Delhi": "07",
  "Goa": "30",
  "Gujarat": "24",
  "Haryana": "06",
  "Himachal Pradesh": "02",
  "Jammu and Kashmir": "01",
  "Jharkhand": "20",
  "Karnataka": "29",
  "Kerala": "32",
  "Lakshadweep Islands": "31",
  "Madhya Pradesh": "23",
  "Maharashtra": "27",
  "Manipur": "14",
  "Meghalaya": "17",
  "Mizoram": "15",
  "Nagaland": "13",
  "Odisha": "21",
  "Pondicherry": "34",
  "Punjab": "03",
  "Rajasthan": "08",
  "Sikkim": "11",
  "Tamil Nadu": "33",
  "Telangana": "36",
  "Tripura": "16",
  "Uttar Pradesh": "09",
  "Uttarakhand": "05",
  "West Bengal": "19",
};

export const indianStates = Object.keys(stateCodeMap);

export const businessTypeOptions = ["Retailer", "Wholesaler", "Distributor", "Manufacturer", "Service Provider"];
export const industryTypeOptions = ["Legal Services", "Stationery & Printing", "Consulting", "Trading", "Other"];
export const registrationTypeOptions = ["Proprietorship", "Partnership", "Private Limited Company", "LLP", "Public Limited Company"];


export const contactCategories = ["Retail Client", "Wholesale Client", "Regular Supplier", "One-time"];

export const contactsList = [
  {
    _id: "cn1",
    name: "ABC Traders",
    mobile: "9876543210",
    email: "",
    openingBalance: 0,
    balanceType: "collect",
    gstin: "09AAACT1234F1Z2",
    pan: "",
    contactType: "Customer",
    category: "Retail Client",
    billingAddress: "",
    shippingAddress: "",
    sameAsBilling: true,
    state: "Uttar Pradesh",
    creditPeriod: 30,
    creditLimit: 50000,
    contactPersonName: "",
    dob: "",
  },
  {
    _id: "cn2",
    name: "Shree Enterprises",
    mobile: "9123456780",
    email: "",
    openingBalance: 4500,
    balanceType: "collect",
    gstin: "27AAACS5678G1Z3",
    pan: "",
    contactType: "Customer",
    category: "Wholesale Client",
    billingAddress: "",
    shippingAddress: "",
    sameAsBilling: true,
    state: "Maharashtra",
    creditPeriod: 45,
    creditLimit: 100000,
    contactPersonName: "",
    dob: "",
  },
  {
    _id: "cn3",
    name: "Prakash Paper Mills",
    mobile: "9876501234",
    email: "",
    openingBalance: 12000,
    balanceType: "pay",
    gstin: "09AABCP1234M1Z1",
    pan: "",
    contactType: "Supplier",
    category: "Regular Supplier",
    billingAddress: "",
    shippingAddress: "",
    sameAsBilling: true,
    state: "Uttar Pradesh",
    creditPeriod: 15,
    creditLimit: 0,
    contactPersonName: "",
    dob: "",
  },
  {
    _id: "cn4",
    name: "National Stationery Co.",
    mobile: "9123409876",
    email: "",
    openingBalance: 0,
    balanceType: "pay",
    gstin: "27AABCN5678N1Z2",
    pan: "",
    contactType: "Supplier",
    category: "Regular Supplier",
    billingAddress: "",
    shippingAddress: "",
    sameAsBilling: true,
    state: "Maharashtra",
    creditPeriod: 30,
    creditLimit: 0,
    contactPersonName: "",
    dob: "",
  },
];



export const salesInvoicesList = [
  { _id: "si1", invoiceNo: "INV-2026-105", date: "2026-07-18", dueDate: "2026-08-17", customerId: "cn1", customerName: "ABC Traders", grandTotal: 24500, amountReceived: 24500 },
  { _id: "si2", invoiceNo: "INV-2026-104", date: "2026-07-16", dueDate: "2026-08-15", customerId: "cn2", customerName: "Shree Enterprises", grandTotal: 18200, amountReceived: 5000 },
  { _id: "si3", invoiceNo: "INV-2026-103", date: "2026-07-10", dueDate: "2026-07-20", customerId: "cn1", customerName: "ABC Traders", grandTotal: 9800, amountReceived: 0 },
];

export const purchaseInvoicesList = [
  { _id: "pi1", purchaseNo: "PUR-2026-105", date: "2026-07-17", dueDate: "2026-08-01", supplierId: "cn3", supplierName: "Prakash Paper Mills", grandTotal: 15200, amountPaid: 15200 },
  { _id: "pi2", purchaseNo: "PUR-2026-104", date: "2026-07-14", dueDate: "2026-07-29", supplierId: "cn4", supplierName: "National Stationery Co.", grandTotal: 8600, amountPaid: 0 },
];

export const quotationsList = [
  { _id: "qt1", quotationNo: "QUO-2026-045", date: "2026-07-19", customerId: "cn2", customerName: "Shree Enterprises", grandTotal: 32000, status: "sent" },
  { _id: "qt2", quotationNo: "QUO-2026-044", date: "2026-07-12", customerId: "cn1", customerName: "ABC Traders", grandTotal: 14500, status: "expired" },
];

export const purchaseOrdersList = [
  { _id: "po1", poNo: "PO-2026-022", date: "2026-07-16", supplierId: "cn3", supplierName: "Prakash Paper Mills", grandTotal: 21000, status: "open" },
];


export const salesReturnsList = [
  { _id: "sr1", returnNo: "SR-2026-008", date: "2026-07-15", linkedInvoiceNo: "INV-2026-105", customerName: "ABC Traders", grandTotal: 1200, status: "refunded" },
];

export const purchaseReturnsList = [
  { _id: "pr1", returnNo: "PR-2026-005", date: "2026-07-13", linkedPurchaseNo: "PUR-2026-105", supplierName: "Prakash Paper Mills", grandTotal: 800, status: "refunded" },
];



export const paymentsList = [
  { _id: "pay1", paymentNo: "PMT-IN-2026-012", type: "in", date: "2026-07-19", partyName: "ABC Traders", amount: 10000, mode: "UPI", notes: "" },
  { _id: "pay2", paymentNo: "PMT-OUT-2026-007", type: "out", date: "2026-07-17", partyName: "Prakash Paper Mills", amount: 15200, mode: "Bank Transfer", notes: "" },
];

export const currentUser = {
  name: "Abhishek",
  email: "abhishek@legalpapersindia.com",
  phone: "9876543210",
  role: "Admin",
  avatar: null,
};

export const invoicePrintSettings = {
  showLogo: true,
  showSignature: true,
  showQrCode: true,
  showBankDetails: true,
  showHsnCode: true,
  showItemDiscount: true,
  showShippingAddress: true,
  roundOffTotal: true,
  invoiceTemplate: "Elegant",
  additionalNotes: "Thank you for your business!",
};


export const groupsList = [
  { _id: "grp1", name: "Stationery" },
  { _id: "grp2", name: "Legal Forms" },
  { _id: "grp3", name: "Stamp Papers" },
  { _id: "grp4", name: "Office Supplies" },
  { _id: "grp5", name: "Printing" },
];

export const brandsList = [
  { _id: "brd1", name: "Generic" },
  { _id: "brd2", name: "JK Papers" },
  { _id: "brd3", name: "Camlin" },
];



export const servicesList = [
  {
    _id: "svc1",
    itemType: "Service",
    name: "Document Notarization",
    sku: "SVC-NOT-001",
    group: "Legal Forms",
    brand: "",
    serviceCharge: 300,
    minServiceCharge: 150,
    salePriceType: "with_tax",
    gstPercent: 18,
    discountPercent: 0,
    hsnCode: "9983",
    description: "Legal document notarization service",
  },
];


export const allItemsAndServices = [...itemsList, ...servicesList];




export const invoiceLineItemsSample = {
  "si1": [
    { name: "A4 Legal Paper Bundle", hsnCode: "4802", qty: 5, unit: "box", rate: 420, gstPercent: 12 },
    { name: "Notary Seal Kit", hsnCode: "8442", qty: 2, unit: "pcs", rate: 650, gstPercent: 18 },
  ],
  "si2": [
    { name: "Stamp Paper Roll", hsnCode: "4907", qty: 10, unit: "pcs", rate: 210, gstPercent: 5 },
  ],
  "si3": [
    { name: "Affidavit Format Booklet", hsnCode: "4901", qty: 20, unit: "pcs", rate: 90, gstPercent: 12 },
  ],
};


export const quotationLineItemsSample = {
  "qt1": [
    { name: "Office Letterhead Print (500)", hsnCode: "4911", qty: 3, unit: "set", rate: 1250, gstPercent: 18 },
  ],
  "qt2": [
    { name: "A4 Legal Paper Bundle", hsnCode: "4802", qty: 8, unit: "box", rate: 420, gstPercent: 12 },
  ],
};

export const purchaseOrderLineItemsSample = {
  "po1": [
    { name: "A4 Legal Paper Bundle", hsnCode: "4802", qty: 15, unit: "box", rate: 320, gstPercent: 12 },
  ],
};

export const purchaseLineItemsSample = {
  "pi1": [
    { name: "A4 Legal Paper Bundle", hsnCode: "4802", qty: 20, unit: "box", rate: 320, gstPercent: 12 },
  ],
  "pi2": [
    { name: "Notary Seal Kit", hsnCode: "8442", qty: 5, unit: "pcs", rate: 480, gstPercent: 18 },
  ],
};