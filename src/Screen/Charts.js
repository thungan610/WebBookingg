import React, { useEffect, useState } from "react";
import ApiService from "../../src/services/apiService";
import "./Review.css";

export default function Review() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    uuid: "",
    name: "",
    address: "",
    phone: "",
    email: "",
    image: "",
    hospital_id: "",
    introduce: "", // Thêm trường giới thiệu
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchClinics();
  }, []);

  const fetchClinics = async () => {
    try {
      const result = await ApiService.get("/clinic/getAll");
      if (result.code === 200) setData(result.data);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu phòng ban:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("address", form.address);
      formData.append("phone", form.phone);
      formData.append("email", form.email);
      formData.append("image", form.image);
      formData.append("hospital_id", form.hospital_id);
      formData.append("introduce", form.introduce); // Gửi giới thiệu

      if (isEditing) {
        await ApiService.put(`/clinic/update/${form.uuid}`, formData);
      } else {
        await ApiService.post("/clinic/add", formData);
      }

      setForm({
        uuid: "",
        name: "",
        address: "",
        phone: "",
        email: "",
        image: "",
        hospital_id: "",
        introduce: "",
      });
      setIsEditing(false);
      fetchClinics();
    } catch (err) {
      console.error("Lỗi khi gửi form:", err);
    }
  };

  const handleEdit = (item) => {
    setForm({
      uuid: item.uuid,
      name: item.name,
      address: item.address,
      phone: item.phone,
      email: item.email,
      image: item.image,
      hospital_id: item.hospital_id,
      introduce: item.introduce || "", // Nếu null thì set chuỗi rỗng
    });
    setIsEditing(true);
  };

  const handleDelete = async (uuid) => {
    try {
      await ApiService.delete(`/clinic/delete/${uuid}`);
      fetchClinics();
    } catch (err) {
      console.error("Lỗi khi xoá:", err);
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Quản lý phòng ban</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Tên" required />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Địa chỉ" required />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="SĐT" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Link ảnh (https://...)" />
        <input name="hospital_id" value={form.hospital_id} onChange={handleChange} placeholder="Mã bệnh viện" />
        <input name="introduce" value={form.introduce} onChange={handleChange} placeholder="Giới thiệu" />
        <button type="submit">{isEditing ? "Cập nhật" : "Thêm mới"}</button>
      </form>

      <div className="table-scroll">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Địa chỉ</th>
              <th>SĐT</th>
              <th>Email</th>
              <th>Giới thiệu</th>
              <th>Ảnh</th>
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
                <td>{item.introduce || "..."}</td>
                <td>
                  <img
                    src={item.image || "https://via.placeholder.com/80"}
                    alt="Ảnh"
                    className="admin-image"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/80";
                    }}
                  />
                </td>
                <td>{new Date(item.created_at).toLocaleString()}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(item)}>
                    Sửa
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(item.uuid)}>
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
