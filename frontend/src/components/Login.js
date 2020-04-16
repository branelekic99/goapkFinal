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
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
        return(
            <div className="login_form">
                    <h1>Login Please!</h1><hr className="hr_line"/>
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
                        <div className="form-group form-box">
                            <i className="fas fa-lock fa-2x"></i>
                            <input type='password' 
                            name='password' 
                            value={this.state.pasword} 
                            onChange={this.handleChange}
                            placeholder="Password"
                            className="form-control"/>
                        </div>
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
    isAuthenticated:PropTypes.bool
}
const mapStateToProps = state =>({
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{loginUser})(Login);