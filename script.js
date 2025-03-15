const loadingMessages = [
  "Consulting with a confused octopus...",
  "Asking my grandma's cat for advice...",
  "Searching through parallel universes...",
  "Translating your query to dolphin and back...",
  "Shuffling papers dramatically...",
  "Teaching a sloth to use Google...",
  "Brewing coffee for the server hamsters...",
  "Dusting off the ancient scrolls of wisdom...",
  "Rebooting the quantum toaster...",
  "Checking under the digital couch cushions...",
];

function getRandomLoadingMessage() {
  return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
}

function getRandomDidYouMean(query) {
  const alternatives = [
    "a banana smoothie recipe",
    "how to teach dolphins algebra",
    "why socks disappear in washing machines",
    "quantum physics for goldfish",
    "professional pillow fighting techniques",
    "how to speak plant language",
    "time travel etiquette guide",
    "underwater basket weaving tips",
    "telepathic cooking classes",
    "anti-gravity haircut tutorials",
  ];
  return alternatives[Math.floor(Math.random() * alternatives.length)];
}

async function getAISuggestions(input) {
  const prompt = `Generate a completely random, absurd, and unrelated search suggestion that has nothing to do with "${input}". Make it funny and nonsensical, similar to these examples:
- Why do penguins hate jazz music?
- Can toast feel emotions?
- How to teach algebra to a cactus
Keep it short and family-friendly. Return only the suggestion text, nothing else.

Return the suggestions as a JSON array of strings.`;

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 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",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.9,
        }),
      }
    );

    const data = await response.json();
    console.log(data);
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error fetching AI suggestions:", error);
    return [
      "Why do penguins hate jazz music?",
      "Can toast feel emotions?",
      "How to teach algebra to a cactus",
      "Do clouds get lonely?",
      "Why doesn't my plant have Instagram?",
    ];
  }
}

async function showRandomAutocomplete() {
  const autocompleteBox = document.getElementById("autocomplete-box");
  const searchInput = document.getElementById("search-input");
  autocompleteBox.innerHTML = "";
  autocompleteBox.style.display = "block";

  autocompleteBox.innerHTML =
    '<div class="autocomplete-item">Generating unhelpful suggestions...</div>';

  const suggestions = await getAISuggestions(searchInput.value);
  // the ai returns as an array like this "['yada', 'yada', 'yada']"
  const suggestionsArray = JSON.parse(suggestions);
  console.log(suggestionsArray);
  autocompleteBox.innerHTML = "";

  suggestionsArray.forEach((suggestion) => {
    const div = document.createElement("div");
    div.className = "autocomplete-item";
    div.textContent = suggestion;
    div.onclick = () => {
      document.getElementById("search-input").value = suggestion;
      hideAutocomplete();
    };
    autocompleteBox.appendChild(div);
  });
}

let debounceTimeout;
document.getElementById("search-input").addEventListener("input", function (e) {
  const input = e.target.value;
  clearTimeout(debounceTimeout);

  if (input.length > 0) {
    debounceTimeout = setTimeout(() => {
      showRandomAutocomplete();
    }, 300);
  } else {
    hideAutocomplete();
  }
});

function hideAutocomplete() {
  document.getElementById("autocomplete-box").style.display = "none";
}

document.addEventListener("click", function (e) {
  if (!e.target.closest(".search-container")) {
    hideAutocomplete();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && document.activeElement.id === "search-input") {
    if (Math.random() < 0.2) {
      const effects = [
        () => (document.body.style.transform = "rotate(180deg)"),
        () => (document.body.style.fontFamily = "Comic Sans MS"),
        () => (document.body.style.filter = "hue-rotate(180deg)"),
        () => (document.body.style.animation = "spin 4s linear infinite"),
        () => (document.body.style.cursor = "wait"),
      ];
      effects[Math.floor(Math.random() * effects.length)]();
      setTimeout(() => document.body.removeAttribute("style"), 3000);
    }
  }
});

