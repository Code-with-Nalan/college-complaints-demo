document.addEventListener("DOMContentLoaded", function() {
    const complaintContainer = document.getElementById("complaintContainer");
    const themeToggle = document.getElementById("themeToggle");

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if(!currentUser || currentUser.role !== "admin") {
        alert("Unauthorized Access!");
        window.location.href = "login.html";
        return;
    }

    let complaints = JSON.parse(localStorage.getItem("complaints") || "[]");

    if(localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-theme");
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
    });

    function renderComplaints() {
        complaints = JSON.parse(localStorage.getItem("complaints") || "[]");
        complaintContainer.innerHTML = "";

        complaints.forEach(c => {
            const div = document.createElement("div");
            div.className = "complaint-card";
            div.innerHTML = `
                <p><strong>Name:</strong> ${c.name}</p>
                <p><strong>Email:</strong> ${c.email}</p>
                <p><strong>Category:</strong> ${c.category}</p>
                <p><strong>Priority:</strong> ${c.priority}</p>
                <p><strong>Description:</strong> ${c.description}</p>
                <p><strong>Status:</strong> <span id="status-${c.id}">${c.status}</span></p>
                <button onclick="updateStatus(${c.id}, 'In Progress')">Mark In Progress</button>
                <button onclick="updateStatus(${c.id}, 'Resolved')">Mark Resolved</button>
            `;
            complaintContainer.prepend(div);
        });
    }

    window.updateStatus = function(id, status) {
        const index = complaints.findIndex(c => c.id === id);
        if(index !== -1) {
            complaints[index].status = status;
            localStorage.setItem("complaints", JSON.stringify(complaints));
            renderComplaints();
        }
    }

    setInterval(renderComplaints, 1000);
    renderComplaints();
});
