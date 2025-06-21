import React, { useState } from "react";
import ApiService from "../../src/services/apiService"; // cập nhật đúng path
import "./Loginn.css";

export default function Loginn() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userData = {
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
    };
  
    try {
      const result = await ApiService.post("/auth/login", userData);
  
      if (result.code === 200) {
        const user = result.data;
  
        // ✅ CHỈ CHO PHÉP ADMIN (premission_id === 1)
        if (user.premission_id !== 1) {
          alert("Chỉ tài khoản Admin (quyền 1) mới được đăng nhập!");
          return;
        }
  
        alert("Đăng nhập thành công!");
        console.log("User login:", user);
  
        localStorage.setItem("access_token", user.access_token);
        localStorage.setItem("refresh_token", user.refresh_token);
  
        // window.location.href = "/dashboard";
      } else {
        alert("Đăng nhập thất bại: " + result.msg);
      }
    } catch (err) {
      console.error("Lỗi khi đăng nhập:", err);
      alert("Lỗi đăng nhập!");
    }
  };
  
  
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Đăng nhập</h2>

        <input
          type="text"
          name="username"
          placeholder="Tên đăng nhập"
          value={form.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}
