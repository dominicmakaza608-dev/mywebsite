const content = window.siteContent;
const journalState = {
  activeTag: "All",
  activeArchive: "All",
  updates: []
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    return entities[character];
  });
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function setImage(id, src, alt) {
  const element = document.getElementById(id);
  if (element) {
    element.src = src;
    element.alt = alt;
  }
}

function clearChildren(id) {
  const element = document.getElementById(id);
  if (element) {
    element.replaceChildren();
  }
  return element;
}

function renderCollection(id, items, factory) {
  const root = clearChildren(id);
  if (!root) {
    return;
  }

  items.forEach((item) => {
    root.appendChild(factory(item));
  });
}

function createFactCard(item) {
  const card = document.createElement("div");
  card.className = "fact-chip";
  card.innerHTML = `
    <div class="fact-label">${item.label}</div>
    <div class="fact-value">${item.value}</div>
  `;
  return card;
}

function createStatCard(item) {
  const card = document.createElement("div");
  card.className = "stat-card";
  card.innerHTML = `
    <div class="stat-label">${item.label}</div>
    <div class="stat-value">${item.value}</div>
  `;
  return card;
}

function createContactCard(item) {
  const wrapper = document.createElement("div");
  wrapper.className = "contact-item";

  const label = document.createElement("div");
  label.className = "contact-label";
  label.textContent = item.label;

  const value = item.href ? document.createElement("a") : document.createElement("span");
  value.className = "contact-value";
  value.textContent = item.value;

  if (item.href) {
    value.href = item.href;
    value.target = item.href.startsWith("http") ? "_blank" : "_self";
    value.rel = item.href.startsWith("http") ? "noreferrer" : "";
  }

  wrapper.append(label, value);
  return wrapper;
}

function createSocialLink(item) {
  const link = document.createElement("a");
  link.className = "social-link";
  link.href = item.href;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.innerHTML = `
    <span class="social-platform">${escapeHtml(item.label)}</span>
    <span class="social-handle">${escapeHtml(item.handle)}</span>
  `;
  return link;
}

function createTimelineItem(item) {
  const card = document.createElement("article");
  card.className = "timeline-item";
  card.innerHTML = `
    <div class="timeline-meta">${item.period}</div>
    <h3 class="timeline-title">${item.title}</h3>
    <p class="timeline-description">${item.description}</p>
  `;
  return card;
}

function createPhotoCard(item) {
  const card = document.createElement("article");
  card.className = "gallery-card";
  card.innerHTML = `
    <img src="${item.image}" alt="${item.title}">
    <div class="gallery-caption">
      <strong>${item.title}</strong>
    </div>
  `;
  return card;
}

function createDocumentCard(item) {
  const card = document.createElement("article");
  card.className = "document-card";
  card.innerHTML = `
    <div class="document-meta">${item.type}</div>
    <h3 class="document-title">${item.title}</h3>
    <p class="document-description">${item.description}</p>
    <div class="document-actions">
      <a class="button button-primary" href="${item.file}" target="_blank" rel="noreferrer">Open</a>
      <a class="text-link" href="${item.file}" download>Download</a>
    </div>
  `;
  return card;
}

