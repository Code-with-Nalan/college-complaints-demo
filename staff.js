const staffContainer=document.getElementById("staffComplaintContainer");
const themeToggle=document.getElementById("themeToggle");
let complaints=JSON.parse(localStorage.getItem("complaints")||"[]");

themeToggle.addEventListener("click",()=>{document.body.classList.toggle("dark-theme");});

function renderStaff(){
  staffContainer.innerHTML="";
  complaints.forEach(c=>{
    const div=document.createElement("div");
    div.className="complaint-card";
    div.innerHTML=`
      <p><strong>Name:</strong> ${c.name}</p>
      <p><strong>Category:</strong> ${c.category}</p>
      <p><strong>Priority:</strong> ${c.priority}</p>
      <p><strong>Description:</strong> ${c.description}</p>
      <p><strong>Status:</strong> <span id="status-${c.id}">${c.status}</span></p>
      <button onclick="updateStatus(${c.id},'In Progress')">Mark In Progress</button>
      <button onclick="updateStatus(${c.id},'Resolved')">Mark Resolved</button>
    `;
    if(c.priority==="Urgent") div.style.border="2px solid red";
    staffContainer.appendChild(div);
  });
}

function updateStatus(id,status){
  const index=complaints.findIndex(c=>c.id===id);
  if(index!==-1){
    complaints[index].status=status;
    localStorage.setItem("complaints",JSON.stringify(complaints));
    alert(`Notification: ${complaints[index].name}, your complaint is now ${status}`);
    renderStaff();
  }
}

renderStaff();
setInterval(renderStaff,1000);
