// 喵御膳 - 公共脚本

document.addEventListener('DOMContentLoaded', function() {
  // 导航栏滚动效果
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    // 添加/移除阴影
    if (currentScroll > 10) {
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });

  // 平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 滚动动画观察器
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // 观察需要动画的元素
  document.querySelectorAll('.feature-card, .value-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // 数字动画
  const animateNumber = (element, target, suffix = '') => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target + suffix;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + suffix;
      }
    }, 30);
  };

  // 统计数字动画
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector('.stat-number');
        if (statNumber && !statNumber.classList.contains('animated')) {
          statNumber.classList.add('animated');
          const text = statNumber.textContent;
          const num = parseInt(text);
          const suffix = text.replace(/[0-9]/g, '');
          if (!isNaN(num)) {
            animateNumber(statNumber, num, suffix);
          }
        }
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
  });
});
