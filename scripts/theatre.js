document.addEventListener("DOMContentLoaded", () => {
  const introTexts = document.querySelector(".intro-texts");
  const memoryCardContainer = document.querySelector(".memory-card-container");
  const allCardsGrid = document.querySelector(".all-cards-grid");
  const nextButton = document.querySelector(".next-button");

  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get("mode");  

  const cardData = [
    {
      title: "故事开始的地方",
      text: [
        { side: "left", msg: "你好，加个微信吗？" },
        { side: "right", msg: "好(///▽///)" }
      ],
      date: "Sep 2023",
      img: "images/memory1.jpg"
    },
    {
      title: "小吉出生啦",
      text: "第一次网购礼物，还差点被这边的物流骗钱！差点就毁了本天才的一世英名",
      date: "15 Jul 2024",
      img: "images/memory2.jpg"
    },
    {
      title: "正式在一起",
      text: "第一次手捧鲜花穿过整个城市前往机场，既紧张又激动。在你家楼下，昏黄的路灯下，试探着靠近又分开，直到Uber刺眼的车灯划破夜色，只留下未完成的吻和那句下次一定",
      date: "21 Feb 2025",
      img: "images/memory3.jpg"
    },
    {
      title: "约定的完成",
      text: "那天我们去了long reef，完成了两天前的约定。这里的风景果然如网上所说那般好看，但我想，我早已拥有了那道最美的风景",
      date: "23 Feb 2025",
      img: "images/memory4.jpg"
    },
    {
      title: "Kiama之旅",
      text: "第一次单独出门旅行，那一天，下着大雨，屋内的我们，昏暗的灯光下，既没睡好，却也好像睡得很好...",
      date: "31 Mar 2025",
      img: "images/memory5.jpg"
    },
    {
      title: "墨尔本之旅",
      text: "第一次在陌生的城市并肩而行，我们牵着手漫步在人群中，那一刻，时间仿佛为我们按下了暂停键，只剩下你和我",
      date: "28 May 2025",
      img: "images/memory6.jpg"
    },
    {
      title: "To Be Continued",
      text: "未来或许不确定，但确定的是，你曾紧握我的手，站在我的身边。时间太长，我们也太年轻，长长的路我们慢慢走，而剩下的答案，我们慢慢找",
      date: "此刻即永恒",
      img: "images/memory7.jpg"
    }
  ];

  function showAllCardsImmediately() {
    introTexts.style.display = "none";
    memoryCardContainer.style.display = "none";
    allCardsGrid.classList.remove("hidden");
    nextButton.classList.add("show");
    populateAllCards();
  }

  function populateAllCards() {
    allCardsGrid.innerHTML = "";
    for (let i = 0; i < cardData.length; i++) {
      const data = cardData[i];
      let textHtml = "";
      if (typeof data.text === "string") {
        textHtml = `<p class="normal-text">${data.text}</p>`;
      } else if (Array.isArray(data.text)) {
        textHtml = `<div class="chat-box">
          ${data.text.map(t => `<p class="bubble ${t.side}">${t.msg}</p>`).join("")}
        </div>`;
      }
      const card = document.createElement("div");
      card.className = "memory-card";
      card.innerHTML = `
        <img src="${data.img}" alt="${data.title}" />
        <h2>${data.title}</h2>
        ${textHtml}
        <p class="date">${data.date}</p>
      `;
      allCardsGrid.appendChild(card);
    }
  }

  if (mode === "all") {
    showAllCardsImmediately();
    return;
  }

  setTimeout(() => {
    introTexts.style.display = "none";
    memoryCardContainer.style.display = "block";

    let cardIndex = 0;

    function showCard() {
      if (cardIndex >= cardData.length) {
        memoryCardContainer.style.display = "none";
        populateAllCards();
        allCardsGrid.classList.remove("hidden");
        nextButton.classList.add("show");
        return;
      }

      const data = cardData[cardIndex];
      let textHtml = "";

      if (typeof data.text === "string") {
        textHtml = `<p class="normal-text">${data.text}</p>`;
      } else if (Array.isArray(data.text)) {
        textHtml = `<div class="chat-box">
          ${data.text.map(t => `<p class="bubble ${t.side}">${t.msg}</p>`).join("")}
        </div>`;
      }

      memoryCardContainer.innerHTML = `
        <div class="memory-card">
          <img src="${data.img}" alt="${data.title}">
          <h2>${data.title}</h2>
          ${textHtml}
          <p class="date">${data.date}</p>
        </div>
      `;
      requestAnimationFrame(() => {
        memoryCardContainer.querySelector('.memory-card').classList.add('show');
      });

      cardIndex++;
      setTimeout(showCard, 10000); 
    }

    showCard();
  }, 20000);
});