function getUpdateDate(item) {
  const date = new Date(`${item.date}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatReadableDate(date, fallback) {
  return date ? new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(date) : fallback;
}

function formatArchiveKey(item) {
  const date = getUpdateDate(item);
  if (!date) {
    return item.date;
  }

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function formatArchiveLabel(key) {
  const match = /^(\d{4})-(\d{2})$/.exec(key);
  if (!match) {
    return key;
  }

  const year = Number(match[1]);
  const monthIndex = Number(match[2]) - 1;
  const date = new Date(year, monthIndex, 1);
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(date);
}

function getUpdateTags(item) {
  return Array.from(new Set([item.tag, ...(item.tags || [])].filter(Boolean)));
}

function sortUpdatesByDate(items) {
  return [...items].sort((left, right) => {
    const leftDate = getUpdateDate(left);
    const rightDate = getUpdateDate(right);

    if (leftDate && rightDate) {
      return rightDate - leftDate;
    }

    if (rightDate) {
      return 1;
    }

    if (leftDate) {
      return -1;
    }

    return 0;
  });
}

function createTopicsMarkup(item) {
  const topics = getUpdateTags(item)
    .map((topic) => `<span class="topic-chip">${escapeHtml(topic)}</span>`)
    .join("");

  return topics ? `<div class="update-topics">${topics}</div>` : "";
}

function createAttachmentMarkup(attachments) {
  return (attachments || [])
    .map((attachment) => `<a class="attachment-link" href="${escapeHtml(attachment.href)}" target="_blank" rel="noreferrer">${escapeHtml(attachment.label)}</a>`)
    .join("");
}

function createUpdateCard(item) {
  const card = document.createElement("article");
  card.className = "update-card";

  const date = getUpdateDate(item);
  const day = date ? new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(date) : item.date;
  const month = date ? new Intl.DateTimeFormat("en-US", { month: "short" }).format(date) : "";
  const year = date ? new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(date) : "";
  const readableDate = formatReadableDate(date, item.date);

  const highlightsMarkup = (item.highlights || [])
    .map((highlight) => `<span class="update-highlight">${escapeHtml(highlight)}</span>`)
    .join("");

  const mediaMarkup = item.image
    ? `<div class="update-media"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}"></div>`
    : "";

  const leadMarkup = item.lead ? `<p class="update-lead">${escapeHtml(item.lead)}</p>` : "";
  const moodMarkup = item.mood ? `<div class="update-mood">${escapeHtml(item.mood)}</div>` : "";
  const monthMarkup = month ? `<div class="update-month">${month}</div>` : "";
  const yearMarkup = year ? `<div class="update-year">${year}</div>` : "";
  const highlightsSection = highlightsMarkup ? `<div class="update-highlights">${highlightsMarkup}</div>` : "";
  const attachmentsMarkup = createAttachmentMarkup(item.attachments);
  const attachmentsSection = attachmentsMarkup ? `<div class="update-attachments">${attachmentsMarkup}</div>` : "";

  card.innerHTML = `
    <div class="update-side">
      <div class="update-date">${escapeHtml(readableDate)}</div>
      <div class="update-day">${escapeHtml(day)}</div>
      ${monthMarkup}
      ${yearMarkup}
    </div>
    <div class="update-main">
      <div class="update-header">
        <div class="update-header-main">
          <div class="update-tag">${escapeHtml(item.tag)}</div>
          <h3 class="update-title">${escapeHtml(item.title)}</h3>
        </div>
        ${moodMarkup}
      </div>
      ${leadMarkup}
      <p class="update-body">${escapeHtml(item.body)}</p>
      ${createTopicsMarkup(item)}
      ${highlightsSection}
      ${mediaMarkup}
      ${attachmentsSection}
    </div>
  `;
  return card;
}

function createFilterChip(label, isActive, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `filter-chip${isActive ? " is-active" : ""}`;
  button.textContent = label;
  button.addEventListener("click", onClick);
  return button;
}

