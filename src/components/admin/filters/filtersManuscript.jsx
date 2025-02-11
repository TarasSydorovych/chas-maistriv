// import { useState, useEffect } from "react";
// import { db } from "../../../firebase";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";

// export default function AdminFilterManager() {
//   const [filters, setFilters] = useState([]);
//   const [editingFilter, setEditingFilter] = useState(null);
//   const [newItem, setNewItem] = useState("");

//   useEffect(() => {
//     const fetchFilters = async () => {
//       const querySnapshot = await getDocs(collection(db, "filters"));
//       setFilters(
//         querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
//       );
//     };

//     fetchFilters();
//   }, []);

//   const handleUpdateFilter = async (id) => {
//     if (editingFilter) {
//       const filterRef = doc(db, "filters", id);
//       await updateDoc(filterRef, { ...editingFilter });
//       setEditingFilter(null);
//       setNewItem("");
//       await fetchFilters(); // Оновлення списку після редагування
//     }
//   };

//   const handleDeleteFilterItem = (id, index) => {
//     const updatedList = editingFilter.list.filter((item, idx) => idx !== index);
//     setEditingFilter({ ...editingFilter, list: updatedList });
//   };

//   const handleAddFilterItem = () => {
//     if (newItem.trim()) {
//       setEditingFilter({
//         ...editingFilter,
//         list: [...editingFilter.list, newItem.trim()],
//       });
//       setNewItem("");
//     }
//   };

//   const fetchFilters = async () => {
//     const querySnapshot = await getDocs(collection(db, "filters"));
//     setFilters(
//       querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
//     );
//   };

//   const handleEditClick = (filter) => {
//     setEditingFilter({ ...filter });
//   };

//   return (
//     <div>
//       <h2>Управління фільтрами</h2>
//       <ul>
//         {filters.map((filter) => (
//           <li key={filter.id}>
//             {editingFilter && editingFilter.id === filter.id ? (
//               <div>
//                 <input
//                   type="text"
//                   value={editingFilter.name}
//                   onChange={(e) =>
//                     setEditingFilter({ ...editingFilter, name: e.target.value })
//                   }
//                 />
//                 <input
//                   type="text"
//                   value={editingFilter.transliter}
//                   onChange={(e) =>
//                     setEditingFilter({
//                       ...editingFilter,
//                       transliter: e.target.value,
//                     })
//                   }
//                 />
//                 <ul>
//                   {editingFilter.list.map((item, index) => (
//                     <li key={index}>
//                       <input
//                         type="text"
//                         value={item}
//                         onChange={(e) => {
//                           const updatedList = [...editingFilter.list];
//                           updatedList[index] = e.target.value;
//                           setEditingFilter({
//                             ...editingFilter,
//                             list: updatedList,
//                           });
//                         }}
//                       />
//                       <button
//                         onClick={() =>
//                           handleDeleteFilterItem(editingFilter.id, index)
//                         }
//                       >
//                         Видалити
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//                 <div>
//                   <input
//                     type="text"
//                     placeholder="Новий елемент"
//                     value={newItem}
//                     onChange={(e) => setNewItem(e.target.value)}
//                   />
//                   <button onClick={handleAddFilterItem}>Додати елемент</button>
//                 </div>
//                 <button onClick={() => handleUpdateFilter(filter.id)}>
//                   Зберегти
//                 </button>
//                 <button onClick={() => setEditingFilter(null)}>
//                   Скасувати
//                 </button>
//               </div>
//             ) : (
//               <div>
//                 <strong>{filter.name}</strong> ({filter.transliter}) -{" "}
//                 {filter.list.join(", ")}
//                 <button onClick={() => handleEditClick(filter)}>
//                   Редагувати
//                 </button>
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

