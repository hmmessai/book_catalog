import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";

function Error(props) {

    return (
        <div class="d-flex align-items-center justify-content-center" style={{height:'80vh'}}>
            <h2 className='row p-4'>Error Loading page</h2>
            <div className="row p-4">
                <p>{props.error}</p>    
            </div>
        </div>
    )
};

export default Error;