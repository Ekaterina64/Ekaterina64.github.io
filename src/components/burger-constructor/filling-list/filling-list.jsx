import cn from "classnames"
import styles from "../burger-constructor.module.css"
import FillingItem from "./filling-item/filling_item"

const FillingList = () => {
	return (
		<ul className={cn(styles.list, "custom-scroll mt-4 mb-4 pl-4 pr-1")}>
			<FillingItem
				name={"Говяжий метеорит (отбивная)"}
				price={20}
				image={"https://code.s3.yandex.net/react/code/meat-04.png"}
			/>
			<FillingItem
				name={"Говяжий метеорит (отбивная)"}
				price={20}
				image={"https://code.s3.yandex.net/react/code/meat-04.png"}
			/>
			<FillingItem
				name={"Говяжий метеорит (отбивная)"}
				price={20}
				image={"https://code.s3.yandex.net/react/code/meat-04.png"}
			/>
			<FillingItem
				name={"Говяжий метеорит (отбивная)"}
				price={20}
				image={"https://code.s3.yandex.net/react/code/meat-04.png"}
			/>
			<FillingItem
				name={"Говяжий метеорит (отбивная)"}
				price={20}
				image={"https://code.s3.yandex.net/react/code/meat-04.png"}
			/>
			<FillingItem
				name={"Говяжий метеорит (отбивная)"}
				price={20}
				image={"https://code.s3.yandex.net/react/code/meat-04.png"}
			/>
		</ul>
	);
};

export default FillingList;