import axios from "axios";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default async function checkTelegramSubscription(user) {
  const botToken = "5858336344:AAFCAgCiULYioy6lS81FWKEn4NpwaIa8WYE";
  const channelId = "-1001248914984";

  try {
    // Виклик Telegram Bot API для отримання інформації про підписку користувача
    const response = await axios.get(
      `https://api.telegram.org/bot${botToken}/getChatMember`,
      {
        params: {
          chat_id: channelId,
          user_id: user.telegramId,
        },
      }
    );

    if (
      response.data.ok &&
      response.data.result &&
      response.data.result.status === "member"
    ) {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const discount = Number(userDoc.data().discount);

        if (discount === 0) {
          await updateDoc(userRef, {
            discount: 5,
            category: 'Член "Клубу Майстрів"',
            signed: "true",
          });
        }
      }

      return true; // Користувач підписаний на канал
    } else {
      console.log("User is not a member of the channel");
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const discount = Number(userDoc.data().discount);

        if (discount === 5) {
          await updateDoc(userRef, {
            discount: 0,
            category: "Читач",
            signed: "false",
          });
          console.log("Discount updated to 0");
        }
      }
      return false; // Користувач не підписаний на канал
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.error("Error: User is not subscribed to the channel");

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const discount = Number(userDoc.data().discount);

        if (discount === 5) {
          await updateDoc(userRef, {
            discount: 0,
            category: "Читач",
            signed: "false",
          });
          console.log("Discount updated to 0");
        }
      }

      return false; // Користувач не підписаний на канал
    } else {
      console.error("Error calling Telegram Bot API:", error);
      return false; // Помилка при виклику Telegram Bot API
    }
  }
}
