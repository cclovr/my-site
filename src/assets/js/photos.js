let pageNumberBtns = document.querySelectorAll('.page-number');
const photosContainer = document.getElementById('photos-wrapper');
const nextPageBtn = document.getElementById('next-page')
const prevPageBtn = document.getElementById('prev-page')
let photosLargeSize;
let photos;
let pages;
let photoFullScreen = document.getElementById('photo-full-screen');

getPhotos();
disablePrevBtn();

for (let i = 0; i < pageNumberBtns.length; i++) {
    pageNumberBtns[i].addEventListener('click', function(e) {
        Array.from(pageNumberBtns).find(el => el.textContent ===e.currentTarget.textContent).classList.add('active')
        let current = document.getElementsByClassName('active');
        current[0].className = current[0].className.replace(' active', '');
        this.className += ' active';
        photosContainer.innerHTML = '';
        getPhotos(e.currentTarget.textContent)
    });
}

function getPhotos(pageNumber) {
    const apiKey = '68b3e55dc78ba3190b94cd0925a4052d';
    const data = {
        method: 'flickr.people.getPublicPhotos',
        api_key: apiKey,
        user_id: '196725735@N08',
        photoset_id: '72177720302652005',
        format: 'json',
        nojsoncallback: 1,
        extras: 'url_c',
        per_page: 9,
        page: pageNumber || 1
    };
    const dataFullSizeImages = {...data, extras: 'url_k'};
    const parametersSmallImages = new URLSearchParams(data);
    const parametersFullSizeImages = new URLSearchParams(dataFullSizeImages);


    fetch(createUrl(parametersSmallImages))
        .then(response => response.json())
        .then(res => {
            pages = res.photos.pages;
            Array.from(pageNumberBtns).find(el => el.textContent === data.page.toString()).classList.add('active')
            const photos = res.photos.photo.map(item => {
                const photo = document.createElement('img');
                const photoWrapper = document.createElement('div');
                photo.src = item.url_c;
                photoWrapper.setAttribute('id', item.id)
                photoWrapper.classList.add('photo-wrapper')
                photoWrapper.appendChild(photo)
                return photoWrapper
            })
            for (var i = 0; i < photos.length; ++i) {
                photosContainer.appendChild(photos[i]);
            }
            addEventOnPhoto();
    }).then(() => {
        fetch(createUrl(parametersFullSizeImages))
            .then(response => response.json())
            .then(res => {
                photosLargeSize = res.photos.photo;
            });
    });
}

function createUrl(param) {
    return `https://api.flickr.com/services/rest/?${param}`;
}

function addEventOnPhoto() {
    photos = document.querySelectorAll('.photo-wrapper');
    photos.forEach(photo => {
        photo.addEventListener('click', function (e) {
            showPhotoFullSize(e.currentTarget.id);
        })
    })
}

function showPhotoFullSize(photoId) {
    photoFullScreen.classList.add('show-photo');
    const photoFullSize = document.getElementById('photo-full-size');
    photoFullSize.src = photosLargeSize.find(el => el.id === photoId).url_k;
}

photoFullScreen.addEventListener('click', function (e) {
    if (e.target === this) {
        photoFullScreen.classList.remove('show-photo')
    }
})

nextPageBtn.addEventListener('click', function () {
    pageNumberBtns.forEach(page => {
        page.textContent = Number(page.textContent) + 1;
    })
    Array.from(pageNumberBtns).forEach((el) => el.classList.remove('active'));
    disableNextBtn()
})

prevPageBtn.addEventListener('click', function () {
    pageNumberBtns.forEach(page => {
        page.textContent = Number(page.textContent) - 1;
    })
    Array.from(pageNumberBtns).forEach((el) => el.classList.remove('active'));
    disablePrevBtn()
    nextPageBtn.disabled = !!Array.from(pageNumberBtns).find(el => el.textContent === pages.toString());
})

function disablePrevBtn() {
    prevPageBtn.disabled = !!Array.from(pageNumberBtns).find(el => el.textContent === '1');
}

function disableNextBtn() {
    if (Array.from(pageNumberBtns).find(el => el.textContent === pages.toString())) {
        nextPageBtn.disabled = true;
    } else {
        prevPageBtn.disabled = false;
    }
}