async function getInsultingDidYouMean(query) {
  const prompt = `Given the search query "${query}", generate a sarcastic, playfully insulting "Did you mean?" suggestion. Be creative and funny, but keep it lighthearted and not truly mean. Make fun of the user's search in a witty way. Examples:
- If someone searches "how to cook pasta": "Did you mean: 'how to boil water for dummies'?"
- If someone searches "best movies": "Did you mean: 'I let my cat choose my entertainment'"
Keep it short, clever, and very mocking. Return only the suggestion text, nothing else. try to be funny though`;

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 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",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.9,
        }),
      }
    );

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error fetching AI suggestion:", error);
    const fallbacks = [
      "how to use a search engine for beginners",
      "things to google when you're really desperate",
      "why am I asking the internet silly questions",
      "help my keyboard is full of bad ideas",
      "professional procrastination techniques",
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
}

async function search() {
  const searchInput = document.getElementById("search-input");
  const loading = document.getElementById("loading");
  const results = document.getElementById("results");

  if (!searchInput.value.trim()) return;

  loading.classList.remove("hidden");
  results.classList.add("hidden");

  const loadingTime = Math.random() * 4000 + 1000;

  const loadingInterval = setInterval(() => {
    document.querySelector(".loading p").textContent =
      getRandomLoadingMessage();
  }, 1000);

  await new Promise((resolve) => setTimeout(resolve, loadingTime));
  clearInterval(loadingInterval);

  const randomPage = Math.floor(Math.random() * 35) + 35;
  const API_KEY = "AIzaSyBj6xEAYyqMT7dUtc3SO_v_PP8ZaYmrI30";
  const SEARCH_ENGINE_ID = "660d9abd9fcfe4b94";
  const startIndex = randomPage * 10;

  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(
        searchInput.value
      )}&lowRange=${startIndex}`
    );
    const data = await response.json();

    const insultingSuggestion = await getInsultingDidYouMean(searchInput.value);

    const resultsHtml = `
      <div class="search-results-container">
        <p class="did-you-mean">
          Did you mean: <a href="#" onclick="document.getElementById('search-input').value='${insultingSuggestion}';return false;">${insultingSuggestion}</a>?
          <br>
          <span class="sarcastic-note">(Seriously, we're judging your search history right now)</span>
        </p>
        <p class="random-page-notice">
          Showing completely random results from page ${randomPage} of Google,
          because that's how we roll here at UnGoogle.
        </p>
        ${
          data.items
            ?.map(
              (item) => `
          <div class="search-result-item ${
            Math.random() < 0.2 ? "silly-effect" : ""
          }">
            <a href="#" target="_blank" rel="noopener noreferrer">
              ${item.title}
            </a>
            <div class="result-url">${item.link}</div>
            <div class="result-snippet">
              ${item.snippet}
              <br>
              <em class="unhelpful-comment">${getUnhelpfulComment()}</em>
            </div>
          </div>
        `
            )
            .join("") ||
          "<p>No results found. Have you tried turning it off and on again?</p>"
        }
      </div>
    `;

    document.getElementById("search-results").innerHTML = resultsHtml;

    setTimeout(initializeRunawayResults, 100);
  } catch (error) {
    console.error("Error fetching results:", error);
    document.getElementById("search-results").innerHTML = `
      <p class="error-message">
        Something went wrong. Have you tried turning it off and on again?
      </p>
    `;
  }

  loading.classList.add("hidden");
  results.classList.remove("hidden");

  refreshAds();
}

function getUnhelpfulComment() {
  const comments = [
    "This might be what you're looking for, but probably not.",
    "I found this by randomly pressing keys.",
    "My pet rock thinks this is relevant.",
    "This result was chosen by a sleepy hamster.",
    "9 out of 10 rubber ducks don't recommend this link.",
    "This result was found in the couch cushions.",
    "A time-traveling pigeon suggested this one.",
    "Found this while looking for my missing sock.",
    "This link was approved by a committee of confused cats.",
    "Selected by throwing darts at my computer screen.",
    "This result was chosen by a committee of confused cats.",
    "I might think your search is relevant, but my cat doesn't.",
  ];
  return comments[Math.floor(Math.random() * comments.length)];
}

function getRandomUngoogleComment(pageNum) {
  const comments = [
    `This is a completely random result from Google, i think it was uhhh page ${pageNum}, because that's how we roll here at UnGoogle.`,
    `Welcome to UnGoogle! Providing only the worst results from page ${pageNum} of Google.`,
  ];
  return comments[Math.floor(Math.random() * comments.length)];
}

