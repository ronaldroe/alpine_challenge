import React, { useState } from 'react';

const SignUp = props => {

  let [first_name, updateFirstName] = useState('');
  let [last_name, updateLastName] = useState('');
  let [email, updateEmail] = useState('');
  let [password, updatePassword] = useState('');
  let [confirm_pass, updateConfirmPass] = useState('');

  const sendHandler = e => {

    e.preventDefault();

    if(password !== confirm_pass){
      alert('Passwords must match');
      return;
    }
    
    let output = {
      first_name,
      last_name,
      email,
      password
    };

    fetch(`${window.location.protocol}//${window.location.host}/user/login`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(output)
    })
    .then(res => {
      if(res.ok) {
        props.updateUserData(output);
        props.history.push('/profile');
      } else {
        alert(res.statusText);
      }
    })
    .catch(err => alert(err));
    
  }

  return(
    <>
      <form>
        <label htmlFor="first_name">First Name</label><input type="text" name="first_name" onChange={e => updateFirstName(e.target.value)} />
        <label htmlFor="last_name">Last Name</label><input type="text" name="last_name" onChange={e => updateLastName(e.target.value)} />
        <label htmlFor="email">Email</label><input type="email" name="email" onChange={e => updateEmail(e.target.value)} />
        <label htmlFor="password">Password</label><input type="password" name="password" onChange={e => updatePassword(e.target.value)} />
        <label htmlFor="confirm_pass">Confirm Password</label><input type="password" name="confirm_pass" onChange={e => updateConfirmPass(e.target.value)} />
        <button className="submit" onClick={e => sendHandler(e)}>Sign Up</button>
      </form>
    </>
  )
};

export default SignUp;