import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Login.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("EN");
  const [showDropdown, setShowDropdown] = useState(false);
  const [placeholders, setPlaceholders] = useState({
    email: "Enter your email address",
    password: "Enter your password"
  });
  const [labels, setLabels] = useState({
    email: "Email Address",
    password: "Password",
    signIn: "Sign IN"
  });
  const [showPassword, setShowPassword] = useState(false);
  
  const { 
    register,
    handleSubmit, 
    setError, 
    formState: { errors, isSubmitting } 
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', data);
      if (response.data.status) {
        localStorage.setItem("token", response.data.token);
        navigate('/sidebar/dashboard');
      } else {
        if (response.data.message === "Email incorrect") {
          setError('email', { message: '*Email incorrect' });
        } else if (response.data.message === "Password incorrect") {
          setError('password', { message: '*Password incorrect' });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const chooseLanguage = (lang) => {
    setLanguage(lang);
    setShowDropdown(false);
    if (lang === 'EN') {
      setPlaceholders({ email: "Enter your email address", password: "Enter your password" });
      setLabels({ email: "Email Address", password: "Password", signIn: "Sign IN" });
    } else if (lang === 'FR') {
      setPlaceholders({ email: "Entrez votre adresse e-mail", password: "Entrez votre mot de passe" });
      setLabels({ email: "Adresse e-mail", password: "Mot de passe", signIn: "Se connecter" });
    }
  };

  return (
    <>
      <div className='d-flex align-items-center justify-content-between m-4'>
        <img src="/tale-logo.png" alt="logo" />
        <div className="lang d-flex justify-content-center align-items-center">
          <img src="/language.png" alt="lang" />
          <div className='d-flex align-items-center' style={{ cursor: 'pointer' }} onClick={() => setShowDropdown(prev => !prev)}>
            <p className='px-2' style={{ margin: 0, fontWeight: '500' }}>{language}</p>
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
          {showDropdown && (
            <div className='languages-dropdown'>
              <div className='ul-lang m-0'>
                <div className='languages mt-2' style={{ cursor: 'pointer' }} onClick={() => chooseLanguage('EN')}>
                  <img src="/en.png" alt="eng" style={{ height: '22px', width: '23px', marginRight: '5px' }} />
                  <p className='m-0' style={{ fontWeight: '500' }}>EN</p>
                </div>
                <div className='languages my-2' style={{ cursor: 'pointer' }} onClick={() => chooseLanguage('FR')}>
                  <img src="/fr.png" alt="eng" style={{ height: '22px', width: '22px', marginRight: '5px' }} />
                  <p className='m-0' style={{ fontWeight: '500' }}>FR</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container">
        <div className="row login">
          <div className="col-md-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h4 className='text-center' style={{ fontWeight: 'bold', fontSize: '32px' }}>SuperAdmin TALE</h4>
              <div className='mt-5'>
                <label style={{ fontWeight: '600' }} className='form-label' htmlFor="email">{labels.email}</label>
                <input className='form-control login-inputs' type="text"
                  name="email"
                  placeholder={placeholders.email}
                  {...register("email", {
                    required: '*Email is required',
                    validate: value =>
                      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(value) || "*Invalid email format"
                  })}
                />
                <div className='error-message'>
                  {errors.email && <div style={{ color: 'red' }}>{errors.email.message}</div>}
                </div>
              </div>

              <div className='mt-3'>
                <label style={{ fontWeight: '600' }} className='form-label' htmlFor="password">{labels.password}</label>
                <div className='input-group'>
                  <input className='form-control login-inputs pwd' type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={placeholders.password}
                    {...register("password", {
                      required: '*Password is required',
                      minLength: {
                        value: 8,
                        message: '*Please enter at least 8 characters',
                      }
                    })}
                  />
                  <span className='input-group-text eye' onClick={() => setShowPassword(prev => !prev)}>
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </span>
                </div>
                <div className='error-message'>
                  {errors.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}
                </div>

                <button disabled={isSubmitting} type='submit' className='mt-3 btn login-btn w-100'>
                  {isSubmitting ? "Loading..." : labels.signIn}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
