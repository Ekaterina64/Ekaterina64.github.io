import classNames from "classnames"
import { useEffect, useState } from "react"
import AppHeader from "../app-header/app-header"
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import IngredientDetails from '../ingredient-details/ingredient-details'
import Modal from '../modal/modal'
import styles from "./app.module.css"

const API_INGREDIENTS_URL = "https://norma.nomoreparties.space/api/ingredients";

const App = () => {

  const [data, setData] = useState([]);

  const [isModalDetailsOpened, setIsModalDetailsOpened] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const onModalClose = () => {
    setIsModalDetailsOpened(false);
  };

  function handleClick(ingredient) {
    setIsModalDetailsOpened(true);
    setSelectedIngredient(ingredient);
  };

  function getData() {
    fetch(API_INGREDIENTS_URL)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(({data}) => setData(data))
      .catch((e) => {
        console.log(e.message);
        console.log(e.response);      
      });
  }

  useEffect(() => {
    getData();
  }, []);
  
  return (
    <>
      { data &&
        <>
          <AppHeader/>
          <div className={classNames(styles.burgerContainer, "pl-5 pr-5")}>
            <BurgerIngredients data={data} onClick={handleClick}/>
            <BurgerConstructor/>
          </div>
          <Modal title='Детали ингредиента' isOpened={isModalDetailsOpened} onClose={onModalClose}>
            {selectedIngredient && (
              <IngredientDetails ingredient={selectedIngredient} />
            )}
          </Modal>
        </>
      }
    </>
  );
};

export default App;