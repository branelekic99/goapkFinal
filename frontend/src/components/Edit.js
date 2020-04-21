import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {getDetail} from '../actions/odmor';
import {getZaposleni} from '../actions/odmor';
import {updateDetail} from "../actions/odmor";

class Edit extends Component{
	constructor(props){
		super(props);
		this.state={
			zaposleni:[],
			detailObj:{},
			successful_update:false,
			show_err:false
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentDidMount(){
		const { id } = this.props.match.params
		this.props.getDetail(id);
		this.props.getZaposleni();
	}
	componentWillReceiveProps(nextProps){
		if(this.state.detailObj !== nextProps.itemDetail){
			this.setState({detailObj:nextProps.itemDetail})
		}
		if(this.state.successful_update !== nextProps.successful_update){
			this.setState({successful_update:nextProps.successful_update})
		}
		if(this.state.show_err !== nextProps.error_status){
			this.setState({show_err:nextProps.error_status})
		}
	}
	
	handleChange(e){
		const {name,value} = e.target;
		var obj = {...this.state.detailObj}
		obj[name] = value;
		console.log(obj)
		this.setState({detailObj:obj})
	}
	handleSubmit(e){
		e.preventDefault()
		let id = this.props.match.params;
		let zaposleni_id=this.props.zaposleniList.map((item,index)=>{
			let ime = item.ime + " " + item.prezime;
			if (ime === this.props.itemDetail.zaposleni){
				return item.id;
			}
			return null;
		})
		let status = 1;
		if(this.state.detailObj.status_zahteva === 'Usaglasen'){
			status = 2;
		}else if(this.state.detailObj.status_zahteva === 'Potvrdjen'){
			status = 3;
		}
		let objekat ={
			"id": id.id,
		    "zaposleni":zaposleni_id,
		    "poc_odmora":this.state.detailObj.poc_odmora,
		    "kraj_odmora":this.state.detailObj.kraj_odmora,
		    "prvi_radni_dan":this.state.detailObj.prvi_radni_dan,
		    "status_zahteva":status,
		    "odobrio":this.state.detailObj.odobrio,
		}
		this.props.updateDetail(objekat);
	}
	render(){
		if(!this.props.isAuthenticated || this.state.control){
			return <Redirect to='/'/>
		}
		// error display
		const errors = this.props.error_msg.map((item,index)=>{
			return <div key={index} className="alert alert-danger" role="alert">{item}</div>
		});
		// successeful update msg
		const successful_update = (<div className="alert alert-success" role="alert">Upadated!!</div>);
		// forms
		const form = (
			<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label>Zaposleni</label>
						<input type="text" value={this.state.detailObj.zaposleni} className="form-control" readOnly/>
					</div>
					<div className="form-group">
						<label>Pocetak odmora</label>
						<input type="date" name='poc_odmora' value={this.state.detailObj.poc_odmora} onChange={this.handleChange} className="form-control"/>
					</div>
					<div className="form-group">
						<label>Kraj odmora</label>
						<input type="date" name='kraj_odmora' value={this.state.detailObj.kraj_odmora} onChange={this.handleChange} className="form-control"/>
					</div>
					<div className="form-group">
						<label>Prvi radni dan</label>
						<input type="date" name='prvi_radni_dan' value={this.state.detailObj.prvi_radni_dan} onChange={this.handleChange} className="form-control"/>
					</div>
					<div className="form-group">
						<label>Status zahtjeva</label>
						<select value={this.state.detailObj.status_zahteva} name='status_zahteva' onChange={this.handleChange} className="form-control">
							<option>Planiran</option>
							<option>Usaglasen</option>
							<option>Potvrdjen</option>
						</select>
					</div>
					<div className="form-group">
						<label>Odobrio</label>
						<input type="text" value={this.state.detailObj.odobrio} name='odobrio' onChange={this.handleChange} className="form-control"/>
					</div>
					<div className="form-group">
						<input type="submit" value="submit" className="btn btn-outline-primary" />
					</div>
				</form>
		);
		return(
			<div>
			<fieldset className="border p-2">
				<legend className="w-auto">Update</legend>
					{this.state.successful_update?successful_update:""}
					{this.state.show_err?errors:""}
					{form}
				</fieldset>
			</div>
		);
	}
};
Edit.propTypes = {
	isAuthenticated:PropTypes.bool.isRequired,
	getDetail:PropTypes.func.isRequired,
	itemDetail:PropTypes.object.isRequired,
	zaposleniList:PropTypes.array.isRequired,
	getZaposleni:PropTypes.func.isRequired,
	updateDetail:PropTypes.func.isRequired,
	controlSwitch:PropTypes.bool,
	successful_update:PropTypes.bool,
	error_status:PropTypes.bool,
	error_msg:PropTypes.array

}
const mapStateToProps = state=>({
	isAuthenticated:state.auth.isAuthenticated,
	itemDetail:state.odmor.detail,
	zaposleniList:state.odmor.zaposleni,
	controlSwitch:state.odmor.controlSwitch,
	successful_update:state.odmor.successful_update,
	error_status:state.odmor.error_status,
	error_msg:state.odmor.error_msg
});
export default connect(mapStateToProps,{getDetail,getZaposleni,updateDetail})(Edit);