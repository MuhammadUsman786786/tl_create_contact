import React from 'react';
import {INPUT_TYPES} from "../../Utilities/Constants";
import * as _ from 'lodash'

const CustomInputField = (props) => {
	const {type, name, placeholder, title, value, className, onChange, isTextArea} = props || {}
	const Wrapper = isTextArea ? "textarea" : "input"
	const textAreaProps = isTextArea ? {rows: 6} : {}
	return (
		<div className={ className }>
			<span>{ title }</span>
			<Wrapper
				min={ '0' }
				type={ type }
				name={ name }
				value={ value }
				className={ `form-control textarea-style` }
				placeholder={ placeholder }
				{ ...textAreaProps }
				onChange={ (event) => {
					const {target: {name, value}} = event || {}
					
					let formattedValue = value
					if (type === INPUT_TYPES.NUMBER && (isNaN(Number(value)) || value < 0)) {
						formattedValue = 0
					}
					onChange({target: {name, value: formattedValue}})
				} }/>
		</div>
	);
}

export default CustomInputField;
