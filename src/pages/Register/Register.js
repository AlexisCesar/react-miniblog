import styles from './Register.module.css';

import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';

const Register = () => {

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayName,
      email,
      password
    };

    if (password != confirmPassword) {
      setError("Passwords don\'t match!");
      return;
    }

    const res = await createUser(user);

    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  useEffect(() => {
    if(authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <>
      <div className={styles.title}>
        <h1>Register to start sharing!</h1>
        <p>there are 250k+ people posting right now</p>
      </div>
      <form className={styles.register} onSubmit={handleSubmit}>

        {error && <p className='error'>{error}</p>}

        <label>
          <span>Name:</span>
          <input
            type="text"
            name='displayName'
            required
            placeholder='your name'
            autoComplete='no'
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)} />
        </label>
        <label>
          <span>Email:</span>
          <input
            type="email"
            name='email'
            required
            placeholder='your email address'
            autoComplete='no'
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <span>Password:</span>
          <input
            type="password"
            name='password'
            required
            placeholder='a strong password'
            autoComplete='no'
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          <span>Confirm password:</span>
          <input
            type="password"
            name='confirmPassword'
            required
            placeholder='your password again'
            autoComplete='no'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>
        {!loading && <button className='btn'>Register</button>}
        {loading && <button className='btn' disabled>Please wait...</button>}
      </form>
    </>
  )
}

export default Register