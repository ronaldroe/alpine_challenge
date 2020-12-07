import React, { useState } from 'react';

const SignUp = props => {

  let [first_name, updateFirstName] = useState('');
  let [last_name, updateLastName] = useState('');
  let [email, updateEmail] = useState('');
  let [password, updatePassword] = useState('');
  let [confirm_pass, updateConfirmPass] = useState('');

  const sendHandler = e => {

    e.preventDefault();
    
    let output = {
      email,
      password
    };

    fetch(`${window.location.protocol}//${window.location.host}/user/login`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(output)
    })
    .then(res => res.json())
    .then(data => {
      
      if(data.error){
        alert(data.error);
        fetch(`${window.location.protocol}//${window.location.host}/logout`);
        return;
      }

      props.updateUserData(data);
      props.history.push('/profile');

    })
    .catch(err => alert(err));
    
  }

  return(
    <>
      <form>
        <label htmlFor="email">Email</label><input type="email" name="email" onChange={e => updateEmail(e.target.value)} />
        <label htmlFor="password">Password</label><input type="password" name="password" onChange={e => updatePassword(e.target.value)} />
        <button className="submit" onClick={e => sendHandler(e)}>Log In</button>
      </form>
    </>
  )
};

export default SignUp;