import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  const adminCollection = collection(db, "admin");

  // Завантаження даних з Firebase
  const fetchAdmins = async () => {
    const data = await getDocs(adminCollection);
    setAdmins(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Додавання нового адміністратора
  const handleAddAdmin = async () => {
    if (name.trim() && email.trim()) {
      await addDoc(adminCollection, { name, email });
      fetchAdmins();
      setName("");
      setEmail("");
    } else {
      alert("Будь ласка, заповніть всі поля");
    }
  };

  // Оновлення адміністратора
  const handleEditAdmin = async () => {
    if (editId && name.trim() && email.trim()) {
      const adminDoc = doc(db, "admin", editId);
      await updateDoc(adminDoc, { name, email });
      fetchAdmins();
      setName("");
      setEmail("");
      setEditId(null);
    } else {
      alert("Будь ласка, заповніть всі поля");
    }
  };

  // Видалення адміністратора
  const handleDeleteAdmin = async (id) => {
    const adminDoc = doc(db, "admin", id);
    await deleteDoc(adminDoc);
    fetchAdmins();
  };

  // Заповнення полів для редагування
  const handleEditClick = (admin) => {
    setName(admin.name);
    setEmail(admin.email);
    setEditId(admin.id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Список Адміністраторів</h1>
      <ul>
        {admins.map((admin) => (
          <li key={admin.id} style={{ marginBottom: "10px" }}>
            <strong>Ім'я:</strong> {admin.name}, <strong>Email:</strong>{" "}
            {admin.email}
            <button
              onClick={() => handleEditClick(admin)}
              style={{ marginLeft: "10px" }}
            >
              Редагувати
            </button>
            <button
              onClick={() => handleDeleteAdmin(admin.id)}
              style={{ marginLeft: "10px" }}
            >
              Видалити
            </button>
          </li>
        ))}
      </ul>
      <h2>{editId ? "Редагувати Адміністратора" : "Додати Адміністратора"}</h2>
      <input
        type="text"
        placeholder="Ім'я"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      {editId ? (
        <button onClick={handleEditAdmin}>Оновити</button>
      ) : (
        <button onClick={handleAddAdmin}>Додати</button>
      )}
    </div>
  );
};

export default AdminManagement;
