const btnDOM = document.querySelector('.search');
const imagesDOM = document.querySelector('.images');
const showMoreBtnDOM = document.querySelector('.show-more');
const inputDOM = document.querySelector('input');
let page = 0;

function renderImages() {
    fetch(`https://api.unsplash.com/search/photos?page=${page}&per_page=6&query=${inputDOM.value}`, {
        headers: {
            Authorization: `Client-ID gnJGv01qFiy98MoKeGWvxJfIHd_vcCZhl6Xk9g6pkxA`
        }
    })
        .then(res => res.json())
        .then(data => {

            data.results.forEach(url => {
                imagesDOM.insertAdjacentHTML('beforeend', `
                        <div class="image">
                             <img class="picture" src="${url.urls.regular}" alt="picture" />
                             <span class="desc">${url.alt_description || 'no description'}</span>
                        </div>`);
            });

            showMoreBtnDOM.style.display = 'block';
        })
        .catch(err => {
            console.error(err);
            imagesDOM.textContent = 'No images found, try again.';
        });
}

btnDOM.addEventListener('click', () => {
    imagesDOM.innerHTML = '';
    showMoreBtnDOM.style.display = 'none';
    page = 1;
    renderImages();
});

showMoreBtnDOM.addEventListener('click', () => {
    page++;
    renderImages();
})

imagesDOM.addEventListener('click', e => {
    if (e.target.classList.contains('picture')) {
        e.target.classList.toggle('zoom');
        document.querySelector('.overlay').classList.toggle('active');
    }
});
