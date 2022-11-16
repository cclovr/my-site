let linkLocation;
const targets = document.querySelectorAll('.menu-item');
const overlay = document.querySelector('.overlay');

targets.forEach(function(elem) {
    elem.addEventListener('click', function(event) {
        linkLocation = this.href;
        setTimeout(function(){ window.location.href = linkLocation;}, 1000);

    });
});
