const triggerButton = document.querySelector('.tiggerButton');
const closeButton = document.querySelector('.closeButton');
const nextButton = document.querySelector('.nextButton');
const prevButton = document.querySelector('.prevButton');
const swiperWrapper = document.querySelector('.mySwiper');

var swiper;
var scrollerID;
var paused = true;
var speed = 10; // 1 - Fast | 2 - Medium | 3 - Slow
var interval = speed * 5;

triggerButton.addEventListener('click', function () {
    swiper = new Swiper(".mySwiper", {
        direction: "vertical",
        pagination: false,
    });

    scrollerID = startScroll(0);
    // paused = false;

    swiper.on('slideChange', function () {
        let indexId = this.activeIndex;
        if(paused == true) {
            scrollerID = startScroll(indexId);
            paused = false;
        } else {
            stopScroll();
            paused = true;
        }
    });

    swiperWrapper.classList.remove('d-none');
});



closeButton.addEventListener('click', function () {
    swiperWrapper.classList.add('d-none');
    swiper.destroy();
});

nextButton.addEventListener('click', function () {
    stopScroll();
    swiper.slideNext();
});

prevButton.addEventListener('click', function () {
    stopScroll();
    swiper.slidePrev();
});

function startScroll(indexId){
    console.log("trigger to scroll bottom");
    let divScroll = document.querySelector('.swiperLyrics' + indexId)
    divScroll.scrollBy(0, 0);
    let id = setInterval(function() {
        divScroll.scrollBy(0, 2);
        if ((divScroll.innerHeight + divScroll.scrollY) >= document.body.offsetHeight) {
            // Reached end of page
            stopScroll();
        }
    }, interval);
    return id;
}

function stopScroll() {
    clearInterval(scrollerID);
}
 