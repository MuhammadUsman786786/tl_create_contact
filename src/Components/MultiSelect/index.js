import React from 'react';
import {map} from 'lodash'
import {STATUS_KEYS} from "../../Utilities/Constants";
import Select from "react-select";

const DATA_LIST = [
	{id: '1', value: STATUS_KEYS.TRUE, title: 'JA'},
	{id: '2', value: STATUS_KEYS.FALSE, title: 'NEE'},
]
const MultiSelect = (props) => {
	const {name, dataList = DATA_LIST, value, title, className, onChange, isMultiSelect = false} = props || {}
	
	return (
		<div className={ className }>
			<span>{ title }</span>
			{ isMultiSelect ?
				<Select
					defaultValue={ [] }
					isMulti
					name="colors"
					options={ dataList }
					className="basic-multi-select"
					classNamePrefix="select"
					onChange={ (updatedValue) => {
						onChange({target: {name, value: updatedValue}})
					} }
				/> :
				<select
					value={ value }
					name={ name }
					className="form-control" onChange={ onChange }>
					{ map(dataList, ({id, value: itemValue, title: itemTitle}) => {
						return <option key={ id } value={ itemValue }>{ itemTitle }</option>
					}) }
				</select>
			}
		</div>
	);
}

export default MultiSelect;
