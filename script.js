// --- كود السلايدر المتحرك ---
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.ad-slide-item');
const dots = document.querySelectorAll('.slider-dot');
const track = document.getElementById('adsTrack');

function updateSlider() {
    if(!track) return;
    track.style.transform = `translateX(${currentSlideIndex * 100}%)`;
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlideIndex);
    });
}

function nextSlide() {
    if(slides.length === 0) return;
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    updateSlider();
}

function currentSlide(index) {
    currentSlideIndex = index;
    updateSlider();
}

let slideInterval = setInterval(nextSlide, 4000);

const adsContainer = document.getElementById('adsSlider');
if(adsContainer) {
    adsContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
    adsContainer.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 4000));
}

// --- نظام أساتذة الفرع العلمي ---
let arabicTeachers = [
    { id: 'aqeel', name: 'الأستاذ عقيل الزبيدي', subject: 'اللغة العربية - السادس العلمي', likes: 0, userVote: false, img: 'https://i.imgur.com/PkVYe5d.jpeg' },
    { id: 'hussein', name: 'الأستاذ حسين عبيده', subject: 'اللغة العربية - السادس العلمي', likes: 0, userVote: false, img: 'https://i.imgur.com/NGwjU7p.jpeg' },
    { id: 'hamza', name: 'الأستاذ حمزه الجابري', subject: 'اللغة العربية - السادس العلمي', likes: 0, userVote: false, img: 'https://i.imgur.com/P7cah0U.jpeg' }
];

function renderArabicTeachers() {
    const savedVotes = JSON.parse(localStorage.getItem('teacherVotes')) || {};
    arabicTeachers.forEach(teacher => {
        if (savedVotes[teacher.id]) {
            teacher.likes = savedVotes[teacher.id].likes;
            teacher.userVote = savedVotes[teacher.id].userVote;
        }
    });

    const container = document.getElementById('arabicTeachersList');
    if(!container) return;

    const cardPositions = {};
    container.querySelectorAll('.teacher-card-item').forEach(card => {
        const id = card.getAttribute('data-id');
        if (id) {
            cardPositions[id] = card.getBoundingClientRect();
        }
    });

    arabicTeachers.sort((a, b) => b.likes - a.likes);
    
    container.innerHTML = '';
    
    arabicTeachers.forEach((teacher, index) => {
        let rankText = `المرتبة #${index + 1}`;
        let rankClass = 'rank-third';
        
        if(index === 0) {
            rankText = `👑 الأول على المادة`;
            rankClass = 'rank-first';
        } else if(index === 1) {
            rankText = `⭐ المرتبة #2`;
            rankClass = 'rank-second';
        } else if(index === 2) {
            rankText = `🥉 المرتبة #3`;
            rankClass = 'rank-third';
        }
        
        const card = document.createElement('div');
        card.className = 'teacher-card-item';
        card.setAttribute('data-id', teacher.id);
        card.innerHTML = `
            <div class="teacher-info-side">
                <div class="teacher-rank-badge ${rankClass}">${rankText}</div>
                <div class="teacher-main-title">${teacher.name}</div>
                <div class="teacher-meta-list" style="margin-top: 6px;">
                    <div class="teacher-meta-row"><span>المادة:</span> <strong>${teacher.subject}</strong></div>
                    <div class="teacher-meta-row"><span>عام التقييم:</span> <strong>2027</strong></div>
                </div>
                <div class="voting-actions-row" style="margin-top: 10px;">
                    <button class="vote-btn like-btn ${teacher.userVote ? 'active' : ''}" onclick="voteTeacher('${teacher.id}')">
                        👍 لايك <span class="vote-count">(${teacher.likes})</span>
                    </button>
                </div>
            </div>
            <div class="teacher-avatar-side">
                <img src="${teacher.img}" alt="${teacher.name}" class="teacher-avatar-img">
            </div>
        `;
        container.appendChild(card);

        const oldPos = cardPositions[teacher.id];
        if (oldPos) {
            const newPos = card.getBoundingClientRect();
            const deltaY = oldPos.top - newPos.top;
            
            if (deltaY !== 0) {
                card.style.transform = `translateY(${deltaY}px)`;
                card.style.transition = 'none';
                
                requestAnimationFrame(() => {
                    card.style.transform = '';
                    card.style.transition = 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
                });
            }
        }
    });
}

