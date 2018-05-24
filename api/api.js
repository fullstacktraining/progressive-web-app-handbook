const restify = require('restify');
const routes = require('./routes');
const pushRoutes = require('./push-routes');

const corsMiddleware = require('restify-cors-middleware');
// Change this port, if required
const port = 3000;

const server = restify.createServer();

// do not do this in production, we are allowing CORS for everything
const cors = corsMiddleware({
  origins: ['*'],
});

server.use(restify.plugins.bodyParser());
server.pre(cors.preflight);
server.use(cors.actual);

server.get('/api/news', routes.getNews);
server.post('/api/news', routes.addNews);

server.get('/api/getPublicKey', pushRoutes.vapidPublicKey);
server.post('/api/saveSubscription', pushRoutes.saveSubscription);

server.listen(port, () => console.log(`API Server is up on ${port}.`));