import css from "./logIn.module.css";
import { HandySvg } from "handy-svg";
import iconSrc from "../../../svg/xCardIcon.svg";
import apple from "../../../svg/apple.svg";
import face from "../../../svg/faceIconEnter.svg";
import google from "../../../svg/googleEnter.svg";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { SlArrowDown } from "react-icons/sl";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  auth,
  db,
  googleAuthProvider,
  appleProvider,
  facebookProvider,
} from "../../../firebase";
import {
  OAuthProvider,
  signInWithRedirect,
  FacebookAuthProvider,
} from "firebase/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";

export default function LogIn({ login, setLogin, setEnterUser, scrollHeight }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("+380");
  const [emailVal, setEmailVal] = useState("");
  const navigate = useNavigate();
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const close = () => {
    setLogin(false);
  };
  const changePage = () => {
    setLogin(false);
    setEnterUser(true);
  };
  const handlePhoneChange = (event) => {
    const newPhone = event.target.value;

    // Перевірка, чи починається телефонний номер на +380
    if (newPhone.startsWith("+380") && newPhone.length <= 13) {
      setPhone(newPhone);
    }
  };

  const changeMail = (e) => {
    setEmailVal(e.target.value);
  };

  const signUp = async (e) => {
    e.preventDefault();

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        emailVal,
        password
      );

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName: res.user.displayName,
        email: res.user.email,
        photo: res.user.photoURL,
        phone: phone,
        category: "Читач",
        telegramId: "",
        signed: "false",
        discount: "0",
        elefant: "0",
      });
      setLogin(false);
      setEnterUser(false);
    } catch (error) {
      alert("The user with this login is not registered", error);
    }
  };
  const singInWithGoogle = async (e) => {
    e.preventDefault();
    signInWithPopup(auth, googleAuthProvider)
      .then(async (result) => {
        const userDocRef = doc(db, "users", result.user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          await setDoc(userDocRef, {
            uid: result.user.uid,
            displayName: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
            phone: result.user.phoneNumber,
            category: "Читач",
            telegramId: "",
            signed: "false",
            discount: "0",
            elefant: "0",
          });
        }

        setLogin(false);
        setEnterUser(false);
      })
      .catch((err) => {
        console.log("Error");
      });
  };

  const signWithFacebook = async (e) => {
    e.preventDefault();
    console.log(facebookProvider);
    signInWithPopup(auth, facebookProvider)
      .then(async (result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log(result);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };
  const productBigWrapRef = useRef(null);
  useEffect(() => {
    const productBigWrapElement = productBigWrapRef.current;
    if (productBigWrapElement) {
      productBigWrapElement.style.top = `${scrollHeight}px`;
    }
  }, [productBigWrapRef]);

  return (
    <div className={css.cardWrap} ref={productBigWrapRef}>
      <div className={css.popUpWrap}>
        <div className={css.nameCountWrap}>
          <h2 className={css.countH2}></h2>
          <HandySvg
            src={iconSrc}
            width="28"
            className={css.countSvg}
            height="28"
            onClick={close}
          />
        </div>

        <div className={css.logInWrapText}>
          <h3 className={css.logInWrapTextH3}>Реєстрація</h3>
          <p className={css.logInWrapTextP}>
            Якщо ти вже з нами -{" "}
            <span onClick={changePage} className={css.logInWrapTextPA}>
              вхід
            </span>
          </p>
        </div>
        <div className={css.userInfoWrap}>
          <div className={css.userInfoWrapOne}>
            <p className={css.userInfoP}>Телефон</p>
            <div className={css.userPhoneWrap}>
              <div className={css.customSelectInCard}>
                <div className={css.praporWrap}>
                  <div className={css.blue}></div>
                  <div className={css.yellow}></div>
                </div>
                <SlArrowDown className={css.arrowDownNum} />
              </div>
              <input
                className={css.userInfoInputPhone}
                value={phone}
                onChange={handlePhoneChange}
                type="tel"
                pattern="\+380[0-9]{9}"
                required
              />
            </div>
          </div>
          <div className={css.userInfoWrapOne}>
            <p className={css.userInfoP}>Email</p>
            <input
              className={css.userInfoInput}
              value={emailVal}
              onChange={changeMail}
              type="text"
            />
          </div>
          <div className={css.userInfoWrapOne}>
            <p className={css.userInfoP}>Пароль</p>
            <input
              type={showPassword ? "text" : "password"}
              className={css.userInfoInput}
              value={password}
              onChange={handlePasswordChange}
            />
            <AiOutlineEye
              onClick={toggleShowPassword}
              className={css.eyeIcon}
            />
          </div>
        </div>

        <div className={css.logWithAppFacWrap}>
          <p className={css.logWithAppFacP}>За допомогою</p>
          <div className={css.logIconWrap}>
            <div className={css.icon}>
              <HandySvg src={apple} width="22.06" height="26.67" />
            </div>
            <div className={css.icon} onClick={signWithFacebook}>
              <HandySvg src={face} width="15" height="27" />
            </div>
            <div className={css.icon} onClick={singInWithGoogle}>
              <HandySvg src={google} width="26" height="26.93" />
            </div>
          </div>
        </div>

        <button onClick={signUp} className={css.buttonRegister}>
          Зареєструватися
        </button>
        <div className={css.contractWrap}>
          <p className={css.contractP}>
            Входячи в Час Майстрів ви приймаєте наші{" "}
            <a href="/publicOffer" className={css.contractPA}>
              Угоду користувача
            </a>{" "}
            і{" "}
            <a href="/publicOffer" className={css.contractPA}>
              Політику конфіденційності
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
