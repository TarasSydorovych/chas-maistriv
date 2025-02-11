import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import Fuse from "fuse.js";
export const fetchProductsAll = createAsyncThunk(
  "products/fetchProductsAll",
  async () => {
    const collectionRef = collection(db, "product");
    const snapshot = await getDocs(collectionRef);
    // const products = snapshot.docs.map((doc) => doc.data());
    const products = snapshot.docs
      .map((doc) => doc.data())
      .filter(
        (product) =>
          product.productVisible === true || product.productVisible === "true"
      )
      .sort((a, b) => {
        const sorterA = Number(a.sorterNumber) || Infinity;
        const sorterB = Number(b.sorterNumber) || Infinity;
        return sorterA - sorterB;
      });
    return products;
  }
);

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (selectedFilters) => {
    const collectionRef = collection(db, "product");
    const snapshot = await getDocs(collectionRef);
    const allProducts = snapshot.docs
      .map((doc) => doc.data())
      .filter(
        (product) =>
          product.productVisible === true || product.productVisible === "true"
      );

    // Фільтруємо товари локально відповідно до вибраних фільтрів
    const filteredProducts = allProducts
      .filter((product) =>
        selectedFilters.some((filter) => {
          const productValue = product[filter.field];

          // Перевіряємо, чи поле є масивом
          if (Array.isArray(productValue)) {
            return productValue.includes(filter.value);
          }

          // Перевіряємо, чи поле є стрінгою
          return productValue === filter.value;
        })
      )
      .sort((a, b) => {
        const sorterA = Number(a.sorterNumber) || Infinity;
        const sorterB = Number(b.sorterNumber) || Infinity;
        return sorterA - sorterB;
      });

    return filteredProducts;
  }
);

// export const fetchProductsInSearch = createAsyncThunk(
//   "products/fetchProductsInSearch",
//   async (searchTerm) => {
//     const collectionRef = collection(db, "product");
//     const snapshot = await getDocs(collectionRef);
//     const products = snapshot.docs.map((doc) => doc.data());

//     const lowercaseSearchTerm = searchTerm.toLowerCase();

//     // Фільтруємо на стороні сервера для наближеного пошуку
//     const filteredProducts = products.filter(
//       (product) =>
//         product.bookName.toLowerCase().includes(lowercaseSearchTerm) ||
//         product.bookName.includes(searchTerm)
//     );

//     return filteredProducts;
//   }
// );
export const fetchProductsInSearch = createAsyncThunk(
  "products/fetchProductsInSearch",
  async (searchTerm) => {
    const collectionRef = collection(db, "product");
    const snapshot = await getDocs(collectionRef);
    const products = snapshot.docs
      .map((doc) => doc.data())
      .filter(
        (product) =>
          product.productVisible === true || product.productVisible === "true"
      );

    const fuseOptions = {
      keys: [
        "bookName",
        "longDesk",
        "yearGroup",
        "seria",
        "priceMas",
        "moreText",
        "bookLanguage",
        "ganr",
        "readLove",
        "forWho",
        "metVzaem",
        "seria",
      ], // Поля для пошуку
      threshold: 0.2, // Визначає мінімальний відсоток збігу (0.0 - ідеально точний збіг, 1.0 - дуже неточний)
    };

    const fuse = new Fuse(products, fuseOptions);
    const searchResults = fuse.search(searchTerm).map((result) => result.item);

    const sortedResults = searchResults.sort((a, b) => {
      const sorterA = Number(a.sorterNumber) || Infinity;
      const sorterB = Number(b.sorterNumber) || Infinity;
      return sorterA - sorterB;
    });

    return sortedResults;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    searchResults: [], // Додано для зберігання результатів пошуку
    status: "idle",
    error: null,
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
    clearSearchResults(state) {
      state.searchResults = []; // Додано для очищення результатів пошуку
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
        state.searchResults = action.payload; // Оновлення списку товарів для пошуку
      })
      // .addCase(fetchProductsInSearch.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.items = action.payload; // Оновлення списку товарів для пошуку
      // })
      .addCase(fetchProductsInSearch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setProducts, addProduct, removeProduct, clearSearchResults } =
  productSlice.actions;

export default productSlice.reducer;
