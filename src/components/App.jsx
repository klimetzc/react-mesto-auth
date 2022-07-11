import "../index.css";
import Header from "./Header";
import Profile from "./Profile";
import Footer from "./Footer";
import Elements from "./Elements";
import PopupEdit from "./PopupEdit";
import { useState, useEffect, createContext } from "react";
import PopupAvatar from "./PopupAvatar";
import PopupAdd from "./PopupAdd";
import PopupWithImage from "./PopupWithImage";
import api from "../utils/api";
import PopupDelete from "./PopupDelete";

export const Visibles = createContext("popupsVisible");
export const Theme = createContext("dark");
export const User = createContext("user");
export const Cards = createContext("cards");

const App = () => {
  const [user, setUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isTextShown, setIsTextShown] = useState(false);
  const [textMessage, setTextMessage] = useState("Вы ещё не добавили новых мест");
  const [isLoading, setIsLoading] = useState(true);
  const [currentCard, setCurrentCard] = useState(null);
  const [popupsVisible, setPopupsVisible] = useState({
    popup_edit: false,
    popup_add: false,
    popup_image: false,
    popup_avatar: false,
    popup_delete: false,
  });

  const [isLigthTheme, setIsLightTheme] = useState(
    localStorage.getItem("lightTheme") ? true : false
  );

  const [imgInPopup, setImgInPopup] = useState({
    link: "https://via.placeholder.com/150",
    alt: "Новое место",
  });

  const addCard = (placeName, placeLink) => {
    api
      .addCard(placeName, placeLink)
      .then((res) => {
        setCards([res, ...cards]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateAvatar = (inputAvatar) => {
    api
      .updateUserAvatar(inputAvatar)
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCard = (currentCard) => {
    api
      .deleteCard(currentCard)
      .then((res) => {
        setCards(cards.filter((item) => item._id !== currentCard));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateUserInfo = (inputName, inputProfession) => {
    api
      .updateUserInfo(inputName, inputProfession)
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    api
      .getUserData()
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .getCards()
      .then((res) => {
        setCards(res);
        setIsTextShown(false);
      })
      .catch((err) => {
        setTextMessage(`Ошибка: ${err.message}`);
        setIsTextShown(true);
      })
      .finally((res) => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Theme.Provider value={[isLigthTheme, setIsLightTheme]}>
      <div className={`page ${isLigthTheme ? "page_theme_light" : ""}`}>
        <Visibles.Provider value={[popupsVisible, setPopupsVisible]}>
          <Cards.Provider value={[cards, setCards]}>
            <User.Provider value={[user, setUser]}>
              <div className="main">
                <Header />
                <Profile user={user} />
                <Elements
                  cards={cards}
                  setImgInPopup={setImgInPopup}
                  user={user}
                  textMessage={textMessage}
                  isTextShown={isTextShown}
                  isLoading={isLoading}
                  setCurrentCard={setCurrentCard}
                />
                <Footer />
              </div>

              <PopupEdit
                opened={popupsVisible.popup_edit}
                type="popup_edit"
                submitHandler={updateUserInfo}
              ></PopupEdit>
              <PopupAvatar
                opened={popupsVisible.popup_avatar}
                type="popup_avatar"
                submitHandler={updateAvatar}
              ></PopupAvatar>
              <PopupAdd
                opened={popupsVisible.popup_add}
                type="popup_add"
                submitHandler={addCard}
              ></PopupAdd>
              <PopupWithImage
                opened={popupsVisible.popup_image}
                type="popup_image"
                imgInfo={imgInPopup}
              ></PopupWithImage>
              <PopupDelete
                type="popup_delete"
                opened={popupsVisible.popup_delete}
                currentCard={currentCard}
                submitHandler={deleteCard}
              />
            </User.Provider>
          </Cards.Provider>
        </Visibles.Provider>
      </div>
    </Theme.Provider>
  );
};

export default App;