function voteTeacher(teacherId) {
    const targetTeacher = arabicTeachers.find(t => t.id === teacherId);
    if (!targetTeacher) return;

    if (targetTeacher.userVote) {
        targetTeacher.likes--;
        targetTeacher.userVote = false;
    } else {
        arabicTeachers.forEach(teacher => {
            if (teacher.userVote) {
                teacher.likes--;
                teacher.userVote = false;
            }
        });

        targetTeacher.likes++;
        targetTeacher.userVote = true;
    }

    const votesToSave = {};
    arabicTeachers.forEach(t => {
        votesToSave[t.id] = { likes: t.likes, userVote: t.userVote };
    });
    localStorage.setItem('teacherVotes', JSON.stringify(votesToSave));

    renderArabicTeachers();
}

function filterItems(sectionType, subjectName) {
    let containerId = '';
    if(sectionType === 'books') containerId = 'booksListContainer';
    else if(sectionType === 'mlazem') containerId.length ? '' : containerId = 'mlazemListContainer';
    else if(sectionType === 'copies') containerId = 'copiesListContainer';
    else if(sectionType === 'courses') containerId = 'coursesListContainer';

    const container = document.getElementById(containerId);
    if(!container) return;

    const eventTarget = event.currentTarget;
    if(eventTarget) {
        const parentBar = eventTarget.parentElement;
        parentBar.querySelectorAll('.filter-chip').forEach(chip => chip.classList.remove('active'));
        eventTarget.classList.add('active');
    }

    const items = container.querySelectorAll('.book-card-item');
    items.forEach(item => {
        const itemSubject = item.getAttribute('data-subject');
        if(subjectName === 'all' || itemSubject === subjectName) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('site_initialized_v5')) {
        localStorage.removeItem('teacherVotes');
        localStorage.setItem('site_initialized_v5', 'true');
    }
    renderArabicTeachers();
});

let pageHistory=['home'];
function showPage(id, parentId=null){document.querySelectorAll('.page-view').forEach(v=>v.classList.remove('active'));const targetPage=document.getElementById(id);if(targetPage){targetPage.classList.add('active');if(pageHistory[pageHistory.length-1]!==id){pageHistory.push(id);}}window.scrollTo({top:0,behavior:'smooth'});}
function switchPage(id, element){pageHistory=['home', id];showPage(id);document.querySelectorAll('.side-nav-item').forEach(item=>item.classList.remove('active'));if(element)element.classList.add('active');}
function goBack(){if(pageHistory.length>1){pageHistory.pop();let previousPage=pageHistory[pageHistory.length-1];document.querySelectorAll('.page-view').forEach(v=>v.classList.remove('active'));document.getElementById(previousPage)?.classList.add('active');window.scrollTo({top:0,behavior:'smooth'});if(previousPage==='home'||previousPage==='teachers-page'||previousPage==='books-page'||previousPage==='mlazem-page'||previousPage==='ministerial-copies-page'||previousPage==='chats-page'||previousPage==='notifications-page'||previousPage==='courses-page'||previousPage==='ministerial-page'){document.querySelectorAll('.side-nav-item').forEach(item=>{if(item.getAttribute('data-page')===previousPage){item.classList.add('active');}else{item.classList.remove('active');}});}}}
function toggleMenu(){const overlay=document.getElementById('navOverlay');const floatingContainer=document.getElementById('floatingContainer');const aiChatWindow=document.getElementById('aiChatWindow');overlay.classList.toggle('active');if(overlay.classList.contains('active')){floatingContainer.classList.add('hidden-floating');aiChatWindow.classList.remove('active');}else{floatingContainer.classList.remove('hidden-floating');}}
function closeMenu(e){if(e.target.id==='navOverlay'){toggleMenu();}}
function hideBadge(){document.getElementById('notifBadge').style.display='none';}
function toggleFloatingMenu(){document.getElementById('floatingMenuPopup').classList.toggle('active');}
window.addEventListener('click', function(e){const wrapper=document.querySelector('.floating-msg-wrapper');if(!wrapper.contains(e.target)){document.getElementById('floatingMenuPopup').classList.remove('active');}});
function toggleAIChat(){document.getElementById('aiChatWindow').classList.toggle('active');}

