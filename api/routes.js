const news = require('./news');
const webPush = require('web-push');
const pushRoutes = require('./push-routes');

function getNews(request, response) {
  return response.json(news);
}

function addNews(request, response) {
  const freshNews = request.body;
  news.push(freshNews);
  const subscription = JSON.parse(pushRoutes.getSubscription());
  if (subscription) {
    webPush.sendNotification(subscription, JSON.stringify(freshNews))
      .then(() => response.json(news))
      .catch(error => console.error('Push notification error', error));
  } else {
    return response.json(news);
  }
}

module.exports = {
  getNews,
  addNews
};
