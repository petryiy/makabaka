document.addEventListener("DOMContentLoaded", () => {
    const introTexts = document.querySelector(".intro-texts");
    const memoryCardContainer = document.querySelector(".memory-card-container");
    const allCardsGrid = document.querySelector(".all-cards-grid");
    const nextButton = document.querySelector(".next-button");
  
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
        title: "test",
        text: "test",
        date: "2023-01-04",
        img: "images/memory2.jpg"
      },
      {
        title: "test",
        text: "test",
        date: "2023-03-15",
        img: "images/memory3.jpg"
      },
      {
        title: "test",
        text: "test",
        date: "2024-07-10",
        img: "images/memory4.jpg"
      },
      {
        title: "test",
        text: "test",
        date: "2025-06-25",
        img: "images/memory5.jpg"
      }
    ];
  
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
            <img src="${data.img}" alt="${data.title}"
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
});
