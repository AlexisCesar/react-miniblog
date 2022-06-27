import styles from './Login.module.css';

import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { logIn, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      password
    };

    await logIn(user);

    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <>
      <div className={styles.title}>
        <h1>Access your account</h1>
      </div>
      <form className={styles.login} onSubmit={handleSubmit}>

        {error && <p className='error'>{error}</p>}
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
            placeholder={'your account\'s password'}
            autoComplete='no'
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </label>
        {!loading && <button className='btn'>Sign in</button>}
        {loading && <button className='btn' disabled>Please wait...</button>}
      </form>
    </>
  )
}

export default Login