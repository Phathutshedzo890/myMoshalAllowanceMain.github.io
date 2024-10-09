// Toggle the sidebar
function toggleNav() {
    const sidenav = document.getElementById("mySidenav");
    if (sidenav.style.width === "250px") {
      sidenav.style.width = "0";
      document.querySelector(".content").style.marginLeft = "0";
    } else {
      sidenav.style.width = "250px";
      document.querySelector(".content").style.marginLeft = "250px";
    }
  }
  
  // Function to switch between sections
  function switchSection(sectionId) {
    const sections = document.querySelectorAll(".section");
    sections.forEach(section => section.classList.remove("active"));
    document.getElementById(sectionId).classList.add("active");
  }
  
  // Event listeners for sidebar navigation
  document.getElementById("allowanceLink").addEventListener("click", function() {
    switchSection("allowanceSection");
  });
  
  document.getElementById("profileLink").addEventListener("click", function() {
    switchSection("profileSection");
  });
  
  document.getElementById("documentsLink").addEventListener("click", function() {
    switchSection("documentsSection");
  });
  
  document.getElementById("messagesLink").addEventListener("click", function() {
    switchSection("messagesSection");
  });
  