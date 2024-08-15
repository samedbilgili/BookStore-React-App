import { useState } from "react";

export default function StateExample() {

    const [index, setIndex] = useState(0);

    function handleClick() {
        setIndex(index + 1);
    }

    let [bookList, setbookList] = useState([{id:"1",name:"kitap1"},{id:"2",name:"kitap2"},{id:"3",name:"kitap3"}]);

    function handleBookRemoveClick() {
        var g = bookList.pop();
        console.log(g);
        console.log(bookList);
        setbookList(bookList);
    }

    return (
        <div>
            State Değeri : {index}
            <br />
            <button onClick={handleClick}>State Değiştir (arttır)</button>

            <hr />

            {bookList.map(book =>
                <div key={book.id}>{book.name}</div>
            )}


            <button onClick={handleBookRemoveClick}>State Değiştir (arttır)</button>

        </div>
    )
}