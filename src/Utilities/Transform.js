import * as _ from 'lodash'
import {STATUS_KEYS} from "./Constants";

const getBooleanByType = (value) => {
	return value === STATUS_KEYS.TRUE
}

export const pullValue = (dataList) => {
	return _.map(dataList || [], ({value}) => value)
}

export const buildApiParams = (props) => {
	const {
//user info
		customerName,
		customerVatNumber,
		customerEmail,
		salesName,
		salesEmail,

//top section
		isMultiSite,
		totalSitesCount,

// infra section
		isOnGoingContractPeriod,
		isDect,
		currentPowerStation,
		typeCentrale,
		
		totalUserOnPBX,
		simulatedLinesOrChannelsCount,
		simulatedLinesOrChannelsUnit,
		
		numberOfFixedPhones,
		numberOfReceptionHighEnd,
		
		numberOfHomeWorkers,
		isFaxAvailable,
		typeFax,
		
		numberOfSoftPhones,
		numberOfHeadSets,
		
		desiredFunctions,

//other connected devices
		parlefoonCount,
		parlefoonTypeAndBrand,
		parlefoonType,
		
		
		
		frankeerMachineCount,
		frankeerMachineTypeAndBrand,
		frankeerMachineType,
		
		conferenceDeviceCount,
		conferenceDeviceTypeAndBrand,
		conferenceDeviceType,

//data infra
		isUTPCablingAvailable,
		isWifiAvailable,
		isServerPresent,
		isServerMeetSpecification,

// virtualization
		Ups,
		VmWare,
		hyperV,
		ErpOrCrm,

//supplier section
		currentSupplier,
		isSupplierSatisfied,
		supplierNotSatisfiedReason,
		whereWeCanAddValue,
	} = props || {}
	
	
	const emails = [ {type: "primary", email: customerEmail} ]
	const custom_fields = [
		{name: 'sales_name', value: salesName},
		{name: 'sales_email', value: salesEmail},
		{name: 'is_multi_site', value: getBooleanByType(isMultiSite)},
		{name: 'total_sites_count', value: totalSitesCount},
		{name: 'is_ongoing_contract_period', value: isOnGoingContractPeriod},
		{name: 'is_dect', value: getBooleanByType(isDect)},
		{name: 'current_power_station', value: currentPowerStation},
		{name: 'type_centrale', value: pullValue(typeCentrale)},
		{name: 'total_user_on_pbx', value: totalUserOnPBX},
		{name: 'simulated_lines_or_channels_count', value: simulatedLinesOrChannelsCount},
		{name: 'simulated_lines_or_channels_unit', value: simulatedLinesOrChannelsUnit},
		{name: 'number_of_fixed_phones', value: numberOfFixedPhones},
		{name: 'number_Of_reception_high_end', value: numberOfReceptionHighEnd},
		{name: 'number_of_home_workers', value: numberOfHomeWorkers},
		{name: 'is_fax_available', value: getBooleanByType(isFaxAvailable)},
		{name: 'is_analog_digital_fax', value: pullValue(typeFax)},
		{name: 'number_of_home_workers', value: numberOfHomeWorkers},
		{name: 'is_fax_available', value: isFaxAvailable},
		{name: 'number_of_soft_phones', value: numberOfSoftPhones},
		{name: 'number_of_head_sets', value: numberOfHeadSets},
		{name: 'desired_functions', value: desiredFunctions},
		
		{name: 'parlefoon_count', value: parlefoonCount},
		{name: 'parlefoon_type_and_brand', value: parlefoonTypeAndBrand},
		{name: 'parlefoon_type', value: pullValue(parlefoonType)},
		
		{name: 'frankeer_machine_count', value: frankeerMachineCount},
		{name: 'frankeer_machineType_and_brand', value: frankeerMachineTypeAndBrand},
		{name: 'frankeer_machine_type', value: pullValue(frankeerMachineType)},
		
		{name: 'conference_device_count', value: conferenceDeviceCount},
		{name: 'conference_device_type_and_brand', value: conferenceDeviceTypeAndBrand},
		{name: 'conference_device_type', value: pullValue(conferenceDeviceType)},
		
		{name: 'is_utp_cabling_available', value: getBooleanByType(isUTPCablingAvailable)},
		{name: 'is_wifi_available', value: getBooleanByType(isWifiAvailable)},
		{name: 'is_server_present', value: getBooleanByType(isServerPresent)},
		{name: 'is_server_meet_specification', value: getBooleanByType(isServerMeetSpecification)},
		
		{name: 'ups', value: getBooleanByType(Ups)},
		{name: 'vm_ware', value: getBooleanByType(VmWare)},
		{name: 'hyper_V', value: getBooleanByType(hyperV)},
		{name: 'erp_or_crm', value: getBooleanByType(ErpOrCrm)},
		
		{name: 'currentSupplier', value: currentSupplier},
		{name: 'is_supplier_satisfied', value: getBooleanByType(isSupplierSatisfied)},
		{name: 'supplier_not_satisfied_reason', value: supplierNotSatisfiedReason},
		{name: 'where_we_can_add_value', value: whereWeCanAddValue},
	
	]
	
	let summary = ''
	for (const customField of custom_fields) {
		summary += `${customField.name}: ${customField.value} \n`
	}
	
	const params = {
		name: customerName,
		vat_number: customerVatNumber,
		custom_fields,
		summary
	}
	if (emails?.[0]?.email) {
		params['emails'] = emails
	}
	return params
}
