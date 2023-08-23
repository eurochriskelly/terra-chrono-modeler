import * as L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import { II, DD, EE, WW } from '../../common/log.js';

export class CommandHandler {
    constructor(EFV) {
        this.EFV = EFV;
    }
    async submitCommand(e) {
        if (e.key === 'Enter') {
            const command = e.target.value;

            // insert some text "ready" in a div with id "commandArea"
            await this.processCommand(command);
            e.target.value = '';
        }
    }
    toggleTextArea() {
        const textArea = document.getElementById('commandArea');
        const footer = document.getElementById('footer');
        if (textArea.style.display === 'none') {
            textArea.style.display = 'block';
            footer.style.height = '100px';
        } else {
            textArea.style.display = 'none';
            footer.style.height = '30px';
        }
    }

    // process command
    async processCommand(command) {
        const parts = command.split(' ');
        const cmd = parts[0];
        const args = parts.slice(1);
        const ML_URL = `/api/command`;
        const body = { cmd, args }
        DD(`Sending command [${cmd}] to server...`)
        const payload = await this.EFV.ds.fetch(ML_URL, body)
        if (payload.message) {
            // display the message in the div with id "commandArea" as new innerHTML
            const commandArea = document.getElementById('commandArea');
            const message = document.createElement('div');
            commandArea.innerHTML = payload.message;
            // commandArea.appendChild(message);

        }
        this.processAction(payload)
    }

    // process action
    processAction(payload) {
        II('Processing action ...')
        if (!(payload.actions && payload.actions.length)) {
            return
        }
        const { actions, data } = payload
        if (actions.includes('drawData')) {
            data.forEach(d => {
                this.EFV.draw(d)
            })
        }

    }
}
