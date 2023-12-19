// let pageNumberBtns = document.querySelectorAll('.page-number');
// const photosContainer = document.getElementById('photos-wrapper');
// const nextPageBtn = document.getElementById('next-page')
// const prevPageBtn = document.getElementById('prev-page')
// let photosLargeSize;
// let photos;
// let pages;
// let containerFullScreen = document.getElementById('photo-full-screen');
//
// getPhotos();
// disablePrevBtn();
//
// for (let i = 0; i < pageNumberBtns.length; i++) {
//     pageNumberBtns[i].addEventListener('click', function(e) {
//         Array.from(pageNumberBtns).find(el => el.textContent ===e.currentTarget.textContent).classList.add('active')
//         let current = document.getElementsByClassName('active');
//         current[0].className = current[0].className.replace(' active', '');
//         this.className += ' active';
//         photosContainer.innerHTML = '';
//         getPhotos(e.currentTarget.textContent)
//     });
// }
//
// function getPhotos(pageNumber) {
//     const apiKey = '68b3e55dc78ba3190b94cd0925a4052d';
//     const data = {
//         method: 'flickr.people.getPublicPhotos',
//         api_key: apiKey,
//         user_id: '196725735@N08',
//         photoset_id: '72177720302652005',
//         format: 'json',
//         nojsoncallback: 1,
//         extras: 'url_c',
//         per_page: 9,
//         page: pageNumber || 1
//     };
//     const dataFullSizeImages = {...data, extras: 'url_k'};
//     const parametersSmallImages = new URLSearchParams(data);
//     const parametersFullSizeImages = new URLSearchParams(dataFullSizeImages);
//
//
//     fetch(createUrl(parametersSmallImages))
//         .then(response => response.json())
//         .then(res => {
//             pages = res.photos.pages;
//             Array.from(pageNumberBtns).find(el => el.textContent === data.page.toString()).classList.add('active')
//             const photos = res.photos.photo.map(item => {
//                 const photo = document.createElement('img');
//                 const photoWrapper = document.createElement('div');
//                 photo.src = item.url_c;
//                 photoWrapper.setAttribute('id', item.id)
//                 photoWrapper.classList.add('photo-wrapper')
//                 photoWrapper.appendChild(photo)
//                 return photoWrapper
//             })
//             for (var i = 0; i < photos.length; ++i) {
//                 photosContainer.appendChild(photos[i]);
//             }
//             addEventOnPhoto();
//     }).then(() => {
//         fetch(createUrl(parametersFullSizeImages))
//             .then(response => response.json())
//             .then(res => {
//                 photosLargeSize = res.photos.photo;
//             });
//     });
// }
//
// function createUrl(param) {
//     return `https://api.flickr.com/services/rest/?${param}`;
// }
//
// function addEventOnPhoto() {
//     photos = document.querySelectorAll('.photo-wrapper');
//     photos.forEach(photo => {
//         photo.addEventListener('click', function (e) {
//             showPhotoFullSize(e.currentTarget.id);
//         })
//     })
// }
//
// function showPhotoFullSize(photoId) {
//     containerFullScreen.classList.add('show-photo');
//     const photoFullSize = document.getElementById('photo-full-size');
//     photoFullSize.src = photosLargeSize.find(el => el.id === photoId).url_k;
// }
//
// containerFullScreen.addEventListener('click', function (e) {
//     if (e.target === this) {
//         containerFullScreen.classList.remove('show-photo')
//     }
// })
//
// nextPageBtn.addEventListener('click', function () {
//     pageNumberBtns.forEach(page => {
//         page.textContent = Number(page.textContent) + 1;
//     })
//     Array.from(pageNumberBtns).forEach((el) => el.classList.remove('active'));
//     disableNextBtn()
// })
//
// prevPageBtn.addEventListener('click', function () {
//     pageNumberBtns.forEach(page => {
//         page.textContent = Number(page.textContent) - 1;
//     })
//     Array.from(pageNumberBtns).forEach((el) => el.classList.remove('active'));
//     disablePrevBtn()
//     nextPageBtn.disabled = !!Array.from(pageNumberBtns).find(el => el.textContent === pages.toString());
// })
//
// function disablePrevBtn() {
//     prevPageBtn.disabled = !!Array.from(pageNumberBtns).find(el => el.textContent === '1');
// }
//
// function disableNextBtn() {
//     if (Array.from(pageNumberBtns).find(el => el.textContent === pages.toString())) {
//         nextPageBtn.disabled = true;
//     } else {
//         prevPageBtn.disabled = false;
//     }
// }
class Pagination {
    constructor() {
        this.paginationLimit = 9;
        this.pageCount = 0;
        this.currentPage = 1;
    }

    disableButton(button) {
        button.classList.add("disabled");
        button.setAttribute("disabled", true);
    };

