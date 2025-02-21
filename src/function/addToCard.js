import Swal from "sweetalert2";

export default function addToCart(uid) {
  let cartItems = [];

  // отримуємо корзину з localStorage
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cartItems = JSON.parse(storedCart);
  }

  // перевіряємо чи товар вже є в корзині
  const existingProductIndex = cartItems.findIndex((item) => item.uid === uid);

  if (existingProductIndex !== -1) {
    // якщо товар вже є в корзині, збільшуємо кількість на 1
    cartItems[existingProductIndex].quantity += 1;
  } else {
    // якщо товару немає в корзині, додаємо його
    cartItems.push({ uid: uid, quantity: 1 });
  }

  // зберігаємо оновлену корзину в localStorage
  localStorage.setItem("cart", JSON.stringify(cartItems));
  Swal.fire({
    icon: "success",
    title: "Товар доданий в корзину",
    confirmButtonColor: "#609966",
    timer: 1000,
    showConfirmButton: false,
  });
}
