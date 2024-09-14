import React, { useEffect, useState,useContext } from 'react';
import { Link} from 'react-router-dom';
import BaseUrl from './BaseUrl';
import './Users.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis,faTrashCan,faUser } from '@fortawesome/free-solid-svg-icons';
import SearchableTable from './SearchableTable.jsx';
import Ripples from 'react-ripples';
import { useForm } from 'react-hook-form';
import { AddUserFormContext } from './AddUserFormContext.jsx';
import { MultiSelect } from 'primereact/multiselect';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';    
import { ToastContainer, toast, Flip } from 'react-toastify';



function Users() {
  const [ActiveCategory, setActiveCategory] = useState(1);
  const [dropdownVisible, setDropdownVisible] = useState(null);

  const [selectedRoles, setSelectedRoles] = useState([]);
  const [roles, setroles] = useState([])
  const [data , setdata] = useState([]);
  const { AddUserForm, setAddUserForm } = useContext(AddUserFormContext);
  const { 
    register,
    handleSubmit, 
    setError, 
    formState: { errors, isSubmitting } 
  } = useForm();

  const handleDropdownToggle = (id) => {
    setDropdownVisible(dropdownVisible === id ? null : id);
  };

  const handleDeleteUser = async (id) => {
    try{
      await BaseUrl.delete(`/delete_user/${id}`)
      toast.success(`User deleted successfully.`, {
        position: "top-right",
        autoClose: 2000,  
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: "✅", 
      });
      setdata(prevData => prevData.filter(user => user.id !== id));
    }catch(e){
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 2000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: "❌", 
      });
      console.log(e);
    }

  };

  const handleCategory = (index) => {
    setActiveCategory(index);
  }

  const onSubmit = async(formdata) => {
    try{
      formdata.roles = selectedRoles
      const response = await BaseUrl.post('/register',formdata)
      setAddUserForm(!AddUserForm)
      toast.success(`User added successfully.`, {
        position: "top-right",
        autoClose: 2000,  
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: "✅", 
      });
    }catch (e) {
      if (e.response) {
        if(e.response.data.message == "The email has already been taken."){
          setError("email",{
            message : '*Email already used'
          })
        }else if(e.response.data.message == 'The birth field must be a valid date.'){
          setError("birth",{
            message : '*Invalid date format '
          })
        }
      } else {
        toast.error("An error occurred. Please try again.", {
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
    
  }
  

  useEffect(() => {
    const fetchUsers = async () => {
      try{
        const response = await BaseUrl.get('/getUsers')
        const data = response.data.map(user => ({
          ...user,
          status: user.status
        }));        
        setdata(data)
      }catch(error){
        console.log(error);
      }
      
    }
    fetchUsers()
      
  },[AddUserForm])

  useEffect(() => {
    const fetchRoles = async () => {
      try{
        const response = await BaseUrl.get('/AllRoles')
        const data = response.data
        const RolesNames = data.map((role) => role.name)
        setroles(RolesNames)
      }catch(e){
        console.error(e)
      }
    }
    fetchRoles()

  }, []); 

  const handleStatusToggle = async (id) => {
    try{
      const response = await BaseUrl.get(`/edit-status/${id}`)
      const data = response.data
      if(data.status){
        setdata(prevData =>
          prevData.map(user =>
            user.id === id ? { ...user, status: !user.status } : user
          )
        );
      }
      
    }catch(e){
      console.error(e)
    }
    
  };

  const toggleFormpopup = () => {
    setAddUserForm(!AddUserForm)
  }

  const columns = [
    {
      name: <h6 className='m-0'>Name</h6>,
      selector: row => row.name,
      sortable: true,
      cell: row => (
        <div className=' d-flex align-items-center'>
          <div className='pfp-container'>
            <img className='rounded-circle pfp' src={row.profile_pic} alt="User" />
          </div>
          
          <p className='mb-0 ps-2' style={{fontWeight: '600' , fontSize : '13px'}}>{row.name}, {row.last_name}</p>
        </div>
      ),
      width :'15rem'
      
    },
    {
      name: <h6 className='m-0'>Contact</h6>,
      selector: row => row.email,
      sortable: true,
      width :'14rem'
    },
    {
      name: <h6 className='m-0'>Roles</h6>,
      selector: row => row.roles.map((role) => {
        return role.name
      }).join(', '),
      sortable: false,
    },
    {
      name: <h6 className='m-0'>Status</h6>,
      cell: row => (
        <label className="switch">
          <input type="checkbox" 
          checked={row.status}
          onChange={() => handleStatusToggle(row.id)}
           />
          <span className="slider"></span>
        </label>
      ),
      sortable: false,
     
    },
    {
      name: <h6 className='m-0'>Date d'inscription</h6>,
      selector: row => {
        const date = new Date(row.created_at);
    
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
        const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        
        const finalFormat = `${formattedDate} ${formattedTime}`;
        return finalFormat
      },
      sortable: false,
    },
    {
      name: <h6 className='m-0'>Actions</h6>,
      cell : row => (
        <div className=" position-absolute">
          <FontAwesomeIcon
            icon={faEllipsis}
            className="actions-dots"
            onClick={() => handleDropdownToggle(row.id)}
          />
          {dropdownVisible === row.id && (
            <ul className="user-dropdown">
              <li>
                <Link to={`/sidebar/gestion-des-utilisateurs/${row.id}`} className="dropdown-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <FontAwesomeIcon icon={faUser} style={{ paddingRight: '5px', width: '18px', height: '18px' }} />
                  Check Profile
                </Link>
              </li>
              <li className="dropdown-item delete" onClick={() => handleDeleteUser(row.id)}>
                <FontAwesomeIcon icon={faTrashCan} style={{ color: "#ff0000", paddingRight: '5px', width: '18px', height: '18px' }} />
                Delete user
              </li>
            </ul>
          )}
        </div>

      ),
      sortable : false,
      width:'7rem'
      
    }
    
  ];

  const customstyles = {
    table: {
      style: {
        border: "1px solid #dee2e6",
        borderRadius: "10px",
        overflow: 'hidden',
      }
    },
    headCells: {
      style: {
        backgroundColor: "#DDDDDD",
        fontSize: "12px",
        fontWeight: "bold",
        padding: "15px",
        display : 'flex',
        justifyContent : 'space-between',
        alignItems : 'center'
      }
    },

    cells : {
      style: {
        height : '60px',
        fontSize : '14px',
      }
    },
    
  };

  return (
    <>
      <div className="card users-card">
        <div className="card-body">
          <h3 className=' pb-2'>Gestion des utilisateurs</h3>
          <div className=' d-flex justify-content-between'>
            <p className=' p-0 mb-4'>Détails et informations</p>
            <button className='AddUser_btn' onClick={toggleFormpopup}>Ajouter</button>
          </div>
          
          <div className={`user-categories ${AddUserForm  ? 'no-display' : ''}`} >
            <span className={`user-category ${ActiveCategory === 1 ? 'active-category' : ''} ${AddUserForm  ? 'no-display' : ''}`  }
              onClick={() => handleCategory(1)}>
              Modérateurs</span>
            <span className={`user-category ${ActiveCategory === 2 ? 'active-category' : ''} ${AddUserForm  ? 'no-display' : ''}`}
              onClick={() => handleCategory(2)}>
              Clients</span>
          </div>


          <SearchableTable data={data} columns={columns} customstyles={customstyles} />
          {
            AddUserForm && (
              <div className="form-popup" onClick={toggleFormpopup}>
                <div className="form-popup-filter"></div>
                <div className="card form-popup-content" onClick={e => e.stopPropagation()}>
                  <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className=' mb-4 d-flex justify-content-center align-items-center'>
                          <h1>Add User</h1>
                      </div>
                      <div className='row'>
                        <div className="col">

                          <label style={{ fontWeight: '600' }} className='form-label d-flex align-items-center' htmlFor="name">Prénom <p className='etoile'>*</p></label>
                          <input className='form-control login-inputs' type="text"
                            name="name"
                            placeholder='Entrez le prénom'
                            {...register("name", {
                              required: '*Please enter the name'
                            })}
                          />
                          <div className='error-message'>
                            {errors.name && <div style={{ color: 'red' }}>{errors.name.message}</div>}
                          </div>

                        </div>
                        <div className="col">
                          <label style={{ fontWeight: '600' }} className='form-label d-flex align-items-center' htmlFor="last_name">Nom de famille <p className='etoile'>*</p></label>
                          <input className='form-control login-inputs' type="text"
                            name="last_name"
                            placeholder='Entrez le Nom de famille'
                            {...register("last_name", {
                              required: '*Please enter the last name',
                            })}
                          />
                          <div className='error-message'>
                            {errors.last_name && <div style={{ color: 'red' }}>{errors.last_name.message}</div>}
                          </div>
                        </div>
                      </div>
                      <div className='row mt-3'>
                        <div className="col">

                          <label style={{ fontWeight: '600' }} className='form-label d-flex align-items-center' htmlFor="date">Date de naissance <p className='etoile'>*</p></label>
                          <input className='form-control login-inputs' type="text"
                            name="date"
                            placeholder='AAAA-MM-JJ'
                            {...register("birth", {
                              required: '*Invalid date format',
                              validate: value =>
                                /^(?:\d{4}[-\/]\d{2}[-\/]\d{2})$/i.test(value) || "*Invalid date format"
                            })}
                          />
                          <div className='error-message'>
                            {errors.birth && <div style={{ color: 'red' }}>{errors.birth.message}</div>}
                          </div>

                        </div>
                        <div className="col">
                          <label style={{ fontWeight: '600' }} className='form-label d-flex align-items-center' htmlFor="gender">Genre <p className='etoile'>*</p></label>
                          <div className="radio-group">
                
                              <label className='radio'>
                                <input
                                  type="radio"
                                  id="male"
                                  name="gender"
                                  value="male"
                                  {...register("gender", { required: "*Gender is required" })}
                                  
                                />
                                Homme
                                <span ></span>
                              </label>
                              
                              <label  className='radio' style={{marginLeft : '20px'}}>
                                <input
                                  type="radio"
                                  id="female"
                                  name="gender"
                                  value="female"
                                  {...register("gender", { required: "*Gender is required" })}
                                  
                                />
                                Femme
                                <span ></span>
                              </label>
                            
                          </div>
                          <div className='error-message'>
                            {errors.gender && <div style={{ color: 'red' }}>{errors.gender.message}</div>}
                          </div>
                        </div>
                      </div>

                      <div className='row mt-3'>
                        <div className="col">

                          <label style={{ fontWeight: '600' }} className='form-label d-flex align-items-center' htmlFor="email">Adresse e-mail <p className='etoile'>*</p></label>
                          <input className='form-control login-inputs' type="text"
                            name="email"
                            placeholder='example@gmail.com'
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
                        <div className="col">
                          <label style={{ fontWeight: '600' }} className='form-label d-flex align-items-center' htmlFor="pwd">Password <p className='etoile'>*</p></label>
                          <input className='form-control login-inputs' type="password"
                            name="pwd"
                            placeholder='Entrez le mot de passe'
                            {...register("password", {
                              required: '*Password is required',
                              minLength: {
                                value: 8,
                                message: '*Please enter at least 8 characters',
                              }
                            })}
                          />
                          <div className='error-message'>
                            {errors.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className='row mt-3'>
                        <div className="col">

                          <label style={{ fontWeight: '600' }} className='form-label d-flex align-items-center' htmlFor="email">Roles<p className='etoile'>*</p> </label>
                          <MultiSelect
                              value={selectedRoles}
                              onChange={(e) => setSelectedRoles(e.value)}
                              options={roles}
                              placeholder="Select Roles"
                              display="chip"
                              maxSelectedLabels={3}
                              className="w-full md:w-20rem"
                              style={{width:'100%'}}
                              
                          />
                          <div className='error-message'>
                          {selectedRoles.length < 1 && (
                            <div style={{ color: 'red' }}>*Select at least 1 role</div>
                          )}
                          </div>
                        </div>
                        <div className="col">
                          <label style={{ fontWeight: '600' }} className='form-label d-flex' htmlFor="tel">Numéro de téléphone </label>
                          <input className='form-control login-inputs' type="text"
                            name="tel"
                            placeholder='Entrez le Numéro de téléphone'
                            {...register("tel")}
                          />
                        </div>
                      </div>

                        <div className=' mt-5 d-flex justify-content-between align-items-center'>
                          <button className='btn cancel-ban-btn' onClick={toggleFormpopup}>Cancel</button>
                          <div style={{display: 'inline-flex',borderRadius: 10,overflow: 'hidden'}}>
                            <Ripples color="rgb(230, 230, 230)" during={500}>
                              <button className='AddUser_btn' type='submit' 
                              disabled={isSubmitting} >{isSubmitting ? "Loading..." : "Submit"}</button>
                            </Ripples>
                          </div>
                      </div>
                    </form>

                    
                  </div>
                </div>
              </div>
              
            )
          }

        </div>
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
    </>
  )
}

export default Users;
