import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import ModalOverlay from '../modal-overlay/modal-overlay'
import styles from './modal.module.css'

const modalRoot = document.getElementById('modals')

const Modal = props => {
	const onEscKeydown = React.useCallback(evt => {
		if (evt.key === 'Escape') {
			props.onClose()
		}
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

Modal.propTypes = {
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	children: PropTypes.element,
}

export default Modal
