import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Review.css"; // import CSS riêng

const initialData = [
  {
    uuid: uuidv4(),
    name: "Khoa Nhi",
    address: "Số 5 Lê Lợi, Q.1",
    phone: "0987654321",
    email: "khoanhi@hospital.vn",
    image: "https://via.placeholder.com/80",
    hospital_id: "hospital001",
    created_at: new Date().toISOString(),
  },
];

export default function Review() {
  const [data, setData] = useState(initialData);
  const [form, setForm] = useState({
    uuid: "",
    name: "",
    address: "",
    phone: "",
    email: "",
    image: "",
    hospital_id: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setData((prev) =>
        prev.map((item) =>
          item.uuid === form.uuid ? { ...form } : item
        )
      );
    } else {
      setData((prev) => [
        ...prev,
        {
          ...form,
          uuid: uuidv4(),
          created_at: new Date().toISOString(),
        },
      ]);
    }
    setForm({
      uuid: "",
      name: "",
      address: "",
      phone: "",
      email: "",
      image: "",
      hospital_id: "",
    });
    setIsEditing(false);
  };

  const handleEdit = (item) => {
    setForm(item);
    setIsEditing(true);
  };

  const handleDelete = (uuid) => {
    setData((prev) => prev.filter((item) => item.uuid !== uuid));
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Quản lý phòng ban</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Tên" required />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Địa chỉ" required />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="SĐT" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Ảnh (URL)" />
        <input name="hospital_id" value={form.hospital_id} onChange={handleChange} placeholder="Mã bệnh viện" />
        <button type="submit">{isEditing ? "Cập nhật" : "Thêm mới"}</button>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Địa chỉ</th>
            <th>SĐT</th>
            <th>Email</th>
            <th>Ảnh</th>
            <th>Hospital ID</th>
            <th>Tạo lúc</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.uuid}>
              <td>{item.name}</td>
              <td>{item.address}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td><img src={item.image} alt="" className="admin-image" /></td>
              <td>{item.hospital_id}</td>
              <td>{new Date(item.created_at).toLocaleString()}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(item)}>Sửa</button>
                <button className="delete-btn" onClick={() => handleDelete(item.uuid)}>Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
