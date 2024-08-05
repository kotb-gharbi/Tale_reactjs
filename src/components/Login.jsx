import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import './Login.css'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

function Login() {

  const [language,setlanguage] = useState("EN")
  const [showDropdown, setShowDropdown] = useState(false)
  const [EmailPlaceholder,setEmailPlaceholder] = useState("Enter your email address")
  const [PasswordPlaceholder,setPasswordPlaceholder] = useState("Enter your password")
  const [Pwd, setPwd] = useState("Password")
  const [Email , setEmail] = useState("Email Address")
  const [SignIn , setSignIn] = useState("Sign IN")
  const [showPassword, setShowPassword] = useState(true)



  const ChooseLanguage = (lang) => {
    setlanguage(lang)
    setShowDropdown(false)
    if (lang === 'EN') {
      setEmailPlaceholder("Enter your email address")
      setPasswordPlaceholder("Enter your password")
      setPwd("Password")
      setEmail("Email Address")
      setSignIn("Sign IN")

    } else if (lang === 'FR') {
      setEmailPlaceholder("Entrez votre adresse e-mail")
      setPasswordPlaceholder("Entrez votre mot de passe")
      setPwd("Mot de passe")
      setEmail("Adresse e-mail")
      setSignIn("Se connecter")
    }
  }


  return (
    <>
    
        <div className=' d-flex align-items-center justify-content-between m-4'>
            <img src="/tale-logo.png" alt="logo" />
            <div className="lang d-flex justify-content-center align-items-center">
              <img src="/language.png" alt="lang" />
              <div className=' d-flex align-items-center' style={{cursor : 'pointer'}} onClick={() => setShowDropdown((prev) => !prev)}>
                <p className='px-2' style={{margin :0 , fontWeight:'500'}}>{language}</p>
              
                <FontAwesomeIcon icon={faCaretDown}/>

              </div>
              {
                showDropdown && (
                  <div className='languages-dropdown'>
                    <div className='ul-lang m-0'>
                      <div className=' languages mt-2' style={{cursor : 'pointer'}} onClick={() => ChooseLanguage('EN')}>
                        <img src="/en.png" alt="eng" style={{height:'22px' , width :'23px' , marginRight:'5px'}} /><p className='m-0'
                         style={{fontWeight:'500'}}>EN</p> 
                      </div>
                      <div className=' languages my-2' style={{cursor : 'pointer'}} onClick={() => ChooseLanguage('FR')}>
                        <img src="/fr.png" alt="eng" style={{height:'22px' , width :'22px' , marginRight:'5px'}} /><p className='m-0'
                        style={{fontWeight:'500'}}>FR</p> 
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
        </div>

        <div className="container">
          <div className="row login">
            <div className="col-md-4">
              <form action="">

                <h4 className=' text-center' style={{fontWeight: 'bold'}}>SuperAdmin TALE</h4>

                <div className=' mt-5'>
                  <label style={{fontWeight: '600'}} className=' form-label' htmlFor="email">{Email}</label>
                  <input className=' form-control login-inputs' type="email" name="email" placeholder={EmailPlaceholder} />
                </div>

                <div className='mt-4'>
                  <label style={{fontWeight: '600'}} className=' form-label' htmlFor="password">{Pwd}</label>
                  <div className='input-group'>
                  <input className='form-control login-inputs pwd' type={showPassword ? "text" : "password"} name="password" placeholder={PasswordPlaceholder} />
                  <span className='input-group-text eye' onClick={() => setShowPassword((prev) => !prev)}>
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </span>
                </div>

                <button className=' mt-4 btn login-btn w-100' onClick={() => handlesubmit()}>{SignIn}</button>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      
    </>
    
  )
}

export default Login
