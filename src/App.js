import './App.css';
import React, {Fragment, useState} from 'react';
import {CustomInputField, MultiSelect} from "./Components";
import {ToastContainer} from 'react-toastify';
import {
	API_URL,
	CHANNELS_DATA_LIST,
	INPUT_TYPES,
	SIMULATED_LINES_OR_CHANNEL_MAP,
	STATUS_KEYS, SYNC_SOLUTION_DATALIST,
	USER_INFO_DATA_LIST,
	VIRTUALIZATION_DATA_LIST
} from "./Utilities/Constants";
import {map} from 'lodash'
import {formValidationHandler} from "./Utilities/Validation";
import {buildApiParams} from "./Utilities/Transform";
import {toast} from 'react-toastify'

const isDev = true

const FORM_INITIAL_STATE = {

//user info
	customerName: isDev ? '' : '',
	customerVatNumber: isDev ? '' : '',
	customerEmail: isDev ? '' : '',
	salesName: isDev ? '' : '',
	salesEmail: isDev ? '' : '',

//top section
	isMultiSite: STATUS_KEYS.FALSE,
	totalSitesCount: 0,

// infra section
	isOnGoingContractPeriod: '',
	isDect: STATUS_KEYS.TRUE,
	currentPowerStation: '',
	typeCentrale: '',
	
	totalUserOnPBX: 0,
	simulatedLinesOrChannelsCount: 0,
	simulatedLinesOrChannelsUnit: SIMULATED_LINES_OR_CHANNEL_MAP.LINES,
	
	numberOfFixedPhones: 0,
	numberOfReceptionHighEnd: 0,
	
	numberOfHomeWorkers: 0,
	isFaxAvailable: STATUS_KEYS.FALSE,
	typeFax: STATUS_KEYS.TRUE,
	
	numberOfSoftPhones: 0,
	numberOfHeadSets: 0,
	
	desiredFunctions: '',

//other connected devices
	parlefoonCount: STATUS_KEYS.FALSE,
	parlefoonTypeAndBrand: '',
	parlefoonType: [],
	
	
	frankeerMachineCount: STATUS_KEYS.FALSE,
	frankeerMachineTypeAndBrand: '',
	frankeerMachineType: [],
	
	
	conferenceDeviceCount: STATUS_KEYS.FALSE,
	conferenceDeviceTypeAndBrand: '',
	conferenceDeviceType: [],

//data infra
	isUTPCablingAvailable: STATUS_KEYS.FALSE,
	isWifiAvailable: STATUS_KEYS.FALSE,
	isServerPresent: STATUS_KEYS.FALSE,
	isServerMeetSpecification: STATUS_KEYS.FALSE,

// virtualization
	Ups: STATUS_KEYS.FALSE,
	VmWare: STATUS_KEYS.FALSE,
	hyperV: STATUS_KEYS.FALSE,
	ErpOrCrm: STATUS_KEYS.FALSE,

//supplier section
	currentSupplier: '',
	isSupplierSatisfied: STATUS_KEYS.FALSE,
	supplierNotSatisfiedReason: '',
	whereWeCanAddValue: '',
	
}

const UserInfoSection = (props = {}) => {
	const {onChange} = props || {}
	return <div>
		{ map(USER_INFO_DATA_LIST, (item) => {
			const {id, title,placeholder, dataKey, validator = () => ({})} = item || {}
			const {isError=false, message=''} = validator({value:props[dataKey]})||{}
			return <div className='mb-3' key={id}>
				<div className='row' key={ id }>
				<div className='col-6 d-flex align-items-end'>
					<CustomInputField
						type={ INPUT_TYPES.TEXT }
						className='w-100'
						placeholder={ placeholder }
						title={ title }
						name={ dataKey }
						value={ props[dataKey] }
						onChange={ onChange }
					/>
				</div>
			</div>
				{isError &&<span className='text-danger'>{message}</span>}
			</div>
		}) }
	</div>
}

const TopSection = (props = {}) => {
	const {isMultiSite, totalSitesCount, onChange} = props || {}
	return <div className='row'>
		<div className='col-6'>
			<MultiSelect
				name='isMultiSite'
				value={ isMultiSite }
				title={ 'Multisite' }
				onChange={ onChange }
			/>
		</div>
		{ isMultiSite === 'TRUE' &&
		<div className='col-6 d-flex align-items-end'>
			<CustomInputField
				type={ INPUT_TYPES.NUMBER }
				className='w-100'
				placeholder="Sites"
				name='totalSitesCount'
				value={ totalSitesCount }
				onChange={ onChange }
			/>
		</div>
		}
	</div>
}

