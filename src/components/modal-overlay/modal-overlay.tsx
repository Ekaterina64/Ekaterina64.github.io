import { FC, SyntheticEvent, useRef } from 'react'
import styles from './modal-overlay.module.css'

type TModalOverlayProps = {
	onClose: () => void
}

const ModalOverlay: FC<TModalOverlayProps> = props => {
	const overlayRef = useRef<HTMLDivElement>(null)

	const handleClick = (event: SyntheticEvent) => {
		if (event.target === overlayRef.current) {
			props.onClose()
		}
	}

	return (
		<div
			className={styles.modal_overlay}
			onClick={handleClick}
			ref={overlayRef}
		/>
	)
}

export default ModalOverlay
