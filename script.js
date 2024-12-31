document.addEventListener('DOMContentLoaded', () => {
    // Khởi tạo các biến toàn cục cần thiết
    const elements = {
        textareaElement: document.querySelector('.vig-comment-textarea'),
        themeToggleBtn: document.querySelector('.vig-comment-theme-toggle'),
        moreButtons: document.querySelectorAll('.vig-comment-more'),
        emojiButton: document.querySelector('.vig-comment-emoji-wrapper .vig-comment-tool-btn'),
        emojiWrapper: document.querySelector('.vig-comment-emoji-wrapper'),
        emojiPicker: document.querySelector('emoji-picker'),
        voteButtons: document.querySelectorAll('.vig-comment-vote-btn'),
        reactionButtons: document.querySelectorAll('.vig-comment-reaction-btn')
    };

    // Xử lý Theme
    const themeHandler = {
        setTheme(theme) {
            document.documentElement.classList.toggle('vig-comment-dark', theme === 'dark');
            localStorage.setItem('vig-comment-theme', theme);
        },

        initTheme() {
            const savedTheme = localStorage.getItem('vig-comment-theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            if (savedTheme) {
                this.setTheme(savedTheme);
            } else if (prefersDark) {
                this.setTheme('dark');
            }

            // Lắng nghe thay đổi theme hệ thống
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                if (!localStorage.getItem('vig-comment-theme')) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });

            // Xử lý click nút toggle theme
            elements.themeToggleBtn.addEventListener('click', () => {
                const isDark = document.documentElement.classList.contains('vig-comment-dark');
                this.setTheme(isDark ? 'light' : 'dark');
            });
        }
    };

    // Xử lý Textarea
    const textareaHandler = {
        init() {
            elements.textareaElement.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = this.scrollHeight + 'px';
            });
        }
    };

    // Xử lý More Menu
    const moreMenuHandler = {
        init() {
            // Xử lý click nút more
            elements.moreButtons.forEach(button => {
                button.addEventListener('click', (e) => this.toggleMenu(e, button));
            });

            // Đóng menu khi click ra ngoài
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.vig-comment-more')) {
                    this.closeAllMenus();
                }
            });

            // Xử lý các action trong menu
            document.querySelectorAll('.vig-comment-more-item').forEach(item => {
                item.addEventListener('click', (e) => this.handleMenuAction(e, item));
            });
        },

        toggleMenu(e, button) {
            e.stopPropagation();
            this.closeAllMenus();
            button.classList.toggle('active');
        },

        closeAllMenus() {
            elements.moreButtons.forEach(btn => btn.classList.remove('active'));
        },

        handleMenuAction(e, item) {
            e.stopPropagation();
            const action = item.classList.contains('edit') ? 'edit' : 
                          item.classList.contains('delete') ? 'delete' : 'report';
            const comment = item.closest('.vig-comment-item');
            
            switch(action) {
                case 'edit':
                    console.log('Edit comment:', comment);
                    break;
                case 'delete':
                    console.log('Delete comment:', comment);
                    break;
                case 'report':
                    console.log('Report comment:', comment);
                    break;
            }
            
            item.closest('.vig-comment-more').classList.remove('active');
        }
    };

    // Xử lý Emoji Picker
    const emojiHandler = {
        init() {
            elements.emojiButton.addEventListener('click', (e) => this.toggleEmojiPicker(e));
            
            document.addEventListener('click', (e) => {
                if (!elements.emojiWrapper.contains(e.target)) {
                    this.closeEmojiPicker();
                }
            });

            elements.emojiPicker.addEventListener('emoji-click', event => this.handleEmojiSelect(event));
        },

        toggleEmojiPicker(e) {
            e.stopPropagation();
            elements.emojiWrapper.classList.toggle('active');
        },

        closeEmojiPicker() {
            elements.emojiWrapper.classList.remove('active');
        },

        handleEmojiSelect(event) {
            const emoji = event.detail.unicode;
            const start = elements.textareaElement.selectionStart;
            const end = elements.textareaElement.selectionEnd;
            const text = elements.textareaElement.value;
            
            elements.textareaElement.value = text.slice(0, start) + emoji + text.slice(end);
            elements.textareaElement.focus();
            elements.textareaElement.selectionStart = elements.textareaElement.selectionEnd = start + emoji.length;
            
            elements.textareaElement.dispatchEvent(new Event('input'));
        }
    };

    // Thêm Vote Handler
    const voteHandler = {
        init() {
            elements.voteButtons.forEach(button => {
                button.addEventListener('click', () => this.handleVote(button));
            });
        },

        handleVote(button) {
            const voteContainer = button.parentElement;
            const countElement = voteContainer.querySelector('.vig-comment-vote-count');
            let count = parseInt(countElement.textContent);
            
            if (button.classList.contains('up-vote')) {
                this.handleUpVote(button, countElement, count);
            } else {
                this.handleDownVote(button, countElement, count);
            }
        },

        handleUpVote(button, countElement, count) {
            if (button.classList.contains('voted')) {
                count--;
                button.classList.remove('voted');
            } else {
                count++;
                button.classList.add('voted');
                // Xóa voted của down vote nếu có
                const downVoteBtn = button.parentElement.querySelector('.down-vote');
                if (downVoteBtn.classList.contains('voted')) {
                    count++;
                    downVoteBtn.classList.remove('voted');
                }
            }
            countElement.textContent = count;
        },

        handleDownVote(button, countElement, count) {
            if (button.classList.contains('voted')) {
                count++;
                button.classList.remove('voted');
            } else {
                count--;
                button.classList.add('voted');
                // Xóa voted của up vote nếu có
                const upVoteBtn = button.parentElement.querySelector('.up-vote');
                if (upVoteBtn.classList.contains('voted')) {
                    count--;
                    upVoteBtn.classList.remove('voted');
                }
            }
            countElement.textContent = count;
        }
    };

    // Thêm Reaction Handler
    const reactionHandler = {
        init() {
            elements.reactionButtons.forEach(button => {
                const wrapper = button.closest('.vig-comment-reaction-wrapper');
                const picker = wrapper.querySelector('.vig-comment-reaction-picker');
                const reactionsContainer = wrapper.closest('.vig-comment-actions').querySelector('.vig-comment-reactions');

                button.addEventListener('click', (e) => this.toggleReactionPicker(e, wrapper));
                
                const emojiPicker = picker.querySelector('emoji-picker');
                emojiPicker.addEventListener('emoji-click', event => 
                    this.handleReactionSelect(event, reactionsContainer, wrapper));
            });

            document.addEventListener('click', (e) => {
                if (!e.target.closest('.vig-comment-reaction-wrapper')) {
                    this.closeAllPickers();
                }
            });
        },

        toggleReactionPicker(e, wrapper) {
            e.stopPropagation();
            this.closeAllPickers();
            wrapper.classList.toggle('active');
        },

        closeAllPickers() {
            document.querySelectorAll('.vig-comment-reaction-wrapper').forEach(w => 
                w.classList.remove('active'));
        },

        handleReactionSelect(event, reactionsContainer, wrapper) {
            if (!reactionsContainer) return;
            
            const emoji = event.detail.unicode;
            const existingReaction = this.findExistingReaction(reactionsContainer, emoji);

            if (existingReaction) {
                this.updateReactionCount(existingReaction);
            } else {
                this.addNewReaction(reactionsContainer, emoji);
            }

            wrapper.classList.remove('active');
        },

        findExistingReaction(container, emoji) {
            if (!container || !container.children) return null;
            
            return Array.from(container.children).find(reaction => {
                const emojiElement = reaction.querySelector('.reaction-emoji');
                return emojiElement && emojiElement.textContent === emoji;
            });
        },

        updateReactionCount(reaction) {
            if (!reaction) return;
            
            const countElement = reaction.querySelector('.reaction-count');
            if (!countElement) return;
            
            let count = parseInt(countElement.textContent) || 0;
            
            if (reaction.classList.contains('active')) {
                count--;
                if (count <= 0) {
                    reaction.remove();
                } else {
                    countElement.textContent = count;
                }
                reaction.classList.remove('active');
            } else {
                count++;
                countElement.textContent = count;
                reaction.classList.add('active');
            }
        },

        addNewReaction(container, emoji) {
            if (!container) return;
            
            const reaction = document.createElement('div');
            reaction.className = 'vig-comment-reaction active';
            reaction.innerHTML = `
                <span class="reaction-emoji">${emoji}</span>
                <span class="reaction-count">1</span>
            `;
            
            reaction.addEventListener('click', () => this.updateReactionCount(reaction));
            container.appendChild(reaction);
        }
    };

    // Khởi tạo tất cả các handler
    const initializeApp = () => {
        themeHandler.initTheme();
        textareaHandler.init();
        moreMenuHandler.init();
        emojiHandler.init();
        voteHandler.init();
        reactionHandler.init();
    };

    // Chạy ứng dụng
    initializeApp();
});