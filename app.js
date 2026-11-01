const campusData = {
  north: {
    name: "North Campus",
    channels: ["General", "Student Support", "Events", "IT Helpdesk"],
    announcements: [
      "Library extended hours this week.",
      "Career fair starts Thursday at 10 AM.",
    ],
  },
  south: {
    name: "South Campus",
    channels: ["General", "Faculty Forum", "Transport", "Sports Club"],
    announcements: [
      "Shuttle schedule updated for winter term.",
      "Inter-campus tournament registration is open.",
    ],
  },
  west: {
    name: "West Campus",
    channels: ["General", "Research Hub", "Housing", "Health Services"],
    announcements: [
      "Research grant orientation this Friday.",
      "On-campus clinic now supports evening appointments.",
    ],
  },
};

const tenantSelect = document.getElementById("tenant-select");
const channelList = document.getElementById("channel-list");
const announcementList = document.getElementById("announcement-list");

function renderList(listElement, items) {
  listElement.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    listElement.appendChild(li);
  });
}

function renderTenant(tenantKey) {
  const tenant = campusData[tenantKey];
  if (!tenant) {
    return;
  }

  renderList(channelList, tenant.channels);
  renderList(announcementList, tenant.announcements);
}

function initTenantOptions() {
  Object.entries(campusData).forEach(([key, tenant]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = tenant.name;
    tenantSelect.appendChild(option);
  });
}

initTenantOptions();
renderTenant(Object.keys(campusData)[0]);

tenantSelect.addEventListener("change", (event) => {
  renderTenant(event.target.value);
});
