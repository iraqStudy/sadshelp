(function() {
    if (window._siteAppInitialized) return;
    window._siteAppInitialized = true;

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

    window.currentSlide = function(index) {
        currentSlideIndex = index;
        updateSlider();
    };

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

    window.voteTeacher = function(teacherId) {
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
    };

    // تم تعديل الدالة لاستقبال عنصر الزر مباشرة (this) لتفادي مشاكل النطاق
    window.filterItems = function(sectionType, subjectName, btnElement) {
        let containerId = '';
        if(sectionType === 'books') containerId = 'booksListContainer';
        else if(sectionType === 'mlazem') containerId = 'mlazemListContainer';
        else if(sectionType === 'copies') containerId = 'copiesListContainer';
        else if(sectionType === 'courses') containerId = 'coursesListContainer';

        const container = document.getElementById(containerId);
        if(!container) return;

        if(btnElement) {
            const parentBar = btnElement.parentElement;
            parentBar.querySelectorAll('.filter-chip').forEach(chip => chip.classList.remove('active'));
            btnElement.classList.add('active');
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
    };

    document.addEventListener('DOMContentLoaded', () => {
        if (!localStorage.getItem('site_initialized_v5')) {
            localStorage.removeItem('teacherVotes');
            localStorage.setItem('site_initialized_v5', 'true');
        }
        renderArabicTeachers();
    });

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
    });

    window.toggleAIChat = function() {
        const chatWin = document.getElementById('aiChatWindow');
        if(chatWin) chatWin.classList.toggle('active');
    };

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

        if (text.includes('مواد') || text.includes('كم مادة')) {
            return `📚 مواد السادس الإعدادي (الفرع العلمي) في العراق تتكون من 7 مواد أساسية (+ اللغة الفرنسية كمادة اختيارية).`;
        }

        if (text.includes('مرحبا') || text.includes('هلا')) {
            return `أهلاً بك يا مصطفى! أنا خبيرك الذكي في منهج السادس الإعدادي في العراق، كيف أستطيع خدمتك اليوم؟`;
        }

        return `سؤال ذكي يا مصطفى! إذا أردت تعليمي إجابة مخصصة، اكتب:\nتعلم: ${rawText} = [الجواب المناسب]`;
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

})();
