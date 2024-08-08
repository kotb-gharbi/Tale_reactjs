import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import './EditProfile.css'
import {faEllipsis ,faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'
import ReactFlagsSelect from "react-flags-select-2";
import { getCode, getName } from 'country-list';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BaseUrl from './BaseUrl';



function EditProfile() {

  const params = useParams();

  const [isloading , setisloading] = useState(false)
  const [selected, setSelected] = useState("");
  const [country, setcountry] = useState("");
  const [tel, settel] = useState("");
  const [address, setaddress] = useState("");
  const [CodePostal, setCodePostal] = useState("");

  const [ActiveInfo, setActiveInfo] = useState(1);
  const [last_name, setlast_name] = useState('');
  const [email, setemail] = useState('');
  const [name, setname] = useState('');
  const [birth, setbirth] = useState('');
  const [gender, setgender] = useState('');
  const [password, setpassword] = useState('');
  const [isEditing, setIsEditing] = useState({
    name: false,
    email : false, 
    password :false,
    last_name: false,
    birth : false,
    gender : false,
    country : false,
    tel: false , 
    address : false ,
    CodePostal : false, 
  });

  const [endpoint , setendpoint] = useState({
    name: 'edit-name',
    email : 'edit-email', 
    password :'change-password',
    last_name: 'edit-lastname',
    birth : 'edit-birth',
    gender : 'edit-gender',
    country : 'edit-country',
    tel: 'edit-tel' , 
    address : 'edit-address' ,
    CodePostal : 'edit-codepostal', 
  })
  const [Alert , setAlert] = useState({
    name: 'Name',
    email : 'Email', 
    password :'Password',
    last_name: 'Last_Name',
    birth : 'Date of birth',
    gender : 'Gender',
    country : 'Country',
    tel: 'Phone number' , 
    address : 'Address' ,
    CodePostal : 'Postal code', 
  })

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

  const allCountries = [
    "AF", "AL", "DZ", "AS", "AD", "AO", "AI", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", 
    "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BA", "BW", "BR", 
    "VG", "BN", "BG", "BF", "BI", "CV", "KH", "CM", "CA", "KY", "CF", "TD", "CL", "CN", 
    "CO", "KM", "CG", "CD", "CR", "CI", "HR", "CU", "CY", "CZ", "DK", "DJ", "DM", "DO", 
    "TL", "EC", "EG", "SV", "GQ", "ER", "EE", "SZ", "ET", "FJ", "FI", "FR", "GA", "GM", 
    "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GU", "GT", "GN", "GW", "GY", "HT", "HN", 
    "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IT", "JM", "JP", "JO", "KZ", 
    "KE", "KI", "KP", "KR", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", 
    "LU", "MO", "MK", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MR", "MU", "MX", "FM", 
    "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NZ", "NI", 
    "NE", "NG", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PL", 
    "PT", "PR", "QA", "RO", "RU", "RW", "KN", "LC", "VC", "WS", "SM", "ST", "SA", "SN", 
    "RS", "SC", "SL", "SG", "SK", "SI", "SB", "SO", "ZA", "SS", "ES", "LK", "SD", "SR", 
    "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TG", "TO", "TT", "TN", "TR", "TM", "TC", 
    "TV", "UG", "UA", "AE", "GB", "UY", "UZ", "VU", "VA", "VE", "VN", "EH", "YE", "ZM", "ZW"
  ];

  useEffect(() => {
    const fetchUserData = async() =>{
      try{
        const response = await BaseUrl.get(`/getUser/${params.id}`)
        const data = response.data
        console.log(data);
        
  
        setname(data.name)
        setlast_name(data.last_name)
        setemail(data.email)
        setbirth(data.birth)
        setgender(data.gender);
        setcountry(data.country || "");
        setSelected(getCode(data.country || ""));
        settel(data.tel);
        setaddress(data.address);
        setCodePostal(data.codePostal);
  
      }catch(error){
        console.log(error);
      }
      finally {
        setisloading(false);
      }
    }
    fetchUserData()
  },[params.id])

  const handleEdit = async (endpoint,field) => {
    try{
      const ApiUrl = `${endpoint}/${params.id}`
      const response = await BaseUrl.put(ApiUrl,{ [field]: eval(field) });
      alert(`${Alert[field]} Updated successfully`);
      if (field ==='password'){
        setpassword('');
      }
      toggleEdit(field);

    }catch(error){
      return error
    }
    
  }
  const notify = () => toast("Wow so easy !");


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
                      <span onClick={() => handleEdit(endpoint.name,'name')} className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                    ) : (
                      <span onClick={() => toggleEdit('name')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
                    )
                  }
                  
              </div>
              <input style={{width:'100%'}} className='form-control edit-info-inputs' type="text" name="name" 
              disabled={!isEditing.name ? true : false}
              value={name}
              onChange={(e) => setname(e.target.value)} 
              placeholder='Entrez le prénom'/>
            </div>
            <div className="col-md-6">
              <div className=' d-flex justify-content-between '>
                <label htmlFor='last_name' className='form-label'>Nom de famille</label>
                {
                  isEditing.last_name ? (
                      <span> <span className='modif-pointer me-2' onClick={() => toggleEdit('last_name')}>Annuler</span>| 
                      <span onClick={() => handleEdit(endpoint.last_name,'last_name')} className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                    ) : (
                      <span onClick={() => toggleEdit('last_name')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
                    )
                  }
              </div>
              <input style={{width:'100%'}} className='form-control edit-info-inputs' type="text" name="last_name"
               disabled={!isEditing.last_name ? true : false}
               value={last_name}
              onChange={(e) => setlast_name(e.target.value)} 
              placeholder='Entrez le nom de famille'/>
            </div>
          </div>
          <div className="row mt-4">
          <div className="col-md-6">
              <div className=' d-flex justify-content-between '>
                <label htmlFor='birth' className='form-label'>Date de naissance</label>
                {
                  isEditing.birth ? (
                      <span> <span className='modif-pointer me-2' onClick={() => toggleEdit('birth')}>Annuler</span>| 
                      <span onClick={() => handleEdit(endpoint.birth,'birth')} className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                    ) : (
                      <span onClick={() => toggleEdit('birth')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
                    )
                  }
              </div>
              <input style={{width:'100%'}} className='form-control edit-info-inputs' type="text" name="birth"
               disabled={!isEditing.birth ? true : false}
               value={birth}
              onChange={(e) => setbirth(e.target.value)} 
              placeholder='Entrez la date de naissance'/>
            </div>
            <div className="col-md-6">
              <div className=' d-flex justify-content-between '>
                <label htmlFor='gender' className='form-label'>Genre</label>
                {
                  isEditing.gender ? (
                      <span> <span className='modif-pointer me-2' onClick={() => toggleEdit('gender')}>Annuler</span>| 
                      <span onClick={() => handleEdit(endpoint.gender,'gender')} className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                    ) : (
                      <span onClick={() => toggleEdit('gender')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
                    )
                  }
              </div>
              <input style={{width:'100%'}} className='form-control edit-info-inputs' type="text" name="gender"
               disabled={!isEditing.gender ? true : false}
               value={gender}
              onChange={(e) => setgender(e.target.value)} />
            </div>
          </div>
          <div className="row my-4">
          <div className="col-md-6">
              <div className=' d-flex justify-content-between '>
                <label htmlFor='email' className='form-label'>Adresse e-mail</label>
                {
                  isEditing.email ? (
                      <span> <span className='modif-pointer me-2' onClick={() => toggleEdit('email')}>Annuler</span>| 
                      <span onClick={() => handleEdit(endpoint.email,'email')} className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                    ) : (
                      <span onClick={() => toggleEdit('email')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
                    )
                  }
              </div>
              <input style={{width:'100%'}} className='form-control edit-info-inputs' type="email" name="email"
               disabled={!isEditing.email ? true : false}
               value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder='Entrez le adresse e-mail' />
            </div>
            <div className="col-md-6">
              <div className=' d-flex justify-content-between '>
                <label htmlFor='password' className='form-label'>Password</label>
                {
                  isEditing.password ? (
                      <span> <span className='modif-pointer me-2' onClick={() => toggleEdit('password')}>Annuler</span>| 
                      <span onClick={() => handleEdit(endpoint.password,'password')} className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                    ) : (
                      <span onClick={() => toggleEdit('password')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
                    )
                  }
              </div>
              <input style={{width:'100%'}} className='form-control edit-info-inputs' type="text" name="password"
                disabled={!isEditing.password ? true : false}
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder='Entrez le mot de passe' />
            </div>
          </div>
          <hr />
          <div className="row mt-4">
            <div className="col-md-6">
              <div className=' d-flex justify-content-between '>
                  <label htmlFor='country' className='form-label'>Country</label>
                  {
                    isEditing.country ? (
                        <span> <span className='modif-pointer me-2' onClick={() => toggleEdit('country')}>Annuler</span>| 
                        <span onClick={() => handleEdit(endpoint.country,'country')} className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                      ) : (
                        <span onClick={() => toggleEdit('country')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
                      )
                    }
                </div>
                <ReactFlagsSelect
                    disabled={!isEditing.country ? true : false}
                    countries={allCountries}
                    selected={selected || ""}
                    onSelect={(code) => {
                      setSelected(code)
                      setcountry(getName(code) || "");
                    }}
                    searchable
                />
                
              </div>
              <div className="col-md-6">
                <div className=' d-flex justify-content-between '>
                    <label htmlFor='tel' className='form-label'>Numéro de téléphone</label>
                    {
                      isEditing.tel ? (
                          <span> <span className='modif-pointer me-2' onClick={() => toggleEdit('tel')}>Annuler</span>| 
                          <span onClick={() => handleEdit(endpoint.tel,'tel')} className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                        ) : (
                          <span onClick={() => toggleEdit('tel')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
                        )
                      }
                </div>
                <input style={{width:'100%'}} className='form-control edit-info-inputs' type="text" name="tel"
                  disabled={!isEditing.tel ? true : false}
                  value={tel}
                  onChange={(e) => settel(e.target.value)}
                  placeholder='Entrez le Numéro de téléphone' 
                />
                  
              </div>
          </div>

          <div className="row mt-4">
          <div className="col-md-6">
              <div className=' d-flex justify-content-between '>
                <label htmlFor='address' className='form-label'>Adress</label>
                {
                  isEditing.address ? (
                      <span> <span className='modif-pointer me-2' onClick={() => toggleEdit('address')}>Annuler</span>| 
                      <span onClick={() => handleEdit(endpoint.address,'address')} className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                    ) : (
                      <span onClick={() => toggleEdit('address')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
                    )
                  }
              </div>
              <input style={{width:'100%'}} className='form-control edit-info-inputs' type="text" name="address"
               disabled={!isEditing.address ? true : false}
               value={address}
              onChange={(e) => setaddress(e.target.value)}
              placeholder="Entrez l'adress" />
            </div>
            <div className="col-md-6">
              <div className=' d-flex justify-content-between '>
                <label htmlFor='codepostal' className='form-label'>Code Postal</label>
                {
                  isEditing.CodePostal ? (
                      <span> <span className='modif-pointer me-2' onClick={() => toggleEdit('CodePostal')}>Annuler</span>| 
                      <span onClick={() => handleEdit(endpoint.CodePostal,'CodePostal')} className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                    ) : (
                      <span onClick={() => toggleEdit('CodePostal')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
                    )
                  }
              </div>
              <input style={{width:'100%'}} className='form-control edit-info-inputs' type="text" name="codepostal"
               disabled={!isEditing.CodePostal ? true : false}
               value={CodePostal}
              onChange={(e) => setCodePostal(e.target.value)} 
              placeholder='Entrez le ZIP code'/>
            </div>

            <div>
        <button onClick={notify}>Notify !</button>
        <ToastContainer />
      </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditProfile
