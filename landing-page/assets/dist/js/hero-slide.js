  const slideHero = new Swiper('.slideHero', {
    loop: true,
    pagination: {
      el: '.slideHeroPagination',
      clickable: true
    },
    navigation: {
      nextEl: '.heroNext',
      prevEl: '.heroPrev'
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    }
  });
