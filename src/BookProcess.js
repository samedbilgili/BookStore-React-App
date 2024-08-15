import { useState, useEffect } from "react";
import BookList from './BookList';
import SaveModal from './SaveModal';
import Moment from "moment";

export default function () {

    const [books, setBooks] = useState([]);
    const [show, setShow] = useState(false);

    const [book, setBook] = useState({
        id: 0,
        title: "Kuyucaklı Yusuf",
        author: "author",
        isbn: "ISBN_1908423",
        genre: "Horror",
        description: "Description",
        publisher: "Publisher",
        publicationDate: "2024-08-10",
        language: "Turkish",
        pageCount: 256,
        coverImageUrl: ""
    });

    function setEmptyBook() {
        setBook({
            id: 0,
            title: "",
            author: "",
            isbn: "",
            genre: "",
            description: "",
            publisher: "",
            publicationDate: "2024-08-10",
            language: "",
            pageCount: 0,
            coverImageUrl: ""
        });
    }

    function getBooks() {
        fetch('http://localhost:5156/books')
            .then(response => response.json())
            .then(data => {

                data.map(function (datas) {
                    console.log(datas.publicationDate);
                    datas.publicationDate = Moment(datas.publicationDate).format('YYYY-MM-DD');
                    console.log(datas.publicationDate);
                    return datas;
                });

                setBooks(data);
                console.log(data);


            });


        // Examine << fetch example             
        // const requestOptions = {
        //     method: 'GET',
        //     headers: { 'Content-Type': 'application/json' },
        //     // body: JSON.stringify(book)
        // };
        // fetch('http://localhost:5156/books', requestOptions)
        //     .then(response => response.json())
        //     .then(data => { setBooks(data); });
    }

    return (
        <>
            <SaveModal show={show} setShow={setShow} getBooks={getBooks} book={book} setBook={setBook} setEmptyBook={setEmptyBook}></SaveModal>
            <BookList books={books} setBooks={setBooks} getBooks={getBooks} book={book} setBook={setBook} setShow={setShow}></BookList>
        </>
    )
}