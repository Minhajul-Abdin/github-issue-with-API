const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBTn = document.getElementById("closed-btn");
const countNum = document.getElementById("count");
const containerForIssues = document.getElementById("issue-container");
const loading = document.getElementById("loading");

function showLoading(){
    loading.classList.remove("hidden");
    containerForIssues.innerHTML = "";
}

function hideLoading(){
    loading.classList.add("hidden");
}


/*const allIssue = ()=>{
    showLoading();
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json()).then((issues) => displayAllIssue(issues.data));
    
}
    */

const allIssue = async () => {
  showLoading();

  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const issues = await res.json();

  displayAllIssue(issues.data);

  return issues.data;
};


const displayAllIssue = (issues) => {
    const containerForIssues = document.getElementById("issue-container");
    containerForIssues.innerHTML = "";

    for(let issue of issues){
        const div = document.createElement("div");
        div.innerHTML = `
        <div onclick="loadIssueDeatails(${issue.id})" id="issue-card" class="cursor-pointer p-5 border-t-3 rounded-lg
        ${issue.status === "open" ? "border-green-400" : "border-purple-400" }  shadow-md">
          <div class="state flex justify-between">
            <img
              class="p-1 rounded-full ${issue.status === "open" ? "border-green-200" : "border-purple-200" }" 
              src="${issue.status === "open" ? "./B13-A5-Github-Issue-Tracker/assets/Open-Status.png" :
               "./B13-A5-Github-Issue-Tracker/assets/Closed- Status .png" }" alt=""/>
            <h3
              class="text-xs uppercase ${issue.priority === "high" ? "text-[#EF4444] bg-[#FEECEC]" : (issue.priority === "low") ? "text-[#9CA3AF] bg-[#EEEFF2]" : "text-[#F59E0B] bg-[#FFF6D1]"}
              px-3 py-2 rounded-3xl"
            >
              ${issue.priority}
            </h3>
          </div>
          <div class="info">
            <h3 class="font-semibold text-sm py-2">
              ${issue.title}
            </h3>
            <p class="text-xs line-clamp-2 text-[#64748B]">
              ${issue.description}
            </p>
            <div id="labels" class="py-3">
              ${createLabels(issue.labels)}
            </div>
          </div>
          <hr class="w-full m-auto border-[#d4c9c9d5] rounded-none" />
          <div class="more-info text-[#64748B] text-xs pt-2">
            <p>#<span>${issue.id}</span> by <span>${issue.author}</span></p>
            <p class="pt-2">${issue.createdAt}</p>
          </div>
        </div>`

        containerForIssues.appendChild(div);
    }
    hideLoading();
    countNum.innerText = containerForIssues.children.length;
}



const loadIssueDeatails = async (id) =>{
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const det = await res.json();
    displayIssueDetails(det.data);
};

const displayIssueDetails = (issue) => {
    const detailsContainer = document.getElementById("detail-con");
    detailsContainer.innerHTML = `<h3 class=" text-2xl font-bold py-2">${issue.title}</h3>
          <div class="cardinfo mt-1 mb-5">
            <p><span class="${issue.status === "open" ? "bg-green-700" : "bg-purple-700" } text-white text-sm px-2 py-1 rounded-3xl">${issue.status}</span>
            • Opened by ${issue.author} • ${issue.createdAt}</p>
          </div>
          <div id="labels" class="py-3">${createLabels(issue.labels)}</div>
          <p class="text-sm pb-3 text-[#64748B]">${issue.description}</p>
          <div class="flex justify-between bg-gray-50 p-7">
            <div class="assignee w-[50%]">
              <p class="text-xs pb-1 text-[#64748B]">Assignee:</p>
              <h4 class="font-semibold">${issue.assignee ? issue.assignee : "No Assignee Yet"}</h4>
            </div>
            <div class="priprity w-[50%]">
              <p class="text-xs pb-1 text-[#64748B]">Priority:</p>
              <span class="${issue.priority === "high" ? "text-[#EF4444] bg-[#FEECEC]" : (issue.priority === "low") ? "text-[#9CA3AF] bg-[#EEEFF2]" : "text-[#F59E0B] bg-[#FFF6D1]"} text-sm rounded-3xl px-2 py-1 ">${issue.priority}</span>
            </div>
          </div>`;
    document.getElementById("my_modal_5").showModal();
};


const createLabels = (arry) =>{
    const element = arry.map((el) => `<span class="font-semibold uppercase p-2 text-[10px] rounded-full ${el === "help wanted" ? "bg-[#FFF8DB] text-[#D97706]" : el === "bug" ? "bg-[#FEECEC] text-[#EF4444]" : el === "enhancement" ? "bg-green-100 text-green-500" :el === "good first issue" ? "bg-purple-100 text-purple-500" : "bg-sky-100 text-sky-500"}">
    ${el === "help wanted" ? "<i class='fa-solid fa-hand-holding-hand'></i>" : el === "bug" ? "<i class='fa-solid fa-bug'></i>" : el === "enhancement" ? "<i class='fa-solid fa-wand-magic-sparkles'></i>" :el === "good first issue" ? "<i class='fa-solid fa-plug-circle-exclamation'></i>" : "<i class='fa-solid fa-file-circle-exclamation'></i>"}
     ${el}</span>`);
    return element.join(" ");
}

async function toggleBtn(id){
    allBtn.classList.remove("btn-primary","text-white");
    openBtn.classList.remove("btn-primary","text-white");
    closedBTn.classList.remove("btn-primary","text-white");

    allBtn.classList.add("bg-white","text-[#64748B]");
    openBtn.classList.add("bg-white","text-[#64748B]");
    closedBTn.classList.add("bg-white","text-[#64748B]");

    const selectedId = document.getElementById(id);
    selectedId.classList.remove("bg-white");
    selectedId.classList.add("btn-primary","text-white");

    selectedIdText = id;
    const data = await allIssue();
    if(id === "all-btn"){
            displayAllIssue(data);
    }else if(id === "open-btn"){
        const filterData = data.filter(data => data.status == "open");
         displayAllIssue(filterData);
    }
    else{
        const filterData = data.filter(data => data.status == "closed");
         displayAllIssue(filterData);
    }

    countNum.innerText = containerForIssues.children.length;
}

document.getElementById("search-btn").addEventListener("click",()=>{
  const input = document.getElementById("search-input");
  const inputValue = input.value.trim().toLowerCase();

  allBtn.classList.remove("btn-primary","text-white");
  openBtn.classList.remove("btn-primary","text-white");
  closedBTn.classList.remove("btn-primary","text-white");

  allBtn.classList.add("bg-white","text-[#64748B]");
  openBtn.classList.add("bg-white","text-[#64748B]");
  closedBTn.classList.add("bg-white","text-[#64748B]");

  showLoading()

  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
  .then((res) => res.json())
  .then((data) => {
    const allIssueData = data.data;
    const filterIssues = allIssueData.filter(issue => issue.title.toLowerCase().includes(inputValue));
    displayAllIssue(filterIssues);
  })
})

allIssue();