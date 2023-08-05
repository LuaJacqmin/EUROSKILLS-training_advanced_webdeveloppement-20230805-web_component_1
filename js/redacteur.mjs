const redacteur = document.createElement('template')

redacteur.innerHTML = `
<div class="redactor">
    <p><slot class="username"><slot></p>
    <input type="text" class="new-message"/>
    <button class="send">Send message</button>
</div>
`

class Redacteur extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode:'open'})

        this.shadowRoot.appendChild(redacteur.content.cloneNode(true))

        this.user = "";
        
        if(this.hasAttribute('name')){
            this.user = this.getAttribute('name');
            this.shadowRoot.querySelector('.username').innerText = this.user
        }

        this.messageInput = this.shadowRoot.querySelector('.new-message')

        this.button = this.shadowRoot.querySelector('.send')
        this.button.addEventListener('click', this.sendMessage)
    }

    connectedCallback(){
        console.log('mounted')
    }

    disconnectedCallback(){
        console.log('killed')
    }

    sendMessage = (e) => {
        e.preventDefault()
        const newMessageContent = this.messageInput.value;
        this.messageInput.value = ''

        if(newMessageContent.length > 0){
            this.dispatchEvent(new CustomEvent(
                'newMessage', 
                {detail: {
                    message:
                    {
                        "time":  new Date(Date.now()).toUTCString(),
                        "message": newMessageContent,
                        "author": this.user
                    }
                }}
            ))
        }
    }
}

customElements.define('app-redacteur', Redacteur)
export {Redacteur}

