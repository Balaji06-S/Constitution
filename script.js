// --- DATA ---
const constitutionData = [
  {
    id: '1',
    number: '14',
    title: 'Equality before Law',
    content: 'The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.',
    simplified: 'Everyone is equal in the eyes of the law. The government cannot treat people differently based on their status or background.',
    teacher_analogy: 'Think of a game of football: the rules are exactly the same for every player, regardless of whether they are the captain or a new player.',
    category: 'Fundamental Rights',
    keywords: ['equality', 'law', 'equal', 'justice', 'fairness'],
    translations: {
      HI: {
        title: 'कानून के समक्ष समानता',
        content: 'राज्य भारत के क्षेत्र में किसी भी व्यक्ति को कानून के समक्ष समानता या कानूनों के समान संरक्षण से वंचित नहीं करेगा।',
        simplified: 'कानून की नजर में हर कोई समान है। सरकार लोगों के साथ उनकी स्थिति या पृष्ठभूमि के आधार पर अलग व्यवहार नहीं कर सकती।',
        teacher_analogy: 'फुटबॉल के खेल के बारे में सोचें: नियम हर खिलाड़ी के लिए बिल्कुल समान होते हैं, चाहे वह कप्तान हो या नया खिलाड़ी।'
      },
      TE: {
        title: 'చట్టం ముందు సమానత్వం',
        content: 'భారత భూభాగంలో ఏ వ్యక్తికైనా చట్టం ముందు సమానత్వాన్ని లేదా చట్టాల సమాన రక్షణను ప్రభుత్వం నిరాకరించకూడదు.',
        simplified: 'చట్టం దృష్టిలో ప్రతి ఒక్కరూ సమానమే. ప్రజల హోదా లేదా నేపథ్యం ఆధారంగా ప్రభుత్వం వారిని భిన్నంగా చూడకూడదు.',
        teacher_analogy: 'ఫుట్‌బాల్ ఆట గురించి ఆలోచించండి: నిబంధనలు ప్రతి క్రీడాకారుడికి సరిగ్గా ఒకేలా ఉంటాయి, వారు కెప్టెన్ అయినా లేదా కొత్త ఆటగాడైనా.'
      }
    }
  },
  {
    id: '2',
    number: '19',
    title: 'Protection of certain rights regarding freedom of speech etc.',
    content: 'All citizens shall have the right (a) to freedom of speech and expression; (b) to assemble peaceably and without arms; (c) to form associations or unions; (d) to move freely throughout the territory of India; (e) to reside and settle in any part of the territory of India...',
    simplified: 'You have the right to speak freely, gather peacefully with others, form groups, and travel or live anywhere in the country.',
    teacher_analogy: 'It\'s like having a microphone to share your ideas, a map to go wherever you want in your home, and a club where you can invite your friends.',
    category: 'Fundamental Rights',
    keywords: ['freedom', 'speech', 'expression', 'assembly', 'travel', 'groups']
  },
  {
    id: '3',
    number: '21',
    title: 'Protection of Life and Personal Liberty',
    content: 'No person shall be deprived of his life or personal liberty except according to procedure established by law.',
    simplified: 'You have the right to live and be free. The government cannot take away your life or your freedom unless it follows a strict legal process.',
    teacher_analogy: 'Imagine a protective shield around you that no one can break without a very important, legal reason proven in court.',
    category: 'Fundamental Rights',
    keywords: ['life', 'liberty', 'freedom', 'arrest', 'safety']
  },
  {
    id: '11',
    number: '25',
    title: 'Freedom of Religion',
    content: 'All persons are equally entitled to freedom of conscience and the right freely to profess, practise and propagate religion.',
    simplified: 'You have the right to choose any religion, follow its rituals, and talk about your faith to others freely.',
    teacher_analogy: 'It\'s like having your own favorite book; you can read it, talk about it, and follow its advice, and no one can force you to read a different one.',
    category: 'Fundamental Rights',
    keywords: ['religion', 'faith', 'god', 'worship', 'freedom', 'temple', 'church', 'mosque']
  },
  {
    id: '12',
    number: '302',
    title: 'Section 302 - Punishment for Murder',
    content: 'Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine.',
    simplified: 'This section is for the most serious crime: taking someone\'s life. The punishment is very strict, like life in prison.',
    teacher_analogy: 'In a school, if a student intentionally breaks a very important rule that hurts someone forever, the school removes them permanently to keep others safe.',
    category: 'Criminal Law',
    keywords: ['murder', 'killing', 'death', 'punishment', 'crime', 'jail', 'someone killed', 'death threat']
  },
  {
    id: '17',
    number: '379',
    title: 'Section 379 - Punishment for Theft',
    content: 'Whoever commits theft shall be punished with imprisonment... for a term which may extend to three years, or with fine.',
    simplified: 'If someone takes your property (like a phone, bike, or money) without your permission, it is theft.',
    teacher_analogy: 'It\'s the basic rule of: "Don\'t take things that don\'t belong to you." If you take a classmate\'s pencil without asking, that\'s a mini-version of this.',
    category: 'Criminal Law',
    keywords: ['theft', 'stealing', 'robbery', 'property', 'stolen', 'someone took my', 'lost my bag', 'pickpocket']
  },
  {
    id: '18',
    number: '420',
    title: 'Section 420 - Cheating and Dishonestly',
    content: 'Cheating and dishonestly inducing delivery of property.',
    simplified: 'This is about "Scams." If someone lies to you to take your money or property by tricking you, they are punished under 420.',
    teacher_analogy: 'It\'s like someone promising to give you a chocolate for your pen, taking your pen, and then running away without giving the chocolate.',
    category: 'Criminal Law',
    keywords: ['cheating', 'scam', 'fraud', 'lying', 'fake', 'dishonesty', 'tricked', 'i was cheated', 'money lost']
  },
  {
    id: '4',
    number: '21A',
    title: 'Right to Education',
    content: 'The State shall provide free and compulsory education to all children of the age of six to fourteen years in such manner as the State may, by law, determine.',
    simplified: 'Every child between 6 and 14 years old has the right to go to school for free. The government must provide this education.',
    teacher_analogy: 'It\'s like a "Golden Ticket" given to every child that opens the door to a school, and no one can charge you for it.',
    category: 'Fundamental Rights',
    keywords: ['education', 'school', 'children', 'learning', 'study']
  },
  {
    id: '5',
    number: '51A(a)',
    title: 'Respect the Constitution, Flag & Anthem',
    content: 'To abide by the Constitution and respect its ideals and institutions, the National Flag and the National Anthem.',
    simplified: 'We must follow the rules of our country and show respect to our National Flag and the National Anthem.',
    teacher_analogy: 'Just like we stand up when a teacher enters the room or respect the school rules, we respect the symbols of our country.',
    category: 'Fundamental Duties',
    keywords: ['duty', 'respect', 'flag', 'anthem', 'constitution', 'patriotism']
  }
];

