
import AppHeader from "../app-header/app-header"
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import styles from './app.module.css'
const App = () => {
  return (
    <>
      <AppHeader/>
      <div className={styles.burgerContainer}>
        <BurgerIngredients/>
      </div>
    </>
  );
};

export default App;