import styles from './Register.module.css';

import { useState, useEffect } from 'react';

const Register = () => {
  return (
    <>
      <div className={styles.title}>
        <h1>Register to start sharing!</h1>
        <p>there are 250k+ people posting right now</p>
      </div>
      <form className={styles.register}>
        <label>
          <span>Name:</span>
          <input type="text" name='displayName' required placeholder='your name' autoComplete='no' />
        </label>
        <label>
          <span>Email:</span>
          <input type="email" name='email' required placeholder='your email address' autoComplete='no' />
        </label>
        <label>
          <span>Password:</span>
          <input type="password" name='password' required placeholder='a strong password' autoComplete='no' />
        </label>
        <label>
          <span>Confirm password:</span>
          <input type="password" name='confirmPassword' required placeholder='your password again' autoComplete='no' />
        </label>
        <button className='btn'>Register</button>
      </form>
    </>
  )
}

export default Register