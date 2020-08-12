import {vatNumberValidation} from "./Validation";

export const INPUT_TYPES = {
	NUMBER: 'number',
	TEXT: 'text'
}


export const STATUS_KEYS = {
	TRUE: 'TRUE',
	FALSE: 'FALSE'
}

export const SIMULATED_LINES_OR_CHANNEL_MAP = {
	LINES: 'LINES',
	CHANNELS: 'CHANNELS',
}
export const CHANNELS_DATA_LIST = [
	{id: '1', value: SIMULATED_LINES_OR_CHANNEL_MAP.LINES, title: 'lijnen'},
	{id: '2', value: SIMULATED_LINES_OR_CHANNEL_MAP.CHANNELS, title: 'kanalen'},
]

export const VIRTUALIZATION_DATA_LIST = [
	{id: '1', title: 'UPS', dataKey: 'Ups'},
	{id: '2', title: 'VMWare', dataKey: 'VmWare'},
	{id: '3', title: 'HyperV', dataKey: 'hyperV'},
	{id: '4', title: 'ERP/CRM', dataKey: 'ErpOrCrm'},
]

export const USER_INFO_DATA_LIST = [
	{id: '1', title: ' zakelijke naam *',placeholder:'', dataKey: 'customerName',validator:()=>true},
	{id: '2', title: ' btw nummer *',placeholder:'BE00000', dataKey: 'customerVatNumber',validator:(props)=>vatNumberValidation(props)},
	{id: '3', title: ' zakelijke email',placeholder:'', dataKey: 'customerEmail',validator:()=>true},
	{id: '4', title: ' sales naam ',placeholder:'', dataKey: 'salesName',validator:()=>true},
	{id: '5', title: ' sales email',placeholder:'', dataKey: 'salesEmail',validator:()=>true},
]

export const SYNC_SOLUTION_DATALIST = [
	{id: '1', value: 'Analog', title: 'Analog',label: 'Analog'},
	{id: '2', value: 'Digital', title: 'Digital',label: 'Digital'},
	{id: '3', value: 'ISDN', title: 'ISDN',label: 'ISDN'},
	{id: '4', value: 'IP', title: 'IP',label: 'IP'},
]

export const API_URL='http://www.google.com'