const helplineData = [
  { id: '1', name: 'National Emergency Number', number: '112', category: 'Police' },
  { id: '2', name: 'Police', number: '100', category: 'Police' },
  { id: '3', name: 'Ambulance', number: '102', category: 'Medical' },
  { id: '4', name: 'Women Helpline', number: '1091', category: 'Women' },
  { id: '5', name: 'Child Helpline', number: '1098', category: 'Child' },
  { id: '6', name: 'Cyber Crime Helpline', number: '1930', category: 'Police' }
];

const lawyersData = [
  { name: "Adv. Rajesh Kumar", specialty: "Criminal & Civil Law", phone: "+91 98765 43210", email: "rajesh@legal.in", state: "Delhi", district: "New Delhi" },
  { name: "Adv. Priya Sharma", specialty: "Family & Women Rights", phone: "+91 87654 32109", email: "priya@law.in", state: "Maharashtra", district: "Mumbai City" },
  { name: "Adv. Nitin Deshmukh", specialty: "Criminal Defense", phone: "+91 98220 11223", email: "nitin@pune.in", state: "Maharashtra", district: "Pune" }
];

const constitutionQuiz = [
  {
    id: 'q1',
    question: 'Which Article of the Constitution guarantees the "Right to Education"?',
    options: ['Article 14', 'Article 21A', 'Article 19', 'Article 51A'],
    correctAnswer: 1,
    explanation: 'Article 21A states that the State shall provide free and compulsory education to all children of the age of six to fourteen years.'
  },
  {
    id: 'q2',
    question: '"Equality before Law" is mentioned in which Article?',
    options: ['Article 21', 'Article 51A', 'Article 14', 'Article 19'],
    correctAnswer: 2,
    explanation: 'Article 14 ensures that every person is equal before the law and has equal protection of the laws.'
  }
];