// --- محرك الذكاء الاصطناعي الخارق وخبير منهج السادس الإعدادي العراقي ---
function getSmartAIResponse(userText) {
    const rawText = userText.trim();
    const text = rawText.toLowerCase();

    // 1. نظام التطوير والتعلم الذاتي
    if (text.startsWith('تعلم:') || text.startsWith('احفظ:')) {
        let parts = rawText.replace(/^(تعلم:|احفظ:)/, '').split('=');
        if (parts.length === 2) {
            let key = parts[0].trim().toLowerCase();
            let val = parts[1].trim();
            let customBrain = JSON.parse(localStorage.getItem('ai_iraqi_sixth_brain')) || {};
            customBrain[key] = val;
            localStorage.setItem('ai_iraqi_sixth_brain', JSON.stringify(customBrain));
            return `🚀 ممتاز يا مصطفى! تم تحديث ذاكرتي وحفظ هذه المعلومة بنجاح في قاعدة البيانات التخصصية للسادس الإعدادي.`;
        } else {
            return `صيغة التعلم الصحيحة:\nتعلم: [السؤال] = [الإجابة]`;
        }
    }

    let customBrain = JSON.parse(localStorage.getItem('ai_iraqi_sixth_brain')) || {};
    for (let storedKey in customBrain) {
        if (text.includes(storedKey)) {
            return `💡 [من ذاكرتي المطورة]:\n${customBrain[storedKey]}`;
        }
    }

    // 2. معرفة شاملة ودقيقة بجميع مواد السادس الإعدادي (العلمي) في العراق
    if (text.includes('مواد') || text.includes('كم مادة') || text.includes('ايش قد مواد')) {
        return `📚 مواد السادس الإعدادي (الفرع العلمي) في العراق تتكون من 7 مواد أساسية (+ اللغة الفرنسية كمادة اختيارية ثانية):\n1. التربية الإسلامية\n2. اللغة العربية (قواعد وأدب)\n3. اللغة الإنجليزية (8 وحدات)\n4. الرياضيات (6 فصول)\n5. الفيزياء (11 فصل)\n6. الكيمياء (8 فصول)\n7. الأحياء (5 فصول للإحيائي)\n8. اللغة الفرنسية (اللغة الأجنبية الثانية).`;
    }

    // الرياضيات
    if (text.includes('رياضيات') || text.includes('فصول الرياضيات')) {
        return `📐 منهج الرياضيات للسادس العلمي يتكون من 6 فصول رئيسية:\n• الفصل الأول: الأعداد المركبة.\n• الفصل الثاني: القطوع المخروطية.\n• الفصل الثالث: التفاضل وتطبيقاته (المعدلات الزمنية، التقرير، التزايد والتناقص، الرسم).\n• الفصل الرابع: التكامل وتطبيقاته (المحدد وغير المحدد، المساحات).\n• الفصل الخامس: المعادلات التفاضلية العادية.\n• الفصل السادس: تطبيقات علمية (أو الهندسة حسب التقليص الوزاري).`;
    }

    // الفيزياء
    if (text.includes('فيزياء') || text.includes('فصول الفيزياء')) {
        return `⚡ منهج الفيزياء للسادس العلمي يتكون من 11 فصلاً:\n1. المتجهات والحث الكهرومغناطيسي.\n2. الحث المتبادل والذاتي.\n3. التيار المتناوب والدوائر المهتزة.\n4. الموجات الكهرومغناطيسية.\n5. البصريات الفيزيائية (التداخل والحيود).\n6. الفيزياء الحديثة (النسبية، أينشتاين).\n7. إلكترونيات الحالة الصلبة والدوائر المتكاملة.\n8. الأطياف الذرية والليزر.\n9. النوى الذرية والنشاط الإشعاعي.\n10 & 11. الفصول الخاصة بالتقليصات أو التطبيقي/الإحيائي.`;
    }

    // الكيمياء
    if (text.includes('كيمياء') || text.includes('فصول الكيمياء')) {
        return `🧪 منهج الكيمياء للسادس العلمي يتكون من 8 فصول:\n• الفصل الأول: علم الثرمودايناميك.\n• الفصل الثاني: الاتزان الكيميائي.\n• الفصل الثالث: الاتزان الأيوني (الحوامض والقواعد).\n• الفصل الرابع: الكيمياء الكهربائية.\n• الفصل الخامس: الكيمياء التناسقية.\n• الفصل السادس: التحليل الكيميائي.\n• الفصل السابع: الكيمياء العضوية.\n• الفصل الثامن: الكيمياء الصناعية.`;
    }

    // الأحياء
    if (text.includes('احياء') || text.includes('أحياء') || text.includes('فصول الأحياء')) {
        return `🧬 منهج الأحياء للسادس العلمي (الإحيائي) يتكون من 5 فصول جوهرية:\n• الفصل الأول: الخلية (تركيبها، العضيات، الانقسام الخلوي).\n• الفصل الثاني: النسيج (الأنسجة النباتية والحيوانية).\n• الفصل الثالث: التكاثر (في النباتات والحيوانات والإنسان).\n• الفصل الرابع: التكوين الجنيني.\n• الفصل الخامس: الوراثة (مندل، المورثات المميتة، المجاميع الدموية، الخريطة الجينية).`;
    }

    // اللغة العربية
    if (text.includes('عربي') || text.includes('قواعد العربي') || text.includes('أدب')) {
        return `📖 منهج اللغة العربية للسادس الإعدادي ينقسم إلى قسمين رئيسيين:\n1. القواعد (تضم مواضيع: الاستفهام، النفي، الاستثناء، التقديم والتاخير، التوكيد، النداء، التعجب، المدح والذم، الخصائص).\n2. الأدب والنصوص (يضم الشعر الحديث، المدارس الشعرية مثل الديوان، المهجر، الإحياء، النثر، القصائد المطلوبة للحفظ، وحياة الشعراء).`;
    }

    // اللغة الفرنسية (التركيز الخاص المطلوب)
    if (text.includes('فرنسي') || text.includes('فرنساوي') || text.includes('لغة فرنسية')) {
        return `🇫🇷 منهج اللغة الفرنسية للسادس الإعدادي في العراق:\n• يعتبر الفرنسية اللغة الأجنبية الثانية (بديل التركية أو الفارسية في بعض المدارس الأهلية أو الحكومية).\n• يتكون المنهج من وحدات دراسية (Unité 1 إلى Unité 6 تقريباً).\n• يركز على: قواعد اللغة (La Grammaire)، تصريف الأفعال (Les Verbes)، القطع الاستيعابية (Les Comprehensions)، الإنشاءات (Les Productions écrites)، والمفردات والأسئلة الوزارية المهمة.\nهل تحتاج إلى ملخص أو قاعدة معينة في الفرنسية يا مصطفى؟`;
    }

    // اللغة الإنجليزية
    if (text.includes('انكليزي') || text.includes('إنجليزي') || text.includes('units')) {
        return `🇬🇧 منهج اللغة الإنجليزية للسادس الإعدادي يتكون من 8 وحدات (Units 1 to 8)، وتتضمن:\n• القواعد (Grammar) لكل وحدة.\n• المفردات والإملاء (Vocabulary & Spelling).\n• القطع الاستيعابية (Reading Comprehensions).\n• القصص المقررة (Literature Spotlight مثل قصة The Canary).\n• الإنشاءات (Writing) لكل وحدة وزارية.`;
    }

    // 3. التحيات والترحيب
    if (text.includes('مرحبا') || text.includes('هلا') || text.includes('أهلا') || text.includes('سلام')) {
        return `أهلاً بك يا مصطفى! بصفتي خبيرك الذكي في منهج السادس الإعدادي في العراق، أنا جاهز لإجابتك عن أي مادة، عدد فصول، مواضيع داخلية، وزاريات، أو قواعد فرنسية وإنجليزية. ماذا تريد أن تراجع اليوم؟`;
    }

    if (text.includes('كيف حالك') || text.includes('شلونك')) {
        return `بأعلى جاهزية تامة يا مصطفى! أمتلك كامل معلومات المناهج العراقية للسادس الإعدادي. كيف أستطيع خدمتك الآن؟`;
    }

    // 4. البرمجة وتطوير الموقع (لأن مصطفى مطور ويب)
    if (text.includes('برمجة') || text.includes('كود') || text.includes('html') || text.includes('css') || text.includes('javascript')) {
        return `بما أنك تطور منصة "شيرادله السادس"، يمكنني مساعدتك في أي كود جافاسكريبت، تنظيم الـ LocalStorage، أو تحسين الواجهات البرمجية للموقع فوراً. ما هي المشكلة البرمجية التي تواجهك؟`;
    }

    // 5. الرد الشامل الذكي لأي استفسار آخر
    return `سؤال ذكي جداً يا مصطفى! بصفتي النظام الذكي الشامل لمنصتك والمطلع على تفاصيل المنهج العراقي للسادس الإعدادي، يمكننا تحليل هذا الموضوع من كافة الزوايا. \n\nإذا أردت تعليمي إجابة مخصصة لهذا السؤال لتنضم إلى ذاكرتي الدائمة، اكتب لي:\nتعلم: ${rawText} = [الجواب المناسب]\nأو أخبرني بالتفصيل لنناقشه معاً!`;
}

function sendAIMessage(){
    const inputField = document.getElementById('aiChatInput');
    const chatBody = document.getElementById('aiChatBody');
    if(!inputField || !chatBody) return;
    const text = inputField.value.trim();
    if(text === "") return;
    
    const userMsg = document.createElement('div');
    userMsg.className = 'ai-message user';
    userMsg.textContent = text;
    chatBody.appendChild(userMsg);
    inputField.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;
    
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'ai-message bot';
        botMsg.textContent = getSmartAIResponse(text);
        chatBody.appendChild(botMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 450);
}

function handleAIPress(e){
    if(e.key === 'Enter') sendAIMessage();
}


