'use strict';
var OutboundMessage = (function () {
    function OutboundMessage(command, parameters, tags) {
        this.command = command;
        this.parameters = parameters || [];
        this.tags = tags || {};
    }
    OutboundMessage.prototype.toString = function () {
        var _this = this;
        var rawMessage = this.command;
        if (this.parameters.length) {
            var middle = this.parameters.slice(0, -1).join(' ');
            var trailing = this.parameters[this.parameters.length - 1];
            rawMessage += (middle ? ' ' + middle : '') + ' :' + trailing;
        }
        // Prepend any tags
        var tagKeys = Object.keys(this.tags);
        if (tagKeys.length) {
            var tagString = tagKeys.map(function (key) { return _this.tags[key] ? key + '=' + _this.tags[key] : key; }).join(';');
            rawMessage = '@' + tagString + ' ' + rawMessage;
        }
        return rawMessage;
    };
    return OutboundMessage;
})();
exports.OutboundMessage = OutboundMessage;
