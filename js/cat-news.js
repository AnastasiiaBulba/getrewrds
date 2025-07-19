// Cat News Page JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Load news data
  loadNewsData();
});

async function loadNewsData() {
  try {
    const response = await fetch("./data/news.json");
    const data = await response.json();

    // Populate updates section
    const updatesContainer = document.getElementById("updates-container");
    if (updatesContainer) {
      data.updates.forEach((item) => {
        const newsCard = createNewsCard(item);
        updatesContainer.appendChild(newsCard);
      });
    }

    // Populate diaries section
    const diariesContainer = document.getElementById("diaries-container");
    if (diariesContainer) {
      data.diaries.forEach((item) => {
        const newsCard = createNewsCard(item);
        diariesContainer.appendChild(newsCard);
      });
    }
  } catch (error) {
    console.error("Error loading news data:", error);
    // Fallback to default data if JSON loading fails
    loadDefaultNewsData();
  }
}

function loadDefaultNewsData() {
  // Sample news data for Cat Girl Dress Up
  const updatesData = [
    {
      title: "New Kawaii Collection Added!",
      date: "May 15, 2025",
      content:
        "We've added a brand new Kawaii collection with adorable pastel dresses, cute accessories, and charming hairstyles. Dress up your cat girl in the most kawaii style ever!",
      image: "./photo/new_girl1.jpg",
    },
    {
      title: "Gothic Lolita Fashion Update",
      date: "May 10, 2025",
      content:
        "Explore the dark and elegant world of Gothic Lolita fashion with new dresses featuring lace details, ribbons, and sophisticated accessories perfect for your cat girl character.",
      image: "./photo/new_girl2.jpg",
    },
    {
      title: "School Uniform Collection",
      date: "May 5, 2025",
      content:
        "Get ready for school with our new Japanese school uniform collection! Classic blazers, pleated skirts, and cute accessories to make your cat girl the most stylish student.",
      image: "./photo/new_girl3.jpg",
    },
  ];

  const diariesData = [
    {
      title: "Fashion Tips: Mixing and Matching",
      date: "March 12, 2025",
      content:
        "Learn how to create stunning combinations by mixing different clothing items and accessories. Discover the art of color coordination and style matching for your cat girl.",
      image: null,
    },
    {
      title: "Seasonal Style Guide",
      date: "March 8, 2025",
      content:
        "Discover the perfect outfits for every season! From light summer dresses to cozy winter wear, we'll help you dress your cat girl appropriately for any weather.",
      image: null,
    },
    {
      title: "Accessorizing Like a Pro",
      date: "March 3, 2025",
      content:
        "Master the art of accessorizing with our comprehensive guide. Learn how to choose the perfect bows, jewelry, and hair accessories to complete your cat girl's look.",
      image: null,
    },
  ];

  // Populate updates section
  const updatesContainer = document.getElementById("updates-container");
  if (updatesContainer) {
    updatesData.forEach((item) => {
      const newsCard = createNewsCard(item);
      updatesContainer.appendChild(newsCard);
    });
  }

  // Populate diaries section
  const diariesContainer = document.getElementById("diaries-container");
  if (diariesContainer) {
    diariesData.forEach((item) => {
      const newsCard = createNewsCard(item);
      diariesContainer.appendChild(newsCard);
    });
  }
}

function createNewsCard(item) {
  const card = document.createElement("div");
  card.className = "news-card";

  card.innerHTML = `
        <h3>${item.title}</h3>
        <div class="date">${item.date}</div>
        <p>${item.content}</p>
        <a href="#" class="read-more">Read More →</a>
    `;

  // Add event listener to the read more button
  const readMoreBtn = card.querySelector(".read-more");
  if (readMoreBtn) {
    readMoreBtn.addEventListener("click", function (e) {
      e.preventDefault();
      showFullArticle(item);
    });
  }

  return card;
}

function showFullArticle(item) {
  // Create modal overlay
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(5px);
  `;

  // Create modal content
  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";
  modalContent.style.cssText = `
    background: linear-gradient(135deg, #ff69b4, #ff1493);
    color: white;
    padding: 30px;
    border-radius: 20px;
    max-width: 700px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 20px 40px rgba(255, 105, 180, 0.3);
    border: 2px solid rgba(255, 255, 255, 0.2);
  `;

  // Add image if it exists
  const imageHtml = item.image
    ? `
    <div style="margin-bottom: 20px; text-align: center;">
      <img src="${item.image}" alt="${item.title}" style="
        max-width: 100%;
        height: auto;
        border-radius: 15px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
      ">
    </div>
  `
    : "";

  modalContent.innerHTML = `
    <button class="close-btn" style="
      position: absolute;
      top: 15px;
      right: 20px;
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      font-weight: bold;
    ">&times;</button>
    <h2 style="margin-bottom: 10px; color: white; font-size: 24px;">${item.title}</h2>
    <div style="margin-bottom: 20px; opacity: 0.8; font-size: 14px;">${item.date}</div>
    ${imageHtml}
    <div style="line-height: 1.6; font-size: 16px;">${item.content}</div>
    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.3);">
      <p style="margin: 0; opacity: 0.9;">Thank you for reading our latest fashion update!</p>
    </div>
  `;

  // Add close functionality
  const closeBtn = modalContent.querySelector(".close-btn");
  closeBtn.addEventListener("click", function () {
    document.body.removeChild(modal);
  });

  // Close modal when clicking outside
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && document.body.contains(modal)) {
      document.body.removeChild(modal);
    }
  });

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // Add animation
  modal.style.opacity = "0";
  modalContent.style.transform = "scale(0.8)";
  modalContent.style.opacity = "0";

  setTimeout(() => {
    modal.style.opacity = "1";
    modalContent.style.transform = "scale(1)";
    modalContent.style.opacity = "1";
  }, 10);
}
