import classNames from "classnames"
import { useEffect, useState } from "react"
import { getIngredients } from '../../utils/burger-api.js'
import AppHeader from "../app-header/app-header"
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import IngredientDetails from '../ingredient-details/ingredient-details'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import styles from "./app.module.css"

const NORMA_API = "https://norma.nomoreparties.space/api";

const App = () => {

  const [state, setState] = useState({hasError: false, data: []});
  
  const [isModalIngredientsDetailsOpened, setIsModalIngredientsDetailsOpened] = useState(false);
  const [isModalOrderDetailsOpened, setIsModalOrderDetailsOpened] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const onModalIngredientDetailsClose = () => {
    setIsModalIngredientsDetailsOpened(false);
  };

  const onModalOrderDetailsClose = () => {
    setIsModalOrderDetailsOpened(false);
  };

  function handleClick(ingredient) {
    setIsModalIngredientsDetailsOpened(true);
    setSelectedIngredient(ingredient);
  };

  function handleButtonClick() {
    setIsModalOrderDetailsOpened(true);
  };

  function getData() {
    getIngredients(NORMA_API)
      .then(({data}) => setState({hasError: false, data}))
      .catch((e) => {
        setState({
          ...state,
          hasError: true
        });
        console.log(e.message);
        console.log(e.response);      
      });
  }

  useEffect(() => {
    getData();
  }, []);

  if(state.hasError) {
    return <p>Что то пошло не так... Попробуйте перезагрузить</p>
  }
  
  return (
    <>
      { state.data &&
        <>
          <AppHeader/>
          <div className={classNames(styles.burgerContainer, "pl-5 pr-5")}>
            <BurgerIngredients data={state.data} onClick={handleClick}/>
            <BurgerConstructor onClick={handleButtonClick}/>
          </div>
          { isModalIngredientsDetailsOpened &&
            <Modal
              title='Детали ингредиента'
              onClose={onModalIngredientDetailsClose}
            >
              {selectedIngredient && (
                <IngredientDetails ingredient={selectedIngredient}/>
              )}
            </Modal>
          }
          { isModalOrderDetailsOpened &&
            <Modal
              title=''
              onClose={onModalOrderDetailsClose}
            >
              <OrderDetails/>
            </Modal>
          }
        </>
      }
    </>
  );
};

export default App;