import { accessKey } from "./accessKey.js";

const btnDOM = document.querySelector('button');
const imagesDOM = document.querySelector('.images');
const showMoreBtnDOM = document.querySelector('.show-more');

btnDOM.addEventListener('click', () => {
    const inputDOM = document.querySelector('input');

    imagesDOM.textContent = '';

    fetch(`https://api.unsplash.com/search/photos?page=5&query=${inputDOM.value}`, {
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
            });

            showMoreBtnDOM.style.display = 'block';
        })
        .catch(err => {
            console.error(err);
            imagesDOM.textContent = 'No images found, try again.'
        });

})

showMoreBtnDOM.addEventListener('click', () => {
    fetch('')
})

imagesDOM.addEventListener('click', e => {
    if (e.target.classList.contains('picture')) {
        e.target.classList.toggle('zoom');
        document.querySelector('.overlay').classList.toggle('active');
    }
})