const translations = {
  EN: { title: "Know Your Rights", subtitle: "Understand the law in simple terms.", searchPlaceholder: "Describe what happened...", home: "Home", documents: "Documents", contact: "Contact", legalAI: "Legal AI", quizMode: "Quiz Mode", readExplanation: "Read Explanation", loginTitle: "Citizen Portal", loginSubtitle: "Enter your phone number to access legal help.", loginBtn: "Send OTP", verifyBtn: "Verify & Login", phoneLabel: "Phone Number", enterOtp: "Enter 6-Digit OTP" },
  HI: { title: "अपने अधिकारों को जानें", subtitle: "कानून को सरल शब्दों में समझें।", searchPlaceholder: "बताएं कि क्या हुआ...", home: "होम", documents: "दस्तावेज़", contact: "संपर्क", legalAI: "कानूनी AI", quizMode: "क्विज मोड", readExplanation: "व्याख्या पढ़ें", loginTitle: "नागरिक पोर्टल", loginSubtitle: "कानूनी सहायता के लिए अपना फोन नंबर दर्ज करें।", loginBtn: "OTP भेजें", verifyBtn: "सत्यापित करें और लॉगिन करें", phoneLabel: "फ़ोन नंबर", enterOtp: "6-अंकों का ओटीपी दर्ज करें" }
  // Add more languages as needed...
};

// --- STATE ---
let state = {
  isLoggedIn: false,
  language: 'EN',
  phoneNumber: '',
  isOtpSent: false,
  generatedOtp: '',
  searchTerm: '',
  selectedCategory: null,
  bookmarks: JSON.parse(localStorage.getItem('constitution_bookmarks') || '[]'),
  currentQuizQuestion: 0,
  quizScore: 0,
  isQuizFinished: false
};

// --- UTILS ---
function t(key) {
  return (translations[state.language] || translations['EN'])[key] || key;
}

function updateTranslations() {
  document.getElementById('login-title').innerText = t('loginTitle');
  document.getElementById('login-subtitle').innerText = state.isOtpSent ? `OTP sent to +91 ${state.phoneNumber}` : t('loginSubtitle');
  document.getElementById('phone-label').innerText = t('phoneLabel');
  document.getElementById('otp-label').innerText = t('enterOtp');
  document.getElementById('login-btn').innerText = state.isOtpSent ? t('verifyBtn') : t('loginBtn');
  
  document.getElementById('hero-title').innerText = t('title');
  document.getElementById('hero-subtitle').innerText = t('subtitle');
  document.getElementById('search-input').placeholder = t('searchPlaceholder');
  
  document.querySelectorAll('.t-home').forEach(el => el.innerText = t('home'));
  document.querySelectorAll('.t-documents').forEach(el => el.innerText = t('documents'));
  document.querySelectorAll('.t-contact').forEach(el => el.innerText = t('contact'));
  document.querySelectorAll('.t-legalAI').forEach(el => el.innerText = t('legalAI'));
  document.querySelectorAll('.t-quizMode').forEach(el => el.innerText = t('quizMode'));
}

// --- RENDERERS ---
function renderArticles() {
  const grid = document.getElementById('article-grid');
  const filtered = constitutionData.filter(a => {
    const s = state.searchTerm.toLowerCase();
    const matchesSearch = a.number.toLowerCase().includes(s) || a.title.toLowerCase().includes(s) || a.keywords.some(k => k.toLowerCase().includes(s));
    const matchesCategory = !state.selectedCategory || a.category === state.selectedCategory;
    return matchesSearch && matchesCategory;
  });

  grid.innerHTML = filtered.map(a => {
    const content = getLocalizedContent(a);
    return `
      <div class="article-card" onclick="showArticleDetails('${a.id}')">
        <div class="article-header">
          <span class="article-number">Article ${a.number}</span>
          <span class="article-category">${a.category}</span>
        </div>
        <h3>${content.title}</h3>
        <p class="preview">${content.simplified.substring(0, 100)}...</p>
        <div class="card-footer"><span>${t('readExplanation')}</span> <i data-lucide="arrow-right" style="width:16px; height:16px;"></i></div>
      </div>
    `;
  }).join('');
  lucide.createIcons();
}

function getLocalizedContent(article) {
  const trans = article.translations ? article.translations[state.language] : null;
  return {
    title: trans?.title || article.title,
    simplified: trans?.simplified || article.simplified,
    content: trans?.content || article.content,
    teacher_analogy: trans?.teacher_analogy || article.teacher_analogy
  };
}

function renderCategories() {
  const tagsContainer = document.getElementById('category-tags');
  const categories = ['All', ...new Set(constitutionData.map(a => a.category))];
  
  tagsContainer.innerHTML = categories.map(c => `
    <button class="${(state.selectedCategory === c || (c === 'All' && !state.selectedCategory)) ? 'active' : ''}" onclick="selectCategory('${c === 'All' ? null : c}')">${c}</button>
  `).join('');
}

