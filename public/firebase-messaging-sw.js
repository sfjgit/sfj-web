importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCg8bRfs4OlP0e_0HEM6YnxTWi31fzepsg",
  authDomain: "sfj-business-solutions.firebaseapp.com",
  projectId: "sfj-business-solutions",
  storageBucket: "sfj-business-solutions.firebasestorage.app",
  messagingSenderId: "208277903434",
  appId: "1:208277903434:web:695f8e08396d6b4f7faeb3",
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
