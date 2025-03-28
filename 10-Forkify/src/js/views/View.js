//! with parcel we can import all kinds of asset files and this includes images as well 
// import icons from '../img/icons.svg' // this is used to work in parcel version:1
import icons from 'url:../../img/icons.svg' // parcel@2 where this imports static assets

class View {
    _data
    
    render(data) {
        if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError() 

        this._data = data
        const markup = this._generateMarkup()
        
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    } 
    
    _clear() {
        this._parentElement.innerHTML = ''
    }

    //! render spinner
    renderSpinner() {
        const markup = `
        <div class="spinner">
            <svg>
            <use href="${icons}#icon-loader"></use>
            </svg>
        </div>
        `
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }
    renderError(message = this._errorMessage) {
        const markup = `
        <div class="error">
        <div>
            <svg>
            <use href="${icons}#icon-alert-triangle"></use>
            </svg>
        </div>
        <p>${message}</p>
        </div>
        `
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }
    renderSuccessMessage(message = this._successMessage) {
        const markup = `
        <div class="message">
        <div>
            <svg>
            <use href="${icons}#icon-smile"></use>
            </svg>
        </div>
        <p>${message}</p>
        </div>
        `
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

}
export default View;