import React, { Component } from 'react';

export class Zaposleni extends Component{
	constructor(){
		super();
		this.state={
			zaposleni:[],
			count:0,
			previous:null,
			next:null,
			currentPage:1,
		}
		this.fetchdata = this.fetchdata.bind(this)
	}
	componentWillMount(){
		this.fetchdata("/odmor/zaposleni/",1)
	}
	fetchdata(pagelink,pagenumber){
		fetch(pagelink)
		.then(response =>response.json())
		.then(data=>
			this.setState({
				zaposleni:data.results,
				count:data.count,
				next:data.next,
				previous:data.previous,
				currentPage:pagenumber
			})
			)
	}
	renderTableHeader(){
		let Header =['Ime','Prezime','Br.dana GO','Br.neiskoristenih dana']
		return Header.map((item,index)=>{
			return <th key={index}>{item.toUpperCase()}</th>
		})
	}
	renderTableData(){
		return this.state.zaposleni.map((item,index) => {
			const {ime,prezime,br_dana_go,br_neiskoristenih_dana} = item
			return (
				<tr key={index}>
					<td>{ime}</td>
					<td>{prezime}</td>
					<td>{br_dana_go}</td>
					<td>{br_neiskoristenih_dana}</td>
				</tr>
			)
		})
	}
	render(){
		//pagination
		const numbers =[];
		let offSetCounter = 0;
		const pagination_const = 10;
		let numberOfpages = 1;
		if(this.state.count%pagination_const!==0){
			numberOfpages = parseInt(this.state.count/pagination_const)+1;
		}else{
			numberOfpages = this.state.count/pagination_const;
		}
		for(let i=1;i<=numberOfpages;i++){
			if(offSetCounter===0){
				numbers.push({
					pagenumber:i,
					pagelink:"/odmor/zaposleni/"
				})
			
			}else{
				numbers.push({
					pagenumber:i,
					pagelink:"/odmor/zaposleni/?limit=10&offset="+offSetCounter
				})
			}
			offSetCounter+=pagination_const;
		}
		const pagination = numbers.map(item=>{
			if(this.state.currentPage===item.pagenumber){
				return (<li key={item} className="page-item active">
					<a href="#" onClick={()=>this.fetchdata(item.pagelink,item.page)} className="page-link">{item.pagenumber}</a>
				</li>)
			}
			return (<li key={item} className='page-item'>
				<a onClick={()=>this.fetchdata(item.pagelink,item.pagenumber)} className="page-link">{item.pagenumber}</a>
			</li>)
		})
		return(
			<div id='zaposleni'>
				<div className="table-responsive">
					<table id="zaposleni_table" className="table-striped table-bordered">
						<tbody >
							<tr>{this.renderTableHeader()}</tr>
							{this.renderTableData()}
						</tbody>
					</table>
				</div>
				<div className="float-right">
					<ul className="pagination">
						{this.state.previous?<li className="page-item" onClick={()=>this.fetchdata(this.state.previous,this.state.currentPage-1)}><a className="page-link">Previous</a></li>:""}
						{pagination}
						{this.state.next?<li className="page-item" onClick={()=>this.fetchdata(this.state.next,this.state.currentPage+1)}><a className="page-link">Next</a></li>:""}
					</ul>
				</div>
			</div>
		);
	}
}