import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, doc, updateDoc, increment, onSnapshot, setDoc, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCd3_U0LhAJLBqZH4sK2Hf_hCDNhW7ajxQ",
  authDomain: "sadshelp-e1624.firebaseapp.com",
  databaseURL: "https://sadshelp-e1624-default-rtdb.firebaseio.com",
  projectId: "sadshelp-e1624",
  storageBucket: "sadshelp-e1624.firebasestorage.app",
  messagingSenderId: "179363170264",
  appId: "1:179363170264:web:c7b049da90fb16fed654ad",
  measurementId: "G-ER0P4YP75D"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

(function() {
    if (window._siteAppInitialized) return;
    window._siteAppInitialized = true;

    // --- كود السلايدر المتحرك (يتم تفعيله عند جاهزية DOM) ---
    let currentSlideIndex = 0;
    let slideInterval;

    function initSlider() {
        const slides = document.querySelectorAll('.ad-slide-item');
        const dots = document.querySelectorAll('.slider-dot');
        const track = document.getElementById('adsTrack');
        if(!track || slides.length === 0) return;

        function updateSlider() {
            track.style.transform = `translateX(${currentSlideIndex * 100}%)`;
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentSlideIndex);
            });
        }

        function nextSlide() {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            updateSlider();
        }

        window.currentSlide = function(index) {
            currentSlideIndex = index;
            updateSlider();
        };

        slideInterval = setInterval(nextSlide, 4000);

        const adsContainer = document.getElementById('adsSlider');
        if(adsContainer) {
            adsContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
            adsContainer.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 4000));
        }
    }

    // --- نظام عداد المشاهدات والتحميلات للكتب ---
    let unsubscribeBookSnapshot = null;

    window.openBookDetail = function(bookId, title, image, fileUrl) {
        showPage('bookDetailView');

        const titleEl = document.getElementById('detailTitle');
        const imgEl = document.getElementById('detailImage');
        const downloadBtn = document.getElementById('detailDownloadBtn') || document.getElementById('detailTelegramBtn');

        if(titleEl) titleEl.innerText = title || '';
        if(imgEl) imgEl.src = image || '';
        if(downloadBtn && fileUrl) downloadBtn.href = fileUrl;

        const bookRef = doc(db, "books", bookId);

        // تحديث المشاهدات مرة واحدة لكل جلسة
        if (!sessionStorage.getItem('viewed_book_' + bookId)) {
            getDoc(bookRef).then((docSnap) => {
                if (!docSnap.exists()) {
                    setDoc(bookRef, { views: 1, downloads: 0 });
                } else {
                    updateDoc(bookRef, { views: increment(1) });
                }
            }).catch(console.error);
            sessionStorage.setItem('viewed_book_' + bookId, 'true');
        } else {
            getDoc(bookRef).then((docSnap) => {
                if (!docSnap.exists()) {
                    setDoc(bookRef, { views: 1, downloads: 0 });
                }
            }).catch(console.error);
        }

        if (unsubscribeBookSnapshot) unsubscribeBookSnapshot();

        unsubscribeBookSnapshot = onSnapshot(bookRef, (docSnap) => {
            const viewsEl = document.getElementById('views-count');
            const downloadsEl = document.getElementById('downloads-count');
            if (docSnap.exists()) {
                const data = docSnap.data();
                if(viewsEl) viewsEl.innerText = data.views || 0;
                if(downloadsEl) downloadsEl.innerText = data.downloads || 0;
            } else {
                if(viewsEl) viewsEl.innerText = 0;
                if(downloadsEl) downloadsEl.innerText = 0;
            }
        }, (error) => {
            console.error("خطأ في مزامنة إحصائيات الكتاب:", error);
        });

        // ربط حدث التحميل بشكل نظيف دون تكرار الاستنساخ
        if(downloadBtn) {
            downloadBtn.onclick = function() {
                setDoc(bookRef, { downloads: increment(1) }, { merge: true }).catch(console.error);
            };
        }
    };

    // --- قاعدة بيانات الأساتذة الشاملة ---
    const teachersData = {
        arabic: [
            { id: 'aqeel', name: 'الأستاذ عقيل الزبيدي', subject: 'اللغة العربية - السادس العلمي', img: 'https://i.imgur.com/JM08nuw.jpeg' },
            { id: 'hussein', name: 'الأستاذ حسين عبيده', subject: 'اللغة العربية - السادس العلمي', img: 'https://i.imgur.com/ftflwlv.jpeg' },
            { id: 'hamza', name: 'الاستاذ حمزه الجابري', subject: 'اللغة العربية - السادس العلمي', img: 'https://i.imgur.com/qJPcFAY.jpeg' },
            { id: 'rafal_zubaidi', name: 'الست رفل الزبيدي', subject: 'اللغة العربية - السادس العلمي', img: 'https://i.imgur.com/9R3gdou.jpeg' },
            { id: 'hisham_maamouri', name: 'الاستاذ هشام المعموري', subject: 'اللغة العربية - السادس العلمي', img: 'https://i.imgur.com/Pvm8zbd.jpeg' }
        ],
        islamic: [
            { id: 'khaled_hyali', name: 'الأستاذ خالد الحيالي', subject: 'التربية الإسلامية - السادس العلمي', img: 'https://i.imgur.com/I76Zdb4.jpeg' },
            { id: 'sajid_akili', name: 'الأستاذ ساجد العكيلي', subject: 'التربية الإسلامية - السادس العلمي', img: 'https://i.imgur.com/GqsUdZW.jpeg' }
        ],
        math: [
            { id: 'haidar_abdulaima', name: 'الأستاذ حيدر عبد الائمة', subject: 'الرياضيات - السادس العلمي', img: 'https://i.imgur.com/yxbFxrp.jpeg' },
            { id: 'haidar_waleed', name: 'الأستاذ حيدر وليد', subject: 'الرياضيات - السادس العلمي', img: 'https://i.imgur.com/xZIRMx5.jpeg' },
            { id: 'mohammed_qasim', name: 'الأستاذ محمد قاسم', subject: 'الرياضيات - السادس العلمي', img: 'https://i.imgur.com/acExwFZ.jpeg' }
        ],
        english: [
            { id: 'mohammed_obaidi', name: 'الأستاذ محمد العبيدي', subject: 'اللغة الإنجليزية - السادس العلمي', img: 'https://i.imgur.com/zUCDQyq.jpeg' },
            { id: 'sajjad_obaidi', name: 'الأستاذ سجاد العبيدي', subject: 'اللغة الإنجليزية - السادس العلمي', img: 'https://i.imgur.com/bl68sCC.jpeg' },
            { id: 'azal_salwan', name: 'الست أزل سلوان', subject: 'اللغة الإنجليزية - السادس العلمي', img: 'https://i.imgur.com/RkxAMUv.jpeg' }
        ],
        biology: [
            { id: 'salem_mansour', name: 'الأستاذ سالم ال منصور', subject: 'الأحياء - السادس العلمي', img: 'https://i.imgur.com/ryqitAT.jpeg' },
            { id: 'mustafa_hafiz', name: 'الأستاذ مصطفى حافظ', subject: 'الأحياء - السادس العلمي', img: 'https://i.imgur.com/23ZakX0.jpeg' },
            { id: 'hassan_fallah', name: 'الأستاذ حسن فلاح', subject: 'الأحياء - السادس العلمي', img: 'https://i.imgur.com/jvv7wCd.jpeg' },
            { id: 'jaafar_hasani', name: 'الأستاذ جعفر الحسني', subject: 'الأحياء - السادس العلمي', img: 'https://i.imgur.com/uRHxEFM.jpeg' }
        ],
        chemistry: [
            { id: 'fadel_hashimi', name: 'الأستاذ فاضل الهاشمي', subject: 'الكيمياء - السادس العلمي', img: 'https://i.imgur.com/hFKC4G6.jpeg' },
            { id: 'hussein_hashimi', name: 'الأستاذ حسين الهاشمي', subject: 'الكيمياء - السادس العلمي', img: 'https://i.imgur.com/oS6ujqX.jpeg' },
            { id: 'haidar_abbas', name: 'الأستاذ حيدر عباس', subject: 'الكيمياء - السادس العلمي', img: 'https://i.imgur.com/umkMkls.jpeg' },
            { id: 'hashem_gharbawi', name: 'الأستاذ هاشم الغرباوي', subject: 'الكيمياء - السادس العلمي', img: 'https://i.imgur.com/y47x9Gy.jpeg' },
            { id: 'muhannad_sudani', name: 'الأستاذ مهند السوداني', subject: 'الكيمياء - السادس العلمي', img: 'https://i.imgur.com/Y8yNcaf.jpeg' }
        ],
        physics: [
            { id: 'hussein_mohammed', name: 'الأستاذ حسين محمد', subject: 'الفيزياء - السادس العلمي', img: 'https://i.imgur.com/tgoLB13.jpeg' },
            { id: 'moayad_saleem', name: 'الأستاذ مؤيد سليم', subject: 'الفيزياء - السادس العلمي', img: 'https://i.imgur.com/6h9mMeF.jpeg' }
        ]
    };

    const categoriesList = ['arabic', 'islamic', 'math', 'english', 'biology', 'chemistry', 'physics'];

    // --- مزامنة أصوات الأساتذة بكفاءة عالية (مستمع واحد لمجموعة teachers) ---
    function initFirebaseTeacherListeners() {
        // تهيئة البيانات الافتراضية محلياً أولاً
        categoriesList.forEach(cat => {
            if (teachersData[cat]) {
                teachersData[cat].forEach(t => {
                    t.votes = 0;
                    t.userVote = localStorage.getItem('voted_' + t.id) === 'true';
                });
            }
        });

        // جلب جميع الأصوات دفعة واحدة ومزامنتها لحظياً
        onSnapshot(collection(db, "teachers"), (snapshot) => {
            const votesMap = {};
            snapshot.forEach(docSnap => {
                votesMap[docSnap.id] = docSnap.data().votes || 0;
            });

            categoriesList.forEach(cat => {
                if (!teachersData[cat]) return;
                teachersData[cat].forEach(teacher => {
                    teacher.votes = votesMap[teacher.id] !== undefined ? votesMap[teacher.id] : 0;
                });
                renderCategoryTeachers(cat);
            });
        }, (error) => {
            console.error("خطأ في مزامنة أصوات المدرسين:", error);
        });
    }

    function renderCategoryTeachers(categoryKey) {
        const container = document.getElementById(categoryKey + 'TeachersList') || document.querySelector('#teacher-' + categoryKey + ' .books-list-container');
        if (!container || !teachersData[categoryKey]) return;

        teachersData[categoryKey].sort((a, b) => b.votes - a.votes);
        container.innerHTML = '';

        teachersData[categoryKey].forEach((teacher, index) => {
            let rankText = `المرتبة #${index + 1}`;
            let rankClass = 'rank-third';

            if (index === 0) {
                rankText = `👑 الأول على المادة`;
                rankClass = 'rank-first';
            } else if (index === 1) {
                rankText = `⭐ المرتبة #2`;
                rankClass = 'rank-second';
            } else if (index === 2) {
                rankText = `🥉 المرتبة #3`;
                rankClass = 'rank-third';
            }

            const card = document.createElement('div');
            card.className = 'teacher-card-item book-card-item';
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
                        <button class="vote-btn like-btn ${teacher.userVote ? 'active' : ''}" id="vote-btn-${teacher.id}" onclick="voteTeacher('${teacher.id}')" style="${teacher.userVote ? 'background: #059669;' : ''}">
                            👍 <span id="vote-text-${teacher.id}">${teacher.userVote ? 'تم التصويت ✓ (إلغاء)' : 'تصويت'}</span> <span class="vote-count" id="votes-count-${teacher.id}">(${teacher.votes})</span>
                        </button>
                    </div>
                </div>
                <div class="teacher-avatar-side">
                    <img src="${teacher.img}" alt="${teacher.name}" class="teacher-avatar-img">
                </div>
            `;
            container.appendChild(card);
        });
    }

    window.voteTeacher = async function(teacherId) {
        let targetTeacher = null;
        for (let cat of categoriesList) {
            const found = teachersData[cat].find(t => t.id === teacherId);
            if (found) {
                targetTeacher = found;
                break;
            }
        }
        if (!targetTeacher) return;

        const hasVoted = localStorage.getItem('voted_' + teacherId) === 'true';
        const teacherRef = doc(db, "teachers", teacherId);

        try {
            if (hasVoted) {
                await setDoc(teacherRef, { votes: increment(-1) }, { merge: true });
                localStorage.removeItem('voted_' + teacherId);
                targetTeacher.userVote = false;
            } else {
                await setDoc(teacherRef, { votes: increment(1) }, { merge: true });
                localStorage.setItem('voted_' + teacherId, 'true');
                targetTeacher.userVote = true;
            }
        } catch (error) {
            console.error("خطأ في تحديث التصويت:", error);
            alert("فشل تحديث الصوت، تحقق من الاتصال بالإنترنت.");
        }
    };

    // --- نظام البحث الشامل (مع تصحيح خطأ flexDirection) ---
    const searchIndex = [
        { title: "الأستاذ عقيل الزبيدي", category: "اللغة العربية", image: "https://i.imgur.com/JM08nuw.jpeg", page: "teacher-arabic" },
        { title: "الأستاذ حسين عبيده", category: "اللغة العربية", image: "https://i.imgur.com/ftflwlv.jpeg", page: "teacher-arabic" },
        { title: "الاستاذ حمزه الجابري", category: "اللغة العربية", image: "https://i.imgur.com/qJPcFAY.jpeg", page: "teacher-arabic" },
        { title: "الست رفل الزبيدي", category: "اللغة العربية", image: "https://i.imgur.com/9R3gdou.jpeg", page: "teacher-arabic" },
        { title: "الاستاذ هشام المعموري", category: "اللغة العربية", image: "https://i.imgur.com/Pvm8zbd.jpeg", page: "teacher-arabic" },
        { title: "الأستاذ خالد الحيالي", category: "التربية الإسلامية", image: "https://i.imgur.com/I76Zdb4.jpeg", page: "teacher-islamic" },
        { title: "الأستاذ ساجد العكيلي", category: "التربية الإسلامية", image: "https://i.imgur.com/GqsUdZW.jpeg", page: "teacher-islamic" },
        { title: "الأستاذ حيدر عبد الائمة", category: "الرياضيات", image: "https://i.imgur.com/yxbFxrp.jpeg", page: "teacher-math" },
        { title: "الأستاذ حيدر وليد", category: "الرياضيات", image: "https://i.imgur.com/xZIRMx5.jpeg", page: "teacher-math" },
        { title: "الأستاذ محمد قاسم", category: "الرياضيات", image: "https://i.imgur.com/acExwFZ.jpeg", page: "teacher-math" },
        { title: "الأستاذ محمد العبيدي", category: "اللغة الإنجليزية", image: "https://i.imgur.com/zUCDQyq.jpeg", page: "teacher-english" },
        { title: "الأستاذ سجاد العبيدي", category: "اللغة الإنجليزية", image: "https://i.imgur.com/bl68sCC.jpeg", page: "teacher-english" },
        { title: "الست أزل سلوان", category: "اللغة الإنجليزية", image: "https://i.imgur.com/RkxAMUv.jpeg", page: "teacher-english" },
        { title: "الأستاذ سالم ال منصور", category: "الأحياء", image: "https://i.imgur.com/ryqitAT.jpeg", page: "teacher-biology" },
        { title: "الأستاذ مصطفى حافظ", category: "الأحياء", image: "https://i.imgur.com/23ZakX0.jpeg", page: "teacher-biology" },
        { title: "الأستاذ حسن فلاح", category: "الأحياء", image: "https://i.imgur.com/jvv7wCd.jpeg", page: "teacher-biology" },
        { title: "الأستاذ جعفر الحسني", category: "الأحياء", image: "https://i.imgur.com/uRHxEFM.jpeg", page: "teacher-biology" },
        { title: "الأستاذ فاضل الهاشمي", category: "الكيمياء", image: "https://i.imgur.com/hFKC4G6.jpeg", page: "teacher-chemistry" },
        { title: "الأستاذ حسين الهاشمي", category: "الكيمياء", image: "https://i.imgur.com/oS6ujqX.jpeg", page: "teacher-chemistry" },
        { title: "الأستاذ حيدر عباس", category: "الكيمياء", image: "https://i.imgur.com/umkMkls.jpeg", page: "teacher-chemistry" },
        { title: "الأستاذ هاشم الغرباوي", category: "الكيمياء", image: "https://i.imgur.com/y47x9Gy.jpeg", page: "teacher-chemistry" },
        { title: "الأستاذ مهند السوداني", category: "الكيمياء", image: "https://i.imgur.com/Y8yNcaf.jpeg", page: "teacher-chemistry" },
        { title: "الأستاذ حسين محمد", category: "الفيزياء", image: "https://i.imgur.com/tgoLB13.jpeg", page: "teacher-physics" },
        { title: "الأستاذ مؤيد سليم", category: "الفيزياء", image: "https://i.imgur.com/6h9mMeF.jpeg", page: "teacher-physics" },
        { title: "كتاب الرياضيات السادس العلمي 2026", category: "الكتب المنهجية", image: "https://i.imgur.com/IcszMVF.jpeg", page: "books.html" },
        { title: "كتاب الفيزياء السادس العلمي", category: "الكتب المنهجية", image: "https://i.imgur.com/7Tw9QFc.jpeg", page: "books.html" },
        { title: "ملزمة الرياضيات الاستاذ حيدر وليد", category: "الملازم", image: "https://i.imgur.com/IcszMVF.jpeg", page: "malazm.html" },
        { title: "دورة الرياضيات المركزة للسادس العلمي", category: "الدورات الإلكترونية", image: "https://i.imgur.com/IcszMVF.jpeg", page: "videos.html" }
    ];

    window.openSearchModal = function() {
        const modal = document.getElementById('searchModal');
        if(modal) modal.style.display = 'flex';
        const input = document.getElementById('searchInput');
        if(input) input.focus();
    };

    window.closeSearchModal = function() {
        const modal = document.getElementById('searchModal');
        if(modal) modal.style.display = 'none';
    };

    window.handleSearchInput = function(e) {
        const query = e.target.value.trim().toLowerCase();
        const container = document.getElementById('searchResultsContainer');
        if (!container) return;

        if (!query) {
            container.innerHTML = '<div class="search-no-results">اكتب اسم الكتاب، الملزمة، المدرس أو النسخة الوزارية للبحث عنها...</div>';
            return;
        }

        const queryWords = query.split(/\s+/);
        const scoredResults = searchIndex.map(item => {
            let score = 0;
            const fullText = (item.title + " " + item.category).toLowerCase();
            if (fullText.includes(query)) score += 15;
            queryWords.forEach(word => {
                if (word.length > 1 && fullText.includes(word)) score += 5;
            });
            return { item, score };
        }).filter(res => res.score > 0);

        scoredResults.sort((a, b) => b.score - a.score);
        const results = scoredResults.map(res => res.item);

        if (results.length === 0) {
            container.innerHTML = '<div class="search-no-results">لا توجد نتائج مطابقة لبحثك</div>';
            return;
        }

        // تم تصحيح flexDirection إلى flex-direction
        container.innerHTML = results.map(r => `
            <div class="search-result-item" onclick="${r.page.endsWith('.html') ? `window.location.href='${r.page}'` : `showPage('${r.page}'); closeSearchModal();`}">
                <div class="search-result-content-wrap" style="display: flex; align-items: center; gap: 12px;">
                    <img src="${r.image}" class="search-result-thumb" alt="${r.title}" style="width: 45px; height: 45px; border-radius: 8px; object-fit: cover;">
                    <div class="search-result-info" style="display: flex; flex-direction: column;">
                        <span class="search-result-title" style="font-weight: 700;">${r.title}</span>
                        <span class="search-result-category" style="font-size: 0.75rem; color: #64748b;">${r.category}</span>
                    </div>
                </div>
                <span>➔</span>
            </div>
        `).join('');
    };

    // --- التنقل بين الصفحات ---
    let pageHistory = ['home'];
    
    window.showPage = function(id, parentId=null) {
        document.querySelectorAll('.page-view').forEach(v => v.classList.remove('active'));
        const targetPage = document.getElementById(id);
        if(targetPage) {
            targetPage.classList.add('active');
            if(pageHistory[pageHistory.length - 1] !== id) {
                pageHistory.push(id);
            }
        }
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    window.switchPage = function(id, element) {
        pageHistory = ['home', id];
        window.showPage(id);
        document.querySelectorAll('.side-nav-item').forEach(item => item.classList.remove('active'));
        if(element) element.classList.add('active');
    };

    window.goBack = function() {
        if(pageHistory.length > 1) {
            pageHistory.pop();
            let previousPage = pageHistory[pageHistory.length - 1];
            document.querySelectorAll('.page-view').forEach(v => v.classList.remove('active'));
            document.getElementById(previousPage)?.classList.add('active');
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    };

    window.toggleMenu = function() {
        const overlay = document.getElementById('navOverlay');
        const floatingContainer = document.getElementById('floatingContainer');
        const aiChatWindow = document.getElementById('aiChatWindow');
        
        if(overlay) overlay.classList.toggle('active');
        if(overlay && overlay.classList.contains('active')) {
            if(floatingContainer) floatingContainer.classList.add('hidden-floating');
            if(aiChatWindow) aiChatWindow.classList.remove('active');
        } else {
            if(floatingContainer) floatingContainer.classList.remove('hidden-floating');
        }
    };

    window.closeMenu = function(e) {
        if(e.target.id === 'navOverlay') {
            window.toggleMenu();
        }
    };

    window.hideBadge = function() {
        const badge = document.getElementById('notifBadge');
        if(badge) badge.style.display = 'none';
    };

    window.toggleFloatingMenu = function() {
        const popup = document.getElementById('floatingMenuPopup');
        if(popup) popup.classList.toggle('active');
    };

    window.addEventListener('click', function(e) {
        const wrapper = document.querySelector('.floating-msg-wrapper');
        if(wrapper && !wrapper.contains(e.target)) {
            const popup = document.getElementById('floatingMenuPopup');
            if(popup) popup.classList.remove('active');
        }
        const searchModal = document.getElementById('searchModal');
        if(e.target === searchModal) {
            closeSearchModal();
        }
    });

    window.toggleAIChat = function() {
        const chatWindow = document.getElementById('aiChatWindow');
        if(chatWindow) chatWindow.classList.toggle('active');
    };

    // --- مساعد الذكاء الاصطناعي الذكي ---
    function getSmartAIResponse(userText) {
        const rawText = userText.trim();
        const text = rawText.toLowerCase();

        if (text.startsWith('تعلم:') || text.startsWith('احفظ:')) {
            let parts = rawText.replace(/^(تعلم:|احفظ:)/, '').split('=');
            if (parts.length === 2) {
                let key = parts[0].trim().toLowerCase();
                let val = parts[1].trim();
                let customBrain = JSON.parse(localStorage.getItem('ai_iraqi_sixth_brain')) || {};
                customBrain[key] = val;
                localStorage.setItem('ai_iraqi_sixth_brain', JSON.stringify(customBrain));
                return `🚀 تم تحديث ذاكرتي وحفظ هذه المعلومة بنجاح يا مصطفى.`;
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

        if (text.includes('مواد') || text.includes('كم مادة')) {
            return `📚 مواد السادس الإعدادي (الفرع العلمي) في العراق تتكون من 7 مواد أساسية:\n1. التربية الإسلامية\n2. اللغة العربية\n3. اللغة الإنجليزية\n4. الرياضيات\n5. الفيزياء\n6. الكيمياء\n7. الأحياء.`;
        }

        if (text.includes('مرحبا') || text.includes('هلا') || text.includes('أهلا')) {
            return `أهلاً بك يا مصطفى! كيف يمكنني مساعدتك في تطوير المنصة أو مراجعة المناهج اليوم؟`;
        }

        return `سؤال رائع يا مصطفى! إذا أردت تعليمي إجابة مخصصة لهذا السؤال، اكتب لي:\nتعلم: ${rawText} = [الجواب المناسب]`;
    }

    window.sendAIMessage = function() {
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
    };

    window.handleAIPress = function(e) {
        if(e.key === 'Enter') window.sendAIMessage();
    };

    // تشغيل التهيئة عند اكتمال تحميل الـ DOM
    document.addEventListener('DOMContentLoaded', () => {
        initSlider();
        initFirebaseTeacherListeners();
    });

})();
