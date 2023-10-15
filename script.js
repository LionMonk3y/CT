const track = document.querySelector('.carouselTrack');
const slides = Array.from(document.querySelectorAll('.carouselSlide'));
const dots = Array.from(document.querySelectorAll('.dot'));
let currentSlide = 0;

const slideWidth = slides[0].getBoundingClientRect().width;
const slidesPerPage = 4;
const totalSlideGroups = Math.ceil(slides.length / slidesPerPage);

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index * slidesPerPage + 'px';
};

slides.forEach(setSlidePosition);

const moveToSlideGroup = (slideGroupIndex) => {
  const targetSlide = slideGroupIndex * slidesPerPage;
  track.style.transform = 'translateX(-' + slideWidth * targetSlide + 'px)';
  currentSlide = targetSlide;
  updateDots();
};

const updateDots = () => {
  const currentSlideGroup = Math.floor(currentSlide / slidesPerPage);

  dots.forEach((dot, index) => {
    const dotSlideGroup = Math.floor(index / (slidesPerPage / 4));
    dot.classList.toggle('active', dotSlideGroup === currentSlideGroup);
  });
};

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    const targetSlideGroup = Math.floor(index / (slidesPerPage / 4));
    moveToSlideGroup(targetSlideGroup);
  });
});

const nextSlideGroup = () => {
    const nextSlide = currentSlide + slidesPerPage;
  
    if (nextSlide < slides.length) {
      moveToSlideGroup(Math.floor(nextSlide / slidesPerPage));
    } else {
      moveToSlideGroup(0);
    }
  };

const prevSlideGroup = () => {
  const prevSlide = currentSlide - slidesPerPage;

  if (prevSlide >= 0) {
    moveToSlideGroup(Math.floor(prevSlide / slidesPerPage));
  }
};

document.getElementById('prev').addEventListener('click', () => {
  prevSlideGroup();
});

document.getElementById('next').addEventListener('click', () => {
  nextSlideGroup();
});


setInterval(nextSlideGroup, 10000);

// Schedule

function showContent(contentId) {
  const contents = document.querySelectorAll('.content');
  contents.forEach(content => {
    content.classList.remove('active');
  });

  const selectedContent = document.getElementById(contentId);
  selectedContent.classList.add('active');
}
