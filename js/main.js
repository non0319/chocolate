/*=================================================
  achievements
===================================================*/



/*=================================================
  teachers
===================================================*/

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  const cards = document.querySelectorAll(".teacher-cards .card");
  const cardArea = document.querySelector(".card-area");

  // 画面幅に応じた1枚あたりのスクロール距離
  const cardHeight = window.innerWidth <= 768 ? 300 : 400; // SPは300px, PCは400px

  const pinDistance = cards.length * cardHeight;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: cardArea,
      start: "top top",
      end: "+=" + pinDistance,
      scrub: true,
      pin: ".card-area",
      anticipatePin: 1
    }
  });

  cards.forEach((card, i) => {
    tl.to(card, {
      y: -i * 0, // 重なり分（必要に応じて調整）
      opacity: 1,
      duration: 0.5
    }, i * 0.5); // カードごとにタイミングをずらす
  });
});

/*=================================================
  metaleaf
===================================================*/
$(function () {
    // feature をクリック → モーダルを開く
    $('.feature').on('click', function () {
        const modalId = $(this).data('modal');
        $('#' + modalId).addClass('open');

        // ▼スクロールを止める
        $('body').css('overflow', 'hidden');
    });

    // 閉じるボタン
    $('.modal .close').on('click', function () {
        $(this).closest('.modal').removeClass('open');

        // ▼スクロールを戻す
        $('body').css('overflow', 'auto');
    });

    // モーダル背景をクリック → 閉じる
    $('.modal').on('click', function (e) {
        if ($(e.target).hasClass('modal')) {
            $(this).removeClass('open');

            // ▼スクロールを戻す
            $('body').css('overflow', 'auto');
        }
    });
});