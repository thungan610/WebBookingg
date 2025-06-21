import React, {  useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

import Login from "./Screen/Login";
import Products from "./Screen/Products";
import AddProduct from "./Navigate/Sidebar";
import InsertProduct from "./Screen/InsertProduct";
import UpdateProduct from "./Screen/UpdateProduct";
import UserManage from "./Screen/UserManage";
import Orders from "./Screen/Orders";
import QLHH from "./Screen/QLHH";
import AddSale from "./Screen/AddSale";
import Charts from "./Screen/Charts";
import NavMenu from "./Navigate/NavMenu";
import { AdminProvider } from "./Component/AdminProvider";
import '@fontsource/roboto'; // Tải trọng số mặc định
import '@fontsource/roboto/400.css'; // Tải trọng số cụ thể
import ResetPassword from "./Screen/ResetPassword";
import Comment from "./Screen/Comment";
import Payment from "./Screen/Payment";
import ChartWeek from "./Screen/ChartWeek"
import OrderDetail from "./Screen/OrderDetail";
import PromotionManagementment from "./Screen/MedicalRecordList";
import UpdateSale from "./Screen/UpdateSale";
import TopProductsChart from "./Screen/ChartWeek";
import Review from "./Screen/Revview";
import MedicalRecordList from "./Screen/MedicalRecordList";
import Register from "./Screen/Register";
import Loginn from "./Screen/Loginn";
function App() {
  const getAdminFromLocalStorage = () => {
    const adminInfo = localStorage.getItem("admin");
    return adminInfo ? JSON.parse(adminInfo) : null;
  };

  const [admin, setAdmin] = useState(getAdminFromLocalStorage());
  const [isHidden, setIsHidden] = useState(!admin);
  
  
  const saveAdminInfo = (adminInfo) => {
    if (!adminInfo) {
      localStorage.removeItem("admin");
      setAdmin(null);
      setIsHidden(true);
    } else {
      localStorage.setItem("admin", JSON.stringify(adminInfo));
      setAdmin(adminInfo);
      setIsHidden(false);
    }
  };

  // Hàm logout sẽ xóa thông tin admin khỏi localStorage và cập nhật state
  const logout = () => {
    localStorage.removeItem("admin");
    setAdmin(null);
    setIsHidden(true);
  };

  return (
    <Router>
      {admin ? (
        <AdminProvider>
          <NavMenu isHidden={isHidden} onLogout={logout}>
            <Routes>
              <Route path="/" element={<Navigate to="/charts" replace />} />
              <Route path="/charts" element={<Charts />} />
              <Route path="/ChartWeek" element={<ChartWeek />} />
              <Route path="/userManage" element={<UserManage />} />
              <Route path="/products" element={<Products />} />
              <Route path="/add-Product" element={<AddProduct />} />
              <Route path="/insert-Product" element={<InsertProduct />} />
              <Route path="/update-Product/:id" element={<UpdateProduct />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/QLHH" element={<QLHH />} />
              <Route path="/MedicalRecordList" element={<MedicalRecordList />} />
              <Route path="/Comment" element={<Comment />} />
              <Route path="/AddSale" element={<AddSale />} />
              <Route path="/UpdateSale/:id" element={<UpdateSale />} />
              <Route path="/Payment" element={<Payment />} />
              <Route path="/Review" element={<Review />} />
              <Route path="/ChartRevenue" element={<TopProductsChart />} />
              <Route path="/OrderDetail/:id" element={<OrderDetail />} />
              <Route path="/login" element={<Navigate to="/charts" />} />
              <Route path="/Loginn" element={<Loginn />} />
              <Route path="/Register" element={<Register />} />
            </Routes>
          </NavMenu>
        </AdminProvider>
      ) : (
        <Routes>
          <Route path="/login" element={<Login saveAdmin={saveAdminInfo} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />

        </Routes>
      )}
    </Router>
  );
}

export default App;
