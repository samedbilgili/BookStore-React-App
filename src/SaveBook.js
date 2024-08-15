import { useState } from "react";
import React from 'react';
import axios from 'axios';

export default function SaveBook({ book, setBook, setShow, getBooks }) {

    const [image, setImage] = useState({
        preview: '',
        raw: '',
    });

    const genreList = ['Science Fiction', 'Dystopian', 'Action & Adventure', 'Mystery', 'Horror', 'Thriller & Suspense', 'Historical Fiction', 'Other'];

    function handleChange(e) {
        const { name, value } = e.target;
        setBook((book) => ({ ...book, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        let isUpdate = book.id == 0 ? false : true;

        const requestOptions = {
            method: isUpdate ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json', enctype: "multipart/form-data" },
            body: JSON.stringify(book)
        };

        fetch('http://localhost:5156/books', requestOptions)
            .then(response => response.json())
            .then(result => {

                if (result) {

                    if (image.raw == '') {
                        //save modal set show            
                        setShow(false);
                        getBooks();
                    } else {
                        saveImage(result);
                    }

                    // alert("Book added successfully.");
                } else {
                    alert("Book could not be added! Try Again");
                }

            });

        // >> Examine << Axios example
        // const headers = {
        //     'Content-Type': 'application/json',
        // };
        // axios.post('http://localhost:5156/books', book, { headers })
        //     .then(response => console.log(response));
    }

    const handleImageChange = (e) => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0],
            });
        }
    };

    function saveImage(bookId) {
        var _image = image.raw;

        var formData = new FormData();
        formData.append("image", _image);

        console.log(image);
        console.log({ image: image.raw, bookId: bookId });
        console.log(JSON.stringify({ image: image.raw, bookId: bookId }));

        // const requestOptions = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //         'Accept': 'multipart/form-data'
        //     },
        //     body: formData
        // };

        // fetch('http://localhost:5156/bookimage?bookId=' + bookId, requestOptions)
        //     .then(response => response.json())
        //     .then(result => {
        //         console.log(result);

        //         if (result) {
        //             //save modal set show            
        //             setShow(false);
        //             getBooks();

        //             // alert("Book added successfully.");
        //         } else {
        //             alert("Book could not be added! Try Again");
        //         }

        //     });

        const headers = {
            'Content-Type': 'multipart/form-data',
            'Accept': 'multipart/form-data'
        };
        axios.post('http://localhost:5156/bookimage?bookId=' + bookId, formData, { headers })
            .then(result => {

                if (result) {
                    //save modal set show            
                    setShow(false);
                    getBooks();

                    // alert("Book added successfully.");
                } else {
                    alert("Book could not be added! Try Again");
                }

            });
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="txtTitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="txtTitle" name="title" placeholder="Title" value={book.title} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="txtAuthor" className="form-label">Author</label>
                    <input type="text" className="form-control" id="txtAuthor" name="author" placeholder="Author" value={book.author} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="txtISBN" className="form-label">ISBN</label>
                    <input type="text" className="form-control" id="txtISBN" name="isbn" placeholder="ISBN" value={book.isbn} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="txtGenre" className="form-label">Genre</label>
                    <select className="form-control" id="txtGenre" name="genre" value={book.genre} onChange={handleChange}>
                        <option>- Select Genre -</option>
                        {genreList.map(genre => <option value={genre} key={genre}>{genre}</option>)}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="txtDescription" className="form-label">Description</label>
                    <textarea className="form-control" id="txtDescription" name="description" placeholder="Description" rows="3" value={book.description} onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="Publisher" className="form-label">Publisher</label>
                    <input type="text" className="form-control" id="Publisher" name="publisher" placeholder="Publisher" value={book.publisher} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="PublicationDate" className="form-label">Publication Date</label>
                    <input type="date" className="form-control" id="PublicationDate" name="publicationDate" value={book.publicationDate} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Language" className="form-label">Language</label>
                    <select className="form-control" id="txtGenre" name="language" value={book.language} onChange={handleChange}>
                        <option value="">- Select Language -</option>
                        <option value="Turkish">Turkish</option>
                        <option value="English">English</option>
                        <option value="German">German</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="PageCount" className="form-label">Page Count</label>
                    <input type="number" className="form-control" id="PageCount" name="pageCount" placeholder="Page Count" value={book.pageCount} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="CoverImageUrl" className="form-label">Cover Image</label>
                    <br />
                    <label htmlFor="upload-button">
                        {image.preview ? (
                            <img
                                src={image.preview}
                                alt="image not found"
                                width="300"
                                height="300"
                                className=""
                            />
                        ) : (
                            <>
                                <p className="text-white text-1xl text-left w-full text-left">
                                    Upload Image
                                </p>
                                <div />
                            </>
                        )}
                    </label>
                    <input type="file" className="form-control" id="CoverImageUrl" name="coverImageUrl" onChange={handleImageChange} />




                </div>
                {/* <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                </div> */}
                <div className="mb-3">
                    <button type="submit" className="btn btn-success mb-3">Save</button>
                </div>
            </form>
        </>
    )
}