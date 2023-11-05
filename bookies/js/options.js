// Function to show the modal with a message
function showModal(message) {
    const modal = document.getElementById("customModal");
    const modalMessage = document.getElementById("modalMessage");
    modal.classList.remove("hidden");
    modalMessage.textContent = message;
  
    // Automatically hide the modal after a delay (e.g., 3000 milliseconds or 3 seconds)
    // setTimeout(function () {
    //   closeModal(); // Call the function to hide the modal
    // }, 5000); // Adjust the delay as needed
  }
  
  // Function to hide the modal
  function closeModal() {
    const modal = document.getElementById("customModal");
    modal.classList.add("hidden");
  }
  
  // Close the modal when the close button is clicked
  const closeModalButton = document.getElementById("closeModal");
  closeModalButton.addEventListener("click", closeModal);
  
  // Function to update the options/settings page with customLinks data
  function updateOptionsPage() {
      // Retrieve customLinks from storage.sync
      chrome.storage.sync.get(["customLinks"], function (data) {
          const customLinks = data.customLinks || {};
  
          // Populate the list of existing links dynamically
          const linkList = document.getElementById("linkList");
          linkList.innerHTML = ""; // Clear existing items
  
          for (const linkName in customLinks) {
              const listItem = document.createElement("li");
              const linkUrl = customLinks[linkName];
  
              // Create an anchor element to make it a clickable link
              const linkElement = document.createElement("a");
              linkElement.href = linkUrl;
              linkElement.textContent = linkName;
              linkElement.target = "_blank"; // Open links in a new tab
  
              // Append the anchor element to the list item
              listItem.appendChild(linkElement);
              linkList.appendChild(listItem);
          }
      });
  }
  
  // Call updateOptionsPage when the options page is loaded
  document.addEventListener("DOMContentLoaded", function () {
      updateOptionsPage();
  });
  
  // Listen for changes in the customLinks data
  chrome.storage.onChanged.addListener(function (changes, namespace) {
      if (namespace === "sync" && "customLinks" in changes) {
          updateOptionsPage();
      }
  });
  
  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
      if (message.customLinks) {
          updateOptionsPage(message); // Update the options/settings page with customLinks data
      } else {
          console.log("Received message:", message); // Add this line for debugging
      }
  });
  
  // Helper function to validate and fix URLs
  function fixUrl(url) {
      // Check if the URL starts with "http://" or "https://"
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
          // If not, assume it's an HTTP URL by default
          url = "http://" + url;
      }
      return url;
  }
  
  // Example code to add a new link with input validation:
  const addLinkButton = document.getElementById("addLink");
  addLinkButton.addEventListener("click", function () {
      const linkNameInput = document.getElementById("linkName");
      const linkUrlInput = document.getElementById("linkUrl");
  
      const newLinkName = linkNameInput.value.trim(); // Remove leading/trailing spaces
      let newLinkUrl = linkUrlInput.value.trim(); // Remove leading/trailing spaces
  
      if (newLinkName === "" || newLinkUrl === "") {
          showModal("Please provide both a link name and a valid URL.");
          return;
      }
  
      if (!isValidURL(newLinkUrl)) {
          showModal("Please enter a valid URL.");
          return;
      }
  
      newLinkUrl = fixUrl(newLinkUrl);
  
      chrome.runtime.sendMessage({ addLink: { name: newLinkName, url: newLinkUrl } });
  
      linkNameInput.value = "";
      linkUrlInput.value = "";
  
      updateOptionsPage();
  });
  
  // Function to validate a URL format
  function isValidURL(url) {
      const pattern = /^https?:\/\/.+/i; // Simple check for http/https at the beginning
      return pattern.test(url);
  }
  
  // Example code to update an existing link with input validation:
  const updateLinkButton = document.getElementById("updateLink");
  updateLinkButton.addEventListener("click", function () {
      const linkNameInput = document.getElementById("linkName");
      const linkUrlInput = document.getElementById("linkUrl");
  
      const linkNameToUpdate = linkNameInput.value.trim(); // Remove leading/trailing spaces
      let newLinkUrl = linkUrlInput.value.trim(); // Remove leading/trailing spaces
  
      if (linkNameToUpdate === "" || newLinkUrl === "") {
          showModal("Please provide both a link name and a valid URL.");
          return;
      }
  
      if (!isValidURL(newLinkUrl)) {
          showModal("Please enter a valid URL.");
          return;
      }
  
      newLinkUrl = fixUrl(newLinkUrl);
  
      chrome.runtime.sendMessage({ updateLink: { name: linkNameToUpdate, url: newLinkUrl } });
  
      linkNameInput.value = "";
      linkUrlInput.value = "";
  
      updateOptionsPage();
  });
  
  // Example code to delete an existing link:
  const deleteLinkButton = document.getElementById("deleteLink");
  deleteLinkButton.addEventListener("click", function () {
      const linkNameInput = document.getElementById("linkName");
      const linkNameToDelete = linkNameInput.value;
  
      if (linkNameToDelete === "") {
          showModal("Please provide a link name to delete.");
          return;
      }
  
      chrome.runtime.sendMessage({ deleteLink: { name: linkNameToDelete } });
  
      linkNameInput.value = "";
  
      updateOptionsPage();
  });  