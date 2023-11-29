
const content = document.querySelector('.content');
const pageSection = content.querySelector('.places');
const placesList = pageSection.querySelector('.places__list');

function createCard(card, callback) {

    const cardTemplete = document.querySelector('#card-template').content;    
    const cardElement = cardTemplete.querySelector('.card').cloneNode(true);
    
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = card.link;
    cardImage.alt = card.name;

    cardElement.querySelector('.card__title').textContent = card.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click',callback);
    
    return cardElement;
}
function removeCard (e) {
    e.target.closest('.card').remove();
}

initialCards.forEach((item) => {
    const cardElement = createCard(item,removeCard);

    placesList.append(cardElement);
});

