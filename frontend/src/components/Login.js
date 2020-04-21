import React , {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loginUser} from "../actions/auth";
import {Redirect} from 'react-router-dom';
import "../styles/login.css";

class Login extends Component{
    constructor(){
        super();
        this.state={
            username:"",
            password:"",
            show_err:false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    static getDerivedStateFromProps(nextProps,prevState) {
		if(nextProps.error_status !== prevState.show_err){
			return{
				show_err:nextProps.error_status
			}
		}
		return null;
	}
    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit(e){
        e.preventDefault();
        let obj = {
            "username":this.state.username,
            "password":this.state.password
        }
        this.props.loginUser(obj);
    }
    render(){
        if(this.props.isAuthenticated===true){
            return <Redirect to="/" />;
        }
        const username_err = this.props.error_msg.map(item=>{
                if(Object.keys(item)==='username'){
                   return  <div className="alert alert-danger form-box" role="alert">{Object.values(item)}</div>
                }
                return "";
        });
        const password_err = this.props.error_msg.map(item=>{
                if(Object.keys(item)==='password'){
                    return <div className="alert alert-danger form-box" role="alert">{Object.values(item)}</div>
                }
                return "";
        })
        const other_err = this.props.error_msg.map(item=>{
                if(Object.keys(item) === 'non_field_errors'){
                return <div className="alert alert-danger form-box" role="alert">{Object.values(item)}</div> 
                }
                return "";
        })
        
        return(
            <div className="login_form">
                    <h1>Login Please!</h1><hr className="hr_line"/>
                    {this.state.show_err?other_err:""}
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group form-box">
                            <i className="far fa-user fa-2x"></i>
                            <input type='text' 
                            name='username' 
                            value={this.state.username} 
                            onChange={this.handleChange}
                            placeholder="Username"
                            className="form-control"/>
                        </div>
                        {this.state.show_err?username_err:""}
                        <div className="form-group form-box">
                            <i className="fas fa-lock fa-2x"></i>
                            <input type='password' 
                            name='password' 
                            value={this.state.pasword} 
                            onChange={this.handleChange}
                            placeholder="Password"
                            className="form-control"/>
                        </div>
                        {this.state.show_err?password_err:""}
                        <div className="submit_box">
                            <input type='submit' value="Login" className="btn btn-primary btn-lg btn-block"/>
                        </div>
                    </form>
                </div>
        )
    }
}
Login.propTypes = {
    loginUser:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool,
    error_status:PropTypes.bool,
	error_msg:PropTypes.array
}
const mapStateToProps = state =>({
    isAuthenticated:state.auth.isAuthenticated,
    error_status:state.auth.error_status,
	error_msg:state.auth.error_msg
})
export default connect(mapStateToProps,{loginUser})(Login);