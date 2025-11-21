

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


/*=================================================
カード
===================================================*/
document.addEventListener('DOMContentLoaded', () => {
  // ================================================
  // I. 要素取得
  // ================================================
  const section = document.getElementById('strengths');
  const container = document.querySelector('.card-stack-container');
  const cards = document.querySelectorAll('.info-card');
  const detailSection = document.getElementById('card-detail-section');

  const SCROLL_OFFSET = 500;


  // ================================================
  // II. スクロール時アニメーション（IntersectionObserver）
  // ================================================
  if (section && container) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            container.classList.add('is-active');

            // 一度発火したら解除
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
  }


  // ================================================
  // III. カード詳細表示（クリック開閉 & スクロール調整）
  // ================================================
  const details = {
    1: { title: "週1回の1on1授業", body: "個別指導により、あなたのスキルレベルや目標に合わせた最適な学習計画と実践的なフィードバックを提供します。" },
    2: { title: "案件獲得までを徹底サポート", body: "ポートフォリオ作成から営業資料の添削、クライアントとの商談シミュレーションまで、案件獲得に必要なすべてをサポートします。" },
    3: { title: "営業代行サポート", body: "受講生がスキルアップに集中できるよう、案件獲得のための営業活動を一部代行し、実際の業務経験を積む機会を提供します。" },
    4: { title: "コミュニティで仲間と繋がる", body: "モチベーション維持や情報交換のためのオンラインコミュニティがあり、卒業後も続く仲間との繋がりを持つことができます。" }
  };


  // -----------------------------------
  // ★ カードクリックイベント
  // -----------------------------------
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.cardId;
      const data = details[id];
      if (!data || !detailSection) return;

      // -----------------------------------
      // A. クリック直後の transform 衝突を防ぐ
      // -----------------------------------
      card.style.transition = "none";
      setTimeout(() => {
        card.style.transition = "";
      }, 50);


      // -----------------------------------
      // B. 同じカードをクリック → 閉じる
      // -----------------------------------
      if (detailSection.dataset.openId === id) {
        detailSection.classList.remove('is-open');
        detailSection.removeAttribute('data-open-id');
        return;
      }

      // -----------------------------------
      // C. 内容をセットして開く
      // -----------------------------------
      detailSection.innerHTML = `
                <div class="detail-content">
                    <h3>${data.title}</h3>
                    <p>${data.body}</p>
                </div>
            `;

      detailSection.classList.add('is-open');
      detailSection.dataset.openId = id;


      // -----------------------------------
      // D. スクロールをオフセットつきで調整
      // -----------------------------------
      const targetPosition =
        detailSection.getBoundingClientRect().top + window.scrollY;

      const finalScrollPosition = targetPosition - SCROLL_OFFSET;

      window.scrollTo({
        top: finalScrollPosition,
        behavior: 'smooth'
      });
    });
  });
});


/*=================================================
スクロール時の画像フェード表示
===================================================*/
// スクロール時のイベント
$(window).scroll(function () {
  // fadeinクラスに対して順に処理を行う
  $(".fadein").each(function () {
    // スクロールした距離
    let scroll = $(window).scrollTop();
    // fadeinクラスの要素までの距離
    let target = $(this).offset().top;
    // 画面の高さ
    let windowHeight = $(window).height();
    // fadeinクラスの要素が画面下にきてから200px通過した
    // したタイミングで要素を表示
    if (scroll > target - windowHeight + 200) {
      $(this).css("opacity", "1");
      $(this).css("transform", "translateY(0)");
    }
  });
});


/*=================================================
ハンバーガ―メニュー & スムーススクロール
===================================================*/
$(document).ready(function () {

  const header = $("header");

  // ハンバーガー開閉
  $(".hamburger").on("click", function (e) {
    e.stopPropagation();
    header.toggleClass("open");
  });

  // メニューリンククリック
  $(".flip-nav a").on("click", function (e) {
    const isSP = $(window).width() <= 768; // SP判定

    if (isSP) {
      // SP版はリンク本来の動作のみ
      header.removeClass("open"); // メニュー閉じる
      return true;
    }

    // PC版のみスムーススクロール
    e.preventDefault();
    const target = $(this).attr("href");
    $("html, body").stop().animate({
      scrollTop: $(target).offset().top - 100 // header高さ分オフセット
    }, 600);

    header.removeClass("open");
  });

  // メニュー以外クリックで閉じる
  $(document).on("click", function (e) {
    if (!$(e.target).closest("header").length) {
      header.removeClass("open");
    }
  });

  // 汎用スムーススクロール（PC版のみ）
  $('a[href^="#"]').on("click", function (e) {
    const isSP = $(window).width() <= 768; // SP判定

    if (isSP) {
      // SP版は何もしない（デフォルトのジャンプ動作）
      return true;
    }

    // PC版のみスムーススクロール
    e.preventDefault();
    const target = $(this).attr("href");
    $("html, body").stop().animate({
      scrollTop: $(target).offset().top - 100
    }, 600);
  });

});

