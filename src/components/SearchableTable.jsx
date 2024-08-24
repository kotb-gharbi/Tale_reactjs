import React, { useState  } from 'react';
import './SearchableTable.css';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft, faAnglesRight, faAnglesLeft, faEllipsis } from '@fortawesome/free-solid-svg-icons';

function SearchableTable({columns , data , customstyles}) {

    const [filterText, setFilterText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); 

    const filteredData = data.filter(item =>
        Object.entries(item)
          .filter(([key]) => key !== 'id' && key !== 'status')
          .some(([key, value]) => {
            if (key === 'roles') {
              return value.some(role => role.name.toLowerCase().includes(filterText.toLowerCase()));
            }
            return value && value.toString().toLowerCase().includes(filterText.toLowerCase());
          })
      );

    //pagination
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, filteredData.length);

  return (
    <>
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
    </>
  )
}

export default SearchableTable
