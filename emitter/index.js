const winston = require('winston');
const ConsumerClass = require('./consumer');

const consumer = new ConsumerClass();
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
  ],
});

consumer.addEndpoint('http://example.org/')
  .addEndpoint('http://google.com/')
  .addEndpoint('http://reddit.com/')
  .consume()
  .on('data', (response) => {
    logger.info(`Site ${response.endpoint} response length is ${response.body.length}`);
  })
  .on('error', (err) => {
    logger.error(err);
  });
