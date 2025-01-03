import React from "react";
import "bootstrap/dist/css/bootstrap.css";

export default function Header( props ) {
    return (
        <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid text-center">
                <a className="navbar-brand custom-bg">Felege Yordanos Sunday School Book Catalog</a>
                <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item ms-auto px-3">
                        <a class="nav-link active" href="/login">Login</a>
                    </li>
                    <li class="nav-item ms-auto px-3">
                        <a class="nav-link active" href="/signup">Signup</a>
                    </li>
                    <li class="nav-item ms-auto px-3">
                        <a class="nav-link active" href="#">Services</a>
                    </li>
                    <li class="nav-item ms-auto px-3">
                        <a class="nav-link active" href="#">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
        </div>
    );
}