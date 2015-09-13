'use strict';

export class OutboundMessage {
    command:    string;
    parameters: string[];
    tags:       { [key:string]: string; };

    constructor(command: string, parameters: string[],
                tags: {[key:string]: string}) {

        this.command    = command;
        this.parameters = parameters || [];
        this.tags       = tags || {};
    }

    public toString() {
        let rawMessage = this.command;

        if (this.parameters.length) {
            let middle   = this.parameters.slice(0, -1).join(' ');
            let trailing = this.parameters[this.parameters.length - 1];

            rawMessage += (middle ? ' ' + middle : '') + ' :' + trailing;
        }

        // Prepend any tags
        let tagKeys = Object.keys(this.tags);

        if (tagKeys.length) {
            let tagString = tagKeys.map(
                key => this.tags[key] ? key + '=' + this.tags[key] : key
            ).join(';');

            rawMessage = '@' + tagString + ' ' + rawMessage;
        }

        return rawMessage;
    }
}
