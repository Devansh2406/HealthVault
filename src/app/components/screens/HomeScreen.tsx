import { Link } from 'react-router-dom';
import { User, Bell, Plus, FileText, Activity, BookOpen, Pill, ChevronRight } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { BottomNav } from '@/app/components/BottomNav';

export function HomeScreen() {
  return (
    <div className="min-h-screen bg-[#f5f7fa] pb-20">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
            <span className="text-white text-lg">🙏</span>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Namaste,</p>
            <h1 className="text-lg font-bold text-gray-900">Swasthya Sathi</h1>
          </div>
        </div>
        <button className="p-2">
          <Bell className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Emergency Assistance */}
        <Card className="bg-red-50 border-2 border-red-200 rounded-2xl overflow-hidden">
          <div className="p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-lg">✱</span>
              </div>
              <div>
                <h3 className="font-bold text-red-900 text-sm uppercase tracking-wide">
                  Emergency Assistance
                </h3>
                <p className="text-sm text-red-700 mt-1">
                  Need immediate help? Call 108
                </p>
              </div>
            </div>
            <Button
              className="w-full h-12 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold"
              onClick={() => window.location.href = 'tel:108'}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call Ambulance
            </Button>
          </div>
        </Card>

        {/* Your Health Section */}
        <div>
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Your Health</h2>
            <p className="text-sm text-green-600">Quick access to your medical history</p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Upload Report - Large */}
            <Link to="/upload" className="col-span-2">
              <Card className="bg-[#00D66C] rounded-2xl p-6 min-h-[140px] flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Plus className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Upload Report</h3>
                  <p className="text-sm text-white/90 mt-1">Scan new documents</p>
                </div>
              </Card>
            </Link>

            {/* My Reports */}
            <Link to="/reports">
              <Card className="bg-white rounded-2xl p-5 min-h-[140px] flex flex-col justify-between hover:shadow-lg transition-shadow border border-gray-100">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[#00D66C]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">My Reports</h3>
                  <p className="text-xs text-gray-500 mt-1">History & Timeline</p>
                </div>
              </Card>
            </Link>

            {/* Symptom Check */}
            <Link to="/symptom-check">
              <Card className="bg-white rounded-2xl p-5 min-h-[140px] flex flex-col justify-between hover:shadow-lg transition-shadow border border-gray-100">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-[#00D66C]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Symptom Check</h3>
                  <p className="text-xs text-gray-500 mt-1">Check how you feel</p>
                </div>
              </Card>
            </Link>

            {/* Test Library */}
            <Link to="/test/sample" className="col-span-2">
              <Card className="bg-white rounded-2xl p-5 min-h-[140px] flex flex-col justify-between hover:shadow-lg transition-shadow border border-gray-100">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[#00D66C]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Test Library</h3>
                  <p className="text-xs text-gray-500 mt-1">Understand terms</p>
                </div>
              </Card>
            </Link>
          </div>
        </div>

        {/* Reminders Card */}
        <Link to="/reminders">
          <Card className="bg-white rounded-2xl p-5 hover:shadow-lg transition-shadow border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                  <Pill className="w-5 h-5 text-[#00D66C]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Reminders</h3>
                  <p className="text-xs text-green-600">2 Medicines pending for today</p>
                </div>
              </div>
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">💊</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-auto px-4 h-9 rounded-full border-2 border-green-200 text-green-700 hover:bg-green-50 text-sm font-semibold"
            >
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Card>
        </Link>

        {/* Daily Health Tip */}
        <Card className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-5 border border-green-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg">💡</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-2">Daily Health Tip</h3>
              <p className="text-xs text-gray-700 leading-relaxed">
                Drink 8 glasses of water daily for better kidney health according to local guidelines.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
