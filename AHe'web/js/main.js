// 初始化AOS动画库
AOS.init({
    duration: 1000,
    once: true
});

// 导航栏响应式处理
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 主题切换
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.innerHTML = isDark ? 
        '<i class="ri-sun-line"></i>' : 
        '<i class="ri-moon-line"></i>';
}

// 检查本地存储的主题设置
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme === 'dark');
} else {
    setTheme(prefersDarkScheme.matches);
}

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    setTheme(!isDark);
});

// 回到顶部按钮
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 简单的留言板功能
const messageForm = document.getElementById('message-form');
const messageList = document.querySelector('.message-list');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const textarea = messageForm.querySelector('textarea');
    const message = textarea.value.trim();
    
    if (message) {
        addMessage(message);
        textarea.value = '';
    }
});

function addMessage(content) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message-item');
    messageElement.innerHTML = `
        <div class="message-content">${content}</div>
        <div class="message-meta">
            <span class="message-time">${new Date().toLocaleString()}</span>
        </div>
    `;
    messageList.prepend(messageElement);
}

// 轮播图功能
class Carousel {
    constructor() {
        this.carousel = document.querySelector('.carousel');
        this.items = this.carousel.querySelectorAll('.carousel-item');
        this.indicators = this.carousel.querySelector('.carousel-indicators');
        this.prevBtn = this.carousel.querySelector('.prev');
        this.nextBtn = this.carousel.querySelector('.next');
        this.currentIndex = 0;
        this.interval = null;
        this.autoPlayDelay = 5000; // 自动播放间隔，5秒

        this.init();
    }

    init() {
        // 创建指示器
        this.items.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('carousel-indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => this.goToSlide(index));
            this.indicators.appendChild(indicator);
        });

        // 添加事件监听
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // 鼠标悬停时暂停自动播放
        this.carousel.addEventListener('mouseenter', () => this.pause());
        this.carousel.addEventListener('mouseleave', () => this.play());

        // 触摸事件支持
        let touchStartX = 0;
        this.carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        this.carousel.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) { // 最小滑动距离
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        });

        // 开始自动播放
        this.play();
    }

    updateSlides() {
        // 更新幻灯片状态
        this.items.forEach((item, index) => {
            item.classList.remove('active');
            this.indicators.children[index].classList.remove('active');
        });
        this.items[this.currentIndex].classList.add('active');
        this.indicators.children[this.currentIndex].classList.add('active');
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.updateSlides();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.updateSlides();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlides();
    }

    play() {
        if (this.interval) return;
        this.interval = setInterval(() => this.next(), this.autoPlayDelay);
    }

    pause() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

// 初始化轮播图
document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
}); 