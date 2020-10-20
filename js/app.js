/* Define Global Variables */
let sec;
let sectionId, listItem, navLink, dataNav, linkText;
let secPositions, topPosition, leftPosition, bottomPosition, rightPosition;
let linkTxt, dataLink;
let height, width;
let count = 0;
let dis = false;
let shownItems, headers, txt, secnav;
let sectionHeaders = document.querySelectorAll("section h2");
let sections = document.querySelectorAll("section");
let navList = document.getElementById("navbar__list");
let activeLinks = document.getElementsByTagName("A");
let NavDisplay = document.querySelector(".navbar__menu");
let fragList = document.createDocumentFragment();
let winWidth = window.innerWidth;
let winHeight = window.innerHeight;



/*
 * End Global Variables
 *Start Helper Functions
 */
//helper function to control display of scroll to top button
function displayButton(elem) {
    if (elem === true) {
        toTopButton.style.display = "block";
    } else {
        toTopButton.style.display = "none";
    }

}


//helper function to define wheter the nav is displayed or not.
function display(elem) {
    if (elem === true) {
        NavDisplay.style.display = "block";
    } else {
        NavDisplay.style.display = "none";
    }

}
//helper inner function to show which section and link is in active
function innerFun(elem) {
    elem.classList.add("activeClass");
    //console.log(sec);
    dataLink = `${elem.getAttribute("data-nav")}`;
    //console.log(dataLink);
    /*this part to make the link active with the active section
    and make a different styling to it*/
    for (let activeLink of activeLinks) {
        linkTxt = activeLink.textContent;
        activeLink.classList.remove("activeClass");
        if (linkTxt === dataLink) {
            activeLink.classList.add("activeClass");
            // console.log(activeLink);
        }
    }
}

function secCollapse(sections) {
    for (sec of sections) {
        secnav = sec.getAttribute("data-nav");
        if (secnav === txt) {
            shownItems = sec.querySelectorAll(".landing__container  p");
            for (let showItem of shownItems) {
                if (showItem.style.display === "none") {
                    showItem.style.display = "block";
                } else {
                    showItem.style.display = "none";
                }
            } //to change display of items inside the sections depend on click event
        } //to this if this is the proper section or not
    } //to find out which sec ,header we will work on.
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav
for (let sec of sections) {
    sectionId = sec.id;
    listItem = document.createElement("LI");
    navLink = document.createElement("A");
    dataNav = sec.getAttribute("data-nav");
    linkText = document.createTextNode(dataNav);
    navLink.appendChild(linkText);
    navLink.href = `#${sectionId}`;
    navLink.className = "menu__link";
    listItem.appendChild(navLink);
    /*  navList.appendChild(listItem);
    when calulating appending to list directly it takes 1 sec ,but
    when using document fragment it takes 0.5s so we i use fargment*/
    fragList.appendChild(listItem);
}
navList.appendChild(fragList); //1.32
/*let timend = performance.now();*/


// Add class 'active' to section when near top of viewport

function myActiveScroll() {
    //console.clear();
    for (sec of sections) {
        secPositions = sec.getBoundingClientRect();
        topPosition = secPositions.top;
        leftPosition = secPositions.left;
        bottomPosition = secPositions.bottom;
        rightPosition = secPositions.right;
        height = bottomPosition - topPosition;
        width = rightPosition - leftPosition;
        sec.classList.remove("activeClass");
        /*if (winWidth >= 400 && winHeight >= 700)*/
        {
            if (bottomPosition <= winHeight && rightPosition <= winWidth) {
                if ((topPosition >= 0 || (Math.abs(topPosition) <= height)) && (leftPosition >= 0 || (Math.abs(leftPosition) <= width))) {
                    innerFun(sec);
                    break;
                }
            } else {
                /*  if (sec.id === "section1")*/
                {
                    if (topPosition > -height && topPosition < winHeight && leftPosition > -width && leftPosition < winWidth) {
                        innerFun(sec);
                                            break;

                    }
                }
            }
        } //end of true statement of 1st if
        /*else if (topPosition > 0 && topPosition < winHeight && leftPosition > 0 && leftPosition < winWidth) 
             {
                        innerFun(sec);
        
        }//end of false statement of 1st if*/

        //console.log(secPositions);
        /*let r = sec.id;
        console.log("bottom " + bottomPosition);
        console.log("top " + r + " " + topPosition);

        console.log("left " + leftPosition);
        console.log("right" + rightPosition);*/
    } //end for for of loop
} //end of MyActiveScroll function


//scroll to top function
let scrollVal = false;
let scrollprev, scrollNext;
let toTopButton = document.createElement("Button");
toTopButton.textContent = "top";
toTopButton.style.display = "none";
toTopButton.style.position = "fixed";
toTopButton.style.bottom = "20px";
toTopButton.style.right = "20px";
toTopButton.style.width = "5em";
toTopButton.style.height = "5em";
toTopButton.style.backgroundColor = "#ffff00";
toTopButton.style.borderRadius = "10px";
document.body.appendChild(toTopButton);
let scrollPos = 0;

/**
 * End Main Functions
 * Begin Events
 * 
 */



function linkLoad() {
    document.getElementsByTagName("A")[0].classList.add("activeClass");
    NavDisplay.style.display = "block";
}

//this event is used to change the value of winWidth depending on user resizing.
window.onresize = function () {
    winWidth = window.innerWidth;
    winHeight = window.innerHeight;
    //console.log("viewportheight " + winHeight);
    //console.log("viewportwidth " + winWidth);
};
// a scroll event to define how the nav will behave when scrolling and when scrolling has stopped
document.addEventListener("scroll", scroller);

function scroller() {
    dis = true;
    display(dis);
    if (count !== 0)
        clearTimeout(count);
    count = setTimeout(function () {
        dis = false;
        display(dis);
    }, 2000);
}

//scroll to top eventlistner to show the scroll to top button depending on scroll
window.addEventListener("scroll", actButton);

function actButton() {
    if (document.body.getBoundingClientRect().top < scrollPos) {
        if (document.body.scrollTop > winHeight || document.documentElement.scrollTop > winHeight) {
            scrollVal = true;
            displayButton(scrollVal)
        }
    }
    scrollPos = document.body.getBoundingClientRect().top;

}

//cick event listener to define how the scroll to top button will react when clicked
toTopButton.addEventListener("click", myfun);

function myfun() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    scrollVal = false;
    displayButton(scrollVal);

}
//to define which element is in the view port
document.addEventListener("scroll", myActiveScroll);


//section collapsing part
for (sec of sections) {
    pStyles = sec.querySelectorAll("p");
    for (let pStyle of pStyles) {
        pStyle.style.display = "block";
    }
}


for (let sectionHead of sectionHeaders) {
    sectionHead.addEventListener("click", controlFun);
}

function controlFun() {
    txt = this.textContent;
    secCollapse(sections);

} //end of showFun.

/*for (let activeLink of activeLinks) {
    activeLink.addEventListener("click", controlFun);
}*/