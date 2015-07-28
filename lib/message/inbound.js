'use strict'

var InboundMessage = function(string) {
    // Declare all of the properties ahead of time for visibility
    this.raw        = string;
    this.prefix     = null;
    this.serverName = null;
    this.nick       = null;
    this.user       = null;
    this.host       = null;
    this.command    = null;
    this.parameters = [];
    this.tags       = Object.create(null);

    var messageParts = string.split(' ');
    var index        = 0;

    if (messageParts[index][0] === '@') {
        var tagStrings = messageParts[index].slice(1);

        for (var i = 0; i < tagStrings.length; i++) {
            var keyValuePair = tagStrings[i].split('=');

            this.tags[keyValuePair[0]] = keyValuePair[1] || true;
        }

        index++;
    }

    // Parse the message prefix
    if (messageParts[index][0] === ':') {
        var prefix    = string.slice(1, messageParts[index]);
        var parts     = prefix.split(/[!@]/);

        switch (parts.length) {
            case 1:
                this.servername = parts[0];
                break;
            case 2:
                this.nick = parts[0];
                this.host = parts[1];
                break;
            case 3:
                this.nick = parts[0];
                this.user = parts[1];
                this.host = parts[2];
                break;
        }

        this.prefix = prefix;

        index++;
    }

    this.command = messageParts[index];
    index++;

    // Any remaining parts are the parameters
    for (; index < messageParts.length - 1; index++) {
        this.parameters.push(messageParts[index]);
    }

    // The last parameter (if any) has a ':' before the value
    if (index < messageParts.length) {
        this.parameters.push(messageParts[index].slice(1));
    }
};

module.exports = InboundMessage;
