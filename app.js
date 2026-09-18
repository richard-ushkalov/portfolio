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

class CircleGallery {
    static #SMOOTHING = 0.1;
    static #SPEED = 0.1;

    #gallery = undefined;

    #step = 0.0;
    #angle = 0.0;
    #items = [];

    constructor(gallery, items) {
        this.#gallery = gallery;
        this.#initItems(items);
    };

    #initItems(items) {
        this.#items = items.map(item => {
            const image = item.querySelector('.circle-gallery__img');

            return { element: item, image };
        });
    };

    #moveItem(item, index) {
        const angle = this.#angle + this.#step * index;
        const facing = Math.PI / 2 - angle;

        const x = `calc(${Math.cos(angle)} * var(--gallery-radius))`;
        const y = `calc(${Math.sin(angle)} * var(--gallery-radius))`;

        item.element.style.transform = `
            translate(${x}, ${y})
            rotateX(-90deg)`;

        item.image.style.transform = `rotateY(${facing}rad)`;
    };

    #animationId = 0;
    #lastTime = 0;

    #update(deltaTime) {
        this.#angle += CircleGallery.#SPEED * deltaTime;

        const target = Math.PI * 2 / this.#items.length;
        const smoothing = 1 - (1 - CircleGallery.#SMOOTHING) ** (60 * deltaTime);

        this.#step += (target - this.#step) * smoothing;
    }

    #render() {
        this.#gallery.style.transform = `
            perspective(var(--gallery-perspective))
            rotateX(90deg)`;

        this.#items.forEach((item, index) => { this.#moveItem(item, index); });
    }

    #loop = currentTime => {
        const dt = this.#lastTime ? Math.min((currentTime - this.#lastTime) / 1000, 0.05) : 0;
        this.#lastTime = currentTime;
        
        this.#update(dt);
        this.#render();

        this.#animationId = requestAnimationFrame(this.#loop);
    };

    cycle = () => {
        if (this.#animationId) return;

        this.#lastTime = 0;
        this.#animationId = requestAnimationFrame(this.#loop);
    };

    stop = () => {
        cancelAnimationFrame(this.#animationId);
        this.#animationId = 0;
    };
};


const fragment = document.createDocumentFragment();
projects.forEach(project => fragment.append(createCard(project)));
galleryElement.append(fragment);

const cards = [...galleryElement.querySelectorAll('.circle-gallery__item')];
const gallery = new CircleGallery(galleryElement, cards);
gallery.cycle();