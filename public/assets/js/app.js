gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

ScrollTrigger.defaults({
    toggleActions: "restart pause resume pause",
    scroller: ".main"
});

ScrollTrigger.create({
    trigger: ".section-menu",
    start: 'top 20%',
    end: 'bottom top',
    toggleClass: "active-menu",
});


let pageNumberBtns = document.querySelectorAll('.page-number');
let pages;
const photosContainer = document.getElementById('photos-container');
const nextPageBtn = document.getElementById('next-page')
const prevPageBtn = document.getElementById('prev-page')

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

    const parameters = new URLSearchParams(data);

    const url = `https://api.flickr.com/services/rest/?${parameters}`;

    fetch(url).then(response => {
        return response.json();
    }).then(res => {
        pages = res.photos.pages;
        Array.from(pageNumberBtns).find(el => el.textContent === data.page.toString()).classList.add('active')
        const photos = res.photos.photo.map(item => {
            const photo = document.createElement('img');
            const photoWrapper = document.createElement('div');
            photo.src = item.url_c;
            photoWrapper.classList.add('photo-wrapper')
            photoWrapper.appendChild(photo)
            return photoWrapper
        })
        for (var i = 0; i < photos.length; ++i) {
            photosContainer.appendChild(photos[i]);
        }
    });
}

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

//# sourceMappingURL=app.js.map
