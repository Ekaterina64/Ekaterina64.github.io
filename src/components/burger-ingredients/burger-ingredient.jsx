import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import classNames from "classnames"
import PropTypes from "prop-types"
import { useMemo } from 'react'
import { useDrag } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { SHOW_INFO } from '../../services/actions/burger-ingredients.js'
import { IngredientPropType } from "../../utils/prop-types.js"
import styles from "./burger-ingredients.module.css"

const BurgerIngredient = ({item}) => {
	const dispatch = useDispatch();
	
	const handleClick = () => {
		dispatch({
      type: SHOW_INFO,
      item
    });
	};

	const [{ opacity }, ref] = useDrag({
    type: 'ingredient',
    item: { ...item },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

	const buns = useSelector((state) => state.burgerConstructor.burger.buns);
  const fillings = useSelector((state) => state.burgerConstructor.burger.fillings);

  const count = useMemo(() => {
    const ingredients = [...buns, ...fillings];
    return ingredients.filter(ingredient => ingredient._id === item._id).length;
  }, [buns, fillings]);
	
	return (
		<li className={styles.item}>
			<div
				onClick={handleClick}
				ref={ref}
				style={{ opacity }}
			>
				{count > 0 && <Counter count={count} size='default'/>}
				<img className='ml-4 mr-4' src={item.image} alt="Ингредиент"/>
				<div className={classNames('mt-2 mb-2', styles.price)}>
					<p className="text text_type_digits-default mr-2">{item.price}</p>
					<CurrencyIcon/>
				</div>
				<p className={classNames("text text_type_main-default", styles.ingredientName)}>{item.name}</p>
			</div>
		</li>
	);
};

BurgerIngredient.propTypes = {
	item: PropTypes.shape(IngredientPropType).isRequired
};

export default BurgerIngredient;