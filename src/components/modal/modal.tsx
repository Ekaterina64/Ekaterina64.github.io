import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { FC, ReactNode, useEffect } from 'react'
import ReactDOM from 'react-dom'
import ModalOverlay from '../modal-overlay/modal-overlay'
import styles from './modal.module.css'

const modalRoot = document.getElementById('modals') as HTMLDivElement

type TModalProps = {
	onClose: () => void
	title?: string
	titleSize: 'main-large' | 'digits-default'
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
				<div className={styles.content} data-testid='modal'>
					<p
						className={`
							text text_type_${props.titleSize} pt-3 pb-3
							${styles.title}
						`}
						data-testid='modal_title'
					>
						{props.title}
					</p>
					<button
						className={styles.closeButton}
						onClick={props.onClose}
						data-testid='close_button'
					>
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
