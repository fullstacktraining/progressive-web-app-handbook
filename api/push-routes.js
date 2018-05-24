const webPush = require('web-push');
const keys = webPush.generateVAPIDKeys();
let savedSubscription = null;

// in practice, the host should be HTTPS
webPush.setVapidDetails(
  'http://localhost/',
  keys.publicKey,
  keys.privateKey
);

function vapidPublicKey(request, response) {
  response.json(keys.publicKey);
}

function saveSubscription(request, response) {
  const subscription = request.body.subscription;
  savedSubscription = JSON.stringify(subscription);
  return response.json();
}

function getSubscription() {
  return savedSubscription;
}

module.exports = {
  vapidPublicKey,
  saveSubscription,
  getSubscription
};
