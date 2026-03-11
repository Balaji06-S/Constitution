// --- ENHANCED BACKEND SIMULATION & DATA ---
const constitutionData = [
    { id: '1', number: '14', title: 'Equality before Law', category: 'Fundamental Rights', keywords: ['equal', 'fair', 'justice'], simplified: 'Everyone is equal in the eyes of the law.', content: 'The State shall not deny to any person equality before the law...', teacher_analogy: 'Like a game of football: rules are the same for everyone.' },
    { id: '2', number: '19', title: 'Freedom of Speech', category: 'Fundamental Rights', keywords: ['speak', 'talk', 'protest'], simplified: 'You have the right to express your thoughts freely.', content: 'All citizens shall have the right to freedom of speech and expression...', teacher_analogy: 'Like having a microphone to share your ideas safely.' },
    { id: '3', number: '21', title: 'Right to Life', category: 'Fundamental Rights', keywords: ['live', 'safety', 'liberty'], simplified: 'You have the right to live and be free.', content: 'No person shall be deprived of his life or personal liberty...', teacher_analogy: 'Like a protective shield around your life.' },
    { id: '4', number: '302', title: 'Section 302: Murder', category: 'Criminal Law', keywords: ['kill', 'death', 'crime'], simplified: 'Strict punishment for taking someone\'s life.', content: 'Whoever commits murder shall be punished with death or life imprisonment.', teacher_analogy: 'Breaking the most important rule leads to the most serious penalty.' },
    { id: '5', number: '379', title: 'Section 379: Theft', category: 'Criminal Law', keywords: ['steal', 'rob', 'stolen'], simplified: 'Punishment for taking things that aren\'t yours.', content: 'Whoever commits theft shall be punished with imprisonment up to 3 years.', teacher_analogy: 'Don\'t take a classmate\'s pencil without asking.' },
    { id: '6', number: '420', title: 'Section 420: Cheating', category: 'Criminal Law', keywords: ['scam', 'fraud', 'lie'], simplified: 'Punishment for tricking people for money.', content: 'Cheating and dishonestly inducing delivery of property.', teacher_analogy: 'Like promising a chocolate and taking a pen without giving it.' }
];

const helplineData = [
    { name: 'Emergency', number: '112' }, { name: 'Police', number: '100' }, { name: 'Women', number: '1091' }, { name: 'Child', number: '1098' }
];

const lawyersData = [
    { name: "Adv. Rajesh Kumar", specialty: "Criminal", location: "Delhi", phone: "+91 98765 43210" },
    { name: "Adv. Priya Sharma", specialty: "Family Law", location: "Mumbai", phone: "+91 87654 32109" }
];

const quizData = [
    { q: "Which Article gives the Right to Education?", a: ["Art 14", "Art 21A", "Art 19"], c: 1, e: "Art 21A ensures free education for kids 6-14." },
    { q: "What is Section 420 about?", a: ["Murder", "Theft", "Cheating"], c: 2, e: "Section 420 deals with fraud and scams." }
];

// --- APP STATE ---
let state = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    language: 'EN',
    phoneNumber: '',
    isOtpSent: false,
    generatedOtp: '',
    searchTerm: '',
    selectedCategory: null
};

// --- CORE FUNCTIONS ---
function updateUI() {
    if (state.isLoggedIn) {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('main-app').style.display = 'flex';
        renderArticles();
        renderCategories();
    } else {
        document.getElementById('login-page').style.display = 'flex';
        document.getElementById('main-app').style.display = 'none';
    }
    lucide.createIcons();
}

function showLoading(show) {
    document.getElementById('loading-spinner').style.display = show ? 'flex' : 'none';
}

