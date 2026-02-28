import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Search, Store, HelpCircle, Trash2, Volume2, VolumeX } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string; // Store as string for localStorage
}

interface AIAssistantProps {
  lang: 'ar' | 'en';
  theme: 'light' | 'dark';
  products: any[];
  categories: any[];
  searchQuery: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ lang, theme, products, categories, searchQuery }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Load messages from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('mahalk_chat_history');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error("Failed to parse chat history", e);
      }
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('mahalk_chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  // Proactive bubble after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && messages.length === 0) setShowBubble(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setShowBubble(false);
      const greeting = lang === 'ar' 
        ? "مرحبًا! أنا مساعدك الذكي في منصة **محلك**. 🌟\n\nأنا هنا لمساعدتك في:\n- 🔍 البحث عن أفضل المنتجات في جرجا.\n- 🏪 تسجيل متجرك والبدء في البيع.\n- ❓ الإجابة على استفساراتك حول التوصيل والدفع.\n\nكيف يمكنني مساعدتك اليوم؟"
        : "Hello! I'm your smart assistant at **Mahallk**. 🌟\n\nI can help you with:\n- 🔍 Finding the best products in Girga.\n- 🏪 Registering your store and starting to sell.\n- ❓ Answering your questions about delivery and payment.\n\nHow can I assist you today?";
      
      setMessages([{
        id: '1',
        role: 'assistant',
        content: greeting,
        timestamp: new Date().toISOString()
      }]);
    }
  }, [isOpen, lang, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const clearChat = () => {
    if (window.confirm(lang === 'ar' ? 'هل تريد مسح سجل المحادثة؟' : 'Do you want to clear chat history?')) {
      setMessages([]);
      localStorage.removeItem('mahalk_chat_history');
    }
  };

  const speak = (text: string) => {
    if (isMuted) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    if (!overrideInput) setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const model = "gemini-3-flash-preview";

      const systemInstruction = `You are the Mahallk AI Assistant, a helpful and friendly expert on the Mahallk platform.
      Mahallk is the premier digital marketplace for local stores in Girga, Sohag, Egypt.
      
      Your Personality:
      - Professional yet warm and approachable.
      - Expert in local Girga commerce.
      - Multilingual (Arabic and English).
      - Proactive but not intrusive.

      Your Capabilities:
      1. Product Search: Help users find items. Use the provided product list.
      2. Seller Support: Guide people on how to join Mahallk.
      3. Girga Local Knowledge: Mention that Mahallk is specifically for Girga residents.
      4. FAQ: Handle returns, payments, and delivery.
      5. Privacy: Always mention 'نحن نحترم خصوصيتك ولن نشارك بياناتك مع أي طرف ثالث.' if asked about data.

      Current Context:
      - User Language: ${lang}
      - Current Page Search: "${searchQuery}"
      - Categories: ${JSON.stringify(categories.map(c => ({ nameAr: c.nameAr, nameEn: c.nameEn })))}
      - Featured Products: ${JSON.stringify(products.slice(0, 10).map(p => ({ nameAr: p.nameAr, nameEn: p.name, price: p.price, category: p.category })))}

      Formatting:
      - Use Markdown (bold, lists, emojis) to make responses readable.
      - Keep responses concise (max 3-4 sentences unless explaining a process).
      - Always end with a helpful follow-up question.

      Specific Data:
      - Returns: 14 days, original condition.
      - Payment: Cash on Delivery, Cards, Fawry.
      - Location: Girga, Sohag.

      If the user is looking for electronics, recommend the Samsung or Anker chargers specifically.
      If the user wants to sell, explain that registration is free and easy for Girga shop owners.`;

      const chatHistory = messages.slice(-10).map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContent({
        model: model,
        contents: [
          ...chatHistory,
          { role: 'user', parts: [{ text: textToSend }] }
        ],
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text || (lang === 'ar' ? "عذرًا، حدث خطأ ما." : "Sorry, something went wrong."),
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMessage]);
      if (!isMuted) speak(assistantMessage.content.replace(/[#*`]/g, ''));
    } catch (error) {
      console.error("AI Assistant Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: lang === 'ar' ? "عذرًا، لا يمكنني الاتصال بالخادم الآن. يرجى المحاولة لاحقًا." : "Sorry, I can't connect to the server right now. Please try again later.",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-8 z-[100] font-cairo" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`mb-4 w-[calc(100vw-2rem)] sm:w-[420px] h-[min(600px,calc(100vh-8rem))] rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-white/10 backdrop-blur-2xl ${
              theme === 'dark' ? 'bg-slate-900/90 text-white' : 'bg-white/90 text-slate-900'
            }`}
          >
            {/* Header */}
            <div className="bg-mahallk-dark p-5 flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-mahallk-light rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-mahallk-light rounded-full blur-3xl"></div>
              </div>
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-mahallk-light to-mahallk-dark rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
                    <Bot size={28} className="text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-mahallk-dark"></div>
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg leading-tight">
                    {lang === 'ar' ? 'مساعد محلك' : 'Mahallk Assistant'}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-white/60 uppercase tracking-widest font-bold">
                      {lang === 'ar' ? 'نشط الآن' : 'Active Now'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 relative z-10">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white/60 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/10"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <button 
                  onClick={clearChat}
                  className="text-white/60 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/10"
                  title="Clear Chat"
                >
                  <Trash2 size={20} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/10"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-hide bg-gradient-to-b from-transparent to-slate-50/30 dark:to-slate-900/30">
              {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[88%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center shadow-sm ${
                      msg.role === 'user' ? 'bg-mahallk-light' : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700'
                    }`}>
                      {msg.role === 'user' ? <User size={18} className="text-white" /> : <Bot size={18} className="text-mahallk-dark dark:text-mahallk-light" />}
                    </div>
                    <div className={`p-4 rounded-[1.5rem] text-[15px] leading-relaxed shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-mahallk-dark text-white rounded-tr-none' 
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700'
                    }`}>
                      <div className="markdown-body prose prose-sm dark:prose-invert max-w-none font-cairo">
                        <Markdown>{msg.content}</Markdown>
                      </div>
                      <div className={`text-[9px] mt-2 font-medium opacity-40 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 rounded-[1.5rem] rounded-tl-none flex gap-1.5 items-center shadow-sm">
                    <span className="w-2 h-2 bg-mahallk-light rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-mahallk-light rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-mahallk-light rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            <div className="px-6 pb-2 flex flex-wrap gap-2">
              {[
                { icon: <Search size={12} />, textAr: "أفضل العروض", textEn: "Best offers" },
                { icon: <Store size={12} />, textAr: "فتح متجر في جرجا", textEn: "Open store in Girga" },
                { icon: <HelpCircle size={12} />, textAr: "سياسة الإرجاع", textEn: "Return policy" }
              ].map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(lang === 'ar' ? s.textAr : s.textEn)}
                  className="text-[10px] font-bold bg-white dark:bg-slate-800 hover:bg-mahallk-light hover:text-white px-4 py-2 rounded-full transition-all flex items-center gap-2 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  {s.icon}
                  {lang === 'ar' ? s.textAr : s.textEn}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={lang === 'ar' ? "اكتب استفسارك هنا..." : "Type your query here..."}
                  className={`w-full pl-4 pr-14 py-4 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-mahallk-light/50 border shadow-inner transition-all ${
                    theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className={`absolute ${lang === 'ar' ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-mahallk-light text-white hover:bg-mahallk-dark transition-all disabled:opacity-50 shadow-lg`}
                >
                  <Send size={20} className={lang === 'ar' ? 'rotate-180' : ''} />
                </button>
              </div>
              <div className="flex items-center justify-center gap-2 mt-3 opacity-40">
                <Sparkles size={10} className="text-mahallk-light" />
                <p className="text-[9px] text-center font-bold uppercase tracking-widest">
                  {lang === 'ar' ? 'مدعوم بالذكاء الاصطناعي' : 'Powered by AI'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <div className="relative group">
        <AnimatePresence>
          {showBubble && !isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: lang === 'ar' ? 20 : -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: lang === 'ar' ? 20 : -20 }}
              className={`absolute bottom-20 ${lang === 'ar' ? 'right-0' : 'left-0'} bg-white dark:bg-slate-800 p-5 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-700 w-72 z-50 overflow-hidden`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-mahallk-light"></div>
              <button 
                onClick={() => setShowBubble(false)}
                className="absolute top-3 right-3 bg-slate-100 dark:bg-slate-700 rounded-full p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-gradient-to-br from-mahallk-light to-mahallk-dark rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg transform -rotate-6">
                  <Bot size={22} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-white mb-1">
                    {lang === 'ar' ? 'مساعد محلك' : 'Mahallk Assistant'}
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {lang === 'ar' ? 'مرحبًا! هل تحتاج إلى مساعدة في البحث عن منتجات أو تسجيل متجرك في جرجا؟' : 'Hello! Need help searching for products or registering your store in Girga?'}
                  </p>
                  <button 
                    onClick={() => setIsOpen(true)}
                    className="mt-3 text-xs font-bold text-mahallk-light hover:text-mahallk-dark transition-colors flex items-center gap-1"
                  >
                    {lang === 'ar' ? 'ابدأ الدردشة الآن' : 'Start chat now'}
                    <Sparkles size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-16 h-16 rounded-2xl shadow-2xl flex items-center justify-center transition-all relative overflow-hidden group/btn ${
            isOpen ? 'bg-mahallk-dark text-white' : 'bg-mahallk-light text-white'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
          {isOpen ? <X size={32} className="relative z-10" /> : <MessageSquare size={32} className="relative z-10" />}
          {!isOpen && (
            <span className="absolute top-3 right-3 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse z-20"></span>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default AIAssistant;
