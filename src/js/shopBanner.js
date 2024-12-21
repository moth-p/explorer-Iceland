// banner 輪播
const swiper = new Swiper('#bannerSwiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 1000,
    autoplay: {
        delay: 2800,
        disableOnInteraction: true,
    },
    loop: true,
});

// banner 點擊跳下一張
document.querySelector('#bannerSwiper').addEventListener('click', function () {
    swiper.slideNext();
    swiper.autoplay.start(); // 恢復自動輪播
})

        


        
        
        



        

        
        
        
