apiurl = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=68b3e55dc78ba3190b94cd0925a4052d&per_page=10&format=json&nojsoncallback=1";
const fetchPromise = fetch(apiurl).then(response => {
    return response.json();
}).then(people => {
    console.log(people);
});