const InfrastructureSection = (props) => {
	const {
		isOnGoingContractPeriod, isDect, currentPowerStation, typeCentrale, totalUserOnPBX, simulatedLinesOrChannelsCount,
		simulatedLinesOrChannelsUnit, numberOfFixedPhones, numberOfReceptionHighEnd,
		numberOfHomeWorkers, isFaxAvailable, typeFax, numberOfSoftPhones,
		numberOfHeadSets, desiredFunctions, onChange
	} = props || {}
//TODO on going contract
	return <div>
		<div className='row mb-3'>
			<div className='col-6'>
				<CustomInputField
					title={ 'nog lopend contract, periode' }
					type={ INPUT_TYPES.TEXT }
					className='w-100'
					placeholder="nog lopend contract, periode"
					name='isOnGoingContractPeriod'
					value={ isOnGoingContractPeriod }
					onChange={ onChange }
				/>
			</div>
			<div className='col-6'>
				<MultiSelect
					name='isDect'
					value={ isDect }
					title={ 'Huidige Dect' }
					onChange={ onChange }
				/>
			</div>
		</div>
		<div className='row mb-3'>
			<div className='col-6 d-flex align-items-end'>
				<CustomInputField
					title={ 'Huidige centrale' }
					type={ INPUT_TYPES.TEXT }
					className='w-100'
					placeholder="Huidige centrale"
					name='currentPowerStation'
					value={ currentPowerStation }
					onChange={ onChange }
				/>
			</div>
			<div className='col-6'>
				<MultiSelect
					isMultiSelect
					name='typeCentrale'
					value={ typeCentrale }
					title={ 'Type Centrale' }
					onChange={ onChange }
					dataList={ SYNC_SOLUTION_DATALIST }
				/>
			</div>
		</div>
		<div className='row mb-3'>
			<div className='col-6 d-flex align-items-end'>
				<CustomInputField
					title={ 'Totaal aantal users op PBX' }
					type={ INPUT_TYPES.NUMBER }
					className='w-100'
					placeholder="Users on PBX"
					name='totalUserOnPBX'
					value={ totalUserOnPBX }
					onChange={ onChange }
				/>
			</div>
			<div className='col-4 d-flex align-items-end'>
				<CustomInputField
					title={ 'aantal simulatane lijnen/kanalen' }
					type={ INPUT_TYPES.NUMBER }
					className='w-100'
					placeholder="Users on PBX"
					name='simulatedLinesOrChannelsCount'
					value={ simulatedLinesOrChannelsCount }
					onChange={ onChange }
				/>
			</div>
			<div className='col-2 d-flex align-items-end'>
				<MultiSelect
					className='w-100'
					name='simulatedLinesOrChannelsUnit'
					value={ simulatedLinesOrChannelsUnit }
					onChange={ onChange }
					dataList={ CHANNELS_DATA_LIST }
				/>
			</div>
		</div>
		<div className='row mb-3'>
			<div className='col-6'>
				<CustomInputField
					title={ 'aantal vaste toestellen' }
					type={ INPUT_TYPES.NUMBER }
					className='w-100'
					placeholder="aantal vaste toestellen"
					name='numberOfFixedPhones'
					value={ numberOfFixedPhones }
					onChange={ onChange }
				/>
			</div>
			<div className='col-6'>
				<CustomInputField
					title={ 'aantal Receptie/high end' }
					type={ INPUT_TYPES.NUMBER }
					className='w-100'
					placeholder="aantal Receptie/high end"
					name='numberOfReceptionHighEnd'
					value={ numberOfReceptionHighEnd }
					onChange={ onChange }
				/>
			</div>
		</div>
		<div className='row mb-3'>
			<div className='col-4'>
				<CustomInputField
					title={ 'aantal thuiswerkers' }
					type={ INPUT_TYPES.NUMBER }
					className='w-100'
					placeholder="aantal thuiswerkers"
					name='numberOfHomeWorkers'
					value={ numberOfHomeWorkers }
					onChange={ onChange }
				/>
			</div>
			<div className='col-4'>
				<MultiSelect
					name='isFaxAvailable'
					value={ isFaxAvailable }
					title={ 'Fax aanwezig' }
					onChange={ onChange }
				/>
			</div>
			{ isFaxAvailable === STATUS_KEYS.TRUE &&
			<Fragment>
				<div className='col-4'>
					<MultiSelect
						isMultiSelect
						name='typeFax'
						value={ typeFax }
						title={ 'Type fax' }
						onChange={ onChange }
						dataList={ SYNC_SOLUTION_DATALIST }
					/>
				</div>
			</Fragment>
			}
		</div>
		<div className='row mb-3'>
			<div className='col-6'>
				<CustomInputField
					title={ 'aantal Softphone' }
					type={ INPUT_TYPES.NUMBER }
					className='w-100'
					placeholder="aantal Softphone"
					name='numberOfSoftPhones'
					value={ numberOfSoftPhones }
					onChange={ onChange }
				/>
			</div>
		</div>
		<div className='row mb-3'>
			<div className='col-6'>
				<CustomInputField
					title={ 'aantal headsets' }
					type={ INPUT_TYPES.NUMBER }
					className='w-100'
					placeholder="aantal headsets"
					name='numberOfHeadSets'
					value={ numberOfHeadSets }
					onChange={ onChange }
				/>
			</div>
		</div>
		<div className='row mb-3'>
			<div className='col-6'>
				<CustomInputField
					title={ 'Gewenste functies' }
					type={ INPUT_TYPES.TEXT }
					className='w-100'
					placeholder="Gewenste functies"
					isTextArea
					name='desiredFunctions'
					value={ desiredFunctions }
					onChange={ onChange }
				/>
			</div>
		</div>
		<span>alarmlijnen en liftaansluitingen staan altijd los van een 3CX VIOP oplossing</span>
	</div>
}

