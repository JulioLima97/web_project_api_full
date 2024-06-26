import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

import * as auth from '../utils/auth';

function Register({ handleRegister, handleRegisterError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    auth
      .register(email, password)
      .then((res) => {
        if (res.email) {
          handleRegister('success');
        } else {
          handleRegisterError('fail');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

return(
  <>
    <Header text={'Faça o login'}></Header>
      <form className="login" onSubmit={handleSubmit}>
        <h2 className="login__title">Inscrever-se</h2>
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
          <button className="login__button" type='submit'>Inscrever-se</button>
          <span className="login__span"> Já é um membro?{' '}
            <Link to='/login' className='login__link'>
              Faça o login aqui!!
            </Link>
          </span>
      </form>
</>
)
}

export default Register;