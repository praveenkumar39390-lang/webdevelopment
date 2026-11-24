let toastTimer;

function showToast(message) {
  const toast = document.querySelector("#toast");

  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 3000);
}

showToast("Welcome to IPL Ticket Booking!");

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const teamFilter = document.querySelector("#team-filter");
const matchCards = document.querySelector("#match-cards");

if (teamFilter && matchCards) {
  const cards = Array.from(matchCards.querySelectorAll(".match-card"));
  const noMatchesMessage = document.querySelector("#no-matches");

  teamFilter.addEventListener("change", () => {
    let visibleMatches = 0;

    cards.forEach((card) => {
      const teams = card.dataset.teams.split(" ");
      card.hidden = teamFilter.value !== "all" && !teams.includes(teamFilter.value);
      if (!card.hidden) visibleMatches += 1;
    });

    noMatchesMessage.hidden = visibleMatches > 0;
  });

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      const isList = button.dataset.view === "list";
      matchCards.classList.toggle("list-view", isList);
      document.querySelectorAll("[data-view]").forEach((viewButton) => {
        viewButton.setAttribute("aria-pressed", String(viewButton === button));
      });
    });
  });
}

document.querySelectorAll('a[href="#booking"], a[href="#ticket-form"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const formSection = document.querySelector(link.hash);

    if (!formSection) {
      return;
    }

    event.preventDefault();
    const matchSelect = document.querySelector("#match");
    if (matchSelect && link.dataset.match) {
      matchSelect.value = link.dataset.match;
      matchSelect.dispatchEvent(new Event("change", { bubbles: true }));
    }
    formSection.scrollIntoView({ behavior: "smooth" });
    showToast("Booking form opened.");
  });
});

const bookingForm = document.querySelector("#ticket-booking-form");

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    showToast("Booking confirmed! Demo bookings are not saved.");
  });

  bookingForm.addEventListener("reset", () => {
    showToast("Form cleared.");
  });
}

const indexBookingForm = document.querySelector("#index-booking-form");

if (indexBookingForm) {
  indexBookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    showToast("Booking confirmed! Demo bookings are not saved.");
  });
}

const matchSelect = document.querySelector("#match");
const standSelect = document.querySelector("#stand");
const quantityInput = document.querySelector("#quantity");
const summaryMatch = document.querySelector("#summary-match");

if (matchSelect && standSelect && quantityInput && summaryMatch) {
  const updateBookingSummary = (showNotification) => {
    const selectedMatch = matchSelect.selectedOptions[0];
    const stand = standSelect.value;
    const ticketPrice = Number(selectedMatch.dataset[stand]) || 0;
    const quantity = Number(quantityInput.value) || 0;
    const total = ticketPrice * quantity;
    const formatPrice = (amount) => new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);

    summaryMatch.textContent = selectedMatch.textContent;
    document.querySelector("#summary-stand").textContent = standSelect.selectedOptions[0].textContent;
    document.querySelector("#summary-price").textContent = formatPrice(ticketPrice);
    document.querySelector("#summary-quantity").textContent = quantity;
    document.querySelector("#summary-total").textContent = formatPrice(total);

    if (showNotification) {
      showToast("Booking summary updated.");
    }
  };

  [matchSelect, standSelect, quantityInput].forEach((control) => {
    control.addEventListener("input", () => updateBookingSummary(false));
    control.addEventListener("change", () => updateBookingSummary(true));
  });
}
