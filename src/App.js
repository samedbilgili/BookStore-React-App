// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import css from './custom.css';
import Navbar from './Navbar';
import Jumbotron from './Jumbotron';
import { Button, Card } from 'react-bootstrap';
import Clock from './Clock.js';
import { getImageUrl } from './utils.js';
import { people } from './data.js';
import StateExample from './StateExample.js';
import BookProcess from './BookProcess.js';

function GetList() {

  // let appTags = ['Book', 'Store', 'React', 'Minimal API', 'Asp.net Core'];
  // let tagItems = appTags.map(tag => <li>{tag}</li>);
  // return tagItems;

  let filterItems = people.filter(people => people.profession = 'chemist');
  let items = filterItems.map(person =>
    <li key={person.id}>
      <img src={getImageUrl(person)} />
      <p>
        <b>{person.name}</b>
        {person.profession}
        know of {' ' + person.accomplishment + ' '}
      </p>
    </li>
  )

  return items;

}

function App() {

  //master 
  let appName = "Book Store";

  let junbotronStrings = {
    junbotronHeadTitle: 'Welcome to Book Store!',
    junbotronDescription: "It uses utility classes for typography and spacing to space content out within the larger container."
  };

  function handleClick() {
    alert("Butona basıldı");
  }



  return (
    <>
      <Navbar appName={appName} />

      <div className='container' style={{ paddingTop: '30px' }}>

        {/* <StateExample />
        <StateExample /> */}

        {/* <Jumbotron junbotronStrings={junbotronStrings} /> */}

        {/* 
        <div onClick={(e) => { alert("dive tıklandı;"); }}>
          div tıkla e.stopPropagation(); ÖRNEĞİ
          <button onClick={(e) => { alert("OK Functionc"); e.stopPropagation(); }}>TIKLA
          </button>
        </div> */}

        <BookProcess />
        {/* <ul>
          {GetList()}
        </ul> */}



      </div>
    </>
  );
}

export default App;
