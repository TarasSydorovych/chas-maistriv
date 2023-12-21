import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const fetchProductsAll = createAsyncThunk(
  "products/fetchProductsAll",
  async () => {
    const collectionRef = collection(db, "product");
    const snapshot = await getDocs(collectionRef);
    const products = snapshot.docs.map((doc) => doc.data());
    return products;
  }
);
// export const fetchProducts = createAsyncThunk(
//   "products/fetchProducts",
//   async (selectedFilters) => {
//     console.log(selectedFilters);
//     let collectionRef = collection(db, "product");
//     // Для кожного вибраного фільтру формуємо запит до колекції з урахуванням цього фільтру
//     selectedFilters.forEach((filter) => {
//       collectionRef = query(
//         collectionRef,
//         where(filter.field, "==", filter.value)
//       );
//     });

//     const snapshot = await getDocs(collectionRef);
//     const products = snapshot.docs.map((doc) => doc.data());

//     return products;
//   }
// );
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (selectedFilters) => {
    console.log(selectedFilters);
    const collectionRef = collection(db, "product");
    const snapshot = await getDocs(collectionRef);
    const allProducts = snapshot.docs.map((doc) => doc.data());

    // Фільтруємо товари локально відповідно до вибраних фільтрів
    const filteredProducts = allProducts.filter((product) =>
      selectedFilters.some((filter) => {
        const productValue = product[filter.field];

        // Перевіряємо, чи поле є масивом
        if (Array.isArray(productValue)) {
          return productValue.includes(filter.value);
        }

        // Перевіряємо, чи поле є стрінгою
        return productValue === filter.value;
      })
    );

    return filteredProducts;
  }
);

// export const fetchProducts = createAsyncThunk(
//   "products/fetchProducts",
//   async (selectedFilters) => {
//     console.log(selectedFilters);
//     let collectionRef = collection(db, "product");

//     // Створюємо об'єкт, де ключі - це унікальні поля, а значення - це масив значень для кожного поля
//     const filtersByField = selectedFilters.reduce((acc, filter) => {
//       if (!acc[filter.field]) {
//         acc[filter.field] = [];
//       }
//       acc[filter.field].push(filter.value);
//       return acc;
//     }, {});

//     // Для кожного поля використовуємо відповідний метод порівняння
//     Object.entries(filtersByField).forEach(([field, values]) => {
//       if (field === "prodType") {
//         // Якщо це поле prodType, перевірте тип значення та використовуйте відповідний метод
//         values.forEach((value) => {
//           if (typeof value === "string") {
//             collectionRef = query(collectionRef, where(field, "==", value));
//           } else if (Array.isArray(value)) {
//             collectionRef = query(
//               collectionRef,
//               where(field, "array-contains-any", value)
//             );
//           }
//         });
//       } else if (Array.isArray(values) && values.length > 1) {
//         // Якщо значення - масив і має більше одного елемента, використовуйте array-contains-any
//         collectionRef = query(
//           collectionRef,
//           where(field, "array-contains-any", values)
//         );
//       } else if (Array.isArray(values) && values.length === 1) {
//         // Якщо значення - масив і має один елемент, також використовуйте array-contains-any
//         collectionRef = query(
//           collectionRef,
//           where(field, "array-contains-any", values)
//         );
//       } else {
//         // Якщо значення - простий string, використовуйте простий where
//         collectionRef = query(collectionRef, where(field, "in", values));
//       }
//     });

//     const snapshot = await getDocs(collectionRef);
//     const products = snapshot.docs.map((doc) => doc.data());

//     return products;
//   }
// );

export const fetchProductsInSearch = createAsyncThunk(
  "products/fetchProductsInSearch",
  async (searchTerm) => {
    const collectionRef = collection(db, "product");
    const snapshot = await getDocs(collectionRef);
    const products = snapshot.docs.map((doc) => doc.data());

    const lowercaseSearchTerm = searchTerm.toLowerCase();

    // Фільтруємо на стороні сервера для наближеного пошуку
    const filteredProducts = products.filter(
      (product) =>
        product.bookName.toLowerCase().includes(lowercaseSearchTerm) ||
        product.bookName.includes(searchTerm)
    );
    console.log("З редюсера", filteredProducts);
    return filteredProducts;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
  },
  reducers: {
    setProducts(state, action) {
      state.items = action.payload;
    },
    addProduct(state, action) {
      state.items.push(action.payload);
    },
    removeProduct(state, action) {
      state.items = state.items.filter(
        (product) => product.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAll.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsAll.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProductsAll.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductsInSearch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsInSearch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Оновлення списку товарів для пошуку
      })
      .addCase(fetchProductsInSearch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setProducts, addProduct, removeProduct } = productSlice.actions;

export default productSlice.reducer;
