import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import BaseUrl from './BaseUrl';
import './Users.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import SearchableTable from './SearchableTable.jsx';



function Users() {
  const [ActiveCategory, setActiveCategory] = useState(1);
  const [data , setdata] = useState([])

  const handleCategory = (index) => {
    setActiveCategory(index);
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
    
  },[])

  const handleToggle = (id) => {
    setdata(prevData =>
      prevData.map(user =>
        user.id === id ? { ...user, status: !user.status } : user
      )
    );
  };




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
        <label class="switch">
          <input type="checkbox" 
          checked={row.status}
          onChange={() => handleToggle(row.id)}
           />
          <span class="slider"></span>
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
        <Link to={`/sidebar/gestion-des-utilisateurs/${row.id}`} style={{textDecoration:'none' , color: 'inherit'}}>
          <FontAwesomeIcon icon={faEllipsis} className='actions-dots'/>
        </Link>
        
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
          <p className=' p-0 mb-4'>Détails et informations</p>
          
          <div className='user-categories'>
            <span className={`user-category ${ActiveCategory === 1 ? 'active-category' : ''}`}
              onClick={() => handleCategory(1)}>
              Modérateurs</span>
            <span className={`user-category ${ActiveCategory === 2 ? 'active-category' : ''}`}
              onClick={() => handleCategory(2)}>
              Clients</span>
          </div>

          <SearchableTable data={data} columns={columns} customstyles={customstyles}/>

        </div>
      </div>
    </>
  )
}

export default Users;
