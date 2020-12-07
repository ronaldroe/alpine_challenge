import React, { useEffect, useState } from 'react';
import md5 from 'md5';

const Admin = props => {

  let [users, updateUsers] = useState([]);

  useEffect(() => {
    fetch(`${window.location.protocol}//${window.location.host}/session`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({})
    })
    .then(res => res.json())
    .then(data => {
      if(data.error || data.user_level < 1) {
        setTimeout(() => {
          props.history.push('/profile');
        }, 3000);
      }
      
      if(data.user_level > 0){
        fetch(`${window.location.protocol}//${window.location.host}/user/all`)
        .then(res => res.ok ? res.json() : null)
        .then(users_data => {
          if(users_data !== null){
            updateUsers(users_data);
          }
        });
      }
    });
  }, []);

  const generateUserList = user_data => {
    if(user_data.length > 0){
      return user_data.map((user, index) => (
        <UserLine user={user} key={`${index}-${new Date().getTime()}`} />
      ));
    }

    return <h1>If user list doesn't load, you do not have admin privileges.</h1>;
  }

  const UserList = generateUserList(users);

  return(
    <div>
      <div className="user_line">
        <div>Avatar</div>
        <div>Full Name</div>
        <div>Email Address (login)</div>
        <div>User Level</div>
      </div>
      {UserList}
      <button className="logout" onClick={() => {
        fetch(`${window.location.protocol}//${window.location.host}/logout`);
        props.history.push('/login');
      }}>Log Out</button>
    </div>
  )

};

const UserLine = props => (
  <>
    <div className="user_line">
      <div className="user_avatar">
        <img src={`https://www.gravatar.com/avatar/${md5(props.user?.email ?? '')}`} alt="User Avatar"/>
      </div>
      <div className="user_name">{props.user?.first_name ?? ''} {props.user?.last_name ?? ''}</div>
      <div className="user_email">{props.user?.email ?? ''}</div>
      <div className="user_level">{props.user && props.user.level > 0 ? 'Admin' : 'Standard'}</div>
    </div>
  </>
);

export default Admin;