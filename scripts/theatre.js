document.addEventListener("DOMContentLoaded", () => {
    const introTexts = document.querySelector(".intro-texts");
    const memoryCardContainer = document.querySelector(".memory-card-container");
    const allCardsGrid = document.querySelector(".all-cards-grid");
    const nextButton = document.querySelector(".next-button");
  
    const cardData = [
      {
        title: "初识",
        text: "今天我们相遇了，当时的我们还不知道未来会发生什么……",
        date: "2022-12-21",
        img: "images/memory1.jpg"
      },
      {
        title: "第一次牵手",
        text: "在那个下着小雨的夜晚，我牵起了你的手，那一刻我好紧张。",
        date: "2023-01-04",
        img: "images/memory2.jpg"
      },
      {
        title: "第一次争吵",
        text: "那一次我说了伤你心的话，可你还是温柔地陪在我身边。",
        date: "2023-03-15",
        img: "images/memory3.jpg"
      },
      {
        title: "你的生日",
        text: "我记得你说喜欢有人记得你的生日，这一次我想让你永远记住。",
        date: "2024-07-10",
        img: "images/memory4.jpg"
      },
      {
        title: "这一次，我写下这些",
        text: "你是我愿意用心记录的人，无论我们在哪里，这些回忆都会在。",
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
          nextButton.classList.remove("hidden");
          return;
        }
  
        const data = cardData[cardIndex];
        memoryCardContainer.innerHTML = `
          <div class="memory-card">
            <img src="${data.img}" alt="${data.title}" />
            <h2>${data.title}</h2>
            <p>${data.text}</p>
            <p class="date">${data.date}</p>
          </div>
        `;
  
        cardIndex++;
        setTimeout(showCard, 6000); 
      }
  
      showCard();
    }, 9000);
  
    function populateAllCards() {
      allCardsGrid.innerHTML = "";
      for (let i = 0; i < cardData.length; i++) {
        const data = cardData[i];
        const card = document.createElement("div");
        card.className = "memory-card";
        card.innerHTML = `
          <img src="${data.img}" alt="${data.title}" />
          <h2>${data.title}</h2>
          <p>${data.text}</p>
          <p class="date">${data.date}</p>
        `;
        allCardsGrid.appendChild(card);
      }
    }
  });
  