function createFeaturedPost(item, label) {
  const article = document.createElement("article");
  article.className = "featured-post";
  article.id = "featuredPost";

  if (!item) {
    article.classList.add("empty-state");
    article.innerHTML = `
      <p class="featured-label">${escapeHtml(label || "Featured Entry")}</p>
      <h3 class="featured-title">No journal entry matches this filter yet</h3>
      <p class="featured-summary">Choose another tag or month, or add a new entry in content.js to keep the feed moving.</p>
    `;
    return article;
  }

  const date = getUpdateDate(item);
  const readableDate = formatReadableDate(date, item.date);
  const topicsMarkup = getUpdateTags(item)
    .map((topic) => `<span class="topic-chip">${escapeHtml(topic)}</span>`)
    .join("");
  const attachmentsMarkup = createAttachmentMarkup(item.attachments);
  const mediaMarkup = item.image
    ? `<div class="featured-media"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}"></div>`
    : "";
  const moodMarkup = item.mood ? `<span class="update-mood">${escapeHtml(item.mood)}</span>` : "";
  const attachmentsSection = attachmentsMarkup ? `<div class="update-attachments">${attachmentsMarkup}</div>` : "";

  article.innerHTML = `
    <div class="featured-copy">
      <p class="featured-label">${escapeHtml(label || "Featured Entry")}</p>
      <div class="featured-meta">
        <span class="update-tag">${escapeHtml(item.tag)}</span>
        ${moodMarkup}
      </div>
      <h3 class="featured-title">${escapeHtml(item.title)}</h3>
      <p class="featured-date">${escapeHtml(readableDate)}</p>
      <p class="featured-summary">${escapeHtml(item.lead || item.body)}</p>
      <p class="update-body">${escapeHtml(item.body)}</p>
      <div class="featured-taxonomy">${topicsMarkup}</div>
      ${attachmentsSection}
    </div>
    ${mediaMarkup}
  `;
  return article;
}

function getArchiveItems(updates) {
  const archiveMap = new Map();

  updates.forEach((item) => {
    const key = formatArchiveKey(item);
    const current = archiveMap.get(key) || { key, count: 0 };
    current.count += 1;
    archiveMap.set(key, current);
  });

  return Array.from(archiveMap.values()).sort((left, right) => right.key.localeCompare(left.key));
}

function getTagItems(updates) {
  const tagMap = new Map();

  updates.forEach((item) => {
    getUpdateTags(item).forEach((tag) => {
      const current = tagMap.get(tag) || { tag, count: 0 };
      current.count += 1;
      tagMap.set(tag, current);
    });
  });

  return Array.from(tagMap.values()).sort((left, right) => left.tag.localeCompare(right.tag));
}

function filterUpdates(updates) {
  return updates.filter((item) => {
    const matchesTag = journalState.activeTag === "All" || getUpdateTags(item).includes(journalState.activeTag);
    const matchesArchive = journalState.activeArchive === "All" || formatArchiveKey(item) === journalState.activeArchive;
    return matchesTag && matchesArchive;
  });
}

function getResultsMessage(filteredCount, totalCount) {
  if (!filteredCount) {
    return "No entries match the current filters.";
  }

  const parts = [`Showing ${filteredCount} of ${totalCount} journal entries`];

  if (journalState.activeTag !== "All") {
    parts.push(`tagged ${journalState.activeTag}`);
  }

  if (journalState.activeArchive !== "All") {
    parts.push(`from ${formatArchiveLabel(journalState.activeArchive)}`);
  }

  return `${parts.join(" ")}.`;
}

function renderFeaturedAndUpdates(filteredUpdates) {
  const featuredRoot = clearChildren("featuredPost");
  const updatesRoot = clearChildren("updatesList");
  if (!featuredRoot || !updatesRoot) {
    return;
  }

  const featuredEntry = filteredUpdates.find((item) => item.featured) || filteredUpdates[0] || null;
  featuredRoot.replaceWith(createFeaturedPost(featuredEntry, content.journal?.featuredLabel));

  const remainingEntries = filteredUpdates.filter((item) => item !== featuredEntry);

  if (!remainingEntries.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.innerHTML = `
      <h3 class="featured-title">Featured entry is the only match right now</h3>
      <p class="featured-summary">Add another day to this month or switch filters to see more journal posts in the feed below.</p>
    `;
    updatesRoot.appendChild(empty);
    return;
  }

  remainingEntries.forEach((item) => {
    updatesRoot.appendChild(createUpdateCard(item));
  });
}

