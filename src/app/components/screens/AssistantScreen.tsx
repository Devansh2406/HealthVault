import { useState, useRef, useEffect } from 'react';
import { Send, Bot, FileText, Paperclip, X, Loader2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { BottomNav } from '@/app/components/BottomNav';

type Message = {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    type?: 'text' | 'report-analysis';
    timestamp: Date;
};

export function AssistantScreen() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! I'm your Swasthya Sathi AI. I can help explain your medical reports, suggest home remedies, or answer health questions. How can I help today?",
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            let aiResponseText = "I understand. Could you please provide more details or upload a report?";

            const lowerInput = userMsg.text.toLowerCase();
            if (lowerInput.includes('report') || lowerInput.includes('blood') || lowerInput.includes('test')) {
                aiResponseText = "I can analyze that report for you. Please use the attachment icon to upload your report photo or PDF.";
            } else if (lowerInput.includes('headache') || lowerInput.includes('fever')) {
                aiResponseText = "I'm sorry to hear you're not feeling well. For common headaches, hydration and rest are key. However, if symptoms persist, please inspect your symptoms in our 'Symptom Check' section.";
            }

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: aiResponseText,
                sender: 'ai',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const handleAnalyzeReport = () => {
        // Simulate report upload and analysis
        const userMsg: Message = {
            id: Date.now().toString(),
            text: "Analyze my latest blood report",
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        setTimeout(() => {
            const analysisMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: "**Report Analysis Complete**\n\nI've reviewed your Complete Blood Count (CBC).\n\n**Key Findings:**\n- **Hemoglobin:** 13.5 g/dL (Normal)\n- **WBC:** 11,000 /cumm (Slightly High) - This typically indicates a minor infection or inflammation.\n- **Platelets:** 2.5 Lakhs (Normal)\n\n**Recommendation:**\nThe slightly elevated WBC count suggests your body might be fighting a mild infection. Make sure to stay hydrated and rest. If you have fever, consult a doctor.",
                sender: 'ai',
                type: 'report-analysis',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, analysisMsg]);
            setIsTyping(false);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans mb-16">
            {/* Header */}
            <div className="bg-white p-4 shadow-sm flex items-center gap-3 sticky top-0 z-10">
                <div className="w-10 h-10 bg-gradient-to-tr from-[#00D66C] to-[#00E5FF] rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="font-bold text-lg text-gray-800">AI Health Assistant</h1>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <p className="text-xs text-green-600 font-medium">Online & Ready</p>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto pb-24">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${msg.sender === 'user'
                                    ? 'bg-[#00D66C] text-white rounded-tr-none'
                                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                                }`}
                        >
                            <div className="text-sm whitespace-pre-line leading-relaxed">
                                {msg.text}
                            </div>
                            <p className={`text-[10px] mt-2 ${msg.sender === 'user' ? 'text-green-100' : 'text-gray-400'}`}>
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white rounded-2xl rounded-tl-none border border-gray-100 p-4 shadow-sm flex items-center gap-2">
                            <Loader2 className="w-4 h-4 text-[#00D66C] animate-spin" />
                            <span className="text-xs text-gray-500">Analyzing...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t border-gray-100">
                <div className="flex items-center gap-2 max-w-md mx-auto">
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full shrink-0 border-gray-200 text-gray-500 hover:text-[#00D66C] hover:bg-green-50 hover:border-green-200"
                        onClick={handleAnalyzeReport}
                    >
                        <Paperclip className="w-5 h-5" />
                    </Button>
                    <div className="relative flex-1">
                        <Input
                            placeholder="Ask anything or upload report..."
                            className="pr-10 rounded-full border-gray-200 focus:ring-[#00D66C] focus:border-[#00D66C] py-6"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                    </div>
                    <Button
                        className="rounded-full w-12 h-12 shrink-0 bg-[#00D66C] hover:bg-[#00c462] shadow-lg shadow-green-200"
                        onClick={handleSendMessage}
                    >
                        <Send className="w-5 h-5 text-white ml-0.5" />
                    </Button>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
