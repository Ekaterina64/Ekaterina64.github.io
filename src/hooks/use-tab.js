import { useEffect, useState } from "react"
import { useInView } from 'react-intersection-observer'
import { Types } from "../utils/ingredient-types.js"

export const useTabs = () => {
  const [bunsRef, bunsInView] = useInView({ threshold: 0 });
  const [sousesRef, sousesInView] = useInView({ threshold: 0 });
  const [mainRef, mainInView] = useInView({ threshold: 0 });

	const [currentTab, setCurrentTab] = useState(Types.BUN);

	const onTabClick = (value) => {
		setCurrentTab(value);
		const element = document.getElementById(value);
    if (element) element.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
    bunsInView ?
      setCurrentTab(Types.BUN)
    : sousesInView ?
      setCurrentTab(Types.SOUSE)
    : 
		setCurrentTab(Types.MAIN);
  }, [bunsInView, sousesInView, mainInView]);

  return [
		currentTab,
		bunsRef,
		sousesRef,
		mainRef,
		onTabClick
	];
};