import React , { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
var NavLink = require('react-router-dom').NavLink;


class Navigation extends Component{
	
	componentWillReceiveProps(nextProps){
		console.log("OVO JE NEXT PROPS" +nextProps)
	}
	render(){
		const logout_btn = (
			<div><button>Logout</button></div>
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
					{this.props.isAuthenticated?logout_btn:""}
				</div>
				
			</div>
		);
	}
};
Navigation.propTypes = {
    isAuthenticated:PropTypes.bool
}
const mapStateToProps = state =>({
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(null,{})(Navigation)