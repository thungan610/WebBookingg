import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const initialDoctors = [
  {
    uuid: uuidv4(),
    user_id: "user001",
    doctor_type: 1,
    specialization_id: "spec001",
    license: "BS123456",
    introduce: "Chuyên gia nội tổng quát",
    image: "https://via.placeholder.com/100",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function UserManage() {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [form, setForm] = useState({
    uuid: "",
    user_id: "",
    doctor_type: 1,
    specialization_id: "",
    license: "",
    introduce: "",
    image: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "doctor_type" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setDoctors((prev) =>
        prev.map((doc) =>
          doc.uuid === form.uuid
            ? { ...form, updated_at: new Date().toISOString() }
            : doc
        )
      );
    } else {
      setDoctors((prev) => [
        ...prev,
        {
          ...form,
          uuid: uuidv4(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);
    }
    setForm({
      uuid: "",
      user_id: "",
      doctor_type: 1,
      specialization_id: "",
      license: "",
      introduce: "",
      image: "",
    });
    setIsEditing(false);
  };

  const handleEdit = (doctor) => {
    setForm(doctor);
    setIsEditing(true);
  };

  const handleDelete = (uuid) => {
    setDoctors((prev) => prev.filter((doc) => doc.uuid !== uuid));
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Quản lý Bác sĩ</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          name="user_id"
          placeholder="User ID"
          value={form.user_id}
          onChange={handleChange}
          className="border p-2"
          required
        />
        <input
          type="number"
          name="doctor_type"
          placeholder="Loại bác sĩ (số)"
          value={form.doctor_type}
          onChange={handleChange}
          className="border p-2"
          required
        />
        <input
          type="text"
          name="specialization_id"
          placeholder="ID chuyên khoa"
          value={form.specialization_id}
          onChange={handleChange}
          className="border p-2"
          required
        />
        <input
          type="text"
          name="license"
          placeholder="Số giấy phép"
          value={form.license}
          onChange={handleChange}
          className="border p-2"
          required
        />
        <input
          type="text"
          name="introduce"
          placeholder="Giới thiệu"
          value={form.introduce}
          onChange={handleChange}
          className="border p-2 col-span-2"
        />
        <input
          type="text"
          name="image"
          placeholder="URL ảnh"
          value={form.image}
          onChange={handleChange}
          className="border p-2 col-span-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded col-span-2"
        >
          {isEditing ? "Cập nhật bác sĩ" : "Thêm bác sĩ"}
        </button>
      </form>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">User ID</th>
            <th className="border p-2">Loại</th>
            <th className="border p-2">Chuyên khoa</th>
            <th className="border p-2">GPLX</th>
            <th className="border p-2">Giới thiệu</th>
            <th className="border p-2">Ảnh</th>
            <th className="border p-2">Tạo lúc</th>
            <th className="border p-2">Cập nhật</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc) => (
            <tr key={doc.uuid}>
              <td className="border p-2">{doc.user_id}</td>
              <td className="border p-2">{doc.doctor_type}</td>
              <td className="border p-2">{doc.specialization_id}</td>
              <td className="border p-2">{doc.license}</td>
              <td className="border p-2">{doc.introduce}</td>
              <td className="border p-2">
                <img
                  src={doc.image}
                  alt="ảnh bác sĩ"
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="border p-2">{doc.created_at}</td>
              <td className="border p-2">{doc.updated_at}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(doc)}
                  className="bg-yellow-400 px-2 py-1 rounded mr-2"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(doc.uuid)}
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
