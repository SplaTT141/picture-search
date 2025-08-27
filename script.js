import { accessKey } from "./accessKey.js";

const btnDOM = document.querySelector('button');

btnDOM.addEventListener('click', () => {
    const inputDOM = document.querySelector('input');
    const imagesDOM = document.querySelector('.images');

    imagesDOM.textContent = '';

    fetch(`https://api.unsplash.com/search/photos/?query=${inputDOM.value}`, {
        headers: {
            Authorization: `Client-ID ${accessKey}`
        }
    })
        .then(res => res.json())
        .then(data => {

            data.results.map(url => {
                imagesDOM.innerHTML += `
                <div class="image">
                    <img class="picture" src="${url.urls.regular}" alt="picture" />
                    <span class="desc">${url.alt_description}</span>
                </div>`;
                console.log(data);
            });

        })
        .catch(err => {
            console.error(err);
            imagesDOM.textContent = 'No images found, try again.'
        });

    imagesDOM.addEventListener('click', e => {
        if (e.target.classList.contains('picture')) {
            e.target.classList.toggle('zoom');
        }
    })
})

//sukurti elementa, kuris per viduri ekrano isvestu originaliso ismeros img ant kurio paspaude
//uz nuotraukos ribu turi buti permatomas juodas fonas
//prideti load more mygtuka ant kurio paspaudus atsirastu dar 10 nuotrauku 