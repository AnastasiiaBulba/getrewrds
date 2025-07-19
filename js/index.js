// Homepage JavaScript
class HomepageManager {
  constructor() {
    this.reviewsContainer = document.getElementById("reviews-container");
    this.init();
  }

  async init() {
    await this.loadReviews();
  }

  async loadReviews() {
    try {
      const response = await fetch("./data/reviews.json");
      const reviews = await response.json();
      this.renderReviews(reviews);
    } catch (error) {
      console.error("Error loading reviews:", error);
      this.renderDefaultReviews();
    }
  }

  renderReviews(reviews) {
    if (!this.reviewsContainer) return;

    const reviewsHTML = reviews
      .map(
        (review) => `
            <div class="review-card">
                <div class="review-author">${review.author}</div>
                <div class="review-text">"${review.text}"</div>
            </div>
        `
      )
      .join("");

    this.reviewsContainer.innerHTML = reviewsHTML;
  }

  renderDefaultReviews() {
    if (!this.reviewsContainer) return;

    const defaultReviews = [
      {
        author: "Lily K.",
        text: "This dress-up game is absolutely adorable! I love all the cute outfits and accessories. The cat girl character is so charming and the fashion options are endless.",
      },
      {
        author: "Sophie M.",
        text: "Perfect game for fashion lovers! The kawaii style dresses are my favorite, and I love mixing different accessories to create unique looks for my cat girl.",
      },
      {
        author: "Emma R.",
        text: "My daughter loves this game! It's so cute and family-friendly. She spends hours creating different outfits and hairstyles for her cat girl character.",
      },
      {
        author: "Mia L.",
        text: "Amazing dress-up game with beautiful graphics! The gothic lolita collection is stunning, and I love how easy it is to create stylish combinations.",
      },
    ];

    this.renderReviews(defaultReviews);
  }
}

// Scroll to game function
function scrollToGame() {
  const gameSection = document.querySelector(".game-section");
  if (gameSection) {
    gameSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Initialize homepage when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  new HomepageManager();
});
