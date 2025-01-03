import React, { useState, useEffect, useContext } from "react";
import Header from "../Components/Others/Header";
import { axiosInstance, endPoint } from "../endPoint/api";
import  Label from '../Components/Others/Label';
import Error from './Error';
import Loading from './Loading';
import { AuthContext } from "../Components/Auth/AuthContext";

const Home = (props) => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { state } = useContext(AuthContext);
    const { user, isAuthenticated } = state;

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axiosInstance.get(endPoint.BOOKS);
                console.log(response);
                setBooks(response.data.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);  
    

    if (loading) {
        return <Loading></Loading>;
    }

    if (error) {
        return <Error error={error.message}></Error>;
    }

    return (
        <div>
            <Header></Header>
            <div className="container">
                {books.map((book) => (
                    <div key={book.id}>
                        <Label name={book.name} author={book.author} pages={book.pages} status={book.status} return_date={book.return_date} holder={book.holder} cover_page={book.cover_page}/>
                        {isAuthenticated ? <button className="btn btn-dark">Reserve</button> : null}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;