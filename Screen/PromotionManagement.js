import React, { useState } from "react";
import "./PromotionManagement.css";

const initialRecords = [
  {
    uuid: "rec001",
    patient_id: "pat001",
    created_at: "2025-06-01T10:00:00Z",
    updated_at: "2025-06-10T14:00:00Z",
  },
  {
    uuid: "rec002",
    patient_id: "pat002",
    created_at: "2025-06-03T09:30:00Z",
    updated_at: "2025-06-15T17:45:00Z",
  },
];

export default function MedicalRecordList() {
  const [records] = useState(initialRecords);

  return (
    <div className="record-container">
      <h2 className="record-title">Danh sách hồ sơ bệnh án</h2>
      <table className="record-table">
        <thead>
          <tr>
            <th>UUID</th>
            <th>Patient ID</th>
            <th>Ngày tạo</th>
            <th>Ngày cập nhật</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec) => (
            <tr key={rec.uuid}>
              <td>{rec.uuid}</td>
              <td>{rec.patient_id}</td>
              <td>{new Date(rec.created_at).toLocaleString()}</td>
              <td>{new Date(rec.updated_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
