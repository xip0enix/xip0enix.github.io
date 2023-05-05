
const activeClass = 'active';
const previewClass = 'preview';
const buttons = document.querySelectorAll('.preview-element');
const menuData = [
    {
        
        label: 'Home',
        icon: '<i class="fas fa-home"></i>',
        color: '#00FF80',
        link: '#'
    },
    {
        label: 'Tools',
        icon: '<i class="fa-solid fa-circle-info"></i>',
        color: '#FF6ED3',
        link: '#info'
    },
    {
        label: 'Timer',
        icon: '<i class="fa-regular fa-clock"></i>',
        color: '#21ebff',
        link: 'https://xip0enix.github.io/timer/'
    },
    {
      label: 'Events',
      icon: '<i class="fa-solid fa-calendar-days"></i>',
      color: '#FF6347',
      link: '/events.html'
  }
    
];
const config = {
    menuelementClass: 'menuelement',
    backgroundClass: 'bg-color',
    
    
};

const navigation = document.querySelector('.navigation');
const sitebar = document.querySelector('.sitebar');
const headline = document.querySelector('.headline');
const headline2= document.querySelector('.headline2');


//Epicgame
let activeSlideId = null;
let timerId = startTimer();

// Add event listener to buttons
buttons.forEach(button => {
  button.addEventListener('click', () => select(button.dataset.slide));
});

// Start the timer for the automatic slide change
function startTimer() {
  return setInterval(() => {
    const nextButton = getActiveButton()?.nextElementSibling || document.querySelector('.preview-element');
    select(nextButton?.dataset?.slide);
  }, 5000);
}

// Select the slide with the given ID
function select(slideId) {
  if (activeSlideId === slideId) {
    return;
  }
  activeSlideId = slideId;
  removeActiveSlide();
  setNextSlidePreview();
  removeActiveButton();
  addActiveButton();
  clearInterval(timerId);
  timerId = startTimer();
}

// Set the slide with the given ID as active
function setActiveSlide(slideId) {
  const activeSlide = document.querySelector(`#slider-${slideId}`);
  activeSlide?.classList.add(activeClass);
}

// Remove the active class from the current slide
function removeActiveSlide() {
  const activeSlide = document.querySelector('.slider-content.active');
  activeSlide?.classList.remove(activeClass);
}

// Set the preview class on the slide with the given ID
function setNextSlidePreview() {
  const preview = document.querySelector(`#slider-${activeSlideId}`);
  preview?.classList.add(previewClass);
  setTimeout(() => {
    setActiveSlide(activeSlideId);
    preview?.classList.remove(previewClass);
  }, 250);
}

// Add the active class to the button with the given ID
function addActiveButton() {
  const activeButton = document.querySelector(`[data-slide="${activeSlideId}"]`);
  activeButton?.classList.add(activeClass);
}

// Get the active button element
function getActiveButton() {
  return document.querySelector('.preview-element.active');
}

// Remove the active class from the current button
function removeActiveButton() {
  getActiveButton()?.classList.remove(activeClass);
}

//slider

//Menüpunkt generieren

function createMenuHTMLItem(menuitem) {

    const newMenuItem = document.createElement('div');
    const newLabelDiv = document.createElement('div');
    const newIcon = document.createElement('a');
    const newLabelPlusDiv = document.createElement('div');

    newMenuItem.dataset.color = menuitem.color;
    newMenuItem.classList.add(config.menuelementClass);

    newIcon.innerHTML = menuitem.icon;
    newIcon.classList.add(...['icon', config.backgroundClass]);
    newIcon.href = menuitem.link;
    newMenuItem.appendChild(newIcon);

    newLabelDiv.innerHTML = menuitem.label;
    newLabelDiv.classList.add(...['label', config.backgroundClass]);
    newMenuItem.appendChild(newLabelDiv);

    newLabelPlusDiv.classList.add(...['label-plus', config.backgroundClass]);
    newMenuItem.appendChild(newLabelPlusDiv);

    return newMenuItem;
}

// Menüpunkt einfügen
const { backgroundClass, menuelementClass } = config;

function renderNavigation() {
  menuData.forEach(menuItem => {
    navigation.appendChild(createMenuHTMLItem(menuItem));
  });
}

renderNavigation();

// Set standard background color
[sitebar, headline, headline2].forEach(elm => {
  elm.classList.add(backgroundClass);
});

setColorToElements(backgroundClass, menuData[0].color);

function setColorToElements(cssClass, color) {
  const elements = document.querySelectorAll(`.${cssClass}`);
  elements.forEach(elm => {
    elm.style.backgroundColor = color;
  });
}

setColorToElements(backgroundClass, menuData[0].color);

const eventTriggers = sitebar.querySelectorAll(`.${menuelementClass}`);
eventTriggers.forEach(trigger => {
  trigger.addEventListener('mouseenter', (e) => {
    setColorToElements(backgroundClass, e.target.dataset.color);
  });
});


