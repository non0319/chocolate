$(function () {
  /*=================================================
    achievements
  ===================================================*/
  const $book = $('#book');

  // ========== Turn.js 初期化 ==========
  $book.turn({
    display: 'single',        // 📖 常に1ページ（右ページ）表示
    autoCenter: true,         // 自動中央寄せ
    acceleration: true,       // アニメーションをなめらかに
    gradients: true,          // ページの影を有効化
    duration: 1000,           // ページめくり時間（ミリ秒）
    elevation: 50,            // めくり高さ（影の深さ）
    swipe: true,              // 📱 スワイプ対応（モバイル）
    when: {
      turning: function(event, page, view) {
        // ページがめくれる直前の処理（必要があれば）
      },
      turned: function(event, page, view) {
        // ページがめくれた後の処理（必要があれば）
      }
    }
  });

  // ========== 外部リンククリック対応 ==========
  // Turn.jsの「ページめくり」とリンククリックが競合しないようにする
  $book.on('click', 'a', function(e) {
    e.stopPropagation(); // ページめくりイベントを止める
  });

  // ========== スワイプ操作 ==========
  // Turn.js の swipe:true はタッチ操作に対応していますが、
  // 念のため補助的にjQueryでのスワイプ処理も追加可能です。
  let touchStartX = 0;
  let touchEndX = 0;

  $book.on('touchstart', function(e) {
    touchStartX = e.originalEvent.touches[0].clientX;
  });

  $book.on('touchend', function(e) {
    touchEndX = e.originalEvent.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const threshold = 50; // スワイプ判定距離(px)
    if (touchStartX - touchEndX > threshold) {
      // 左へスワイプ → 次のページ
      $book.turn('next');
    } else if (touchEndX - touchStartX > threshold) {
      // 右へスワイプ → 前のページ
      $book.turn('previous');
    }
  }

  // ========== ページ中央寄せのためのリサイズ対応 ==========
  $(window).on('resize', function() {
    $book.turn('size', $book.width(), $book.height());
  });



  /*=================================================
    metaleaf
  ===================================================*/

  // PC判定
const isPC = window.matchMedia('(hover: hover)').matches;

// PCはホバーで開く
if (isPC) {
  $('.feature').hover(function () {
    const target = $(this).data('modal');
    $('#' + target).addClass('open');
  }, function () {
    const target = $(this).data('modal');
    $('#' + target).removeClass('open');
  });
} else {
  // SPはクリックで開く
  $('.feature').on('click', function () {
    const target = $(this).data('modal');
    $('#' + target).addClass('open');
  });
}
});


/*=================================================
    teachers
  ===================================================*/
gsap.registerPlugin(ScrollTrigger);

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