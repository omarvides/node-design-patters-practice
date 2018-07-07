const winston = require('winston');
const ConsumerUrl = require('./consumer');

const consumer = new ConsumerUrl();
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
  ],
});

consumer.addEndpoint('http://example.org/')
  .addEndpoint('http://google.com/')
  .addEndpoint('http://reddit.com/')
  .consume()
  .on('request', (endpoint) => {
    logger.info(`Site ${endpoint}`);
  })
  .on('data', (response) => {
    logger.info(`Site ${response.endpoint} response length is ${response.body.length}`);
  })
  .on('error', (err) => {
    logger.error(err);
  });
