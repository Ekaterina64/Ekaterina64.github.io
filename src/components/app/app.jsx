import classNames from "classnames"
import AppHeader from "../app-header/app-header"
import BurgerConstructor from "../burger-constructor/burger-constructor"
import BurgerIngredients from "../burger-ingredients/burger-ingredients"
import styles from "./app.module.css"

const App = () => {
  return (
    <>
      <AppHeader/>
      <div className={classNames(styles.burgerContainer, "pl-5 pr-5")}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </div>
    </>
  );
};

export default App;