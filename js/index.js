import { Redacteur } from "./redacteur.mjs";
import { History } from "./history.mjs";


// listening to new message
const redacteurs = document.querySelectorAll('app-redacteur')
const history = document.querySelector('app-history');

redacteurs.forEach(redacteur => {
    redacteur.addEventListener('newMessage', e => {
        e.preventDefault()

        history.setAttribute('new-message', JSON.stringify(e.detail.message))
    })
});