function renderJournalFilters(allUpdates) {
  const tagRoot = clearChildren("journalTags");
  const archiveRoot = clearChildren("journalArchives");

  if (tagRoot) {
    tagRoot.appendChild(createFilterChip("All Tags", journalState.activeTag === "All", () => {
      journalState.activeTag = "All";
      renderJournal();
    }));

    getTagItems(allUpdates).forEach((item) => {
      const label = `${item.tag} (${item.count})`;
      tagRoot.appendChild(createFilterChip(label, journalState.activeTag === item.tag, () => {
        journalState.activeTag = item.tag;
        renderJournal();
      }));
    });
  }

  if (archiveRoot) {
    archiveRoot.appendChild(createFilterChip("All Months", journalState.activeArchive === "All", () => {
      journalState.activeArchive = "All";
      renderJournal();
    }));

    getArchiveItems(allUpdates).forEach((item) => {
      const label = `${formatArchiveLabel(item.key)} (${item.count})`;
      archiveRoot.appendChild(createFilterChip(label, journalState.activeArchive === item.key, () => {
        journalState.activeArchive = item.key;
        renderJournal();
      }));
    });
  }
}

function renderJournal() {
  const filteredUpdates = filterUpdates(journalState.updates);
  renderJournalFilters(journalState.updates);
  renderFeaturedAndUpdates(filteredUpdates);

  const resultsMeta = document.getElementById("journalResultsMeta");
  if (resultsMeta) {
    resultsMeta.textContent = getResultsMessage(filteredUpdates.length, journalState.updates.length);
  }
}

function initSite() {
  const { profile, timeline, photos, documents, journal, updates } = content;

  setText("brandName", profile.name);
  setText("heroName", profile.name);
  setText("heroRole", profile.role);
  setText("heroSummary", profile.summary);
  setText("aboutText", profile.about);
  setText("journalIntro", journal?.intro || "");
  setImage("profileImage", profile.image, profile.name);

  const primaryDocument = documents[0];
  const primaryDocumentLink = document.getElementById("primaryDocumentLink");
  if (primaryDocumentLink && primaryDocument) {
    primaryDocumentLink.href = primaryDocument.file;
  }

  renderCollection("quickFacts", profile.facts, createFactCard);
  renderCollection("statsGrid", profile.stats, createStatCard);
  renderCollection("socialLinks", profile.socials || [], createSocialLink);
  renderCollection("contactList", profile.contacts, createContactCard);
  renderCollection("timelineList", timeline, createTimelineItem);
  renderCollection("photoGallery", photos, createPhotoCard);
  renderCollection("documentGrid", documents, createDocumentCard);
  renderCollection("journalPromptList", journal?.prompts || [], (prompt) => {
    const card = document.createElement("div");
    card.className = "journal-prompt";
    card.textContent = prompt;
    return card;
  });

  journalState.updates = sortUpdatesByDate(updates);
  renderJournal();
}

initSite();

/* ========================================================= */
/*                   INTERACTIVITY & FORM HANDLING           */
/* ========================================================= */

// 1. Scroll Reveal Animations
function reveal() {
  const reveals = document.querySelectorAll(".reveal");
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 100;
    
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}
window.addEventListener("scroll", reveal);
reveal(); // Trigger on load

// 2. Contact Form with Bot Screening (Turnstile)
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const status = document.getElementById("formStatus");
    
    // Check if Cloudflare Turnstile token exists
    const formData = new FormData(contactForm);
    const turnstileResponse = formData.get("cf-turnstile-response");
    
    if (!turnstileResponse) {
      status.textContent = "Please complete the security check.";
      status.className = "form-status error";
      return;
    }

    // Actual fetch() request to Formspree
    status.textContent = "Sending message...";
    status.className = "form-status";
    
    const FORMSPREE_URL = 'https://formspree.io/f/xkokyqlg';
    
    fetch(FORMSPREE_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        status.textContent = "Message sent successfully! I'll get back to you soon.";
        status.className = "form-status success";
        contactForm.reset();
        
        // Reset Turnstile widget
        if (typeof turnstile !== "undefined") {
          turnstile.reset();
        }
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            status.textContent = data["errors"].map(error => error["message"]).join(", ");
          } else {
            status.textContent = "Oops! There was a problem submitting your form.";
          }
          status.className = "form-status error";
        });
      }
    })
    .catch(error => {
      status.textContent = "Oops! There was a problem submitting your form.";
      status.className = "form-status error";
    });
  });
}
