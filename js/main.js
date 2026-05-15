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

  // 移动端侧边栏菜单
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const sidebarOverlay = document.querySelector('.sidebar-overlay');
  const sidebarClose = document.querySelector('.sidebar-close');
  const sidebarLinks = document.querySelectorAll('.sidebar-nav a');

  function openSidebar() {
    if (sidebar) {
      sidebar.classList.add('active');
      if (sidebarOverlay) sidebarOverlay.classList.add('active');
      if (menuToggle) menuToggle.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeSidebar() {
    if (sidebar) {
      sidebar.classList.remove('active');
      if (sidebarOverlay) sidebarOverlay.classList.remove('active');
      if (menuToggle) menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', openSidebar);
  }

  if (sidebarClose) {
    sidebarClose.addEventListener('click', closeSidebar);
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
  }

  // 点击侧边栏链接后关闭菜单
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function() {
      closeSidebar();
    });
  });

  // ESC键关闭侧边栏
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeSidebar();
    }
  });
});
