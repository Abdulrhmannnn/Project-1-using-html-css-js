let backgroundOption = true;
// var to control interval
let Interval;
// *START* random image auto ******
// choose landing page ,choose yes no buttons
let landing = document.querySelector('.landing-page')
btnYes = document.querySelector('.random-background .yes')
btnNo = document.querySelector('.random-background .no')
// imgs array
imgsArr = ['body1.jpg', 'body2.jpg', 'body3.jpg', 'body4.jpg', 'body5.jpg']
// function random background randomize()
function randomize() {
    if (backgroundOption === true) {
        Interval = setInterval(function ok() {
            // random image depend on img length
            randomNumber = Math.floor(Math.random() * imgsArr.length)
            // choose backgroundImg url
            landing.style.backgroundImage = `url(${imgsArr[randomNumber]})`
        }, 1000)
    }
}
// choose backgound
let bkgrounds = document.querySelectorAll('.random-background span')
// loop on spans
bkgrounds.forEach(function(span) {
    // click on every span
    span.addEventListener('click', function(a) {

        //// remove active classes , add active class on clicked
        handleActive(a)
        // when click if dataset background === yes
        if (a.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomize();
            localStorage.setItem('background-option', true);
        } else {
            backgroundOption = false;
            clearInterval(Interval);
            localStorage.setItem('background-option', false);
        }
    });
});

// check if local has random background
backgroundLocal = localStorage.getItem('background-option');
// console.log(backgroundLocal) // null
// check localStorage background is not empty
// remove active class from all spans
document.querySelectorAll('.random-background span').forEach(function(el) {
    el.classList.remove('active');
});
if (backgroundLocal !== null) {
    if (backgroundLocal === 'true') {
        document.querySelector('.random-background .yes').classList.add('active');
        backgroundOption = true;
        randomize()
    } else {
        document.querySelector('.random-background .no').classList.add('active');
        backgroundOption = false;
    }
} else {
    document.querySelector('.random-background .yes').classList.add('active');
    randomize()
}

//*END* change background ******


//*START* option-box gear ****
// spin toggle functions  **********
gear=document.querySelector('div.settings-box .fa')
poda=document.querySelector('div.settings-box')
poda1=document.querySelector('div.gear')
gear.onclick=function() {
    poda.classList.toggle('open')
    poda1.classList.toggle('fa-spin')
}
//*END* option-box gear ****

// change root color ******
// choose colors list
let colorsLi = document.querySelectorAll('ul.colors-list li')

// loop for the data color
colorsLi.forEach(function (li)  {
    li.addEventListener('click', function (a) {
        // set new color on root
        document.documentElement.style.setProperty('--main-color',a.target.dataset.color)
        // set color on local
        localStorage.setItem('color_option',a.target.dataset.color)

    // remove active classes , add active class on clicked
    handleActive(a)
    })
})

document.querySelector('.reset-settings .reset').onclick = function () {
    localStorage.clear()
    window.location.reload()
    // localStorage.removeItem('bullets-option')
}

// check if there's color in localstorage or no
let mainColors=localStorage.getItem('color_option')
// console.log(mainColors) // => null because no color is choosed

if (mainColors !==null) { // if color is not empty

    // set it on root css color
    // console.log(localStorage.getItem('color_option'))
    document.documentElement.style.setProperty('--main-color',mainColors)

        // remove active class
        document.querySelectorAll('.colors-list li').forEach(function (ele) {
            ele.classList.remove('active')
        // add active class on element data-color === localstorage color
        if (ele.dataset.color===mainColors) {
            ele.classList.add('active')
        }
    })
    }

// *START* UP BUTTON *****
// choose Up button
// if scrolled down show button



let up=document.querySelector('button#Up')

up.onclick=function () {
    window.scrollTo({
        top:0,
        behavior:"smooth",
    })
}
// if clicked go up to the first of the page

// *END* UP BUTTON *****

// *START* SKILLS
let mySkills=document.querySelector('.skills')

