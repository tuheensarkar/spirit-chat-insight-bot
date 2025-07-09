
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Declare global gapi types
declare global {
  interface Window {
    gapi: {
      load: (api: string, callback: () => void) => void;
      client: {
        init: (config: any) => Promise<void>;
        calendar: {
          events: {
            insert: (params: any) => Promise<any>;
          };
        };
      };
      auth2: {
        getAuthInstance: () => {
          isSignedIn: {
            get: () => boolean;
          };
          signIn: () => Promise<void>;
        };
      };
    };
  }
}

interface ReminderSettingsProps {
  onScheduleComplete: () => void;
  programType: string;
  topic: string;
}

export const ReminderSettings: React.FC<ReminderSettingsProps> = ({ 
  onScheduleComplete, 
  programType, 
  topic 
}) => {
  const [enableReminders, setEnableReminders] = useState(true);
  const [reminderTime, setReminderTime] = useState('08:00');
  const [syncCalendar, setSyncCalendar] = useState(false);
  const [programDuration, setProgramDuration] = useState('7');
  const [isScheduling, setIsScheduling] = useState(false);
  const { toast } = useToast();

  const scheduleNotifications = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        // Schedule daily notifications for the program duration
        const days = parseInt(programDuration);
        for (let i = 1; i <= days; i++) {
          const notificationDate = new Date();
          notificationDate.setDate(notificationDate.getDate() + i);
          const [hours, minutes] = reminderTime.split(':');
          notificationDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

          // Store notification data in localStorage for persistence
          const notificationId = `dscpl-${programType}-${i}`;
          localStorage.setItem(notificationId, JSON.stringify({
            title: `DSCPL Daily ${programType}`,
            body: `Time for your daily ${topic} session`,
            scheduledTime: notificationDate.toISOString(),
            programType,
            topic,
            day: i
          }));
        }
        
        toast({
          title: "Notifications Scheduled",
          description: `Daily reminders set for ${days} days at ${reminderTime}`,
        });
      }
    }
  };

  const scheduleGoogleCalendar = async () => {
    try {
      // Initialize Google Calendar API
      if (typeof window !== 'undefined' && window.gapi) {
        await new Promise<void>((resolve) => {
          window.gapi.load('client:auth2', resolve);
        });

        await window.gapi.client.init({
          clientId: '56351045591-8fhtsugc1gt9s4q5cmcp57hste7ma49d.apps.googleusercontent.com',
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
          scope: 'https://www.googleapis.com/auth/calendar.events'
        });

        const authInstance = window.gapi.auth2.getAuthInstance();
        if (!authInstance.isSignedIn.get()) {
          await authInstance.signIn();
        }

        // Create calendar events for each day
        const days = parseInt(programDuration);
        for (let i = 1; i <= days; i++) {
          const eventDate = new Date();
          eventDate.setDate(eventDate.getDate() + i);
          const [hours, minutes] = reminderTime.split(':');
          eventDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
          
          const endDate = new Date(eventDate);
          endDate.setMinutes(endDate.getMinutes() + 30); // 30-minute duration

          const event = {
            summary: `DSCPL Daily ${programType} - ${topic}`,
            description: `Your daily spiritual ${programType} session focusing on ${topic}. Take 15-30 minutes to connect with God.`,
            start: {
              dateTime: eventDate.toISOString(),
              timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            end: {
              dateTime: endDate.toISOString(),
              timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'popup', minutes: 10 },
                { method: 'email', minutes: 60 }
              ]
            }
          };

          await window.gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: event
          });
        }

        toast({
          title: "Calendar Events Created",
          description: `${days} events added to your Google Calendar`,
        });
      }
    } catch (error) {
      console.error('Error scheduling calendar events:', error);
      toast({
        title: "Calendar Sync Failed",
        description: "Unable to sync with Google Calendar. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSchedule = async () => {
    setIsScheduling(true);
    
    try {
      if (enableReminders) {
        await scheduleNotifications();
      }
      
      if (syncCalendar) {
        await scheduleGoogleCalendar();
      }
      
      toast({
        title: "Program Scheduled Successfully",
        description: `Your ${programDuration}-day ${programType} program is ready to begin!`,
      });
      
      onScheduleComplete();
    } catch (error) {
      console.error('Error scheduling program:', error);
      toast({
        title: "Scheduling Failed",
        description: "There was an error setting up your program. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsScheduling(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Schedule Your Program
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="enable-reminders" className="flex items-center">
              <Bell className="w-4 h-4 mr-2" />
              Daily Reminders
            </Label>
            <Switch
              id="enable-reminders"
              checked={enableReminders}
              onCheckedChange={setEnableReminders}
            />
          </div>

          {enableReminders && (
            <div className="space-y-2">
              <Label htmlFor="reminder-time" className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Reminder Time
              </Label>
              <input
                id="reminder-time"
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <Label htmlFor="sync-calendar">Google Calendar Sync</Label>
            <Switch
              id="sync-calendar"
              checked={syncCalendar}
              onCheckedChange={setSyncCalendar}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="program-duration">Program Duration</Label>
            <Select value={programDuration} onValueChange={setProgramDuration}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 Days</SelectItem>
                <SelectItem value="14">14 Days</SelectItem>
                <SelectItem value="30">30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">Your Program Summary</h3>
          <p className="text-sm text-blue-800">
            <strong>{programDuration}-day {programType}</strong> focusing on <strong>{topic}</strong>
          </p>
          <p className="text-sm text-blue-600 mt-1">
            By the end of this program, you will feel more connected to God and confident in your spiritual journey.
          </p>
        </div>

        <Button 
          onClick={handleSchedule} 
          className="w-full" 
          disabled={isScheduling}
        >
          {isScheduling ? 'Scheduling...' : 'Begin Program'}
        </Button>
      </CardContent>
    </Card>
  );
};
