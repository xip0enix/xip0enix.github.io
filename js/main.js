
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
let activeId = null;
let timer = startTimer();

buttons.forEach((button) => {
	button.addEventListener('click', ($event) =>
		select($event.target.dataset.slide)
	);
});

function startTimer() {
	return setInterval(() => {
		const nextButton =
			getActiveButton().nextElementSibling ||
			document.querySelector('.preview-element');
		if (nextButton) {
			select(nextButton.dataset.slide);
		}
	}, 5000);
}

function select(slideId) {
	if (activeId === slideId) {
		return;
	}
	activeId = slideId;
	removeActiveSlide(slideId);
	setNextSlidePreview(slideId);
	removeActiveButton();
	addActiveButton(slideId);
	clearInterval(timer);
	timer = startTimer();
}

function setActiveSlide(id) {
	const activeSlide = document.querySelector(`#slider-${id}`);
	activeSlide.classList.add(activeClass);
}

function removeActiveSlide(id) {
	const activeSlide = document.querySelector('.slider-content.active');
	activeSlide.classList.remove(activeClass);
}

function setNextSlidePreview(id) {
	const preview = document.querySelector(`#slider-${id}`);
	preview.classList.add(previewClass);
	setTimeout(() => {
		setActiveSlide(id);
		preview.classList.remove(previewClass);
	}, 250);
}

function addActiveButton(id) {
	const activeButton = document.querySelector(`[data-slide="${id}"]`);
	activeButton.classList.add(activeClass);
}

function getActiveButton() {
	return document.querySelector('.preview-element.active');
}

function removeActiveButton() {
	getActiveButton().classList.remove(activeClass);
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
function renderNavigation() {
    menuData.forEach(menuItem => {
        navigation.appendChild(createMenuHTMLItem(menuItem));
    })
}

renderNavigation();

//Standartfarbe setzen
sitebar.classList.add(...[config.backgroundClass]);
headline.classList.add(...[config.backgroundClass]);
headline2.classList.add(...[config.backgroundClass])


setColorToElements(config.backgroundClass, menuData[0].color);


function setColorToElements(cssClass, color) {
    const elements = document.querySelectorAll(`.${cssClass}`);
    elements.forEach(elm => {
        elm.style.backgroundColor = color;
        
        
    })
}

setColorToElements(config.backgroundClass, menuData[0].color);

const getEventTrigger = sitebar.querySelectorAll(`.${config.menuelementClass}`);
getEventTrigger.forEach(elm => {
	elm.addEventListener('mouseenter', function(e) {
		setColorToElements(config.backgroundClass, e.target.dataset.color);
        
	})
})

//TEst

