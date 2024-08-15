import React, { useEffect, useState } from 'react'
import './EditProfile.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom'
import ReactFlagsSelect from "react-flags-select-2";
import { getCode, getName } from 'country-list';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BaseUrl from './BaseUrl';
import Ripples from 'react-ripples';


function EditProfile() {

  const params = useParams();

  const [isloading , setisloading] = useState(false)
  const [selected, setSelected] = useState("");
  const [country, setcountry] = useState("");
  const [tel, settel] = useState("");
  const [address, setaddress] = useState("");
  const [CodePostal, setCodePostal] = useState("");
  const [profile_pic, setprofile_pic] = useState("")
  const [activeerrors, setactiveerrors] = useState({
    email : false,
    password : false,
    birth : false,
    tel : false,
    name : false,
    last_name : false
  });
  const [errors , seterrors] = useState({
    email : "",
    password : "",
    birth : "",
    tel:"",
    name : "",
    last_name : ""
  })

  const [originalValues, setOriginalValues] = useState({
    name: "",
    last_name: "",
    email: "",
    birth: "",
    gender: "",
    country: "",
    tel: "",
    address: "",
    codePostal: ""
  });
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
    last_name: 'edit-last_name',
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

  const [TogglePopup, setTogglePopup] = useState(false)
  const [banned, setbanned] = useState(false)
  const [ban_reason, setban_reason] = useState("")


  const togglepopup = () => {
    setTogglePopup(!TogglePopup)
    
  }

  const toggleEdit =  (field) => {
    setIsEditing(prevState => ({
      ...prevState,
      [field] : !prevState[field]
    }))
    
  }

  const untoggleEdit =  (field) => {

    if (isEditing[field]) {
      // Reset fields to their original values
      switch (field) {
        case 'name':
          setname(originalValues.name);
          activeerrors.name = false
          break;
        case 'last_name':
          setlast_name(originalValues.last_name);
          activeerrors.name = false
          break;
        case 'email':
          setemail(originalValues.email);
          activeerrors.email = false
          break;
        case 'birth':
          setbirth(originalValues.birth);
          activeerrors.birth = false
          break;
        case 'gender':
          setgender(originalValues.gender);
          break;
        case 'country':
          setcountry(originalValues.country);
          setSelected(getCode(originalValues.country));
          break;
        case 'tel':
          settel(originalValues.tel);
          activeerrors.tel = false
          break;
        case 'address':
          setaddress(originalValues.address);
          break;
        case 'codePostal':
          setCodePostal(originalValues.codePostal);
          break;
        default:
          break;
      }
      setactiveerrors(prevState => ({ ...prevState, [field]: false }));
    }
    setIsEditing(prevState => ({
      ...prevState,
      [field] : !prevState[field]
    }))
    
  }

  const handlerrors = (field, msg) => (
    seterrors(prevstate => ({
      ...prevstate,
      [field] : msg
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
  
        setOriginalValues({
          name: data.name,
          last_name: data.last_name,
          email: data.email,
          birth: data.birth,
          gender: data.gender,
          country: data.country || "",
          tel: data.tel,
          address: data.address,
          codePostal: data.codePostal
        });

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
        setprofile_pic(data.profile_pic)
        if(data.banned === 0){
          setbanned(false)
        }else{
          setbanned(true)
        }
        setban_reason(data.ban_reason)
  
      }catch(error){
        console.log(error);
      }
      finally {
        setisloading(false);
      }
    }
    fetchUserData()
  },[params.id])

  const stateMapping = {
    name,
    last_name,
    email,
    birth,
    gender,
    tel,
    address,
    CodePostal: CodePostal,
    country : country || "",
    password
  };
  

  const handleEdit = async (endpoint,field) => {
    
    if(field === "password"){
      if (password.length < 8 ){
        handlerrors(field,"*Please enter at least 8 characters")
        activeerrors.password = true
        return
      }
    }else if (field === "email"){
      const expressionEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
      if(!expressionEmail.test(email) || email.length<1){
        handlerrors(field,"*Invalid email format")
        activeerrors.email = true
        return
      }
    }else if(field === "birth"){
      const expressionBirth = /^(?:\d{4}[-\/]\d{2}[-\/]\d{2})$/
      if(!expressionBirth.test(birth)){
        handlerrors(field,"*Invalid date format")
        activeerrors.birth = true
        return
      }
    }else if(field === "tel") {
      const expressionTel = /^[0-9+()\-\/\s]+$/
      if(!expressionTel.test(tel) && !tel==="") {
        handlerrors(field, "*Invalid phone number format");
        activeerrors.tel = true;
        return;
      }
    }else if (field === "name"){
      if (name.length <1){
        handlerrors(field,"*Please enter the name")
        activeerrors.name = true
        return
      }
    }else if (field === "last_name"){
      if (last_name.length <1){
        handlerrors(field,"*Please enter the last_name")
        activeerrors.last_name = true
        return
      }
    }

    try{
      const ApiUrl = `${endpoint}/${params.id}`
      const response = await BaseUrl.put(ApiUrl,{ [field]: stateMapping[field] });
      const data = response.data

      if (field === "email" && !data.status) {
        handlerrors(field, "*Email already taken");
        activeerrors.email = true;
        return;
      } else if (!data.status) {
        alert(`There was a problem updating ${Alert[field]}. Please try again.`);
      } else {
        toast.success(`${Alert[field]} updated successfully.`, {
          position: "top-right",
          autoClose: 2000,  
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          icon: "✅", 
        });
        // Reset the field error state after successful update
        setactiveerrors(prevState => ({ ...prevState, [field]: false }));
        setOriginalValues(prevValues => ({
          ...prevValues,
          [field]: stateMapping[field]
      }));

      }
      
      if (field ==='password'){
        setpassword('');
      }
      toggleEdit(field);

    }catch(error){
      toast.error("An error occurred while updating. Please try again.", {
        position: "top-right",
        autoClose: 2000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: "❌", 
      });
    }
    
  }

  return (
    <>
      <div className="card profile-card" style={{marginBottom : '17px'}}>
          <div className="card-body p-0">
              <div className=" d-flex justify-content-between align-items-center">
                  <div className=' d-flex justify-content-center align-items-center'>

                      <Link to='/sidebar/gestion-des-utilisateurs' style={{textDecoration:'none'  , color:'inherit'}}>
                        <FontAwesomeIcon icon={faArrowLeft} className='GoBackArrow' />
                      </Link>

                      <img className='rounded-circle ' style={{width:'70px' , height:'70px'}} src={profile_pic} alt="pfp" />
                      <div className='ms-4'>
                        <p className='mb-0' style={{fontWeight:'600' , fontSize:'22px'}}>{originalValues.name} {originalValues.last_name}</p>
                        <p className='mb-0'> Modérateur | {params.id}</p>
                      </div>
                  </div>
                  <div className=' d-flex justify-content-center align-items-center'>
                    {
                      banned && (
                        <div class="alert alert-danger" role="alert">
                          le compte a été définitivement banni !
                        </div>
                      )
                    }
                    <FontAwesomeIcon icon={faEllipsis} onClick={banned ? togglepopup : ''} style={{cursor : 'pointer'}} />
                  </div>
              </div>
          </div>
      </div>


      <div className="card profile-card">
        <div className="card-body p-0">
          <div className={`user-infos ${TogglePopup ? 'hide-after' : ''}`}>
              <span className={`user-info ${ActiveInfo === 1 ? 'active-info' : ''} ${TogglePopup ? 'hide-after' : ''}`}
                onClick={() => handleInfo(1)}>
                Informations</span>
              <span className={`user-info ${ActiveInfo === 2 ? 'active-info' : ''} ${TogglePopup ? 'hide-after' : ''}`}
                onClick={() => handleInfo(2)}>
                Enquête</span>
                <span className={`user-info ${ActiveInfo === 3 ? 'active-info' : ''} ${TogglePopup ? 'hide-after' : ''}`}
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
                      <span> <span className='modif-pointer me-2' onClick={() => untoggleEdit('name')}>Annuler</span>| 
                      <span onClick={() => handleEdit(endpoint.name,'name')} className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                    ) : (
                      <span  className={banned ? "banned" : ''}  onClick={() => toggleEdit('name')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
                    )
                  }
                  
              </div>
              <input style={{width:'100%'}} className='form-control edit-info-inputs' type="text" name="name" 
              disabled={!isEditing.name ? true : false}
              value={name}
              onChange={(e) => setname(e.target.value)} 
              placeholder='Entrez le prénom'/>
              <div className="error-message">
                {activeerrors.name && (
                    <div style={{color : 'red'}}> {errors.name}</div>
                  )}
              </div>
            </div>
            <div className="col-md-6">
              <div className=' d-flex justify-content-between '>
                <label htmlFor='last_name' className='form-label'>Nom de famille</label>
                {
                  isEditing.last_name ? (
                      <span> <span className='modif-pointer me-2' onClick={() => untoggleEdit('last_name')}>Annuler</span>| 
                      <span onClick={() => handleEdit(endpoint.last_name,'last_name')} className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                    ) : (
                      <span  className={banned ? "banned" : ''}  onClick={() => toggleEdit('last_name')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
                    )
                  }
              </div>
              <input style={{width:'100%'}} className='form-control edit-info-inputs' type="text" name="last_name"
               disabled={!isEditing.last_name ? true : false}
               value={last_name}
              onChange={(e) => setlast_name(e.target.value)} 
              placeholder='Entrez le nom de famille'/>
              <div className="error-message">
                {activeerrors.last_name && (
                    <div style={{color : 'red'}}> {errors.last_name}</div>
                  )}
              </div>
            </div>
          </div>
          <div className="row mt-4">
          <div className="col-md-6">
              <div className=' d-flex justify-content-between '>
                <label htmlFor='birth' className='form-label'>Date de naissance</label>
                {
                  isEditing.birth ? (
                      <span> <span className='modif-pointer me-2' onClick={() => untoggleEdit('birth')}>Annuler</span>| 
                      <span onClick={() => handleEdit(endpoint.birth,'birth')} className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                    ) : (
                      <span  className={banned ? "banned" : ''}  onClick={() => toggleEdit('birth')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
                    )
                  }
              </div>
              <input style={{width:'100%'}} className='form-control edit-info-inputs' type="text" name="birth"
               disabled={!isEditing.birth ? true : false}
               value={birth}
              onChange={(e) => setbirth(e.target.value)} 
              placeholder='Entrez la date de naissance'/>
              <div className="error-message">
                {activeerrors.birth && (
                    <div style={{color : 'red'}}> {errors.birth}</div>
                  )}
              </div>
              
            </div>
            <div className="col-md-6">
              <div className=' d-flex justify-content-between '>
                <label htmlFor='gender' className='form-label'>Genre</label>
                {
                  isEditing.gender ? (
                      <span> <span className='modif-pointer me-2' onClick={() => untoggleEdit('gender')}>Annuler</span>| 
                      <span onClick={() => handleEdit(endpoint.gender,'gender')} className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                    ) : (
                      <span  className={banned ? "banned" : ''}  onClick={() => toggleEdit('gender')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
                    )
                  }
              </div>
              <div className="radio-group">
                
                  <label className='radio'>
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      checked={gender === 'male'}
                      onChange={(e) => setgender(e.target.value)}
                      disabled={!isEditing.gender ? true : false}
                    />
                    Homme
                    <span className={banned ? 'gender-banned' : ''} ></span>
                  </label>
                  
                  <label  className='radio' style={{marginLeft : '20px'}}>
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      checked={gender === 'female'}
                      onChange={(e) => setgender(e.target.value)}
                      disabled={!isEditing.gender ? true : false}
                    />
                    Femme
                    <span  className={banned ? 'gender-banned' : ''} ></span>
                  </label>
                
              </div>

            </div>
          </div>
          <div className="row my-4">
          <div className="col-md-6">
              <div className=' d-flex justify-content-between '>
                <label htmlFor='email' className='form-label'>Adresse e-mail</label>
                {
                  isEditing.email ? (
                      <span> <span className='modif-pointer me-2' onClick={() => untoggleEdit('email')}>Annuler</span>| 
                      <span onClick={() => handleEdit(endpoint.email,'email')} className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                    ) : (
                      <span  className={banned ? "banned" : ''}  onClick={() => toggleEdit('email')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
                    )
                  }
              </div>
              <input style={{width:'100%'}} className='form-control edit-info-inputs' type="email" name="email"
               disabled={!isEditing.email ? true : false}
               value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Entrez l'adresse e-mail" />
              <div className="error-message">
              {activeerrors.email && (
                  <div style={{color : 'red'}}> {errors.email}</div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className=' d-flex justify-content-between '>
                <label htmlFor='password' className='form-label'>Password</label>
                {
                  isEditing.password ? (
                      <span> <span className='modif-pointer me-2' onClick={() => untoggleEdit('password')}>Annuler</span>| 
                      <span onClick={() => handleEdit(endpoint.password,'password')} className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                    ) : (
                      <span  className={banned ? "banned" : ''}  onClick={() => toggleEdit('password')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
                    )
                  }
              </div>
              <input style={{width:'100%'}} className='form-control edit-info-inputs' type="text" name="password"
                disabled={!isEditing.password ? true : false}
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder='Entrez le mot de passe' />
                <div className="error-message">

                {activeerrors.password && (
                  <div style={{color : 'red'}}> {errors.password}</div>
                )}
                </div>
            </div>
          </div>
          <hr />
          <div className="row mt-4">
            <div className="col-md-6">
              <div className=' d-flex justify-content-between '>
                  <label htmlFor='country' className='form-label'>Country</label>
                  {
                    isEditing.country ? (
                        <span> <span className='modif-pointer me-2' onClick={() => untoggleEdit('country')}>Annuler</span>| 
                        <span onClick={() => handleEdit(endpoint.country,'country')} className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                      ) : (
                        <span  className={banned ? "banned" : ''}  onClick={() => toggleEdit('country')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
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
                          <span> <span className='modif-pointer me-2' onClick={() => untoggleEdit('tel')}>Annuler</span>| 
                          <span onClick={() => handleEdit(endpoint.tel,'tel')} className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                        ) : (
                          <span  className={banned ? "banned" : ''}  onClick={() => toggleEdit('tel')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
                        )
                      }
                </div>
                <input style={{width:'100%'}} className='form-control edit-info-inputs' type="text" name="tel"
                  disabled={!isEditing.tel ? true : false}
                  value={tel}
                  onChange={(e) => settel(e.target.value)}
                  placeholder='Entrez le Numéro de téléphone' 
                />
                <div className="error-message">

                {activeerrors.tel && (
                  <div style={{color : 'red'}}> {errors.tel}</div>
                )}
                </div>
              </div>
          </div>

          <div className="row mt-4">
          <div className="col-md-6">
              <div className=' d-flex justify-content-between '>
                <label htmlFor='address' className='form-label'>Adress</label>
                {
                  isEditing.address ? (
                      <span> <span className='modif-pointer me-2' onClick={() => untoggleEdit('address')}>Annuler</span>| 
                      <span onClick={() => handleEdit(endpoint.address,'address')} className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                    ) : (
                      <span  className={banned ? "banned" : ''}  onClick={() => toggleEdit('address')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
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
                      <span> <span className='modif-pointer me-2' onClick={() => untoggleEdit('CodePostal')}>Annuler</span>| 
                      <span onClick={() => handleEdit(endpoint.CodePostal,'CodePostal')} className='modif-pointer ms-2' style={{color :'#2FB300'}}>Confirmer</span></span>
                    ) : (
                      <span className={banned ? "banned" : ''} onClick={() => toggleEdit('CodePostal')} style={{color :'#004EE4' , cursor:'pointer'}}>Modifier</span>
                    )
                  }
              </div>
              <input style={{width:'100%'}} className='form-control edit-info-inputs' type="text" name="codepostal"
               disabled={!isEditing.CodePostal ? true : false}
               value={CodePostal}
              onChange={(e) => setCodePostal(e.target.value)} 
              placeholder='Entrez le ZIP code'/>
            </div>
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Flip}
            />
          </div>
        </div>
      </div>
      {
        TogglePopup && (
          <div className="banned-popup" onClick={togglepopup}>
            <div className="banned-popup-filter"></div>
            <div className="card banned-popup-content" onClick={e => e.stopPropagation()}>
              <div className="card-body">
                <div style={{fontWeight : 'bold'}}> Compte banni</div>

                <p className='mb-1 mt-2'>Compte est banni définitivement, car il a enfreint la politique relative à la propriété intellectuelle de Tale.
                </p>

                <p><span style={{fontWeight : 'bold'}}>Raison : </span> {ban_reason}</p>

                <div className=' d-flex justify-content-between align-items-center'>
                  <button className='btn cancel-ban-btn' onClick={togglepopup}>Cancel</button>
                  <div style={{display: 'inline-flex',borderRadius: 10,overflow: 'hidden',}}>
                    <Ripples color="rgb(230, 230, 230)" during={500}>
                    <button className='btn activer-btn'>Activer</button>
                    </Ripples>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default EditProfile
