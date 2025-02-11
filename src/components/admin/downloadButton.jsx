// import React, { useState, useEffect } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../firebase";
// import * as XLSX from "xlsx";
// import css from "./adm.module.css";

// export default function ExportProducts() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const querySnapshot = await getDocs(collection(db, "product"));
//         const productList = querySnapshot.docs.map((doc) => doc.data());
//         setProducts(productList);
//       } catch (error) {
//         console.error("Помилка при отриманні товарів:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const exportToExcel = () => {
//     if (products.length === 0) {
//       alert("Немає товарів для експорту");
//       return;
//     }

//     const worksheet = XLSX.utils.json_to_sheet(products);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Товари");

//     XLSX.writeFile(workbook, "products.xlsx");
//   };

//   return (

//     <li className={css.listUlForAdmLi} onClick={exportToExcel}>
//       Завантажити ексель файл
//     </li>
//   );
// }
import React from "react";
import * as XLSX from "xlsx";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import css from "./adm.module.css";

const objList = [
  {
    name: "ISBN",
    transliter: "ISBN",
  },
  { name: "Код", transliter: "cod" },
  { name: "EAN", transliter: "ean" },
  { name: "Переказ", transliter: "perecaz" },
  { name: "Кількість в пачці", transliter: "kilcastInpachka" },
  { name: "Рік перевидання", transliter: "rikPerevudania" },
  { name: "Девіз", transliter: "deviz" },
  {
    name: "СЕО Імя книги",
    transliter: "ceoName",
  },
  {
    name: "Порядок відображення",
    transliter: "sorterNumber",
  },
  {
    name: "Відображення товару",
    transliter: "productVisible",
  },
  {
    name: "Назва книги",
    transliter: "bookName",
  },
  {
    name: "Прізвисько книги(коротка назва для короткої корзини)",
    transliter: "prizvusko",
  },
  {
    name: "Серія",
    transliter: "seria",
  },
  {
    name: "Автор тексту",
    transliter: "textAutor",
  },
  {
    name: "Коментар автора",
    transliter: "autorComment",
  },
  {
    name: "Коротко про автора",
    transliter: "shortAboutAuth",
  },
  {
    name: "Художник",
    transliter: "picWriter",
  },
  {
    name: "Коротко про художника",
    transliter: "shortAboutDesig",
  },
  {
    name: "Автор ідеї",
    transliter: "autorIdea",
  },
  {
    name: "Перекладач",
    transliter: "bookTranslater",
  },
  {
    name: "Редактор",
    transliter: "bRedaktor",
  },
  {
    name: "Дизайн",
    transliter: "bDesign",
  },
  {
    name: "Над макетом працювали",
    transliter: "onMakWork",
  },
  {
    name: "вид продукту",
    transliter: "prodType",
  },
  {
    name: "Ціна",
    transliter: "price",
  },
  {
    name: "Ціна без знижки",
    transliter: "priceSale",
  },
  {
    name: "Дата закінчення пред продажу",
    transliter: "predprodDate",
  },
  {
    name: "Новинка",
    transliter: "isNew",
  },
  {
    name: "Топ",
    transliter: "top",
  },
  {
    name: "Розпродаж",
    transliter: "rozprodaz",
  },
  {
    name: "Акція",
    transliter: "sale",
  },
  {
    name: "Предпродаж",
    transliter: "predprodag",
  },
  {
    name: "Палітурка",
    transliter: "paliturka",
  },
  {
    name: "Кількість сторінок",
    transliter: "pageCount",
  },
  {
    name: "формат (мм)",
    transliter: "bookFormat",
  },
  {
    name: "Товщина (мм)",
    transliter: "booksH",
  },
  {
    name: "Вага (гр)",
    transliter: "booksWei",
  },
  {
    name: "Рік видання",
    transliter: "yearWrite",
  },
  {
    name: "Мова видання",
    transliter: "bookLanguage",
  },
  {
    name: "Папір",
    transliter: "bookPaper",
  },
  {
    name: "Ілюстрації",
    transliter: "ilystracii",
  },
  {
    name: "Підбірки книг",
    transliter: "pidbirkuBoo",
  },
  {
    name: "Чому варто читати 1",
    transliter: "whyNeedReadO",
  },
  {
    name: "Чому варто читати 2",
    transliter: "whyNeedReadT",
  },
  {
    name: "Чому варто читати 3",
    transliter: "whyNeedReadTH",
  },
  {
    name: "Лауреат Корнійчуковської премії",
    transliter: "laureat",
  },
  {
    name: "Книга року",
    transliter: "bookYear",
  },
  {
    name: "Категорія за ціною",
    transliter: "proceCat",
  },
  {
    name: "Категрорія за об'ємом",
    transliter: "priceMas",
  },
  {
    name: "Навантаження текстом",
    transliter: "moreText",
  },
  {
    name: "Любов до читання",
    transliter: "readLove",
  },
  {
    name: "Вікова група",
    transliter: "yearGroup",
  },
  {
    name: "Вікова група для відображення",
    transliter: "yearGroupFor",
  },
  {
    name: "Жанр",
    transliter: "ganr",
  },
  {
    name: "Спосіб взаємодії",
    transliter: "metVzaem",
  },
  {
    name: "За призначенням",
    transliter: "forWho",
  },
  {
    name: "Комплектація книги",
    transliter: "complectation",
  },
  {
    name: "Книжкові відзнаки",
    transliter: "vidznaku",
  },
  {
    name: "Популярність",
    transliter: "popular",
  },
  {
    name: "Герої книги",
    transliter: "bookHero",
  },
  {
    name: "Дивіз",
    transliter: "duviz",
  },
  {
    name: "Сила книги",
    transliter: "bookPower",
  },
  {
    name: "фото",
    transliter: "bookFoto",
  },
  {
    name: "фото розгорток",
    transliter: "fotoRozgort",
  },
  {
    name: "Відео",
    transliter: "bookVideo",
  },
  {
    name: "Короткий опис",
    transliter: "smallDesc",
  },
  {
    name: "Середній опис",
    transliter: "descriptionSe",
  },
  {
    name: "Довгий опис",
    transliter: "longDesk",
  },
  {
    name: "цитати з книги",
    transliter: "bookChu",
  },
  {
    name: "Ceo title",
    transliter: "ceoTitle",
  },
  {
    name: "Ceo description",
    transliter: "coeDescription",
  },
  {
    name: "Ceo keyWord",
    transliter: "coekeyWord",
  },
  {
    name: "Новинка",
    transliter: "novunka",
  },
  {
    name: "Перша кнопка назва",
    transliter: "labelOneName",
  },
  // {
  //   name: "перша кнопка текст",
  //   transliter: "labelOneText",
  // },
  {
    name: "Друга кнопка назва",
    transliter: "labelTwoName",
  },
  // {
  //   name: "Друга кнопка текст",
  //   transliter: "labelTwoText",
  // },
  {
    name: "Третя кнопка назва",
    transliter: "labelThreName",
  },
  {
    name: "Останній екземпляр",
    transliter: "lastExam",
  },
  {
    name: "Святкові",
    transliter: "svjatkovi",
  },
  // {
  //   name: "Третя кнопка текст",
  //   transliter: "labelThreText",
  // },
  {
    name: "Четверта кнопка назва",
    transliter: "labelFourName",
  },
  // {
  //   name: "Четверта кнопка текст",
  //   transliter: "labelFourText",
  // },
  {
    name: "П'ята кнопка назва",
    transliter: "labelFiveName",
  },
  // {
  //   name: "П'ята кнопка текст",
  //   transliter: "labelFiveText",
  // },
  {
    name: "Заголовок для блоку героя",
    transliter: "heroLabelText",
  },
  {
    name: "Параграф для блоку героя",
    transliter: "heroParagrafText",
  },
  {
    name: "Фото героя",
    transliter: "heroFoto",
  },
];

const DownloadButton = () => {
  const handleDownload = async () => {
    const querySnapshot = await getDocs(collection(db, "product"));
    const products = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const productRow = {};

      // Перебираємо objList і додаємо дані у відповідні стовпці
      objList.forEach(({ name, transliter }) => {
        const value = data[transliter];

        if (Array.isArray(value)) {
          productRow[name] = value.join(", "); // Масиви перетворюємо в рядок через кому
        } else {
          productRow[name] = value || ""; // Якщо немає значення - вставляємо пустий рядок
        }
      });

      products.push(productRow);
    });

    // Формуємо Excel
    const worksheet = XLSX.utils.json_to_sheet(products);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    // Завантажуємо файл
    XLSX.writeFile(workbook, "products.xlsx");
  };

  return (
    <li className={css.listUlForAdmLi} onClick={handleDownload}>
      Завантажити в Excel
    </li>
  );
};

export default DownloadButton;
