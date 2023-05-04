function changeBtn() {
    const subscribeBtn = document.getElementById('subscribeBtn');
    if (subscribeBtn.innerText === 'Subscribe') {
        subscribeBtn.innerHTML = 'Subscribed';
        subscribeBtn.classList.add('is-subscribed');
    } else {
        subscribeBtn.innerHTML = 'Subscribe';
        subscribeBtn.classList.remove('is-subscribed');
    }
}

function calculateTotalCost() {
    const costInput = document.querySelector('.js-cost');
    let costValue = Number(costInput.value);

    if (costValue <= 0) return;

    if (costValue < 40) costValue += 10;

    const existingParagraph = document.querySelector('.new-paragraph');
    if (existingParagraph) {
        existingParagraph.remove();
    }

    const newParagraph = document.createElement('p');
    newParagraph.classList.add('new-paragraph');
    newParagraph.textContent = `Total cost: $${costValue}`;

    const existingElement = document.getElementById('existing-element');
    existingElement.appendChild(newParagraph);
}