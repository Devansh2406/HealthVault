import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Camera, FileText, CheckCircle, Loader } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import { useApp } from '@/app/context/AppContext';

export function ReportUploadScreen() {
  const navigate = useNavigate();
  const { addReport } = useApp();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [detectedTests, setDetectedTests] = useState<string[]>([]);

  const handleFileSelect = async (type: 'pdf' | 'photo') => {
    setUploading(true);
    setProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setScanning(true);
          // Simulate scanning
          setTimeout(() => {
            setScanning(false);
            setDetectedTests(['Complete Blood Count', 'Lipid Profile', 'Blood Sugar']);
            setCompleted(true);
          }, 2000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleSaveReport = () => {
    addReport({
      id: Date.now().toString(),
      name: detectedTests[0] || 'New Report',
      category: 'Blood Tests',
      date: new Date().toISOString().split('T')[0],
    });
    navigate('/reports');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-white/10 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl">Upload Report</h1>
            <p className="text-blue-100 text-sm">Add your medical reports</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {!uploading && !scanning && !completed && (
          <>
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg">Choose Upload Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => handleFileSelect('pdf')}
                  className="w-full h-16 bg-blue-500 hover:bg-blue-600 text-lg justify-start"
                >
                  <FileText className="w-6 h-6 mr-4" />
                  Upload PDF
                </Button>
                <Button
                  onClick={() => handleFileSelect('photo')}
                  variant="outline"
                  className="w-full h-16 text-lg justify-start border-2"
                >
                  <Camera className="w-6 h-6 mr-4" />
                  Take Photo
                </Button>
              </CardContent>
            </Card>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Tips for better scan:</h3>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Ensure good lighting</li>
                <li>• Keep report flat and straight</li>
                <li>• Capture all pages clearly</li>
                <li>• Make sure text is readable</li>
              </ul>
            </div>
          </>
        )}

        {uploading && (
          <Card className="border-2 border-blue-200">
            <CardContent className="p-6 space-y-4">
              <div className="text-center">
                <Upload className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-bounce" />
                <h3 className="text-lg font-semibold mb-2">Uploading...</h3>
                <p className="text-sm text-gray-600 mb-4">{progress}% complete</p>
                <Progress value={progress} className="h-3" />
              </div>
            </CardContent>
          </Card>
        )}

        {scanning && (
          <Card className="border-2 border-orange-200">
            <CardContent className="p-6 space-y-4">
              <div className="text-center">
                <Loader className="w-16 h-16 text-orange-500 mx-auto mb-4 animate-spin" />
                <h3 className="text-lg font-semibold mb-2">Scanning Report...</h3>
                <p className="text-sm text-gray-600">
                  Analyzing document and extracting test information
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {completed && (
          <>
            <Card className="border-2 border-green-200">
              <CardContent className="p-6 space-y-4">
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Scan Complete!</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    We detected the following tests:
                  </p>
                </div>
                <div className="space-y-2">
                  {detectedTests.map((test, index) => (
                    <div key={index} className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <p className="font-medium text-gray-900">{test}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleSaveReport}
              className="w-full h-14 bg-green-500 hover:bg-green-600 text-lg"
            >
              Save Report
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
