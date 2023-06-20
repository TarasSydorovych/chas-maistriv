import { useState } from "react"
import { MyContext } from '../../../App';
import React, { useContext } from 'react';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {fetchProductsAll, fetchProducts} from '../../../function/manufacturesSlice'
import { addFilter, removeFilter } from '../../../function/filtersSliceMan';
import {auth, db} from '../../../firebase'
import {
    query,
   doc,
   getDocs,
    orderBy,
    onSnapshot,
    limit,
    where,
    updateDoc,
    collection,
  } from "firebase/firestore";
import { Link } from "react-router-dom";
export default function FilterMenuManu() {
   // const { selectedFilters, setSelectedFilters } = useContext(MyContext);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const dispatch = useDispatch();
    


const objFilter = [
    {
        name: 'Вид продукта',
        list: [
            'друкована книга',
            'друковани календар',
            'друкований комплект',
            'Ібук',
            'Рукописи',
            'суверніри',
            'картини художників ЧМ',
            'Подарочный сертификат "Книги на вибір"',
        ],
        transliter: "prodType",
    },
    {
        name: 'Вікова група',
        list: [
            'Книги для дітей до 1',
            'Книги для дітей 2 років',
            'Книги для дітей 3 років',
            'Книги для дітей 4 років',
            'Книги для дітей 5 років',
            'Книги для дітей 6 років',
            'Книги для дітей 7 років',
            'Книги для дітей 8 років',
            'Книги для дітей 9 років',
            'Книги для дітей 10 років',
            'Книги для дітей 11 років',
            'Книги для дітей 12 років',
            'Книги для дітей 13 років',
            'для підлітків',
            'Для батьків',
        ],
        transliter: "yearGroup",
    },
    {
        name: "Категрорія за об'ємом",
        list: [
            'тонка',
            'як палець',
            'товста',
        ],
        transliter: "priceMas",
    },
    {
        name: 'Навантаження текстом',
        list: [
            'Без тексту',
            'зовсім трохи',
            'не багато тексту',
            'помірно',
            'багато тексту',
            ],
            transliter: "moreText",
    },
    {
        name: 'Мова видання',
        list: [
            'Англійська',
            'Німецька',
            'Українська',
            'Польська',
            'російська',
            ],
            transliter: "bookLanguage",
    },
    {
        name: 'Жанр',
        list: [
            'Книга-гра',
            'Вімельбух',
            'Віконця',
            'книга-панорама',
            'книги пазли',
            'З рухливими елементами',
            'мультімедійна',
            'Книжка-картинка',
            'Комікс',
            'Казка',
            'Повість',
            'Роман (укр)',
            'long reader (укр)',
            'Оповідання',
            'фанфік',
            'Фантастика',
            'Фентезі',
            'детектив',
            'пригоди',
            'на основі реальних подій',
            'вірші',
            'фольк',
            'Енциклопедія',
            'Нонфікшен',
            'Путівник',
            'Розвивальна',
            'Навчальна',
        ],
        transliter: "ganr",
    },
    {
        name: 'Любов до читання',
        list: [
            'читає сама запоєм',
            'любить слухати',
            'Не любить читати сам',
            'Не любить читати і слухати',
           
            ],
            transliter: "readLove",
    },
    {
        name: 'За призначенням',
        list: [
            'Інформаційна',
            'Пізнавальні',
            'Про світ',
            'Виховна',
            'Розвиток мовлення',
            'Розвиваюча',
            'Навчальна',
            'Задає ритм',
            'Естетичний розвиток',
            'Підтримати захоплення',
            'Отримуємо досвід, цінний приклад',
            'Фомування образів',
            'Формування майбутнього',
            'Еволюційна для душі',
            'Мудрість',
            'Дає силу',
            'Культурологічна',
            'Філософська',
            'Психологічна',
            'Просвітитлює',
            'Насолода',
            'Розважальна',
            'Втеча від реальності',
            'Подорож у інший світ',
                ],
                transliter: "forWho",
    },
    {
        name: 'Спосіб взаємодії',
        list: [
            'читаємо',
            'граємо',
            'квест',
            'відгадуємо',
            'виконуємо завдання руками',
            'включаємо моторику',
            'наробляємо навики',
            'роздивляємося',
            'вигадуємо історії',
            'навчаємося',
            'виконуємо вправи',
            'малюємо',
            'розмальовуємо',
            'домальовуємо',
            'шукаємо',
            'відчуваємо',
            'пишемо',
            'складаємо пазли',
            
                ],
                transliter: "metVzaem",
    },
    {
        name: 'підбірки книг',
        list: [
            'Книги Ноу-хау',
            'Географія',
            'Тварини',
            'Філософські',
            'Терапевтичні',
            'Про всесвіт',
            'Відношення дітей',
            'Цінності',
            'Навички',
            'розважальні',
            'динозаври/дракони',
            'психологічні',
           
                ],
                transliter: "pidbirkuBoo",
    },
    {
        name: 'Серії',
        list: [
            'Я Граю Я Вчусь',
            'Вімельбух',
            'Відкривай (енциклопедії і пізнавальні)',
            'Открывай (энциклопедии и познавательные)',
            'Книжка іграшка',
            'Книжка-игрушка',
            'Рекомендуємо прочитати (укр)',
            'Рекомендуем прочитать (рус)',
            'Казкова допомога',
            'Сказочная помощь',
            'Краще дітям (укр)',
            'Лучшее детям (рус)',
            'Перша любов (укр+рос)',
            'Первая любовь',
            'Дитяча картинна галерея (ДКГ)',
            'Детская картинная галерея',
            'Малювальна історія',
            'Дитячий путівник',
            'Детский путеводитель',
            'Інтерактивні книги (завдання, наліпки)',
            'Дитячий календар',
            'Розумний розвиток',
            'Батькам',
            'Родителям',
            'Навчальна для школярів',
            'Хоббі-книга',
            'Сувеніри',
            'Картини художників ЧМ',
           
                ],
                transliter: "seria",
    },
    {
        name: 'Книжкові відзнаки',
        list: [
            'BookForum Best Book Award',
            'Книжка року',
            'Коронація слова',
            'Книга року BBC',
            'Еспресо. Вибір читачів',
            'Краща книга України',
            'Літературна премія імені Платона Воронька',
            'Премія імені Лесі Українки',
            'Національна премія України імені Тараса Шевченка',
            'Премія Григорія Сковороди',
           
           
                ],
                transliter: "vidznaku",
    },
]
const [products, setProducts] = useState([]);


  useEffect(() => {
    dispatch(fetchProducts(selectedFilters));
    
  }, [selectedFilters]);
  const handleFilterClickst = (filter) => {
    setSelectedFilters(prevFilters => {
      const index = prevFilters.findIndex(
        (selectedFilter) =>
          selectedFilter.field === filter.field && selectedFilter.value === filter.value
      );
  
      if (index === -1) {
        return [...prevFilters, filter];
      } else {
        return [
          ...prevFilters.slice(0, index),
          ...prevFilters.slice(index + 1),
        ];
      }
    });
  };
  const filters = useSelector(state => state.filters);
  console.log('Фільтерс з редаксу',filters);
  
const handleFilterClick = (filter) => {
    if (filters.some((selectedFilter) =>
      selectedFilter.field === filter.field && selectedFilter.value === filter.value
    )) {
      dispatch(removeFilter(filter));
    } else {
      dispatch(addFilter(filter));
    }
  };


    return(
        <div className="filterMenuWrapHeadr">

            <div className="secondBlockWrapFilterProd">
                <ul className="ulFirstfilter">
                    <li className="ulFirstfilterLi"><div className="blockCheckFilterJoin"></div>Предпродаж</li>
                    <li className="ulFirstfilterLi"><div className="blockCheckFilterJoin"></div>Новинка</li>
                    <li className="ulFirstfilterLi"><div className="blockCheckFilterJoin"></div>Останні екземпляри</li>
                    <li className="ulFirstfilterLi"><div className="blockCheckFilterJoin"></div>Святкові</li>
                </ul>
            </div>

             
                {objFilter.map((el, index) => {
              return(<div className="secondBlockWrapFilterProd" key={index}>
<p className="secondBlockWrapFilterProdP">{el.name}</p>
                <ul className="ulSecondfilter">
                    {el.list.map((value, index) => {
               const filter = { field: el.transliter, value: value };
                      return  <li  onClick={() => { handleFilterClick(filter)
                        handleFilterClickst(filter)
                      }
                    } className="ulSecondfilterLi" key={index}><div
                      className={`blockCheckFilterJoin ${
                        selectedFilters.some(
                          (selectedFilter) =>
                            selectedFilter.field === filter.field &&
                            selectedFilter.value === filter.value
                        )
                          ? "selected"
                          : ""
                      }`}
                    ></div>{value}</li>
                    })}
                
                </ul>
                </div>)
                })}
                

            

    <div className="twoButtonAllWrap">
<div className="buttonAllBooksFilter" onClick={() => dispatch(fetchProductsAll())}>
<Link className="buttonAllBooksFilterLink" to="/manuscriptCatalog">
Усі рукописи
</Link>
</div>
<div className="buttonAllBooksFilter" onClick={() => setSelectedFilters([])}>
Скинути
</div>
    </div>
    <div className="oneButtonAllWrap">
<div className="buttonWatch" >
    <Link className="buttonWatch" to="/manuscriptCatalog">
Дивитися</Link>
</div>

    </div>



        </div>
    )
}