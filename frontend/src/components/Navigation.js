import React , { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {logOut} from "../actions/auth";
import "../styles/nav.css";
var NavLink = require('react-router-dom').NavLink;


class Navigation extends Component{
	constructor(){
		super();
		this.state = {
			isAuthenticated:false
		}
	}
	
	static getDerivedStateFromProps(nextProps,prevState) {
		if(nextProps.isAuthenticated !== prevState.isAuthenticated){
			return{
				isAuthenticated:nextProps.isAuthenticated
			}
		}
		return null;
	}
	render(){
		const logout_btn = (
			<div><button onClick={this.props.logOut} className="btn btn-warning logout-btn">Logout</button></div>
		);
		return(
			<div className="navigation">
				<div className="nav_logo">
					<NavLink exact activeClassName ='nav_active' to='/' >
						GO apk
					</NavLink>
				</div>
				<div className="navigation_body" id="my_div">
					<NavLink exact activeClassName ='nav_active' to='/' className="link">
							God Odmori
					</NavLink>
					<NavLink  activeClassName ='nav_active' to='/zaposleni' className="link">
							Zaposleni
					</NavLink>
					<NavLink  activeClassName ='nav_active' to='/obrazac' className="link">
							Zahtjev
					</NavLink>
					{this.state.isAuthenticated?logout_btn:""}
				</div>
				
			</div>
		);
	}
};
Navigation.propTypes = {
	isAuthenticated:PropTypes.bool,
	logOut:PropTypes.func.isRequired
}
const mapStateToProps = state =>({
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{logOut})(Navigation)