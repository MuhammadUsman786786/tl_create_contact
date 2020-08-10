import React from 'react';
import {map} from 'lodash'
import {STATUS_KEYS} from "../../Utilities/Constants";

const DATA_LIST = [
	{id: '1', value: STATUS_KEYS.TRUE, title: 'JA'},
	{id: '2', value: STATUS_KEYS.FALSE, title: 'NEE'},
]
const MultiSelect = (props) => {
	const {name, dataList = DATA_LIST, value, title, className, onChange} = props || {}
	
	return (
		<div className={ className }>
			<span>{ title }</span>
			<select
				value={value}
				name={ name }
				className="form-control" onChange={ onChange }>
				{ map(dataList, ({id, value: itemValue, title: itemTitle}) => {
					return <option key={ id } value={ itemValue }>{ itemTitle }</option>
				}) }
			</select>
		</div>
	);
}

export default MultiSelect;
