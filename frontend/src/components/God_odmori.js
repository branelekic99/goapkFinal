import React, {Component} from 'react';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loadUser} from "../actions/auth";
import {Link, withRouter} from 'react-router-dom';
import {fetchData} from '../actions/odmor';

class God_odmori extends Component{

	componentDidMount(){
		this.props.fetchData();
		this.props.loadUser();
	}

	getStyle(item){
		if(item.status_zahtjeva=='Planiran'){
			return{
				'backgroundColor':'white'
			}
		  }else if(item.status_zahtjeva=='Usaglasen'){
			return {
				'backgroundColor':'#c9d1cb'
			}
		  }else{
			  return{
				'backgroundColor':'#32fa61'
			  }
		  }
	}
	render(){
		// table header
		let header = ['ime','prezime','Poc_odmora','Kraj_odmora','Prvi_dan','status_zahteva','odobrio','prilog','action'];
		if(!this.props.isAuthenticated){
			header.splice(8,1);
		}
		const table_header = header.map((item)=>{
			if(item === 'action'){
				return <th key={item.id} colSpan="2" >{item.toUpperCase()}</th>
			}
			return <th key={item.id}>{item.toUpperCase()}</th>
		})
		// table
		const table = this.props.odmorList.map((item)=>{
			const {
				zaposleni,poc_odmora,kraj_odmora,prvi_radni_dan,
				status_zahtjeva,odobrio,prilog
				} = item
			let prilog_url= "";
			let priglo_title="";
			if (!prilog){
				prilog_url = "#";
				priglo_title = "Nema";
			}else{
				prilog_url = prilog;
				priglo_title = "Prilog";
			}
			const link_edit ='edit/'+item.id;
			const link_delete='delete/'+item.id;
			return(
				<tr key={item.id} style={this.getStyle(item)}>
					<td>{zaposleni.split(" ")[0]}</td>
					<td>{zaposleni.split(" ")[1]}</td>
					<td>{poc_odmora}</td>
					<td>{kraj_odmora}</td>
					<td>{prvi_radni_dan}</td>
					<td>{status_zahtjeva}</td>
					<td>{odobrio}</td>
					<td><a href={prilog} download>{priglo_title}</a></td>
					{this.props.isAuthenticated?<td><Link className='btn btn-secondary' to={link_edit}>Edit</Link></td>:""}
					{this.props.isAuthenticated?<td><Link className='btn btn-secondary' to={link_delete}>Delete</Link></td>:""}
				</tr>	
			)
		});
		return(
			<div id='odmori'>
				<table id='god_odmori_table' className='table-striped table-bordered'>
					<tbody>
						{table_header}
						{table}
					</tbody>
				</table>
			</div>
		);
	}
};

God_odmori.propTypes = {
	isAuthenticated:PropTypes.bool,
	loadUser:PropTypes.func.isRequired,
	odmorList:PropTypes.array.isRequired
}
const mapStateToProps = state =>({
	isAuthenticated:state.auth.isAuthenticated,
	odmorList:state.odmor.odmorList
})
export default connect(mapStateToProps,{loadUser,fetchData})(God_odmori)