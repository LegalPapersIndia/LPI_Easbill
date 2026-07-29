
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ProtectedRoute from "./components/ProtectedRoute";

// import Dashboard from "./pages/Dashboard";
// import Items from "./pages/Items";
// import Contacts from "./pages/Contacts";
// import SalesInvoiceList from "./pages/SalesInvoiceList";
// import SalesInvoice from "./pages/SalesInvoice";
// import QuotationList from "./pages/QuotationList";
// import Quotation from "./pages/Quotation";
// import PurchaseList from "./pages/PurchaseList";
// import Purchase from "./pages/Purchase";
// import PurchaseOrderList from "./pages/PurchaseOrderList";
// import PurchaseOrder from "./pages/PurchaseOrder";
// import BusinessSettings from "./pages/settings/BusinessSettings";
// import ReturnsList from "./pages/ReturnsList";
// import ReturnCreate from "./pages/ReturnCreate";
// import PaymentsList from "./pages/PaymentsList";
// import PaymentCreate from "./pages/PaymentCreate";
// import MyProfile from "./pages/settings/MyProfile";
// import InvoiceSettings from "./pages/settings/InvoiceSettings";
// import InvoicePrintPreview from "./pages/InvoicePrintPreview";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* PUBLIC ROUTES */}
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* PROTECTED ROUTES */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/items"
//           element={
//             <ProtectedRoute>
//               <Items />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/contacts"
//           element={
//             <ProtectedRoute>
//               <Contacts />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/sales-invoice"
//           element={
//             <ProtectedRoute>
//               <SalesInvoiceList />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/sales-invoice/new"
//           element={
//             <ProtectedRoute>
//               <SalesInvoice />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/quotation"
//           element={
//             <ProtectedRoute>
//               <QuotationList />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/quotation/new"
//           element={
//             <ProtectedRoute>
//               <Quotation />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/purchase"
//           element={
//             <ProtectedRoute>
//               <PurchaseList />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/purchase/new"
//           element={
//             <ProtectedRoute>
//               <Purchase />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/purchase-order"
//           element={
//             <ProtectedRoute>
//               <PurchaseOrderList />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/purchase-order/new"
//           element={
//             <ProtectedRoute>
//               <PurchaseOrder />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/settings/business"
//           element={
//             <ProtectedRoute>
//               <BusinessSettings />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/returns"
//           element={
//             <ProtectedRoute>
//               <ReturnsList />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/returns/new"
//           element={
//             <ProtectedRoute>
//               <ReturnCreate />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/payments"
//           element={
//             <ProtectedRoute>
//               <PaymentsList />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/payments/new"
//           element={
//             <ProtectedRoute>
//               <PaymentCreate />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/settings/profile"
//           element={
//             <ProtectedRoute>
//               <MyProfile />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/settings/invoice"
//           element={
//             <ProtectedRoute>
//               <InvoiceSettings />
//             </ProtectedRoute>
//           }
//         />

//         <Route path="/print/invoice/:id" element={<InvoicePrintPreview />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;




import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SettingsProvider } from "./context/SettingsContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Items from "./pages/Items";
import Contacts from "./pages/Contacts";
import SalesInvoiceList from "./pages/SalesInvoiceList";
import SalesInvoice from "./pages/SalesInvoice";
import QuotationList from "./pages/QuotationList";
import Quotation from "./pages/Quotation";
import PurchaseList from "./pages/PurchaseList";
import Purchase from "./pages/Purchase";
import PurchaseOrderList from "./pages/PurchaseOrderList";
import PurchaseOrder from "./pages/PurchaseOrder";
import BusinessSettings from "./pages/settings/BusinessSettings";
import ReturnsList from "./pages/ReturnsList";
import ReturnCreate from "./pages/ReturnCreate";
import PaymentsList from "./pages/PaymentsList";
import PaymentCreate from "./pages/PaymentCreate";
import MyProfile from "./pages/settings/MyProfile";
import InvoiceSettings from "./pages/settings/InvoiceSettings";
import InvoicePrintPreview from "./pages/InvoicePrintPreview";

function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/items"
            element={
              <ProtectedRoute>
                <Items />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contacts"
            element={
              <ProtectedRoute>
                <Contacts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sales-invoice"
            element={
              <ProtectedRoute>
                <SalesInvoiceList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sales-invoice/new"
            element={
              <ProtectedRoute>
                <SalesInvoice />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quotation"
            element={
              <ProtectedRoute>
                <QuotationList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quotation/new"
            element={
              <ProtectedRoute>
                <Quotation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchase"
            element={
              <ProtectedRoute>
                <PurchaseList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchase/new"
            element={
              <ProtectedRoute>
                <Purchase />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchase-order"
            element={
              <ProtectedRoute>
                <PurchaseOrderList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchase-order/new"
            element={
              <ProtectedRoute>
                <PurchaseOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/business"
            element={
              <ProtectedRoute>
                <BusinessSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/returns"
            element={
              <ProtectedRoute>
                <ReturnsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/returns/new"
            element={
              <ProtectedRoute>
                <ReturnCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payments"
            element={
              <ProtectedRoute>
                <PaymentsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payments/new"
            element={
              <ProtectedRoute>
                <PaymentCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/profile"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/invoice"
            element={
              <ProtectedRoute>
                <InvoiceSettings />
              </ProtectedRoute>
            }
          />

          <Route path="/print/invoice/:id" element={<InvoicePrintPreview />} />
        </Routes>
      </BrowserRouter>
    </SettingsProvider>
  );
}

export default App;