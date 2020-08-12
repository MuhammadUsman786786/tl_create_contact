import {toast} from 'react-toastify'
import * as _ from 'lodash'

const emptyValidation = (value, label) => {
	if (_.isEmpty(value)) {
		toast.error(`${ label } is Required`)
		return false
	}
	return true
}
export const formValidationHandler = (props) => {
	const {customerName, customerVatNumber,} = props
	if (emptyValidation(customerName, 'zakelijke naam') &&
		emptyValidation(customerVatNumber, 'btw nummer') &&
		(!vatNumberValidation({value: customerVatNumber, isShowMessage: true}).isError)
	) {
		return true
	}
	return false
}

export const vatNumberValidation = (props) => {
	const {value, isShowMessage = false} = props || {}
	if (!_.isEmpty(value) && !_.startsWith(value,'BE')) {
		isShowMessage && toast.error('geldig formaat is BE00000')
		return {isError: true, message: 'geldig formaat is BE00000'}
	}
	return {isError: false}
}
