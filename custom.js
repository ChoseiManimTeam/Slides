function adjustSlideOverflow() {
    console.log('Adjusting slide overflow for visible slides...');

    // Reveal.js から現在のスライドを取得
    const currentSlide = Reveal.getCurrentSlide();

    if (!currentSlide) {
        console.warn('No current slide found.');
        return;
    }

    // 縦スライドの場合、内側のスライドを取得して処理
    if (currentSlide.classList.contains('stack')) {
        const nestedSlides = currentSlide.querySelectorAll('section');

        nestedSlides.forEach(slide => {
            if (slide.offsetParent !== null) {
                adjustSingleSlide(slide); // 表示されているスライドのみ処理
            } else {
                console.log('Skipping hidden nested slide:', slide);
            }
        });
    } else {
        // 通常スライドの場合
        adjustSingleSlide(currentSlide);
    }
}

function adjustSingleSlide(slide) {
    // スライドの親コンテナの高さを取得
    const slideContainer = document.querySelector('.reveal .slides');
    const slideContainerHeight = slideContainer ? slideContainer.getBoundingClientRect().height : 0;

    // スライドのコンテンツ高さを取得
    const contentHeight = slide.scrollHeight;

    // 高さ比較でスクロールを有効化または無効化
    if (contentHeight > slideContainerHeight) {
        console.log('  -> Adding scrollable class');
        slide.classList.add('scrollable');
    } else {
        console.log('  -> Removing scrollable class');
        slide.classList.remove('scrollable');
    }
}

// スライド切り替え時に調整
Reveal.on('slidechanged', adjustSlideOverflow);

// ウィンドウリサイズ時にも調整
window.addEventListener('resize', adjustSlideOverflow);

// 初期実行
window.onload = function () {
    adjustSlideOverflow();
};