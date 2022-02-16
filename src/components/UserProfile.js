import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchUserProfile } from '../actions/profile';
import { connect } from 'react-redux';
import profile from '../reducers/profile';
import { APIUrls } from '../helpers/url';
import { gettoken } from '../helpers/utils';



function UserProfile(props) {
  let id= useParams().userId;
  useEffect(() => {
    if(id){
      props.dispatch(fetchUserProfile(id))
    }

    },[id])

    const user=props.profile.user
    console.log("inprogress",props.profile.inProgress)
    if(props.profile.inProgress){
      return <h1>Loading</h1>
    }
   
  return (
    <div>
      <div className="settings">

        <div className="field">
          <div className="field-label">fisrtName</div>
          <div className="field-value">{user.firstname}</div>
        </div>
        <div className="field">
          <div className="field-label">lastName</div>
          <div className="field-value">{user.lastname}</div>
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>
        <div className="field">
          <div className="field-label">Address</div>
          <div className="field-value">{user.address}</div>
        </div>
        <div className="field">
          <div className="field-label">phoneNo</div>
          <div className="field-value">{user.phoneno}</div>
        </div>



        
          
       
      </div>
      </div>
      )
    
  
    
  
}

function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}
export default connect(mapStateToProps)(UserProfile)