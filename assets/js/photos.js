const apiKey = '68b3e55dc78ba3190b94cd0925a4052d';
const data = {
    method: 'flickr.people.getPublicPhotos',
    api_key: apiKey,
    user_id: '196725735@N08',
    photoset_id: '72177720302652005',
    format: 'json',
    nojsoncallback: 1,
    extras: 'url_z',
};

const parameters = new URLSearchParams(data);

const url = `https://api.flickr.com/services/rest/?${parameters}`;

// Get all photos
fetch(url).then(response => {
    return response.json();
}).then(res => {
    const photosContainer = document.getElementById('photos-container')
    const photos = res.photos.photo.map(item => {
        const photo = document.createElement('img');
        const photoWrapper = document.createElement('div');
        photo.src = item.url_z;
        photoWrapper.classList.add('photo-wrapper')
        photoWrapper.appendChild(photo)
        return photoWrapper
    })
    for (var i = 0; i < photos.length; ++i) {
        photosContainer.appendChild(photos[i]);
    }
});

// Next page
fetch(url).then(response => {
    return response.json();
}).then(res => {
    const photosContainer = document.getElementById('photos-container')
    const photos = res.photos.photo.map(item => {
        const photo = document.createElement('img');
        const photoWrapper = document.createElement('div');
        photo.src = item.url_z;
        photoWrapper.classList.add('photo-wrapper')
        photoWrapper.appendChild(photo)
        return photoWrapper
    })
    for (var i = 0; i < photos.length; ++i) {
        photosContainer.appendChild(photos[i]);
    }
});
