import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loadUser} from "../actions/auth";
import {Link} from 'react-router-dom';
import {fetchData} from '../actions/odmor';
import axios from 'axios';
import {controlSwitch} from "../actions/odmor";
import "../styles/god_odmori.css";
import "../styles/test.css";

class God_odmori extends Component{

	constructor(){
		super();
		this.state={
			odmorList:[],
			count:0,
			next:null,
			previous:null,
			currentPage:1,
			orderingUrl:"",
			filterUrl:"",

		}
		this.fetchData = this.fetchData.bind(this);
		this.setOrdering = this.setOrdering.bind(this);
	}
	componentDidMount(){
		this.props.controlSwitch();
		let fullUrl="/odmor/list/?";
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
		let url ="/odmor/list/?";
		if(this.state.filterUrl){
			url = url + string+"&"+this.state.filterUrl
		}else{
			url = url+string
		}
		this.fetchData(url,1);
		this.setState({orderingUrl:string});
	}
	setFilter(string){
		let url ="/odmor/list/?";
		if(this.state.orderingUrl){
			url = url + string+"&"+this.state.orderingUrl
		}else{
			url = url+string
		}
		this.fetchData(url,1);
		this.setState({filterUrl:string});
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
				if(this.state.orderingUrl && this.state.filterUrl){
					numbers.push({
						pageNumber:i,
						pagelink:"/odmor/list/?"+this.state.orderingUrl+"&"+this.state.filterUrl
					});
				}else{
					numbers.push({
						pageNumber:i,
						pagelink:"/odmor/list/?"+this.state.orderingUrl+this.state.filterUrl
					});
				}
			}else{
				if(this.state.orderingUrl && this.state.filterUrl){
					numbers.push({
						pageNumber:i,
						pagelink:"/odmor/list/?limit=10&offset="
						+offSetCounter+"&"+this.state.orderingUrl+"&"+this.state.filterUrl
					});
				}else{
					numbers.push({
						pageNumber:i,
						pagelink:"/odmor/list/?limit=10&offset="
						+offSetCounter+"&"+this.state.orderingUrl+this.state.filterUrl
					});
				}
				
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
	// sort div
	  const sortiranje = (
		<ul>
            <li><a href="#">Filter table<span>&#x25BE;</span></a>
                <ul>
                    {/* <li><a href="#">Filter1</a></li>
                    <li><a href="#">Filter2</a></li> */}
                	<li><a href="#">Status Zahteva<span>&#x25B8;</span></a>
                        <ul class="itam-2">
                            <li><a href="#" onClick={()=>this.setFilter('status_zahteva=1')}>Planiran</a></li>
                            <li><a href="#" onClick={()=>this.setFilter('status_zahteva=2')}>Usaglasen</a></li>
                            <li><a href="#" onClick={()=>this.setFilter('status_zahteva=3')}>Potvrdjen</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
	  );
	// filter div
	  const filtriranje=( <ul>
		<li><a href="#">Sort table<span>&#x25BE;</span></a>
			<ul>
				<li><a href="#" onClick={()=>{this.setOrdering('ordering=poc_odmora')}}>Poc Odmora</a></li>
				<li><a href="#" onClick={()=>{this.setOrdering('ordering=kraj_odmora')}}>Kraj Odmora</a></li>
				<li><a href="#" onClick={()=>{this.setOrdering('ordering=prvi_radni_dan')}}>Prvi radni dan</a></li>
			</ul>
		</li>
	</ul>);
		return(
			<div id='odmori'>
				<div className="filterSort-menu">
					{filtriranje}
					{sortiranje}
				</div>
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