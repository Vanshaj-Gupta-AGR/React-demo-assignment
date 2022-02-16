import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {logoutUser} from '../actions/auth'


class Navbar extends React.Component {
  logOut = () => {
    localStorage.removeItem('token');
    this.props.dispatch(logoutUser());
  };
  
  render() {
    const { auth} = this.props;
    console.log("pp",auth)
    if(auth.user){
      return (
        <nav className="nav">
          <div className="left-div">
            <Link to="/">
              <img
                src="http://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
                alt="logo"
              />
            </Link>
          </div>
          
          
          <div className="right-nav">
            {auth.isLoggedin && (
              <div className="user">
                <Link to={`/user/${auth.user._id}`}>
                <img
                  src="http://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="user-dp"
                  id="user-dp"
                />
                </Link>
                {/* <span>{auth.user.email}</span> */}
              </div>
            )}
  
            <div className="nav-links">
              <ul>
                {!auth.isLoggedin && (
                  <li>
                    <Link to="/login">Log in</Link>
                  </li>
                )}
  
                {auth.isLoggedin && <li onClick={this.logOut}>Log out</li>}
  
                {!auth.isLoggedin && (
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      );
    }
    
    else{
      return <h1>loading</h1>
    }
   
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
export default connect(mapStateToProps)(Navbar);
