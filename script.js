// --- ENHANCED BACKEND SIMULATION & DATA ---
const constitutionData = [
    { id: '1', number: '14', title: 'Equality before Law', category: 'Fundamental Rights', keywords: ['equal', 'fair', 'justice'], simplified: 'Everyone is equal in the eyes of the law.', content: 'The State shall not deny to any person equality before the law...', teacher_analogy: 'Like a game of football: rules are the same for everyone.' },
    { id: '2', number: '15', title: 'No Discrimination', category: 'Fundamental Rights', keywords: ['caste', 'religion', 'race', 'gender'], simplified: 'The government cannot treat you differently because of your caste, religion, or gender.', content: 'Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth.', teacher_analogy: 'In a school, every student gets the same chance to play, no matter where they come from.' },
    { id: '3', number: '17', title: 'Abolition of Untouchability', category: 'Fundamental Rights', keywords: ['caste', 'untouchability', 'social justice'], simplified: 'Treating anyone as "untouchable" is a crime.', content: 'Untouchability is abolished and its practice in any form is forbidden.', teacher_analogy: 'No student can be excluded from a group or lunch table because of their background.' },
    { id: '4', number: '19', title: 'Freedom of Speech', category: 'Fundamental Rights', keywords: ['speak', 'talk', 'protest', 'news'], simplified: 'You have the right to express your thoughts and opinions freely.', content: 'All citizens shall have the right to freedom of speech and expression...', teacher_analogy: 'Like having a microphone to share your ideas safely with the class.' },
    { id: '5', number: '21', title: 'Right to Life', category: 'Fundamental Rights', keywords: ['live', 'safety', 'liberty', 'privacy'], simplified: 'You have the right to live with dignity and privacy.', content: 'No person shall be deprived of his life or personal liberty...', teacher_analogy: 'Like a protective bubble around your life that no one can break.' },
    { id: '6', number: '21A', title: 'Right to Education', category: 'Fundamental Rights', keywords: ['school', 'study', 'child', 'free'], simplified: 'Every child aged 6-14 has the right to free and compulsory school education.', content: 'The State shall provide free and compulsory education to all children...', teacher_analogy: 'Like a golden ticket given to every child to enter a school for free.' },
    { id: '7', number: '23', title: 'Stop Forced Labor', category: 'Fundamental Rights', keywords: ['trafficking', 'begar', 'forced', 'work'], simplified: 'Buying/selling humans or forcing someone to work for free is a crime.', content: 'Traffic in human beings and begar and other similar forms of forced labour are prohibited.', teacher_analogy: 'No one can force you to do their homework or chores against your will.' },
    { id: '8', number: '24', title: 'No Child Labor', category: 'Fundamental Rights', keywords: ['child', 'factory', 'work', 'hazardous'], simplified: 'Children under 14 cannot work in dangerous factories or mines.', content: 'No child below the age of fourteen years shall be employed to work in any factory or mine.', teacher_analogy: 'Children should be holding books and toys, not heavy tools in a factory.' },
    { id: '9', number: '25', title: 'Freedom of Religion', category: 'Fundamental Rights', keywords: ['god', 'temple', 'church', 'mosque', 'prayer'], simplified: 'You are free to follow and practice any religion of your choice.', content: 'All persons are equally entitled to freedom of conscience and the right freely to profess religion.', teacher_analogy: 'Everyone can celebrate their own favorite festivals without being stopped.' },
    { id: '10', number: '32', title: 'Constitutional Remedies', category: 'Fundamental Rights', keywords: ['court', 'supreme', 'violation', 'help'], simplified: 'If your rights are taken, you can go directly to the Supreme Court.', content: 'The right to move the Supreme Court for enforcement of rights...', teacher_analogy: 'Like having the Principal\'s direct phone number to report a serious problem.' },
    { id: '11', number: '44', title: 'Uniform Civil Code', category: 'Directive Principles', keywords: ['ucc', 'marriage', 'divorce', 'equal laws'], simplified: 'The goal is to have one common law for marriage and property for all Indians.', content: 'The State shall endeavour to secure for the citizens a uniform civil code...', teacher_analogy: 'Like having one single set of school rules for every student in every grade.' },
    { id: '12', number: '51A', title: 'Fundamental Duties', category: 'General', keywords: ['duty', 'flag', 'nature', 'clean'], simplified: 'We must respect the flag, protect the environment, and be good citizens.', content: 'It shall be the duty of every citizen of India to abide by the Constitution...', teacher_analogy: 'Like keeping your desk clean—it is your responsibility to care for your space.' },
    { id: '13', number: '300A', title: 'Right to Property', category: 'Legal Rights', keywords: ['land', 'house', 'money', 'property'], simplified: 'The government cannot take your house or land without a valid law.', content: 'No person shall be deprived of his property save by authority of law.', teacher_analogy: 'Your lunchbox belongs to you; no one can take it without a very good reason.' },
    { id: '14', number: '302', title: 'Section 302: Murder', category: 'Criminal Law', keywords: ['kill', 'death', 'crime', 'murder'], simplified: 'The harshest punishment for intentionally taking a life.', content: 'Whoever commits murder shall be punished with death or life imprisonment.', teacher_analogy: 'Breaking the most sacred rule of the world leads to the biggest penalty.' },
    { id: '15', number: '307', title: 'Section 307: Attempt to Murder', category: 'Criminal Law', keywords: ['attack', 'violence', 'tried to kill'], simplified: 'Even if the person survived the attack, the attacker gets a heavy penalty.', content: 'Whoever does any act with such intention or knowledge... as to cause death.', teacher_analogy: 'Throwing a heavy stone at someone is wrong, even if the stone misses them.' },
    { id: '16', number: '323', title: 'Section 323: Voluntarily Causing Hurt', category: 'Criminal Law', keywords: ['fight', 'slap', 'hit', 'hurt'], simplified: 'Punishment for intentionally hitting or hurting someone in a fight.', content: 'Whoever... voluntarily causes hurt, shall be punished with imprisonment...', teacher_analogy: 'Hitting a classmate during a break will lead to a suspension.' },
    { id: '17', number: '354', title: 'Section 354: Women Safety', category: 'Criminal Law', keywords: ['harassment', 'safety', 'touching', 'women'], simplified: 'Protects women from inappropriate touching or harassment.', content: 'Assault or criminal force to woman with intent to outrage her modesty.', teacher_analogy: 'Everyone has a "No-Go" zone; no one can touch you without your permission.' },
    { id: '18', number: '379', title: 'Section 379: Theft', category: 'Criminal Law', keywords: ['steal', 'rob', 'stolen', 'bag'], simplified: 'Punishment for taking someone else\'s property without permission.', content: 'Whoever commits theft shall be punished with imprisonment up to 3 years.', teacher_analogy: 'If you take a pen from a desk that isn\'t yours, that is stealing.' },
    { id: '19', number: '420', title: 'Section 420: Cheating', category: 'Criminal Law', keywords: ['scam', 'fraud', 'lie', 'fake'], simplified: 'Punishment for tricking people to take their money or property.', content: 'Cheating and dishonestly inducing delivery of property.', teacher_analogy: 'Promising to trade a toy and then running away with both is cheating.' },
    { id: '20', number: '498A', title: 'Section 498A: Domestic Cruelty', category: 'Criminal Law', keywords: ['husband', 'dowry', 'marriage', 'torture'], simplified: 'Protects married women from harassment by husband or in-laws.', content: 'Husband or relative of husband of a woman subjecting her to cruelty.', teacher_analogy: 'Home should be a safe place; bullying a family member is a crime.' },
    { id: '21', number: '506', title: 'Section 506: Intimidation', category: 'Criminal Law', keywords: ['threat', 'scare', 'fear', 'bully'], simplified: 'Punishment for threatening to kill or hurt someone.', content: 'Whoever commits the offence of criminal intimidation...', teacher_analogy: 'Saying "I will hit you after school" is a threat and it is against the rules.' },
    { id: '22', number: '20', title: 'Protection in Conviction', category: 'Legal Rights', keywords: ['punishment', 'double jeopardy', 'trial'], simplified: 'You cannot be punished twice for the same crime.', content: 'No person shall be prosecuted and punished for the same offence more than once.', teacher_analogy: 'If you already got a timeout for breaking a rule, the teacher can\'t give you another timeout for the same thing tomorrow.' },
    { id: '23', number: '22', title: 'Rights during Arrest', category: 'Legal Rights', keywords: ['arrest', 'police', 'lawyer', 'jail'], simplified: 'If arrested, you must be told why and allowed to see a lawyer.', content: 'No person who is arrested shall be detained in custody without being informed...', teacher_analogy: 'If a student is sent to the Principal, they must be told what they did wrong and allowed to explain their side.' },
    { id: '24', number: '326', title: 'Right to Vote', category: 'Legal Rights', keywords: ['vote', 'election', 'politics', '18'], simplified: 'Every citizen above 18 has the right to vote in elections.', content: 'The elections to the House of the People and to the Legislative Assembly... shall be on the basis of adult suffrage.', teacher_analogy: 'In a class, every student gets to vote for who should be the class monitor.' },
    { id: '25', number: 'RTI', title: 'Right to Information', category: 'Legal Rights', keywords: ['rti', 'info', 'government', 'ask'], simplified: 'You can ask the government for any public information or records.', content: 'The Right to Information Act 2005 empowers citizens to secure access to information under control of public authorities.', teacher_analogy: 'You have the right to ask the teacher how your exam marks were calculated.' },
    { id: '26', number: 'CPA', title: 'Consumer Rights', category: 'Legal Rights', keywords: ['shop', 'buy', 'refund', 'fake product'], simplified: 'Protects you from being cheated by shops or online sellers.', content: 'The Consumer Protection Act ensures the right to be protected against marketing of goods which are hazardous to life.', teacher_analogy: 'If you buy a toy that is broken inside the box, the shopkeeper must replace it or give your money back.' }
];

