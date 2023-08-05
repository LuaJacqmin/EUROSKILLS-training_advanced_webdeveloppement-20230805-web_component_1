const historyMessage = document.createElement('template')

historyMessage.innerHTML = `
    <div class="history">
        <p>all messages</p>
        <ul class="messages"></ul>
    </div>
`

class History extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode: 'open'})
        
        this.allmessages = []

        this.shadowRoot.appendChild(historyMessage.content.cloneNode(true))

        this.parentMessage = this.shadowRoot.querySelector('.messages')
    }

    static get observedAttributes(){
        return ['new-message']
    }

    attributeChangedCallback(){
        const newMessage = JSON.parse(this.getAttribute('new-message'))

        this.allmessages = [...this.allmessages, newMessage]
        this.DOMmessage = []

        this.allmessages.forEach(message => {
            this.DOMmessage = [...this.DOMmessage, `
                <li>
                    <p>${message.author}</p>
                    <p>${message.time}</p>
                    <p>${message.message}</p>
                </li>
            `]
        });

        this.parentMessage.innerHTML = this.DOMmessage.join('')    
    }
}

customElements.define('app-history', History)
export {History};