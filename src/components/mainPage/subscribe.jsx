import { Link, useNavigate } from "react-router-dom";
import imgLogog from "../../img/logSubscribe.png";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Subscribe({ setLogin }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubscribeClick = () => {
    if (isAuthenticated) {
      navigate("/user");
    } else {
      setLogin(true);
    }
  };

  return (
    <div className="subscribeWrap">
      <img src={imgLogog} className="logSubscribe" alt="Subscribe Logo" />
      <p className="subscribeP">
        Підпишись щоб <br />
        <span className="subscribePSpan">отримати знижку</span>
      </p>
      <button className="subscribeButton" onClick={handleSubscribeClick}>
        Підписатися
      </button>
    </div>
  );
}
