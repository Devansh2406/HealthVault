import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Share2, Download, AlertTriangle, CheckCircle, Pill, FileText, Activity } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { useApp } from '@/app/context/AppContext';

export function TestExplanationScreen() {
  const navigate = useNavigate();
  const { testId } = useParams();
  const { reports, addReminder } = useApp();

  const report = reports.find(r => r.id === testId);

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Report Not Found</h2>
        <p className="text-gray-500 mb-6">The report you are looking for does not exist or has been removed.</p>
        <Button onClick={() => navigate('/reports')}>Go Back to Vault</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
        <button onClick={() => navigate('/reports')} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 truncate max-w-[200px]">{report.name}</h1>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Date and Basic Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 px-1">
          <span>Uploaded on {report.date}</span>
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">{report.category}</span>
        </div>

        {/* AI Analysis Summary */}
        <Card className="border-none shadow-sm bg-gradient-to-br from-purple-50 to-white overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-5 h-5 text-purple-600" />
              <h3 className="font-bold text-purple-900">AI Analysis</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm">
              {report.analysis || "AI analysis is pending. Please check back shortly."}
            </p>
          </CardContent>
        </Card>

        {/* Key Findings */}
        <div>
          <h3 className="font-bold text-gray-900 mb-3 px-1">Key Findings</h3>
          <div className="grid gap-3">
            {(report.keyFindings || [report.name]).map((finding, idx) => (
              <Card key={idx} className="border-l-4 border-l-orange-400 shadow-sm">
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="bg-orange-100 p-2 rounded-full shrink-0">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">{finding}</h4>
                    <p className="text-xs text-gray-500 mt-1">Found in report analysis</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Medicines Detected */}
        {report.medicines && report.medicines.length > 0 && (
          <div>
            <h3 className="font-bold text-gray-900 mb-3 px-1">Prescribed Medicines</h3>
            <div className="space-y-3">
              {report.medicines.map((med, idx) => (
                <Card key={idx} className="shadow-sm border-l-4 border-l-green-500">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Pill className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="font-medium text-gray-800">{med}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-green-600 hover:text-green-700 h-8 text-xs"
                      onClick={() => {
                        addReminder({
                          id: Date.now().toString() + idx,
                          testName: med,
                          frequency: 'Daily',
                          nextDueDate: 'Daily',
                          type: 'medicine',
                          enabled: true
                        });
                        navigate('/reminders');
                      }}
                    >
                      Set Reminder
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Summary (if available) */}
        {report.summary && (
          <Card className="bg-gray-50 border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <h4 className="font-bold text-gray-700 text-sm">Full Summary</h4>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{report.summary}</p>
            </CardContent>
          </Card>
        )}

      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 flex gap-3">
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
          <Download className="w-4 h-4 mr-2" /> Download Original
        </Button>
      </div>
    </div>
  );
}
