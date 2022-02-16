import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startSignup, signup } from '../actions/auth';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      address:'',
      phoneno:'',
      firstname: '',
      lastname:'',
     
    };
  }
  

  handleInputChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
    const { email, password, address,phoneno,firstname,lastname} = this.state;

    if (email && password && firstname && lastname && address && phoneno) {
      this.props.dispatch(startSignup());
      this.props.dispatch(signup(email, password, firstname,lastname,phoneno,address));
    }
  };
  
  
  

  render() {
    const { inProgress, error } = this.props.auth;
    return (
      <form className="login-form">
        <span className="login-signup-header"> Signup</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            placeholder="FirstName"
            type="text"
            required
            onChange={(e) => this.handleInputChange('firstname', e.target.value)}
          />
        </div>
        <div className="field">
          <input
            placeholder="LastName"
            type="text"
            required
            onChange={(e) => this.handleInputChange('lastname', e.target.value)}
          />
        </div>
        <div className="field">
          <input
            placeholder="Email"
            type="email"
            required
            onChange={(e) => this.handleInputChange('email', e.target.value)}
          />
        </div>
        <div className="field">
          <input
            placeholder="password"
            type="password"
            required
            onChange={(e) =>
              this.handleInputChange('password', e.target.value)
            }
          />
        </div>
        <div className="field">
          <input
            placeholder="Phone no"
            type="number"
            required
            onChange={(e) => this.handleInputChange('phoneno', e.target.value)}
          />
        </div>
        <div className="field">
          <input
            placeholder="address"
            type="text"
            required
            onChange={(e) => this.handleInputChange('address', e.target.value)}
          />
        </div>
        <div className="field">
          <button onClick={this.onFormSubmit} disabled={inProgress}>
            Signup
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps)(Signup);
