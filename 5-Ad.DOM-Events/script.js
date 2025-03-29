'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// selecting the button and section - for smooth scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')

// ----------------------------------------------------------------------------------------------------------------------------
// ! MODAL WINDOW

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach((ele) => {
  ele.addEventListener('click', openModal)
})

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// ----------------------------------------------------------------------------------------------------------------------------
// ! SMOOTH SCROLLING

// old way of smooth scrolling
btnScrollTo.addEventListener('click', (e) => {

  // - gets the coordinates of the element
  // const s1Coords = section1.getBoundingClientRect()

  // - scrolling - old way - 1  
  // window.scrollTo(s1Coords.left + window.scrollX, s1Coords.top + window.scrollY);

  // - scrolling smoothly - old way - 2
  // window.scrollTo({
  //   left: s1Coords.left + window.scrollX,
  //   top: s1Coords.top + window.scrollY,
  //   behavior: 'smooth'
  // })
})

// modern way of smooth scrolling
btnScrollTo.addEventListener('click', (e) => {
  section1.scrollIntoView({ behavior: 'smooth' })
})

// ----------------------------------------------------------------------------------------------------------------------------
// ! PAGE NAVIGATION

// ? AN IMPERFECT WAY 
// ---
// document.querySelectorAll('.nav__link').forEach((el) => {
//   el.addEventListener('click', function(e) {
//     e.preventDefault() // to prevent the default behavior
//     const id = this.getAttribute('href') // get the ID out of the elements .. after logging, we get #section--1, #section--2, #section--3 .. 
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' }) // scrolling to the section
//   })
// })

// ? USING EVENT DELEGATION
// ---
document.querySelector('.nav__links').addEventListener('click', function(e) {

  e.preventDefault()  // to prevent the default behavior at any event handler function

  if(e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' }) // scrolling to the section
  }
})

// ----------------------------------------------------------------------------------------------------------------------------
// ! TABBED COMPONENT

const tabs = document.querySelectorAll(".operations__tab")
const tabsContainer = document.querySelector(".operations__tab-container")
const tabsContent = document.querySelectorAll('.operations__content')

tabsContainer.addEventListener('click', function(e) {
  // get the clicked tab
  const clicked = e.target.closest('.operations__tab')
  // guard clause
  if(!clicked) {
    return
  }
  // remove the active class from all the tabs and content
  tabsContent.forEach((tc) => {
    tc.classList.remove('operations__content--active')
  })
  // remove the active class from all the tabs
  tabs.forEach((t) => {
    t.classList.remove('operations__tab--active')
  })
  // add the active class to the clicked tab
  clicked.classList.add('operations__tab--active')
  // add the active class to the content
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})