import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";

function Label(props) {

    return (
        <div className='card mx-auto m-4'>
            <div className='row'>
                <div className='col-5'>
                    <div className='card w-22 m-2 text-center d-flex justify-content-center align-items-center'>
                        <img src={props.cover_page} className="img-fluid" alt="Picture goes here" style={{ width: '300px', height: '200px' }}/>
                        <h5 className='card-title'>Name of Book {props.name}</h5>
                    </div>
                </div>
                <span className='col-1'></span>
                <div className='col-6 col-xs-12 d-flex align-items-center'>
                    <div className='card-body'>
                        <p className='card-text'><b>Author</b> {props.author}</p>
                        <p className='card-text'><b>Pages</b> {props.pages}</p>
                        <p className='card-text'><b>Status</b> {props.status ? "Not Available": "Available"}</p>
                        <p className='card-text'><b>Return Date</b> {props.return_date}</p>
                        <p className='card-text'><b>Holder</b> {props.holder}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Label;