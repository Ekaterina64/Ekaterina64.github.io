import classNames from "classnames"
import { useContext, useState } from "react"
import { IngredientsDataContext } from '../../services/app-context.js'
import { TotalPriceContext } from '../../services/burger-constructor-context.js'
import { postOrder } from '../../utils/api.js'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import styles from "./burger-constructor.module.css"
import Burger from './burger/burger.jsx'
import PlaceOrder from "./place-order/place-order"

const BurgerConstructor = () => {

	const ingredients = useContext(IngredientsDataContext);
	const bun = ingredients.find((item) => item.type === 'bun');
	const fillings = ingredients.filter(item => item.type !== 'bun');

	const [totalPrice, setTotalPrice] = useState(0);
	const [orderDetails, setOrderDetails] = useState(null);
	const [isModalOrderDetailsOpened, setIsModalOrderDetailsOpened] = useState(false);

  const onModalOrderDetailsClose = () => {
    setIsModalOrderDetailsOpened(false);
  };

	const getIngredientsIds = (ingredients) => ingredients.map((i) => i._id);

	const onSubmit = () => {
    const ingredientsIds = getIngredientsIds([bun, ...fillings]);
    postOrder({ ingredients: ingredientsIds })
      .then((data) => {
        setOrderDetails(data);
        setIsModalOrderDetailsOpened(true);
      })
      .catch((err) => console.log(err));
  };
	
	return (
		<div className={classNames(styles.burgerConstructor, "mt-25")}>
			{ ingredients.length ?
				<>
					<TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>
						<Burger bun={bun} fillings={fillings}/>
						<PlaceOrder onSubmit={onSubmit}/>
					</TotalPriceContext.Provider>
					{ isModalOrderDetailsOpened &&
						<Modal
							title=''
							onClose={onModalOrderDetailsClose}
						>
							<OrderDetails orderNumber={orderDetails.order.number}/>
						</Modal>
					}
				</>
				:
				<p className="text text_type_main-large">
					Перетащите ингредиенты для составления бургера
				</p>
			}
		</div>
	);
};

export default BurgerConstructor;