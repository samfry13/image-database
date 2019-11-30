import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import {config} from "../../constants/firebase_config";

// const config = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID
// };

const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      // eslint-disable-next-line no-mixed-operators
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
};


class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
    this.storage = app.storage();
  }

  // *** Auth API ***

  doSignInWithEmailAndPassword = (email, password) =>
      this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  // *** Database API ***

  image = uid => this.db.ref(`images/${uid}`);

  images = () => this.db.ref("images");

  doUploadImage = (title, description, tags, imageFile, onProgressUpdate, onComplete, onError) => {
    const uid = uuidv4();
    const storageRef = this.storage.ref(`images/${uid}`);
    const task = storageRef.put(imageFile, {
      'title': title,
      'description': description,
      'tags': tags.join(","),
    });
    task.on("state_changed",
        (snapshot) => {
          onProgressUpdate && onProgressUpdate((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          onError && onError(error);
        },
        () => {
          storageRef.getDownloadURL().then(url => {
                this.image(uid).set({
                  title: title,
                  description: description,
                  tags: tags.join(","),
                  filePath: url,
                });
                onComplete && onComplete();
              }
          )
        });
  }
}

export default Firebase;