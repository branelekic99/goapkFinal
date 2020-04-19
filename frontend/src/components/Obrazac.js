import React, { Component } from 'react';
import axios from "axios";
import {Redirect} from 'react-router-dom';
import {addOdmor} from "../actions/odmor";
import {getZaposleni} from '../actions/odmor';
import {connect} from "react-redux";
import PropTypes from 'prop-types';

class Obrazac extends Component{
	constructor(){
		super();
		this.state = {
			zaposleni:[],
			ime_prezime:"",
			date_poc:"",
			date_kra:"",
			date_prvi_dan:"",
			prilog:null,
			control:false,
			show_err:false
		}
		this.handeChangeInput = this.handeChangeInput.bind(this)
		this.handeSubmit = this.handeSubmit.bind(this)
	}
	componentDidMount(){
		this.props.getZaposleni();
	}
	static getDerivedStateFromProps(nextProps,prevState) {
		if(nextProps.controlSwitch !== prevState.control){
			return{
				control:nextProps.controlSwitch
			}
		}
		if(nextProps.error_status !== prevState.show_err){
			return{
				show_err:nextProps.error_status
			}
		}
		return null;
	}
	handeChangeInput(e){
		if(e.target.name==='prilog'){
			this.setState({[e.target.name]:e.target.files[0]})
		}else{
			this.setState({[e.target.name]:e.target.value})
		}
	}
	handeSubmit(e){
		e.preventDefault();
		var id = 0;
		var ime = this.state.ime_prezime;
		if(!this.state.ime_prezime){
			var e = document.getElementById('selectField');
			 ime = e.options[e.selectedIndex].value;
		}
		this.props.zaposleniList.map((item,index)=>{
			var naziv = item.ime + " "+item.prezime;
			if(ime === naziv){
				id=item.id;
			}
		})

		let form_data = new FormData();
		if(this.state.prilog){
			form_data.append("prilog",this.state.prilog,this.state.prilog.name);
		}
		form_data.append("poc_odmora",this.state.date_poc);
		form_data.append("kraj_odmora",this.state.date_kra);
		form_data.append("prvi_radni_dan",this.state.date_prvi_dan);
		form_data.append("zaposleni",id);

		this.props.addOdmor(form_data,ime);
	};
	
	render(){
		
		if(this.state.control){
			return <Redirect to='/' />
		}
		const options = this.props.zaposleniList.map((item)=>{
			if(item.id==1){
				return <option key={item.id} selected>{item.ime+" "+item.prezime}</option>
			}
			return <option key={item.id}>{item.ime+" "+item.prezime}</option>
		})
	const err_msg = this.props.error_msg.map(item=>{
	return <div className="alert alert-danger" role="alert">{item}</div>
	});
		return(
		
			<div className="obrazac_form">
			{this.state.show_err?err_msg:""}
			<fieldset className="border p-2">
				<legend className="w-auto">Obrazac</legend>
				<form onSubmit={this.handeSubmit}>
					<div className="form-group">
						<label>Zaposleni: </label>
						<select name='ime_prezime' value={this.state.ime_prezime} onChange={this.handeChangeInput} id='selectField' className="form-control">
			            	{options}
			          </select>
					</div>
					<div className="form-group">
						<label>Pocetak odmora</label>
						<input name='date_poc' type="date" className="form-control" 
						value={this.state.date_poc} 
						onChange={this.handeChangeInput} />
					</div>
					<div className="form-group">
						<label>Kraj odmora</label>
						<input name='date_kra' type="date" className="form-control" 
						value={this.state.date_kra}
						onChange={this.handeChangeInput}/>
					</div>
					<div className="form-group">
						<label>Prvi radni dan</label>
						<input name='date_prvi_dan' type="date" className="form-control" 
						value={this.state.date_prvi_dan}
						onChange={this.handeChangeInput}/>
					</div>
					<div className="form-group">
						<label>Prilog</label>
						<input type='file' name='prilog' onChange={this.handeChangeInput} className="form-control"/>
					</div>
					<div className="form-group">
					<input type='Submit' value='Pošalji zahtev' className="btn btn-outline-primary" />
					</div>
				</form>
			</fieldset>
			</div>
		);
	}
};

Obrazac.propTypes = {
	zaposleniList:PropTypes.array.isRequired,
	getZaposleni:PropTypes.func.isRequired,
	addOdmor:PropTypes.func.isRequired,
	controlSwitch:PropTypes.bool,
	error_status:PropTypes.bool,
	error_msg:PropTypes.array
}
const mapStateToProps = state=>({
	zaposleniList:state.odmor.zaposleni,
	controlSwitch:state.odmor.controlSwitch,
	error_status:state.odmor.error_status,
	error_msg:state.odmor.error_msg
});
export default connect(mapStateToProps,{getZaposleni,addOdmor})(Obrazac);