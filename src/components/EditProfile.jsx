import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import './EditProfile.css'
import {faEllipsis ,faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'
import ReactFlagsSelect from "react-flags-select-2";
import { getName } from 'country-list';


function EditProfile() {

  const params = useParams();

  const [isloading , setisloading] = useState(false)
  const [selected, setSelected] = useState("");
  const [countryName, setcountryName] = useState("");
  const [tel, settel] = useState("");
  const [address, setaddress] = useState("");
  const [CodePostal, setCodePostal] = useState("");

  const [ActiveInfo, setActiveInfo] = useState(1);
  const [lastName, setLastName] = useState('');
  const [email, setemail] = useState('');
  const [name, setname] = useState('');
  const [birth, setbirth] = useState('');
  const [gender, setgender] = useState('');
  const [password, setpassword] = useState('');
  const [isEditing, setIsEditing] = useState({
    name: false,
    email : false, 
    password :false,
    lastName: false,
    birth : false,
    gender : false,
    country : false,
    tel: false , 
    address : false ,
    CodePostal : false, 
  });

  const toggleEdit =  (field) => (
    setIsEditing(prevState => ({
      ...prevState,
      [field] : !prevState[field]
    }))
  )

  const handleInfo = (index) => {
    setActiveInfo(index);
  }

  if(isloading){
    return <div className="loader-container">
            <div className="loader"></div>
          </div>
  }


  return (
    <>
      <div className="card profile-card" style={{marginBottom : '17px'}}>
        <div className="card-body p-0">
            <div className="profile-header">
                <div className=' d-flex justify-content-center align-items-center'>

                    <Link to='/sidebar/gestion-des-utilisateurs' style={{textDecoration:'none'  , color:'inherit'}}>
                      <FontAwesomeIcon icon={faArrowLeft} className='GoBackArrow' />
                    </Link>

                    <img className='rounded-circle ' src="/users-colored.png" alt="pfp" />
                    <div className='ms-4'>
                      <p className='profile-name mb-0'>NAME</p>
                      <p className='mb-0'> mod no {params.id}</p>
                    </div>
                </div>
                <FontAwesomeIcon icon={faEllipsis} style={{cursor : 'pointer'}} />
            </div>
        </div>
      </div>

      <div className="card profile-card">
        <div className="card-body p-0">
          <div className='user-infos'>
              <span className={`user-info ${ActiveInfo === 1 ? 'active-info' : ''}`}
                onClick={() => handleInfo(1)}>
                Informations</span>
              <span className={`user-info ${ActiveInfo === 2 ? 'active-info' : ''}`}
                onClick={() => handleInfo(2)}>
                Enquête</span>
                <span className={`user-info ${ActiveInfo === 3 ? 'active-info' : ''}`}
                onClick={() => handleInfo(3)}>
                Points et récompense</span>
          </div>

          <h4 className='mt-5 mb-4' >Informations personnelles</h4>

          <div className="row">
            <div className="col-md-6">
              <div className=' d-flex justify-content-between '>
                  <label htmlFor='name' className='form-label'>Prénom</label>
                  {
                  isEditing.name ? (
                      <span> <span className='modif-pointer me-2' onClick={() => toggleEdit('name')}>Annuler</span>| 
                      <span className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                    ) : (
                      <span onClick={() => toggleEdit('name')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
                    )
                  }
                  
              </div>
              <input style={{width:'100%'}} className='form-control edit-info-inputs' type="text" name="name" 
              disabled={!isEditing.name ? true : false}
              value={name}
              onChange={(e) => setname(e.target.value)} 
              placeholder='Entrez votre prénom'/>
            </div>
            <div className="col-md-6">
              <div className=' d-flex justify-content-between '>
                <label htmlFor='last-name' className='form-label'>Nom de famille</label>
                {
                  isEditing.lastName ? (
                      <span> <span className='modif-pointer me-2' onClick={() => toggleEdit('lastName')}>Annuler</span>| 
                      <span className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                    ) : (
                      <span onClick={() => toggleEdit('lastName')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
                    )
                  }
              </div>
              <input style={{width:'100%'}} className='form-control edit-info-inputs' type="text" name="last-name"
               disabled={!isEditing.lastName ? true : false}
               value={lastName}
              onChange={(e) => setLastName(e.target.value)} 
              placeholder='Entrez votre nom de famille'/>
            </div>
          </div>
          <div className="row mt-4">
          <div className="col-md-6">
              <div className=' d-flex justify-content-between '>
                <label htmlFor='last-name' className='form-label'>Date de naissance</label>
                {
                  isEditing.birth ? (
                      <span> <span className='modif-pointer me-2' onClick={() => toggleEdit('birth')}>Annuler</span>| 
                      <span className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                    ) : (
                      <span onClick={() => toggleEdit('birth')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
                    )
                  }
              </div>
              <input style={{width:'100%'}} className='form-control edit-info-inputs' type="text" name="last-name"
               disabled={!isEditing.birth ? true : false}
               value={birth}
              onChange={(e) => setbirth(e.target.value)} 
              placeholder='Entrez votre date de naissance'/>
            </div>
            <div className="col-md-6">
              <div className=' d-flex justify-content-between '>
                <label htmlFor='last-name' className='form-label'>Genre</label>
                {
                  isEditing.gender ? (
                      <span> <span className='modif-pointer me-2' onClick={() => toggleEdit('gender')}>Annuler</span>| 
                      <span className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                    ) : (
                      <span onClick={() => toggleEdit('gender')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
                    )
                  }
              </div>
              <input style={{width:'100%'}} className='form-control edit-info-inputs' type="text" name="last-name"
               disabled={!isEditing.gender ? true : false}
               value={gender}
              onChange={(e) => setgender(e.target.value)} />
            </div>
          </div>
          <div className="row my-4">
          <div className="col-md-6">
              <div className=' d-flex justify-content-between '>
                <label htmlFor='last-name' className='form-label'>Adresse e-mail</label>
                {
                  isEditing.email ? (
                      <span> <span className='modif-pointer me-2' onClick={() => toggleEdit('email')}>Annuler</span>| 
                      <span className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                    ) : (
                      <span onClick={() => toggleEdit('email')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
                    )
                  }
              </div>
              <input style={{width:'100%'}} className='form-control edit-info-inputs' type="text" name="last-name"
               disabled={!isEditing.email ? true : false}
               value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder='Entrez votre adresse e-mail' />
            </div>
            <div className="col-md-6">
              <div className=' d-flex justify-content-between '>
                <label htmlFor='last-name' className='form-label'>Password</label>
                {
                  isEditing.password ? (
                      <span> <span className='modif-pointer me-2' onClick={() => toggleEdit('password')}>Annuler</span>| 
                      <span className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                    ) : (
                      <span onClick={() => toggleEdit('password')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
                    )
                  }
              </div>
              <input style={{width:'100%'}} className='form-control edit-info-inputs' type="text" name="last-name"
               disabled={!isEditing.password ? true : false}
               value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder='Entrez votre mot de passe' />
            </div>
          </div>
          <hr />
          <div className="row mt-4">
            <div className="col-md-6">
              <div className=' d-flex justify-content-between '>
                  <label htmlFor='last-name' className='form-label'>Country</label>
                  {
                    isEditing.country ? (
                        <span> <span className='modif-pointer me-2' onClick={() => toggleEdit('country')}>Annuler</span>| 
                        <span className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                      ) : (
                        <span onClick={() => toggleEdit('country')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
                      )
                    }
                </div>
                <ReactFlagsSelect
                    disabled={!isEditing.country ? true : false}
                    selected={selected}
                    onSelect={(code) => {
                      setSelected(code)
                      setcountryName(getName(code));
                    }}
                    searchable
                />
                
              </div>
              <div className="col-md-6">
                <div className=' d-flex justify-content-between '>
                    <label htmlFor='last-name' className='form-label'>Numéro de téléphone</label>
                    {
                      isEditing.tel ? (
                          <span> <span className='modif-pointer me-2' onClick={() => toggleEdit('tel')}>Annuler</span>| 
                          <span className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                        ) : (
                          <span onClick={() => toggleEdit('tel')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
                        )
                      }
                </div>
                  <ReactFlagsSelect
                      disabled={!isEditing.tel ? true : false}
                      selected={selected}
                      onSelect={(code) => {
                        setSelected(code)
                      }}
                      searchable
                  />
                  
              </div>
          </div>

          <div className="row mt-4">
          <div className="col-md-6">
              <div className=' d-flex justify-content-between '>
                <label htmlFor='last-name' className='form-label'>Adress</label>
                {
                  isEditing.address ? (
                      <span> <span className='modif-pointer me-2' onClick={() => toggleEdit('address')}>Annuler</span>| 
                      <span className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                    ) : (
                      <span onClick={() => toggleEdit('address')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
                    )
                  }
              </div>
              <input style={{width:'100%'}} className='form-control edit-info-inputs' type="text" name="last-name"
               disabled={!isEditing.address ? true : false}
               value={address}
              onChange={(e) => setaddress(e.target.value)}
              placeholder='Entrez votre adress' />
            </div>
            <div className="col-md-6">
              <div className=' d-flex justify-content-between '>
                <label htmlFor='last-name' className='form-label'>Code Postal</label>
                {
                  isEditing.CodePostal ? (
                      <span> <span className='modif-pointer me-2' onClick={() => toggleEdit('CodePostal')}>Annuler</span>| 
                      <span className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                    ) : (
                      <span onClick={() => toggleEdit('CodePostal')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
                    )
                  }
              </div>
              <input style={{width:'100%'}} className='form-control edit-info-inputs' type="text" name="last-name"
               disabled={!isEditing.CodePostal ? true : false}
               value={CodePostal}
              onChange={(e) => setCodePostal(e.target.value)} 
              placeholder='Entrez votre ZIP code'/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditProfile
