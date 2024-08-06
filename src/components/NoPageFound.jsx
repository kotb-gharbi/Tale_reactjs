import React from 'react'
import { Link } from 'react-router-dom'
import './NoPageFound.css'

function NoPageFound() {
  return (
    <>
        <div class="d-flex align-items-center justify-content-center color">
            <div class="text-center">
                <h1 class="display-1 fw-bold">404</h1>
                <p class="fs-3"> <span class="text-danger">Oops!</span> Page not found.</p>
                <p class="lead">
                    The page you're looking for doesn't exist.
                </p>
                <Link to="/" class="btn not-found-button">Go Home</Link>
            </div>
        </div>
    </>
  )
}

export default NoPageFound
