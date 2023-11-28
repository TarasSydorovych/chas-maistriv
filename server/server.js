const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const { format, addHours } = require("date-fns");
const app = express();
const port = 4000;
app.use(cors({ origin: "http://185.69.155.241:3000" }));
// Додамо middleware для обробки CORS запитів
app.use(cors());

// Парсер для обробки JSON даних у POST-запитах
app.use(bodyParser.json());
// Обробник POST-запитів з React додатка
app.post("/create-order", async (req, res) => {
  const needData = req.body;

  const choiceData = JSON.parse(needData.choice);
  const currentDateTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");

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

  try {
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
    const response = await axios.post(apiUrl, orderDataJSON, { headers });

    // Повертаємо відповідь з API CRM
    res.json(response.data);
  } catch (error) {
    // Обробка помилок
    console.error("Помилка: " + error.message);
    res.status(500).json({ error: "Помилка при створенні замовлення" });
  }
});
app.post("/callback", async (req, res) => {
  const callbackData = req.body;
  const currentDateTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  const orderId = callbackData.order_id.substring(2);
  let realOrderId = null;
  try {
    // Замініть це на фактичний ID вашого замовлення
    const getOrdersUrl = "https://openapi.keycrm.app/v1/order";

    // Ваш ключ авторизації
    const apiKey =
      "Bearer NWQwZGE2ZGYzZDYyNTQzNjJmMWJlMjA5OTE3MTFlNmI3ZjQyNTBmZQ";

    // Відправляємо GET-запит на отримання списку замовлень
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

      // Ваш ключ авторизації

      // Створюємо об'єкт для оновлення оплати
      const updatePaymentData = {
        payment_method_id: "2",
        payment_method: "Apple Pay",
        amount: "218.5",
        status: "paid",
        description: "Оплата підтверджена",
        payment_date: currentDateTime,
      };

      // Відправляємо POST-запит на оновлення оплати
      const response = await axios.post(updatePaymentUrl, updatePaymentData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: apiKey,
        },
      });
      console.log("Оновлено оплату:", response.data);
    } else {
      console.log("Замовлення не знайдено за заданим source_uuid");
    }
    console.log("Список замовлень:", orders);
    // Ваш URL API CRM для оновлення оплати
  } catch (error) {
    console.error("Помилка при оновленні оплати:", error.message);
    res.status(500).json({ error: "Помилка при оновленні оплати" });
  }
  if (callbackData.response_status === "success") {
  }
  // Отримано дані від callback, тепер можна їх обробити або зберегти

  // Відповідь сервера
  res.status(200).json({ success: true });
});

app.listen(port, () => {
  console.log(`Сервер запущено на порту ${port}`);
});
