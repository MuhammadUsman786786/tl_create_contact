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
		emptyValidation(customerVatNumber, 'btw nummer')
	) {
		return true
	}
	return false
}