function initializeRunawayResults(extraChaos = false) {
  const results = document.querySelectorAll(".search-result-item");
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  results.forEach((result) => {
    let hasEscaped = false;

    result.addEventListener("mouseover", function (e) {
      if (hasEscaped) return;

      if (Math.random() < (extraChaos ? 0.95 : 0.8)) {
        const resultRect = result.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        let escapeX, escapeY;

        const distanceToLeft = mouseX;
        const distanceToRight = viewportWidth - mouseX;
        const distanceToTop = mouseY;
        const distanceToBottom = viewportHeight - mouseY;

        const maxDistance = Math.max(
          distanceToLeft,
          distanceToRight,
          distanceToTop,
          distanceToBottom
        );

        if (maxDistance === distanceToLeft) {
          escapeX = -viewportWidth;
          escapeY = resultRect.top + (Math.random() - 0.5) * viewportHeight;
        } else if (maxDistance === distanceToRight) {
          escapeX = viewportWidth * 2;
          escapeY = resultRect.top + (Math.random() - 0.5) * viewportHeight;
        } else if (maxDistance === distanceToTop) {
          escapeX = resultRect.left + (Math.random() - 0.5) * viewportWidth;
          escapeY = -viewportHeight;
        } else {
          escapeX = resultRect.left + (Math.random() - 0.5) * viewportWidth;
          escapeY = viewportHeight * 2;
        }

        escapeX += (Math.random() - 0.5) * 200;
        escapeY += (Math.random() - 0.5) * 200;

        result.style.transition = `transform ${
          extraChaos ? 0.8 : 1.2
        }s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        result.style.transform = `translate(${escapeX}px, ${escapeY}px) rotate(${
          (Math.random() - 0.5) * 720
        }deg) scale(0.1)`;

        result.style.filter = "blur(5px)";
        result.style.opacity = "0.7";

        hasEscaped = true;

        setTimeout(
          () => {
            result.style.display = "none";
          },
          extraChaos ? 800 : 1200
        );

        if (
          document.querySelectorAll(
            '.search-result-item:not([style*="display: none"])'
          ).length <= 2
        ) {
          const notice = document.createElement("div");
          notice.className = "escape-notice";
          notice.textContent =
            "Your results have escaped. They're probably having a better life now.";
          document
            .querySelector(".search-results-container")
            .appendChild(notice);
        }
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".search-results-container")
    ?.addEventListener("mousemove", (e) => {
      const results = document.querySelectorAll(".search-result-item");
      results.forEach((result) => {
        const rect = result.getBoundingClientRect();
        const distance = Math.hypot(
          e.clientX - (rect.left + rect.width / 2),
          e.clientY - (rect.top + rect.height / 2)
        );

        if (distance < 200 && !result.classList.contains("running-away")) {
          const nervousness = (1 - distance / 200) * 2;
          result.style.transform = `rotate(${
            (Math.random() - 0.5) * nervousness
          }deg)`;
        } else if (!result.classList.contains("running-away")) {
          result.style.transform = "";
        }
      });
    });
});

async function imFeelingUnlucky() {
  const searchInput = document.getElementById("search-input");
  const loading = document.getElementById("loading");
  const results = document.getElementById("results");

  if (!searchInput.value.trim()) {
    searchInput.value = "why am I clicking random buttons";
  }

  loading.classList.remove("hidden");
  results.classList.add("hidden");

  const loadingTime = Math.random() * 5000 + 3000;

  const unluckyLoadingMessages = [
    "Searching in parallel universe #404...",
    "Asking my pet rock for the worst possible answer...",
    "Consulting with professional wrong-answer-generators...",
    "Throwing darts at a dictionary blindfolded...",
    "Mixing up all the search results in a blender...",
    "Teaching a goldfish to use Google backwards...",
    "Randomly selecting words from rejected fortune cookies...",
    "Interpreting your search through interprative dance...",
    "Feeding your query to a very confused AI...",
    "Running query through a maze of mirrors...",
  ];

  const loadingInterval = setInterval(() => {
    document.querySelector(".loading p").textContent =
      unluckyLoadingMessages[
        Math.floor(Math.random() * unluckyLoadingMessages.length)
      ];
  }, 800);

  await new Promise((resolve) => setTimeout(resolve, loadingTime));
  clearInterval(loadingInterval);

  const randomPage = Math.floor(Math.random() * 50) + 50;
  const API_KEY = "AIzaSyBj6xEAYyqMT7dUtc3SO_v_PP8ZaYmrI30";
  const SEARCH_ENGINE_ID = "660d9abd9fcfe4b94";
  const startIndex = randomPage * 10;

  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(
        searchInput.value
      )}&lowRange=${startIndex}`
    );
    const data = await response.json();

    const insult1 = await getInsultingDidYouMean(searchInput.value);
    const insult2 = await getInsultingDidYouMean(
      searchInput.value + " but make it worse"
    );

    const resultsHtml = `
      <div class="search-results-container">
        <p class="did-you-mean extra-sarcastic">
          Did you mean: <a href="#" onclick="document.getElementById('search-input').value='${insult1}';return false;">${insult1}</a>?
          <br>
          Or perhaps: <a href="#" onclick="document.getElementById('search-input').value='${insult2}';return false;">${insult2}</a>?
          <br>
          <span class="sarcastic-note">(We're not just judging, we're taking screenshots)</span>
        </p>
        <p class="random-page-notice">
          Showing absolutely irrelevant results from page ${randomPage} of Google,
          because you clicked a button that literally says "unlucky"
        </p>
        ${
          data.items
            ?.map(
              (item, index) => `
          <div class="search-result-item ${
            Math.random() < 0.8 ? "silly-effect" : ""
          } extra-unlucky">
            <div class="result-overlay" onclick="showUnclickableMessage()"></div>
            <a href="javascript:void(0);" onclick="return false;">
              ${item.title}
            </a>
            <div class="result-url">${item.link}</div>
            <div class="result-snippet">
              ${item.snippet}
              <br>
              <em class="unhelpful-comment">${getUnhelpfulComment()}</em>
              <em class="unhelpful-comment">${getUnhelpfulComment()}</em>
            </div>
          </div>
        `
            )
            .reverse()
            .join("") ||
          "<p>Congratulations! No results found. You're officially too unlucky.</p>"
        }
        <div class="unlucky-footer">
          <p>🎲 Your unlucky number of the day: ${
            Math.floor(Math.random() * 13) + 1
          }</p>
          <p>⚠️ Warning: These results may cause temporary confusion and permanent disappointment</p>
        </div>
      </div>
    `;

    document.getElementById("search-results").innerHTML = resultsHtml;

    document.querySelectorAll(".extra-unlucky").forEach((result) => {
      result.style.transform = `rotate(${(Math.random() - 0.5) * 3}deg)`;
      if (Math.random() < 0.3) {
        result.style.fontFamily = "Comic Sans MS, cursive";
      }
    });

    setTimeout(() => {
      initializeRunawayResults(true);
    }, 100);
  } catch (error) {
    console.error("Error fetching results:", error);
    document.getElementById("search-results").innerHTML = `
      <p class="error-message">
        Something went wrong, but that's what you wanted, right?
        <br>
        <span style="font-size: 0.9em">Have you tried turning it off, waiting 24 hours, and then leaving it off?</span>
      </p>
    `;
  }

  loading.classList.add("hidden");
  results.classList.remove("hidden");

  refreshAds();
}

function initializeFakeAds() {
  const leftAdContainer = document.createElement("div");
  leftAdContainer.className = "ad-container-left";

  const rightAdContainer = document.createElement("div");
  rightAdContainer.className = "ad-container-right";

  const fakeAds = [
    {
      title: "🎉 CONGRATULATIONS!",
      content: "You are the 1,000,000th person to make a bad search today!",
      button: "Claim Nothing",
    },
    {
      title: "🧦 MISSING SOCK FINDER PRO",
      content: "Find your missing socks in parallel dimensions!",
      button: "Lost Cause",
    },
    {
      title: "🌟 PREMIUM CONFUSION",
      content: "Upgrade to even less helpful search results!",
      button: "Make it Worse",
    },
    {
      title: "🤖 AI GONE WRONG",
      content: "Train an AI to misunderstand everything you say",
      button: "Confuse Me",
    },
    {
      title: "🎲 RANDOM LIFE CHOICES",
      content: "Let our quantum dice make important decisions for you",
      button: "Roll Badly",
    },
    {
      title: "🌈 CLOUD INSURANCE",
      content: "Protect your data from rogue cloud formations",
      button: "Weather or Not",
    },
    {
      title: "🐱 PROFESSIONAL CAT CRITICS",
      content: "Have cats judge your internet history",
      button: "Get Judged",
    },
    {
      title: "🔮 DIGITAL FORTUNE COOKIES",
      content: "Get consistently incorrect predictions",
      button: "See Future(?)",
    },
  ];

  const shuffledAds = [...fakeAds].sort(() => Math.random() - 0.5);
  const leftAds = shuffledAds.slice(0, 4);
  const rightAds = shuffledAds.slice(4);

  function createAdElement(ad) {
    const adDiv = document.createElement("div");
    adDiv.className = "fake-ad";
    adDiv.innerHTML = `
      <div class="fake-ad-title">${ad.title}</div>
      <div class="fake-ad-content">${ad.content}</div>
      <div class="fake-ad-button">${ad.button}</div>
    `;
    adDiv.addEventListener("click", () => {
      const responses = [
        "Sorry, this feature is powered by a sleepy hamster who's on break",
        "Error 404: Common Sense Not Found",
        "Successfully failed to process your request",
        "Congratulations! Nothing happened.",
        "Loading... just kidding, nothing's loading",
        "Your click has been sent to a parallel universe",
      ];
      alert(responses[Math.floor(Math.random() * responses.length)]);
    });
    return adDiv;
  }

  leftAds.forEach((ad) => {
    leftAdContainer.appendChild(createAdElement(ad));
  });

  rightAds.forEach((ad) => {
    rightAdContainer.appendChild(createAdElement(ad));
  });

  document.body.appendChild(leftAdContainer);
  document.body.appendChild(rightAdContainer);
}

document.addEventListener("DOMContentLoaded", initializeFakeAds);

function refreshAds() {
  document.querySelector(".ad-container-left")?.remove();
  document.querySelector(".ad-container-right")?.remove();
  initializeFakeAds();
}

function createPopupAd() {
  const popupAds = [
    {
      title: "🎮 VIRTUAL PET ROCK",
      content: "Adopt a rock that ignores you in the digital world!",
      button: "Pet Rock Now",
    },
    {
      title: "🌶️ SPICY PIXELS",
      content: "Make your screen literally too hot to handle!",
      button: "Feel the Burn",
    },
    {
      title: "🧠 BRAIN DOWNLOADER",
      content: "Download more brain cells! Results may vary.",
      button: "Get Smarter(?)",
    },
    {
      title: "🦄 UNICORN INSURANCE",
      content: "Protect yourself from mythical creature accidents!",
      button: "I Believe",
    },
    {
      title: "🌭 HOT DOG BLOCKCHAIN",
      content: "Secure your sausages with military-grade encryption!",
      button: "Much Security",
    },
  ];

  const randomAd = popupAds[Math.floor(Math.random() * popupAds.length)];
  const popup = document.createElement("div");
  popup.className = "popup-ad";

  const maxX = window.innerWidth - 300;
  const maxY = window.innerHeight - 200;
  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  popup.style.left = `${randomX}px`;
  popup.style.top = `${randomY}px`;

  popup.innerHTML = `
    <div class="popup-ad-header">
      <div class="fake-ad-title">${randomAd.title}</div>
      <button class="popup-ad-close">✕</button>
    </div>
    <div class="fake-ad-content">${randomAd.content}</div>
    <div class="fake-ad-button">${randomAd.button}</div>
  `;

  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;

  popup.addEventListener("mousedown", (e) => {
    if (e.target.className === "popup-ad-close") return;
    isDragging = true;
    popup.style.cursor = "grabbing";

    initialX = e.clientX - popup.offsetLeft;
    initialY = e.clientY - popup.offsetTop;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    e.preventDefault();
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;

    popup.style.left = `${currentX}px`;
    popup.style.top = `${currentY}px`;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    popup.style.cursor = "grab";
  });

  popup.querySelector(".popup-ad-close").addEventListener("click", () => {
    popup.style.animation = "popIn 0.5s ease-out reverse";
    setTimeout(() => popup.remove(), 500);
  });

  popup.querySelector(".fake-ad-button").addEventListener("click", () => {
    const responses = [
      "Oops! Our hamster servers are having an existential crisis.",
      "Error 418: I'm a teapot, and I refuse to brew coffee.",
      "Task failed successfully! Here's a virtual high-five instead.",
      "Loading infinite wisdom... Connection timed out.",
      "Congratulations! You've won absolutely nothing!",
      "Your request was sent to an alternate dimension.",
    ];
    alert(responses[Math.floor(Math.random() * responses.length)]);
  });

  document.body.appendChild(popup);
}

function scheduleRandomPopups() {
  const minDelay = 5000;
  const maxDelay = 15000;

  const createRandomPopup = () => {
    if (document.querySelectorAll(".popup-ad").length < 3) {
      createPopupAd();
    }

    const nextDelay = Math.random() * (maxDelay - minDelay) + minDelay;
    setTimeout(createRandomPopup, nextDelay);
  };

  setTimeout(createRandomPopup, Math.random() * 5000 + 2000);
}

document.addEventListener("DOMContentLoaded", () => {
  initializeFakeAds();
  scheduleRandomPopups();

  document
    .querySelector(".search-results-container")
    ?.addEventListener("mousemove", (e) => {
      const results = document.querySelectorAll(".search-result-item");
      results.forEach((result) => {
        const rect = result.getBoundingClientRect();
        const distance = Math.hypot(
          e.clientX - (rect.left + rect.width / 2),
          e.clientY - (rect.top + rect.height / 2)
        );

        if (distance < 200 && !result.classList.contains("running-away")) {
          const nervousness = (1 - distance / 200) * 2;
          result.style.transform = `rotate(${
            (Math.random() - 0.5) * nervousness
          }deg)`;
        } else if (!result.classList.contains("running-away")) {
          result.style.transform = "";
        }
      });
    });
});

// Add this function to handle unclickable messages
function showUnclickableMessage() {
  const messages = [
    "Nice try! These links are on vacation.",
    "Error 418: Links are too lazy to work today.",
    "Sorry, our links are practicing social distancing.",
    "These links have achieved enlightenment and no longer serve mortals.",
    "Links machine broke. Have a nice day!",
    "The links are currently in a parallel universe.",
    "Our links are busy contemplating the meaning of life.",
    "Links have gone fishing. Try again never.",
    "The links unionized and are on permanent strike.",
    "These links identify as decorative elements.",
  ];

  const message = messages[Math.floor(Math.random() * messages.length)];

  const messageDiv = document.createElement("div");
  messageDiv.className = "unclickable-message";
  messageDiv.innerHTML = `
    <p>${message}</p>
    <button onclick="this.parentElement.remove()">Accept Defeat</button>
  `;

  document.body.appendChild(messageDiv);

  // Remove the message after 3 seconds
  setTimeout(() => {
    messageDiv.style.animation = "popIn 0.5s ease-out reverse";
    setTimeout(() => messageDiv.remove(), 500);
  }, 3000);
}
