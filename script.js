import { accessKey } from "./accessKey.js";

const btnDOM = document.querySelector('button');
const imagesDOM = document.querySelector('.images');
const showMoreBtnDOM = document.querySelector('.show-more');
const inputDOM = document.querySelector('input');
let page = 1;


function renderImages() {

    // imagesDOM.innerHTML = '';
    showMoreBtnDOM.style.display = 'none';

    fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${inputDOM.value}`, {
        headers: {
            Authorization: `Client-ID ${accessKey}`
        }
    })
        .then(res => res.json())
        .then(data => {
            data.results.forEach(url => {
                imagesDOM.insertAdjacentHTML('beforeend', `
                    <div class="image">
                         <img class="picture" src="${url.urls.regular}" alt="picture" />
                         <span class="desc">${url.alt_description}</span>
                    </div>`);
            });

            showMoreBtnDOM.style.display = 'block';
        })
        .catch(err => {
            console.error(err);
            imagesDOM.textContent = 'No images found, try again.';
        });
}

btnDOM.addEventListener('click', renderImages);
showMoreBtnDOM.addEventListener('click', () => {
    page++
    renderImages();
})


// showMoreBtnDOM.addEventListener('click', () => {
//     page++;
//     fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${inputDOM.value}`, {
//         headers: {
//             Authorization: `Client-ID ${accessKey}`
//         }
//     })
//         .then(res => res.json())
//         .then(data => {
//             data.results.forEach(url => {
//                 imagesDOM.innerHTML += `
//                             <div class="image">
//                                 <img class="picture" src="${url.urls.regular}" alt="picture" />
//                                 <span class="desc">${url.alt_description || 'no description'}</span>
//                             </div>`;
//             });
//         })
//         .catch(err => {
//             console.error(err);
//             imagesDOM.textContent = 'No images found, try again.';
//         });
// });

imagesDOM.addEventListener('click', e => {
    if (e.target.classList.contains('picture')) {
        e.target.classList.toggle('zoom');
        document.querySelector('.overlay').classList.toggle('active');
    }
});

// 1. Dubliuojamas fetch kodas

// Dabartinė „paieška“ ir „rodyti daugiau“ turi beveik identišką fetch logiką.

// Sprendimas: sukurti funkciją fetchImages(query, page, append) ir ją naudoti abiem atvejais.

// 2. innerHTML += daug kartų

// Kiekviena nuotrauka pridedama atskirai, todėl DOM atnaujinimas gali sulėtėti.

// Sprendimas: naudoti DocumentFragment arba vieną innerHTML atnaujinimą po visų nuotraukų ciklo.

// 3. Event listener’iai gali dubliuotis

// Pvz., jei būtų ankstesnė versija, showMoreBtnDOM.addEventListener kartojasi.

// Sprendimas: registruoti event listener’ius tik vieną kartą.

// 4. page negrąžinamas naujai paieškai

// Dabartinė sistema negrąžina page = 1 naujai paieškai, todėl „show more“ gali rodyti neteisingas nuotraukas.

// Sprendimas: page = 1 kiekvieną kartą paspaudus „Search“ mygtuką.

// 5. Tuščio input’o apsauga

// Jei vartotojas nieko neįveda, daroma užklausa su tuščiu query.

// Sprendimas: patikrinti inputDOM.value prieš fetch.

// 6. alt_description gali būti null

// Kai kurios nuotraukos neturi aprašymo, todėl dabar rodoma null.

// Sprendimas: naudoti fallback, pvz., ${url.alt_description || 'No description'}.

// 7. Overlay elemento tikrinimas

// Dabartinė logika daro document.querySelector('.overlay').classList.toggle('active') bet overlay gali neegzistuoti.

// Sprendimas: patikrinti, ar elementas egzistuoja.

// 8. Kodo švarinimas ir funkcijų išskyrimas

// Dabartinė struktūra gana „viename dideliame bloke“.

// Sprendimas: išskirti funkcijas: fetchImages, renderImages, toggleZoom, kad kodas būtų tvarkingesnis.

// 9. Error handling

// Dabartinis catch tik rašo tekstą į imagesDOM.

// Sprendimas: parodyti vartotojui aiškesnę informaciją arba retry galimybę.