const canvas = document.getElementById("stars-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let stars = [];
for (let i = 0; i < 200; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2,
        alpha: Math.random(),
        speed: 0.001 + Math.random() * 0.01,
    });
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((star) => {
        star.alpha += star.speed;
        if (star.alpha >= 1 || star.alpha <= 0) {
        star.speed *= -1;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
    });
    requestAnimationFrame(animateStars);
}
animateStars();

const lines = [
    "我常常思考未来会是怎么样",
    "于是这第二份礼物便是愿景与祝福。",
    "我将它们放到一个个漂流瓶里送给未来的那个你..."
];

function typeLine(lineIndex = 0, charIndex = 0) {
    if (lineIndex >= lines.length) {
        setTimeout(() => {
        createBottles();
        }, 1000);
        return;
    }

    const target = document.getElementById(`line${lineIndex + 1}`);
    const currentText = lines[lineIndex];

    if (charIndex <= currentText.length) {
        target.textContent = currentText.substring(0, charIndex);
        setTimeout(() => typeLine(lineIndex, charIndex + 1), 50);
    } else {
        setTimeout(() => typeLine(lineIndex + 1, 0), 800);
    }
}

const wishes = [
    {
        text: `你开始明白了，照顾别人很好，但照顾自己更重要。<br />
            你会为自己泡热茶、好好吃饭，不再为讨好谁而委屈自己。<br />
            你把心疼自己，当成一种温柔的生活方式。`,
        img: "images/wish1.jpg"
    },
    {
        text: `你不再拼命解释，也不再为了合群而改变自己附和别人。<br />
            你的一切都是独特的，你才是你的世界的主角。<br />
            你没有成为别人期待的样子，而是成为了你愿意成为的自己。`,
        img: "images/wish2.jpg"
    },
    {
        text: `你依然会哭，也还是会逃避。<br />
            但你的这份敏感不再是你的负担，而是你独一无二的优点。<br />
            你会变的很厉害，你会勇敢地站起来并对自己说没关系。`,
        img: "images/wish3.jpg"
    },
    {
        text: `你一直在成长着，在变得更温柔，更坚定。<br />
            你一直都值得拥有最好的未来。<br />
            你会成为一个真正爱自己的人。同时希望你知道，<br />
            在这个世界上也永远有人在爱着你。<br />
            你不需要成为太阳，因为你已经是独一无二的星光。`,
        img: "images/wish4.jpg"
    }
];

function createBottles() {
    const container = document.getElementById("bottles-container");

    wishes.forEach((wish, index) => {
        setTimeout(() => {
            const bottle = document.createElement("div");
            bottle.className = "bottle";
            bottle.id = `bottle-${index}`;
            bottle.innerHTML = `
                <img src="images/bottle.png" alt="漂流瓶">
                <div class="bottle-glow"></div>
            `;
            let left, bottom;
            do {
                left = 10 + Math.random() * 80;
                bottom = 20 + Math.random() * 60;
            } while (left > 40 && left < 60 && bottom < 35);
            
            let rotate = -15 + Math.random() * 30;

            bottle.style.left = `${left}%`;
            bottle.style.bottom = `${bottom}%`;
            bottle.style.transform = `rotate(${rotate}deg)`;
            bottle.style.opacity = "0";

            bottle.addEventListener("click", () => showWish(index));

            container.appendChild(bottle);

            setTimeout(() => {
                bottle.style.opacity = "1";
            }, 100);
        }, index * 500);
    });

    setTimeout(() => {
        const btn = document.getElementById("continue-btn");
        btn.classList.remove("hidden");
        btn.classList.add("visible");
        btn.addEventListener("click", () => {
        const wave = document.createElement("div");
        wave.className = "page-transition-wave";
        document.body.appendChild(wave);
        setTimeout(() => {
            window.location.href = "wish.html";
        }, 1200);
        });
    }, wishes.length * 600);
}

function showWish(index) {
    const wish = wishes[index];
    const wishCard = document.createElement("div");
    wishCard.className = "wish-card active";
    wishCard.innerHTML = `
        <img src="${wish.img}" alt="愿望插图">
        <div class="wish-text">${wish.text}</div>
        <div class="close-btn">×</div>
    `;

    document.body.appendChild(wishCard);

    wishCard.querySelector(".close-btn").addEventListener("click", () => {
        wishCard.style.opacity = "0";
        setTimeout(() => wishCard.remove(), 500);
    });
}

window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    const skipIntro = params.get("skipIntro") === "true";

    if (skipIntro) {
        createBottles();
    } else {
        typeLine();
    }
};