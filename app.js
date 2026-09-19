import { CircleGallery } from "./circle-gallery.js";
import { createObserver } from "./observer.js";

const projects = [
    {
        title: '8ball pool',
        cover: '/img/8ball-pool-preview.png',
        alt: '8ball pool page preview',
        url: 'https://richard-ushkalov.github.io/learning/day9/'
    },
];

const galleryElement = document.querySelector('.circle-gallery');
const template = document.querySelector('.circle-gallery__item-template');

const createCard = project => {
    const card = template.content.firstElementChild.cloneNode(true);

    const link = card.querySelector('.circle-gallery__link');
    const image = card.querySelector('.circle-gallery__img');
    const title = card.querySelector('.circle-gallery__title');

    title.textContent = project.title;
    image.src = project.cover;
    image.alt = project.alt;
    link.href = project.url;

    return card;
};

const fragment = document.createDocumentFragment();
projects.forEach(project => fragment.append(createCard(project)));
galleryElement.append(fragment);

const cards = [...galleryElement.querySelectorAll('.circle-gallery__item')];
const gallery = new CircleGallery(galleryElement, cards);
gallery.cycle();

const contactsLinkButton = document.querySelector('.contacts-link__button');
const footer = document.querySelector('.footer');
createObserver(contactsLinkButton, footer, 'contacts-link__button--hidden', '0px 0px -1% 0px');