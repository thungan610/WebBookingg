import React, { useState } from "react";
import "../Screen/Register.css"; // Dùng lại CSS login
import logoBlue from "../assets/images/logoBlue.png";
import logo2 from "../assets/images/logoBlue.png";
import Swal from "sweetalert2";

function Register() {
  const [form, setForm] = useState({
    premission_id: "",
    username: "",
    password: "",
    email: "",
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      premission_id: Number(form.premission_id),
      username: form.username.trim(),
      password: form.password.trim(),
      email: form.email.trim(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
    };

    try {
      const res = await fetch("https://your-api-url.com/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const result = await res.json();

      if (res.ok && result.code === 200) {
        Swal.fire("Đăng ký thành công!", "", "success");
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
        Swal.fire("Thất bại", result.message || "Có lỗi xảy ra", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Lỗi hệ thống", "Vui lòng thử lại sau.", "error");
    }
  };

  return (
    <div>
      <div className="headers">
      
        <p className="title">Đăng ký</p>
      </div>

      <div className="body">
        <div className="logo2Container">
          <img className="logoimg2" src={logo2} alt="logo2" />
        </div>

        <div className="login-Container">
          <div className="textF-Container">
            <h1 className="text-login">Đăng ký</h1>
            <p className="text-loginR">, tạo tài khoản để tiếp tục</p>
          </div>

          <div className="inputLogin">
            {[
              { name: "premission_id", label: "Permission ID", type: "number" },
              { name: "username", label: "Tên đăng nhập", type: "text" },
              { name: "password", label: "Mật khẩu", type: "password" },
              { name: "email", label: "Email", type: "email" },
              { name: "name", label: "Họ tên", type: "text" },
              { name: "phone", label: "Số điện thoại", type: "text" },
              { name: "address", label: "Địa chỉ", type: "text" },
            ].map((field) => (
              <div className="inside-input" key={field.name}>
                <label className="label">{field.label}</label>
                <input
                  className="input"
                  name={field.name}
                  type={field.type}
                  placeholder={field.label}
                  value={form[field.name]}
                  onChange={handleChange}
                  required={["username", "email", "password", "premission_id"].includes(field.name)}
                />
              </div>
            ))}

            <button onClick={handleSubmit} className="btn-login">
              Đăng ký
            </button>
            <a className="forgot-password" href="/Loginn" alt="insert">
              Đăng nhập
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
