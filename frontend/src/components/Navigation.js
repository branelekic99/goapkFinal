import React , { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {logOut} from "../actions/auth";
import "../styles/nav.css";

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
					<Link exact to='/' >
						GO apk
					</Link>
				</div>
				<div className="navigation_body" id="my_div">
					<Link exact="true" to='/' className="link">
							God Odmori
					</Link>
					<Link to='/zaposleni' className="link">
							Zaposleni
					</Link>
					<Link to='/obrazac' className="link">
							Zahtev
					</Link>
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