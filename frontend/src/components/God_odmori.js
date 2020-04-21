import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loadUser} from "../actions/auth";
import {Link} from 'react-router-dom';
import {fetchData} from '../actions/odmor';
import axios from 'axios';
import {controlSwitch} from "../actions/odmor";
import "../styles/god_odmori.css";


class God_odmori extends Component{

	constructor(){
		super();
		this.state={
			odmorList:[],
			count:0,
			next:null,
			previous:null,
			currentPage:1,
			orderingUrl:""

		}
		this.fetchData = this.fetchData.bind(this);
		this.setOrdering = this.setOrdering.bind(this);
	}
	componentDidMount(){
		this.props.controlSwitch();
		let fullUrl="http://localhost:8000/odmor/list/?";
		if(this.state.orderingUrl){
			fullUrl = fullUrl+this.state.orderingUrl;
		}
		this.fetchData(fullUrl,1);
		this.props.loadUser();
	}
	fetchData(url,pageNumber){
		axios.get(url)
		.then(result=>{
				this.setState({
					odmorList:result.data.results,
					count:result.data.count,
					next:result.data.next,
					previous:result.data.previous,
					currentPage:pageNumber
				})
		})
		.catch(err=>console.log(err))
	}
	setOrdering(string){
		let fullUrl="http://localhost:8000/odmor/list/?"+string;
		this.fetchData(fullUrl,1);
		this.setState({orderingUrl:string});
	}
	getStyle(item){
		if(item.status_zahteva==='Planiran'){
			return{
				'backgroundColor':'white'
			}
		  }else if(item.status_zahteva==='Usaglasen'){
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
		const table_header = header.map((item,index)=>{
			if(item === 'action'){
				return <th key={index} colSpan="2" >{item.toUpperCase()}</th>
			}
			return <th key={index}>{item.toUpperCase()}</th>
		})
		// table
		const table = this.state.odmorList.map((item)=>{
			const {
				zaposleni,poc_odmora,kraj_odmora,prvi_radni_dan,
				status_zahteva,odobrio,prilog
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
					<td>{status_zahteva}</td>
					<td>{odobrio}</td>
					<td><a href={prilog} download>{priglo_title}</a></td>
					{this.props.isAuthenticated?<td><Link className='btn btn-secondary' to={link_edit}>Edit</Link></td>:""}
					{this.props.isAuthenticated?<td><Link className='btn btn-secondary' to={link_delete}>Delete</Link></td>:""}
				</tr>	
				)
			});
		// pagination
		const numbers =[];
		let offSetCounter =0;
		const pagionation_const = 10;
		var numberOfpages = 1;
		if(this.state.count%pagionation_const!==0){
			numberOfpages = parseInt(this.state.count/pagionation_const) + 1;
		}else{
			numberOfpages = this.state.count/pagionation_const;
		}
		for (let i =1;i<=numberOfpages;i++){
			if(offSetCounter===0){
				numbers.push({
					pageNumber:i,
					pagelink:"http://localhost:8000/odmor/list/?"+this.state.orderingUrl
				});
			}else{
				numbers.push({
					pageNumber:i,
					pagelink:"http://localhost:8000/odmor/list/?limit=10&offset="+offSetCounter+"&"+this.state.orderingUrl
				});
			}
			offSetCounter+=pagionation_const;
		}
		const pagination = numbers.map(item=>{
			
			if(this.state.currentPage===item.pageNumber){
				return (<li key={item} className='page-item active'>
				<a href="#" onClick={()=>this.fetchData(item.pagelink,item.pageNumber)} className='page-link'>{item.pageNumber}</a>
			</li>)
			}
			return (<li key={item} className='page-item'>
			<a onClick={()=>this.fetchData(item.pagelink,item.pageNumber)} className='page-link'>{item.pageNumber}</a>
		</li>)
			
		});
		// sortiranje
		const sortiranje = ( <div className="dropdown float-right">
		<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		  Sort table
		</button>
		<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
		  <a className="dropdown-item" onClick={()=>{this.setOrdering('ordering=poc_odmora')}} href="#">Poc Odmora</a>
		  <a className="dropdown-item" href="#" onClick={()=>{this.setOrdering('ordering=kraj_odmora')}}>Kraj Odmora</a>
		  <a className="dropdown-item" href="#" onClick={()=>{this.setOrdering('ordering=prvi_radni_dan')}} >Prvi radni dan</a>
		</div>
	  </div>);
	  const filtriranje = (<div></div>);
		return(
			<div id='odmori'>
				{sortiranje}
				{filtriranje}
				<table id='god_odmori_table' className='table-striped table-bordered'>
					<thead>
					<tr>{table_header}</tr>
					</thead>
					<tbody>
						{table}
					</tbody>
				</table>
				<div className="float-right">
					<ul className='pagination'>
						{this.state.previous?
						<li className='page-item' onClick={()=>this.fetchData(this.state.previous,this.state.currentPage-1)}><a className='page-link'>Previous</a></li>:""}
						{pagination}
						{this.state.next?
						<li className='page-item' onClick={()=>this.fetchData(this.state.next,this.state.currentPage+1)}><a className='page-link'>Next</a></li>:""}
					</ul>
				</div>
			</div>
		);
	}
};

God_odmori.propTypes = {
	isAuthenticated:PropTypes.bool,
	loadUser:PropTypes.func.isRequired,
	controlSwitch:PropTypes.func.isRequired
}
const mapStateToProps = state =>({
	isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{loadUser,fetchData,controlSwitch})(God_odmori)