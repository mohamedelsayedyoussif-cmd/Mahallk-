import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Truck, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Globe, 
  Facebook, 
  Instagram, 
  Mail, 
  Phone,
  ChevronRight,
  Store,
  Shirt,
  Smartphone,
  Armchair,
  Utensils,
  Search,
  Filter,
  Star,
  Plus,
  Heart,
  Stethoscope,
  Coffee,
  Scissors,
  Zap,
  Plug,
  Battery,
  Droplets,
  Waves,
  Briefcase,
  Gamepad2,
  Sparkles,
  LayoutDashboard,
  Package,
  BarChart3,
  Bell,
  Settings,
  Send,
  UserPlus,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  User,
  Lock,
  LogIn,
  Check,
  MessageSquare,
  Sun,
  Moon
} from 'lucide-react';

import AIAssistant from './components/AIAssistant';

const TRANSLATIONS = {
  ar: {
    dir: 'rtl',
    nav: {
      home: "الرئيسية",
      about: "عن محلك",
      register: "كيفية التسجيل",
      categories: "الأقسام",
      products: "المنتجات",
      contact: "تواصل معنا",
      dashboard: "لوحة التاجر",
      privacy: "سياسة الخصوصية",
      terms: "الشروط والأحكام",
      startSelling: "ابدأ البيع"
    },
    hero: {
      title1: "تسوق من",
      title2: "أفضل متاجر جرجا",
      desc: "اكتشف آلاف المنتجات من البقالة، الملابس، الإلكترونيات، والأثاث. كل ما تحتاجه يصلك لباب البيت من متاجرك المفضلة في جرجا.",
      shopNow: "تسوق الآن",
      learnMore: "تعرف علينا",
      startSelling: "ابدأ البيع"
    },
    search: "ابحث...",
    searchPlaceholder: "ابحث عن منتج أو متجر...",
    cart: "السلة",
    categoriesSection: {
      title: "تنوع في الأقسام",
      subtitle: "كل ما يحتاجه البيت المصري متوفر في محلك"
    },
    productsSection: {
      title: "منتجات مختارة لك",
      subtitle: "أفضل العروض والمنتجات الأصلية من متاجرك المفضلة",
      all: "الكل",
      noResults: "عذراً، لم نجد ما تبحث عنه",
      tryAgain: "حاول البحث بكلمات أخرى أو تصفح الأقسام المختلفة"
    },
    footer: {
      desc: "المنصة الأولى والوحيدة في مدينة جرجا التي تهدف لتمكين التجار المحليين وربطهم بالمستهلكين رقمياً. نحن نؤمن بقوة المجتمع المحلي ونسعى لتطويره.",
      quickLinks: "روابط سريعة",
      contactUs: "تواصل معنا",
      rights: "جميع الحقوق محفوظة. صنع بكل حب في جرجا."
    },
    login: {
      title: "تسجيل الدخول",
      signUpTitle: "إنشاء حساب جديد",
      email: "البريد الإلكتروني أو اسم المستخدم",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      fullName: "الاسم الكامل",
      forgotPassword: "نسيت كلمة المرور؟",
      submit: "دخول",
      submitSignUp: "إنشاء حساب",
      rememberMe: "تذكرني",
      noAccount: "ليس لديك حساب؟",
      haveAccount: "لديك حساب بالفعل؟",
      signUp: "سجل الآن هنا",
      loginNow: "سجل دخولك هنا",
      loginBtn: "دخول",
      registerBtn: "إنشاء حساب",
      error: "اسم المستخدم أو كلمة المرور غير صحيحة",
      success: "تم تسجيل الدخول بنجاح",
      customer: "عميل",
      seller: "بائع",
      accountType: "نوع الحساب"
    },
    common: {
      viewAll: "عرض الكل",
      visitStore: "زيارة المتجر",
      add: "أضف",
      egp: "ج.م",
      reviews: "تقييمات",
      details: "عرض التفاصيل"
    },
    reviews: {
      title: "تقييمات المنتج",
      addReview: "أضف تقييمك",
      rating: "التقييم",
      comment: "التعليق",
      submit: "إرسال التقييم",
      noReviews: "لا توجد تقييمات بعد. كن أول من يقيم!",
      writeComment: "اكتب تعليقك هنا...",
      success: "تم إضافة تقييمك بنجاح!"
    }
  },
  en: {
    dir: 'ltr',
    nav: {
      home: "Home",
      about: "About Us",
      register: "How to Register",
      categories: "Categories",
      products: "Products",
      contact: "Contact Us",
      dashboard: "Dashboard",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      startSelling: "Start Selling"
    },
    hero: {
      title1: "Shop from",
      title2: "Girga's Best Stores",
      desc: "Discover thousands of products from grocery, clothing, electronics, and furniture. Everything you need delivered to your doorstep from your favorite stores in Girga.",
      shopNow: "Shop Now",
      learnMore: "Learn More",
      startSelling: "Start Selling"
    },
    search: "Search...",
    searchPlaceholder: "Search for products or stores...",
    cart: "Cart",
    categoriesSection: {
      title: "Diverse Categories",
      subtitle: "Everything an Egyptian home needs is available at Mahallk"
    },
    productsSection: {
      title: "Selected for You",
      subtitle: "Best deals and original products from your favorite stores",
      all: "All",
      noResults: "Sorry, we couldn't find what you're looking for",
      tryAgain: "Try searching with other words or browse different categories"
    },
    footer: {
      desc: "The first and only platform in Girga city aiming to empower local merchants and connect them with consumers digitally. We believe in the power of the local community.",
      quickLinks: "Quick Links",
      contactUs: "Contact Us",
      rights: "All rights reserved. Made with love in Girga."
    },
    login: {
      title: "Login",
      signUpTitle: "Create New Account",
      email: "Email or Username",
      password: "Password",
      confirmPassword: "Confirm Password",
      fullName: "Full Name",
      forgotPassword: "Forgot Password?",
      submit: "Login",
      submitSignUp: "Create Account",
      rememberMe: "Remember Me",
      noAccount: "Don't have an account?",
      haveAccount: "Already have an account?",
      signUp: "Sign up here",
      loginNow: "Login here",
      loginBtn: "Login",
      registerBtn: "Register",
      error: "Incorrect username or password",
      success: "Logged in successfully",
      customer: "Customer",
      seller: "Seller",
      accountType: "Account Type"
    },
    common: {
      viewAll: "View All",
      visitStore: "Visit Store",
      add: "Add",
      egp: "EGP",
      reviews: "Reviews",
      details: "View Details"
    },
    reviews: {
      title: "Product Reviews",
      addReview: "Add your review",
      rating: "Rating",
      comment: "Comment",
      submit: "Submit Review",
      noReviews: "No reviews yet. Be the first to review!",
      writeComment: "Write your comment here...",
      success: "Your review has been added successfully!"
    }
  }
};

const ContactForm = ({ lang }: { lang: 'ar' | 'en' }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-emerald-50 dark:bg-emerald-900/20 p-8 rounded-2xl border border-emerald-100 dark:border-emerald-800/50 text-center"
      >
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-800/50 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto mb-4">
          <Check size={32} />
        </div>
        <h4 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
          {lang === 'ar' ? 'تم الإرسال بنجاح!' : 'Sent Successfully!'}
        </h4>
        <p className="text-emerald-600/70 dark:text-emerald-400/70 text-sm">
          {lang === 'ar' ? 'شكراً لتواصلك معنا، سنقوم بالرد عليك في أقرب وقت ممكن.' : 'Thank you for contacting us, we will get back to you as soon as possible.'}
        </p>
      </motion.div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-400 mb-2">{lang === 'ar' ? 'الاسم بالكامل' : 'Full Name'}</label>
          <input required type="text" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-mahallk-light/50 text-mahallk-dark dark:text-white" placeholder={lang === 'ar' ? "أدخل اسمك" : "Enter your name"} />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-400 mb-2">{lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</label>
          <input required type="tel" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-mahallk-light/50 text-mahallk-dark dark:text-white" placeholder="01xxxxxxxxx" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-400 mb-2">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
        <input required type="email" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-mahallk-light/50 text-mahallk-dark dark:text-white" placeholder="example@mail.com" />
      </div>
      <div>
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-400 mb-2">{lang === 'ar' ? 'الرسالة' : 'Message'}</label>
        <textarea required rows={4} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-mahallk-light/50 text-mahallk-dark dark:text-white" placeholder={lang === 'ar' ? "كيف يمكننا مساعدتك؟" : "How can we help you?"}></textarea>
      </div>
      <button 
        disabled={status === 'loading'}
        type="submit" 
        className="w-full bg-mahallk-dark dark:bg-mahallk-light text-white py-4 rounded-xl font-bold hover:bg-mahallk-dark/90 dark:hover:bg-white dark:hover:text-mahallk-dark transition-all flex items-center justify-center gap-3 disabled:opacity-50"
      >
        {status === 'loading' ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <>
            {lang === 'ar' ? 'إرسال الرسالة' : 'Send Message'}
            <Send size={20} className={lang === 'ar' ? 'rotate-180' : ''} />
          </>
        )}
      </button>
    </form>
  );
};

const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const Logo = ({ className = "h-10 md:h-12", lang }: { className?: string, lang: 'ar' | 'en' }) => {
  const [hasError, setHasError] = useState(false);
  
  if (hasError) {
    return (
      <div className={`bg-mahallk-dark dark:bg-slate-900 border border-white/20 px-3 py-1.5 md:px-4 md:py-2 rounded-none shadow-lg inline-flex items-center ${className}`}>
        <span className="text-white font-bold text-lg md:text-2xl tracking-tight font-sans">
          {lang === 'ar' ? 'محلك' : 'Mahallk'}
        </span>
      </div>
    );
  }

  return (
    <img 
      src="https://drive.google.com/uc?id=1qh6y5xx_5DsE6UbJDKXlM8k-BnBPC08d" 
      alt={lang === 'ar' ? "شعار منصة محلك - Mahallk Logo" : "Mahallk Platform Logo"} 
      className={`${className} w-auto object-contain`}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      loading="eager"
      width="160"
      height="48"
    />
  );
};

