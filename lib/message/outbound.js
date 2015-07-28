'use strict'

var OutboundMessage = function(command, parameters, tags) {
    this.command    = command;
    this.parameters = parameters || [];
    this.tags       = tags || [];
};

OutboundMessage.prototype.toString = function() {
    var rawMessage = command;

    if (this.parameters.length) {
        var middle   = this.parameters.slice(0, -1).join(' ');
        var trailing = this.parameters[this.parameters.length - 1];

        rawMessage += (middle ? middle + ' :' : ':') + trailing;
    }

    // Prepend any tags
    if (this.tags.length) {
        rawMessage = '@' + this.tags.join(';') + ' ' + rawMessage;
    }

    return rawMessage;
};

module.exports = OutboundMessage;
