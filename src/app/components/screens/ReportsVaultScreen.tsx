import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Search, TrendingUp, Plus } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { useApp } from '@/app/context/AppContext';
import { BottomNav } from '@/app/components/BottomNav';

export function ReportsVaultScreen() {
  const navigate = useNavigate();
  const { reports } = useApp();
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'Blood', 'Biochemistry', 'Hormones', 'Imaging'];

  const mockReports = [
    {
      id: '1',
      name: 'CBC & Lipid Profile',
      lab: 'Apollo Diagnostics',
      date: '12 Aug 2023',
      status: 'NORMAL',
      statusColor: 'bg-green-500',
      icon: '🩸',
      iconBg: 'bg-green-100',
      month: 'AUGUST 2023',
    },
    {
      id: '2',
      name: 'Thyroid Profile (T3, T4, TSH)',
      lab: 'Thyrocare',
      date: '15 Jul 2023',
      status: 'ATTENTION',
      statusColor: 'bg-orange-500',
      icon: '⚠️',
      iconBg: 'bg-orange-100',
      month: 'AUGUST 2023',
    },
    {
      id: '3',
      name: 'Chest X-Ray PA View',
      lab: 'Max Healthcare',
      date: '02 Jun 2023',
      status: 'REVIEWED',
      statusColor: 'bg-blue-500',
      icon: '📋',
      iconBg: 'bg-blue-100',
      month: 'AUGUST 2023',
    },
    {
      id: '4',
      name: 'Annual Health Checkup',
      lab: 'Fortis Hospital',
      date: '10 Mar 2023',
      status: '',
      statusColor: '',
      icon: '🏥',
      iconBg: 'bg-green-100',
      month: 'MARCH 2023',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fa] pb-24">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-100">
        <button onClick={() => navigate('/')}>
          <User className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Report Vault</h1>
        <button>
          <Search className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Category Tabs */}
      <div className="bg-white px-4 py-3 flex gap-6 overflow-x-auto border-b-2 border-gray-100">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`text-sm font-semibold whitespace-nowrap pb-2 border-b-2 transition-colors ${
              activeTab === cat
                ? 'text-[#00D66C] border-[#00D66C]'
                : 'text-gray-500 border-transparent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* AI Summary Card */}
        <Card className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-5 border-2 border-green-200">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-green-600 text-xs font-bold">✨ AI SUMMARY</span>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Quick Health Check</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Glucose levels are slightly high according to ICMR guidelines. Consider reducing sugar intake.
              </p>
            </div>
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0 ml-3">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </Card>

        {/* Timeline */}
        <div className="space-y-6">
          {['AUGUST 2023', 'MARCH 2023'].map((month, monthIndex) => (
            <div key={month}>
              {/* Month Header */}
              <h3 className="text-xs font-bold text-gray-400 mb-4 tracking-wider">{month}</h3>

              {/* Reports */}
              <div className="space-y-3 relative">
                {/* Timeline Line */}
                <div className="absolute left-5 top-8 bottom-8 w-px bg-gray-200" />

                {mockReports
                  .filter((r) => r.month === month)
                  .map((report) => (
                    <Link key={report.id} to={`/test/${report.id}`}>
                      <Card className="bg-white rounded-2xl p-4 hover:shadow-lg transition-shadow border border-gray-100 relative">
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className={`w-11 h-11 ${report.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 relative z-10`}>
                            <span className="text-xl">{report.icon}</span>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h3 className="font-bold text-gray-900 text-sm leading-tight">
                                {report.name}
                              </h3>
                              {report.status && (
                                <span className={`${report.statusColor} text-white text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap`}>
                                  {report.status}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500">
                              {report.lab} • {report.date}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => navigate('/upload')}
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#00D66C] rounded-full shadow-lg flex items-center justify-center hover:bg-[#00bf5f] transition-colors"
      >
        <Plus className="w-7 h-7 text-white" />
      </button>

      <BottomNav />
    </div>
  );
}
