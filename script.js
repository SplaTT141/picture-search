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
            document.querySelector('body').style.cssText = 'z-index: 100; background-color: #4a4949a2;'
        }
    })
})
