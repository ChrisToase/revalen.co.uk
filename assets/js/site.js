function loadTidio() {
  if (window.tidioChatApi) {
    return;
  }

  if (document.querySelector('script[data-tidio="true"]')) {
    return;
  }

  const script = document.createElement("script");
  script.src = window.REVALEN_TIDIO_SRC;
  script.async = true;
  script.setAttribute("data-tidio", "true");
  document.body.appendChild(script);
}

function openTidio() {
  if (window.tidioChatApi) {
    window.tidioChatApi.open();
  }
}

function showConsentBanner() {
  const banner = document.getElementById("consent-banner");
  if (banner) {
    banner.hidden = false;
  }
}

function hideConsentBanner() {
  const banner = document.getElementById("consent-banner");
  if (banner) {
    banner.hidden = true;
  }
}

function handleChatClick() {
  const consentGiven = localStorage.getItem("revalen_chat_consent");

  if (consentGiven === "true") {
    loadTidio();

    setTimeout(() => {
      openTidio();
    }, 1000);
  } else {
    showConsentBanner();
  }
}

document.getElementById("accept-chat")?.addEventListener("click", function () {
  localStorage.setItem("revalen_chat_consent", "true");

  loadTidio();
  hideConsentBanner();

  setTimeout(() => {
    openTidio();
  }, 1000);
});

document.getElementById("reject-chat")?.addEventListener("click", function () {
  localStorage.setItem("revalen_chat_consent", "false");
  hideConsentBanner();
});

document.addEventListener("DOMContentLoaded", function () {
  const consentGiven = localStorage.getItem("revalen_chat_consent");

  if (consentGiven === "true") {
    loadTidio();
  }
});
