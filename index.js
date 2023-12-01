const clothes = {
    accessories: {
       
        items: ['red-gloves'],
    },
    bottoms: {
        
        items: ['black-jeans', 'black-shorts', 'blue-jeans', 'green-pants', 'plaid-skirt', 'purple-slacks', 'quilt-skirt'],
    },
    hats: {
        
        items: ['green-cowboy', 'red-cowboy'],
    },
    outerwear: {
        
        items: ['leather-jacket', 'rain-coat'],
    },
    shoes: {
        
        items: ['black-heels', 'converse', 'cowboy-boots', 'orange-heels', 'pink-heels'],
    },
    socks: {
       
        items: ['green-socks', 'pink-socks', 'white-socks', 'yellow-socks'],
    },
    sweaters: {
       
        items: ['black-sweater', 'orange-sweater'],
    },
    tops: {
        
        items: ['button-up', 'pink-jumpsuit', 'red-dress', 'torn-tank', 'yellow-blouse', 'pink-tank-top', 'blue-dress'],
    },
    underwear: {
        
        items: ['black-tights', 'bralette', 'fishnets', 'orange-tights', 'purple-tights'],
    },
};

for (let category in clothes) {
    clothes[category].items
        .map((item, i) => {
            const el = document.createElement('div');
            el.dataset.clothing = item;
            el.style.zIndex = '1';

            const img = document.createElement('img');
            if (['leather-jacket', 'rain-coat', 'red-gloves'].includes(item)) {
                img.classList.add('w-24', 'five-eighths-doll-width');
            } else {
                img.classList.add('w-20', 'half-doll-width');
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

const dollArea = document.getElementById('doll-area');

document.querySelectorAll('[data-clothing]').forEach((item) => {
    item.ondragstart = () => false;
    item.ondragend = () => false;

    item.ondblclick = (event) => {
        document.querySelectorAll('.last-active').forEach((el) => el.classList.remove('last-active'));
        item.parentElement.classList.add('last-active');
    };

    item.onmousedown = (event) => {
        item.classList.add('active');
        item.style.position = 'absolute';
        const offsetX = event.clientX - item.getBoundingClientRect().left;
        const offsetY = event.clientY - item.getBoundingClientRect().top;

        const onMove = (event) => {
            item.style.left = `${event.pageX - offsetX}px`;
            item.style.top = `${event.pageY - offsetY}px`;
        };

        document.addEventListener('mousemove', onMove);

        document.onmouseup = (event) => {
            document.removeEventListener('mousemove', onMove);
            item.style.zIndex = '100'

            if (
                event.clientX < dollArea.getBoundingClientRect().left ||
                event.clientX > dollArea.getBoundingClientRect().right ||
                event.clientY < dollArea.getBoundingClientRect().top ||
                event.clientY > dollArea.getBoundingClientRect().bottom
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
