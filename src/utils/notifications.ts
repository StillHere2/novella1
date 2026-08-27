// Notifications helper for Web Notifications and In-App Push Simulation
import { playMessageReceive } from './audio';

export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    return false;
  }
  if (Notification.permission === 'granted') {
    return true;
  }
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
}

export function sendGameNotification(title: string, body: string, soundEnabled = true) {
  if (soundEnabled) {
    playMessageReceive();
  }

  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
      });
    } catch {
      // Notification failed in iframe sandbox, fall back to in-app
    }
  }
}