window.onscroll = function () {
    if (window.scrollY>=200) {
        up.style.display='block'
    } else { 
        up.style.display='none'
    }
    //skills offset top
    let skillsOffsetTop = mySkills.offsetTop;
    //skills outer height
    let skillsOuterHeight = mySkills.offsetHeight;
    //skills offset top
    let windowHeight = this.innerHeight;
    //skills offset top
    let windowScrollTop = this.scrollY;

    if (windowScrollTop > (skillsOffsetTop+skillsOuterHeight-windowHeight)) {
        
        let allSkills=document.querySelectorAll('.skill-box .skill-progress span')
        
        allSkills.forEach(function (e) {
            e.style.width=e.dataset.progress
        })
    }
}
// *END* SKILLS

// *START* GALLERY
let myGallery= document.querySelectorAll('.gallery img')
myGallery.forEach(function (e) {
    e.addEventListener('click',function (a) {
        // create overlay element
        let overlay=document.createElement('div')
        // add class to overlay
        overlay.className='popup-overlay'
        // append overlay to the body
        document.body.appendChild(overlay)
        //create popup box
        let popupBox=document.createElement('div')
        // add class to popup box
        popupBox.className='popup-box'

        if (e.alt !==null) { // if image have alt
            //create heading
            let imgHeading = document.createElement('h3')
            // create text for heading
            let imgText=document.createTextNode(e.alt)
            // Append The Text to the heading
            imgHeading.appendChild(imgText)
            // append the heading to popup box
            popupBox.appendChild(imgHeading)
        }

        //create the image to popup box
        let popupImage=document.createElement('img')
        //set image src
        popupImage.src = e.src;
        // add img to popup box
        popupBox.appendChild(popupImage)
        // append popupbox to body
        document.body.appendChild(popupBox)
        // create close span
        let closeButton = document.createElement('span')
        // create the close button text
        let closeButtonText=document.createTextNode('X')
        // append buttonText to closeButton
        closeButton.appendChild(closeButtonText)
        // add class to closeButton
        closeButton.className='close-button'
        // add close button to popup box
        popupBox.appendChild(closeButton)
    })
})

// close popup gallery
document.addEventListener('click', function (e) {
    if (e.target.className=='close-button') {
        // remove popup
        e.target.parentNode.remove()
        // remove overlay
        document.querySelector('.popup-overlay').remove()
    }
})
// *END* GALLERY

// *START* bullets
// select all bullets
let allBullets = document.querySelectorAll('.nav-bullets .bullet')
let allNav = document.querySelectorAll('.links a')

function scrolling(elements) {
    elements.forEach(function(ele) {
        ele.addEventListener('click', function (a) {
            a.preventDefault()
            document.querySelector(a.target.dataset.section).scrollIntoView({
                behavior:'smooth'
            })
        })
    })
}
scrolling(allBullets)
scrolling(allNav)
// bullets show hide
// choose bullets
let bulletsSpan = document.querySelectorAll('.bullets-option span')
let bulletsContainer = document.querySelector('.nav-bullets')
let bulletsLocalStorage = localStorage.getItem('bullets-option')
if (bulletsLocalStorage !== null) {
    bulletsSpan.forEach(function (e) {
        e.classList.remove('active')
        if (bulletsLocalStorage === 'block') {
            document.querySelector('.bullets-option .testingyes').classList.add('active')
            bulletsContainer.style.display='block'
        } else {
            document.querySelector('.bullets-option .testingno').classList.add('active')
            bulletsContainer.style.display='none'
        }
    })
}

bulletsSpan.forEach(function (e) {
    e.addEventListener('click' , function (ele) {
        if (e.dataset.display === 'show') {
            bulletsContainer.style.display='block'
            localStorage.setItem('bullets-option','block')
        } else {
            bulletsContainer.style.display='none'
            localStorage.setItem('bullets-option','none')
        }
        handleActive(ele)
    })
})

// *END* bullets

//function to remove active classes , add active class on clicked
function handleActive(classes) {
    classes.target.parentElement.querySelectorAll('.active').forEach(function (ele) {
        ele.classList.remove('active')
    })
    classes.target.classList.add('active')
}
