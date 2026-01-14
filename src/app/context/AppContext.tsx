import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name?: string;
  age?: number;
  gender?: string;
  city?: string;
  conditions?: string[];
  language: 'en' | 'hi';
}

interface Report {
  id: string;
  name: string;
  category: string;
  date: string;
  file?: File;
}

interface Reminder {
  id: string;
  testName: string;
  nextDueDate: string;
  frequency: string;
  type: 'sugar' | 'bp' | 'lipid' | 'other';
  enabled: boolean;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  reports: Report[];
  addReport: (report: Report) => void;
  reminders: Reminder[];
  toggleReminder: (id: string) => void;
  addReminder: (reminder: Reminder) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({ language: 'en' });
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      name: 'Complete Blood Count',
      category: 'Blood Tests',
      date: '2025-01-10',
    },
    {
      id: '2',
      name: 'Lipid Profile',
      category: 'Biochemistry',
      date: '2025-01-08',
    },
    {
      id: '3',
      name: 'Thyroid Panel',
      category: 'Hormones',
      date: '2024-12-20',
    },
  ]);

  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      testName: 'Sugar Test (Fasting)',
      frequency: 'Daily',
      nextDueDate: 'Oct 24, 08:00 AM',
      type: 'sugar',
      enabled: true,
    },
    {
      id: '2',
      testName: 'Blood Pressure Check',
      frequency: 'Twice Daily',
      nextDueDate: 'Oct 24, 06:00 PM',
      type: 'bp',
      enabled: true,
    },
    {
      id: '3',
      testName: 'Lipid Profile',
      frequency: 'Every 3 Months',
      nextDueDate: 'Dec 15, 2023',
      type: 'lipid',
      enabled: false,
    },
  ]);

  const addReport = (report: Report) => {
    setReports([report, ...reports]);
  };

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(r =>
      r.id === id ? { ...r, enabled: !r.enabled } : r
    ));
  };

  const addReminder = (reminder: Reminder) => {
    setReminders([...reminders, reminder]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        reports,
        addReport,
        reminders,
        toggleReminder,
        addReminder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
