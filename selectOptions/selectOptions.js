// document.querySelector('.custom-select-wrapper').addEventListener('click', function () {
//     this.querySelector('.custom-select').classList.toggle('open');
// })

for (const dropdown of document.querySelectorAll(".custom-select-wrapper")) {
    dropdown.addEventListener('click', function () {
        this.querySelector('.custom-select').classList.toggle('open');
    })
}

for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener('click', function () {
        if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.children[0].textContent;
        }
    })
}

// window.addEventListener('click', function (e) {
//     const select = document.querySelector('.custom-select')
//     if (!select.contains(e.target)) {
//         select.classList.remove('open');
//     }
// });

window.addEventListener('click', function (e) {
    for (const select of document.querySelectorAll('.custom-select')) {
        if (!select.contains(e.target)) {
            select.classList.remove('open');
        }
    }
});

//hovering effect
for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener('mouseenter', function () {
        setImageOf(this.parentElement.parentElement.parentElement.parentElement.id, this.getAttribute('data-value'));
    });
    option.addEventListener('mouseleave', function () {
        setImageOf(this.parentElement.parentElement.parentElement.parentElement.id, this.parentElement.querySelector(".selected").getAttribute('data-value'));
    });
}

function setImageOf(parentID, imgName) {
    const imageMap = new Map([
        ["skyDiv", "skyimg"],
        ["celestialDiv", "celestialimg"],
        ["egroundDiv", "egroundimg"],
        ["wgroundDiv", "wgroundimg"],
        ["balloonDiv", "balloonimg"],
        ["reflectionDiv", "shineimg"],
        ["breezeDiv", "windimg"],
        ["knotDiv", "knotimg"],
    ]);
    let img = document.querySelector("#" + imageMap.get(parentID));
    switch (parentID) {
        case "skyDiv":
            img.setAttribute('src', "upload%20freelancer/sky/" + imgName + ".png");
            break;
        case "celestialDiv":
            img.setAttribute('src', "upload%20freelancer/celestial%20body/" + imgName + ".png");
            break;
        case "egroundDiv":
            img.setAttribute('src', "upload%20freelancer/east%20ground/" + imgName + ".png");
            break;
        case "wgroundDiv":
            img.setAttribute('src', "upload%20freelancer/west%20ground/" + imgName + ".png");
            break;
        case "balloonDiv":
            img.setAttribute('src', "upload%20freelancer/joyful%20balloon/" + imgName + ".png");
            break;
        case "reflectionDiv":
            img.setAttribute('src', "upload%20freelancer/balloon%20shine/" + imgName + ".png");
            break;
        case "breezeDiv":
            img.setAttribute('src', "upload%20freelancer/wind/" + imgName + ".png");
            break;
        case "knotDiv":
            img.setAttribute('src', "upload%20freelancer/knot/" + imgName + ".png");
            break;
    }
    setTimeout(calculateRarityScore,100);
}

function calculateRarityScore() {
    let score = 1;
    const selectors = ["skyDiv", "celestialDiv", "egroundDiv", "wgroundDiv", "balloonDiv", "reflectionDiv", "breezeDiv", "knotDiv"];
    for (const selector of selectors) {
        score *= parseFloat(document.querySelector("#" + selector + " .selected").children[1].innerHTML.replaceAll("~", "").replaceAll("%", "")) / 100;
    }
    document.querySelector("#rarityScore .value").innerHTML = Number.parseFloat(score).toExponential(2);
}

function displayOnSelecting(optionsDivID, elementToDisplayID) {
    for (const element of document.querySelectorAll("#" + optionsDivID + " .custom-option")) {
        element.addEventListener('click', evt => {
            document.querySelector("#" + elementToDisplayID).style.display = "inline-flex";
            document.getElementById(elementToDisplayID).scrollIntoView({behavior: 'smooth'});
        });
    }
}

function displayOnClickingOption(optionID, elementToDisplayID){
    document.querySelector("#"+optionID).addEventListener('click', evt => {
        document.querySelector("#" + elementToDisplayID).style.display = "inline-flex";
        document.getElementById(elementToDisplayID).scrollIntoView({behavior: 'smooth'});
    });
}

displayOnClickingOption("collectionUpNup", "displayDiv");
displayOnClickingOption("collectionUpNup", "skyDiv");
displayOnSelecting("skyDiv", "celestialDiv");
displayOnSelecting("celestialDiv", "egroundDiv");
displayOnSelecting("egroundDiv", "wgroundDiv");
displayOnSelecting("wgroundDiv", "balloonDiv");
displayOnSelecting("balloonDiv", "reflectionDiv");
displayOnSelecting("reflectionDiv", "breezeDiv");
displayOnSelecting("breezeDiv", "knotDiv");
displayOnSelecting("knotDiv", "rarityScore");

document.querySelector("#collectionNone").addEventListener('click', function () {
    for (const element of document.querySelectorAll(".upNup")) {
        element.style.display = "none";
    }
});
