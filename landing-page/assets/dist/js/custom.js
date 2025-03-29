$(document).ready(function () {
  const menuBarDesktop = document.querySelectorAll(".menuBarDesktop");
  const menuBarMobile = document.querySelectorAll(".menuBarMobile");
  const sections = document.querySelectorAll("section[id], header[id]");

  // Smoth-scroll
  const ScrollArea = document.getElementById("scroll-content");
  const options = {
    damping: 0.1,
    speed: 1,
    renderByPixel: true,
    continuousScrolling: true,
    syncCallbacks: true,
    alwaysShowTracks: true,
  };

  var scrollbar = Scrollbar.init(ScrollArea, options);
  activateMenu(
    scrollbar.offset.y,
    document.querySelector("header[id='home']"),
    menuBarDesktop,
    menuBarMobile
  );

  $(".menuText").each(function () {
    var getText = $(this).children(".menuTextInner").text();
    $(this).find("span").text(getText);
  });

  scrollbar.addListener(({ offset }) => {
    const searchBar = $(".searchPopUp");
    searchBar.css("top", offset.y);

    $(".revealSearch")
      .off("click")
      .on("click", function () {
        searchBar.toggleClass("showSearch");
      });

    let scrollPosition = scrollbar.offset.y;

    sections.forEach((section) => {
      activateMenu(scrollPosition, section, menuBarDesktop, menuBarMobile);
    });
  });

  // nav End

  $(".fm-button, .fm-button-2").mousemove(function (event) {
    var mouseX = event.pageX - $(this).offset().left;
    var mouseY = event.pageY - $(this).offset().top;

    var buttonWidth = $(this).outerWidth();
    var buttonHeight = $(this).outerHeight();

    $(this).css({
      top: mouseY - buttonHeight / 2 + "px",
      left: mouseX - buttonWidth / 2 + "px",
    });
  });

  $(".fm-button, .fm-button-2").mouseleave(function () {
    $(this).css({ top: 0 + "px", left: 0 + "px" });
  });

  var loaderDelay = 3500;
  setTimeout(function () {
    $(".loaderTop").css({ transform: "translateY(-100%)" });
    $(".loaderBottom").css({ transform: "translateY(100%)" });
    $(".loaderTopTxt").css("transform", "translateY(50%) scale(5)");
    $(".loaderBottomTxt").css("transform", "translateY(-50%) scale(5)");

    setTimeout(function () {
      $(".loader").css("display", "none");
    }, loaderDelay + 100);
  }, loaderDelay);

  $(".marquee").marquee({
    speed: 200,
    gap: 30,
    delayBeforeStart: 0,
    direction: "left",
    duplicated: true,
    pauseOnHover: false,
  });

  const sliderEl = document.querySelector(".gallery");

  createSpringSlider(sliderEl, {
    loop: true,

    allowTouchMove: false,
    autoplay: {
      delay: 1000,
      disableOnInteraction: true,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      800: {
        slidesPerView: 2,
      },
      1100: {
        slidesPerView: 3,
      },
    },
  });

  // Main Testimonials Slider
  var testimonials = new Swiper(".testimonials", {
    effect: "creative",
    creativeEffect: {
      prev: {
        shadow: true,
        translate: [0, 0, -400],
      },
      next: {
        translate: ["100%", 0, 0],
      },
    },
    autoplay: {
      delay: 2500,
    },
    loop: true,
    spaceBetween: 10,
    slidesPerView: 1,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".testimonial-next",
      prevEl: ".testimonial-prev",
    },
  });

  // Thumbnail Slider
  var swiper2 = new Swiper(".testimonialsThumb", {
    loop: true,
    autoplay: {
      delay: 2500,
    },
    spaceBetween: 20,
    slidesPerView: 2,
    navigation: {
      nextEl: ".testimonial-next",
      prevEl: ".testimonial-prev",
    },
    thumbs: {
      swiper: testimonials,
    },
    on: {
      slideChange: function () {
        let nextIndex =
          (testimonials.realIndex + 2) % testimonials.slides.length;
        testimonials.slideToLoop(nextIndex);
      },
    },
  });
  $(".linkTxt").each(function () {
    var getText = $(this).text();
    $(this).find("span").text(getText);
  });

  // animations

  $('.fm-menu a[href^="#"]').on("click", function (event) {
    event.preventDefault();

    const target = $(this.getAttribute("href"));

    if (target.length) {
      scrollbar.scrollTo(0, target.offset().top, 800);
    }

    // Toggle mobile menu
    $(".hamburger").toggleClass("is-active");
    $(".mobileMenu .mainMenu").toggleClass("d-none");
  });

  // Sticky Navbar with Smooth Scrollbar Listener
  scrollbar.addListener(({ offset }) => {
    const navbar = $("#navbar");

    if (offset.y > 750) {
      navbar.addClass("sticky");
      navbar.css("top", offset.y);
    } else {
      navbar.removeClass("sticky");
      navbar.css("top", 0);
    }
  });

  const $cursor = $(".cursor");

  // $(document).on("mousemove", function (e) {
  //   $cursor.css({
  //     top: e.clientY - $cursor.height() / 2,
  //     left: e.clientX - $cursor.width() / 2,
  //   });
  // });

  // $(document).on("mouseover", function (e) {
  //   const cursorStyle = window.getComputedStyle(e.target).cursor;
  //   if (cursorStyle === "pointer") {
  //     $cursor.addClass("pointer-hover");
  //   } else {
  //     $cursor.removeClass("pointer-hover");
  //   }
  // });

  function startCountingAnimation($this) {
    let target = parseInt($this.text().replace(/,/g, ""), 10);

    if (isNaN(target)) {
      console.error("Invalid target number:", $this.text());
      return;
    }

    let duration = 3000;

    $this.text("0");

    $({ count: 0 }).animate(
      { count: target },
      {
        duration: duration,
        easing: "swing",
        step: function () {
          $this.text(Math.floor(this.count));
        },
        complete: function () {
          $this.text(target);
        },
      }
    );
  }

  function checkIfInView() {
    $(".counter").each(function () {
      let $this = $(this);
      let elementTop = $this.offset().top;
      let elementBottom = elementTop + $this.outerHeight();
      let viewportTop = $(window).scrollTop();
      let viewportBottom = viewportTop + $(window).height();

      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        if (!$this.hasClass("animated")) {
          startCountingAnimation($this);
          $this.addClass("animated");
        }
      }
    });
  }
  scrollbar.addListener(({ offset }) => {
    checkIfInView(offset.y);
  });

  checkIfInView();

  // mobileMenu
  $(".hamburger").on("click", function () {
    $(".hamburger").toggleClass("is-active");
    $(".mobileMenu .mainMenu").toggleClass("d-none");
  });

  setTimeout(() => {
    $(".circle2").css("stroke-dashoffset", "46");
  }, loaderDelay + 500);

  function raf(time) {
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  const $backToTopBtn = $("#backToTop");

  scrollbar.addListener(({ offset }) => {
    if (offset.y >= 300) {
      $backToTopBtn.addClass("show");
    } else {
      $backToTopBtn.removeClass("show");
    }
  });

  $backToTopBtn.on("click", function () {
    scrollbar.scrollTo(0, 0, 1000);
  });
});

function activateMenu(scrollPosition, section, menuBarDekstop, menuBarMobile) {
  let sectionTop = section.offsetTop;
  let sectionHeight = section.offsetHeight;
  let sectionId = section.getAttribute("id");

  if (
    scrollPosition >= sectionTop - 50 &&
    scrollPosition < sectionTop + sectionHeight
  ) {
    menuBarDekstop.forEach((link) => link.classList.remove("active"));
    const activeLinkDesktop = document.querySelector(
      `a[href='#${sectionId}'] .menuTextInner.menuBarDesktop`
    );
    if (activeLinkDesktop) activeLinkDesktop.classList.add("active");

    menuBarMobile.forEach((link) => link.classList.remove("active"));
    const activeLinkMobile = document.querySelector(
      `a[href='#${sectionId}'] .menuTextInner.menuBarMobile`
    );
    if (activeLinkMobile) activeLinkMobile.classList.add("active");
  }
}
