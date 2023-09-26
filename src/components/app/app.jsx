import classNames from "classnames"
import { useEffect, useState } from "react"
import AppHeader from "../app-header/app-header"
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import styles from "./app.module.css"

const API_INGREDIENTS_URL = "https://norma.nomoreparties.space/api/ingredients";

const App = () => {

  const [data, setData] = useState([]);

  function getData() {
    fetch(API_INGREDIENTS_URL)
      .then((res) => res.json())
      .then(({data}) =>
        setData(data)
      )
      .catch((e) => {
        
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
            <BurgerIngredients data={data}/>
            <BurgerConstructor/>
          </div>
        </>
      }
    </>
  );
};

export default App;