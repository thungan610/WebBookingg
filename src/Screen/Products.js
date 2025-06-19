import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Products.css";
const initialData = [
  {
    uuid: uuidv4(),
    name: "Phòng khám ABC",
    address: "123 Đường A, Quận B",
    image: "https://via.placeholder.com/100",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function AdminTable() {
  const [data, setData] = useState(initialData);
  const [form, setForm] = useState({
    uuid: "",
    name: "",
    address: "",
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
      setData((prev) =>
        prev.map((item) =>
          item.uuid === form.uuid
            ? { ...form, updated_at: new Date().toISOString() }
            : item
        )
      );
    } else {
      setData((prev) => [
        ...prev,
        {
          ...form,
          uuid: uuidv4(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);
    }
    setForm({ uuid: "", name: "", address: "", image: "" });
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
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quản lý địa điểm</h1>
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Tên"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Địa chỉ"
          value={form.address}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="URL ảnh"
          value={form.image}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {isEditing ? "Cập nhật" : "Thêm mới"}
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Tên</th>
            <th className="border p-2">Địa chỉ</th>
            <th className="border p-2">Ảnh</th>
            <th className="border p-2">Tạo lúc</th>
            <th className="border p-2">Cập nhật</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.uuid}>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.address}</td>
              <td className="border p-2">
                <img src={item.image} alt="" className="w-16 h-16 object-cover" />
              </td>
              <td className="border p-2">{item.created_at}</td>
              <td className="border p-2">{item.updated_at}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-400 px-2 py-1 mr-2 rounded"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(item.uuid)}
                  className="bg-red-500 px-2 py-1 text-white rounded"
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
