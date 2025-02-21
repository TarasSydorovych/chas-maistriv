import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import css from "./adm.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import withFirebaseCollection from "../HOK/withFirebaseCollection";
const ProductList = ({ data }) => {
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
      name: "Психологічна експертиза",
      transliter: "psExpert",
    },
    {
      name: "Мовознавча експертиза",
      transliter: "lnExpert",
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
      transliter: "bookYear",
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
    {
      name: "перша кнопка текст",
      transliter: "labelOneText",
    },
    {
      name: "Друга кнопка назва",
      transliter: "labelTwoName",
    },
    {
      name: "Друга кнопка текст",
      transliter: "labelTwoText",
    },
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
    {
      name: "Третя кнопка текст",
      transliter: "labelThreText",
    },
    {
      name: "Четверта кнопка назва",
      transliter: "labelFourName",
    },
    {
      name: "Четверта кнопка текст",
      transliter: "labelFourText",
    },
    {
      name: "П'ята кнопка назва",
      transliter: "labelFiveName",
    },
    {
      name: "П'ята кнопка текст",
      transliter: "labelFiveText",
    },
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
  const [products, setProducts] = useState([]);
  const [editedProduct, setEditedProduct] = useState(null);

  const handleEdit = (product) => {
    setEditedProduct({ ...product });
  };
  console.log("editedProduct", editedProduct);

  const handleSave = async () => {
    if (editedProduct) {
      const productRef = doc(db, "product", editedProduct.uid);

      // Перевіряємо, чи всі поля в updatedData не є undefined або null
      const hasUndefinedOrNull = Object.values(editedProduct).some(
        (value) => value === undefined || value === null
      );

      if (hasUndefinedOrNull) {
        console.error("Some fields in updatedData are undefined or null");
        return;
      }

      // Оновлюємо документ у колекції
      await updateDoc(productRef, editedProduct);

      // Оновлюємо стан компоненти

      // Закінчуємо редагування
      setEditedProduct(null);
      window.location.reload();
    }
  };

  const handleCancel = () => {
    setEditedProduct(null);
  };

  const handleChange = (field, value, index) => {
    if (index !== undefined) {
      setEditedProduct((prevProduct) => {
        // Копіюємо масив та замінюємо значення за індексом
        const updatedArray = [...prevProduct[field]];
        updatedArray[index] = value;

        // Повертаємо новий об'єкт, замінюючи масив на оновлений
        return {
          ...prevProduct,
          [field]: updatedArray,
        };
      });
    } else {
      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        [field]: value,
      }));
    }
  };
  const richTextFields = [
    "labelOneText",
    "labelTwoText",
    "labelThreText",
    "labelFourText",
    "labelFiveText",
  ];
  useEffect(() => {
    setProducts(data);
  }, [data]);
  const handleNewMessage = (e, fieldName) => {
    e.preventDefault();

    if (!Array.isArray(editedProduct[fieldName])) {
      setEditedProduct((prev) => ({
        ...prev,
        [fieldName]: [prev[fieldName]],
      }));
    }
    setEditedProduct((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName] ? [...prev[fieldName], ""] : [""],
    }));
  };
  const handleDelete = async (productId) => {
    try {
      // Видалення документу за його ID
      await deleteDoc(doc(db, "product", productId));

      // Оновлення стану, видаляючи видалений продукт
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      window.location.reload();
    } catch (error) {
      console.error("Помилка видалення продукту:", error);
    }
  };
  const handleRemoveItem = (fieldName, index) => {
    setEditedProduct((prevProduct) => {
      if (Array.isArray(prevProduct[fieldName])) {
        // Копіюємо масив і видаляємо елемент за індексом
        const updatedArray = [...prevProduct[fieldName]];
        updatedArray.splice(index, 1);

        // Повертаємо новий об'єкт, замінюючи масив на оновлений
        return {
          ...prevProduct,
          [fieldName]: updatedArray,
        };
      } else {
        // Якщо поле не є масивом, замінюємо його на порожню строку
        return {
          ...prevProduct,
          [fieldName]: "",
        };
      }
    });
  };
  useEffect(() => {
    if (data) {
      const sortedProducts = data.sort((a, b) => {
        const sorterA = Number(a.sorterNumber) || Infinity;
        const sorterB = Number(b.sorterNumber) || Infinity;
        return sorterA - sorterB;
      });
      setProducts(sortedProducts);
    }
  }, [data]);
  return (
    <div className={css.divForList}>
      <h1>Список товарів</h1>
      <ul className={css.ulHer}>
        {products &&
          products.map((product, index) => (
            <li className={css.listLiProd} key={product.uid}>
              <p>
                {index + 1}. {product.bookName} - {product.price} грн
              </p>
              <button onClick={() => handleEdit(product)}>Редагувати</button>
              <button onClick={() => handleDelete(product.uid)}>
                Видалити
              </button>
            </li>
          ))}
      </ul>
      {editedProduct && (
        <div>
          <h2>Редагування товару</h2>
          {Object.keys(editedProduct).map((field) => {
            const obj = objList.find((item) => item.transliter === field);

            if (obj) {
              return (
                <div key={field}>
                  <label>{obj.name}:</label>
                  {Array.isArray(editedProduct[field]) ? (
                    <>
                      {editedProduct[field].map((item, index) => (
                        <div key={`${field}-${index}`}>
                          {richTextFields.includes(field) ? (
                            <ReactQuill
                              theme="snow"
                              value={item || ""}
                              onChange={(value) =>
                                handleChange(field, value, index)
                              }
                              className={css.quillEditor}
                            />
                          ) : (
                            <input
                              type="text"
                              value={item || ""}
                              onChange={(e) =>
                                handleChange(`${field}`, e.target.value, index)
                              }
                            />
                          )}
                          <button
                            onClick={() =>
                              handleRemoveItem(obj.transliter, index)
                            }
                          >
                            Видалити
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={(e) => handleNewMessage(e, obj.transliter)}
                      >
                        Додати ще один елемент
                      </button>
                    </>
                  ) : (
                    <>
                      {richTextFields.includes(field) ? (
                        <ReactQuill
                          theme="snow"
                          value={editedProduct[field] || ""}
                          onChange={(value) => handleChange(field, value)}
                          className={css.quillEditor}
                        />
                      ) : (
                        <input
                          type="text"
                          value={editedProduct[field] || ""}
                          onChange={(e) => handleChange(field, e.target.value)}
                        />
                      )}
                      <button onClick={() => handleRemoveItem(obj.transliter)}>
                        Видалити
                      </button>
                      <button
                        onClick={(e) => handleNewMessage(e, obj.transliter)}
                      >
                        Додати ще один елемент
                      </button>
                    </>
                  )}
                </div>
              );
            }

            return null;
          })}
          <button onClick={handleSave}>Зберегти</button>
          <button onClick={handleCancel}>Відмінити</button>
        </div>
      )}
    </div>
  );
};

export default withFirebaseCollection("product")(ProductList);
