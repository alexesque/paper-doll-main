const clothes = {
    accessories: {
        z: 40,
        items: ['red-gloves'],
    },
    bottoms: {
        z: 50,
        items: ['black-jeans', 'black-shorts', 'blue-jeans', 'green-pants', 'plaid-skirt', 'purple-slacks', 'quilt-skirt'],
    },
    hats: {
        z: 90,
        items: ['green-cowboy', 'red-cowboy'],
    },
    outerwear: {
        z: 80,
        items: ['leather-jacket', 'rain-coat'],
    },
    shoes: {
        z: 30,
        items: ['black-heels', 'converse', 'cowboy-boots', 'orange-heels', 'pink-heels'],
    },
    socks: {
        z: 20,
        items: ['green-socks', 'pink-socks', 'white-socks', 'yellow-socks'],
    },
    sweaters: {
        z: 70,
        items: ['black-sweater', 'orange-sweater'],
    },
    midsize: {
        z: 2,
        items: ['wildrose1', 'pink-jumpsuit', 'red-dress', 'torn-tank', 'yellow-blouse', 'pink-tank-top', 'blue-dress'],
    },
    bottomlayerwide: {
        z: 10,
        items: ['monstera', 'cork', 'jamlid', 'smoke', 'string'],
    },
};

for (let category in clothes) {
    clothes[category].items
        .map((item, i) => {
            const el = document.createElement('div');
            el.dataset.clothing = item;
            el.style.zIndex = clothes[category].z;

            const img = document.createElement('img');
            if (['jamlid'].includes(item)) {
                img.classList.add('w-35', 'bottle-width');
            } else {
                img.classList.add('w-20', 'half-bottle-width');
            }
            img.classList.add('select-none');
            img.src = `https://raw.githubusercontent.com/alexesque/paper-doll-main/main/img/${item}.png`;

            const wrapper = document.createElement('div');
            wrapper.classList.add('w-24');

            el.appendChild(img);
            wrapper.appendChild(el);

            return wrapper;
        })
        .map((el, i) => (i % 2 ? document.getElementById('clothes-area-l').appendChild(el) : document.getElementById('clothes-area-r').appendChild(el)));
}

const bottleArea = document.getElementById('bottle-area');

document.querySelectorAll('[data-clothing]').forEach((item) => {
    item.ondragstart = () => false;
    item.ondragend = () => false;


    item.onmousedown = (event) => {
        item.classList.add('active');
        item.style.position = 'absolute';
        const offsetX = event.clientX - item.getBoundingClientRect().left;
        const offsetY = event.clientY - item.getBoundingClientRect().top;
        document.querySelectorAll('.last-active').forEach((el) => el.classList.remove('last-active'));
        item.parentElement.classList.add('last-active');

        const onMove = (event) => {
            item.style.left = `${event.pageX - offsetX}px`;
            item.style.top = `${event.pageY - offsetY}px`;
        };

        document.addEventListener('mousemove', onMove);

        document.onmouseup = (event) => {
            document.removeEventListener('mousemove', onMove);

            if (
                event.clientX < bottleArea.getBoundingClientRect().left ||
                event.clientX > bottleArea.getBoundingClientRect().right ||
                event.clientY < bottleArea.getBoundingClientRect().top ||
                event.clientY > bottleArea.getBoundingClientRect().bottom
            ) {
                // If the item was dropped in the clothes area, put it away
                item.classList.remove('active');
                item.style.position = 'static';
                item.style.left = null;
                item.style.top = null;
            }
        };
    };
});