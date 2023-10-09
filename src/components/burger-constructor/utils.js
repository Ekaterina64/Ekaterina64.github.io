export const totalPriceSelector = state => {
  const {
    burgerConstructor: { burger },
  } = state;
	const allIngredients = [...burger.buns, ...burger.fillings ];
  return allIngredients.reduce((acc, item) => acc + item.price, 0);
};