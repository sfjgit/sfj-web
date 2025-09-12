"use client";

import { useEffect } from "react";
import { getFirebaseMessaging } from "../firebase/firebase";
import { getToken } from "firebase/messaging";

export default function PushNotificationButton() {
  const requestPermission = async () => {
    if (!("Notification" in window)) {
      console.log("Notifications not supported in this browser.");
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Notification permission denied");
      return;
    }

    if ("serviceWorker" in navigator) {
      try {
        await navigator.serviceWorker.register("/firebase-messaging-sw.js");
        console.log("Service Worker registered");
      } catch (err) {
        console.error("Service Worker registration failed", err);
        return;
      }
    }

    const messaging = getFirebaseMessaging();
    if (!messaging) return;

    try {
      const token = await getToken(messaging, {
        vapidKey:
          "BEjDWYUzLGVYGjmHxaV7Fnl1FHiutYrcOOUni4Pi7oyTX1ZMeOUBEomEBjsBHzhseViz3DinjdDd7G3zLAxafqQ",
      });

      if (!token) {
        console.log("No registration token available.");
        return;
      }

      console.log("Push token:", token);
      // Send this token to your server for later notifications
    } catch (err) {
      console.error("Error getting token:", err);
    }
  };

  useEffect(() => {
    // Optionally, you can request permission on component mount
    requestPermission();
  }, []);

  return null;
}
