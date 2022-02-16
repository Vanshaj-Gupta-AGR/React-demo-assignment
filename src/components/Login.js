import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Routes, Route, Navigate } from "react-router-dom";
import {login} from '../actions/auth'




class Login extends Component {
    constructor(props){
        super(props);
        // this.emailInput=React.createRef();
        // this.passwordInput=React.createRef();

        this.state={
            email:'',
            password:''
        }
    }
    
    
    
    handleFormSubmit=(e)=>{
        e.preventDefault();
        console.log(this.state.email,this.state.password);

        const {email,password}=this.state;

        if(email && password){
            this.props.dispatch(login(email,password))
        }
    }
    handleEmailChange=(e)=>{
        this.setState({
            email: e.target.value
        })
    }
    handlepasswordChange=(e)=>{
        this.setState({
            password: e.target.value
        })
    }
    render() {
        const {error,inProgress,isLoggedin}=this.props.auth;

        if(isLoggedin){
           return <Navigate to="/"></Navigate>
        }
        return (
           <form className='login-form'>
               <span className='login-signup-header'>Log in</span>
               {error && <div className='alert-error-dialog'>{error}</div>}
               <div className='field'>
                   <input type="email" placeholder="Email" required onChange={this.handleEmailChange} value={this.state.email}></input>
               </div>
               <div className='field'>
                   <input type="password" placeholder="Password" required onChange={this.handlepasswordChange} value={this.state.password}></input>
               </div>
               <div className='field'>
                   {inProgress ? <button onClick={this.handleFormSubmit} disabled={inProgress} >Logging In..</button>: <button onClick={this.handleFormSubmit}>Log In</button>}
                  
               </div>
           </form>
        );
    }
}

function mapStateToprops(state){
    return {
        auth: state.auth,
    }
}

export default connect(mapStateToprops)(Login);