const OtherConnectedDeviceItem = (props) => {
	const {
		title,
		value1,
		value2,
		value3,
		key1,
		key2,
		key3,
		onChange
	} = props || {}
	return <div className='row mb-3'>
		<div className='col-4'>
			<MultiSelect
				title={ title }
				name={ key1 }
				value={ value1 }
				onChange={ onChange }
			/>
		</div>
		{ value1 === STATUS_KEYS.TRUE &&
		<Fragment>
			<div className='col-4'>
				<CustomInputField
					title={ 'Merk' }
					type={ INPUT_TYPES.TEXT }
					className='w-100'
					placeholder="Merk"
					name={ key2 }
					value={ value2 }
					onChange={ onChange }
				/>
			</div>
			<div className='col-4'>
				<MultiSelect
					isMultiSelect
					name={ key3 }
					value={ value3 }
					title={ 'Type' }
					onChange={ onChange }
					dataList={ SYNC_SOLUTION_DATALIST }
				/>
			</div>
		</Fragment>
		}
	</div>
}

const OtherConnectedDevicesSection = (props = {}) => {
	const {
		parlefoonCount,
		parlefoonTypeAndBrand,
		parlefoonType,
		frankeerMachineCount,
		frankeerMachineTypeAndBrand,
		frankeerMachineType,
		conferenceDeviceCount,
		conferenceDeviceTypeAndBrand,
		conferenceDeviceType,
		onChange
	} = props || {}
	return <div>
		<OtherConnectedDeviceItem
			title={ 'Parlefoon' }
			key1={ 'parlefoonCount' }
			key2={ 'parlefoonTypeAndBrand' }
			key3={ 'parlefoonType' }
			value1={ parlefoonCount }
			value2={ parlefoonTypeAndBrand }
			value3={ parlefoonType }
			onChange={ onChange }
		/>
		<OtherConnectedDeviceItem
			title={ 'Frankeer Machine' }
			key1={ 'frankeerMachineCount' }
			key2={ 'frankeerMachineTypeAndBrand' }
			key3={ 'frankeerMachineType' }
			value1={ frankeerMachineCount }
			value2={ frankeerMachineTypeAndBrand }
			value3={ frankeerMachineType }
			onChange={ onChange }
		/>
		<OtherConnectedDeviceItem
			title={ 'Conference toestel' }
			key1={ 'conferenceDeviceCount' }
			key2={ 'conferenceDeviceTypeAndBrand' }
			key3={ 'conferenceDeviceType' }
			value1={ conferenceDeviceCount }
			value2={ conferenceDeviceTypeAndBrand }
			value3={ conferenceDeviceType }
			onChange={ onChange }
		/>
	</div>
}

const DataInfrastructureSection = (props = {}) => {
	const {isUTPCablingAvailable, isWifiAvailable, isServerPresent, isServerMeetSpecification, onChange} = props || {}
	return <div>
		<div className='row mb-3'>
			<div className='col-6'>
				<MultiSelect
					name='isUTPCablingAvailable'
					value={ isUTPCablingAvailable }
					title={ 'UTP cabling available' }
					onChange={ onChange }
				/>
			</div>
		</div>
		<div className='row mb-3'>
			<div className='col-6'>
				<MultiSelect
					name='isWifiAvailable'
					value={ isWifiAvailable }
					title={ 'UTP bekabeling aanwezig' }
					onChange={ onChange }
				/>
			</div>
		</div>
		<div className='row'>
			<div className='col-6'>
				<MultiSelect
					name='isServerPresent'
					value={ isServerPresent }
					title={ 'Server aanwezig' }
					onChange={ onChange }
				/>
			</div>
			{ isServerPresent === STATUS_KEYS.TRUE &&
			<div className='col-6'>
				<MultiSelect
					name='isServerMeetSpecification'
					value={ isServerMeetSpecification }
					title={ 'mag de 3CX software op de eigen Server*' }
					onChange={ onChange }
				/>
			</div>
			}
		</div>
	</div>
}

