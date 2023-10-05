import classNames from "classnames"
import { useContext, useState } from "react"
import { useModal } from '../../hooks/use-modal.js'
import { IngredientsDataContext } from '../../services/app-context.js'
import { TotalPriceContext } from '../../services/burger-constructor-context.js'
import { request } from '../../utils/api.js'
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
	const [isModalOpen, openModal, closeModal] = useModal();

	const getIngredientsIds = (ingredients) => ingredients.map((i) => i._id);

	const onSubmit = () => {
    const ingredientsIds = getIngredientsIds([bun, ...fillings]);
		request('orders', {
			body: JSON.stringify({ingredients: ingredientsIds}),
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		})
    .then((data) => {
			setOrderDetails(data);
			openModal();
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
					{ isModalOpen &&
						<Modal
							title=''
							onClose={closeModal}
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