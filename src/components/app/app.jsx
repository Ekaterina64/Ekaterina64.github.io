import classNames from "classnames"
import { useEffect, useState } from "react"
import { IngredientsDataContext } from "../../services/app-context.js"
import { getIngredients } from '../../utils/api.js'
import AppHeader from "../app-header/app-header"
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import styles from "./app.module.css"

const App = () => {

  const [state, setState] = useState({hasError: false, data: []});

  function getData() {
    getIngredients()
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
        <IngredientsDataContext.Provider value={state.data}>
          <AppHeader/>
          <div className={classNames(styles.burgerContainer, "pl-5 pr-5")}>
            <BurgerIngredients/>
            <BurgerConstructor/>
          </div>
        </IngredientsDataContext.Provider>
      }
    </>
  );
};

export default App;