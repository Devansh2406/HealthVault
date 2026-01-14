import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Bot, User, Mic, AlertTriangle, Stethoscope, Pill } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { BottomNav } from '@/app/components/BottomNav';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: React.ReactNode;
}

export function SymptomAssistantScreen() {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your Symptom Assistant. Describe your symptoms in detail (e.g., "I have a throbbing headache and nausea"), and I will analyze them for you.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const analyzeSymptoms = (text: string) => {
    const lowerText = text.toLowerCase();

    if (lowerText.includes('headache') || lowerText.includes('head')) {
      return {
        condition: "Tension Headache or Migraine",
        severity: "Moderate",
        remedies: [
          "Rest in a dark, quiet room.",
          "Apply a cold or warm compress to your head/neck.",
          "Stay hydrated.",
        ],
        doctor: "General Physician or Neurologist"
      };
    } else if (lowerText.includes('fever') || lowerText.includes('hot') || lowerText.includes('temperature')) {
      return {
        condition: "Viral Fever or Infection",
        severity: "Moderate to High",
        remedies: [
          "Take plenty of fluids.",
          "Rest adequately.",
          "Use a cool cloth on your forehead.",
        ],
        doctor: "General Physician"
      };
    } else if (lowerText.includes('stomach') || lowerText.includes('pain') || lowerText.includes('belly')) {
      return {
        condition: "Indigestion or Gastritis",
        severity: "Low to Moderate",
        remedies: [
          "Avoid heavy or spicy foods.",
          "Drink ginger tea or warm water.",
          "Use a heating pad on your stomach.",
        ],
        doctor: "Gastroenterologist"
      };
    } else if (lowerText.includes('chest') || lowerText.includes('breath')) {
      return {
        condition: "Potential Respiratory or Cardiac Issue",
        severity: "High (Urgent Attention)",
        remedies: [
          "Sit in a comfortable position.",
          "Avoid exertion.",
          "Seek immediate medical help if pain persists.",
        ],
        doctor: "Cardiologist or Pulmonologist typically"
      };
    }

    return {
      condition: "General Discomfort",
      severity: "Unknown",
      remedies: [
        "Monitor your symptoms closely.",
        "Maintain good hydration and rest.",
        "Keep a log of when symptoms occur.",
      ],
      doctor: "General Physician"
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // User Message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulated Analysis
    setTimeout(() => {
      const analysis = analyzeSymptoms(userMessage.content as string);

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: (
          <div className="space-y-3">
            <p>I've analyzed your symptoms. Here is what I found:</p>

            <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                <span className="font-semibold text-purple-900">Possible Cause</span>
              </div>
              <p className="text-sm text-purple-800">{analysis.condition}</p>
            </div>

            <div className="bg-green-50 rounded-lg p-3 border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <Pill className="w-4 h-4 text-green-600" />
                <span className="font-semibold text-green-800">Home Remedies</span>
              </div>
              <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
                {analysis.remedies.map((remedy, idx) => (
                  <li key={idx}>{remedy}</li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <Stethoscope className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-blue-800">Recommended Doctor</span>
              </div>
              <p className="text-sm text-blue-700">{analysis.doctor}</p>
            </div>

            <p className="text-xs text-gray-500 italic mt-2">
              Disclaimer: This is AI-generated advice. Please consult a real doctor for serious conditions.
            </p>
          </div>
        )
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32 flex flex-col font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7C4DFF] to-[#651FFF] text-white p-6 rounded-b-[2rem] shadow-lg flex-shrink-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Symptom Check</h1>
            <p className="text-purple-100 text-sm opacity-90">AI-powered Analysis</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start max-w-[90%]'}`}
          >
            {message.type === 'bot' && (
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center shadow-sm mt-1">
                <Bot className="w-5 h-5 text-[#651FFF]" />
              </div>
            )}

            <div
              className={`rounded-2xl p-4 shadow-sm ${message.type === 'user'
                  ? 'bg-[#651FFF] text-white rounded-tr-none'
                  : 'bg-white border border-gray-100 rounded-tl-none'
                }`}
            >
              <div className={message.type === 'user' ? 'text-white' : 'text-gray-800'}>
                {message.content}
              </div>
            </div>

            {message.type === 'user' && (
              <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center shadow-sm mt-1">
                <User className="w-5 h-5 text-gray-600" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 max-w-[90%] animate-pulse">
            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center shadow-sm">
              <Bot className="w-5 h-5 text-[#651FFF]" />
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none p-4 shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-purple-100">
        <div className="max-w-md mx-auto flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Describe your symptoms..."
            className="flex-1 h-12 rounded-xl border-purple-100 focus:ring-[#651FFF] focus:border-[#651FFF]"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim()}
            className="h-12 w-12 rounded-xl bg-[#651FFF] hover:bg-[#5e1ce6] shadow-lg shadow-purple-200 p-0 transition-all active:scale-95"
          >
            <Send className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            className="h-12 w-12 rounded-xl p-0 border-purple-100 hover:bg-purple-50 text-purple-600"
          >
            <Mic className="w-5 h-5" />
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="max-w-md mx-auto mt-2">
          <p className="text-[10px] text-center text-gray-400">
            Consult a doctor for proper diagnosis.
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
