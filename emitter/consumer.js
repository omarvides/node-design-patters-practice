const request = require('request');
const validator = require('validator');
const { EventEmitter } = require('events').EventEmitter;

class ConsumeUrls extends EventEmitter {
  constructor() {
    super();
    this.endpoints = [];
  }

  addEndpoint(endpoint) {
    if (validator.isURL(endpoint)) {
      this.endpoints.push(endpoint);
      return this;
    }
    // TODO Should do something when is not a valid URL
    return this;
  }

  consume() {
    this.endpoints.forEach((endpoint) => {
      this.emit('request', endpoint);
      request.get(endpoint, (err, response, body) => {
        if (err) {
          this.emit('error', err);
        }
        this.emit('data', { endpoint, body });
      });
    });
    return this;
  }
}

module.exports = ConsumeUrls;