// --- ACTIONS ---
window.selectCategory = function(cat) {
  state.selectedCategory = cat === 'null' ? null : cat;
  renderCategories();
  renderArticles();
};

window.showArticleDetails = function(id) {
  const a = constitutionData.find(art => art.id === id);
  const content = getLocalizedContent(a);
  const modal = document.getElementById('modal-overlay');
  modal.style.display = 'flex';
  modal.innerHTML = `
    <div class="modal-content" onclick="event.stopPropagation()">
      <button class="close-btn" onclick="closeModal()"><i data-lucide="x"></i></button>
      <div class="modal-header">
        <h2>Article ${a.number}</h2>
        <h1>${content.title}</h1>
      </div>
      <span class="category-badge">${a.category}</span>
      <div class="explanation-section">
        <div class="explanation-box simple">
          <div class="box-header"><i data-lucide="shield"></i><h3>Simple Meaning</h3></div>
          <p>${content.simplified}</p>
        </div>
        ${content.teacher_analogy ? `
          <div class="explanation-box teacher">
            <div class="box-header"><i data-lucide="trophy"></i><h3>Teacher Analogy</h3></div>
            <p>${content.teacher_analogy}</p>
          </div>
        ` : ''}
        <div class="explanation-box original">
          <div class="box-header"><i data-lucide="building-2"></i><h3>Legal Text</h3></div>
          <p>${content.content}</p>
        </div>
      </div>
    </div>
  `;
  lucide.createIcons();
};

window.closeModal = function() {
  document.getElementById('modal-overlay').style.display = 'none';
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  // Login Logic
  const loginForm = document.getElementById('login-form');
  const phoneInput = document.getElementById('phone-number');
  const otpDigits = document.querySelectorAll('.otp-digit');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!state.isOtpSent) {
      state.phoneNumber = phoneInput.value;
      state.generatedOtp = "123456"; // Mock OTP
      state.isOtpSent = true;
      document.getElementById('phone-input-group').style.display = 'none';
      document.getElementById('otp-input-group').style.display = 'block';
      document.getElementById('resend-otp-btn').style.display = 'block';
      alert("Debug OTP: 123456");
      updateTranslations();
    } else {
      const enteredOtp = Array.from(otpDigits).map(i => i.value).join('');
      if (enteredOtp === state.generatedOtp) {
        state.isLoggedIn = true;
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('main-app').style.display = 'flex';
        renderCategories();
        renderArticles();
      } else {
        alert("Invalid OTP");
      }
    }
  });

  // Language Change
  document.getElementById('language-select').addEventListener('change', (e) => {
    state.language = e.target.value;
    updateTranslations();
    renderArticles();
  });

  // Search
  document.getElementById('search-input').addEventListener('input', (e) => {
    state.searchTerm = e.target.value;
    renderArticles();
  });

  // Navigation
  document.getElementById('nav-home').onclick = () => window.scrollTo(0,0);
  document.getElementById('nav-quiz').onclick = startQuiz;
  document.getElementById('logout-btn').onclick = () => location.reload();
  
  document.getElementById('nav-documents').onclick = showDocuments;
  document.getElementById('nav-contact').onclick = showContact;
  document.getElementById('nav-assistant').onclick = showAssistant;
});

function showDocuments() {
  const modal = document.getElementById('modal-overlay');
  modal.style.display = 'flex';
  modal.innerHTML = `
    <div class="modal-content" style="max-width: 900px;" onclick="event.stopPropagation()">
      <button class="close-btn" onclick="closeModal()"><i data-lucide="x"></i></button>
      <h1>Legal Documents</h1>
      <div class="dept-section">
        <div class="dept-title-box">
          <i data-lucide="shield" style="width:32px; height:32px;"></i>
          <div><h2>Aadhar Card</h2><p>Your unique identification document.</p></div>
        </div>
        <div class="dept-laws-grid">
          <div class="law-info-card"><h4>Right to Privacy</h4><span>Art 21</span><p>Aadhar data is protected under privacy laws.</p></div>
        </div>
      </div>
    </div>
  `;
  lucide.createIcons();
}

function showContact() {
  const modal = document.getElementById('modal-overlay');
  modal.style.display = 'flex';
  modal.innerHTML = `
    <div class="modal-content" onclick="event.stopPropagation()">
      <button class="close-btn" onclick="closeModal()"><i data-lucide="x"></i></button>
      <h1>Contact Lawyers</h1>
      <div class="lawyers-list">
        ${lawyersData.map(l => `
          <div class="lawyer-card">
            <div class="lawyer-info">
              <h3>${l.name}</h3>
              <span class="specialty-tag">${l.specialty}</span>
              <p>${l.state}, ${l.district}</p>
            </div>
            <div class="lawyer-actions">
              <a href="tel:${l.phone}" class="call-btn"><i data-lucide="phone"></i></a>
              <a href="mailto:${l.email}" class="email-btn"><i data-lucide="mail"></i></a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  lucide.createIcons();
}

