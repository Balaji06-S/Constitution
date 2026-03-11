import { useState, useMemo, useEffect } from 'react';
import { Search, Shield, ArrowRight, X, Bookmark, Globe, Trophy, AlertCircle, Mic, MicOff, MessageSquare, Home, Building2, Phone, Mail } from 'lucide-react';
import { constitutionData } from './data/constitutionData';
import { constitutionQuiz } from './data/quizData';
import { lawyersData } from './data/lawyersData';
import { helplineData } from './data/helplineData';
import type { ConstitutionArticle } from './data/constitutionData';
import './App.css';

export type Language = 'EN' | 'HI' | 'TE' | 'KN' | 'MR' | 'BN' | 'TA' | 'GU' | 'ML' | 'OR' | 'PA';

export interface Translation {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  searchByIssue: string;
  all: string;
  commonSituations: string;
  legalAI: string;
  quizMode: string;
  home: string;
  documents: string;
  contact: string;
  readExplanation: string;
  noResults: string;
  suggestion: string;
  showAll: string;
  recommended: string;
  selectState: string;
  selectLanguage: string;
  aadharDoc: string;
  panDoc: string;
  birthDoc: string;
  passportDoc: string;
  aadharDesc: string;
  panDesc: string;
  birthDesc: string;
  passportDesc: string;
  simpleMeaning: string;
  teacherExplain: string;
  originalText: string;
  loginTitle: string;
  loginSubtitle: string;
  loginBtn: string;
  verifyBtn: string;
  otpHint: string;
  phoneLabel: string;
  loginWelcome: string;
  enterOtp: string;
  resendOtp: string;
  otpSentTo: string;
}

