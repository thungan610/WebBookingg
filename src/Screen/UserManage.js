import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ApiService from "../../src/services/apiService"; // đường dẫn đúng của bạn

export default function UserManage() {
  const [doctors, setDoctors] = useState([]);
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

  // Load danh sách bác sĩ khi component mount
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await ApiService.get("/doctor/getAll");
      if (res.code === 200) {
        setDoctors(res.data);
      }
    } catch (err) {
      console.error("Lỗi tải danh sách bác sĩ:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "doctor_type" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await ApiService.put(`/doctor/update/${form.uuid}`, form);
      } else {
        await ApiService.post("/doctor/add", form);
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
      fetchDoctors();
    } catch (err) {
      console.error("Lỗi khi lưu bác sĩ:", err);
    }
  };

  const handleEdit = (doctor) => {
    setForm(doctor);
    setIsEditing(true);
  };

  const handleDelete = async (uuid) => {
    try {
      await ApiService.delete(`/doctor/delete/${uuid}`);
      fetchDoctors();
    } catch (err) {
      console.error("Lỗi khi xoá bác sĩ:", err);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-x-1 gap-y-2 mb-6"
      >
        <input
          name="user_id"
          placeholder="User ID"
          value={form.user_id}
          onChange={handleChange}
          className="border p-2"
          required
        />
        <input
          name="doctor_type"
          placeholder="Loại"
          type="number"
          value={form.doctor_type}
          onChange={handleChange}
          className="border p-2"
          required
        />
        <input
          name="specialization_id"
          placeholder="Chuyên Khoa"
          value={form.specialization_id}
          onChange={handleChange}
          className="border p-2"
          required
        />
        <input
          name="license"
          placeholder="GPLX"
          value={form.license}
          onChange={handleChange}
          className="border p-2"
          required
        />
        <input
          name="introduce"
placeholder="Giới thiệu"
          value={form.introduce}
          onChange={handleChange}
          className="border p-2 col-span-2"
        />
        <input
          name="image"
          placeholder="Ảnh"
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

      <div className="table-scroll">
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
                <td className="border p-2">
                  {new Date(doc.created_at).toLocaleString()}
                </td>
                <td className="border p-2">
                  {new Date(doc.updated_at).toLocaleString()}
                </td>
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
    </div>
  );
}
