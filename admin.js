const adminContainer=document.getElementById("adminComplaintContainer");
const chartCanvas=document.getElementById("chart");
const themeToggle=document.getElementById("themeToggle");
let complaints=JSON.parse(localStorage.getItem("complaints")||"[]");

themeToggle.addEventListener("click",()=>{document.body.classList.toggle("dark-theme");});

function renderAdmin(){
  adminContainer.innerHTML="";
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
    adminContainer.appendChild(div);
  });
  renderChart();
}

function updateStatus(id,status){
  const index=complaints.findIndex(c=>c.id===id);
  if(index!==-1){
    complaints[index].status=status;
    localStorage.setItem("complaints",JSON.stringify(complaints));
    alert(`Notification: ${complaints[index].name}, your complaint is now ${status}`);
    renderAdmin();
  }
}

function renderChart(){
  const categories={};
  complaints.forEach(c=>{
    categories[c.category]=categories[c.category]?categories[c.category]+1:1;
  });
  if(window.myChart) window.myChart.destroy();
  const ctx=chartCanvas.getContext("2d");
  window.myChart=new Chart(ctx,{
    type:"bar",
    data:{
      labels:Object.keys(categories),
      datasets:[{
        label:"# of Complaints",
        data:Object.values(categories),
        backgroundColor:"rgba(124,58,237,0.7)"
      }]
    },
    options:{responsive:true}
  });
}

renderAdmin();
setInterval(renderAdmin,1000);