// Typing for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  start: () => void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [userOtp, setUserOtp] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [selectedState, setSelectedState] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [showMap, setShowMap] = useState<string | null>(null);
  const [assistantQuery, setAssistantQuery] = useState('');
  const [assistantResponse, setAssistantResponse] = useState<ConstitutionArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ConstitutionArticle | null>(null);
  
  const [language, setLanguage] = useState<Language>('EN');
  
  const stateToLanguage: { [key: string]: Language } = {
    "Delhi": 'HI', "Maharashtra": 'MR', "Karnataka": 'KN', "Telangana": 'TE', "Andhra Pradesh": 'TE',
    "Uttar Pradesh": 'HI', "West Bengal": 'BN', "Tamil Nadu": 'TA', "Gujarat": 'GU',
    "Kerala": 'ML', "Odisha": 'OR', "Punjab": 'PA', "Bihar": 'HI', "All": 'EN'
  };

  const translations: Record<Language, Translation> = {
    EN: { title: "Know Your Rights", subtitle: "Understand the law in simple terms.", searchPlaceholder: "Describe what happened...", searchByIssue: "Search by Issue: ", all: "All", commonSituations: "Common Situations", legalAI: "Legal AI", quizMode: "Quiz Mode", home: "Home", documents: "Documents", contact: "Contact", readExplanation: "Read Explanation", noResults: "No results found.", suggestion: "Try simpler words.", showAll: "Show all laws", recommended: "Recommended Articles", selectState: "Select State", selectLanguage: "Language", aadharDoc: "Aadhar Card", panDoc: "PAN Card", birthDoc: "Birth Certificate", passportDoc: "Passport", aadharDesc: "Your unique identification document.", panDesc: "Required for financial transactions.", birthDesc: "Proof of birth and identity.", passportDesc: "Essential for international travel.", simpleMeaning: "Simple Meaning", teacherExplain: "Teacher Analogy", originalText: "Legal Text", loginTitle: "Citizen Portal", loginSubtitle: "Enter your phone number to access legal help.", loginBtn: "Send OTP", verifyBtn: "Verify & Login", otpHint: "We'll send an OTP for verification.", phoneLabel: "Phone Number", loginWelcome: "Welcome back!", enterOtp: "Enter 6-Digit OTP", resendOtp: "Resend OTP", otpSentTo: "OTP sent to" },
    HI: { title: "अपने अधिकारों को जानें", subtitle: "कानून को सरल शब्दों में समझें।", searchPlaceholder: "बताएं कि क्या हुआ...", searchByIssue: "समस्या के आधार पर: ", all: "सभी", commonSituations: "सामान्य स्थितियां", legalAI: "कानूनी AI", quizMode: "क्विज मोड", home: "होम", documents: "दस्तावेज़", contact: "संपर्क", readExplanation: "व्याख्या पढ़ें", noResults: "कोई परिणाम नहीं मिला।", suggestion: "सरल शब्दों का प्रयास करें।", showAll: "सभी कानून दिखाएं", recommended: "अनुशंसित लेख", selectState: "राज्य चुनें", selectLanguage: "भाषा", aadharDoc: "आधार कार्ड", panDoc: "पैन कार्ड", birthDoc: "जन्म प्रमाण पत्र", passportDoc: "पासपोर्ट", aadharDesc: "आपका विशिष्ट पहचान दस्तावेज़।", panDesc: "वित्तीय लेनदेन के लिए आवश्यक।", birthDesc: "जन्म और पहचान का प्रमाण।", passportDesc: "अंतरराष्ट्रीय यात्रा के लिए आवश्यक।", simpleMeaning: "सरल अर्थ", teacherExplain: "शिक्षक की तरह", originalText: "मूल पाठ", loginTitle: "नागरिक पोर्टल", loginSubtitle: "कानूनी सहायता के लिए अपना फोन नंबर दर्ज करें।", loginBtn: "OTP भेजें", verifyBtn: "सत्यापित करें और लॉगिन करें", otpHint: "हम सत्यापन के लिए ओटीपी भेजेंगे।", phoneLabel: "फ़ोन नंबर", loginWelcome: "वापसी पर स्वागत है!", enterOtp: "6-अंकों का ओटीपी दर्ज करें", resendOtp: "ओटीपी पुनः भेजें", otpSentTo: "ओटीपी भेजा गया" },
    KN: { title: "ನಿಮ್ಮ ಹಕ್ಕುಗಳನ್ನು ತಿಳಿಯಿರಿ", subtitle: "ಕಾನೂನನ್ನು ಸರಳ ಪದಗಳಲ್ಲಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.", searchPlaceholder: "ಏನಾಯಿತು ಎಂದು ವಿವರಿಸಿ...", searchByIssue: "ಸಮಸ್ಯೆಯ ಮೂಲಕ ಹುಡುಕಿ: ", all: "ಎಲ್ಲಾ", commonSituations: "ಸಾಮಾನ್ಯ ಸಂದರ್ಭಗಳು", legalAI: "ಕಾನೂನು AI", quizMode: "ಕ್ವಿಜ್ ಮೋಡ್", home: "ಹೋಮ್", documents: "ದಾಖಲೆಗಳು", contact: "ಸಂಪರ್ಕ", readExplanation: "ವಿವರಣೆ ಓದಿ", noResults: "ಯಾವುದೇ ಫಲಿತಾಂಶಗಳು ಕಂಡುಬಂದಿಲ್ಲ.", suggestion: "ಸರಳ ಪದಗಳನ್ನು ಬಳಸಿ ನೋಡಿ.", showAll: "ಎಲ್ಲಾ ಕಾನೂನುಗಳನ್ನು ತೋರಿಸಿ", recommended: "ಶಿಫಾರಸು ಮಾಡಿದ ಲೇಖನಗಳು", selectState: "ರಾಜ್ಯವನ್ನು ಆರಿಸಿ", selectLanguage: "ಭಾಷೆ", aadharDoc: "ಆಧಾರ್ ಕಾರ್ಡ್", panDoc: "ಪ್ಯಾನ್ ಕಾರ್ಡ್", birthDoc: "ಜನನ ಪ್ರಮಾಣಪತ್ರ", passportDoc: "ಪಾസ്‌ಪೋರ್ಟ್", aadharDesc: "ನಿಮ್ಮ ಅನನ್ಯ ಗುರುತಿನ ದಾಖಲೆ.", panDesc: "ಹಣಕಾಸಿನ ವ್ಯವಹಾರಗಳಿಗೆ ಅಗತ್ಯವಿದೆ.", birthDesc: "ಜನನ ಮತ್ತು ಗುರುತಿನ ಪುರಾವೆ.", passportDesc: "ಅಂತರಾಷ್ಟ್ರೀಯ ಪ್ರಯಾಣಕ್ಕೆ ಅಗತ್ಯ.", simpleMeaning: "ಸರಳ ಅರ್ಥ", teacherExplain: "ಶಿಕ್ಷಕರ ಉದಾಹರಣೆ", originalText: "ಮೂಲ ಪಠ್ಯ", loginTitle: "ನಾಗರಿಕ ಪೋರ್ಟಲ್", loginSubtitle: "ಕಾನೂನು ಸಹಾಯ ಪಡೆಯಲು ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.", loginBtn: "OTP ಕಳುಹಿಸಿ", verifyBtn: "ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಲಾಗಿನ್ ಮಾಡಿ", otpHint: "ಪರಿಶೀಲನೆಗಾಗಿ ನಾವು OTP ಕಳುಹಿಸುತ್ತೇವೆ.", phoneLabel: "ಫೋನ್ ಸಂಖ್ಯೆ", loginWelcome: "ಮರಳಿ ಸ್ವಾಗತ!", enterOtp: "6-ಅಂಕಿಯ OTP ನಮೂದಿಸಿ", resendOtp: "OTP ಮರುಕಳುಹಿಸಿ", otpSentTo: "OTP ಕಳುಹಿಸಲಾಗಿದೆ" },
    MR: { title: "आपले हक्क जाणून घ्या", subtitle: "कायदा सोप्या भाषेत समजून घ्या.", searchPlaceholder: "काय झाले ते सांगा...", searchByIssue: "समस्येनुसार शोधा: ", all: "सर्व", commonSituations: "सामान्य परिस्थिती", legalAI: "लीगल AI", quizMode: "क्विझ मोड", home: "होम", documents: "दस्तऐवज", contact: "संपर्क", readExplanation: "स्पष्टीकरण वाचा", noResults: "निकाल सापडला नाही.", suggestion: "सोपे शब्द वापरून पहा.", showAll: "सर्व कायदे दाखवा", recommended: "शिफारस केलेले लेख", selectState: "राज्य निवડા", selectLanguage: "भाषा", aadharDoc: "आधार कार्ड", panDoc: "पॅन कार्ड", birthDoc: "जन्म दाखला", passportDoc: "पासपोर्ट", aadharDesc: "तुमचा अद्वितीय ओळख दस्तऐवज.", panDesc: "आर्थिक व्यवहारांसाठी आवश्यक.", birthDesc: "जन्म आणि ओळखीचा पुराਵਾ.", passportDesc: "आंतरराष्ट्रीय प्रवासासाठी आवश्यक.", simpleMeaning: "सोपा अर्थ", teacherExplain: "शिक्षकाचे उदाहरण", originalText: "मूळ मजकूर", loginTitle: "नागरिक पोर्टल", loginSubtitle: "कायदेशीर मदतीसाठी तुमचा फोन नंबर प्रविष्ट करा.", loginBtn: "OTP पाठवा", verifyBtn: "सत्यापित करा आणि लॉगिन करा", otpHint: "आम्ही सत्यापनासाठी OTP पाठवू.", phoneLabel: "फोन नंबर", loginWelcome: "पुन्हा स्वागत आहे!", enterOtp: "6-अंकी OTP प्रविष्ट करा", resendOtp: "OTP पुन्हा पाठवा", otpSentTo: "OTP पाठवला" },
    TA: { title: "உங்கள் உரிமைகளை அறிந்து கொள்ளுங்கள்", subtitle: "சரியான முறையில் சட்டத்தைப் புரிந்து கொள்ளுங்கள்.", searchPlaceholder: "என்ன நடந்தது என்று விவரிக்கவும்...", searchByIssue: "பிரச்சனை மூலம் தேடுங்கள்: ", all: "அனைத்தும்", commonSituations: "பொதுவான சூழ்நிலைகள்", legalAI: "சட்ட AI", quizMode: "வினாடி வினா முறை", home: "முகப்பு", documents: "ஆவணங்கள்", contact: "தொடர்பு", readExplanation: "விளக்கத்தைப் படியுங்கள்", noResults: "முடிவுகள் எதுவும் கிடைக்கவில்லை.", suggestion: "எளிமையான சொற்களை முயற்சிக்கவும்.", showAll: "அனைத்து சட்டங்களையும் காட்டு", recommended: "பரிந்துரைக்கப்பட்ட கட்டுரைகள்", selectState: "மாநிலத்தைத் தேர்ந்தெடுக்கவும்", selectLanguage: "மொழி", aadharDoc: "ஆதார் அட்டை", panDoc: "பான் அட்டை", birthDoc: "பிறப்புச் சான்றிதழ்", passportDoc: "கடவுச்சீட்டு", aadharDesc: "உங்கள் தனித்துவமான அடையாள ஆவணம்.", panDesc: "நிதி பரிவர்த்தனைகளுக்கு தேவை.", birthDesc: "பிறப்பு மற்றும் அடையாள சான்று.", passportDesc: "சர்வதேச பயணத்திற்கு அவசியமானது.", simpleMeaning: "எளிய பொருள்", teacherExplain: "ஆசிரியர் உதாரணம்", originalText: "அசல் உரை", loginTitle: "குடிமக்கள் போர்ட்டல்", loginSubtitle: "சட்ட உதவியை அணுக உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்.", loginBtn: "OTP அனுப்பு", verifyBtn: "சரிபார்த்து உள்நுழையவும்", otpHint: "சரிபார்ப்பிற்காக OTP அனுப்புவோம்.", phoneLabel: "தொலைபேசி எண்", loginWelcome: "மீண்டும் வருக!", enterOtp: "6-இலக்க OTP ஐ உள்ளிடவும்", resendOtp: "மீண்டும் OTP அனுப்பு", otpSentTo: "OTP அனுப்பப்பட்டது" },
    BN: { title: "আপনার অধিকার জানুন", subtitle: "সরল ভাষায় আইন বুঝুন।", searchPlaceholder: "কি হয়েছে বর্ণনা করুন...", searchByIssue: "সমস্যার মাধ্যমে খুঁজুন: ", all: "সব", commonSituations: "সাধারণ পরিস্থিতি", legalAI: "আইনি AI", quizMode: "কوییজ মোড", home: "হোম", documents: "নথিপত্র", contact: "যোগাযোগ", readExplanation: "ব্যাখ্যা পড়ুন", noResults: "কোন ফলাফল পাওয়া যায়নি।", suggestion: "সহজ শব্দ চেষ্টা করুন।", showAll: "সব আইন দেখান", recommended: "প্রস্তাবিত নিবন্ধ", selectState: "রাজ্য নির্বাচন করুন", selectLanguage: "ভাষা", aadharDoc: "আধার কার্ড", panDoc: "প্যান কার্ড", birthDoc: "জন্ম শংসাবত্র", passportDoc: "পাসপোর্ট", aadharDesc: "আপনার অনন্য পরিচয় নথি।", panDesc: "আর্থিক লেনদেনের জন্য প্রয়োজনীয়।", birthDesc: "জন্ম ও পরিচয়ের প্রমাণ।", passportDesc: "আন্তর্জাতিক ভ্রমণের জন্য অপরিহার্য।", simpleMeaning: "সরল অর্থ", teacherExplain: "শিক্ষকের উদাহরণ", originalText: "মূল পাঠ", loginTitle: "নাগরিক পোর্টাল", loginSubtitle: "আইনি সহায়তা পেতে আপনার ফোন নম্বর লিখুন।", loginBtn: "OTP পাঠান", verifyBtn: "যাচাই করুন এবং লগইন করুন", otpHint: "আমরা যাচাইয়ের জন্য একটি OTP পাঠাব।", phoneLabel: "ফোন নম্বর", loginWelcome: "আবার স্বাগতম!", enterOtp: "6-সংখ্যার OTP লিখুন", resendOtp: "আবার OTP পাঠান", otpSentTo: "OTP পাঠানো হয়েছে" },
    TE: { title: "మీ హక్కులను తెలుసుకోండి", subtitle: "చట్టాన్ని సరళంగా అర్థం చేసుకోండి.", searchPlaceholder: "ఏం జరిగిందో వివరించండి...", searchByIssue: "సమస్య ద్వారా: ", all: "అన్నీ", commonSituations: "సాధారణ పరిస్థితులు", legalAI: "లీగల్ AI", quizMode: "క్విజ్ మోడ్", home: "హోమ్", documents: "పత్రాలు", contact: "సంప్రదించండి", readExplanation: "వివరణ చదవండి", noResults: "ఫలితాలు లేవు.", suggestion: "సరళమైన పదాలను వాడండి.", showAll: "అన్ని చట్టాలు", recommended: "సిఫార్సు చేయబడినవి", selectState: "రాష్ట్రం", selectLanguage: "భాష", aadharDoc: "आधार కార్డ్", panDoc: "పాన్ కార్డ్", birthDoc: "పుట్టిన ధృవీకరణ పత్రం", passportDoc: "పాస్‌పోర్ట్", aadharDesc: "మీ ప్రత్యేక గుర్తింపు పత్రం.", panDesc: "ఆర్థిక లావాదేవీలకు అవసరం.", birthDesc: "జననం మరియు గుర్తింపు ఆధారం.", passportDesc: "అంతర్జాతీయ ప్రయాణానికి అవసరం.", simpleMeaning: "సరళమైన అర్థం", teacherExplain: "టీచర్ లాగా", originalText: "అసలు వచనం", loginTitle: "సిటిజన్ పోర్టల్", loginSubtitle: "చట్టపరమైన సహాయాన్ని పొందడానికి మీ ఫోన్ నంబర్‌ను నమోదు చేయండి.", loginBtn: "OTP పంపండి", verifyBtn: "ధృవీకరించండి & లాగిన్ అవ్వండి", otpHint: "మేము ధృవీకరణ కోసం OTPని పంపుతాము.", phoneLabel: "ఫోన్ నంబర్", loginWelcome: "తిరిగి స్వాగతం!", enterOtp: "6-అంకెల OTPని నమోదు చేయండి", resendOtp: "OTPని మళ్లీ పంపండి", otpSentTo: "OTP పంపబడింది" },
    GU: { title: "તમારા અધિકારો જાણો", subtitle: "કાયદાને સરળ શબ્દોમાં સમજો.", searchPlaceholder: "શું થયું તે વર્ણવો...", searchByIssue: "સમસ્યા દ્વારા શોધો: ", all: "બધા", commonSituations: "સામાન્ય પરિસ્થિતિઓ", legalAI: "કાનૂની AI", quizMode: "ક્વિઝ મોડ", home: "હોમ", documents: "દસ્તાવેજો", contact: "સંપર્ક", readExplanation: "સ્પષ્ટતા વાંચો", noResults: "કોઈ પરિણામ મળ્યું નથી.", suggestion: "સરળ શબ્દોનો પ્રયાસ કરો.", showAll: "બધા કાયદા બતાવો", recommended: "ભલામણ કરેલ લેખો", selectState: "રાજ્ય પસંદ કરો", selectLanguage: "ભાષા", aadharDoc: "આધાર કાર્ડ", panDoc: "પાન કાર્ડ", birthDoc: "જન્મ પ્રમાણપત્ર", passportDoc: "પાસપોર્ટ", aadharDesc: "તમારો અનન્ય ઓળખ દસ્તાવેજ.", panDesc: "નાણાકીય વ્યવહારો માટે જરૂરી.", birthDesc: "જન્મ અને ઓળખનો પુરોવો.", passportDesc: "આંતરરાષ્ટ્રીય પ્રવાસ માટે આવશ્યક.", simpleMeaning: "સરળ અર્થ", teacherExplain: "શિક્ષકનું ઉદાહરણ", originalText: "મૂળ લખાણ", loginTitle: "નાગરિક પોર્ટલ", loginSubtitle: "કાનૂની સહાય મેળવવા માટે તમારો ફોન નંબર દાખલ કરો.", loginBtn: "OTP મોકલો", verifyBtn: "ચકાસો અને લોગિન કરો", otpHint: "અમે ચકાસણી માટે OTP મોકલીશું.", phoneLabel: "ફોન નંબર", loginWelcome: "ફરી સ્વાગત છે!", enterOtp: "6-અંકનો OTP દાખલ કરો", resendOtp: "OTP ફરીથી મોકલો", otpSentTo: "OTP મોકલવામાં આવ્યો છે" },
    ML: { title: "നിങ്ങളുടെ അവകാശങ്ങൾ അറിയുക", subtitle: "നിയമത്തെ ലളിതമായ വാക്കുകളിൽ മനസ്സിലാക്കുക.", searchPlaceholder: "എന്താണ് സംഭവിച്ചതെന്ന് വിവരിക്കുക...", searchByIssue: "പ്രശ്നത്തിലൂടെ തിരയുക: ", all: "എല്ലാം", commonSituations: "സാധാരണ സാഹചര്യങ്ങൾ", legalAI: "ലീഗൽ AI", quizMode: "ക്വിസ് മോഡ്", home: "ഹോം", documents: "രേഖകൾ", contact: "ബന്ധപ്പെടുക", readExplanation: "വിശദീകരണം വായിക്കുക", noResults: "ഫലങ്ങളൊന്നും ലഭ്യമല്ല.", suggestion: "ലളിതമായ വാക്കുകൾ പരീക്ഷിക്കുക.", showAll: "എല്ലാ നിയമങ്ങളും കാണിക്കുക", recommended: "ശുപാർശ ചെയ്യുന്ന ലേഖനങ്ങൾ", selectState: "സംസ്ഥാനം തിരഞ്ഞെടുക്കുക", selectLanguage: "ഭാഷ", aadharDoc: "ആധാർ കാർഡ്", panDoc: "പാൻ കാർഡ്", birthDoc: "ജനന സർട്ടിഫിക്കറ്റ്", passportDoc: "പാസ്പോർട്ട്", aadharDesc: "നിങ്ങളുടെ അദ്വിതീയ തിരിച്ചറിയൽ രേഖ.", panDesc: "സാമ്പത്തിക ഇടപാടുകൾക്ക് ആവശ്യമാണ്.", birthDesc: "ജനനത്തിന്റെയും തിരിച്ചറിയലിന്റെയും തെളിവ്.", passportDesc: "അന്താരാഷ്ട്ര യാത്രകൾക്ക് അത്യാവശ്യമാണ്.", simpleMeaning: "ലളിതമായ അർത്ഥം", teacherExplain: "അധ്യാപകന്റെ ഉദാഹരണം", originalText: "യഥാർത്ഥ പാഠം", loginTitle: "സിറ്റിസൺ പോർട്ടൽ", loginSubtitle: "നിയമസഹായം ലഭിക്കുന്നതിന് നിങ്ങളുടെ ഫോൺ നമ്പർ നൽകുക.", loginBtn: "OTP അയയ്ക്കുക", verifyBtn: "പരിശോധിച്ചു ലോഗിൻ ചെയ്യുക", otpHint: "സ്ഥിരീകരണത്തിനായി ഞങ്ങൾ ഒരു OTP അയയ്ക്കും.", phoneLabel: "ഫോൺ നമ്പർ", loginWelcome: "വീണ്ടും സ്വാഗതം!", enterOtp: "6 അക്ക OTP നൽകുക", resendOtp: "OTP വീണ്ടും അയയ്ക്കുക", otpSentTo: "OTP അയച്ചു" },
    OR: { title: "ନିଜର ଅଧିକାର ଜାଣନ୍ତୁ", subtitle: "ସରଳ ଶବ୍ଦରେ ନିୟମକୁ ବୁଝନ୍ତୁ।", searchPlaceholder: "କଣ ହେଲା ବର୍ଣ୍ଣନା କରନ୍ତୁ...", searchByIssue: "ସମସ୍ୟା ଅନୁସାରେ ଖୋଜନ୍ତୁ: ", all: "ସମସ୍ତ", commonSituations: "ସାଧାରଣ ପରିସ୍ଥିତି", legalAI: "ଲିଗାଲ୍ AI", quizMode: "କ୍ୱିଜ୍ ମୋଡ୍", home: "ହୋମ୍", documents: "ଦସ୍ତାବେଜ", contact: "ଯୋଗାଯୋଗ", readExplanation: "ବ୍ୟାଖ୍ୟା ପଢନ୍ତୁ", noResults: "କୌଣସି ଫଳାଫଳ ମିଳିଲା ନାହିଁ।", suggestion: "ସରଳ ଶବ୍ਦ ଚେଷ୍ଟା କରନ୍ତୁ।", showAll: "ସମସ୍ତ ନିୟମ ଦେଖାନ୍ତୁ", recommended: "ସୁପାରିଶ କରାଯାଇଥିବା ଲେଖା", selectState: "ରାଜ୍ୟ ଚୟନ କରନ୍ତୁ", selectLanguage: "ଭାଷା", aadharDoc: "ଆଧାର କାର୍ଡ", panDoc: "ପ୍ୟାନ୍ କାର୍ଡ", birthDoc: "ଜନ୍ମ ପ୍ରମାଣପତ୍ର", passportDoc: "ପାସପୋର୍ଟ", aadharDesc: "ଆପଣଙ୍କର ଅନନ୍ಯ ପରିଚୟ ଦସ୍ତାବେଜ।", panDesc: "ଆର୍ଥିକ କାରବାର ପାଇଁ ଆବଶ୍ୟକ।", birthDesc: "ଜନ୍ମ ଏବଂ ପରିଚୟର ପ୍ରମାଣ।", passportDesc: "ଆନ୍ତର୍ଜାତୀୟ ଯାତ୍ରା ପାଇଁ ଅପରିହାର୍ଯ୍ୟ।", simpleMeaning: "ସରଳ ଅର୍ଥ", teacherExplain: "ଶିକ୍ଷକଙ୍କ ଉଦାହରଣ", originalText: "ମୂଳ ପାଠ", loginTitle: "ନାଗରିକ ପୋର୍ଟାଲ", loginSubtitle: "ଆଇନଗତ ସହାୟତା ପାଇଁ ଆପଣଙ୍କ ଫୋନ୍ ନମ୍ବର ଦିଅନ୍ତୁ।", loginBtn: "OTP ପଠାନ୍ତୁ", verifyBtn: "ଯାଞ୍ચ କରନ୍ତୁ ଏବଂ ଲଗଇନ୍ କରନ୍ତୁ", otpHint: "ଆମେ ଯାଞ୍ચ ପାଇଁ ଏକ OTP ପଠାଇବୁ।", phoneLabel: "ଫୋନ୍ ନମ୍ବର", loginWelcome: "ପୁଣି ସ୍ୱାଗତ!", enterOtp: "6-ଅଙ୍କ ବିଶિଷ୍ଟ OTP ଦିଅନ୍ତୁ", resendOtp: "OTP ପୁନର୍ବାର ପଠାନ୍ତୁ", otpSentTo: "OTP ପଠାଗଲା" },
    PA: { title: "ਆਪਣੇ ਅਧਿਕਾਰ ਜਾਣੋ", subtitle: "ਕਾਨੂੰਨ ਨੂੰ ਸਰਲ ਸ਼ਬਦਾਂ ਵਿੱਚ समझੋ।", searchPlaceholder: "ਦੱਸੋ ਕੀ ਹੋਇਆ...", searchByIssue: "ਸਮੱਸਿਆ ਅਨੁਸਾਰ ਖੋਜੋ: ", all: "ਸਾਰੇ", commonSituations: "ਆਮ ਸਥਿਤੀਆਂ", legalAI: "ਕਾਨੂੰਨੀ AI", quizMode: "ਕੁਇਜ਼ ਮੋਡ", home: "ਹੋਮ", documents: "ਦਸਤਾਵੇਜ਼", contact: "ਸੰਪਰਕ", readExplanation: "ਵਿਆਖਿਆ ਪੜ੍ਹੋ", noResults: "ਕੋਈ ਨਤੀਜਾ ਨਹੀਂ ਮਿਲਿਆ।", suggestion: "ਸਰਲ ਸ਼ਬਦਾਂ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੋ।", showAll: "ਸਾਰੇ ਕਾਨੂੰਨ ਦਿਖਾਓ", recommended: "ਸਿਫ਼ਾਰਸ਼ੀ ਲੇਖ", selectState: "ਰਾਜ ਚੁਣੋ", selectLanguage: "ਭਾਸ਼ਾ", aadharDoc: "ਆਧਾਰ ਕਾਰਡ", panDoc: "ਪੈਨ ਕਾਰਡ", birthDoc: "ਜਨਮ ਸਰਟੀਫਿਕੇਟ", passportDoc: "ਪਾਸਪੋਰਟ", aadharDesc: "ਤੁਹਾਡਾ ਵਿਲੱਖਣ ਪਛਾਣ ਦਸਤਾਵੇਜ਼।", panDesc: "ਵਿੱਤੀ ਲੈਣ-ਦੇਣ ਲਈ ਲੋੜੀਂਦਾ।", birthDesc: "ਜਨਮ ਅਤੇ ਪਛਾਣ ਦਾ ਸਬੂਤ।", passportDesc: "ਅੰਤਰਰਾਸ਼ਟਰੀ ਯਾਤਰਾ ਲਈ ਜ਼ਰੂਰੀ।", simpleMeaning: "ਸਰਲ ਅਰਥ", teacherExplain: "ਅਧਿਆਪਕ ਦੀ ਉਦਾਹરણ", originalText: "ਮੂਲ ਪਾਠ", loginTitle: "ਨਾਗਰਿਕ ਪੋਰਟਲ", loginSubtitle: "ਕਾਨੂੰਨੀ ਸਹਾਇਤਾ ਲਈ ਆਪਣਾ ਫ਼ੋਨ ਨੰਬਰ ਦਰਜ ਕਰੋ।", loginBtn: "OTP ਭੇਜੋ", verifyBtn: "ਤਸਦੀਕ ਕਰੋ ਅਤੇ ਲੌਗਇਨ ਕਰੋ", otpHint: "ਅਸੀਂ ਤਸਦੀਕ ਲਈ ਇੱਕ OTP ਭੇਜਾਂਗੇ।", phoneLabel: "ਫ਼ੋਨ ਨੰਬਰ", loginWelcome: "ਜੀ ਆਇਆਂ ਨੂੰ!", enterOtp: "6-ਅੰਕਾਂ ਦਾ OTP ਦਰਜ ਕਰੋ", resendOtp: "OTP ਦੁਬਾਰਾ ਭੇਜੋ", otpSentTo: "OTP ਭੇਜਿਆ ਗਿਆ" }
  };

  const t = translations[language];

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    if (stateToLanguage[state]) setLanguage(stateToLanguage[state]);
    setSelectedDistrict('All');
  };

  const getArticleContent = (article: ConstitutionArticle) => {
    const trans = article.translations ? article.translations[language] : null;
    return {
      title: trans?.title || article.title,
      simplified: trans?.simplified || article.simplified,
      content: trans?.content || article.content,
      teacher_analogy: trans?.teacher_analogy || article.teacher_analogy
    };
  };

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) return alert("Please enter a valid 10-digit number.");
    
    // In a real-world app, you would call an API here (Firebase, Twilio, etc.)
    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(mockOtp);
    setIsOtpSent(true);
    
    // Simulating sending SMS
    console.log(`%c [REAL WORLD SIMULATION] SMS Sent to ${phoneNumber}: Your OTP is ${mockOtp} `, 'background: #222; color: #bada55');
    alert(`Debug: Your OTP is ${mockOtp}`);
  };

  const handleOtpChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...userOtp];
    newOtp[index] = value.substring(value.length - 1);
    setUserOtp(newOtp);
    
    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = userOtp.join('');
    if (enteredOtp === generatedOtp) {
      setIsLoggedIn(true);
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return <span>{parts.map((part, i) => part.toLowerCase() === highlight.toLowerCase() ? <mark key={i}>{part}</mark> : part)}</span>;
  };

  const handleVoiceSearch = () => {
    const RecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!RecognitionConstructor) return;
    const recognition = new RecognitionConstructor();
    const langMap: Record<string, string> = { 'EN': 'en-IN', 'HI': 'hi-IN', 'TE': 'te-IN', 'KN': 'kn-IN', 'MR': 'mr-IN', 'BN': 'bn-IN', 'TA': 'ta-IN', 'GU': 'gu-IN' };
    recognition.lang = langMap[language] || 'en-IN';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: SpeechRecognitionEvent) => setSearchTerm(event.results[0][0].transcript);
    recognition.start();
  };

  const askAssistant = () => {
    if (!assistantQuery) return;
    const query = assistantQuery.toLowerCase();
    const related = constitutionData.filter(a => a.keywords.some(k => query.includes(k.toLowerCase()))).slice(0, 3);
    setAssistantResponse(related);
  };

  const [bookmarks, setBookmarks] = useState<string[]>(() => JSON.parse(localStorage.getItem('constitution_bookmarks') || '[]'));
  useEffect(() => localStorage.setItem('constitution_bookmarks', JSON.stringify(bookmarks)), [bookmarks]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    const correct = index === constitutionQuiz[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < constitutionQuiz.length) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else setQuizFinished(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0); setScore(0); setQuizFinished(false);
    setSelectedAnswer(null); setIsCorrect(null);
  };

  const filteredArticles = useMemo(() => {
    const s = searchTerm.toLowerCase();
    return constitutionData.filter(a => 
      (a.number.toLowerCase().includes(s) || a.title.toLowerCase().includes(s) || a.keywords.some(k => k.toLowerCase().includes(s))) &&
      (!selectedCategory || a.category === selectedCategory)
    );
  }, [searchTerm, selectedCategory]);

  const categories = Array.from(new Set(constitutionData.map(a => a.category)));

  const documentData = useMemo(() => [
    { id: 'aadhar', title: t.aadharDoc, icon: <Shield size={32} />, description: t.aadharDesc, link: 'https://uidai.gov.in/', laws: [{ title: 'Right to Privacy', section: 'Art 21', info: 'Aadhar data is protected under privacy laws.' }, { title: 'Voluntary Nature', section: 'SC Ruling', info: 'Cannot be mandatory for all services.' }] },
    { id: 'pan', title: t.panDoc, icon: <Globe size={32} />, description: t.panDesc, link: 'https://www.incometax.gov.in/', laws: [{ title: 'Financial Identity', section: 'Income Tax Act', info: 'Mandatory for transactions above ₹50,000.' }] },
    { id: 'birth', title: t.birthDoc, icon: <Building2 size={32} />, description: t.birthDesc, link: 'https://crsorgi.gov.in/', laws: [{ title: 'Right to Identity', section: 'RBD Act 1969', info: 'Every birth must be registered within 21 days.' }] },
    { id: 'passport', title: t.passportDoc, icon: <AlertCircle size={32} />, description: t.passportDesc, link: 'https://www.passportindia.gov.in/', laws: [{ title: 'Right to Travel', section: 'Art 21', info: 'Right to go abroad is part of personal liberty.' }] }
  ], [t]);

  const indianStates = ["All", "Delhi", "Maharashtra", "Karnataka", "Telangana", "Andhra Pradesh", "Uttar Pradesh", "West Bengal", "Tamil Nadu", "Punjab", "Gujarat", "Kerala"];

  const districts = useMemo(() => {
    if (selectedState === 'All') return ["All"];
    const filtered = lawyersData.filter(l => l.state === selectedState);
    return ["All", ...Array.from(new Set(filtered.map(l => l.district)))];
  }, [selectedState]);

  const filteredLawyers = useMemo(() => lawyersData.filter(l => 
    (selectedState === 'All' || l.state === selectedState) && (selectedDistrict === 'All' || l.district === selectedDistrict)
  ), [selectedState, selectedDistrict]);

  if (!isLoggedIn) {
  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <div className="login-logo">
            <Globe className="chakra-icon" size={40} /> Law
          </div>

        <h1>{t.loginTitle}</h1>
          <p>
            {isOtpSent
              ? `${t.otpSentTo} +91 ${phoneNumber}`
              : t.loginSubtitle}
          </p>
        </div>

        {!isOtpSent ? (
          <form className="login-form" onSubmit={handleSendOTP}>
            <div className="input-group">
              <label>{t.phoneLabel}</label>

              <div className="input-with-icon">
                <Phone size={20} />

                <input
                  type="tel"
                  placeholder="00000 00000"
                  required
                  value={phoneNumber}
                  maxLength={10}
                  onChange={(e) =>
                    setPhoneNumber(
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                />
              </div>

              <p className="otp-hint">{t.otpHint}</p>
            </div>

            <button type="submit" className="login-btn">
              {t.loginBtn}
            </button>
          </form>
        ) : (
          <form className="login-form" onSubmit={handleVerifyOTP}>
            <div className="input-group">
              <label>{t.enterOtp}</label>

              <div className="otp-input-container">
                {userOtp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    required
                    onChange={(e) =>
                      handleOtpChange(e.target.value, idx)
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === "Backspace" &&
                        !digit &&
                        idx > 0
                      ) {
                        const prev =
                          document.getElementById(
                            `otp-${idx - 1}`
                          );
                        prev?.focus();
                      }
                    }}
                  />
                ))}
              </div>
            </div>

            <button type="submit" className="login-btn">
              {t.verifyBtn}
            </button>

            <button
              type="button"
              className="back-link"
              style={{ marginTop: "1rem" }}
              onClick={() => {
                setIsOtpSent(false);
                setUserOtp(["", "", "", "", "", ""]);
              }}
            >
              {t.resendOtp}
            </button>
          </form>
        )}

        <div className="login-footer">
          🇮🇳 Protected by Indian Law
        </div>

      </div>
    </div>
  );
}
  return (
    <div className="app-container">
      <nav className="top-nav">
        <div className="nav-logo" onClick={() => window.location.reload()} style={{cursor:'pointer'}}><Globe className="chakra-icon" size={28} /><span>Law</span></div>
        <div className="nav-actions">
          <button className="nav-btn" onClick={() => window.scrollTo(0, 0)}><Home size={18} /><span>{t.home}</span></button>
          <button className="nav-btn" onClick={() => setShowDocuments(true)}><Building2 size={18} /><span>{t.documents}</span></button>
          <button className="nav-btn" onClick={() => setShowContact(true)}><Phone size={18} /><span>{t.contact}</span></button>
          <button className="nav-btn assistant-btn" onClick={() => setShowAssistant(true)}><MessageSquare size={18} /><span>{t.legalAI}</span></button>
          <button className="nav-btn" onClick={() => { setShowQuiz(true); resetQuiz(); }}><Trophy size={18} /><span>{t.quizMode}</span></button>
          <div className="lang-selector">
            <Globe size={18} /><select value={language} onChange={(e) => setLanguage(e.target.value as Language)}>
              <option value="EN">English</option>
              <option value="HI">हिंदी</option>
              <option value="TE">తెలుగు</option>
              <option value="KN">ಕನ್ನಡ</option>
              <option value="MR">मराठी</option>
              <option value="TA">தமிழ்</option>
              <option value="BN">বাংলা</option>
              <option value="GU">ગુજરાતી</option>
              <option value="ML">മലയാളം</option>
              <option value="OR">ଓଡ଼ିଆ</option>
              <option value="PA">ਪੰਜਾਬੀ</option>
            </select>
          </div>
          <button className="nav-btn" onClick={() => setIsLoggedIn(false)}><X size={18} /> Logout</button>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-content">
          <h1>{t.title}</h1><p>{t.subtitle}</p>
          <div className="search-container">
            <Search className="search-icon" size={24} />
            <input type="text" placeholder={t.searchPlaceholder} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <button className={`voice-btn ${isListening ? 'listening' : ''}`} onClick={handleVoiceSearch} title="Voice Search">{isListening ? <MicOff size={20} /> : <Mic size={20} />}</button>
          </div>
          <div className="category-tags">
            <button className={!selectedCategory ? 'active' : ''} onClick={() => setSelectedCategory(null)}>{t.all}</button>
            {categories.map(c => <button key={c} className={selectedCategory === c ? 'active' : ''} onClick={() => setSelectedCategory(c)}>{c}</button>)}
          </div>
        </div>
      </header>

      <main className="content">
        <section className="quick-nav-section">
          <div className="quick-nav-cards">
            <button className="quick-nav-card" onClick={() => window.scrollTo(0, 0)}><div className="icon-wrapper"><Home size={32} /></div><div className="card-text"><h3>{t.home}</h3><p>Main Page</p></div></button>
            <button className="quick-nav-card" onClick={() => setShowDocuments(true)}><div className="icon-wrapper"><Building2 size={32} /></div><div className="card-text"><h3>{t.documents}</h3><p>Law Sections</p></div></button>
            <button className="quick-nav-card" onClick={() => setShowContact(true)}><div className="icon-wrapper"><Phone size={32} /></div><div className="card-text"><h3>{t.contact}</h3><p>Find Lawyers</p></div></button>
          </div>
        </section>

        <section className="article-grid">
          {filteredArticles.length > 0 ? filteredArticles.map(article => {
            const c = getArticleContent(article);
            return (
              <div key={article.id} className="article-card" onClick={() => setSelectedArticle(article)}>
                <div className="article-header">
                  <span className="article-number">Article {highlightText(article.number, searchTerm)}</span>
                  <div style={{display:'flex', gap:'0.5rem', alignItems:'center'}}>
                    <span className="article-category">{article.category}</span>
                    <button className={`bookmark-btn ${bookmarks.includes(article.id) ? 'active' : ''}`} onClick={(e) => toggleBookmark(article.id, e)}><Bookmark size={18} fill={bookmarks.includes(article.id) ? "currentColor" : "none"} /></button>
                  </div>
                </div>
                <h3>{highlightText(c.title, searchTerm)}</h3>
                <p className="preview">{c.simplified.substring(0, 100)}...</p>
                <div className="card-footer"><span>{t.readExplanation}</span><ArrowRight size={16} /></div>
              </div>
            );
          }) : (
            <div className="no-results-container">
              <div className="no-results"><AlertCircle size={48} /><p>{t.noResults}</p><button className="reset-search" onClick={() => setSearchTerm('')}>{t.showAll}</button></div>
              <div className="featured-articles-section"><h3>{t.recommended}</h3>
                <div className="article-grid">{constitutionData.slice(0, 3).map(a => { const c = getArticleContent(a); return <div key={a.id} className="article-card" onClick={() => setSelectedArticle(a)}><div className="article-header"><span>Art {a.number}</span></div><h3>{c.title}</h3><div className="card-footer"><span>{t.readExplanation}</span><ArrowRight size={16} /></div></div>; })}</div>
              </div>
            </div>
          )}
        </section>
      </main>

      {showDocuments && (
        <div className="modal-overlay" onClick={() => setShowDocuments(false)}>
          <div className="modal-content department-modal" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowDocuments(false)}><X size={24} /></button>
            <div className="modal-header"><h1>{t.documents}</h1></div>
            <div className="departments-container">{documentData.map(doc => (
              <div key={doc.id} className="dept-section"><div className="dept-title-box">{doc.icon}<div><h2>{doc.title}</h2><p>{doc.description}</p></div></div>
                <div className="dept-laws-grid">{doc.laws.map((law, i) => <div key={i} className="law-info-card"><h4>{law.title}</h4><span>{law.section}</span><p>{law.info}</p></div>)}</div>
              </div>
            ))}</div>
          </div>
        </div>
      )}

      {showContact && (
        <div className="modal-overlay" onClick={() => setShowContact(false)}>
          <div className="modal-content contact-modal" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowContact(false)}><X size={24} /></button>
            <div className="modal-header"><h1>{t.contact}</h1></div>
            <div className="location-filters">
              <div className="filter-group"><label>{t.selectState}:</label><select value={selectedState} onChange={(e) => handleStateChange(e.target.value)}>{indianStates.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
              {selectedState !== 'All' && <div className="filter-group"><label>District:</label><select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>{districts.map(d => <option key={d} value={d}>{d}</option>)}</select></div>}
            </div>
                        {selectedState !== 'All' && <div className="area-overview-map"><iframe src={`https://maps.google.com/maps?q=${selectedDistrict !== 'All' ? selectedDistrict + ',' : ''}${selectedState}&t=&z=13&ie=UTF8&iwloc=&output=embed`} width="100%" height="250" style={{ border: 0, borderRadius: '1rem' }}></iframe></div>}
                        
                        <div className="emergency-contacts">
                          <h3>Emergency Helplines</h3>
                          <div className="helpline-grid">
                            {helplineData.map(h => (
                              <div key={h.id} className="helpline-item">
                                <span>{h.name}</span>
                                <a href={`tel:${h.number}`}><strong>{h.number}</strong></a>
                              </div>
                            ))}
                          </div>
                        </div>
            
                        <div className="lawyers-list">
            {filteredLawyers.length > 0 ? filteredLawyers.map((l, i) => (
              <div key={i} className="lawyer-card-container"><div className="lawyer-card"><div className="lawyer-info"><h3>{l.name}</h3><span className="specialty-tag">{l.specialty}</span><p className="lawyer-location"><Globe size={14} /> {l.location}, {l.district}, {l.state}</p></div>
                <div className="lawyer-actions"><a href={`tel:${l.phone}`} className="call-btn"><Phone size={18} /></a><a href={`mailto:${l.email}`} className="email-btn"><Mail size={18} /></a><button className={`map-toggle-btn ${showMap === l.name ? 'active' : ''}`} onClick={() => setShowMap(showMap === l.name ? null : l.name)}><Globe size={18} /> Map</button></div></div>
                {showMap === l.name && <div className="map-container"><iframe src={l.mapUrl} width="100%" height="200" style={{ border: 0 }}></iframe></div>}
              </div>
            )) : <div className="no-lawyers"><p>No lawyers found in this area yet.</p><button className="reset-filter-btn" onClick={() => {setSelectedState('All'); setSelectedDistrict('All');}}>View All</button></div>}</div>
          </div>
        </div>
      )}

      {showAssistant && (
        <div className="modal-overlay" onClick={() => setShowAssistant(false)}>
          <div className="modal-content assistant-modal" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => { setShowAssistant(false); setAssistantResponse([]); setAssistantQuery(''); }}><X size={24} /></button>
            <div className="assistant-header"><h1>{t.legalAI}</h1></div>
            <div className="assistant-body">
              <div className="assistant-input-group">
                <input type="text" placeholder="Explain your situation (e.g. 'someone stole my phone')" value={assistantQuery} onChange={(e) => setAssistantQuery(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && askAssistant()} />
                <button onClick={askAssistant}>Analyze</button>
              </div>
              <div className="assistant-results-container">
                {assistantResponse.length > 0 ? (
                  <>
                    <p className="assistant-hint">Based on your query, here are the relevant laws:</p>
                    <div className="assistant-laws-grid">
                      {assistantResponse.map(a => {
                        const c = getArticleContent(a);
                        return (
                          <div key={a.id} className="law-info-card" onClick={() => {setSelectedArticle(a); setShowAssistant(false);}}>
                            <div className="law-card-header">
                              <h4>{c.title}</h4>
                              <span className="section-badge">Art {a.number}</span>
                            </div>
                            <p>{c.simplified.substring(0, 100)}...</p>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : assistantQuery && <div className="assistant-no-results">Try keywords like 'theft', 'harassment', 'equality', or 'safety'.</div>}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedArticle && (() => {
        const c = getArticleContent(selectedArticle);
        return <div className="modal-overlay" onClick={() => setSelectedArticle(null)}><div className="modal-content" onClick={e => e.stopPropagation()}><button className="close-btn" onClick={() => setSelectedArticle(null)}><X size={24} /></button>
          <div className="modal-header"><h2>Article {selectedArticle.number}</h2><h1>{c.title}</h1></div>
          <span className="category-badge">{selectedArticle.category}</span>
          <div className="explanation-section">
            <div className="explanation-box simple"><div className="box-header"><Shield size={20} /><h3>{t.simpleMeaning}</h3></div><p>{c.simplified}</p></div>
            {c.teacher_analogy && <div className="explanation-box teacher"><div className="box-header"><Trophy size={20} /><h3>{t.teacherExplain}</h3></div><p>{c.teacher_analogy}</p></div>}
            <div className="explanation-box original"><div className="box-header"><Building2 size={20} /><h3>{t.originalText}</h3></div><p>{c.content}</p></div>
          </div>
          <div className="modal-footer"><div className="tags"><strong>Keywords:</strong> {selectedArticle.keywords.map(k => <span key={k} className="tag">#{k}</span>)}</div></div>
        </div></div>;
      })()}

      {showQuiz && (
        <div className="modal-overlay" onClick={() => setShowQuiz(false)}>
          <div className="modal-content quiz-modal" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowQuiz(false)}><X size={24} /></button>
            {!quizFinished ? (
              <div className="quiz-container">
                <div className="quiz-header"><span>Question {currentQuestion + 1} of {constitutionQuiz.length}</span><span>Score: {score}</span></div>
                <h2 className="quiz-question">{constitutionQuiz[currentQuestion].question}</h2>
                <div className="quiz-options">{constitutionQuiz[currentQuestion].options.map((option, idx) => (
                  <button key={idx} className={`option-btn ${selectedAnswer === idx ? (isCorrect ? 'correct' : 'wrong') : ''} ${selectedAnswer !== null && idx === constitutionQuiz[currentQuestion].correctAnswer ? 'correct' : ''}`} onClick={() => handleAnswer(idx)} disabled={selectedAnswer !== null}>{option}</button>
                ))}</div>
                {selectedAnswer !== null && <div className="quiz-feedback"><p>{constitutionQuiz[currentQuestion].explanation}</p><button className="next-btn" onClick={nextQuestion}>Next</button></div>}
              </div>
            ) : <div className="quiz-result"><Trophy size={64} /><h1>Completed!</h1><p>Score: {score}</p><button className="reset-btn" onClick={resetQuiz}>Try Again</button></div>}
          </div>
        </div>
      )}

      <footer className="footer"><p>&copy; 2026 Law. Patriotic Legal Guide 🇮🇳</p></footer>
    </div>
  );
}

export default App;
