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
			control:false,
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
	}
	handleChange(e){
		const {name,value} = e.target;
		var obj = {...this.state.detailObj}
		obj[name] = value;
		this.setState({detailObj:obj})
	}
	handleSubmit(e){
		e.preventDefault()
		let id = this.props.match.params;
		let zaposleni_id;
		this.props.zaposleniList.map((item,index)=>{
			let ime = item.ime + " " + item.prezime;
			if (ime === this.props.itemDetail.zaposleni){
				zaposleni_id = item.id;
			}
		})
		let objekat ={
			"id": id.id,
		    "zaposleni":zaposleni_id,
		    "poc_odmora":this.state.detailObj.poc_odmora,
		    "kraj_odmora":this.state.detailObj.kraj_odmora,
		    "prvi_radni_dan":this.state.detailObj.prvi_radni_dan,
		    "status_zahtjeva":this.state.detailObj.status_zahtjeva,
		    "odobrio":this.state.detailObj.odobrio,
		}
		this.props.updateDetail(objekat);
		this.setState({control:true})
	}
	render(){
		if(!this.props.isAuthenticated || this.state.control){
			return <Redirect to='/'/>
		}
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
						<select value={this.state.detailObj.status_zahtjeva} name='status_zahtjeva' onChange={this.handleChange} className="form-control">
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
	updateDetail:PropTypes.func.isRequired
}
const mapStateToProps = state=>({
	isAuthenticated:state.auth.isAuthenticated,
	itemDetail:state.odmor.detail,
	zaposleniList:state.odmor.zaposleni
});
export default connect(mapStateToProps,{getDetail,getZaposleni,updateDetail})(Edit);