import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ApiService from "../../src/services/apiService";
import "./UserManage.css";

export default function DoctorManager() {
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [form, setForm] = useState({
    uuid: "",
    user_name: "",
    hospital_id: "",
    clinic_id: "",
    doctor_type: "",
    specialization_id: "",
    license: "",
    introduce: "",
    experience: 0,
    patient_count: 0,
    image: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchDoctors();
    fetchHospitals();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await ApiService.get("/doctor/getAll");
      if (res.code === 200) setDoctors(res.data);
    } catch (err) {
      console.error("Lỗi khi tải danh sách bác sĩ:", err);
    }
  };

  const fetchHospitals = async () => {
    try {
      const res = await ApiService.get("/hospital/getAll");
      if (res.code === 200) setHospitals(res.data);
    } catch (err) {
      console.error("Lỗi khi tải bệnh viện:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.hospital_id) {
      return Swal.fire({
        icon: "warning",
        title: "Thiếu thông tin",
        text: "Vui lòng chọn bệnh viện!",
      });
    }

    const formData = new FormData();
    for (const key in form) formData.append(key, form[key]);

    try {
      if (isEditing) {
        await ApiService.put(`/doctor/update/${form.uuid}`, formData);
        Swal.fire({ icon: "success", title: "Cập nhật thành công" });
      } else {
        await ApiService.post("/doctor/create", formData);
        Swal.fire({ icon: "success", title: "Thêm mới thành công" });
      }

      setForm({
        uuid: "",
        user_name: "",
        hospital_id: "",
        clinic_id: "",
        doctor_type: "",
        specialization_id: "",
        license: "",
        introduce: "",
        experience: 0,
        patient_count: 0,
        image: "",
      });
      setIsEditing(false);
      fetchDoctors();
    } catch (err) {
      console.error("Lỗi khi gửi form:", err);
    }
  };

  const handleEdit = (item) => {
    setForm({ ...item, user_name: item.user_name || "" });
    setIsEditing(true);
  };

  const handleDelete = async (uuid) => {
    try {
      await ApiService.delete(`/doctor/delete/${uuid}`);
      Swal.fire({ icon: "success", title: "Xóa thành công" });
      fetchDoctors();
    } catch (err) {
      console.error("Lỗi khi xoá:", err);
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Quản lý bác sĩ</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <div><label>Tên bác sĩ</label><input name="user_name" value={form.user_name} onChange={handleChange} required /></div>
        <div><label>Bệnh viện</label><select name="hospital_id" value={form.hospital_id} onChange={handleChange} required><option value="">-- Chọn bệnh viện --</option>{hospitals.map((h) => (<option key={h.uuid} value={h.uuid}>{h.name}</option>))}</select></div>
        <div><label>ID phòng khám</label><input name="clinic_id" value={form.clinic_id} onChange={handleChange} /></div>
        <div><label>Loại bác sĩ</label><input name="doctor_type" value={form.doctor_type} onChange={handleChange} /></div>
        <div><label>Chuyên khoa ID</label><input name="specialization_id" value={form.specialization_id} onChange={handleChange} /></div>
        <div><label>Giấy phép hành nghề</label><input name="license" value={form.license} onChange={handleChange} /></div>
        <div><label>Giới thiệu</label><input name="introduce" value={form.introduce} onChange={handleChange} /></div>
        <div><label>Kinh nghiệm (năm)</label><input name="experience" type="number" value={form.experience} onChange={handleChange} /></div>
        <div><label>Số bệnh nhân đã khám</label><input name="patient_count" type="number" value={form.patient_count} onChange={handleChange} /></div>
        <div><label>Link ảnh (https://...)</label><input name="image" value={form.image} onChange={handleChange} /></div>
        <button type="submit">{isEditing ? "Cập nhật" : "Thêm mới"}</button>
      </form>

      <div className="table-scroll">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tên bác sĩ</th>
              <th>Bệnh viện</th>
              <th>Phòng khám</th>
              <th>Loại</th>
              <th>Chuyên khoa</th>
              <th>Giấy phép</th>
              <th>Kinh nghiệm</th>
              <th>Số BN</th>
              <th>Giới thiệu</th>
              <th>Ảnh</th>
              <th>Ngày tạo</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((item) => (
              <tr key={item.uuid}>
                <td>{item.user_name}</td>
                <td>{item.hospital_id}</td>
                <td>{item.clinic_id}</td>
                <td>{item.doctor_type}</td>
                <td>{item.specialization_id}</td>
                <td>{item.license}</td>
                <td>{item.experience}</td>
                <td>{item.patient_count}</td>
                <td>{item.introduce}</td>
                <td><img src={item.image || "https://via.placeholder.com/80"} alt="Ảnh" className="admin-image" onError={(e) => (e.target.src = "https://via.placeholder.com/80")} /></td>
                <td>{new Date(item.created_at).toLocaleString()}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(item)}>Sửa</button>
                  <button className="delete-btn" onClick={() => handleDelete(item.uuid)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
