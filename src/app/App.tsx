import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Screens
import { LoginScreen } from '@/app/components/screens/LoginScreen';
import { HomeScreen } from '@/app/components/screens/HomeScreen';
import { ReportUploadScreen } from '@/app/components/screens/ReportUploadScreen';
import { ReportsVaultScreen } from '@/app/components/screens/ReportsVaultScreen';
import { TestExplanationScreen } from '@/app/components/screens/TestExplanationScreen';
import { SymptomAssistantScreen } from '@/app/components/screens/SymptomAssistantScreen';
import { RiskResultScreen } from '@/app/components/screens/RiskResultScreen';
import { RemindersScreen } from '@/app/components/screens/RemindersScreen';
import { ProfileScreen } from '@/app/components/screens/ProfileScreen';
import { AssistantScreen } from '@/app/components/screens/AssistantScreen';

// Context for user data
import { AppProvider } from '@/app/context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/upload" element={<ReportUploadScreen />} />
            <Route path="/assistant" element={<AssistantScreen />} />
            <Route path="/reports" element={<ReportsVaultScreen />} />
            <Route path="/test/:testId" element={<TestExplanationScreen />} />
            <Route path="/symptom-check" element={<SymptomAssistantScreen />} />
            <Route path="/risk-result" element={<RiskResultScreen />} />
            <Route path="/reminders" element={<RemindersScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}