import React, { useEffect, useState, useRef } from "react";
import { collection, query, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import css from "./adm.module.css";

// const OrderList = () => {
//     const [orders, setOrders] = useState([]);
//     const [selectedOrder, setSelectedOrder] = useState(null);
//     const [editingStatusId, setEditingStatusId] = useState(null);
//     const statusInputRef = useRef(null);

//     useEffect(() => {
//       const fetchOrders = async () => {
//         const ordersRef = collection(db, 'orders');
//         const querySnapshot = await getDocs(ordersRef);

//         const parsedData = [];
//         querySnapshot.forEach((doc) => {
//           const order = { id: doc.id, ...doc.data() };
//           const choice = JSON.parse(order.choice);
//           parsedData.push({ order, choice });
//         });

//         setOrders(parsedData);
//       };

//       fetchOrders();
//     }, []);

//     const handleStatusDoubleClick = (orderId) => {
//       setEditingStatusId(orderId);
//     };

//     const handleStatusChange = async (orderId, newStatus) => {
//       const orderDocRef = doc(db, 'orders', orderId);
//       await updateDoc(orderDocRef, { status: newStatus });

//       setOrders((prevOrders) =>
//         prevOrders.map((order) => {
//           if (order.order.id === orderId) {
//             return { ...order, order: { ...order.order, status: newStatus } };
//           }
//           return order;
//         })
//       );
//     };

//     const handleStatusBlur = () => {
//       setEditingStatusId(null);
//     };

//     const handleOrderClick = (order) => {
//       setSelectedOrder(order);
//     };

//     useEffect(() => {
//       if (editingStatusId === selectedOrder?.order.id && statusInputRef.current) {
//         statusInputRef.current.focus();
//       }
//     }, [editingStatusId, selectedOrder]);

//     return (
//       <div>
//         {orders.map((orderItem) => (
//           <div key={orderItem.order.id} onClick={() => handleOrderClick(orderItem)}>
//             <p>{orderItem.order.uid}</p>
//             {editingStatusId === orderItem.order.id ? (
//               <input
//                 type="text"
//                 value={orderItem.order.status}
//                 onChange={(e) => handleStatusChange(orderItem.order.id, e.target.value)}
//                 onBlur={handleStatusBlur}
//                 ref={statusInputRef}
//               />
//             ) : (
//               <p onDoubleClick={() => handleStatusDoubleClick(orderItem.order.id)}>{orderItem.order.status}</p>
//             )}
//             {selectedOrder === orderItem && (
//               <div>
//                 {orderItem.choice.map((tovar) => (
//                   <div key={tovar.id}>
//                     <p>{tovar.name}</p>
//                     <p>{tovar.price}</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   export default OrderList;
const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingStatusId, setEditingStatusId] = useState(null);
  const [selectedUid, setSelectedUid] = useState(null);
  const statusInputRef = useRef(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersRef = collection(db, "orders");
      const querySnapshot = await getDocs(ordersRef);

      const parsedData = [];
      querySnapshot.forEach((doc) => {
        const order = { id: doc.id, ...doc.data() };
        const choice = JSON.parse(order.choice);
        parsedData.push({ order, choice });
      });

      setOrders(parsedData);
    };

    fetchOrders();
  }, []);

  const handleStatusDoubleClick = (orderId) => {
    if (editingStatusId === orderId) {
      // Close status input if already editing
      setEditingStatusId(null);
    } else {
      // Start editing status
      setEditingStatusId(orderId);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const orderDocRef = doc(db, "orders", orderId);
    await updateDoc(orderDocRef, { status: newStatus });

    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.order.id === orderId) {
          return { ...order, order: { ...order.order, status: newStatus } };
        }
        return order;
      })
    );
  };

  const handleStatusBlur = () => {
    setEditingStatusId(null);
  };

  const handleOrderClick = (order) => {
    if (selectedOrder === order) {
      setSelectedOrder(null);
      setSelectedUid(null);
    } else {
      setSelectedOrder(order);
      setSelectedUid(order.order.uid);
    }
  };

  useEffect(() => {
    if (editingStatusId === selectedOrder?.order.id && statusInputRef.current) {
      statusInputRef.current.focus();
    }
  }, [editingStatusId, selectedOrder]);

  return (
    <div className={css.orderListAllWrap}>
      {orders.map((orderItem, index) => (
        <div className={css.wrapAllAll} key={index}>
          <div
            className={css.orderWrapListinAdm}
            onClick={() => handleOrderClick(orderItem)}
          >
            <p className={css.pOrderParag}>{orderItem.order.uid}</p>
            {editingStatusId === orderItem.order.id ? (
              <input
                type="text"
                value={orderItem.order.status}
                onChange={(e) =>
                  handleStatusChange(orderItem.order.id, e.target.value)
                }
                onBlur={handleStatusBlur}
                ref={statusInputRef}
              />
            ) : (
              <p
                className={css.pOrderParag}
                onDoubleClick={() =>
                  handleStatusDoubleClick(orderItem.order.id)
                }
              >
                {orderItem.order.status}
              </p>
            )}
          </div>
          {selectedUid === orderItem.order.uid && (
            <div>
              {orderItem.choice.map((tovar, index) => (
                <div key={index}>
                  <p className={css.pOrderParag}>
                    Данні замовника: {orderItem.order.surName}{" "}
                    {orderItem.order.name} {orderItem.order.fatherName}
                  </p>
                  <p className={css.pOrderParag}>
                    Спосіб оплати: {orderItem.order.pay}
                  </p>
                  <p className={css.pOrderParag}>
                    Телефон: {orderItem.order.phone}
                  </p>
                  <p className={css.pOrderParag}>
                    Адрес доставки: {orderItem.order.cityName},{" "}
                    {orderItem.order.selectedDepartment}
                  </p>
                  <p className={css.pOrderParag}>
                    Новий користувач:{" "}
                    {orderItem.order.isNewBuyer === true ? "так" : "ні"}
                  </p>
                  <p className={css.pOrderParag}>
                    Статус оплати:{" "}
                    {orderItem.order.paymentStatus === "false"
                      ? "не оплачено"
                      : "оплачено"}
                  </p>
                  <p className={css.pOrderParag}>
                    Данні для відправки: {orderItem.order.surNameOtr}{" "}
                    {orderItem.order.nameOtr} {orderItem.order.fatherNameOtr}
                  </p>
                  <p className={css.pOrderParag}>
                    Загальна вартість замовлення: {orderItem.order.totalPrice}
                  </p>
                  <p className={css.pOrderParag}>
                    Статус замовлення: {orderItem.status}
                  </p>

                  {editingStatusId === orderItem.order.id ? (
                    <input
                      type="text"
                      value={orderItem.order.status}
                      onChange={(e) =>
                        handleStatusChange(orderItem.order.id, e.target.value)
                      }
                      onBlur={handleStatusBlur}
                      ref={statusInputRef}
                    />
                  ) : (
                    <p
                      onDoubleClick={() =>
                        handleStatusDoubleClick(orderItem.order.id)
                      }
                    >
                      Статус замовлення: {orderItem.order.status}
                    </p>
                  )}
                  <p>Деталі замовлення:</p>
                  {orderItem.choice.map((el, index) => (
                    <div key={index} className={css.prodDescWrap}>
                      <p className={css.pOrderParag}>
                        Назва книги: {el.bookName}
                      </p>
                      <p className={css.pOrderParag}>
                        Кількість: {el.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderList;
