import './style/main.css'
import './all.min.js'
import * as firebase from 'firebase/app';
import 'firebase/firebase-database'

/**
 * Scroll Bar
 */
function scrollIndicator() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector(".scroll-user").style.height = scrolled + "%";
}

window.onscroll = () => {
    scrollIndicator();
}

/** 
 * Lazy Load
*/
const lazyLoadElements = document.querySelectorAll('.lazy-load')

for (const element of lazyLoadElements) {
    if (element.complete) {
        window.setTimeout(() => {
            element.classList.add('loaded')
        }, 1000 + Math.random() * 3000)
    }
    element.onload = () => {
        element.classList.add('loaded')
    }
}

/**
 * Reveal
 */
const revealElements = document.querySelectorAll('.reveal')
const revealItems = []
const scrollY = window.scrollY

for (const _element of revealElements) {
    const item = {}
    item.revealed = false
    item.element = _element


    const bounding = _element.getBoundingClientRect()
    item.top = bounding.top + scrollY
    item.height = bounding.height

    revealItems.push(item)
}

window.addEventListener('resize', () => {
    for (const _item of revealItems) {
        const bounding = _item.element.getBoundingClientRect()
        _item.top = bounding.top + scrollY
        _item.height = bounding.height
    }
})

window.addEventListener('scroll', () => {
    const limit = window.scrollY + window.innerHeight

    for (const _item of revealItems) {
        if (!_item.revealed && limit > _item.top + _item.height + 0.5) {
            _item.revealed = true
            _item.element.classList.add('revealed')
        }
    }
})

// Reponsive Video

const iframe = document.querySelector('.iframe')

if(window.innerWidth <= 1680)
{
    iframe.style.width = '700px'
    iframe.style.height = '450px'
}

if(window.innerWidth >= 1200 && window.innerWidth < 1679.98)
{
    iframe.style.width = '400px'
    iframe.style.height = '200px'
}

if(window.innerWidth >= 992 && window.innerWidth < 1199.98)
{
    iframe.style.width = '400px'
    iframe.style.height = '200px'
}

if(window.innerWidth >= 768 && window.innerWidth < 991.98)
{
    iframe.style.width = '300px'
    iframe.style.height = '120px'
}

// Ticket refresh

var firebaseConfig = {
    apiKey: "AIzaSyBfmjCRja_dHQueNyG2tEyfkkXCx2HKns8",
    authDomain: "the-weeknd-4fe7d.firebaseapp.com",
    databaseURL: "https://the-weeknd-4fe7d.firebaseio.com",
    projectId: "the-weeknd-4fe7d",
    storageBucket: "the-weeknd-4fe7d.appspot.com",
    messagingSenderId: "638374224165",
    appId: "1:638374224165:web:70a40ab35616e585ea7acc",
    measurementId: "G-R43T3Y2HJZ"
};

firebase.initializeApp(firebaseConfig);

const tourRef = firebase.database().ref("tour/");

tourRef.on('value', function (snapshot) {
    let displayTicket = '';
    snapshot.forEach(function (item) {
        // console.log(item.val())

        displayTicket += `
    <tr>
        <td class='ticket-date'>${item.val().date}</td>
        <td class='ticket-country'>${item.val().CountryCity}</td>
        <td class='ticket-place'>${item.val().place}</td>
        <td> 
            <button class='btn-tickets'>
                <a href="">TICKETS</a>
            </button>
        </td>
    </tr>
    `
    })

    document.querySelector('.tbody-data').innerHTML=displayTicket;

})