const helplineData = [
    { name: 'National Emergency', number: '112' },
    { name: 'Police', number: '100' },
    { name: 'Women Helpline', number: '1091' },
    { name: 'Child Helpline', number: '1098' },
    { name: 'Cyber Crime', number: '1930' },
    { name: 'Senior Citizen', number: '14567' },
    { name: 'Ambulance', number: '102' }
];

const lawyersData = [
    { name: "Adv. Ananya Reddy", specialty: "Corporate & Cyber", location: "Banjara Hills, Hyderabad", phone: "+91 90101 81066", mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.1!2d78.4!3d17.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb97!2sTelangana+High+Court!5e0!3m2!1sen!2sin!4v1" },
    { name: "Adv. Karthik Raja", specialty: "Real Estate & Civil", location: "Madras High Court, Chennai", phone: "+91 94440 12345", mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.1!2d80.2!3d13.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ed00000001%3A0x2f8f8f8f8f8f8f8f!2sMadras+High+Court!5e0!3m2!1sen!2sin!4v1" },
    { name: "Adv. Priya Sharma", specialty: "Family & Women Rights", location: "Mumbai High Court", phone: "+91 87654 32109", mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.8!2d72.8!3d18.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1c234b!2sBombay+High+Court!5e0!3m2!1sen!2sin!4v1" },
    { name: "Adv. Rajesh Kumar", specialty: "Criminal & Civil", location: "Delhi High Court", phone: "+91 98765 43210", mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1!2d77.2!3d28.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b34766085%3A0x761f69771428561c!2sDelhi+High+Court!5e0!3m2!1sen!2sin!4v1" }
];

const quizData = [
    { q: "Which Article gives the Right to Education?", a: ["Art 14", "Art 21A", "Art 19"], c: 1, e: "Art 21A ensures free education for kids 6-14." },
    { q: "What is Section 420 about?", a: ["Murder", "Theft", "Cheating"], c: 2, e: "Section 420 deals with fraud and scams." },
    { q: "Which Article abolishes Untouchability?", a: ["Art 15", "Art 17", "Art 21"], c: 1, e: "Article 17 makes the practice of untouchability a crime." },
    { q: "What is Section 302 related to?", a: ["Theft", "Murder", "Cheating"], c: 1, e: "Section 302 provides punishment for murder." },
    { q: "Which Article allows you to go to the Supreme Court?", a: ["Art 32", "Art 44", "Art 51A"], c: 0, e: "Article 32 is the Right to Constitutional Remedies." }
];

const translations = {
    EN: { title: "Know Your Rights", subtitle: "Simplified laws for every Indian citizen.", searchPlaceholder: "Search for a law...", home: "Home", legalAI: "Legal AI", quiz: "Quiz", documents: "Documents", lawyers: "Lawyers", helplines: "Helplines", loginTitle: "Citizen Portal", loginSubtitle: "Secure access to Indian legal rights.", phoneLabel: "Phone Number", sendOtp: "Send OTP", verifyOtp: "Verify OTP", guest: "Guest Login" },
    HI: { title: "अपने अधिकारों को जानें", subtitle: "नागरिकों के लिए सरल कानून।", searchPlaceholder: "कानून खोजें...", home: "होम", legalAI: "लीगल AI", quiz: "क्विज", documents: "दस्तावेज़", lawyers: "वकील", helplines: "हेल्पलाइन", loginTitle: "नागरिक पोर्टल", loginSubtitle: "कानूनी अधिकारों तक सुरक्षित पहुंच।", phoneLabel: "फ़ोन नंबर", sendOtp: "OTP भेजें", verifyOtp: "सत्यापित करें", guest: "अतिथि प्रवेश" },
    TE: { title: "మీ హక్కులను తెలుసుకోండి", subtitle: "భారతీయ పౌరుల కోసం సరళమైన చట్టాలు.", searchPlaceholder: "చట్టం కోసం వెతకండి...", home: "హోమ్", legalAI: "లీగల్ AI", quiz: "క్విజ్", documents: "పత్రాలు", lawyers: "లాయర్లు", helplines: "హెల్ప్‌లైన్లు", loginTitle: "సిటిజన్ పోర్టల్", loginSubtitle: "చట్టపరమైన హక్కులకు సురక్షిత ప్రాప్తి.", phoneLabel: "ఫోన్ నంబర్", sendOtp: "OTP పంపండి", verifyOtp: "ధృవీకరించండి", guest: "గెస్ట్‌గా కొనసాగండి" },
    KN: { title: "ನಿಮ್ಮ ಹಕ್ಕುಗಳನ್ನು ತಿಳಿಯಿರಿ", subtitle: "ಭಾರತೀಯ ನಾಗರಿಕರಿಗಾಗಿ ಸರಳ ಕಾನೂನುಗಳು.", searchPlaceholder: "ಕಾನೂನು ಹುಡುಕಿ...", home: "ಹೋಮ್", legalAI: "ಲೀಗಲ್ AI", quiz: "ಕ್ವಿಜ್", documents: "ದಾಖಲೆಗಳು", lawyers: "ವಕೀಲರು", helplines: "ಹೆಲ್ಪ್‌ಲೈನ್", loginTitle: "ನಾಗರಿಕ ಪೋರ್ಟಲ್", loginSubtitle: "ಕಾನೂನು ಹಕ್ಕುಗಳಿಗೆ ಸುರಕ್ಷಿತ ಪ್ರವೇಶ.", phoneLabel: "ಫೋನ್ ಸಂಖ್ಯೆ", sendOtp: "OTP ಕಳುಹಿಸಿ", verifyOtp: "ಪರಿಶೀಲಿಸಿ", guest: "ಅತಿಥಿಯಾಗಿ ಮುಂದುವರಿಯಿರಿ" },
    TA: { title: "உங்கள் உரிமைகளை அறிந்து கொள்ளுங்கள்", subtitle: "இந்திய குடிமகன்களுக்கான எளிய சட்டங்கள்.", searchPlaceholder: "சட்டத்தைத் தேடுங்கள்...", home: "முகப்பு", legalAI: "சட்ட AI", quiz: "வினாடி வினா", documents: "ஆவணங்கள்", lawyers: "வழக்கறிஞர்கள்", helplines: "உதவி எண்கள்", loginTitle: "குடிமக்கள் போர்ட்டல்", loginSubtitle: "சட்ட உரிமைகளுக்கான பாதுகாப்பான அணுகல்.", phoneLabel: "தொலைபேசி எண்", sendOtp: "OTP அனுப்பு", verifyOtp: "சரிபார்க்கவும்", guest: "விருந்தினராக தொடரவும்" },
    MR: { title: "आपले हक्क जाणून घ्या", subtitle: "भारतीय नागरिकांसाठी सोपे कायदे.", searchPlaceholder: "कायदा शोधा...", home: "होम", legalAI: "लीगल AI", quiz: "क्विझ", documents: "दस्तऐवज", lawyers: "वकील", helplines: "हेल्पलाइन", loginTitle: "नागरिक पोर्टल", loginSubtitle: "कायदेशीर हक्कांपर्यंत सुरक्षित पोहोच.", phoneLabel: "फोन नंबर", sendOtp: "OTP पाठवा", verifyOtp: "सत्यापित करा", guest: "अतिथी म्हणून प्रवेश" },
    BN: { title: "আপনার অধিকার জানুন", subtitle: "ভারতীয় নাগরিকদের জন্য সরল আইন।", searchPlaceholder: "আইন খুঁজুন...", home: "হোম", legalAI: "আইনি AI", quiz: "কুইজ", documents: "নথিপত্র", lawyers: "আইনজীবী", helplines: "হেল্পলাইন", loginTitle: "নাগরিক পোর্টাল", loginSubtitle: "আইনি অধিকারে নিরাপদ প্রবেশ।", phoneLabel: "ফোন নম্বর", sendOtp: "OTP পাঠান", verifyOtp: "যাচাই করুন", guest: "অতিথি হিসাবে প্রবেশ" }
};

// --- APP STATE ---
let state = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    language: localStorage.getItem('appLang') || 'EN',
    phoneNumber: '',
    isOtpSent: false,
    generatedOtp: '',
    searchTerm: '',
    selectedCategory: null
};

// --- CORE FUNCTIONS ---
function updateTranslations() {
    const t = (k) => (translations[state.language] || translations['EN'])[k] || k;
    const ids = { 
        'hero-title': 'title', 
        'hero-subtitle': 'subtitle', 
        'login-btn': state.isOtpSent ? 'verifyOtp' : 'sendOtp', 
        'guest-btn': 'guest',
        'login-title': 'loginTitle',
        'login-subtitle': state.isOtpSent ? '' : 'loginSubtitle',
        'phone-label': 'phoneLabel',
        'otp-label': 'verifyOtp'
    };
    
    for (let [id, key] of Object.entries(ids)) { 
        const el = document.getElementById(id);
        if(el) {
            if (id === 'login-subtitle' && state.isOtpSent) {
                el.innerText = `OTP sent to +91 ${state.phoneNumber}`;
            } else {
                el.innerText = t(key); 
            }
        }
    }
    
    if(document.getElementById('search-input')) document.getElementById('search-input').placeholder = t('searchPlaceholder');
    document.querySelectorAll('.t-home').forEach(el => el.innerText = t('home'));
    document.querySelectorAll('.t-legalAI').forEach(el => el.innerText = t('legalAI'));
    document.querySelectorAll('.t-quizMode').forEach(el => el.innerText = t('quiz'));
    
    // Dashboard Cards
    if(document.getElementById('card-docs')) document.getElementById('card-docs').querySelector('h3').innerText = t('documents');
    if(document.getElementById('card-lawyers')) document.getElementById('card-lawyers').querySelector('h3').innerText = t('lawyers');
    if(document.getElementById('card-helpline')) document.getElementById('card-helpline').querySelector('h3').innerText = t('helplines');

    renderArticles();
    renderCategories();
}

function updateUI() {
    updateTranslations();
    document.getElementById('language-select').value = state.language;
    document.getElementById('login-page').style.display = state.isLoggedIn ? 'none' : 'flex';
    document.getElementById('main-app').style.display = state.isLoggedIn ? 'flex' : 'none';
    lucide.createIcons();
}

function renderArticles() {
    const grid = document.getElementById('article-grid');
    if(!grid) return;
    const filtered = constitutionData.filter(a => (a.title.toLowerCase().includes(state.searchTerm.toLowerCase()) || a.number.includes(state.searchTerm)) && (!state.selectedCategory || a.category === state.selectedCategory));
    grid.innerHTML = filtered.map(a => `<div class="article-card" onclick="showDetails('${a.id}')"><div class="article-header"><span>Art ${a.number}</span><span>${a.category}</span></div><h3>${a.title}</h3><p class="preview">${a.simplified}</p></div>`).join('');
    lucide.createIcons();
}

function renderCategories() {
    const cats = ['All', ...new Set(constitutionData.map(a => a.category))];
    document.getElementById('category-tags').innerHTML = cats.map(c => `<button class="${(state.selectedCategory === c || (c==='All' && !state.selectedCategory)) ? 'active' : ''}" onclick="window.setCategory('${c === 'All' ? '' : c}')">${c}</button>`).join('');
}

window.setCategory = (c) => { state.selectedCategory = c || null; renderCategories(); renderArticles(); };

window.showDetails = (id) => {
    const a = constitutionData.find(x => x.id === id);
    const modal = document.getElementById('modal-overlay');
    modal.style.display = 'flex';
    modal.innerHTML = `<div class="modal-content" onclick="event.stopPropagation()"><button class="close-btn" onclick="closeModal()"><i data-lucide="x"></i></button><h2>Art ${a.number}</h2><h1>${a.title}</h1><div class="explanation-box simple"><h3>Simple Meaning</h3><p>${a.simplified}</p></div><div class="explanation-box original"><h3>Legal Text</h3><p>${a.content}</p></div></div>`;
    lucide.createIcons();
};

window.closeModal = () => document.getElementById('modal-overlay').style.display = 'none';

document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    const loginForm = document.getElementById('login-form');
    const otpDigits = document.querySelectorAll('.otp-digit');

    otpDigits.forEach((input, i) => {
        input.oninput = () => { if(input.value && i < 5) otpDigits[i+1].focus(); };
        input.onkeydown = (e) => { if(e.key === 'Backspace' && !input.value && i > 0) otpDigits[i-1].focus(); };
    });

    loginForm.onsubmit = (e) => {
        e.preventDefault();
        if(!state.isOtpSent) {
            state.isOtpSent = true; state.generatedOtp = "123456";
            document.getElementById('phone-input-group').style.display = 'none';
            document.getElementById('otp-input-group').style.display = 'block';
            document.getElementById('resend-otp-btn').style.display = 'block';
            alert("Test OTP: 123456"); updateTranslations();
        } else {
            const entered = Array.from(otpDigits).map(d => d.value).join('');
            if(entered === state.generatedOtp) { localStorage.setItem('isLoggedIn', 'true'); state.isLoggedIn = true; updateUI(); }
            else { alert("Try 123456"); }
        }
    };

    document.getElementById('guest-btn').onclick = () => { localStorage.setItem('isLoggedIn', 'true'); state.isLoggedIn = true; updateUI(); };
    document.getElementById('logout-btn').onclick = () => { localStorage.removeItem('isLoggedIn'); location.reload(); };
    document.getElementById('language-select').onchange = (e) => { state.language = e.target.value; localStorage.setItem('appLang', state.language); updateTranslations(); };
    document.getElementById('search-input').oninput = (e) => { state.searchTerm = e.target.value; renderArticles(); };

    // Dashboard Card Handlers
    const docBtn = document.getElementById('card-docs');
    if(docBtn) docBtn.onclick = () => {
        const modal = document.getElementById('modal-overlay');
        modal.style.display = 'flex';
        
        const docList = [
            { title: "Constitution of India (Full)", desc: "The complete official text of the Indian Constitution.", url: "docs/constitution.pdf" },
            { title: "The Preamble", desc: "The introductory statement of the Constitution.", url: "docs/preamble.pdf" },
            { title: "Fundamental Rights", desc: "A summary of your basic human rights.", url: "docs/fundamental_rights.pdf" },
            { title: "Aadhar & Privacy Laws", desc: "Legal framework protecting your identity.", url: "docs/privacy_laws.pdf" }
        ];

        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px;" onclick="event.stopPropagation()">
                <button class="close-btn" onclick="closeModal()"><i data-lucide="x"></i></button>
                <h1><i data-lucide="file-text" style="color:var(--primary-color);"></i> Legal Documents</h1>
                <p>View and read saved legal documents from your repository.</p>
                <div style="margin-top:1.5rem; display:grid; gap:1rem;">
                    ${docList.map(doc => `
                        <div class="law-info-card" style="display:flex; justify-content:space-between; align-items:center; gap:1rem;">
                            <div>
                                <h3 style="margin:0;">${doc.title}</h3>
                                <p style="font-size:0.85rem; color:#666; margin:0.2rem 0 0 0;">${doc.desc}</p>
                            </div>
                            <a href="${doc.url}" target="_blank" class="login-btn" style="padding:0.5rem 1rem; text-decoration:none; font-size:0.85rem; display:flex; align-items:center; gap:5px;">
                                <i data-lucide="file-text" style="width:14px;"></i> Open PDF
                            </a>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        lucide.createIcons();
    };

    const lawyerBtn = document.getElementById('card-lawyers');
    if(lawyerBtn) lawyerBtn.onclick = () => {
        const modal = document.getElementById('modal-overlay');
        modal.style.display = 'flex';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 700px;" onclick="event.stopPropagation()">
                <button class="close-btn" onclick="closeModal()"><i data-lucide="x"></i></button>
                <h1>Find Lawyers</h1>
                <p>Professional legal experts sorted by name.</p>
                <div style="margin-top:1.5rem; display:grid; gap:1rem;">
                    ${lawyersData.map((l, i) => `
                        <div class="lawyer-card" style="flex-direction:column; background:#f8fafc; border:1px solid #e2e8f0;">
                            <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                                <div>
                                    <h3 style="margin:0; color:var(--accent-color);">${l.name}</h3>
                                    <span class="specialty-tag" style="background:#eff6ff; color:#1e40af; padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:600;">${l.specialty}</span>
                                    <p style="margin:5px 0 0 0; font-size:0.85rem; color:#64748b;"><i data-lucide="map-pin" style="width:12px; height:12px;"></i> ${l.location}</p>
                                </div>
                                <div style="display:flex; gap:10px;">
                                    <a href="tel:${l.phone}" class="nav-btn" style="background:var(--primary-color); border-radius:50%; width:40px; height:40px; display:flex; align-items:center; justify-content:center; color:white;"><i data-lucide="phone" style="width:18px;"></i></a>
                                    <button onclick="window.toggleMap(${i})" class="nav-btn" style="background:#10b981; border-radius:50%; width:40px; height:40px; display:flex; align-items:center; justify-content:center; color:white; border:none; cursor:pointer;"><i data-lucide="map" style="width:18px;"></i></button>
                                </div>
                            </div>
                            <div id="map-${i}" style="display:none; height:250px; margin-top:1rem; border-radius:8px; overflow:hidden; border:1px solid #cbd5e1;">
                                <iframe src="${l.mapUrl}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        lucide.createIcons();
    };

    window.toggleMap = (i) => { 
        const m = document.getElementById(`map-${i}`); 
        if(m) m.style.display = m.style.display === 'none' ? 'block' : 'none'; 
    };

    const helplineBtn = document.getElementById('card-helpline');
    if(helplineBtn) helplineBtn.onclick = () => {
        const modal = document.getElementById('modal-overlay');
        modal.style.display = 'flex';
        modal.innerHTML = `
            <div class="modal-content" style="max-width:600px;" onclick="event.stopPropagation()">
                <button class="close-btn" onclick="closeModal()"><i data-lucide="x"></i></button>
                <h1>Emergency Helplines</h1>
                <p>Quick access to essential Indian emergency services.</p>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem; margin-top:1.5rem;">
                    ${helplineData.map(h => `
                        <div class="law-info-card" style="text-align:center; padding:1.5rem; background:#fff5f5; border:1px solid #fed7d7;">
                            <h3 style="margin:0 0 10px 0; color:#c53030;">${h.name}</h3>
                            <a href="tel:${h.number}" style="font-size:1.75rem; font-weight:800; color:#e53e3e; text-decoration:none; display:block;">${h.number}</a>
                            <p style="margin:10px 0 0 0; font-size:0.75rem; color:#9b2c2c;">Click to call</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        lucide.createIcons();
    };

    // Voice Assistant
    const voiceBtn = document.getElementById('voice-btn');
    if(voiceBtn) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if(SpeechRecognition) {
            const recognition = new SpeechRecognition();
            voiceBtn.onclick = () => { recognition.start(); voiceBtn.classList.add('listening'); };
            recognition.onresult = (e) => { const t = e.results[0][0].transcript; document.getElementById('search-input').value = t; openAssistant(t); };
            recognition.onend = () => voiceBtn.classList.remove('listening');
        }
    }

    function openAssistant(q) {
        const modal = document.getElementById('modal-overlay');
        modal.style.display = 'flex';
        modal.innerHTML = `<div class="modal-content" onclick="event.stopPropagation()"><button class="close-btn" onclick="closeModal()"><i data-lucide="x"></i></button><h1>AI Assistant</h1><p>Query: "${q}"</p><div id="ai-res" class="explanation-box simple">Analyzing...</div></div>`;
        const match = constitutionData.find(a => a.keywords.some(k => q.toLowerCase().includes(k)) || q.includes(a.number));
        const resEl = document.getElementById('ai-res');
        if(match) {
            const answer = `Based on your query, Article ${match.number} is relevant: ${match.simplified}`;
            resEl.innerText = answer;
            const msg = new SpeechSynthesisUtterance(answer); window.speechSynthesis.speak(msg);
        } else { resEl.innerText = "I couldn't find a specific law. Try keywords like 'theft' or 'equality'."; }
        lucide.createIcons();
    }

    document.getElementById('nav-assistant').onclick = () => openAssistant("");
    document.getElementById('nav-quiz').onclick = () => {
        let current = 0;
        let score = 0;
        
        const showQ = () => {
            const q = quizData[current];
            const modal = document.getElementById('modal-overlay');
            modal.style.display = 'flex';
            modal.innerHTML = `
                <div class="modal-content" onclick="event.stopPropagation()">
                    <button class="close-btn" onclick="closeModal()"><i data-lucide="x"></i></button>
                    <div style="margin-bottom:1rem; color:var(--primary-color); font-weight:bold;">Legal Quiz: Question ${current + 1} of ${quizData.length}</div>
                    <h2 style="margin-bottom:1.5rem;">${q.q}</h2>
                    <div style="display:flex; flex-direction:column; gap:0.75rem;">
                        ${q.a.map((opt, i) => `<button class="option-btn" id="opt-${i}" style="text-align:left; padding:1rem; border:1px solid #ddd; border-radius:0.5rem; background:white; cursor:pointer; font-weight:500;">${opt}</button>`).join('')}
                    </div>
                    <div id="quiz-feedback" style="display:none; margin-top:1.5rem; padding:1rem; border-radius:0.5rem;"></div>
                </div>
            `;
            lucide.createIcons();

            q.a.forEach((_, i) => {
                document.getElementById(`opt-${i}`).onclick = function() {
                    const feedback = document.getElementById('quiz-feedback');
                    const allBtns = document.querySelectorAll('.option-btn');
                    allBtns.forEach(b => b.disabled = true);

                    feedback.style.display = 'block';
                    if (i === q.c) {
                        score++;
                        this.style.background = '#dcfce7';
                        this.style.borderColor = '#22c55e';
                        feedback.innerHTML = `<strong style="color:#166534;">Correct!</strong><p style="margin-top:0.5rem;">${q.e}</p>`;
                        feedback.style.background = '#f0fdf4';
                    } else {
                        this.style.background = '#fee2e2';
                        this.style.borderColor = '#ef4444';
                        document.getElementById(`opt-${q.c}`).style.background = '#dcfce7';
                        feedback.innerHTML = `<strong style="color:#991b1b;">Incorrect.</strong><p style="margin-top:0.5rem;">${q.e}</p>`;
                        feedback.style.background = '#fef2f2';
                    }

                    const nextBtn = document.createElement('button');
                    nextBtn.className = 'login-btn';
                    nextBtn.style.marginTop = '1rem';
                    nextBtn.style.width = '100%';
                    nextBtn.innerText = current < quizData.length - 1 ? "Next Question" : "See Final Score";
                    nextBtn.onclick = () => {
                        current++;
                        if (current < quizData.length) showQ();
                        else showFinalScore();
                    };
                    feedback.appendChild(nextBtn);
                };
            });
        };

        const showFinalScore = () => {
            const modal = document.getElementById('modal-overlay');
            modal.innerHTML = `
                <div class="modal-content" style="text-align:center;" onclick="event.stopPropagation()">
                    <button class="close-btn" onclick="closeModal()"><i data-lucide="x"></i></button>
                    <div style="font-size:3rem; margin-bottom:1rem;">${score === quizData.length ? '🏆' : '🎉'}</div>
                    <h1>Quiz Completed!</h1>
                    <p style="font-size:1.5rem; margin:1rem 0;">Your Score: <strong>${score} / ${quizData.length}</strong></p>
                    <p style="color:#666; margin-bottom:2rem;">${score === quizData.length ? "Perfect! You are a Legal Expert!" : "Great effort! Keep learning about your rights."}</p>
                    <button onclick="location.reload()" class="login-btn" style="width:100%;">Back to Home</button>
                </div>
            `;
            lucide.createIcons();
        };

        showQ();
    };
});
