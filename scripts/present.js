document.addEventListener('DOMContentLoaded', () => {
    const lines = [
        "既然命运充满不确定性",
        "不如现在就去做想做的事，见想见的人",
        "漂流瓶终将上岸",
        "而当你看到这的时候，我应该到你家楼下了",
        "下来吧 迎接你的第三个礼物"
    ];

    lines.forEach((line, index) => {
        document.getElementById(`line${index + 1}`).textContent = line;
    });

    function fadeInElements() {
        const elements = [
            document.querySelector('.title'),
            document.getElementById('line1'),
            document.getElementById('line2'),
            document.getElementById('line3'),
            document.getElementById('line4'),
            document.getElementById('line5')
        ];

        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');

                if (index === elements.length - 1) {
                    setTimeout(() => {
                        document.getElementById('home-btn').classList.remove('hidden');
                        document.getElementById('home-btn').style.opacity = '1';
                        document.getElementById('home-btn').style.transform = 'translateY(0)';
                    }, 1000);
                }
            }, index * 2500);
        });
    }
    setTimeout(fadeInElements, 500);
})