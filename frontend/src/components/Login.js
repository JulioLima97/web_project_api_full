import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from './Header';
import * as auth from '../utils/auth';

function Login({ handleLogin, handleRegisterError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    auth
      .authorize(email, password)

      .then((res) => {
        console.log(res)
        if (res === undefined) {
          handleRegisterError('fail');
        }
        handleLogin();
        history.push('/');
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          handleRegisterError('fail');
        } else {
          console.error(error);
        }
      });
  }

  return (
    <>
      <Header text={'Entrar'} />
      <form className="login" onSubmit={handleSubmit}>
        <h2 className="login__title">Entrar</h2>
        <label>
          <input className="login__input"
                 type='email'
                 name='email'
                 id='email-input'
                 placeholder='E-Mail'
                 minLength={2}
                 maxLength={40}
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 required
          />
        </label>
        <label>
          <input className="login__input"
                 type='password'
                 name='password'
                 id='password-input'
                 placeholder='Senha'
                 minLength={2}
                 maxLength={200}
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required
          />
        </label>
        <button type='submit' className="login__button">Entrar</button>
        <span className="login__span"> Ainda não é membro?{' '}
          <Link to='/register' className='login__link'>
            Inscreva-se aqui!
          </Link>
        </span>
      </form>
    </>
  );
}

export default Login;