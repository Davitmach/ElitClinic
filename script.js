
const MenuBtn = document.getElementById('header_bar_btn');
const HeaderNav = document.getElementById('header_nav');
var HeaderNavOpen = false;
if(HeaderNavOpen ==false) {
    HeaderNav.classList.add('disableMenu')
}
else {
    HeaderNav.classList.add('activeMenu')
}
MenuBtn.addEventListener('click', function() {
    
    
    if (HeaderNavOpen==true) {
      HeaderNav.classList.remove('activeMenu');
      HeaderNav.classList.add('disableMenu');
        HeaderNavOpen = false;
    } else {
        HeaderNav.classList.remove('disableMenu');
        HeaderNav.classList.add('activeMenu');
        HeaderNavOpen = true;
    }
})



/// Slider

const LeftBtn = document.getElementById('LeftSliderBtn');
const RightBtn = document.getElementById('RightSliderBtn');
const SliderBox = document.getElementById('SliderBox');

const GAP = 24;
let State = 1;


function updateSlider() {
     if (window.innerWidth < 1034) {
        SliderBox.style.transform = `translateX(0px)`;
        return
     }
  const GetWidth = SliderBox.children[0].clientWidth;
  SliderBox.style.transform = `translateX(-${(GetWidth + GAP) * (State - 1)}px)`;
}


function updateButtons() {
  if (State <= 1) {
    LeftBtn.classList.remove('ActiveBtn');  
  } else {
    LeftBtn.classList.add('ActiveBtn');    
  }

  if (State >= SliderBox.children.length) {
    RightBtn.classList.remove('ActiveBtn'); 
  } else {
    RightBtn.classList.add('ActiveBtn'); 
  }
}

RightBtn.addEventListener('click', () => {
  if (window.innerWidth < 1034) return; // ограничение
  if (State >= SliderBox.children.length) return;

  State++;
  updateSlider();
  updateButtons();
});

LeftBtn.addEventListener('click', () => {
  if (window.innerWidth < 1034) return; // ограничение
  if (State <= 1) return;

  State--;
  updateSlider();
  updateButtons();
});

window.addEventListener('resize', () => {
  updateSlider();
});


updateSlider();
updateButtons();



/// video

const videoElements = [
  document.getElementById('video1'),
  document.getElementById('video2'),
  document.getElementById('video3'),
  document.getElementById('video4'), // главный
  document.getElementById('video5'),
  document.getElementById('video6'),
  document.getElementById('video7')
];

const PrevBtn = document.getElementById('LeftBtn');
const NextBtn = document.getElementById('NextBtn');

const videos = [
  "/assets/video/1.mp4",
  "/assets/video/2.mp4",
  "/assets/video/3.mp4",
  "/assets/video/4.mp4",
  "/assets/video/5.mp4",
  "/assets/video/6.mp4",
  "/assets/video/7.mp4",
  "/assets/video/8.mp4"
];
const videos2 = document.querySelectorAll('.video-wrapper');

  videos2.forEach(wrapper => {
    const video = wrapper.querySelector('video');
    const timeline = wrapper.querySelector('.timeline');
    const progress = wrapper.querySelector('.progress');

    // Убрать стандартные controls
    video.controls = false;

    // Клик по видео — play/pause
    video.addEventListener('click', () => {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });

    // Обновляем прогресс бар
    video.addEventListener('timeupdate', () => {
      const percent = (video.currentTime / video.duration) * 100;
      progress.style.width = `${percent}%`;
    });

    // Клик по таймлайну — перемотка
    timeline.addEventListener('click', (e) => {
      const rect = timeline.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const percent = clickX / width;
      video.currentTime = percent * video.duration;
    });
  });
let currentCenterIndex = 3; // индекс главного видео в массиве (начинаем с 4-го — т.е. index 3)

// 👉 обновление отображения 7 видео
function updateVideoElements() {
  for (let i = 0; i < 7; i++) {
    const videoIndex = currentCenterIndex - 3 + i;

    const el = videoElements[i];
    if (videos[videoIndex]) {
      el.style.display = "block";
      el.src = videos[videoIndex];
      el.setAttribute("data-index", videoIndex);
    } else {
    
      el.removeAttribute("data-index");
    }
  }

  // 👉 Обновляем состояние кнопок

}


// 👉 клик по миниатюре (слева/справа)
videoElements.forEach((el, i) => {
  el.addEventListener("click", () => {
    const clickedIndex = parseInt(el.getAttribute("data-index"));
    if (!isNaN(clickedIndex) && clickedIndex !== currentCenterIndex) {
      currentCenterIndex = clickedIndex;
      updateVideoElements();
    }
  });
});

// 👉 кнопки перелистывания
NextBtn.addEventListener("click", () => {
  
  
  if (currentCenterIndex < videos.length - 1) {
    currentCenterIndex++;
    updateVideoElements();
  }
});

PrevBtn.addEventListener("click", () => {
  console.log(1);
  if (currentCenterIndex > 0) {
    currentCenterIndex--;
    updateVideoElements();
  }
});

// 👉 начальная отрисовка
updateVideoElements();
