import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp({
  //set these as env vars
  credential: admin.credential.cert({
    privateKey: functions.config().private.key.replace(/\\n/g, "\n"),
    projectId: functions.config().project.id,
    clientEmail: functions.config().client.email,
  }),
  databaseURL: "https://[project-id-here].firebaseio.com", //replace with your project id
});

const db = admin.firestore();
export { admin, db };
