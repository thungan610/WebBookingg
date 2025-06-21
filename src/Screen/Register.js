import React, { useState } from "react";
import ApiService from "../../src/services/apiService"; // Đường dẫn đúng theo project của fen

export default function Register() {
  const [form, setForm] = useState({
    premission_id: "",
    username: "",
    password: "",
    email: "",
    name: "",
    phone: "",
    address: "",
  });

  const sanitizeInput = (value) => value.trim();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      premission_id: Number(form.premission_id),
      username: sanitizeInput(form.username),
      password: sanitizeInput(form.password),
      email: sanitizeInput(form.email),
      name: sanitizeInput(form.name),
      phone: sanitizeInput(form.phone),
      address: sanitizeInput(form.address),
    };

    try {
      const result = await ApiService.post("/auth/register", userData);
      if (result.code === 200) {
        alert("Đăng ký thành công!");
        // Reset form
        setForm({
          premission_id: "",
          username: "",
          password: "",
          email: "",
          name: "",
          phone: "",
          address: "",
        });
      } else {
        alert("Đăng ký thất bại: " + result.msg);
      }
    } catch (err) {
      console.error("Lỗi khi gọi API đăng ký:", err);
      alert("Đăng ký thất bại!");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Đăng ký người dùng</h2>

        <input
          type="number"
          name="premission_id"
          placeholder="Permission ID"
          value={form.premission_id}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="username"
          placeholder="Tên đăng nhập"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Họ và tên"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Số điện thoại"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Địa chỉ"
          value={form.address}
          onChange={handleChange}
        />

        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
}
