import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, TrendingUp, TrendingDown, Info, Bot, Share2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';

export function TestExplanationScreen() {
  const navigate = useNavigate();
  const { testId } = useParams();
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  // Mock test data
  const testData = {
    name: language === 'en' ? 'Complete Blood Count (CBC)' : 'पूर्ण रक्त गणना (CBC)',
    description: language === 'en'
      ? 'A complete blood count test measures several components of your blood, including red blood cells, white blood cells, and platelets.'
      : 'एक पूर्ण रक्त गणना परीक्षण आपके रक्त के कई घटकों को मापता है, जिसमें लाल रक्त कोशिकाएं, सफेद रक्त कोशिकाएं और प्लेटलेट्स शामिल हैं।',
    purpose: language === 'en'
      ? 'Doctors order CBC to check overall health, diagnose infections, detect anemia, and monitor various medical conditions.'
      : 'डॉक्टर सीबीसी की जांच करते हैं ताकि समग्र स्वास्थ्य की जांच हो सके, संक्रमण का निदान हो, एनीमिया का पता लगाया जा सके।',
    components: [
      {
        name: language === 'en' ? 'Red Blood Cells (RBC)' : 'लाल रक्त कोशिकाएं (RBC)',
        normal: '4.5-5.5 million cells/mcL',
        high: language === 'en' ? 'May indicate dehydration or lung disease' : 'निर्जलीकरण या फेफड़ों की बीमारी का संकेत हो सकता है',
        low: language === 'en' ? 'May indicate anemia or blood loss' : 'एनीमिया या रक्त हानि का संकेत हो सकता है',
      },
      {
        name: language === 'en' ? 'White Blood Cells (WBC)' : 'सफेद रक्त कोशिकाएं (WBC)',
        normal: '4,000-11,000 cells/mcL',
        high: language === 'en' ? 'May indicate infection or inflammation' : 'संक्रमण या सूजन का संकेत हो सकता है',
        low: language === 'en' ? 'May indicate weakened immune system' : 'कमजोर प्रतिरक्षा प्रणाली का संकेत हो सकता है',
      },
      {
        name: language === 'en' ? 'Platelets' : 'प्लेटलेट्स',
        normal: '150,000-400,000/mcL',
        high: language === 'en' ? 'May indicate clotting disorder' : 'क्लॉटिंग विकार का संकेत हो सकता है',
        low: language === 'en' ? 'May indicate bleeding disorder' : 'रक्तस्राव विकार का संकेत हो सकता है',
      },
    ],
    relatedTests: [
      language === 'en' ? 'Hemoglobin A1c' : 'हीमोग्लोबिन A1c',
      language === 'en' ? 'Iron Studies' : 'आयरन अध्ययन',
      language === 'en' ? 'Vitamin B12' : 'विटामिन B12',
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate('/reports')} className="p-2 hover:bg-white/10 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl">{language === 'en' ? 'Test Details' : 'परीक्षण विवरण'}</h1>
          </div>
        </div>

        {/* Language Toggle */}
        <div className="flex gap-2">
          <Button
            variant={language === 'en' ? 'default' : 'outline'}
            onClick={() => setLanguage('en')}
            className={`flex-1 ${language === 'en' ? 'bg-white text-orange-600' : 'border-white text-white'}`}
          >
            English
          </Button>
          <Button
            variant={language === 'hi' ? 'default' : 'outline'}
            onClick={() => setLanguage('hi')}
            className={`flex-1 ${language === 'hi' ? 'bg-white text-orange-600' : 'border-white text-white'}`}
          >
            हिंदी
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Test Name */}
        <Card className="border-2 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-orange-500" />
              {testData.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{testData.description}</p>
          </CardContent>
        </Card>

        {/* Why Doctors Order This */}
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="w-5 h-5 text-blue-500" />
              {language === 'en' ? 'Why Doctors Order This Test' : 'डॉक्टर यह परीक्षण क्यों करते हैं'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{testData.purpose}</p>
          </CardContent>
        </Card>

        {/* Components */}
        <Card className="border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="text-lg">
              {language === 'en' ? 'What This Test Checks' : 'यह परीक्षण क्या जांचता है'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {testData.components.map((component, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-semibold text-gray-900">{component.name}</h4>
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">{language === 'en' ? 'Normal Range:' : 'सामान्य सीमा:'}</span> {component.normal}
                  </p>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 bg-red-50 p-3 rounded-lg border border-red-200">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-semibold text-red-900">
                        {language === 'en' ? 'High' : 'उच्च'}
                      </span>
                    </div>
                    <p className="text-xs text-red-800">{component.high}</p>
                  </div>
                  <div className="flex-1 bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingDown className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-semibold text-blue-900">
                        {language === 'en' ? 'Low' : 'निम्न'}
                      </span>
                    </div>
                    <p className="text-xs text-blue-800">{component.low}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Related Tests */}
        <Card className="border-2 border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">
              {language === 'en' ? 'Related Tests' : 'संबंधित परीक्षण'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {testData.relatedTests.map((test, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="text-gray-700">{test}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
          <p className="text-xs text-yellow-900 text-center">
            {language === 'en'
              ? '⚠️ This information is for educational purposes only. Always consult your doctor for medical advice.'
              : '⚠️ यह जानकारी केवल शैक्षिक उद्देश्यों के लिए है। चिकित्सा सलाह के लिए हमेशा अपने डॉक्टर से परामर्श करें।'}
          </p>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
        <div className="flex items-center gap-3">
          <Button
            className="flex-1 bg-[#10C469] hover:bg-[#0da056] text-white text-lg h-14 rounded-2xl shadow-lg shadow-green-200"
          >
            <Bot className="w-6 h-6 mr-2" />
            Ask AI Assistant
          </Button>
          <Button
            className="h-14 w-14 rounded-2xl bg-white border-2 border-gray-100 hover:bg-gray-50 shadow-sm"
            variant="ghost"
          >
            <Share2 className="w-6 h-6 text-[#10C469]" />
          </Button>
        </div>
      </div>
    </div>
  );
}
