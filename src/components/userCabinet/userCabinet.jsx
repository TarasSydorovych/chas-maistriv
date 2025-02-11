import css from "./userCabinet.module.css";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import iconProp from "../../img/iconProp.png";
import Group16 from "../../img/Group16.png";
import Group17 from "../../img/smallGroup.png";

import facForUs from "../../img/facForUs.png";
import mailForSoc from "../../img/mailForSoc.png";
import tgUser from "../../img/tgUser.png";
import checkTelegramSubscription from "../../function/checkTelegramSubscription";
import whatUser from "../../img/whatUser.png";
import { useState, useEffect } from "react";
import WaitProd from "./waitProd";
import discIcon from "../../img/discIcon.png";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import axios from "axios";
import withUserData from "../HOK/withUserData";
import {
  getAuth,
  signInWithPhoneNumber,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import elefant from "../../img/elefant.png";
import ViewProductCatalog from "../catalog/viewProductCatalog";
import WaitProdLike from "./waitProdLike";
import que from "../../img/que.png";
import BlockReader from "./blockReader";
import BlockMaister from "./blockMaister";
import BlockBusiness from "./blockBusiness";
import ChangeData from "./changeData";

const UserCabinet = ({
  setAddressChanged,
  addressChanged,
  windowDimensions,
  user,
  userBd,
  setCartCounterC,
  visitedProducts,

  setLikeCounterC,
}) => {
  const navigate = useNavigate();
  const [selectedText, setSelectedText] = useState(1);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [infoTg, setInfoTg] = useState(false);
  const [tgId, setTgId] = useState("");
  const [products, setProducts] = useState([]);

  const [realUser, setRealUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [workFunc, setWorkFunc] = useState(false);
  const [cheSetinings, setCheSetinings] = useState(false);
  const apiKey = "f579aac88b980dff3f819958ce1cbca6";
  const apiUrl = "https://api.novaposhta.ua/v2.0/json/";

  const [waitProdComponents, setWaitProdComponents] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = collection(db, "product");
      const productsSnapshot = await getDocs(productsRef);
      const productsList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(productsList);
    };
    fetchProducts();
  }, []);
  useEffect(() => {
    setRealUser(userBd);
  }, [userBd]);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollHeight = window.pageYOffset;
      setScrollHeight(currentScrollHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // Функція, що викликається при кліку на кнопку підписки

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        // Додайте необхідну логіку після виходу користувача
      })
      .catch((error) => {
        console.log("Помилка під час виходу з системи:", error);
      });
  };

  const handleBlockClick = (text) => {
    setSelectedText(text);
  };

  //Це робочий ефектіііііііііііііііііііііііііііііііііііііііііііііііііііііііі
  useEffect(() => {
    const fetchOrdersByUser = async () => {
      if (user) {
        try {
          const ordersRef = collection(db, "orders");
          const q = query(ordersRef, where("user", "==", user.uid));
          const querySnapshot = await getDocs(q);

          const parsedData = [];
          querySnapshot.forEach((doc) => {
            const order = { id: doc.id, ...doc.data() };
            const choice = JSON.parse(order.choice);
            choice.forEach((tovar) => {
              parsedData.push({ order, tovar });
            });
          });

          let filteredData;

          if (selectedText === 2) {
            filteredData = parsedData.filter(
              ({ order }) => order.status === "Очікує підтвердження"
            );
          } else if (selectedText === 3) {
            filteredData =
              JSON.parse(localStorage.getItem("likedProducts")) || [];
          } else {
            filteredData = parsedData.filter(
              ({ order }) => order.status !== "Очікує підтвердження"
            );
          }

          setOrders(filteredData);

          if (selectedText !== 3) {
            const ttnNumbers = filteredData.map(({ order }) => order.status);

            const response = await axios.post(apiUrl, {
              apiKey: apiKey,
              modelName: "TrackingDocument",
              calledMethod: "getStatusDocuments",
              methodProperties: {
                Documents: ttnNumbers.map((status) => ({
                  DocumentNumber: status,
                })),
              },
            });

            const statuses = response.data.data;
            // const waitProdComponents = filteredData.map(
            //   ({ order, tovar }, index) => {
            //     const status =
            //       statuses.find((s) => s.Number === order.status)?.Status ||
            //       "Очікує підтвердження";

            //     return (
            //       <WaitProd
            //         key={index}
            //         el={order}
            //         tovar={tovar}
            //         status={status}
            //       />
            //     );
            //   }
            // );
            const waitProdComponents =
              filteredData.length > 0 ? (
                filteredData.map(({ order, tovar }, index) => {
                  const status =
                    statuses.find((s) => s.Number === order.status)?.Status ||
                    "Очікує підтвердження";

                  return (
                    <WaitProd
                      key={index}
                      el={order}
                      tovar={tovar}
                      status={status}
                    />
                  );
                })
              ) : (
                <p>Актуальні замовлення відсутні.</p>
              );
            setWaitProdComponents(waitProdComponents);
          } else if (selectedText === 3) {
            const waitProdComponents = filteredData.map((tovar, index) => {
              return (
                <WaitProdLike
                  key={index}
                  tovar={tovar}
                  setCartCounterC={setCartCounterC}
                />
              );
            });

            setWaitProdComponents(waitProdComponents);
          }
        } catch (error) {
          console.error("Помилка при отриманні замовлень:", error);
        }
      }
    };

    fetchOrdersByUser();
  }, [user, selectedText]);
  const blocks = [
    { id: 1, text: "Статус замовлення" },
    { id: 2, text: "Чекають опрацювання" },
    { id: 3, text: "Бажане" },
  ];
  const onClickToElefant = () => {
    alert(
      "Слон дорівнює 1 грн. Слони нараховуються за ваші відгуки про наші книги. Ваші відгуки важливі, бо вони допомагають в просуванні книги в яку віримо ми і ви. Кількість слонів яка вам нараховується залежить від ціни і об'єму книги. Щоб отримати слони ви маєте розмістити відгук під книжкою яку ви раніше придбали. Слони не нараховуються автоматично за відгук, якщо ви не купували книгу на яку написали відгук на нашому сайті. Але вам можуть нарахуватись слони вручному режимі, якщо такий відгук підтвердить адміністратор сайта. Для цього ви повинні відправити лист адміністратору з посиланням на відгук."
    );
  };

  // TELEGRAM AUTHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH

  const handleClickInfo = () => {
    setInfoTg(!infoTg);
  };
  const changeInput = (e) => {
    setTgId(e.target.value);
  };
  useEffect(() => {
    setInfoTg(false);
  }, [workFunc]);
  const tgIdChange = async (uid) => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("__name__", "==", uid));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        const userRef = doc.ref;
        await updateDoc(userRef, { telegramId: tgId });
      });
      setWorkFunc(!workFunc);
      window.location.reload();
    } catch (error) {
      console.error("Помилка при оновленні значення telegramId:", error);
    }
  };

  //TELDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
  const openSet = () => {
    setCheSetinings(!cheSetinings);
  };
  console.log("realUser", realUser);

  return (
    <>
      {realUser && (
        <div>
          <div className={css.bleuLabel}>
            <div className={css.blueLabelWnutr}>
              <p className={css.firstTextInBlock}>
                Наша місія — допомогти батькам ростити дітей людьми, які вміють
                бути щасливими
              </p>
              <p className={css.firstTextInBlock}>
                Наша мета — створювати якісні дитячі книги, від яких важко
                відірватися, та які збагачують.
              </p>
            </div>
          </div>

          {realUser && (
            <div className={css.userInformationWrap}>
              <div className={css.userInformationWrapSmall}>
                <div className={css.yourInformation}>
                  <div className={css.userData}>
                    <div className={css.imgAutorWrapSmall}>
                      {realUser.photo && (
                        <img
                          src={realUser.photo}
                          className={css.imgAutorSmall}
                        />
                      )}
                      {realUser.photo === null && (
                        <img src={que} className={css.imgAutorSmall} />
                      )}
                    </div>
                    <div className={css.nameAndPropWr}>
                      {realUser.displayName && (
                        <h4 className={css.userNameHello}>
                          {realUser.displayName}, вітаємо!
                        </h4>
                      )}
                      {realUser.displayName === null && (
                        <h4 className={css.userNameHello}>
                          Користувач, вітаємо!
                        </h4>
                      )}
                      <div className={css.propWrap}>
                        <div className={css.newdso}>
                          <img src={iconProp} />
                          <p className={css.propP} onClick={openSet}>
                            Налаштування
                          </p>
                        </div>
                        <h2 className={css.outButton} onClick={handleLogout}>
                          Вийти з кабінету
                        </h2>
                      </div>
                      {cheSetinings && (
                        <ChangeData
                          scrollHeight={scrollHeight}
                          realUser={realUser}
                          setCheSetinings={setCheSetinings}
                          setRealUser={setRealUser}
                        />
                      )}
                    </div>
                  </div>
                  {windowDimensions && (
                    <img src={Group16} className={css.iconPicBird} />
                  )}
                  {!windowDimensions && (
                    <img src={Group17} className={css.iconPicBird} />
                  )}
                </div>
                <div className={css.ourInformation}>
                  <h4 className={css.yourRegistration}>
                    Ви зареєстровані як {realUser.category}
                  </h4>
                  <p className={css.yourDescription}>
                    Це дає вам знижки та доступ до коментів, а також ви
                    потрапляєте під роздачу слонів (бонусів), можете брати
                    участь в опікунських радах і тестуванні книг, впливати на
                    вибір обкладинок, назв текстів та обговорювати злободенні
                    питання. Якщо ви довіряєте нам як спеціалістам у виборі та
                    створенні дитячої книги, запрошуємо вас встановити з нами
                    прямий контакт через імейл, вайбер, телеграм, або вотсап.
                    Приєднуйтесь до спільноти поціновувачів книжок, підписавшись
                    на наші соцмережі. Настав Час майстрів.
                  </p>
                  <div className={css.socialWrap}>
                    <a
                      href="https://www.facebook.com/chasmaistriv"
                      target="_blanck"
                    >
                      <div className={css.standartsocial}>
                        <img src={facForUs} />
                      </div>
                    </a>
                    <a href="mailto:sales@chasmaistriv.com.ua" target="_blanck">
                      <div className={css.standartsocial}>
                        <img src={mailForSoc} />
                      </div>
                    </a>
                    <a href="https://t.me/chas_maistriv" target="_blanck">
                      <div className={css.standartsocial}>
                        <img src={tgUser} />
                      </div>
                    </a>
                    <a
                      href="https://invite.viber.com/?g2=AQBidB45Be8Vo057AydEGn81babrL0jatg7TIhXEIJeF4eMeFK1Qr4RQChEzk%2Fix"
                      target="_blanck"
                    >
                      <div className={css.standartsocial}>
                        <img src={whatUser} />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className={css.orderingProductWrap}>
            <div className={css.orderingProductWrapSmall}>
              <div className={css.wrapLab}>
                {blocks.map((block) => (
                  <div
                    key={block.id}
                    className={`${css.block} ${
                      block.id === selectedText ? css.selected : ""
                    }`}
                    onClick={() => handleBlockClick(block.id)}
                  >
                    {block.text}
                  </div>
                ))}
              </div>

              {waitProdComponents.length > 0 ? (
                <div className={css.waitOrderInPostWrap}>
                  {waitProdComponents}
                </div>
              ) : (
                <p></p>
              )}
            </div>
          </div>

          {realUser && realUser.signed === "false" && (
            <>
              <div className={css.yourDiscountWrap}>
                <div className={css.yourDiscountWrapSmall}>
                  <div className={css.dicsTextWr}>
                    <p className={css.yourDicrFive}>
                      Ваша знижка*
                      <br />
                      <span className={css.yourDicrFiveSpan}>
                        {realUser.discount}%
                      </span>
                    </p>
                    <p className={css.yourDicrFiveSmall}>
                      Для отримання знижки 5% підпишіться на наш телеграм канал{" "}
                    </p>
                  </div>
                  <img src={discIcon} className={css.discIconIc} />
                  <div className={css.buttonConfFRW}>
                    <p className={css.confirmP}>Детальніше</p>
                    <div className={css.likeButton} onClick={handleClickInfo}>
                      Інформація
                    </div>
                  </div>
                </div>
              </div>
              {infoTg && (
                <div className={css.yourDiscountWrapInfo}>
                  <div className={css.yourDiscountWrapSmall}>
                    <div className={css.dicsTextWrInfo}>
                      <p className={css.yourDicrFive}>
                        Для успішного отримання знижки вам потрібно зробити
                        наступні кроки:
                        <br />
                      </p>
                      <p className={css.yourDicrFiveSmall}>
                        1) Натисніть на кнопку отримати ID яка відкриє телеграм
                        бот для отримання вашого ID та натисніть START.
                        <br />
                        <br />
                        2) Скопіюйте отриманий ID та вставте його в поле ваш
                        телеграм ID.
                        <br />
                        <br />
                        3) Натисніть кнопку підписатись на телеграм канал Час
                        майстрів.
                        <br />
                        <br />
                        4) Врахуйте, що при скасуванні підписки знижка
                        автоматично анулюється!
                        <br />
                        <br />
                      </p>
                    </div>

                    <div className={css.buttonConfFRW}>
                      <a
                        className={css.likeButton}
                        href="https://t.me/getidsbot"
                        target="_blanck"
                      >
                        {" "}
                        <div className={css.likeButton}>Отримати ID</div>
                      </a>
                      <input
                        className={css.inputTgId}
                        value={tgId}
                        placeholder="Ваш телеграм ID"
                        onChange={changeInput}
                      ></input>
                      <a
                        className={css.likeButton}
                        href="https://t.me/chas_maistriv"
                        target="_blanck"
                      >
                        {" "}
                        <div
                          className={css.likeButton}
                          onClick={() => tgIdChange(user.uid)}
                        >
                          Підписатись
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {realUser && realUser.signed === "true" && (
            <div className={css.yourDiscountWrap}>
              <div className={css.yourDiscountWrapSmall}>
                <div className={css.dicsTextWr}>
                  <p className={css.yourDicrFive}>
                    Ваша знижка*
                    <br />
                    <span className={css.yourDicrFiveSpan}>
                      {realUser.discount}%
                    </span>
                  </p>
                  <p className={css.yourDicrFiveSmall}>
                    До знижки не додаються акції, розпродаж, предпродаж{" "}
                  </p>
                </div>
                <img src={discIcon} className={css.discIconIc} />
                <div className={css.buttonConfFRW}>
                  <p className={css.confirmP}>Запросити друга</p>
                  <div className={css.likeButton}>Запросити</div>
                </div>
              </div>
            </div>
          )}
          {realUser.category === 'Член "Клубу Майстрів"' && <BlockReader />}
          {realUser.category === "Читач" && <BlockReader />}
          {realUser.category === "Бізнес-партнер" && (
            <BlockBusiness userBd={realUser} />
          )}
          {realUser.category === "Майстер" && (
            <BlockMaister userBd={realUser} />
          )}
          {realUser.category === 'Член "Клубу Майстрів"' && (
            <div className={css.elefantWrap} onClick={onClickToElefant}>
              <div className={css.elefantWrapSmall}>
                <div className={css.elef}>
                  <img src={elefant} className={css.elefant} />
                  <p className={css.howMathElefant}>
                    Ваші слони <br />
                    <span className={css.howMathElefantSpan}>
                      {realUser.elefant}
                    </span>
                  </p>
                </div>
                <p className={css.elefantDescription}>
                  Ви можете <br /> сплачувати слонами
                  <br /> за наші книги
                  <br /> курс{" "}
                  <span className={css.elefantDescriptionSpan}>
                    1 Слон = 1 Грн
                  </span>
                </p>
              </div>
            </div>
          )}
          {realUser.category === "Читач" && (
            <div className={css.elefantWrap} onClick={onClickToElefant}>
              <div className={css.elefantWrapSmall}>
                <div className={css.elef}>
                  <img src={elefant} className={css.elefant} />
                  <p className={css.howMathElefant}>
                    Ваші слони <br />
                    <span className={css.howMathElefantSpan}>
                      {realUser.elefant}
                    </span>
                  </p>
                </div>
                <p className={css.elefantDescription}>
                  Ви можете <br /> сплачувати слонами
                  <br /> за наші книги{" "}
                  <span className={css.elefantDescriptionSpan}>
                    1 Слон = 1 Грн
                  </span>
                </p>
              </div>
            </div>
          )}
          <ViewProductCatalog
            products={products}
            setCartCounterC={setCartCounterC}
            setLikeCounterC={setLikeCounterC}
          />
        </div>
      )}
    </>
  );
};
export default withUserData(UserCabinet);
