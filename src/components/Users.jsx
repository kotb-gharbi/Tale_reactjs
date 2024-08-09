import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BaseUrl from './BaseUrl';
import './Users.css';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft, faAnglesRight, faAnglesLeft, faEllipsis } from '@fortawesome/free-solid-svg-icons';



function Users() {
  const [ActiveCategory, setActiveCategory] = useState(1);
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); 
  const [data , setdata] = useState([])
  const [roles, setroles] = useState([]);

  const handleCategory = (index) => {
    setActiveCategory(index);
  }

  

  useEffect(() => {
    const fetchUsers = async () => {
      try{
        const response = await BaseUrl.get('/getUsers')
        const data = response.data        
        setdata(data)
      }catch(error){
        console.log(error);
      }
      
    }
    fetchUsers()
    
  },[])




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
          <input type="checkbox" checked={row.status} />
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

  const filteredData = data.filter(item =>
    Object.entries(item)
      .filter(([key]) => key !== 'id' && key !== 'status')
      .some(([key, value]) => value && value.toString().toLowerCase().includes(filterText.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, filteredData.length);

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

                <div className="input-group-container">
                  <div className="pagination-selector">
                    <p>Afficher</p>
                    <select className="form-select" value={itemsPerPage} onChange={e => setItemsPerPage(Number(e.target.value))}>
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                      <option value={20}>20</option>
                    </select>
                    <p>entrées</p>
                  </div>

                  <div className='input-group d-flex justify-content-end'>
                    <div className=' d-flex justify-content-center' style={{width :'350px' ,borderRadius : '20px'}}>
                      <span className='input-group-text filter-search'>
                        <img src="/search.png" alt="search" className='search-icon' />
                      </span>
                      <input 
                        type="text" 
                        placeholder="Recherche par nom, email, role" 
                        value={filterText} 
                        onChange={e => setFilterText(e.target.value)} 
                        className='filter-input' 
                      />
                    </div>
                    
                    <FontAwesomeIcon icon={faEllipsis}  style={{cursor:'pointer',margin : 'auto 20px'}} />
                  </div>
                </div>


          <div className='mt-4'>
            <DataTable
              columns={columns}
              data={paginatedData}
              customStyles={customstyles}
              selectableRows
              selectableRowsComponent={({ selectedRow, onChange }) => (
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedRow}
                    onChange={e => onChange(e.target.checked)}
                  />
                  <span className="custom-checkbox-box"></span>
                </label>
              )}
            />
          </div>

          <div className="pagination-controls d-flex justify-content-between">
            <div>
                Affichage de {startIndex} à {endIndex} des entrées
            </div>
            <div className='arrows-container'>
              <FontAwesomeIcon icon={faAnglesLeft} onClick={() => setCurrentPage(() => 1)}  className='double-pagination-arrows'  />
              <FontAwesomeIcon icon={faAngleLeft} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} className='pagination-arrows'/>
              <FontAwesomeIcon icon={faAngleRight} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} className='pagination-arrows' />
              <FontAwesomeIcon icon={faAnglesRight} onClick={() => setCurrentPage(() => totalPages)} className='double-pagination-arrows' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Users;
