import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {getDetail} from '../actions/odmor';
import {getZaposleni} from '../actions/odmor';
import {deleteData} from "../actions/odmor";

var NavLink = require('react-router-dom').NavLink;


class Delete extends Component{
	constructor(){
		super();
		this.state = {
			odmorDetail:{},
			control:false
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	static getDerivedStateFromProps(nextProps,prevState) {
		if(nextProps.itemDetail !== prevState.odmorDetail){
			return{
				odmorDetail:nextProps.itemDetail
			}
		}else if(nextProps.controlSwitch !== prevState.control){
			return{
				control:nextProps.controlSwitch
			}
		}
		return null;
	}
	componentDidMount(){
		const { id } = this.props.match.params;
		this.props.getDetail(id);
		this.props.getZaposleni();
	}
	
	handleSubmit(e){
		e.preventDefault();
		let id = this.props.match.params;
		
		let zaposleni_id = this.props.zaposleniList.map((item,index)=>{
			let ime = item.ime + " " + item.prezime;
			if (ime === this.props.itemDetail.zaposleni){
				return item.id;
			}
			return null;
		})
		let status = 1;
		if(this.state.odmorDetail.status_zahteva ==='Usaglasen'){
			status = 2;
		}else if(this.state.odmorDetail.status_zahteva === 'Potvrdjen'){
			status = 3;
		}
		let objekat = {
			"id": id.id,
		    "zaposleni":zaposleni_id,
		    "poc_odmora":this.state.odmorDetail.poc_odmora,
		    "kraj_odmora":this.state.odmorDetail.kraj_odmora,
		    "prvi_radni_dan":this.state.odmorDetail.prvi_radni_dan,
		    "status_zahteva":status,
		    "odobrio":this.state.odmorDetail.odobrio,
		}

		this.props.deleteData(objekat);

	}
	
	render(){
		if(!this.props.isAuthenticated || this.state.control){
			return <Redirect to='/'/>
		}
		const forma = (
		<form onSubmit={this.handleSubmit}>
			<div className="form-group">
				<label>Zaposleni</label>
				<input type="text" value={this.state.odmorDetail.zaposleni} 
				className="form-control" readOnly/>
			</div>
			<div className="form-group">
				<label>Pocetak odmora</label>
				<input type="text" name='poc_odmora' value={this.state.odmorDetail.poc_odmora} className="form-control" readOnly/>
			</div>
			<div className="form-group">
				<label>Kraj odmora</label>
				<input type="text" name='kraj_odmora' value={this.state.odmorDetail.kraj_odmora} className="form-control" readOnly/>
			</div>
			<div className="form-group">
				<label>Prvi radni dan</label>
				<input type="text" name='prvi_radni_dan' value={this.state.odmorDetail.prvi_radni_dan} className="form-control" readOnly/>
			</div>
			<div className="form-group">
				<label>Status zahtjeva</label>
				<input type="text" value={this.state.odmorDetail.status_zahteva} className="form-control" readOnly/>
			</div> 
			<div className="form-group">
				<label>Odobrio</label>
				<input type="text" value={this.state.odmorDetail.odobrio} name='odobrio' className="form-control" readOnly/>
			</div>
			<div className="form-group">
				<input type="submit" value="Confirm,delete" className="btn btn-outline-danger m-2" readOnly/>
				<NavLink className='btn btn-secondary' to="">Cancle</NavLink>
			</div>
		</form>);
		return(
			<div className="delete_form">
				<fieldset className="border p-2">
					<legend className="w-auto" >Confirm delete request</legend>
					{forma}
				</fieldset>
			</div>
		);
	}
};
Delete.propTypes = {
	isAuthenticated:PropTypes.bool,
	getDetail:PropTypes.func.isRequired,
	itemDetail:PropTypes.object.isRequired,
	zaposleniList:PropTypes.array.isRequired,
	deleteData:PropTypes.func.isRequired,
	controlSwitch:PropTypes.bool
}
const mapStateToProps = state=>({
	isAuthenticated:state.auth.isAuthenticated,
	itemDetail:state.odmor.detail,
	zaposleniList:state.odmor.zaposleni,
	controlSwitch:state.odmor.controlSwitch
});
export default connect(mapStateToProps,{getDetail,getZaposleni,deleteData})(Delete);