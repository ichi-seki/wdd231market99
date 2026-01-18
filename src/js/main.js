import { getParkData } from "./parkService.mjs";
const parkData = getParkData();

const parkInfoLinks = [
    {
        name: "Current Conditions &#x203A;",
        link: "conditions.html",
        image: parkData.images[2].url,
        description: "See what conditions to expect in the park before leaving on your trip!"
    },
    {
        name: "Fees & Passes &#x203A;",
        link: "fees.html",
        image: parkData.images[3].url,
        description: "Learn about the fees and passes that are available."
    },
    {
        name: "Visitor Centers &#x203A;",
        link: "visitor_centers.html",
        image: parkData.images[9].url,
        description: "Learn about the visitor centers in the park."
    }
];

function parkInfoTemplate(info){
    return `<a href="/" class="hero-banner_title">${info.fullName}</a>
    <p class= "hero-banner_subtitle">
    <span>${info.designation}</span>
    <span>${info.states}</span>
    </p>`;
}

function setHeaderInfo(data) {
    const disclaimer = document.querySelector(".disclaimer > a");
    disclaimer.href= data.url;
    disclaimer.innerHTML = data.fullName;

    document.querySelector("head > title").textContent = data.fullName;
    document.querySelector(".hero-banner > img").src = data.images[0].url;
    document.querySelector(".hero-banner_content").innerHTML = parkInfoTemplate(data);
}
    setHeaderInfo(parkData);

function introTemplate(data) {
    return `<h1 class="intro_title">${data.fullName}</h1>
    <p class="intro_description">${data.description}</p>`;
}

function setIntroInfo(data) {
    document.querySelector(".intro").innerHTML = introTemplate(data);
}
setIntroInfo(parkData);

function mediaCardTemplate(parkInfoLinks) {
    return `<div class="media-card">
    <a href="${parkInfoLinks.link}">
    <img class="media-card_image" src="${parkInfoLinks.image}" alt="${parkInfoLinks.altText}">
    <h2 class="media-card_title">${parkInfoLinks.name}</h2>
    <p class="media-card_caption">${parkInfoLinks.description}</p></a></div>`;
}

function setMediaCards(data) {
    const mediaCardContainer = document.querySelector(".info");
    const mediaCards = data.map(mediaCardTemplate).join("");
    mediaCardContainer.innerHTML = mediaCards;
}
setMediaCards(parkInfoLinks);

function getMailingAddress(data) {
    const mailing = data.find((address) => address.type === "Mailing");
    return mailing;
}

function getVoicePhone(data) {
    const voice = data.find((phone) => phone.type === "Voice");
    return voice.phoneNumber;
}

function footerTemplate(data) {
    const mailing = getMailingAddress(data.addresses);
    const phone = getVoicePhone(data.contacts.phoneNumbers);
    return `<section class= "contact">
    <h3>Contact Info</h3>
    <h4>Mailing Address</h4>
    <div><p>${mailing.line1}</p>
    <p>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p>
    </div>
    <h4>Phone Number</h4>
    <p>${phone}</p>
    </section>`;
}

function setFooterInfo(data) {
    document.querySelector("#park-footer").innerHTML = footerTemplate(data);
}
setFooterInfo(parkData);