    enableButton (button) {
        button.classList.remove("disabled");
        button.removeAttribute("disabled");
    };
    handlePageButtonsStatus () {
        if (currentPage === 1) {
            disableButton(prevButton);
        } else {
            enableButton(prevButton);
        }

        if (pageCount === currentPage) {
            disableButton(nextButton);
        } else {
            enableButton(nextButton);
        }
    };

    handleActivePageNumber () {
        document.querySelectorAll(".pagination-number").forEach((button) => {
            button.classList.remove("active");
            const pageIndex = Number(button.getAttribute("page-index"));
            if (pageIndex == currentPage) {
                button.classList.add("active");
            }
        });
    };

    appendPageNumber (index) {
        const pageNumber = document.createElement("button");
        pageNumber.className = "pagination-number";
        pageNumber.innerHTML = index;
        pageNumber.setAttribute("page-index", index);
        pageNumber.setAttribute("aria-label", "Page " + index);

        paginationNumbers.appendChild(pageNumber);
    };

    getPaginationNumbers () {
        for (let i = 1; i <= pageCount; i++) {
            appendPageNumber(i);
        }
    };

    setCurrentPage(pageNum) {
        currentPage = pageNum;

        handleActivePageNumber();
        handlePageButtonsStatus();

        const prevRange = (pageNum - 1) * paginationLimit;
        const currRange = pageNum * paginationLimit;

        listItems.forEach((item, index) => {
            item.classList.add("hidden");
            if (index >= prevRange && index < currRange) {
                item.classList.remove("hidden");
            }
        });
    };
}
class FullScreen {
    constructor() {
    }
    openInFullScreen() {
        document.getElementById('container-full-screen').classList.add('show-photo')
        const photoFullSize = document.getElementById('photo-full-size');
        photoFullSize.src = photos.photosLarge.find(el => el.id === event.currentTarget.id).url_k;
    }

    closeFullScreen(event) {
        event.currentTarget.classList.remove('show-photo')
    }
}

class Photo {
    constructor(url_c, id) {
        this.url_c = url_c;
        this.id = id;
    }

    get photoHtml() {
        const img = document.createElement('img');
        const photoWrapper = document.createElement('div');
        photoWrapper.setAttribute('id', this.id)
        photoWrapper.classList.add('photo-wrapper');
        img.src = this.url_c;
        photoWrapper.appendChild(img)
        return photoWrapper;
    }
}

class PhotosSection {
    constructor(photos) {
        this.photos = photos;
        this.url = 'https://api.flickr.com/services/rest/?';
        this.photosLarge = [];
    }

    get getPhotosParamsRequest() {
        return {
            method: 'flickr.people.getPublicPhotos',
            api_key: config.api_key,
            user_id: config.user_id,
            photoset_id: config.api_key,
            format: 'json',
            nojsoncallback: 1,
            extras: 'url_c',
            per_page: 9,
            page: 1
        }
    }

    getAllPhotosRequest () {
        return fetch(this.url + new URLSearchParams(this.getPhotosParamsRequest))
            .then(response => response.json())
            .then(res => res);
    }

    getAllPhotosLargeRequest () {
        return fetch(this.url + new URLSearchParams({...this.getPhotosParamsRequest, extras: 'url_k'}))
            .then(response => response.json())
            .then(res => res.photos.photo);
    }

    async allPhotos() {
        const photosResponse = await this.getAllPhotosRequest();
        this.photosLarge = await this.getAllPhotosLargeRequest();
        photosResponse.photos.photo.forEach(item => {
            let photoObject = new Photo(item.url_c, item.id);
            this.photos.push(photoObject)
        });
        this.photos.forEach(photo => {
            document.getElementById('photos-wrapper').appendChild(photo.photoHtml)
        })
    }
}

const photos = new PhotosSection([]);
const fullScreen = new FullScreen();
const pagination = new Pagination();


const containerFullScreen = document.getElementById("container-full-screen");
const paginationNumbers = document.getElementById("pagination-numbers");
// const paginatedList = document.getElementById("paginated-list");
// const listItems = paginatedList.querySelectorAll("li");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");



photos.allPhotos().then(() => {
    const photosNodes = document.querySelectorAll('.photo-wrapper');
    photosNodes.forEach(el => el.addEventListener('click', event => {
        const srcUrlFullScreen = photos.photosLarge.find(el => el.id === event.currentTarget.id).url_k;
        fullScreen.openInFullScreen(srcUrlFullScreen);
    }));
});

containerFullScreen.addEventListener('click', event => {
    fullScreen.closeFullScreen(event);
})

pagination.getPaginationNumbers();
pagination.setCurrentPage(1);

prevButton.addEventListener("click", () => {
    pagination.setCurrentPage(currentPage - 1);
});

nextButton.addEventListener("click", () => {
    pagination.setCurrentPage(currentPage + 1);
});

document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));

    if (pageIndex) {
        button.addEventListener("click", () => {
            setCurrentPage(pageIndex);
        });
    }
});
