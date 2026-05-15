// 产品介绍页交互脚本

document.addEventListener('DOMContentLoaded', function() {
  // 营养信息标签切换
  initNutritionTabs();

  // 产品卡片入场动画
  initProductAnimations();

  // 营养成分条动画
  initNutritionBarAnimations();
});

/**
 * 初始化营养信息标签切换
 */
function initNutritionTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetTab = this.dataset.tab;

      // 移除所有活动状态
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      // 添加当前活动状态
      this.classList.add('active');
      const targetPanel = document.getElementById(targetTab);
      if (targetPanel) {
        targetPanel.classList.add('active');
        // 重新触发营养条动画
        animateNutritionBars(targetPanel);
      }
    });
  });
}

/**
 * 初始化产品卡片入场动画
 */
function initProductAnimations() {
  const productCards = document.querySelectorAll('.product-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  productCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

/**
 * 初始化营养成分条动画
 */
function initNutritionBarAnimations() {
  const nutritionSection = document.querySelector('.nutrition-section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activePanel = entry.target.querySelector('.tab-panel.active');
        if (activePanel) {
          animateNutritionBars(activePanel);
        }
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });

  if (nutritionSection) {
    observer.observe(nutritionSection);
  }
}

/**
 * 动画显示营养成分条
 */
function animateNutritionBars(panel) {
  const bars = panel.querySelectorAll('.bar-fill');

  bars.forEach((bar, index) => {
    const targetWidth = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = targetWidth;
    }, index * 100 + 100);
  });
}

/**
 * 食材圆圈悬浮效果
 */
const ingredientCircles = document.querySelectorAll('.ingredient-circle');

ingredientCircles.forEach(circle => {
  circle.addEventListener('mouseenter', function() {
    this.style.zIndex = '10';
  });

  circle.addEventListener('mouseleave', function() {
    // 恢复原始 z-index
    if (this.classList.contains('main')) {
      this.style.zIndex = '4';
    } else if (this.classList.contains('sub-1')) {
      this.style.zIndex = '3';
    } else if (this.classList.contains('sub-2')) {
      this.style.zIndex = '2';
    } else if (this.classList.contains('sub-3')) {
      this.style.zIndex = '1';
    }
  });
});
