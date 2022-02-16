import React from 'react';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import { connect } from 'react-redux';
import { BrowserRouter as Router,Link,Route,Routes } from 'react-router-dom';
import {authenticateUser} from '../actions/auth'
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Login from './Login';
import Signup from './Signup';
import UserProfile from './UserProfile';

var y;
function PrivateRoute({ children}) {
  const auth=y
  return auth ? children : <Navigate to="/login" />;
}
class App extends React.Component {
  componentDidMount() {
  
    const token = localStorage.getItem('token');
    if(token)
    console.log(jwt_decode(token))

    if (token) {
      const user = jwt_decode(token);

      console.log('user', user);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
    }
   
  }

  

  render() {
    const {auth}=this.props;
    y=auth.isLoggedin

    return (
      <Router>
      <div>
        <Navbar />
        
       {/* <PostsList posts={posts} /> */}
       {/* <ul>
         <li>
           <Link to="/">Home</Link>

         </li>
         <li>
           <Link to="/login">Login</Link>
           
         </li>
         <li>
           <Link to="/signup">Signup</Link>
           
         </li>
       </ul> */}
      <Routes>
        <Route  path="/login" element={<Login />}/>
        
        
       <Route path="/register" element={<Signup />}/> 
       <Route
          path="/user/:userId"
          element={
            <PrivateRoute>
              <UserProfile isLoggedin={this.props.auth.isLoggedin} />
            </PrivateRoute>
          }
        />
    
  
       </Routes>
    </div>
    </Router>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(App);
