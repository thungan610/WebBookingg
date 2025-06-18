import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./QLHH.css";

const initialServices = [
  {
    uuid: uuidv4(),
    name: "Khám tim mạch",
    description: "Kiểm tra tổng quát hệ tim mạch",
    price: 500000,
    specialization_id: "spec001",
    clinic_id: "clinic001",
    hospital_id: "hospital001",
    image: "https://via.placeholder.com/80",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function QLHH() {
  const [services, setServices] = useState(initialServices);
  const [form, setForm] = useState({
    uuid: "",
    name: "",
    description: "",
    price: "",
    specialization_id: "",
    clinic_id: "",
    hospital_id: "",
    image: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setServices((prev) =>
        prev.map((item) =>
          item.uuid === form.uuid
            ? { ...form, updated_at: new Date().toISOString() }
            : item
        )
      );
    } else {
      setServices((prev) => [
        ...prev,
        {
          ...form,
          uuid: uuidv4(),
          price: parseFloat(form.price),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);
    }
    setForm({
      uuid: "",
      name: "",
      description: "",
      price: "",
      specialization_id: "",
      clinic_id: "",
      hospital_id: "",
      image: "",
    });
    setIsEditing(false);
  };

  const handleEdit = (item) => {
    setForm(item);
    setIsEditing(true);
  };

  const handleDelete = (uuid) => {
    setServices((prev) => prev.filter((item) => item.uuid !== uuid));
  };

  return (
    <div className="service-container">
      <h2 className="service-title">Quản lý Dịch vụ</h2>
      <form className="service-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Tên dịch vụ" value={form.name} onChange={handleChange} required />
        <input name="description" placeholder="Mô tả" value={form.description} onChange={handleChange} />
        <input name="price" placeholder="Giá" type="number" value={form.price} onChange={handleChange} />
        <input name="specialization_id" placeholder="Mã chuyên khoa" value={form.specialization_id} onChange={handleChange} />
        <input name="clinic_id" placeholder="Mã phòng khám" value={form.clinic_id} onChange={handleChange} />
        <input name="hospital_id" placeholder="Mã bệnh viện" value={form.hospital_id} onChange={handleChange} />
        <input  name="image" placeholder="Link ảnh" value={form.image} onChange={handleChange} />
        <button type="submit">{isEditing ? "Cập nhật" : "Thêm mới"}</button>
      </form>

      <table className="service-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Mô tả</th>
            <th>Giá</th>
            <th>Ảnh</th>
            <th>Chuyên khoa</th>
            <th>Phòng khám</th>
            <th>Bệnh viện</th>
            <th>Ngày tạo</th>
            <th>Ngày cập nhật</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {services.map((item) => (
            <tr key={item.uuid}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.price.toLocaleString()}₫</td>
              <td><img src={item.image} alt={item.name} className="service-img" /></td>
              <td>{item.specialization_id}</td>
              <td>{item.clinic_id}</td>
              <td>{item.hospital_id}</td>
              <td>{new Date(item.created_at).toLocaleString()}</td>
              <td>{new Date(item.updated_at).toLocaleString()}</td>
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
