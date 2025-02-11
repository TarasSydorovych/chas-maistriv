import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import css from "./manageResponses.module.css";

const ManageResponses = () => {
  const [manuscripts, setManuscripts] = useState([]);
  const [selectedManuscript, setSelectedManuscript] = useState(null);

  useEffect(() => {
    const fetchManuscripts = async () => {
      try {
        const manuscriptsRef = collection(db, "manuscript");
        const manuscriptsSnapshot = await getDocs(manuscriptsRef);
        const manuscriptsData = manuscriptsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setManuscripts(manuscriptsData);
      } catch (error) {
        console.error("Error fetching manuscripts:", error);
      }
    };

    fetchManuscripts();
  }, []);

  const handleVisibilityChange = async (
    manuscriptId,
    responseIndex,
    isVisible
  ) => {
    try {
      const manuscriptRef = doc(db, "manuscript", manuscriptId);
      const updatedResponses = [...selectedManuscript.expertResponse];
      updatedResponses[responseIndex].visible = isVisible;

      await updateDoc(manuscriptRef, {
        expertResponse: updatedResponses,
      });

      setSelectedManuscript((prev) => ({
        ...prev,
        expertResponse: updatedResponses,
      }));

      console.log("Visibility updated successfully.");
    } catch (error) {
      console.error("Error updating visibility:", error);
    }
  };

  const handleDeleteResponse = async (manuscriptId, responseIndex, type) => {
    try {
      const manuscriptRef = doc(db, "manuscript", manuscriptId);
      const updatedResponses =
        type === "expert"
          ? [...selectedManuscript.expertResponse]
          : [...selectedManuscript.userResponse];
      updatedResponses.splice(responseIndex, 1);

      await updateDoc(manuscriptRef, {
        [type === "expert" ? "expertResponse" : "userResponse"]:
          updatedResponses,
      });

      setSelectedManuscript((prev) => ({
        ...prev,
        [type === "expert" ? "expertResponse" : "userResponse"]:
          updatedResponses,
      }));

      console.log("Response deleted successfully.");
    } catch (error) {
      console.error("Error deleting response:", error);
    }
  };

  const renderAvatar = (photoURL, name) => {
    if (photoURL) {
      return <img src={photoURL} alt={name} className={css.avatar} />;
    }
    return (
      <div className={css.defaultAvatar}>{name?.charAt(0).toUpperCase()}</div>
    );
  };

  return (
    <div className={css.manageWrap}>
      <h2>Управління відгуками</h2>

      <div className={css.manuscriptList}>
        <h3>Виберіть рукопис:</h3>
        {manuscripts.map((manuscript) => (
          <button
            key={manuscript.id}
            onClick={() => setSelectedManuscript(manuscript)}
            className={
              selectedManuscript?.id === manuscript.id ? css.activeButton : ""
            }
          >
            {manuscript.bookName}
          </button>
        ))}
      </div>

      {selectedManuscript && (
        <div className={css.responsesWrap}>
          <h3>Відгуки експертів</h3>
          {selectedManuscript.expertResponse?.map((response, index) => (
            <div key={index} className={css.responseItem}>
              <div className={css.responseHeader}>
                {renderAvatar(response.photoURL, response.name)}
                <p>
                  <strong>Експерт:</strong> {response.name}
                </p>
              </div>
              <p>
                <strong>Відгук:</strong> {response.text}
              </p>
              <div className={css.responseActions}>
                <label>
                  Видимість:
                  <input
                    type="checkbox"
                    checked={response.visible}
                    onChange={(e) =>
                      handleVisibilityChange(
                        selectedManuscript.id,
                        index,
                        e.target.checked
                      )
                    }
                  />
                </label>
                <button
                  onClick={() =>
                    handleDeleteResponse(selectedManuscript.id, index, "expert")
                  }
                  className={css.deleteButton}
                >
                  Видалити
                </button>
              </div>
            </div>
          ))}

          <h3>Відгуки користувачів</h3>
          {selectedManuscript.userResponse?.map((response, index) => (
            <div key={index} className={css.responseItem}>
              <div className={css.responseHeader}>
                {renderAvatar(response.photoURL, response.name)}
                <p>
                  <strong>Користувач:</strong> {response.name}
                </p>
              </div>
              <p>
                <strong>Відгук:</strong> {response.text}
              </p>
              <button
                onClick={() =>
                  handleDeleteResponse(selectedManuscript.id, index, "user")
                }
                className={css.deleteButton}
              >
                Видалити
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageResponses;