function showAssistant() {
  const modal = document.getElementById('modal-overlay');
  modal.style.display = 'flex';
  modal.innerHTML = `
    <div class="modal-content" onclick="event.stopPropagation()">
      <button class="close-btn" onclick="closeModal()"><i data-lucide="x"></i></button>
      <h1>Legal AI Assistant</h1>
      <p style="margin: 1rem 0;">Type your issue and I'll find relevant laws.</p>
      <input type="text" id="ai-query" placeholder="e.g. someone stole my phone" style="width:100%; padding:1rem; border-radius:1rem; border:1px solid #ccc;">
      <button onclick="runAI()" style="width:100%; padding:1rem; background:var(--primary-color); color:white; border:none; border-radius:1rem; margin-top:1rem; font-weight:bold;">Analyze</button>
      <div id="ai-results" style="margin-top:2rem;"></div>
    </div>
  `;
  lucide.createIcons();
}

window.runAI = function() {
  const q = document.getElementById('ai-query').value.toLowerCase();
  const results = constitutionData.filter(a => a.keywords.some(k => q.includes(k)));
  const container = document.getElementById('ai-results');
  if(results.length > 0) {
    container.innerHTML = results.map(a => `<div class="law-info-card" onclick="showArticleDetails('${a.id}')" style="cursor:pointer; margin-bottom:1rem;"><h4>${a.title}</h4><p>Article ${a.number}</p></div>`).join('');
  } else {
    container.innerHTML = "<p>No specific laws found. Try keywords like 'theft', 'equality', 'religion'.</p>";
  }
}

function startQuiz() {
  state.currentQuizQuestion = 0;
  state.quizScore = 0;
  showQuizQuestion();
}

function showQuizQuestion() {
  const q = constitutionQuiz[state.currentQuizQuestion];
  const modal = document.getElementById('modal-overlay');
  modal.style.display = 'flex';
  modal.innerHTML = `
    <div class="modal-content" onclick="event.stopPropagation()">
      <button class="close-btn" onclick="closeModal()"><i data-lucide="x"></i></button>
      <div class="quiz-container">
        <div class="quiz-header"><span>Question ${state.currentQuizQuestion + 1} of ${constitutionQuiz.length}</span></div>
        <h2 class="quiz-question">${q.question}</h2>
        <div class="quiz-options">
          ${q.options.map((opt, i) => `<button class="option-btn" onclick="checkAnswer(${i})">${opt}</button>`).join('')}
        </div>
        <div id="quiz-feedback" style="display:none;" class="quiz-feedback">
          <p id="feedback-text"></p>
          <button class="next-btn" onclick="nextQuizQuestion()">Next</button>
        </div>
      </div>
    </div>
  `;
  lucide.createIcons();
}

window.checkAnswer = function(idx) {
  const q = constitutionQuiz[state.currentQuizQuestion];
  const buttons = document.querySelectorAll('.option-btn');
  const feedback = document.getElementById('quiz-feedback');
  const feedbackText = document.getElementById('feedback-text');
  
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if(i === q.correctAnswer) btn.classList.add('correct');
    else if(i === idx) btn.classList.add('wrong');
  });

  if(idx === q.correctAnswer) state.quizScore++;
  feedbackText.innerText = q.explanation;
  feedback.style.display = 'block';
}

window.nextQuizQuestion = function() {
  state.currentQuizQuestion++;
  if(state.currentQuizQuestion < constitutionQuiz.length) {
    showQuizQuestion();
  } else {
    const modal = document.getElementById('modal-overlay');
    modal.innerHTML = `
      <div class="modal-content text-center" onclick="event.stopPropagation()">
        <button class="close-btn" onclick="closeModal()"><i data-lucide="x"></i></button>
        <i data-lucide="trophy" style="width:64px; height:64px; color:var(--primary-color);"></i>
        <h1>Quiz Completed!</h1>
        <p style="font-size:1.5rem; margin:1rem 0;">Your Score: ${state.quizScore} / ${constitutionQuiz.length}</p>
        <button class="next-btn" onclick="startQuiz()">Try Again</button>
      </div>
    `;
    lucide.createIcons();
  }
}
