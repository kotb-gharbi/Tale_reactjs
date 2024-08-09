import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEllipsis } from '@fortawesome/free-solid-svg-icons';

function ProfileHeader({profile_pic , id , name , last_name}) {
  return (
    <div className="card profile-card" style={{marginBottom : '17px'}}>
        <div className="card-body p-0">
            <div className=" d-flex justify-content-between align-items-center">
                <div className=' d-flex justify-content-center align-items-center'>

                    <Link to='/sidebar/gestion-des-utilisateurs' style={{textDecoration:'none'  , color:'inherit'}}>
                      <FontAwesomeIcon icon={faArrowLeft} className='GoBackArrow' />
                    </Link>

                    <img className='rounded-circle ' style={{width:'70px' , height:'70px'}} src={profile_pic} alt="pfp" />
                    <div className='ms-4'>
                      <p className='mb-0' style={{fontWeight:'600' , fontSize:'22px'}}>{name} {last_name}</p>
                      <p className='mb-0'> Modérateur | {id}</p>
                    </div>
                </div>
                <FontAwesomeIcon icon={faEllipsis} style={{cursor : 'pointer'}} />
            </div>
        </div>
      </div>
  )
}

export default ProfileHeader
