function handleChatClick() {
  const consentGiven = localStorage.getItem("revalen_chat_consent");

  if (consentGiven === "true") {
    openTidio();
  } else {
    showConsentBanner();
  }
}

function showConsentBanner() {
  const banner = document.getElementById("consent-banner");
  if (banner) {
    banner.hidden = false;
  }
}

function openTidio() {
  if (window.tidioChatApi) {
    window.tidioChatApi.open();
  }
}
document.getElementById("accept-chat")?.addEventListener("click", function () {
  localStorage.setItem("revalen_chat_consent", "true");

  const script = document.createElement("script");
  script.src = window.REVALEN_TIDIO_SRC;
  script.async = true;
  document.body.appendChild(script);

  document.getElementById("consent-banner").hidden = true;

  // open chat immediately after consent
  setTimeout(() => {
    if (window.tidioChatApi) {
      window.tidioChatApi.open();
    }
  }, 1000);
});

document.getElementById("reject-chat")?.addEventListener("click", function () {
  localStorage.setItem("revalen_chat_consent", "false");
  document.getElementById("consent-banner").hidden = true;
});
