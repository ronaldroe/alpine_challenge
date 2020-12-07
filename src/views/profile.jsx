import React, { useEffect } from 'react';
import md5 from 'md5';

const Profile = props => {

  useEffect(() => {
    fetch(`${window.location.protocol}//${window.location.host}/session`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({})
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) props.history.push('/login');
      props.updateUserData(data);
    });
  }, []);

  return(
    <>
      <div className="profile">
        <div className="user_avatar">
          <img src={`https://www.gravatar.com/avatar/${md5(props.user_data?.email ?? '')}?s=500`} alt="User Avatar"/>
        </div>
        <div className="user_profile_info">
          <div className="user_name">User's Name</div>
          <div className="user_email">User's Email Address</div>
          <div className="user_level">User's Access Level</div>
        </div>
        <div className="user_profile_info">
          <div className="user_name">{props.user_data?.first_name ?? ''} {props.user_data?.last_name ?? ''}</div>
          <div className="user_email">{props.user_data?.email ?? ''}</div>
          <div className="user_level">{props.user_data && props.user_data.level > 0 ? 'Admin' : 'Standard'}</div>
        </div>
      </div>
      <button className="logout" onClick={() => {
        fetch(`${window.location.protocol}//${window.location.host}/logout`);
        props.history.push('/login');
      }}>Log Out</button>
    </>
  )
};

export default Profile;