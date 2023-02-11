const admin = require('firebase-admin');

var serviceAccount = require("./serviceKey.json");
var { getStorage } = require("firebase-admin/storage");
require("dotenv").config();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://housing-buddy-402b5.firebaseio.com'
});

const db = admin.firestore();
module.exports = {db};