export default function FiltersManuscript() {
  const [filters, setFilters] = useState([]);
  const [editingFilter, setEditingFilter] = useState(null);
  const [newItem, setNewItem] = useState("");
  const [previousItem, setPreviousItem] = useState(""); // Зберігає попереднє значення

  useEffect(() => {
    fetchFilters();
  }, []);

  const fetchFilters = async () => {
    const querySnapshot = await getDocs(collection(db, "filtersManuscript"));
    setFilters(
      querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
  };

  const handleUpdateFilter = async (id) => {
    if (editingFilter) {
      const filterRef = doc(db, "filtersManuscript", id);
      await updateDoc(filterRef, { ...editingFilter });

      // Якщо змінювався елемент у list, викликаємо функцію оновлення товарів
      if (previousItem && newItem) {
        await updateProducts(editingFilter.transliter, previousItem, newItem);
      }

      setEditingFilter(null);
      setNewItem("");
      setPreviousItem("");
      await fetchFilters(); // Оновлення списку після редагування
    }
  };

  const handleDeleteFilterItem = (id, index) => {
    const itemToDelete = editingFilter.list[index];
    const updatedList = editingFilter.list.filter((_, idx) => idx !== index);
    setPreviousItem(itemToDelete); // Зберігаємо попереднє значення перед видаленням
    setEditingFilter({ ...editingFilter, list: updatedList });
  };

  const handleAddFilterItem = () => {
    if (newItem.trim()) {
      setEditingFilter({
        ...editingFilter,
        list: [...editingFilter.list, newItem.trim()],
      });
      setNewItem("");
    }
  };

  const handleEditClick = (filter) => {
    setEditingFilter({ ...filter });
  };

  const updateProducts = async (field, oldValue, newValue) => {
    const productsRef = collection(db, "manuscript");
    const q = query(productsRef, where(field, "array-contains", oldValue));
    const querySnapshot = await getDocs(q);

    // Оновлення кожного продукту, що містить старе значення
    for (const productDoc of querySnapshot.docs) {
      const productData = productDoc.data();

      // Заміна старого значення на нове у масиві
      const updatedArray = productData[field].map((item) =>
        item.toLowerCase() === oldValue.toLowerCase() ? newValue : item
      );

      const productRef = doc(db, "manuscript", productDoc.id);
      await updateDoc(productRef, { [field]: updatedArray });
    }
  };

  return (
    <div>
      <h2>Управління фільтрами</h2>
      <ul>
        {filters.map((filter) => (
          <li key={filter.id}>
            {editingFilter && editingFilter.id === filter.id ? (
              <div>
                <input
                  type="text"
                  value={editingFilter.name}
                  onChange={(e) =>
                    setEditingFilter({ ...editingFilter, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={editingFilter.transliter}
                  onChange={(e) =>
                    setEditingFilter({
                      ...editingFilter,
                      transliter: e.target.value,
                    })
                  }
                />
                <ul>
                  {editingFilter.list.map((item, index) => (
                    <li key={index}>
                      <input
                        type="text"
                        value={item}
                        onFocus={() => setPreviousItem(item)} // Зберігаємо попереднє значення при фокусі
                        onChange={(e) => {
                          const updatedList = [...editingFilter.list];
                          updatedList[index] = e.target.value;
                          setNewItem(e.target.value); // Зберігаємо нове значення
                          setEditingFilter({
                            ...editingFilter,
                            list: updatedList,
                          });
                        }}
                      />
                      <button
                        onClick={() =>
                          handleDeleteFilterItem(editingFilter.id, index)
                        }
                      >
                        Видалити
                      </button>
                    </li>
                  ))}
                </ul>
                <div>
                  <input
                    type="text"
                    placeholder="Новий елемент"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                  />
                  <button onClick={handleAddFilterItem}>Додати елемент</button>
                </div>
                <button onClick={() => handleUpdateFilter(filter.id)}>
                  Зберегти
                </button>
                <button onClick={() => setEditingFilter(null)}>
                  Скасувати
                </button>
              </div>
            ) : (
              <div>
                <strong>{filter.name}</strong> ({filter.transliter}) -{" "}
                {filter.list.join(", ")}
                <button onClick={() => handleEditClick(filter)}>
                  Редагувати
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
