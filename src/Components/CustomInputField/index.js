import React from 'react';

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
				onChange={ onChange }/>
		</div>
	);
}

export default CustomInputField;
