import React, { useState } from "react";
import "./Chart.css";
const initialReviews = [
  {
    uuid: "r1",
    user_id: "user1",
    doctor_id: "doc1",
    appointment_id: "app1",
    stars: 5,
    comment: "Bác sĩ rất nhiệt tình.",
    created_at: "2025-06-01T12:00:00Z",
    updated_at: "2025-06-01T12:00:00Z",
  },
  {
    uuid: "r2",
    user_id: "user2",
    doctor_id: "doc2",
    appointment_id: "app2",
    stars: 3,
    comment: "Dịch vụ trung bình.",
    created_at: "2025-06-05T09:00:00Z",
    updated_at: "2025-06-05T09:00:00Z",
  },
];

export default function Review() {
  const [reviews, setReviews] = useState(initialReviews);
  const [editingReview, setEditingReview] = useState(null);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingReview((prev) => ({
      ...prev,
      [name]: name === "stars" ? parseInt(value) : value,
    }));
  };

  const handleUpdate = () => {
    setReviews((prev) =>
      prev.map((r) =>
        r.uuid === editingReview.uuid
          ? { ...editingReview, updated_at: new Date().toISOString() }
          : r
      )
    );
    setEditingReview(null);
  };

  const handleDelete = (uuid) => {
    setReviews((prev) => prev.filter((r) => r.uuid !== uuid));
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Danh sách đánh giá</h2>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">User ID</th>
            <th className="border p-2">Doctor ID</th>
            <th className="border p-2">Appointment ID</th>
            <th className="border p-2">Sao</th>
            <th className="border p-2">Bình luận</th>
            <th className="border p-2">Tạo lúc</th>
            <th className="border p-2">Cập nhật</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((r) => (
            <tr key={r.uuid}>
              <td className="border p-2">{r.user_id}</td>
              <td className="border p-2">{r.doctor_id}</td>
              <td className="border p-2">{r.appointment_id}</td>
              <td className="border p-2">
                {editingReview?.uuid === r.uuid ? (
                  <input
                    type="number"
                    name="stars"
                    min="1"
                    max="5"
                    value={editingReview.stars}
                    onChange={handleChange}
                    className="border p-1 w-16"
                  />
                ) : (
                  r.stars
                )}
              </td>
              <td className="border p-2">
                {editingReview?.uuid === r.uuid ? (
                  <input
                    type="text"
                    name="comment"
                    value={editingReview.comment}
                    onChange={handleChange}
                    className="border p-1 w-full"
                  />
                ) : (
                  r.comment
                )}
              </td>
              <td className="border p-2">{r.created_at}</td>
              <td className="border p-2">{r.updated_at}</td>
              <td className="border p-2">
                {editingReview?.uuid === r.uuid ? (
                  <button
                    onClick={handleUpdate}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Lưu
                  </button>
                ) : (
                  <>
                  
                    <button
                      onClick={() => handleDelete(r.uuid)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Xoá
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
