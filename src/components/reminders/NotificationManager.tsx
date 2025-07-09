
import { useEffect } from 'react';

export const NotificationManager = () => {
  useEffect(() => {
    // Check for scheduled notifications every minute
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM format
      
      // Check localStorage for scheduled notifications
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('dscpl-')) {
          try {
            const notificationData = JSON.parse(localStorage.getItem(key) || '');
            const scheduledTime = new Date(notificationData.scheduledTime);
            
            // If it's time for this notification (within 1 minute window)
            if (Math.abs(now.getTime() - scheduledTime.getTime()) < 60000) {
              // Show notification
              if ('Notification' in window && Notification.permission === 'granted') {
                new Notification(notificationData.title, {
                  body: notificationData.body,
                  icon: '/favicon.ico',
                  badge: '/favicon.ico',
                  tag: key,
                  requireInteraction: true
                });
              }
              
              // Remove the notification from storage after showing
              localStorage.removeItem(key);
            }
          } catch (error) {
            console.error('Error processing notification:', error);
            localStorage.removeItem(key);
          }
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return null; // This component doesn't render anything
};
