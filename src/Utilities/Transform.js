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
		syncSolution,
		
		totalUserOnPBX,
		simulatedLinesOrChannelsCount,
		simulatedLinesOrChannelsUnit,
		
		numberOfFixedPhones,
		numberOfReceptionHighEnd,
		
		numberOfHomeWorkers,
		isFaxAvailable,
		analogDigitalFax,
		
		numberOfSoftPhones,
		numberOfHeadSets,
		
		desiredFunctions,
		
		//other connected devices
		parlefoonCount,
		parlefoonTypeAndBrand,
		isParlefoonAnalog,
		isParlefoonDigital,
		
		
		frankeerMachineCount,
		frankeerMachineTypeAndBrand,
		isFrankeerMachineAnalog,
		isFrankeerMachineDigital,
		
		conferenceDeviceCount,
		conferenceDeviceTypeAndBrand,
		isConferenceDeviceAnalog,
		isConferenceDeviceDigital,
		
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
		{id: 'sales_name', value: salesName},
		{id: 'sales_email', value: salesEmail},
		{id: 'is_multi_site', value: getBooleanByType(isMultiSite)},
		{id: 'total_sites_count', value: totalSitesCount},
		{id: 'is_ongoing_contract_period', value: isOnGoingContractPeriod},
		{id: 'is_dect', value: getBooleanByType(isDect)},
		{id: 'current_power_station', value: currentPowerStation},
		{id: 'sync_solution', value: pullValue(syncSolution)},
		{id: 'total_user_on_pbx', value: totalUserOnPBX},
		{id: 'simulated_lines_or_channels_count', value: simulatedLinesOrChannelsCount},
		{id: 'simulated_lines_or_channels_unit', value: simulatedLinesOrChannelsUnit},
		{id: 'number_of_fixed_phones', value: numberOfFixedPhones},
		{id: 'number_Of_reception_high_end', value: numberOfReceptionHighEnd},
		{id: 'number_of_home_workers', value: numberOfHomeWorkers},
		{id: 'is_fax_available', value: getBooleanByType(isFaxAvailable)},
		{id: 'is_analog_digital_fax', value: pullValue(analogDigitalFax)},
		{id: 'number_of_home_workers', value: numberOfHomeWorkers},
		{id: 'is_fax_available', value: isFaxAvailable},
		{id: 'number_of_soft_phones', value: numberOfSoftPhones},
		{id: 'number_of_head_sets', value: numberOfHeadSets},
		{id: 'desired_functions', value: desiredFunctions},
		
		{id: 'parlefoon_count', value: parlefoonCount},
		{id: 'parlefoon_type_and_brand', value: parlefoonTypeAndBrand},
		{id: 'is_parlefoon_analog', value: getBooleanByType(isParlefoonAnalog)},
		{id: 'is_parlefoon_digital', value: getBooleanByType(isParlefoonDigital)},
		
		{id: 'frankeer_machine_count', value: frankeerMachineCount},
		{id: 'frankeer_machineType_and_brand', value: frankeerMachineTypeAndBrand},
		{id: 'is_frankeer_machine_analog', value: getBooleanByType(isFrankeerMachineAnalog)},
		{id: 'is_frankeer_machine_digital', value: getBooleanByType(isFrankeerMachineDigital)},
		
		{id: 'conference_device_count', value: conferenceDeviceCount},
		{id: 'conference_device_type_and_brand', value: conferenceDeviceTypeAndBrand},
		{id: 'is_conference_device_analog', value: getBooleanByType(isConferenceDeviceAnalog)},
		{id: 'is_conference_device_digital', value: getBooleanByType(isConferenceDeviceDigital)},
		
		{id: 'is_utp_cabling_available', value: getBooleanByType(isUTPCablingAvailable)},
		{id: 'is_wifi_available', value: getBooleanByType(isWifiAvailable)},
		{id: 'is_server_present', value: getBooleanByType(isServerPresent)},
		{id: 'is_server_meet_specification', value: getBooleanByType(isServerMeetSpecification)},
		
		{id: 'ups', value: Ups},
		{id: 'vm_ware', value: VmWare},
		{id: 'hyper_V', value: hyperV},
		{id: 'erp_or_crm', value: ErpOrCrm},
		
		{id: 'currentSupplier', value: currentSupplier},
		{id: 'is_supplier_satisfied', value: getBooleanByType(isSupplierSatisfied)},
		{id: 'supplier_not_satisfied_reason', value: supplierNotSatisfiedReason},
		{id: 'where_we_can_add_value', value: whereWeCanAddValue},
	
	]
	
	
	const params = {
		name: customerName,
		vat_number: customerVatNumber,
		custom_fields
	}
	if (!_.isEmpty(emails)) {
		params['emails'] = emails
	}
	return params
}
