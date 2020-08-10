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
	{id: '1', title: ' zakelijke naam *', dataKey: 'customerName'},
	{id: '2', title: ' btw nummer *', dataKey: 'customerVatNumber'},
	{id: '3', title: ' zakelijke email', dataKey: 'customerEmail'},
	{id: '4', title: ' sales naam ', dataKey: 'salesName'},
	{id: '5', title: ' sales email', dataKey: 'salesEmail'},
]

export const SYNC_SOLUTION_DATALIST = [
	{id: '0', value: '', title: 'None'},
	{id: '1', value: 'Analog', title: 'Analog'},
	{id: '2', value: 'Digital', title: 'Digital'},
	{id: '3', value: 'ISDN', title: 'ISDN'},
	{id: '4', value: 'IP', title: 'IP'},
]
