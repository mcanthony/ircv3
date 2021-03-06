'use strict';
var InboundMessage = (function () {
    function InboundMessage() {
        this.raw = '';
        this.prefix = '';
        this.serverName = '';
        this.nick = '';
        this.user = '';
        this.host = '';
        this.command = '';
        this.parameters = [];
        this.tags = {};
    }
    InboundMessage.parse = function (messageString) {
        var index = 0;
        var messageParts = messageString.split(' ');
        var message = new InboundMessage();
        // Parse optional IRCv3 tags
        if (messageParts[index][0] === '@') {
            var tagStrings = messageParts[index].slice(1);
            for (var i = 0; i < tagStrings.length; i++) {
                var keyValuePair = tagStrings[i].split('=');
                message.tags[keyValuePair[0]] = keyValuePair[1] || true;
            }
            index++;
        }
        // Parse the message prefix
        if (messageParts[index][0] === ':') {
            var prefix = messageParts[index].slice(1);
            var parts = prefix.split(/[!@]/);
            message.prefix = prefix;
            switch (parts.length) {
                case 1:
                    message.serverName = parts[0];
                    break;
                case 2:
                    message.nick = parts[0];
                    message.host = parts[1];
                    break;
                case 3:
                    message.nick = parts[0];
                    message.user = parts[1];
                    message.host = parts[2];
                    break;
            }
            index++;
        }
        message.command = messageParts[index];
        index++;
        // Any remaining parts are the command parameters
        for (; index < messageParts.length - 1; index++) {
            message.parameters.push(messageParts[index]);
        }
        // The last parameter (if any) has a ':' before the value
        if (index < messageParts.length) {
            message.parameters.push(messageParts[index].slice(1));
        }
    };
    return InboundMessage;
})();
exports.InboundMessage = InboundMessage;