const LoginModal = ({ isOpen, onClose, lang, initialIsSignUp = false }: { isOpen: boolean, onClose: () => void, lang: 'ar' | 'en', initialIsSignUp?: boolean }) => {
  const t = TRANSLATIONS[lang];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [accountType, setAccountType] = useState<'customer' | 'seller'>('customer');
  const [isSignUp, setIsSignUp] = useState(initialIsSignUp);

  useEffect(() => {
    if (isOpen) {
      setIsSignUp(initialIsSignUp);
      setError('');
      setSuccess('');
    }
  }, [initialIsSignUp, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    // Mock validation
    setTimeout(() => {
      if (isSignUp) {
        if (password !== confirmPassword) {
          setError(lang === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
          setLoading(false);
          return;
        }
        setSuccess(lang === 'ar' ? 'تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.' : 'Account created successfully! You can now login.');
        setTimeout(() => {
          setIsSignUp(false);
          setSuccess('');
        }, 2000);
      } else {
        if (email === 'admin' && password === 'admin') {
          setSuccess(t.login.success);
          setTimeout(() => {
            onClose();
          }, 1500);
        } else {
          setError(t.login.error);
        }
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" dir={t.dir}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-mahallk-dark dark:text-mahallk-light">
              {isSignUp ? t.login.signUpTitle : t.login.title}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <X size={24} className="text-slate-400" />
            </button>
          </div>

          {/* Account Type Selection */}
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-8">
            <button 
              onClick={() => setAccountType('customer')}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${accountType === 'customer' ? 'bg-white dark:bg-slate-700 text-mahallk-dark dark:text-white shadow-sm' : 'text-slate-500'}`}
            >
              {t.login.customer}
            </button>
            <button 
              onClick={() => setAccountType('seller')}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${accountType === 'seller' ? 'bg-white dark:bg-slate-700 text-mahallk-dark dark:text-white shadow-sm' : 'text-slate-500'}`}
            >
              {t.login.seller}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-2xl text-sm font-bold border border-rose-100 dark:border-rose-800/50 flex items-center gap-3"
              >
                <AlertCircle size={18} />
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-2xl text-sm font-bold border border-emerald-100 dark:border-emerald-800/50 flex items-center gap-3"
              >
                <CheckCircle2 size={18} />
                {success}
              </motion.div>
            )}

            {isSignUp && (
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-400 mb-2">{t.login.fullName}</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mahallk-light/50 text-mahallk-dark dark:text-white transition-all"
                    placeholder={lang === 'ar' ? "الاسم بالكامل" : "Your full name"}
                    required
                  />
                  <User className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400`} size={20} />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-400 mb-2">{t.login.email}</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mahallk-light/50 text-mahallk-dark dark:text-white transition-all"
                  placeholder={lang === 'ar' ? "البريد أو اسم المستخدم" : "Email or username"}
                  required
                />
                <Mail className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400`} size={20} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-400 mb-2">{t.login.password}</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mahallk-light/50 text-mahallk-dark dark:text-white transition-all"
                  placeholder="••••••••"
                  required
                />
                <Lock className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400`} size={20} />
              </div>
            </div>

            {isSignUp && (
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-400 mb-2">{t.login.confirmPassword}</label>
                <div className="relative">
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mahallk-light/50 text-mahallk-dark dark:text-white transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <Lock className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400`} size={20} />
                </div>
              </div>
            )}

            {!isSignUp && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="w-5 h-5 border-2 border-slate-200 dark:border-slate-700 rounded-md peer-checked:bg-mahallk-light peer-checked:border-mahallk-light transition-all"></div>
                    <Check size={14} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-mahallk-dark dark:group-hover:text-white transition-colors">{t.login.rememberMe}</span>
                </label>
                <button 
                  onClick={() => {
                    alert(lang === 'ar' ? 'يرجى التواصل مع الدعم الفني لاستعادة كلمة المرور.' : 'Please contact technical support to recover your password.');
                  }}
                  className="text-sm font-bold text-mahallk-light hover:underline"
                >
                  {t.login.forgotPassword}
                </button>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-mahallk-dark dark:bg-mahallk-light text-white py-4 rounded-2xl font-bold text-lg hover:bg-mahallk-dark/90 dark:hover:bg-white dark:hover:text-mahallk-dark transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {isSignUp ? t.login.submitSignUp : t.login.submit}
                  <LogIn size={20} className={lang === 'ar' ? 'rotate-180' : ''} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-slate-500 dark:text-slate-400">
              {isSignUp ? t.login.haveAccount : t.login.noAccount}{' '}
              <button 
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-mahallk-light font-bold hover:underline"
              >
                {isSignUp ? t.login.loginNow : t.login.signUp}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Header = ({ 
  cartCount, 
  onSearch, 
  lang, 
  setLang, 
  theme, 
  setTheme,
  onOpenLogin
}: { 
  cartCount: number, 
  onSearch: (query: string) => void,
  lang: 'ar' | 'en',
  setLang: (l: 'ar' | 'en') => void,
  theme: 'light' | 'dark',
  setTheme: (t: 'light' | 'dark') => void,
  onOpenLogin: (isSignUp: boolean) => void
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const t = TRANSLATIONS[lang];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const navLinks = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.register, href: "#register" },
    { name: t.nav.categories, href: "#categories" },
    { name: t.nav.products, href: "#products" },
    { name: t.nav.contact, href: "#contact" },
    { name: t.nav.dashboard, href: "#dashboard" },
    { name: t.nav.privacy, href: "#privacy" },
    { name: t.nav.terms, href: "#terms" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 dark:bg-black text-white/70 py-2 text-[10px] md:text-xs border-b border-white/5 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <Phone size={12} className="text-mahallk-light" />
              <span className="hidden xs:inline">+20 123 456 7890</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={12} className="text-mahallk-light" />
              <span className="hidden xs:inline">contact@mahalk.com</span>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-3 md:gap-4 border-l border-white/10 pl-4 md:pl-6 rtl:border-l-0 rtl:pl-0 rtl:border-r rtl:pr-4 md:rtl:pr-6">
              <a href="https://www.facebook.com/profile.php?id=61588600580615" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Facebook size={14} /></a>
              <a href="https://www.instagram.com/mhlk2118/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Instagram size={14} /></a>
              <a href="https://www.tiktok.com/tiktokstudio/content" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
              </a>
            </div>
            
            {/* Theme Toggle */}
            <button 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
              title={theme === 'light' ? 'Night Mode' : 'Day Mode'}
            >
              {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
              <span className="hidden md:inline">{theme === 'light' ? 'Night' : 'Day'}</span>
            </button>

            {/* Language Switcher */}
            <div 
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors font-bold"
            >
              <Globe size={12} />
              <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-mahallk-dark/95 dark:bg-black/95 backdrop-blur-md border-b border-white/10 py-3 md:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center gap-4 md:gap-8">
            {/* Logo */}
            <a href="#home" className="flex-shrink-0">
              <Logo lang={lang} />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 flex-grow justify-center">
              {navLinks.map((link) => (
                <a 
                  key={link.href} 
                  href={link.href} 
                  className="text-white/80 hover:text-white font-medium transition-colors text-sm whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex items-center relative max-w-[200px] lg:max-w-xs w-full">
              <input 
                type="text" 
                placeholder={t.search} 
                className="w-full bg-white/5 border border-white/10 rounded-full py-2 px-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-mahallk-light/50 transition-all"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Search className={`absolute ${lang === 'ar' ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-white/40`} size={16} />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden sm:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
                <button 
                  onClick={() => onOpenLogin(false)}
                  className="px-4 py-1.5 text-white text-xs md:text-sm font-bold hover:bg-white/10 rounded-full transition-all"
                >
                  {t.login.loginBtn}
                </button>
                <div className="w-px h-4 bg-white/20"></div>
                <button 
                  onClick={() => onOpenLogin(true)}
                  className="px-4 py-1.5 bg-mahallk-light text-white text-xs md:text-sm font-bold rounded-full hover:bg-white hover:text-mahallk-dark transition-all shadow-lg"
                >
                  {t.login.registerBtn}
                </button>
              </div>

              <button className="relative text-white p-2 hover:bg-white/10 rounded-full transition-colors">
                <ShoppingBag size={20} className="md:w-6 md:h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-mahallk-light text-white text-[10px] font-bold w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full border-2 border-mahallk-dark">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <a 
                href="#register" 
                className="hidden sm:block bg-mahallk-light hover:bg-white hover:text-mahallk-dark text-white font-bold py-2 px-4 md:px-6 rounded-full transition-all text-xs md:text-sm whitespace-nowrap shadow-lg shadow-mahallk-light/20"
              >
                {t.nav.startSelling}
              </a>

              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-white p-1.5 md:p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: lang === 'ar' ? '100%' : '-100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: lang === 'ar' ? '100%' : '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed inset-0 z-[60] lg:hidden bg-mahallk-dark dark:bg-black flex flex-col ${lang === 'ar' ? 'text-right' : 'text-left'}`}
              dir={t.dir}
            >
              <div className="p-4 flex justify-between items-center border-b border-white/10">
                <div className="bg-mahallk-dark border border-white/20 px-4 py-2">
                  <span className="text-white font-bold text-xl">محلك</span>
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="text-white p-2">
                  <X size={32} />
                </button>
              </div>
              
              <div className="flex-grow overflow-y-auto p-6 space-y-8">
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                  <button 
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    className="flex items-center gap-3 text-white"
                  >
                    {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
                    <span className="text-lg">{theme === 'light' ? 'Night Mode' : 'Day Mode'}</span>
                  </button>
                  <button 
                    onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                    className="flex items-center gap-3 text-white font-bold"
                  >
                    <Globe size={24} />
                    <span className="text-lg">{lang === 'ar' ? 'English' : 'العربية'}</span>
                  </button>
                </div>

                <div className="relative">
                  <input 
                    type="text" 
                    placeholder={t.searchPlaceholder} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-12 text-lg text-white focus:outline-none focus:ring-2 focus:ring-mahallk-light/50"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <Search className={`absolute ${lang === 'ar' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-white/40`} size={24} />
                </div>

                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <a 
                      key={link.href} 
                      href={link.href} 
                      onClick={() => setIsMenuOpen(false)}
                      className="text-white text-xl font-medium py-4 border-b border-white/5 flex justify-between items-center"
                    >
                      {link.name}
                      <ChevronRight size={20} className={`text-white/20 ${lang === 'en' ? '' : 'rotate-180'}`} />
                    </a>
                  ))}
                </div>

                <div className="pt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => {
                        onOpenLogin(false);
                        setIsMenuOpen(false);
                      }}
                      className="bg-white/10 text-white font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-2 border border-white/10"
                    >
                      <LogIn size={20} />
                      <span>{t.login.loginBtn}</span>
                    </button>
                    <button 
                      onClick={() => {
                        onOpenLogin(true);
                        setIsMenuOpen(false);
                      }}
                      className="bg-mahallk-light text-white font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-2 shadow-lg"
                    >
                      <UserPlus size={20} />
                      <span>{t.login.registerBtn}</span>
                    </button>
                  </div>

                  <a 
                    href="#register" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full bg-mahallk-light text-white text-center font-bold py-5 rounded-xl text-xl shadow-xl shadow-mahallk-light/20"
                  >
                    {t.nav.startSelling}
                  </a>
                  
                  <div className="space-y-4">
                    <p className="text-white/40 text-center text-sm font-bold uppercase tracking-widest">
                      {lang === 'ar' ? 'تواصل معنا' : 'Connect with us'}
                    </p>
                    <div className="flex justify-center gap-8">
                      <a href="https://www.facebook.com/profile.php?id=61588600580615" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full text-white/60 hover:text-white"><Facebook size={24} /></a>
                      <a href="https://www.instagram.com/mhlk2118/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full text-white/60 hover:text-white"><Instagram size={24} /></a>
                      <a href="https://mahalk.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full text-white/60 hover:text-white"><Globe size={24} /></a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

const Hero = ({ lang }: { lang: 'ar' | 'en' }) => {
  const t = TRANSLATIONS[lang];
  return (
    <section id="home" className="relative py-24 overflow-hidden bg-mahallk-dark dark:bg-slate-900 text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,174,239,0.2),transparent_70%)]"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`${lang === 'ar' ? 'text-right' : 'text-left'} order-2 lg:order-1`}
            dir={t.dir}
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
              {t.hero.title1} <br />
              <span className="text-mahallk-light">{t.hero.title2}</span>
            </h1>
            <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-xl">
              {t.hero.desc}
            </p>
              <div className={`flex flex-col sm:flex-row gap-6 ${lang === 'ar' ? 'justify-start' : 'justify-start'}`}>
                <a href="#products" className="bg-mahallk-light text-white px-10 py-5 rounded-xl font-bold text-xl hover:bg-mahallk-light/90 transition-all shadow-xl flex items-center justify-center gap-3 group">
                  {t.hero.shopNow}
                  <ChevronRight className={`group-hover:translate-x-1 transition-transform ${lang === 'ar' ? 'rotate-180' : ''}`} />
                </a>
                <a href="#about" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-xl font-bold text-xl hover:bg-white/20 transition-all text-center">
                  {t.hero.learnMore}
                </a>
                <a href="#register" className="bg-mahallk-dark border border-white/20 text-white px-10 py-5 rounded-xl font-bold text-xl hover:bg-white/5 transition-all text-center">
                  {t.hero.startSelling}
                </a>
              </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(0,174,239,0.3)] border border-white/10 group">
              <SafeImage 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&h=900&q=80" 
                alt={lang === 'ar' ? "تجربة تسوق محلية متكاملة في جرجا عبر منصة محلك" : "Integrated local shopping experience in Girga via Mahallk platform"} 
                aspectRatio="aspect-[4/3]"
                priority={true}
                width="1200"
                height="900"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mahallk-dark/80 via-mahallk-dark/20 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SafeImage = ({ 
  src, 
  alt, 
  className, 
  imgClassName,
  aspectRatio = "aspect-square",
  priority = false,
  hoverScale = false,
  width = "800",
  height = "800"
}: { 
  src: string, 
  alt: string, 
  className?: string, 
  imgClassName?: string,
  aspectRatio?: string,
  priority?: boolean,
  hoverScale?: boolean,
  width?: string | number,
  height?: string | number
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fallbackImage = "https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&w=800&q=80"; 

  return (
    <div className={`relative overflow-hidden ${aspectRatio} bg-slate-100 dark:bg-slate-800 ${className}`}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-slate-200 dark:bg-slate-700" />
      )}
      <img
        src={hasError ? fallbackImage : src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        width={width}
        height={height}
        className={`w-full h-full object-cover transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'} ${hoverScale ? 'group-hover:scale-110' : ''} ${imgClassName}`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

const CATEGORIES = [
  { id: 'grocery', nameAr: "البقالة", nameEn: "Grocery", icon: <Utensils />, img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&h=800&q=80" },
  { id: 'clothing', nameAr: "الملابس", nameEn: "Clothing", icon: <Shirt />, img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&h=800&q=80" },
  { id: 'health', nameAr: "الصحة والصيدلية", nameEn: "Health & Pharmacy", icon: <Stethoscope />, img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&h=800&q=80" },
  { id: 'electronics', nameAr: "الإلكترونيات", nameEn: "Electronics", icon: <Smartphone />, img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&h=800&q=80" },
  { id: 'food', nameAr: "المطاعم", nameEn: "Restaurants", icon: <Coffee />, img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&h=800&q=80" },
  { id: 'furniture', nameAr: "الأثاث", nameEn: "Furniture", icon: <Armchair />, img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&h=800&q=80" },
  { id: 'fabrics', nameAr: "الأقمشة", nameEn: "Fabrics", icon: <Scissors />, img: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&h=800&q=80" },
  { id: 'appliances', nameAr: "الأجهزة الكهربائية", nameEn: "Appliances", icon: <Zap />, img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&h=800&q=80" },
  { id: 'office', nameAr: "الأدوات المكتبية", nameEn: "Office Supplies", icon: <Briefcase />, img: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&w=800&h=800&q=80" },
  { id: 'toys', nameAr: "الألعاب والترفيه", nameEn: "Toys & Entertainment", icon: <Gamepad2 />, img: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&w=800&h=800&q=80" },
  { id: 'shoes', nameAr: "الأحذية والحقائب", nameEn: "Shoes & Bags", icon: <ShoppingBag />, img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&h=800&q=80" },
  { id: 'cosmetics', nameAr: "مستحضرات التجميل", nameEn: "Cosmetics", icon: <Sparkles />, img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&h=800&q=80" },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Samsung Original Charger 25W",
    nameAr: "شاحن سامسونج أصلي 25W",
    category: 'electronics',
    price: 300,
    description: "شاحن سامسونج الأصلي بقوة 25 واط، يدعم الشحن السريع الفائق (Super Fast Charging) لضمان شحن هاتفك بأمان وسرعة.",
    descriptionEn: "Original Samsung 25W charger, supports Super Fast Charging to ensure your phone is charged safely and quickly.",
    img: "https://images.unsplash.com/photo-1619130771181-a222444855b7?auto=format&fit=crop&w=800&h=800&q=80",
    icon: <Zap className="text-amber-400 animate-pulse drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" size={56} />,
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: "Anker 20W Charger Head",
    nameAr: "رأس شاحن أنكر 20W أصلي",
    category: 'electronics',
    price: 450,
    description: "رأس شاحن أنكر نانو برو بقوة 20 واط، حجم صغير جداً وأداء فائق السرعة.",
    descriptionEn: "Anker Nano Pro 20W charger head, ultra-compact size with high-speed performance.",
    img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&h=800&q=80",
    icon: <Smartphone className="text-mahallk-light animate-bounce drop-shadow-[0_0_15px_rgba(0,174,239,0.5)]" size={56} />,
    rating: 4.9,
    reviews: 89
  },
  {
    id: 3,
    name: "Original 30W Charger",
    nameAr: "شاحن أصلي 30W",
    category: 'electronics',
    price: 400,
    description: "شاحن جداري سريع بقوة 30 واط، مثالي لشحن الهواتف والأجهزة اللوحية بسرعة وكفاءة عالية مع حماية من التماس الكهربائي.",
    descriptionEn: "30W fast wall charger, ideal for charging phones and tablets quickly and efficiently with short-circuit protection.",
    img: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&h=800&q=80",
    icon: <Plug className="text-emerald-400 animate-pulse drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" size={56} />,
    rating: 4.7,
    reviews: 56
  },
  {
    id: 4,
    name: "X-scoot 10,000 mAh Power Bank",
    nameAr: "باور بانك X-scoot 10,000mAh",
    category: 'electronics',
    price: 750,
    description: "باور بانك X-scoot بسعة 10,000 مللي أمبير، يتميز بتصميم عصري ونحيف مع منافذ شحن متعددة وسرعة فائقة.",
    descriptionEn: "X-scoot 10,000mAh power bank, features a modern slim design with multiple charging ports and high speed.",
    img: "https://images.unsplash.com/photo-1625766763788-95dcce9bf5ac?auto=format&fit=crop&w=800&h=800&q=80",
    icon: <Battery className="text-mahallk-light animate-pulse drop-shadow-[0_0_15px_rgba(0,174,239,0.5)]" size={56} />,
    rating: 4.6,
    reviews: 42
  },
  {
    id: 5,
    name: "Fresh Milk 1L",
    nameAr: "حليب طازج 1 لتر",
    category: 'grocery',
    price: 35,
    description: "حليب بقري طازج 100% من مزارعنا المحلية بجودة عالية.",
    descriptionEn: "100% fresh cow milk from our local farms with high quality.",
    img: "https://images.unsplash.com/photo-1550583724-125581f77833?auto=format&fit=crop&w=800&h=800&q=80",
    icon: <Droplets className="text-sky-400 animate-bounce drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]" size={56} />,
    rating: 4.9,
    reviews: 210
  },
  {
    id: 6,
    name: "Cotton T-Shirt",
    nameAr: "تيشيرت قطن فاخر",
    category: 'clothing',
    price: 250,
    description: "تيشيرت قطني 100% مريح وعصري متوفر بجميع المقاسات والألوان.",
    descriptionEn: "100% cotton T-shirt, comfortable and modern, available in all sizes and colors.",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&h=800&q=80",
    icon: <Shirt className="text-indigo-400 animate-pulse drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]" size={56} />,
    rating: 4.5,
    reviews: 156
  },
  {
    id: 7,
    name: "Modern Sofa",
    nameAr: "كنبة مودرن مريحة",
    category: 'furniture',
    price: 4500,
    description: "كنبة بتصميم عصري وألوان جذابة تناسب غرفة المعيشة.",
    descriptionEn: "Modern sofa with attractive colors, perfect for your living room.",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&h=800&q=80",
    icon: <Armchair className="text-orange-400 animate-bounce drop-shadow-[0_0_15px_rgba(251,146,60,0.5)]" size={56} />,
    rating: 4.7,
    reviews: 34
  },
  {
    id: 8,
    name: "Electric Kettle",
    nameAr: "غلاية مياه كهربائية",
    category: 'appliances',
    price: 600,
    description: "غلاية مياه كهربائية سريعة مصنوعة من الفولاذ المقاوم للصدأ، سعة 1.7 لتر مع خاصية الفصل التلقائي للأمان.",
    descriptionEn: "Fast electric kettle made of stainless steel, 1.7L capacity with auto-shutoff for safety.",
    img: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&h=800&q=80",
    icon: <Waves className="text-mahallk-light animate-pulse drop-shadow-[0_0_15px_rgba(0,174,239,0.5)]" size={56} />,
    rating: 4.4,
    reviews: 78
  },
  {
    id: 9,
    name: "Moisturizing Cream",
    nameAr: "كريم مرطب للبشرة",
    category: 'cosmetics',
    price: 120,
    description: "كريم مرطب غني بالفيتامينات لنضارة البشرة وحمايتها.",
    descriptionEn: "Vitamin-rich moisturizing cream for skin radiance and protection.",
    img: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=800&h=800&q=80",
    icon: <Sparkles className="text-pink-400 animate-pulse drop-shadow-[0_0_15px_rgba(244,114,182,0.5)]" size={56} />,
    rating: 4.6,
    reviews: 112
  },
  {
    id: 10,
    name: "Leather Handbag",
    nameAr: "حقيبة يد جلدية",
    category: 'shoes',
    price: 850,
    description: "حقيبة يد من الجلد الطبيعي بتصميم أنيق وعملي للمناسبات.",
    descriptionEn: "Natural leather handbag with an elegant and practical design for all occasions.",
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&h=800&q=80",
    icon: <ShoppingBag className="text-rose-400 animate-bounce drop-shadow-[0_0_15px_rgba(251,113,133,0.5)]" size={56} />,
    rating: 4.9,
    reviews: 45
  },
];

interface ProductCardProps {
  product: typeof PRODUCTS[0];
  onAddToCart: () => void;
  lang: 'ar' | 'en';
  key?: any;
}

const ProductCard = ({ product, onAddToCart, lang }: ProductCardProps) => {
  const t = TRANSLATIONS[lang];
  const [showReviews, setShowReviews] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [reviewsList, setReviewsList] = useState([
    { id: 1, user: lang === 'ar' ? "أحمد محمد" : "Ahmed Mohamed", rating: 5, comment: lang === 'ar' ? "منتج ممتاز جداً وأنصح به" : "Excellent product, highly recommended", date: "2024-02-20" },
    { id: 2, user: lang === 'ar' ? "سارة علي" : "Sara Ali", rating: 4, comment: lang === 'ar' ? "جودة جيدة وسعر مناسب" : "Good quality and fair price", date: "2024-02-18" }
  ]);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newReview = {
      id: Date.now(),
      user: lang === 'ar' ? "مستخدم جديد" : "New User",
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split('T')[0]
    };

    setReviewsList([newReview, ...reviewsList]);
    setNewComment('');
    setNewRating(5);
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 3000);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all group flex flex-col h-full"
      dir={t.dir}
    >
      <div className="flex flex-col md:flex-row h-full">
        <div className="relative w-full md:w-48 aspect-square overflow-hidden shrink-0 bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-mahallk-light/5 to-transparent opacity-50" />
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.2, rotate: 10 }}
            className="relative z-10 transition-transform duration-300"
          >
            {product.icon}
          </motion.div>
          <div className="absolute inset-0 bg-mahallk-dark/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
            <span className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-mahallk-dark dark:text-mahallk-light px-3 py-1 rounded-full text-xs font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              {t.common.details}
            </span>
          </div>
          <button 
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`absolute top-2 ${lang === 'ar' ? 'left-2' : 'right-2'} p-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full transition-colors z-10 ${isWishlisted ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'}`}
          >
            <Heart size={16} className={isWishlisted ? 'fill-rose-500' : ''} />
          </button>
        </div>
        
        <div className={`p-6 flex-grow flex flex-col justify-between ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={12} 
                    className={i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-700"} 
                  />
                ))}
                <span className="text-[10px] text-slate-400 mr-2">({product.reviews} {t.common.reviews})</span>
              </div>
              <button 
                onClick={() => setShowReviews(!showReviews)}
                className="text-slate-400 hover:text-mahallk-light transition-colors flex items-center gap-1 text-xs font-bold"
              >
                <MessageSquare size={14} />
                {showReviews ? (lang === 'ar' ? 'إخفاء' : 'Hide') : (lang === 'ar' ? 'التقييمات' : 'Reviews')}
              </button>
            </div>
            
            <h3 className="text-lg font-bold text-mahallk-dark dark:text-white mb-1 group-hover:text-mahallk-light transition-colors">
              {lang === 'ar' ? product.nameAr : product.name}
            </h3>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">
              {lang === 'ar' ? product.description : (product as any).descriptionEn || "High quality product from our local stores."}
            </p>
          </div>
          
          <div className="flex items-center justify-between gap-4 mt-auto">
            <div className="text-mahallk-dark dark:text-white font-bold text-lg">
              {product.price} <span className="text-xs">{t.common.egp}</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={onAddToCart}
                className="bg-mahallk-dark dark:bg-mahallk-light text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-mahallk-light dark:hover:bg-white dark:hover:text-mahallk-dark transition-all flex items-center gap-2 shadow-md hover:shadow-mahallk-light/20"
              >
                <Plus size={16} />
                {t.common.add}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <AnimatePresence>
        {showReviews && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-100 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-900/50"
          >
            <div className="p-6">
              <h4 className="font-bold text-mahallk-dark dark:text-white mb-4 flex items-center gap-2">
                <Star size={18} className="text-amber-400 fill-amber-400" />
                {t.reviews.title}
              </h4>

              {/* Add Review Form */}
              {reviewSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs font-bold border border-emerald-100 dark:border-emerald-800/50 flex items-center gap-2"
                >
                  <CheckCircle2 size={14} />
                  {t.reviews.success}
                </motion.div>
              )}
              <form onSubmit={handleAddReview} className="mb-8 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{t.reviews.rating}:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star 
                          size={18} 
                          className={star <= newRating ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-600"} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={t.reviews.writeComment}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mahallk-light/50 text-mahallk-dark dark:text-white resize-none"
                    rows={2}
                    required
                  />
                  <button 
                    type="submit"
                    className="absolute bottom-2 left-2 bg-mahallk-light text-white p-2 rounded-lg hover:bg-mahallk-dark transition-all shadow-md"
                  >
                    <Send size={16} className={lang === 'ar' ? 'rotate-180' : ''} />
                  </button>
                </div>
              </form>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviewsList.length > 0 ? (
                  reviewsList.map((review) => (
                    <div key={review.id} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-50 dark:border-slate-700 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold text-sm text-mahallk-dark dark:text-white">{review.user}</p>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={10} 
                                className={i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-600"} 
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-400">{review.date}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-slate-400 text-sm py-4">{t.reviews.noReviews}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ProductShowcase = ({ onAddToCart, searchQuery: externalSearchQuery = "", lang }: { onAddToCart: () => void, searchQuery?: string, lang: 'ar' | 'en' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const t = TRANSLATIONS[lang];

  const searchQuery = externalSearchQuery || internalSearchQuery;

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch = p.nameAr.includes(searchQuery) || p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="products" className="py-24 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir={t.dir}>
        <div className={`mb-16 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-mahallk-dark dark:text-mahallk-light mb-4">{t.productsSection.title}</h2>
          <p className="text-slate-500 dark:text-slate-400">{t.productsSection.subtitle}</p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 no-scrollbar">
            <button 
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full font-bold transition-all whitespace-nowrap ${selectedCategory === 'all' ? 'bg-mahallk-dark dark:bg-mahallk-light text-white dark:text-mahallk-dark shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
            >
              {t.productsSection.all}
            </button>
            {CATEGORIES.slice(0, 8).map(cat => (
              <button 
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 rounded-full font-bold transition-all whitespace-nowrap ${selectedCategory === cat.id ? 'bg-mahallk-dark dark:bg-mahallk-light text-white dark:text-mahallk-dark shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                {lang === 'ar' ? cat.nameAr : cat.nameEn}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setInternalSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mahallk-light/50 transition-all text-mahallk-dark dark:text-white"
            />
            <Search className={`absolute ${lang === 'ar' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-slate-400`} size={20} />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} lang={lang} />
            ))}
          </AnimatePresence>
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-slate-50 dark:bg-slate-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="text-slate-300 dark:text-slate-700" size={32} />
            </div>
            <h3 className="text-xl font-bold text-mahallk-dark dark:text-white mb-2">{t.productsSection.noResults}</h3>
            <p className="text-slate-500 dark:text-slate-400">{t.productsSection.tryAgain}</p>
          </div>
        )}
      </div>
    </section>
  );
};

const Categories = ({ lang }: { lang: 'ar' | 'en' }) => {
  const t = TRANSLATIONS[lang];
  return (
    <section id="categories" className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir={t.dir}>
        <div className={`mb-12 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-mahallk-dark dark:text-mahallk-light mb-2">{t.categoriesSection.title}</h2>
          <p className="text-slate-500 dark:text-slate-400">{t.categoriesSection.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {CATEGORIES.map((cat, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -10 }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md aspect-square"
            >
              <SafeImage 
                src={cat.img} 
                alt={lang === 'ar' ? `قسم ${cat.nameAr} في منصة محلك` : `${cat.nameEn} category in Mahallk platform`} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mahallk-dark/90 via-mahallk-dark/40 to-transparent flex flex-col justify-end p-4 transition-opacity duration-300 group-hover:from-mahallk-light/90 group-hover:via-mahallk-light/40">
                <div className="text-white flex flex-col items-center text-center">
                  <span className="p-2 bg-white/20 backdrop-blur-md rounded-lg mb-2 group-hover:bg-white/40 transition-colors">
                    {React.cloneElement(cat.icon as React.ReactElement, { size: 20 } as any)}
                  </span>
                  <h3 className="text-sm font-bold tracking-wide">{lang === 'ar' ? cat.nameAr : cat.nameEn}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = ({ lang }: { lang: 'ar' | 'en' }) => {
  const t = TRANSLATIONS[lang];
  const features = [
    {
      title: lang === 'ar' ? "كاشير مجاني مدى الحياة" : "Free Lifetime Cashier",
      description: lang === 'ar' ? "نقدم خدمات الكاشير مجاناً للمشتركين الأوائل بدون أي رسوم أو عمولات خفية." : "We offer free cashier services for early subscribers without any hidden fees or commissions.",
      icon: <DollarSign className="w-8 h-8" />,
      color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
    },
    {
      title: lang === 'ar' ? "توصيل ذكي وسريع" : "Smart & Fast Delivery",
      description: lang === 'ar' ? "نظام توصيل متكامل يضمن وصول طلبات عملائك بسرعة وأمان إلى أي مكان في جرجا." : "Integrated delivery system ensuring your customers' orders arrive quickly and safely anywhere in Girga.",
      icon: <Truck className="w-8 h-8" />,
      color: "bg-mahallk-light/10 text-mahallk-light"
    },
    {
      title: lang === 'ar' ? "زيادة حقيقية في المبيعات" : "Real Sales Growth",
      description: lang === 'ar' ? "وسع نطاق وصول متجرك لآلاف العملاء الجدد الذين يفضلون التسوق عبر الإنترنت." : "Expand your store's reach to thousands of new customers who prefer online shopping.",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
    }
  ];

  return (
    <section id="features" className="py-24 bg-white dark:bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir={t.dir}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
            <h2 className="text-3xl md:text-4xl font-bold text-mahallk-dark dark:text-mahallk-light mb-4">
              {lang === 'ar' ? 'مميزات منصة محلك' : 'Mahallk Platform Features'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-12">
              {lang === 'ar' ? 'كل ما تحتاجه لإدارة متجرك والوصول لعملائك في مكان واحد' : 'Everything you need to manage your store and reach your customers in one place'}
            </p>
            
            <div className="space-y-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: lang === 'ar' ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6 group"
                >
                  <div className={`w-16 h-16 shrink-0 ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-mahallk-dark dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: lang === 'ar' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/3] group">
              <img 
                src="https://images.unsplash.com/photo-1556740734-7f96267b118a?auto=format&fit=crop&w=800&h=600&q=80" 
                alt={lang === 'ar' ? "خدمات التوصيل والبيع الذكي في جرجا" : "Delivery and smart selling services in Girga"} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-mahallk-dark/20 group-hover:bg-mahallk-dark/10 transition-colors"></div>
            </div>
            <div className={`absolute -bottom-6 ${lang === 'ar' ? '-right-6' : '-left-6'} bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 hidden md:block`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold">{lang === 'ar' ? 'زيادة المبيعات' : 'Sales Increase'}</p>
                  <p className="text-xl font-bold text-mahallk-dark dark:text-white">+45%</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Benefits = ({ lang }: { lang: 'ar' | 'en' }) => {
  const t = TRANSLATIONS[lang];
  const benefits = [
    {
      title: lang === 'ar' ? "انتشار أوسع" : "Wider Reach",
      desc: lang === 'ar' ? "الوصول لآلاف العملاء في جرجا والمناطق المجاورة." : "Reach thousands of customers in Girga and surrounding areas.",
      icon: <Globe className="text-mahallk-light" />
    },
    {
      title: lang === 'ar' ? "متاح 24/7" : "Available 24/7",
      desc: lang === 'ar' ? "متجرك مفتوح دائماً لاستقبال الطلبات حتى وأنت نائم." : "Your store is always open to receive orders even while you sleep.",
      icon: <Clock className="text-mahallk-light" />
    },
    {
      title: lang === 'ar' ? "تكلفة صفرية" : "Zero Cost",
      desc: lang === 'ar' ? "تسجيل مجاني تماماً للمشتركين الأوائل لدعم المجتمع المحلي." : "Completely free registration for early subscribers to support the local community.",
      icon: <Store className="text-mahallk-light" />
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-mahallk-dark dark:bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-mahallk-light/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-mahallk-light/5 rounded-full blur-3xl -ml-48 -mb-48"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" dir={t.dir}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {lang === 'ar' ? 'لماذا تنضم إلى محلك؟' : 'Why join Mahallk?'}
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            {lang === 'ar' ? 'نحن شريكك في النجاح والتحول الرقمي لمتجرك' : 'We are your partner in success and the digital transformation of your store'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-mahallk-light transition-colors duration-300">
                {React.cloneElement(benefit.icon as React.ReactElement, { size: 32, className: "group-hover:text-white transition-colors" } as any)}
              </div>
              <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
              <p className="text-slate-300 leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <a href="#register" className="bg-mahallk-light text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-mahallk-light/90 transition-all shadow-2xl hover:scale-105 transform inline-block">
            {lang === 'ar' ? 'سجل متجرك الآن مجاناً' : 'Register your store now for free'}
          </a>
        </div>
      </div>
    </section>
  );
};

const AboutSection = ({ lang }: { lang: 'ar' | 'en' }) => {
  const t = TRANSLATIONS[lang];
  return (
    <section id="about" className="py-24 bg-mahallk-dark dark:bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.2),transparent_50%)]"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" dir={t.dir}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: lang === 'ar' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`order-2 ${lang === 'ar' ? 'lg:order-1' : 'lg:order-2'}`}
          >
            <h2 className={`text-4xl font-bold mb-8 ${lang === 'ar' ? 'border-r-4 pr-6' : 'border-l-4 pl-6'} border-mahallk-light`}>
              {lang === 'ar' ? 'عن منصة محلك' : 'About Mahallk Platform'}
            </h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              {lang === 'ar' 
                ? 'محلك هي منصة تجارة إلكترونية محلية رائدة تهدف إلى ربط المتاجر والشركات في مدينة جرجا بالعملاء بشكل مباشر وسهل. نحن نسعى لتمكين التجار المحليين من خلال توفير الأدوات الرقمية اللازمة للنمو والازدهار في العصر الرقمي.'
                : 'Mahallk is a leading local e-commerce platform aiming to connect stores and businesses in Girga directly and easily with customers. We strive to empower local merchants by providing the digital tools necessary for growth and prosperity in the digital age.'}
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-mahallk-light/20 p-3 rounded-xl">
                  <Globe className="text-mahallk-light" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{lang === 'ar' ? 'رؤيتنا' : 'Our Vision'}</h3>
                  <p className="text-slate-400">
                    {lang === 'ar' 
                      ? 'أن نكون الوجهة الأولى للتسوق المحلي في صعيد مصر، مع دعم كامل للتحول الرقمي للمتاجر التقليدية.'
                      : 'To be the first destination for local shopping in Upper Egypt, with full support for the digital transformation of traditional stores.'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-mahallk-light/20 p-3 rounded-xl">
                  <Sparkles className="text-mahallk-light" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{lang === 'ar' ? 'مهمتنا' : 'Our Mission'}</h3>
                  <p className="text-slate-400">
                    {lang === 'ar' 
                      ? 'توفير تجربة تسوق آمنة وسهلة للعملاء، مع تقديم خدمات لوجستية وتقنية متطورة للتجار لزيادة مبيعاتهم وتوسيع نطاق أعمالهم.'
                      : 'Providing a safe and easy shopping experience for customers, while offering advanced logistical and technical services for merchants to increase their sales and expand their business scope.'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`order-1 ${lang === 'ar' ? 'lg:order-2' : 'lg:order-1'}`}
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group">
              <SafeImage 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&h=800&q=80" 
                alt={lang === 'ar' ? "رؤية ومهمة منصة محلك لدعم التجار في جرجا" : "Mahallk's vision and mission to support merchants in Girga"} 
                width="1200"
                height="800"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mahallk-dark via-mahallk-dark/10 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const RegistrationSection = ({ lang, onOpenRegister }: { lang: 'ar' | 'en', onOpenRegister: () => void }) => {
  const steps = [
    {
      title: lang === 'ar' ? "قم بزيارة الموقع" : "Visit the Website",
      desc: lang === 'ar' ? "ابدأ رحلتك الآن." : "Start your journey now.",
      icon: <Globe size={32} />,
      link: "#"
    },
    {
      title: lang === 'ar' ? "أنشئ حساب تاجر" : "Create Merchant Account",
      desc: lang === 'ar' ? "أدخل معلومات متجرك الأساسية وبيانات التواصل." : "Enter your store's basic information and contact details.",
      icon: <Store size={32} />
    },
    {
      title: lang === 'ar' ? "ارفع منتجاتك" : "Upload Your Products",
      desc: lang === 'ar' ? "أضف صور المنتجات، الأوصاف، والأسعار بكل سهولة." : "Add product photos, descriptions, and prices with ease.",
      icon: <Plus size={32} />
    },
    {
      title: lang === 'ar' ? "ابدأ البيع" : "Start Selling",
      desc: lang === 'ar' ? "استقبل الطلبات واستمتع بخدمات الكاشير المجانية." : "Receive orders and enjoy free cashier services.",
      icon: <TrendingUp size={32} />
    }
  ];

  return (
    <section id="register" className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: lang === 'ar' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={lang === 'ar' ? 'text-right' : 'text-left'}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mahallk-dark dark:text-mahallk-light mb-4">
              {lang === 'ar' ? 'كيفية التسجيل كتاجر' : 'How to Register as a Merchant'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-2xl">
              {lang === 'ar' 
                ? 'خطوات بسيطة تفصلك عن نقل متجرك إلى العالم الرقمي والوصول لآلاف العملاء في جرجا.'
                : 'Simple steps separate you from moving your store to the digital world and reaching thousands of customers in Girga.'}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 bg-mahallk-light/10 rounded-xl flex items-center justify-center text-mahallk-light mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold text-mahallk-dark dark:text-white mb-2">{step.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-10">
              <button 
                onClick={onOpenRegister}
                className="bg-mahallk-light text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-mahallk-light/90 transition-all shadow-xl hover:scale-105 transform inline-block"
              >
                {lang === 'ar' ? 'سجل الآن كتاجر' : 'Register Now as Merchant'}
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: lang === 'ar' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl aspect-square group">
              <img 
                src="https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=800&h=800&q=80" 
                alt={lang === 'ar' ? "تاجر محلي يستخدم منصة محلك لإدارة مبيعاته" : "Local merchant using Mahallk platform to manage sales"} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-mahallk-dark/10 group-hover:bg-transparent transition-colors"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const PrivacySection = ({ lang }: { lang: 'ar' | 'en' }) => (
  <section id="privacy" className="py-24 bg-white dark:bg-black border-t border-slate-100 dark:border-slate-800">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-mahallk-dark dark:text-mahallk-light mb-4">
          {lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          {lang === 'ar' ? 'نحن نلتزم بحماية بياناتك وخصوصيتك بأعلى المعايير العالمية.' : 'We are committed to protecting your data and privacy with the highest global standards.'}
        </p>
      </div>
      
      <div className={`space-y-12 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
          <h3 className="text-2xl font-bold text-mahallk-dark dark:text-white mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-mahallk-light rounded-full"></span>
            {lang === 'ar' ? 'البيانات التي نجمعها' : 'Data We Collect'}
          </h3>
          <ul className={`space-y-4 text-slate-600 dark:text-slate-400 list-disc list-inside ${lang === 'ar' ? 'pr-4' : 'pl-4'}`}>
            <li>{lang === 'ar' ? 'المعلومات الشخصية: الاسم الكامل، عنوان البريد الإلكتروني، ورقم الهاتف المحمول.' : 'Personal Information: Full name, email address, and mobile phone number.'}</li>
            <li>{lang === 'ar' ? 'معلومات المتجر: اسم النشاط التجاري، العنوان الفعلي، ونوع المنتجات المعروضة.' : 'Store Information: Business name, physical address, and type of products offered.'}</li>
            <li>{lang === 'ar' ? 'بيانات الموقع الجغرافي: لتسهيل عمليات التوصيل الدقيقة وتحديد المتاجر الأقرب للعملاء.' : 'Geolocation Data: To facilitate accurate delivery processes and identify stores closest to customers.'}</li>
            <li>{lang === 'ar' ? 'معلومات الاستخدام: سجلات التفاعل مع المنصة لتحسين تجربة المستخدم وتطوير الخدمات.' : 'Usage Information: Interaction logs with the platform to improve user experience and develop services.'}</li>
          </ul>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
          <h3 className="text-2xl font-bold text-mahallk-dark dark:text-white mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-mahallk-light rounded-full"></span>
            {lang === 'ar' ? 'كيفية استخدام وحماية البيانات' : 'How We Use and Protect Data'}
          </h3>
          <ul className={`space-y-4 text-slate-600 dark:text-slate-400 list-disc list-inside ${lang === 'ar' ? 'pr-4' : 'pl-4'}`}>
            <li>{lang === 'ar' ? 'معالجة الطلبات الشرائية وتسهيل التواصل المباشر بين التاجر والعميل.' : 'Processing purchase orders and facilitating direct communication between merchant and customer.'}</li>
            <li>{lang === 'ar' ? 'تقديم الدعم الفني المتخصص وحل أي مشكلات تقنية قد تواجه المستخدمين.' : 'Providing specialized technical support and solving any technical problems users may face.'}</li>
            <li>{lang === 'ar' ? 'تحسين كفاءة المنصة وتطوير ميزات ذكية تلبي احتياجات سوق جرجا.' : 'Improving platform efficiency and developing smart features that meet the needs of the Girga market.'}</li>
            <li>{lang === 'ar' ? 'إرسال تنبيهات هامة بخصوص حالة الطلبات أو تحديثات الحساب الضرورية.' : 'Sending important alerts regarding order status or necessary account updates.'}</li>
          </ul>
        </div>

        <div className="bg-mahallk-dark/5 dark:bg-mahallk-light/5 p-8 rounded-3xl border border-mahallk-dark/10 dark:border-mahallk-light/10">
          <h3 className="text-xl font-bold text-mahallk-dark dark:text-mahallk-light mb-4">
            {lang === 'ar' ? 'حقوقك والتحكم في بياناتك' : 'Your Rights and Controlling Your Data'}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            {lang === 'ar' 
              ? 'نحن في منصة محلك نؤكد التزامنا التام بعدم بيع أو تأجير معلوماتك الشخصية لأي أطراف ثالثة. خصوصيتك هي أولويتنا القصوى.'
              : 'At Mahallk, we confirm our full commitment not to sell or rent your personal information to any third parties. Your privacy is our top priority.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
              <h4 className="font-bold text-mahallk-dark dark:text-mahallk-light mb-2">{lang === 'ar' ? 'الوصول والتحديث' : 'Access and Update'}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'يمكنك مراجعة وتعديل بياناتك الشخصية في أي وقت من خلال إعدادات حسابك.' : 'You can review and edit your personal data at any time through your account settings.'}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
              <h4 className="font-bold text-mahallk-dark dark:text-mahallk-light mb-2">{lang === 'ar' ? 'حذف الحساب' : 'Delete Account'}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'يحق لك طلب حذف حسابك وبياناتك نهائياً من أنظمتنا عبر التواصل مع الدعم الفني.' : 'You have the right to request the deletion of your account and data permanently from our systems via technical support.'}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
              <h4 className="font-bold text-mahallk-dark dark:text-mahallk-light mb-2">{lang === 'ar' ? 'إلغاء الاشتراك' : 'Unsubscribe'}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'يمكنك اختيار عدم استلام الرسائل التسويقية عبر رابط إلغاء الاشتراك في أي بريد نرسله.' : 'You can choose not to receive marketing messages via the unsubscribe link in any email we send.'}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
              <h4 className="font-bold text-mahallk-dark dark:text-mahallk-light mb-2">{lang === 'ar' ? 'أمن البيانات' : 'Data Security'}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'نستخدم تقنيات تشفير متطورة لحماية بياناتك من الوصول غير المصرح به.' : 'We use advanced encryption technologies to protect your data from unauthorized access.'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TermsSection = ({ lang }: { lang: 'ar' | 'en' }) => (
  <section id="terms" className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-mahallk-dark dark:text-mahallk-light mb-4">
          {lang === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          {lang === 'ar' ? 'القواعد المنظمة لاستخدام منصة محلك لضمان حقوق ومسؤوليات الجميع.' : 'Rules governing the use of Mahallk platform to ensure the rights and responsibilities of everyone.'}
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700">
        <div className={`space-y-10 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <div>
            <h3 className="text-xl font-bold text-mahallk-dark dark:text-mahallk-light mb-4">
              {lang === 'ar' ? '1. مسؤولية المستخدم والتسجيل' : '1. User Responsibility and Registration'}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {lang === 'ar' 
                ? 'يلتزم المستخدم بتقديم معلومات دقيقة وصحيحة وكاملة عند التسجيل وتحديثها فور حدوث أي تغيير. المستخدم مسؤول مسؤولية كاملة عن كافة الأنشطة التي تتم من خلال حسابه وعن الحفاظ على سرية كلمة المرور.'
                : 'The user is committed to providing accurate, correct, and complete information upon registration and updating it immediately upon any change. The user is fully responsible for all activities that take place through their account and for maintaining the confidentiality of the password.'}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-mahallk-dark dark:text-mahallk-light mb-4">
              {lang === 'ar' ? '2. تعليق وإنهاء الحساب' : '2. Account Suspension and Termination'}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {lang === 'ar' 
                ? 'تحتفظ منصة محلك بالحق المطلق في تعليق أو إنهاء أي حساب ينتهك هذه الشروط، أو يقوم بأنشطة تضر بسمعة المنصة، أو يقدم منتجات غير مطابقة للمواصفات، أو يسيء استخدام خدمات التوصيل.'
                : 'Mahallk platform reserves the absolute right to suspend or terminate any account that violates these terms, or performs activities that harm the platform\'s reputation, or offers products that do not meet specifications, or misuses delivery services.'}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-mahallk-dark dark:text-mahallk-light mb-4">
              {lang === 'ar' ? '3. سياسة البيع، الدفع، والإرجاع' : '3. Sales, Payment, and Return Policy'}
            </h3>
            <ul className={`space-y-3 text-slate-600 dark:text-slate-400 list-disc list-inside ${lang === 'ar' ? 'pr-4' : 'pl-4'}`}>
              <li>{lang === 'ar' ? 'تلتزم المتاجر بعرض أسعار حقيقية وتوفير المنتجات بجودة مطابقة للصور المعروضة.' : 'Stores are committed to displaying real prices and providing products with quality matching the displayed images.'}</li>
              <li>{lang === 'ar' ? 'يتم الدفع عند الاستلام كخيار أساسي لضمان ثقة العملاء في جرجا.' : 'Payment upon delivery is the primary option to ensure customer trust in Girga.'}</li>
              <li>{lang === 'ar' ? 'يحق للعميل إرجاع المنتج في حالة وجود عيب صناعة أو عدم مطابقة للمواصفات خلال المدة القانونية.' : 'The customer has the right to return the product in case of a manufacturing defect or non-compliance with specifications within the legal period.'}</li>
              <li>{lang === 'ar' ? 'يتحمل التاجر مسؤولية جودة المنتج وتغليفه بشكل آمن قبل التسليم لمندوب التوصيل.' : 'The merchant is responsible for product quality and secure packaging before delivery to the delivery representative.'}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-mahallk-dark dark:text-mahallk-light mb-4">
              {lang === 'ar' ? '4. الملكية الفكرية وحقوق المحتوى' : '4. Intellectual Property and Content Rights'}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {lang === 'ar' 
                ? 'جميع العلامات التجارية، الشعارات، التصاميم، والبرمجيات الخاصة بمنصة محلك هي ملكية فكرية محمية. لا يجوز نسخ أو إعادة استخدام أي جزء من المنصة دون تصريح كتابي صريح.'
                : 'All trademarks, logos, designs, and software of Mahallk platform are protected intellectual property. No part of the platform may be copied or reused without explicit written permission.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ContactSection = ({ lang }: { lang: 'ar' | 'en' }) => {
  const t = TRANSLATIONS[lang];
  return (
    <section id="contact" className="py-24 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir={t.dir}>
        <div className={`text-center mb-16 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-mahallk-dark dark:text-mahallk-light mb-4">
            {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            {lang === 'ar' ? 'نحن هنا للإجابة على استفساراتك ودعمك في أي وقت' : 'We are here to answer your inquiries and support you at any time'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
              <h3 className="text-2xl font-bold text-mahallk-dark dark:text-white mb-8">
                {lang === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-mahallk-light/10 rounded-xl flex items-center justify-center text-mahallk-light">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</p>
                    <a href="mailto:contact@mahalk.com" className="text-mahallk-dark dark:text-mahallk-light font-bold hover:text-mahallk-light transition-colors">contact@mahalk.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-mahallk-light/10 rounded-xl flex items-center justify-center text-mahallk-light">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold">{lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</p>
                    <p className="text-mahallk-dark dark:text-mahallk-light font-bold">+20 123 456 7890</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-mahallk-light/10 rounded-xl flex items-center justify-center text-mahallk-light">
                    <Store size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold">{lang === 'ar' ? 'العنوان' : 'Address'}</p>
                    <p className="text-mahallk-dark dark:text-mahallk-light font-bold">{lang === 'ar' ? 'جرجا، سوهاج، مصر' : 'Girga, Sohag, Egypt'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-mahallk-dark dark:bg-slate-900 p-8 rounded-3xl text-white border border-white/5">
              <h3 className="text-xl font-bold mb-6">{lang === 'ar' ? 'تابعنا على وسائل التواصل' : 'Follow us on social media'}</h3>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/profile.php?id=61588600580615" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-mahallk-light transition-colors">
                  <Facebook size={24} />
                </a>
                <a href="https://www.instagram.com/mhlk2118/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-mahallk-light transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="https://www.tiktok.com/tiktokstudio/content" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-mahallk-light transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl">
            <h3 className="text-2xl font-bold text-mahallk-dark dark:text-mahallk-light mb-8">
              {lang === 'ar' ? 'أرسل لنا رسالة' : 'Send us a message'}
            </h3>
            <ContactForm lang={lang} />
          </div>
        </div>
      </div>
    </section>
  );
};

const SellerDashboardSection = ({ lang }: { lang: 'ar' | 'en' }) => {
  const t = TRANSLATIONS[lang];
  const stats = [
    { label: lang === 'ar' ? "إجمالي المبيعات" : "Total Sales", value: lang === 'ar' ? "12,500 ج.م" : "12,500 EGP", icon: <DollarSign />, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" },
    { label: lang === 'ar' ? "الطلبات النشطة" : "Active Orders", value: lang === 'ar' ? "24 طلب" : "24 Orders", icon: <Package />, color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20" },
    { label: lang === 'ar' ? "إجمالي المنتجات" : "Total Products", value: lang === 'ar' ? "156 منتج" : "156 Products", icon: <ShoppingBag />, color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20" },
    { label: lang === 'ar' ? "تقييم المتجر" : "Store Rating", value: "4.9/5", icon: <Star />, color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20" },
  ];

  return (
    <section id="dashboard" className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir={t.dir}>
        <div className={`flex flex-col md:flex-row justify-between items-center mb-12 gap-6 ${lang === 'ar' ? 'md:text-right' : 'md:text-left'}`}>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-mahallk-dark dark:text-mahallk-light mb-2">
              {lang === 'ar' ? 'لوحة تحكم التاجر' : 'Merchant Dashboard'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              {lang === 'ar' ? 'نظرة عامة على أداء متجرك في منصة محلك' : 'Overview of your store performance in Mahallk platform'}
            </p>
          </div>
          <div className="flex gap-4">
            <button className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all relative">
              <Bell size={24} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            <button className="bg-mahallk-dark dark:bg-mahallk-light text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-mahallk-dark/90 dark:hover:bg-white dark:hover:text-mahallk-dark transition-all">
              <Plus size={20} />
              {lang === 'ar' ? 'إضافة منتج جديد' : 'Add New Product'}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm"
            >
              <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
                {React.cloneElement(stat.icon as React.ReactElement, { size: 24 } as any)}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-bold mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-mahallk-dark dark:text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className={`p-8 border-b border-slate-50 dark:border-slate-700 flex justify-between items-center ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
              <h3 className="text-xl font-bold text-mahallk-dark dark:text-white">{lang === 'ar' ? 'آخر الطلبات' : 'Recent Orders'}</h3>
              <button className="text-mahallk-light text-sm font-bold hover:underline">{t.common.viewAll}</button>
            </div>
            <div className="overflow-x-auto">
              <table className={`w-full ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 text-sm">
                  <tr>
                    <th className="px-8 py-4 font-bold">{lang === 'ar' ? 'رقم الطلب' : 'Order ID'}</th>
                    <th className="px-8 py-4 font-bold">{lang === 'ar' ? 'العميل' : 'Customer'}</th>
                    <th className="px-8 py-4 font-bold">{lang === 'ar' ? 'التاريخ' : 'Date'}</th>
                    <th className="px-8 py-4 font-bold">{lang === 'ar' ? 'المبلغ' : 'Amount'}</th>
                    <th className="px-8 py-4 font-bold">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                  {[
                    { id: "#1254", user: lang === 'ar' ? "محمد علي" : "Mohamed Ali", date: lang === 'ar' ? "منذ ساعتين" : "2 hours ago", price: lang === 'ar' ? "450 ج.م" : "450 EGP", status: lang === 'ar' ? "قيد التوصيل" : "In Delivery", sColor: "text-blue-600 bg-blue-50 dark:bg-blue-900/20" },
                    { id: "#1253", user: lang === 'ar' ? "أحمد حسن" : "Ahmed Hassan", date: lang === 'ar' ? "منذ 5 ساعات" : "5 hours ago", price: lang === 'ar' ? "1,200 ج.م" : "1,200 EGP", status: lang === 'ar' ? "مكتمل" : "Completed", sColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" },
                    { id: "#1252", user: lang === 'ar' ? "سارة محمود" : "Sara Mahmoud", date: lang === 'ar' ? "أمس" : "Yesterday", price: lang === 'ar' ? "300 ج.م" : "300 EGP", status: lang === 'ar' ? "مكتمل" : "Completed", sColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" },
                  ].map((order, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                      <td className="px-8 py-4 font-bold text-mahallk-dark dark:text-white">{order.id}</td>
                      <td className="px-8 py-4 text-slate-600 dark:text-slate-400">{order.user}</td>
                      <td className="px-8 py-4 text-slate-400 text-sm">{order.date}</td>
                      <td className="px-8 py-4 font-bold text-mahallk-dark dark:text-white">{order.price}</td>
                      <td className="px-8 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.sColor}`}>{order.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Analytics Mini */}
          <div className="bg-mahallk-dark dark:bg-slate-800 rounded-[2.5rem] p-8 text-white border border-white/5">
            <div className={`flex justify-between items-center mb-8 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
              <h3 className="text-xl font-bold">{lang === 'ar' ? 'تحليلات سريعة' : 'Quick Analytics'}</h3>
              <BarChart3 className="text-mahallk-light" />
            </div>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>{lang === 'ar' ? 'الوصول للعملاء' : 'Customer Reach'}</span>
                  <span className="text-mahallk-light">+12%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-mahallk-light w-[75%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>{lang === 'ar' ? 'معدل التحويل' : 'Conversion Rate'}</span>
                  <span className="text-mahallk-light">+5%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-mahallk-light w-[45%]"></div>
                </div>
              </div>
              <div className="pt-8 border-t border-white/10">
                <p className="text-sm text-slate-400 mb-4">{lang === 'ar' ? 'نصيحة اليوم:' : 'Tip of the Day:'}</p>
                <p className="text-sm leading-relaxed">
                  {lang === 'ar' 
                    ? 'قم بإضافة صور عالية الجودة لمنتجاتك لزيادة فرصة البيع بنسبة تصل إلى 30%.'
                    : 'Add high-quality images to your products to increase sales opportunities by up to 30%.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ lang }: { lang: 'ar' | 'en' }) => {
  const t = TRANSLATIONS[lang];
  return (
    <footer className="bg-slate-900 dark:bg-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir={t.dir}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <Logo className="h-12 md:h-16" lang={lang} />
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed mb-8">
              {t.footer.desc}
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=61588600580615" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-mahallk-light transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/mhlk2118/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-mahallk-light transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.tiktok.com/tiktokstudio/content" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-mahallk-light transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
              </a>
              <a href="https://mahalk.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-mahallk-light transition-colors">
                <Globe size={20} />
              </a>
              <a href="https://wa.me/201234567890" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#25D366] transition-colors">
                <WhatsAppIcon size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-6">{t.footer.quickLinks}</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#home" className="hover:text-white transition-colors">{t.nav.home}</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">{t.nav.about}</a></li>
              <li><a href="#register" className="hover:text-white transition-colors">{t.nav.register}</a></li>
              <li><a href="#categories" className="hover:text-white transition-colors">{t.nav.categories}</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">{t.nav.products}</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">{t.nav.contact}</a></li>
              <li><a href="#dashboard" className="hover:text-white transition-colors">{t.nav.dashboard}</a></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">{t.nav.privacy}</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">{t.nav.terms}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-6">{t.footer.contactUs}</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-mahallk-light" />
                <a href="mailto:contact@mahalk.com" className="hover:text-white transition-colors">contact@mahalk.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-mahallk-light" />
                <span>+20 123 456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Store size={18} className="text-mahallk-light" />
                <span>{lang === 'ar' ? 'جرجا، سوهاج، مصر' : 'Girga, Sohag, Egypt'}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Mahallk. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};

const FeaturedStores = ({ lang }: { lang: 'ar' | 'en' }) => {
  const t = TRANSLATIONS[lang];
  const stores = [
    {
      name: lang === 'ar' ? "كاش افندي" : "Cash Effendi",
      category: lang === 'ar' ? "إلكترونيات وأجهزة اتصالات" : "Electronics & Communication Devices",
      location: lang === 'ar' ? "جرجا ش المحطة, سوهاج, مصر" : "Girga, Station St, Sohag, Egypt",
      desc: lang === 'ar' 
        ? "خدمة متميزة لجميع خدمات المحمول (بيع - شراء - استبدال - اكسسوار - صيانة - شحن رصيد - تحويلات كاش)"
        : "Distinguished service for all mobile services (sell - buy - exchange - accessories - maintenance - balance recharge - cash transfers)",
      img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      name: lang === 'ar' ? "سوبر ماركت الأمانة" : "Al-Amana Supermarket",
      category: lang === 'ar' ? "بقالة ومواد غذائية" : "Grocery & Foodstuffs",
      location: lang === 'ar' ? "جرجا، سوهاج" : "Girga, Sohag",
      desc: lang === 'ar' ? "كل مستلزمات البيت بأفضل الأسعار وجودة عالية." : "All home essentials at best prices and high quality.",
      img: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      name: lang === 'ar' ? "بوتيك الأناقة" : "Elegance Boutique",
      category: lang === 'ar' ? "ملابس وأزياء" : "Clothing & Fashion",
      location: lang === 'ar' ? "جرجا، ميدان المحطة" : "Girga, Station Square",
      desc: lang === 'ar' ? "أحدث صيحات الموضة العالمية والمحلية بجودة لا تضاهى." : "The latest international and local fashion trends with unmatched quality.",
      img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?auto=format&fit=crop&w=800&h=600&q=80"
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir={t.dir}>
        <div className={`flex justify-between items-end mb-12 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
          <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
            <h2 className="text-3xl md:text-4xl font-bold text-mahallk-dark dark:text-mahallk-light mb-2">
              {lang === 'ar' ? 'متاجر مميزة' : 'Featured Stores'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              {lang === 'ar' ? 'اكتشف أفضل المتاجر والخدمات المحلية في جرجا' : 'Discover the best local stores and services in Girga'}
            </p>
          </div>
          <a href="#products" className="text-mahallk-light font-bold flex items-center gap-2 hover:underline">
            {t.common.viewAll} <ChevronRight size={20} className={lang === 'ar' ? 'rotate-180' : ''} />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stores.map((store, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-slate-50 dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row group"
            >
              <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                <SafeImage 
                  src={store.img} 
                  alt={store.name} 
                  aspectRatio="aspect-auto h-full"
                  width="800"
                  height="600"
                />
              </div>
              <div className={`p-8 md:w-2/3 flex flex-col justify-center ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <div className="flex items-center gap-2 text-mahallk-light text-sm font-bold mb-2">
                  <Store size={16} />
                  <span>{store.category}</span>
                </div>
                <h3 className="text-2xl font-bold text-mahallk-dark dark:text-white mb-2">{store.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">{store.desc}</p>
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-6">
                  <Globe size={14} />
                  <span>{store.location}</span>
                </div>
                <a 
                  href="#products" 
                  className="bg-mahallk-dark dark:bg-mahallk-light text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-mahallk-dark/90 dark:hover:bg-white dark:hover:text-mahallk-dark transition-all self-start"
                >
                  {t.common.visitStore}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [modalInitialSignUp, setModalInitialSignUp] = useState(false);
  const [lang, setLang] = useState<'ar' | 'en'>(() => {
    const saved = localStorage.getItem('mahalk-lang');
    return (saved as 'ar' | 'en') || 'ar';
  });
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('mahalk-theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('mahalk-lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('mahalk-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const openLoginModal = (isSignUp: boolean) => {
    setModalInitialSignUp(isSignUp);
    setIsLoginModalOpen(true);
  };

  const t = TRANSLATIONS[lang];

  return (
    <div className={`min-h-screen flex flex-col scroll-smooth transition-colors duration-300 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-slate-900'}`} dir={t.dir}>
      <Header 
        cartCount={cartCount} 
        onSearch={setSearchQuery} 
        lang={lang} 
        setLang={setLang} 
        theme={theme} 
        setTheme={setTheme} 
        onOpenLogin={openLoginModal}
      />
      <main className="flex-grow">
        <Hero lang={lang} />
        <AboutSection lang={lang} />
        <RegistrationSection lang={lang} onOpenRegister={() => openLoginModal(true)} />
        <PrivacySection lang={lang} />
        <TermsSection lang={lang} />
        <Categories lang={lang} />
        <ProductShowcase onAddToCart={handleAddToCart} searchQuery={searchQuery} lang={lang} />
        <ContactSection lang={lang} />
        <SellerDashboardSection lang={lang} />
        <Features lang={lang} />
        <FeaturedStores lang={lang} />
        <Benefits lang={lang} />
      </main>
      <Footer lang={lang} />

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} lang={lang} initialIsSignUp={modalInitialSignUp} />

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-50 bg-mahallk-light text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20 backdrop-blur-md"
          >
            <div className="bg-white/20 p-1 rounded-full">
              <Check size={18} />
            </div>
            <span className="font-bold text-sm">
              {lang === 'ar' ? 'تمت الإضافة إلى السلة بنجاح!' : 'Added to cart successfully!'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/201234567890"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#128C7E] transition-colors group"
      >
        <WhatsAppIcon size={28} />
        <span className="absolute right-full mr-4 bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-100">
          {lang === 'ar' ? 'تواصل معنا عبر واتساب' : 'Contact us on WhatsApp'}
        </span>
      </motion.a>
      <AIAssistant 
        lang={lang} 
        theme={theme} 
        products={PRODUCTS} 
        categories={CATEGORIES} 
        searchQuery={searchQuery}
      />
    </div>
  );
}
