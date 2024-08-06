import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Users.css';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight,faAngleLeft,faAnglesRight ,faAnglesLeft , faEllipsis } from '@fortawesome/free-solid-svg-icons'

function Users() {
  const [ActiveCategory, setActiveCategory] = useState(1);
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); 


  const handleCategory = (index) => {
    setActiveCategory(index);
  }

  const data = [
    { id: 1, name: 'Conan' ,last_name : 'blast', email: 'faza@gmail.com', roles: ['admin'], status: false , date : '22/12/2023 20:15'},
    { id: 2, name: 'The Terminator',last_name : 'blast', email: 'test@gmail.com', roles: ['client', 'moderator'], status: false , date : '22/12/2023 20:15'},
    { id: 3, name: 'Predator',last_name : 'frogen', email: 'test@gmail.com', roles: ['client', 'moderator'], status: false , date : '22/12/2023 20:15'},
    { id: 4, name: 'Predator',last_name : 'blast', email: 'idk@gmail.com', roles: ['client', 'moderator'], status: false , date : '12/12/2023 20:15'},
    { id: 5, name: 'Predator',last_name : 'glasings', email: 'test@gmail.com', roles: ['client', 'moderator'], status: true , date : '2/12/2000 20:15'},
    { id: 6, name: 'Predator',last_name : 'pedro', email: 'test@gmail.com', roles: ['client', 'moderator'], status: true , date : '22/12/2023 20:15'},
    { id: 8, name: 'Predator',last_name : 'akrout', email: 'test@gmail.com', roles: ['client', 'moderator'], status: true, date : '22/12/2023 20:15' },
    { id: 7, name: 'Predator',last_name : 'blast', email: 'test@gmail.com', roles: ['client', 'moderator'], status: true, date : '22/12/2023 20:15' },
    { id: 9, name: 'Predator',last_name : 'blast', email: 'test@gmail.com', roles: ['client', 'moderator'], status: true, date : '22/12/2023 20:15' },
    { id: 10, name: 'Predator',last_name : 'blast', email: 'test@gmail.com', roles: ['client', 'moderator'], status: true , date : '22/12/2023 20:15' },
    { id: 11, name: 'Predator',last_name : 'blast', email: 'test@gmail.com', roles: ['client', 'moderator'], status: true , date : '22/12/2023 20:15' },
  ];

  const columns = [
    {
      name: <h6 className='m-0'>Name</h6>,
      selector: row => row.name,
      sortable: true,
      cell: row => (
        <div className=' d-flex align-items-center'>
          <div className='pfp-container'>
            <img className='rounded-circle pfp' src="/dashboard-colored.png" alt="User" />
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
      selector: row => row.roles.join(', '),
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
      selector: row => row.date,
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
      .some(([key, value]) => value.toString().toLowerCase().includes(filterText.toLowerCase()))
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