function renderArticles() {
    const grid = document.getElementById('article-grid');
    const filtered = constitutionData.filter(a => {
        const s = state.searchTerm.toLowerCase();
        return (a.title.toLowerCase().includes(s) || a.number.includes(s) || a.keywords.some(k => k.includes(s))) &&
               (!state.selectedCategory || a.category === state.selectedCategory);
    });

    grid.innerHTML = filtered.map(a => `
        <div class="article-card" onclick="showDetails('${a.id}')">
            <div class="article-header"><span class="article-number">Art ${a.number}</span><span class="article-category">${a.category}</span></div>
            <h3>${a.title}</h3>
            <p class="preview">${a.simplified}</p>
            <div class="card-footer">Read More <i data-lucide="arrow-right" style="width:14px;"></i></div>
        </div>
    `).join('');
    lucide.createIcons();
}

function renderCategories() {
    const cats = ['All', ...new Set(constitutionData.map(a => a.category))];
    document.getElementById('category-tags').innerHTML = cats.map(c => `
        <button class="${(state.selectedCategory === c || (c==='All' && !state.selectedCategory)) ? 'active' : ''}" 
                onclick="setCategory('${c === 'All' ? '' : c}')">${c}</button>
    `).join('');
}

window.setCategory = (c) => { state.selectedCategory = c || null; renderCategories(); renderArticles(); };

