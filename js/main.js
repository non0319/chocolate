
/*=================================================
  achievements
===================================================*/

const cards = document.querySelectorAll(".card");

function setupCards() {
  const isMobile = window.innerWidth <= 768;

  // 既存のScrollTriggerを全て削除して再設定（リサイズ時用）
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());

  cards.forEach((card, i) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: ".card-area",
        start: () => isMobile 
          ? `top+=${i * 250} center`  // SPは出現タイミングを短く
          : `top+=${i * 350} center`, // PCは出現タイミングを長め
        end: "bottom center",
        scrub: true,
      },
      y: isMobile ? -i * 50 : -i * 80, // SP/PCで上方向の重なり量を調整
      opacity: 1,
      zIndex: cards.length - i,
      duration: 1,
    });
  });
}

// 初期設定
setupCards();

// ウィンドウリサイズ時に再設定
window.addEventListener("resize", () => {
  setupCards();
});