const VirtualizationSectionSection = (props = {}) => {
	const {onChange} = props || {}
	return <div>
		{ map(VIRTUALIZATION_DATA_LIST, (item) => {
			const {id, title, dataKey} = item || {}
			return <div className='row mb-3' key={ id }>
				<div className='col-6'>
					<MultiSelect
						name={ dataKey }
						value={ props[dataKey] }
						title={ title }
						onChange={ onChange }
					/>
				</div>
			</div>
		}) }
	</div>
}

const CurrentSupplierSection = (props = {}) => {
	const {currentSupplier, isSupplierSatisfied, supplierNotSatisfiedReason, whereWeCanAddValue, onChange} = props || {}
	return <div>
		<div className='row mb-3'>
			<div className='col-6 d-flex align-items-end'>
				<CustomInputField
					type={ INPUT_TYPES.TEXT }
					className='w-100'
					title={ 'wie' }
					placeholder="wie"
					name='currentSupplier'
					value={ currentSupplier }
					onChange={ onChange }
				/>
			</div>
		</div>
		<div className='row mb-3'>
			<div className='col-6'>
				<MultiSelect
					name='isSupplierSatisfied'
					value={ isSupplierSatisfied }
					title={ 'tevreden' }
					onChange={ onChange }
				/>
			</div>
			{ isSupplierSatisfied === STATUS_KEYS.FALSE &&
			<div className='col-6 d-flex align-items-end'>
				<CustomInputField
					type={ INPUT_TYPES.TEXT }
					className='w-100'
					isTextArea
					title={ 'indien NEE' }
					placeholder="indien NEE"
					name='supplierNotSatisfiedReason'
					value={ supplierNotSatisfiedReason }
					onChange={ onChange }
				/>
			</div>
			}
		</div>
		<div className='row mb-3'>
			<div className='col-6 d-flex align-items-end'>
				<CustomInputField
					type={ INPUT_TYPES.TEXT }
					className='w-100'
					title={ 'waar kunnen wij een meerwaarde betekenen' }
					placeholder=""
					name='whereWeCanAddValue'
					value={ whereWeCanAddValue }
					onChange={ onChange }
				/>
			</div>
		</div>
	</div>
}

const SectionTitle = (props) => {
	const {title} = props || {}
	return <span className='large-header'>{ title }</span>
}

const App = () => {
	const [ formState, setFormState ] = useState(FORM_INITIAL_STATE)
	const [ isLoading, setLoading ] = useState(false)
	
	const onInputFieldChangedHandler = (event) => {
		const {target: {name, value} = {}} = event || {}
		setFormState({...formState, [name]: value})
	}
	
	const submitForm = async () => {
		const isValid = formValidationHandler(formState)
		if (!isValid) {
			return
		}
		const params = buildApiParams(formState)
		try {
			setLoading(true)
			const response = await fetch(API_URL, {
				method: "POST",
				body: JSON.stringify(params),
				headers: {
					"Content-Type": "application/json"
				}
			})
			console.log('response: ', response)
			if (response?.ok) {
				toast.success('Request sent successfully')
			} else {
				throw Error(response?.statusText)
			}
		} catch (e) {
			toast.error(`Error: ${ e?.message ?? 'something went wrong.' }`)
		} finally {
			setLoading(false)
		}
	}
	
	return (
		<div className="mx-5 pt-3 pb-5">
			{/*<SectionTitle title={ 'VOICE INFRASTRUCTUUR' }/>*/ }
			<UserInfoSection { ...formState } onChange={ onInputFieldChangedHandler }/>
			
			<TopSection { ...formState } onChange={ onInputFieldChangedHandler }/>
			<SectionTitle title={ 'VOICE INFRASTRUCTUUR' }/>
			<InfrastructureSection { ...formState } onChange={ onInputFieldChangedHandler }/>
			<SectionTitle title={ 'Andere aangesloten toestellen' }/>
			<OtherConnectedDevicesSection { ...formState } onChange={ onInputFieldChangedHandler }/>
			<SectionTitle title={ 'DATA INFRASTRUCTUUR' }/>
			<DataInfrastructureSection { ...formState } onChange={ onInputFieldChangedHandler }/>
			<SectionTitle title={ 'Virtualisatie / integraties' }/>
			<VirtualizationSectionSection { ...formState } onChange={ onInputFieldChangedHandler }/>
			<SectionTitle title={ 'huidige leverancier' }/>
			<CurrentSupplierSection { ...formState } onChange={ onInputFieldChangedHandler }/>
			<button className="btn btn-primary btn-lg w-50 mx-auto d-flex align-items-center justify-content-center"
			        onClick={ submitForm }>
				Submit
				{ isLoading && <div className="spinner-border spinner-border-sm ml-2"/> }
			</button>
			<ToastContainer/>
		</div>
	);
}

export default App;