window.showDetails = (id) => {
    const a = constitutionData.find(x => x.id === id);
    const modal = document.getElementById('modal-overlay');
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" onclick="event.stopPropagation()">
            <button class="close-btn" onclick="closeModal()"><i data-lucide="x"></i></button>
            <h2>Article ${a.number}</h2><h1>${a.title}</h1>
            <div class="explanation-box simple"><h3><i data-lucide="shield"></i> Simple Meaning</h3><p>${a.simplified}</p></div>
            <div class="explanation-box teacher"><h3><i data-lucide="book-open"></i> Teacher Analogy</h3><p>${a.teacher_analogy}</p></div>
            <div class="explanation-box original"><h3><i data-lucide="file-text"></i> Legal Text</h3><p>${a.content}</p></div>
        </div>
    `;
    lucide.createIcons();
};

window.closeModal = () => document.getElementById('modal-overlay').style.display = 'none';

// --- EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
    updateUI();

    const loginForm = document.getElementById('login-form');
    const phoneInput = document.getElementById('phone-number');
    const otpDigits = document.querySelectorAll('.otp-digit');
    const loginBtn = document.getElementById('login-btn');

    // OTP Input Navigation
    otpDigits.forEach((input, i) => {
        input.oninput = () => { if(input.value && i < 5) otpDigits[i+1].focus(); };
        input.onkeydown = (e) => { if(e.key === 'Backspace' && !input.value && i > 0) otpDigits[i-1].focus(); };
    });

    loginForm.onsubmit = (e) => {
        e.preventDefault();
        if (!state.isOtpSent) {
            if(phoneInput.value.length !== 10) return alert("Enter 10 digits");
            showLoading(true);
            setTimeout(() => {
                showLoading(false);
                state.isOtpSent = true;
                state.generatedOtp = "123456";
                document.getElementById('phone-input-group').style.display = 'none';
                document.getElementById('otp-input-group').style.display = 'block';
                document.getElementById('resend-otp-btn').style.display = 'block';
                loginBtn.innerText = "Verify OTP";
                alert("BACKEND: OTP sent to " + phoneInput.value + "\nUse Code: 123456");
                otpDigits[0].focus();
            }, 1000);
        } else {
            const entered = Array.from(otpDigits).map(d => d.value).join('');
            if(entered === state.generatedOtp) {
                showLoading(true);
                setTimeout(() => {
                    showLoading(false);
                    localStorage.setItem('isLoggedIn', 'true');
                    state.isLoggedIn = true;
                    updateUI();
                }, 800);
            } else { alert("Wrong OTP. Try 123456"); }
        }
    };

    document.getElementById('resend-otp-btn').onclick = () => {
        state.isOtpSent = false;
        document.getElementById('phone-input-group').style.display = 'block';
        document.getElementById('otp-input-group').style.display = 'none';
        document.getElementById('resend-otp-btn').style.display = 'none';
        loginBtn.innerText = "Send OTP";
    };

    document.getElementById('guest-btn').onclick = () => {
        localStorage.setItem('isLoggedIn', 'true');
        state.isLoggedIn = true;
        updateUI();
    };

    document.getElementById('logout-btn').onclick = () => {
        localStorage.removeItem('isLoggedIn');
        location.reload();
    };

    document.getElementById('search-input').oninput = (e) => {
        state.searchTerm = e.target.value;
        renderArticles();
    };

    // Quick Action Handlers
    document.getElementById('card-helpline').onclick = () => {
        const modal = document.getElementById('modal-overlay');
        modal.style.display = 'flex';
        modal.innerHTML = `
            <div class="modal-content" onclick="event.stopPropagation()">
                <button class="close-btn" onclick="closeModal()"><i data-lucide="x"></i></button>
                <h1>Emergency Helplines</h1>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-top:1rem;">
                    ${helplineData.map(h => `<div class="law-info-card" style="text-align:center;"><h3>${h.name}</h3><strong style="font-size:1.5rem; color:red;">${h.number}</strong></div>`).join('')}
                </div>
            </div>
        `;
        lucide.createIcons();
    };

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
                    <p>Question ${current+1} of ${quizData.length}</p>
                    <h2>${q.q}</h2>
                    <div style="display:flex; flex-direction:column; gap:0.5rem; margin:1rem 0;">
                        ${q.a.map((opt, i) => `<button class="option-btn" id="opt-${i}">${opt}</button>`).join('')}
                    </div>
                    <div id="feedback" style="display:none; padding:1rem; background:#f0f7ff; border-radius:0.5rem; margin-top:1rem;"></div>
                </div>
            `;
            q.a.forEach((_, i) => {
                document.getElementById(`opt-${i}`).onclick = () => {
                    const fb = document.getElementById('feedback');
                    fb.style.display = 'block';
                    fb.innerHTML = `<strong>${i === q.c ? 'Correct!' : 'Incorrect.'}</strong><p>${q.e}</p><button id="next-q" class="login-btn" style="margin-top:1rem;">${current < quizData.length-1 ? 'Next' : 'Finish'}</button>`;
                    if(i === q.c) score++;
                    document.getElementById('next-q').onclick = () => {
                        current++;
                        if(current < quizData.length) showQ();
                        else alert(`Quiz Finished! Score: ${score}/${quizData.length}`);
                    };
                };
            });
        };
        showQ();
    };

    // AI Assistant
    document.getElementById('nav-assistant').onclick = () => {
        const modal = document.getElementById('modal-overlay');
        modal.style.display = 'flex';
        modal.innerHTML = `
            <div class="modal-content" onclick="event.stopPropagation()">
                <button class="close-btn" onclick="closeModal()"><i data-lucide="x"></i></button>
                <h1>Legal AI</h1><p>Describe your issue:</p>
                <input type="text" id="ai-in" placeholder="e.g. Someone hit my car" style="width:100%; padding:1rem; margin-top:1rem; border-radius:0.5rem; border:1px solid #ccc;">
                <button id="ai-go" class="login-btn" style="width:100%; margin-top:1rem;">Analyze Situation</button>
                <div id="ai-out" style="margin-top:1.5rem;"></div>
            </div>
        `;
        document.getElementById('ai-go').onclick = () => {
            const query = document.getElementById('ai-in').value.toLowerCase();
            const res = constitutionData.filter(a => a.keywords.some(k => query.includes(k)));
            const out = document.getElementById('ai-out');
            if(res.length) {
                out.innerHTML = `<h3>Relevant Laws Found:</h3>` + res.map(r => `<div class="law-info-card" onclick="showDetails('${r.id}')" style="cursor:pointer; margin-bottom:0.5rem;"><strong>Art ${r.number}: ${r.title}</strong><br><small>${r.simplified}</small></div>`).join('');
            } else {
                out.innerHTML = `<p style="color:red;">No direct matches. Try keywords like 'theft', 'freedom', or 'murder'.</p>`;
            }
        };
        lucide.createIcons();
    };
});
