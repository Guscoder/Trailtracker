import { serviceAccount } from './serviceAccountKey';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

exports.removeUser = functions.database
  .ref('/users/{uid}')
  .onDelete((snapshot, context) => {
    console.log(snapshot.val());
    console.log(context.params);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://trailtracker-1060b.firebaseio.com',
    });
    return admin.auth().deleteUser(context.params.uid);
  });

exports.registerUser = functions.https.onCall((data) => {
  response.set('Access-Control-Allow-Origin', 'http://localhost:3000');

  cors(request, response, () => {
    const { email, password } = data;

    response.status(200).send(admin.auth().createUser(email, password));
  });
  return;
});

// exports.registerUser = functions.https.onCall((data) => {
//   admin.initializeApp();
//   const { email, password } = data;

//   return admin
//     .auth()
//     .createUser(email, password)
//     .catch((error) => {
//       throw new functions.https.HttpsError('internal', error.message);
//     });
// });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
