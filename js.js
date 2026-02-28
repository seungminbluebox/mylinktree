// Modern Event Listeners
document.addEventListener("DOMContentLoaded", async () => {
  console.log("Profile Website Loaded Successfully");
  loadProjects();
});

async function loadProjects() {
  const container = document.getElementById("projects-container");
  if (!container) return;

  try {
    const response = await fetch("./projects.json");
    const data = await response.json();

    container.innerHTML = ""; // Clear loading state

    data.forEach((yearGroup) => {
      const yearSection = document.createElement("div");
      yearSection.className =
        "mb-12 last:mb-0 relative pl-4 sm:pl-8 border-l-2 border-blue-200";

      yearSection.innerHTML = `
                <div class="absolute -left-[9px] top-0 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-md"></div>
                <h3 class="text-xl font-bold text-slate-800 mb-6">${yearGroup.year}</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${yearGroup.projects
                      .map(
                        (project) => `
                        <a href="${project.url}" target="_blank"
                           class="btn-hover flex flex-col items-center bg-white/50 p-6 rounded-3xl border border-white shadow-sm hover:bg-white group transition-all">
                            <img class="w-16 h-16 mb-4 rounded-2xl shadow-md group-hover:rotate-3 transition-transform" 
                                 src="${project.img}" 
                                 onerror="this.src='img/information.png'">
                            <span class="text-sm font-bold text-slate-800 mb-1">${project.title}</span>
                            <p class="text-[11px] text-slate-500 line-clamp-2">${project.desc || ""}</p>
                        </a>
                    `,
                      )
                      .join("")}
                </div>
            `;
      container.appendChild(yearSection);
    });
  } catch (error) {
    console.error("Failed to load projects:", error);
    container.innerHTML = `<p class="text-xs text-red-400">프로젝트를 불러오는 중 오류가 발생했습니다.</p>`;
  }
}
