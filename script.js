document.addEventListener("DOMContentLoaded", function() {
    const complaintForm = document.getElementById("complaintForm");
    const complaintContainer = document.getElementById("complaintContainer");
    const themeToggle = document.getElementById("themeToggle");

    // Get current user
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if(!currentUser || currentUser.role !== "student") {
        alert("Unauthorized Access!");
        window.location.href = "login.html";
        return;
    }

    // Set name & email
    document.getElementById("name").value = currentUser.name;
    document.getElementById("email").value = currentUser.email;

    // Load complaints
    let complaints = JSON.parse(localStorage.getItem("complaints") || "[]");

    // Apply saved theme
    if(localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-theme");
    }

    // Theme toggle
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
    });

    // Submit complaint
    complaintForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const complaint = {
            id: Date.now(),
            name: currentUser.name,
            email: currentUser.email,
            category: document.getElementById("category").value,
            priority: document.getElementById("priority").value,
            description: document.getElementById("description").value.trim(),
            status: "Submitted",
            rating: 0
        };
        complaints.push(complaint);
        localStorage.setItem("complaints", JSON.stringify(complaints));

        // Reset form
        document.getElementById("category").value = "";
        document.getElementById("priority").value = "";
        document.getElementById("description").value = "";

        alert("Complaint submitted!");
        renderComplaints(); // Render immediately
    });

    // Render complaints
    function renderComplaints() {
        complaintContainer.innerHTML = "";
        complaints
            .filter(c => c.email === currentUser.email)
            .forEach(c => {
                const div = document.createElement("div");
                div.className = "complaint-card";
                div.innerHTML = `
                    <p><strong>Category:</strong> ${c.category}</p>
                    <p><strong>Priority:</strong> ${c.priority}</p>
                    <p><strong>Description:</strong> ${c.description}</p>
                    <p><strong>Status:</strong> ${c.status}</p>
                    ${c.status === "Resolved" ? `<p>Rate Response:
                        <select onchange="rateComplaint(${c.id}, this.value)">
                            <option value="">Select</option>
                            <option value="1">1 ⭐</option>
                            <option value="2">2 ⭐</option>
                            <option value="3">3 ⭐</option>
                            <option value="4">4 ⭐</option>
                            <option value="5">5 ⭐</option>
                        </select>
                    </p>` : ""}
                `;
                complaintContainer.prepend(div);
            });
    }

    // Rate complaint
    window.rateComplaint = function(id, value) {
        const index = complaints.findIndex(c => c.id === id);
        if(index !== -1) {
            complaints[index].rating = parseInt(value);
            localStorage.setItem("complaints", JSON.stringify(complaints));
            alert("Thank you for your feedback!");
        }
    };

    // Real-time render every 1s
    setInterval(renderComplaints, 1000);
    renderComplaints();
});
