import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { FC, ReactNode, useEffect } from 'react'
import ReactDOM from 'react-dom'
import ModalOverlay from '../modal-overlay/modal-overlay'
import styles from './modal.module.css'

const modalRoot = document.getElementById('modals') as HTMLDivElement

type TModalProps = {
	onClose: () => void
	title: string
	children: ReactNode
}

const Modal: FC<TModalProps> = props => {
	const onEscKeydown = React.useCallback((event: KeyboardEvent) => {
		event.key === 'Escape' && props.onClose()
	}, [])

	useEffect(() => {
		document.addEventListener('keydown', onEscKeydown)

		return () => document.removeEventListener('keydown', onEscKeydown)
	}, [onEscKeydown])

	return ReactDOM.createPortal(
		<>
			<div className={styles.modal}>
				<ModalOverlay onClose={props.onClose} />
				<div className={styles.content}>
					<h1
						className={`
							text text_type_main-large pt-3 pb-3
							${styles.title}
						`}
					>
						{props.title}
					</h1>
					<button className={styles.closeButton} onClick={props.onClose}>
						<CloseIcon type='primary' />
					</button>
					{props.children}
				</div>
			</div>
		</>,
		modalRoot
	)
}

export default Modal
