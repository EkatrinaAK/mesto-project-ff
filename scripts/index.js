
const content = document.querySelector('.content');
const pageSection = content.querySelector('.places');
const placesList = pageSection.querySelector('.places__list');

function addCard(name, link, onRemoveCard) {

    const cardTemplete = document.querySelector('#card-template').content;    
    const cardElement = cardTemplete.querySelector('.card').cloneNode(true);
    
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = name;

    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        onRemoveCard(cardElement)
    });
    placesList.append(cardElement);
}

initialCards.forEach((item) => {
    addCard(item.name, item.link, (e) => {
        e.remove();
    })   
});

