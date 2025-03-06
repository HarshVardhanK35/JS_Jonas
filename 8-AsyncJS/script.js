// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

// CHANGED URL:
// https://countries-api-836d.onrender.com/countries/

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//! Render Data in HTML
const renderData = function(data, className = ''){
    const html = 
    `
    <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
    </article>
    `
    countriesContainer.insertAdjacentHTML('beforeend', html)
    countriesContainer.style.opacity = 1
}

//! AJAX call
const getCountryAndNeighbor = function (country) {

    //! AJAX call (1)
    const request = new XMLHttpRequest()
    request.open('GET', `https://restcountries.com/v2/name/${country}`)
    
    request.send()
    
    request.addEventListener('load', function() {
        // console.log(this.responseText)
    
        //! parsing the DATA 
        const [data] = JSON.parse(this.responseText)  // "this" === request object
        console.log(data)

        //! render the data
        renderData(data)
        
        //! Check for Neighbours
        const neighbor = data.borders?.[0]
        // console.log(neighbor)
        
        //! AJAX Call (2)
        const request2 = new XMLHttpRequest()
        request2.open('GET', `https://restcountries.com/v2/alpha/${neighbor}`) 

        request2.send()

        request2.addEventListener('load', function() {
            const data = JSON.parse(this.responseText)
            renderData(data, 'neighbour')
        })
    })
}
// getCountryAndNeighbor('portugal')

//! AJAX Call
const request = new XMLHttpRequest()
request.open('GET', `https://restcountries.com/v2/name/${country}`)
request.send()

//! Fetch API Call
const req = fetch('https://restcountries.com/v2/name/portugal')

console.log(req) // it returns a pending state promise when we logged the data here 