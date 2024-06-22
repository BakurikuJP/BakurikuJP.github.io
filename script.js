document.addEventListener('DOMContentLoaded', () => {
    const mainTitle = document.querySelector('.main-title');
    const subtitle = document.querySelector('.subtitle');
    const cursorLight = document.createElement('div');
    cursorLight.classList.add('cursor-light');
    document.body.appendChild(cursorLight);
  
    // 既存のアニメーション
    mainTitle.style.opacity = '0';
    subtitle.style.opacity = '0';
  
    setTimeout(() => {
      mainTitle.style.transition = 'opacity 1s ease-in-out';
      mainTitle.style.opacity = '1';
    }, 500);
  
    setTimeout(() => {
      subtitle.style.transition = 'opacity 1s ease-in-out';
      subtitle.style.opacity = '1';
    }, 1500);
  
    // 星のアニメーション
    const starsContainer = document.createElement('div');
    starsContainer.classList.add('stars');
    document.body.appendChild(starsContainer);
  
    const stars = [];
    for (let i = 0; i < 100; i++) {
      stars.push(createStar());
    }
  
    // カーソルと星のアニメーション
    let mouseX = 0, mouseY = 0;
    let prevMouseX = 0, prevMouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursorLight.style.left = `${mouseX}px`;
      cursorLight.style.top = `${mouseY}px`;
  
      const deltaX = mouseX - prevMouseX;
      const deltaY = mouseY - prevMouseY;
      const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  
      // カーソルの動きに応じて背景の明るさを変更
      const brightness = Math.min(0.15 + speed * 0.001, 0.3);
      cursorLight.style.background = `radial-gradient(circle, rgba(255,255,255,${brightness}) 0%, rgba(255,255,255,0) 70%)`;
  
      stars.forEach(star => {
        const rect = star.getBoundingClientRect();
        const starX = rect.left + rect.width / 2;
        const starY = rect.top + rect.height / 2;
        
        const distX = mouseX - starX;
        const distY = mouseY - starY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        if (distance < 150) {
          const moveX = (deltaX / 5) * (1 - distance / 150);
          const moveY = (deltaY / 5) * (1 - distance / 150);
          star.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
          star.style.transform = 'translate(0, 0)';
        }
      });
  
      prevMouseX = mouseX;
      prevMouseY = mouseY;
    });
  });
  
  function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.width = `${Math.random() * 2 + 1}px`;
    star.style.height = star.style.width;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    star.style.animation = `twinkle ${Math.random() * 3 + 2}s linear infinite`;
    document.querySelector('.stars').appendChild(star);
    return star;
  }

  document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');

    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;

            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('visible');
            } else {
                element.classList.remove('visible');
            }
        });
    }

    window.addEventListener('scroll', checkFade);
    window.addEventListener('resize', checkFade);
    checkFade(); // 初期チェック
});
