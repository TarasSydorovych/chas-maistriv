const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const { format, addHours } = require("date-fns");
const app = express();
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");

// Завантаження змінних середовища з файлу .env
dotenv.config();
const port = 4000;
const {
  getFirestore,
  query,
  where,
  getDocs,
  getDoc,
  collection,
  doc,
  updateDoc,
  addDoc,
} = require("firebase/firestore");
const { initializeApp } = require("firebase/app");
// app.use(cors({ origin: "http://localhost:3000" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://chas-maistriv.com.ua");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(express.json());

// Додамо middleware для обробки CORS запитів
const firebaseConfig = {
  apiKey: "AIzaSyAkQCZosAm28-1oGmUDqH2CaDZQJY5ZBhY",
  authDomain: "chas-maistriv-4d49a.firebaseapp.com",
  projectId: "chas-maistriv-4d49a",
  storageBucket: "chas-maistriv-4d49a.appspot.com",
  messagingSenderId: "266780545903",
  appId: "1:266780545903:web:5ad83b1680d28da9eace9a",
  measurementId: "G-2949SXKMFH",
};

const application = initializeApp(firebaseConfig);
const db = getFirestore(application);

app.post("/create-payment", async (req, res) => {
  const payload = req.body;
  console.log("payload", payload);
  const needData = payload.newProduct;
  const choiceData = JSON.parse(needData.choice);
  const currentDateTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  const { newProduct, ...payloadForMonoBank } = payload;

  try {
    const url = "https://api.monobank.ua/api/merchant/invoice/create";

    const orderData = {
      source_id: 1,
      source_uuid: `${needData.uid}`,
      buyer_comment: "",
      manager_id: 1,
      manager_comment: "",
      promocode: "",
      discount_percent: needData.discount,
      discount_amount: 0,

      wrap_price: 0,
      taxes: 0,
      ordered_at: currentDateTime,
      buyer: {
        full_name: `${needData.name} ${needData.fatherName} ${needData.surName}`,
        email: "",
        phone: `${needData.phone}`,
      },
      shipping: {
        delivery_service_id: 1,
        tracking_code: "",
        shipping_service: "Нова Пошта",
        shipping_address_city: `${needData.cityName}`,
        shipping_address_country: "Ukraine",

        shipping_receive_point: `${needData.selectedDepartment}`,
        recipient_full_name: `${needData.nameOtr} ${needData.fatherNameOtr} ${needData.surNameOtr}`,
        recipient_phone: `${needData.phoneOtr}`,
        warehouse_ref: "",
        shipping_date: "",
      },
      products: choiceData.map((el, index) => {
        return {
          sku: `${el.id}`,
          price: `${el.price}`,
          discount_percent: "",
          discount_amount: "",
          quantity: `${el.quantity}`,
          unit_type: "шт",
          name: `${el.bookName}`,
          comment: "",
          picture: el.imageList[0],
          properties: [
            {
              name: "Color",
            },
          ],
        };
      }),

      payments: [
        {
          payment_method_id: "2",
          payment_method: "Apple Pay",
          amount: needData.totalPrice,
          description: "Авансовий платіж",
          payment_date: currentDateTime,
          status: "not_paid",
        },
      ],
    };

    const orderDataJSON = JSON.stringify(orderData);

    // Отримуємо дані для нового замовлення з запиту

    // Ваш URL API CRM
    const apiUrl = "https://openapi.keycrm.app/v1/order";

    // Ваш ключ авторизації
    const apiKey =
      "Bearer NWQwZGE2ZGYzZDYyNTQzNjJmMWJlMjA5OTE3MTFlNmI3ZjQyNTBmZQ";

    // Налаштовуємо заголовки для POST-запиту
    const headers = {
      "Content-Type": "application/json",
      Authorization: apiKey,
    };

    // Відправляємо POST-запит на API CRM
    const responseTow = await axios.post(apiUrl, orderDataJSON, { headers });

    // Повертаємо відповідь з API CRM
    // res.json(response.data);

    const response = await axios.post(url, payloadForMonoBank, {
      headers: {
        "Content-Type": "application/json",
        "X-Token": process.env.MONOBANK_API_TOKEN,
      },
    });
    try {
      const vacanciesCollection = collection(db, "invoice");

      // Створення об'єкта з даними для додавання до колекції
      const vacancyData = {
        id: payload.id,
        invoiceId: response.data.invoiceId,
        status: "wait",
      };
      // Додавання даних до колекції
      const docRef = await addDoc(vacanciesCollection, vacancyData);

      // Отримання ID новоствореного документа (вашого вакансії)
      const newVacancyId = docRef.id;
      await updateDoc(docRef, { uid: newVacancyId });
    } catch (error) {
      console.error("Error updating user data:", error);
    }
    console.log("Payment created successfully:", response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Error creating payment:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// app.post("/webhook", async (req, res) => {
//   try {
//     const dataFromMonobank = req.body;
//     console.log("Received data from Monobank:", dataFromMonobank);

//     if (dataFromMonobank.status === "success") {
//       // Отримання документу з колекції "invoice" за значенням "invoiceId"
//       const invoicesQuery = query(
//         collection(db, "invoice"),
//         where("invoiceId", "==", dataFromMonobank.invoiceId)
//       );
//       const invoicesSnapshot = await getDocs(invoicesQuery);
//       let invoiceDocId = null;

//       invoicesSnapshot.forEach((doc) => {
//         invoiceDocId = doc.id;
//       });

//       if (invoiceDocId) {
//         // Отримання ID товару з документу "invoice"
//         const invoiceDocRef = doc(db, "invoice", invoiceDocId);
//         const invoiceDocSnapshot = await getDoc(invoiceDocRef);
//         const orderId = invoiceDocSnapshot.data().id; // ID товару з документу

//         // Отримання документу товару з колекції "orders" за його ID
//         const orderDocRef = doc(db, "orders", orderId);
//         const orderDocSnapshot = await getDoc(orderDocRef);
//         const currentOrderData = orderDocSnapshot.data(); // Дані товару

//         const getOrdersUrl = "https://openapi.keycrm.app/v1/order";
//         const apiKey =
//           "Bearer NWQwZGE2ZGYzZDYyNTQzNjJmMWJlMjA5OTE3MTFlNmI3ZjQyNTBmZQ";

//         const responseData = await axios.get(getOrdersUrl, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: apiKey,
//           },
//         });

//         const orders = responseData.data;
//         const foundOrder = orders.data.find(
//           (order) => order.source_uuid === orderId
//         );
//         if (foundOrder) {
//           realOrderId = foundOrder.id;
//           console.log("Знайдено замовлення з id:", realOrderId);
//           const updatePaymentUrl = `https://openapi.keycrm.app/v1/order/${realOrderId}/payment`;

//           const updatePaymentData = {
//             payment_method_id: "2",
//             payment_method: "Apple Pay",
//             amount: orderData.amount,
//             status: "paid",
//             description: "Оплата підтверджена",
//             payment_date: currentDateTime,
//           };

//           const response = await axios.post(
//             updatePaymentUrl,
//             updatePaymentData,
//             {
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: apiKey,
//               },
//             }
//           );
//           console.log("Оновлено оплату:", response.data);

//           res.status(200).json({ success: true });
//         } else {
//           console.log("Замовлення не знайдено за заданим source_uuid");
//           res.status(404).json({ error: "Замовлення не знайдено" });
//         }

//         // Оновлення статусу оплати в документі замовлення
//         await updateDoc(orderDocRef, { paymentStatus: "true" });

//         console.log("Order payment status updated successfully");
//       }
//       // Відправка відповіді на запит з веб-хуку
//       res.status(200).send("Callback received successfully");
//     } else {
//       console.log("Invoice not found");
//       res.status(404).send("Invoice not found");
//     }
//   } catch (error) {
//     console.error("Error processing callback:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
app.post("/webhook", async (req, res) => {
  try {
    const dataFromMonobank = req.body;
    console.log("Received data from Monobank:", dataFromMonobank);

    if (dataFromMonobank.status === "success") {
      const invoicesQuery = query(
        collection(db, "invoice"),
        where("invoiceId", "==", dataFromMonobank.invoiceId)
      );
      const invoicesSnapshot = await getDocs(invoicesQuery);
      let invoiceDocId = null;

      invoicesSnapshot.forEach((doc) => {
        invoiceDocId = doc.id;
      });
      console.log("invoiceDocId", invoiceDocId);
      if (invoiceDocId) {
        const invoiceDocRef = doc(db, "invoice", invoiceDocId);
        const invoiceDocSnapshot = await getDoc(invoiceDocRef);

        const orderId = invoiceDocSnapshot.data().id;
        console.log("orderId", orderId);
        const orderDocRef = doc(db, "orders", orderId);
        await updateDoc(orderDocRef, {
          paymentStatus: "true",
        });

        const getOrdersUrl = "https://openapi.keycrm.app/v1/order";
        const apiKey =
          "Bearer NWQwZGE2ZGYzZDYyNTQzNjJmMWJlMjA5OTE3MTFlNmI3ZjQyNTBmZQ";

        const responseData = await axios.get(getOrdersUrl, {
          headers: {
            "Content-Type": "application/json",
            Authorization: apiKey,
          },
        });

        const orders = responseData.data;
        const foundOrder = orders.data.find(
          (order) => order.source_uuid === orderId
        );

        if (foundOrder) {
          const realOrderId = foundOrder.id;
          console.log("Знайдено замовлення з id:", realOrderId);
          const updatePaymentUrl = `https://openapi.keycrm.app/v1/order/${realOrderId}/payment`;

          const updatePaymentData = {
            payment_method_id: "2",
            payment_method: "Apple Pay",
            amount: dataFromMonobank.amount / 100,
            status: "paid",
            description: "Оплата підтверджена",
            payment_date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
          };

          const response = await axios.post(
            updatePaymentUrl,
            updatePaymentData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: apiKey,
              },
            }
          );
          console.log("Оновлено оплату:", response.data);

          res.status(200).json({ success: true });
        } else {
          console.log("Замовлення не знайдено за заданим source_uuid");
          res.status(404).json({ error: "Замовлення не знайдено" });
        }
      } else {
        console.log("Invoice not found");
        res.status(404).send("Invoice not found");
      }
    } else {
      console.log("Invoice not found");
      res.status(404).send("Invoice not found");
    }
  } catch (error) {
    console.error("Error processing callback:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/callback", async (req, res) => {
  const callbackData = req.body;
  const { data, signature } = callbackData;
  const orderData = JSON.parse(Buffer.from(data, "base64").toString("utf8"));
  const orderId = orderData.order_id.substring(2);
  const status = orderData.status;
  let realOrderId = null;

  if (verifySignature(data, signature) && status === "success") {
    const currentDateTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    try {
      const getOrdersUrl = "https://openapi.keycrm.app/v1/order";
      const apiKey =
        "Bearer NWQwZGE2ZGYzZDYyNTQzNjJmMWJlMjA5OTE3MTFlNmI3ZjQyNTBmZQ";

      const responseData = await axios.get(getOrdersUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: apiKey,
        },
      });

      const orders = responseData.data;
      const foundOrder = orders.data.find(
        (order) => order.source_uuid === orderId
      );
      if (foundOrder) {
        realOrderId = foundOrder.id;
        console.log("Знайдено замовлення з id:", realOrderId);
        const updatePaymentUrl = `https://openapi.keycrm.app/v1/order/${realOrderId}/payment`;

        const updatePaymentData = {
          payment_method_id: "2",
          payment_method: "Apple Pay",
          amount: orderData.amount,
          status: "paid",
          description: "Оплата підтверджена",
          payment_date: currentDateTime,
        };

        const response = await axios.post(updatePaymentUrl, updatePaymentData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: apiKey,
          },
        });
        console.log("Оновлено оплату:", response.data);

        await updateOrderStatusInFirebase(orderId, "success");
        res.status(200).json({ success: true });
      } else {
        console.log("Замовлення не знайдено за заданим source_uuid");
        res.status(404).json({ error: "Замовлення не знайдено" });
      }
    } catch (error) {
      console.error("Помилка при оновленні оплати:", error.message);
      res.status(500).json({ error: "Помилка при оновленні оплати" });
    }
  } else {
    if (!verifySignature(data, signature)) {
      console.error("Невірний підпис запиту");
    } else if (status !== "success") {
      console.log(`Платіж неуспішний: статус ${status}`);
    }
    res
      .status(400)
      .json({ error: "Невірний підпис запиту або неуспішний статус" });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущено на порту ${port}`);
});
