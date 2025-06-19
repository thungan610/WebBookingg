import React, { useEffect, useState } from "react";
import ApiService from "../../src/services/apiService"; // Cập nhật lại nếu cần
import "./Products.css";

export default function AdminTable() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    uuid: "",
    name: "",
    address: "",
    imageFile: null,
    imageUrl: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const result = await ApiService.get("/hospital/getAll");
        if (result.code === 200) {
          setData(result.data);
        }
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu:", err);
      }
    };

    fetchHospitals();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setForm((prev) => ({
        ...prev,
        imageFile: files[0],
        imageUrl: "", // reset link nếu chọn file
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("address", form.address);

      // Ưu tiên ảnh từ máy, nếu không có thì dùng link ảnh
      if (form.imageFile) {
        formData.append("image", form.imageFile);
      } else if (form.imageUrl) {
        formData.append("imageUrl", form.imageUrl);
      }

      if (isEditing) {
        await ApiService.put(`/hospital/update/${form.uuid}`, formData);
      } else {
        const res = await ApiService.post("/hospital/add", formData);
        setData((prev) => [...prev, res.data]);
      }

      // Reset form
      setForm({
        uuid: "",
        name: "",
        address: "",
        imageFile: null,
        imageUrl: "",
      });
      setIsEditing(false);

      // Reload data
      const updated = await ApiService.get("/hospital/getAll");
      setData(updated.data);
    } catch (error) {
      console.error("Lỗi khi gửi form:", error);
    }
  };

  const handleEdit = (item) => {
    setForm({
      uuid: item.uuid,
      name: item.name,
      address: item.address,
      imageFile: null,
      imageUrl: item.image || "",
    });
    setIsEditing(true);
  };

  const handleDelete = async (uuid) => {
    try {
      await ApiService.delete(`/hospital/delete/${uuid}`);
      setData((prev) => prev.filter((item) => item.uuid !== uuid));
    } catch (err) {
      console.error("Lỗi khi xoá:", err);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quản lý bệnh viện</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Tên bệnh viện"
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

        {/* Gộp chọn ảnh và nhập link ảnh vào cùng một dòng */}
        <div className="flex gap-2 items-center">
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={handleChange}
            className="border p-2 w-1/2"
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Hoặc dán link ảnh (https://...)"
            value={form.imageUrl}
            onChange={handleChange}
            className="border p-2 w-1/2"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {isEditing ? "Cập nhật" : "Thêm mới"}
        </button>
      </form>

      <div className="overflow-auto max-h-[400px] border rounded">
        <table className="min-w-full border">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="border p-2">Tên</th>
              <th className="border p-2">Địa chỉ</th>
              <th className="border p-2">Ảnh</th>
              <th className="border p-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.uuid}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.address}</td>
                <td className="border p-2">
                  <img
                    src={item.image || "https://via.placeholder.com/100"}
                    alt="Ảnh"
                    className="w-16 h-16 object-cover"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/100")
                    }
                  />
                </td>
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
    </div>
  );
}
