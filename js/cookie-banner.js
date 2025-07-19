// Cookie Banner Management
class CookieBanner {
  constructor() {
    this.banner = document.getElementById("cookie-banner");
    this.acceptButton = document.getElementById("accept-cookies");
    this.cookieAccepted = localStorage.getItem("cookiesAccepted");

    this.init();
  }

  init() {
    if (!this.cookieAccepted) {
      this.showBanner();
    }

    if (this.acceptButton) {
      this.acceptButton.addEventListener("click", () => this.acceptCookies());
    }
  }

  showBanner() {
    if (this.banner) {
      setTimeout(() => {
        this.banner.classList.add("show");
      }, 1000);
    }
  }

  acceptCookies() {
    localStorage.setItem("cookiesAccepted", "true");
    this.cookieAccepted = true;

    if (this.banner) {
      this.banner.classList.remove("show");
    }
  }
}

// Initialize cookie banner when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  new CookieBanner();
});
