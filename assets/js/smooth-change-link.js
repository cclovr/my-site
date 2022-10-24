let linkLocation;
const targets = document.querySelectorAll('.menu-item');
const overlay = document.querySelector('.overlay');

targets.forEach(function(elem) {
    elem.addEventListener('click', function(event) {
        event.preventDefault();
        linkLocation = this.href;
        showOverlay();
        setTimeout(function(){ window.location.href = linkLocation;}, 1000);

    });
});
function showOverlay () {
    overlay.style.opacity = '1'
    overlay.style.zIndex = '1'
}
