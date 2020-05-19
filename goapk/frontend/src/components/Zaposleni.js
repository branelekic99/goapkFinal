import React, { Component } from 'react';

export class Zaposleni extends Component{
	constructor(){
		super();
		this.state={
			zaposleni:[],
		}
		this.fetchdata = this.fetchdata.bind(this)
	}
	componentWillMount(){
		this.fetchdata()
	}
	fetchdata(){
		fetch('http://localhost:8000/odmor/zaposleni/')
		.then(response =>response.json())
		.then(data=>
			this.setState({zaposleni:data})
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
		return(
			<div id='zaposleni' className="table-responsive">
			<div className="table-responsive">
				<table id="zaposleni_table" className="table-striped table-bordered">
					<tbody >
						<tr>{this.renderTableHeader()}</tr>
						{this.renderTableData()}
					</tbody>
				</table>
			</div>
			</div>
		);
	}
}