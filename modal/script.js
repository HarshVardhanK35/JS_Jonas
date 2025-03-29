const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')

const closeModal = document.querySelector('.close-modal')

const showModal = document.querySelectorAll('.show-modal')

for (let i = 0; i < showModal.length; i++) {
  showModal[i].addEventListener('click', () => {
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
  })
}

const hideModal = () => {
  modal.classList.add('hidden')
  overlay.classList.add('hidden')
}
closeModal.addEventListener('click', hideModal)
overlay.addEventListener('click', hideModal)

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if(!modal.classList.contains('hidden')){
      hideModal()
    }
  }
})