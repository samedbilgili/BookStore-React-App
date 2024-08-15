import { useState, useEffect } from "react";
import axios from 'axios';
import React from 'react';
import Moment from "moment";

export default function BookList({ books, setBooks, getBooks, book, setBook, setShow }) {

    //page load
    useEffect(() => {
        getBooks();
    }, []);

    //update button
    function handleClickUpdateBook(e) {
        var bookId = e.target.getAttribute('data-id')
        console.log('book id = ' + bookId);

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch('http://localhost:5156/books/' + bookId, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result.publicationDate);
                result.publicationDate = Moment(result.publicationDate).format('YYYY-MM-DD');

                console.log(result.publicationDate);
                console.log(result);
                if (result != null) {
                    //set book      
                    setBook(result);
                    setShow(true);

                    // alert("Book removed successfully.");
                } else {
                    alert("Book could not be remove! Try Again");
                }

            });

    }

    //delete button
    function handleClickDeleteBook(e) {
        var bookId = e.target.getAttribute('data-id')
        console.log('book id = ' + bookId);

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch('http://localhost:5156/books/' + bookId, requestOptions)
            .then(response => response.json())
            .then(result => {

                if (result) {
                    //get datas      
                    getBooks();

                    // alert("Book removed successfully.");
                } else {
                    alert("Book could not be remove! Try Again");
                }

            });
    }

    return (
        <>
            <h1>Books</h1>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">ISBN</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Language</th>
                        <th scope="col">Cover Image</th>
                        <th scope="col">Page Count</th>
                        <th scope="col">PublicationDate</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {books.map(book =>
                        <tr key={book.id}>
                            <th scope="row">{book.id}</th>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.isbn}</td>
                            <td>{book.genre}</td>
                            <td>{book.language}</td>
                            <td><img src={book.coverImageUrl} /></td>
                            <td>{book.pageCount}</td>
                            <td>{book.publicationDate}</td>
                            <td>
                                <button type="button" data-id={book.id} onClick={handleClickUpdateBook} className="btn btn-info m-1">Update</button>
                                <button type="button" data-id={book.id} onClick={handleClickDeleteBook} className="btn btn-danger m-1">Delete</button>
                            </td>
                        </tr>

                    )}

                </tbody>
            </table>

            {books.length <= 0 && <div class="alert alert-danger">Book not found!</div>}
        </>
    )
}