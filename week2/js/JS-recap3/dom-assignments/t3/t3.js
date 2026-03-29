function getBrowserInfo() {
  const userAgent = navigator.userAgent;

  let browser = "Unknown";
  let version = "Unknown";

  if (userAgent.includes("Chrome")) {
    browser = "Google Chrome";
    version = navigator.appVersion;

  } else if (userAgent.includes("Firefox")) {
    browser = "Mozilla Firefox";
    version = navigator.appVersion;

  } else if (userAgent.includes("Safari")) {
    browser = "Safari";
    version = navigator.appVersion;
  }

  return `${browser} ${version}`;
}

function getOS() {
  return navigator.platform;
}

function getScreenSize() {
  return `${screen.width} x ${screen.height}`;
}

function getAvailableScreen() {
  return `${screen.availWidth} x ${screen.availHeight}`;
}

function getDateTime() {
  const now = new Date();

  const date = now.toLocaleDateString("fi-FI", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const time = now.toLocaleTimeString("fi-FI", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return { date, time };
}

function addParagraph(target, text) {
  const p = document.createElement("p");
  p.textContent = text;
  target.appendChild(p);
}

//Main program
function init() {
  const target = document.getElementById("target");

  const browserInfo = getBrowserInfo();
  const os = getOS();
  const screenSize = getScreenSize();
  const availableScreen = getAvailableScreen();
  const { date, time } = getDateTime();
  addParagraph(target, `Browser: ${browserInfo}`);
  addParagraph(target, `Operating system: ${os}`);
  addParagraph(target, `Screen size: ${screenSize}`);
  addParagraph(target, `Available screen space: ${availableScreen}`);
  addParagraph(target, `Date: ${date}`);
  addParagraph(target, `Time: ${time}`);
}

init();
