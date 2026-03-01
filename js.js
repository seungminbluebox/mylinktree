// Modern Event Listeners
document.addEventListener("DOMContentLoaded", async () => {
  console.log("Profile Website Loaded Successfully");
  await loadProjects();
  setupModal();
});

let projectsData = [];

async function loadProjects() {
  const container = document.getElementById("projects-container");
  if (!container) return;

  try {
    const response = await fetch("projects.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    projectsData = await response.json();

    container.innerHTML = ""; // Clear loading state

    projectsData.forEach((yearGroup) => {
      const yearSection = document.createElement("div");
      yearSection.className =
        "mb-12 last:mb-0 relative pl-4 sm:pl-8 border-l-2 border-blue-200";

      yearSection.innerHTML = `
                <div class="absolute -left-[9px] top-0 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-md"></div>
                <h3 class="text-xl font-bold text-slate-800 mb-6">${yearGroup.year}</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${yearGroup.projects
                      .map(
                        (project, index) => `
                        <div class="flex flex-col items-center bg-white/50 p-6 rounded-3xl border border-white shadow-sm hover:bg-white transition-all group">
                            <div class="relative cursor-pointer mb-4 overflow-hidden rounded-2xl group/img" onclick="openProjectDetails('${yearGroup.year}', ${index})">
                                <img class="w-16 h-16 shadow-md group-hover/img:scale-110 group-hover/img:rotate-3 transition-transform" 
                                     src="${project.img}" 
                                     onerror="this.src='./img/information.png'">
                                <div class="absolute inset-0 bg-blue-500/0 group-hover/img:bg-blue-500/20 flex items-center justify-center transition-all">
                                    <span class="text-white opacity-0 group-hover/img:opacity-100 text-[10px] font-bold">Detail View</span>
                                </div>
                            </div>
                            <span class="text-sm font-bold text-slate-800 mb-1 leading-tight">${project.title}</span>
                            <p class="text-[11px] text-slate-500 line-clamp-2 mb-4 text-center leading-relaxed h-8">${project.desc || ""}</p>
                            
                            <div class="flex gap-2 w-full mt-auto">
                                ${
                                  project.repo
                                    ? `
                                    <a href="${project.repo}" target="_blank" 
                                       class="flex-1 flex items-center justify-center gap-1 py-1.5 px-3 bg-slate-800 text-white rounded-xl text-[9px] font-bold hover:bg-slate-700 transition-colors">
                                        Repo
                                    </a>
                                `
                                    : ""
                                }
                                ${
                                  project.demo
                                    ? `
                                    <a href="${project.demo}" target="_blank" 
                                       class="flex-1 flex items-center justify-center gap-1 py-1.5 px-3 bg-blue-500 text-white rounded-xl text-[9px] font-bold hover:bg-blue-600 transition-colors">
                                        🚀 web site
                                    </a>
                                `
                                    : ""
                                }
                            </div>
                        </div>
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

function setupModal() {
  const modal = document.getElementById("project-modal");
  const closeBtn = document.getElementById("close-modal");

  const hidePanel = () => {
    modal.classList.add("opacity-0", "translate-y-4");
    setTimeout(() => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.body.style.overflow = ""; // Restore scroll
    }, 500);
  };

  if (closeBtn) closeBtn.onclick = hidePanel;
}

window.openProjectDetails = (year, index) => {
  const yearGroup = projectsData.find((y) => y.year === year);
  if (!yearGroup) return;

  const project = yearGroup.projects[index];
  if (!project) return;

  const modal = document.getElementById("project-modal");
  const content = document.getElementById("modal-content");
  const scrollContainer = document.getElementById("modal-scroll-container");

  const details = project.details || {
    overview: "프로젝트 상세 정보를 준비 중입니다.",
    stack: ["Soon"],
    features: ["Updating..."],
    gallery: [],
  };

  content.innerHTML = `
        <!-- Project Hero Section -->
        <section class="flex flex-col items-center text-center gap-8">
            <div class="relative group">
                <div class="absolute inset-0 bg-blue-500 rounded-[3rem] blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <img src="${project.img}" class="relative w-40 h-40 md:w-56 md:h-56 rounded-[3.5rem] shadow-2xl border-8 border-white object-cover transform hover:scale-105 transition-transform duration-700" />
            </div>
            
            <div class="space-y-6 max-w-2xl">
                <div class="flex items-center justify-center gap-3">
                    <span class="px-4 py-1.5 bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-[0.2em] rounded-full border border-blue-100">${year} ARCHIVE</span>
                    <span class="px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg shadow-slate-200">Solo Project</span>
                </div>
                <h2 class="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">${project.title}</h2>
                <p class="text-slate-400 text-sm md:text-base font-medium tracking-wide italic">"${project.desc || "Digital Experience Design"}"</p>
                
                <div class="flex flex-wrap justify-center gap-4 pt-6">
                    ${project.repo ? `<a href="${project.repo}" target="_blank" class="flex-1 sm:flex-none flex items-center justify-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-[2rem] text-xs font-black hover:bg-slate-800 hover:-translate-y-1 transition-all shadow-2xl">GITHUB REPOSITORY</a>` : ""}
                    ${project.demo ? `<a href="${project.demo}" target="_blank" class="flex items-center gap-3 px-10 py-5 bg-blue-500 text-white rounded-[2rem] text-xs font-black hover:bg-blue-600 hover:-translate-y-1 transition-all shadow-2xl shadow-blue-500/20">LIVE EXPERIENCE</a>` : ""}
                </div>
            </div>
        </section>

        <!-- Gallery Section (Hidden if empty) -->
        ${
          details.gallery && details.gallery.length > 0
            ? `
        <section class="space-y-12 overflow-hidden -mx-6 px-6">
            <div class="flex items-center justify-between px-6">
                <div class="flex items-center gap-2">
                    <span class="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                    <label class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Visual Archive</label>
                </div>
                <div class="flex items-center gap-4">
                    <span class="text-[9px] font-bold text-slate-300 uppercase tracking-widest animate-pulse">Auto Scroll Active</span>
                    <div class="flex gap-1.5">
                        <div class="w-1 h-1 rounded-full bg-blue-400 animate-bounce" style="animation-delay: 0s"></div>
                        <div class="w-1 h-1 rounded-full bg-blue-400 animate-bounce" style="animation-delay: 0.1s"></div>
                    </div>
                </div>
            </div>
            
            <div class="relative group/carousel overflow-hidden">
                <div class="animate-gallery flex gap-8 py-4">
                    <!-- Original + Duplicated for Seamless loop -->
                    ${[...details.gallery, ...details.gallery]
                      .map(
                        (item) => `
                        <div class="flex-shrink-0 w-[300px] md:w-[600px] group/item">
                            <div class="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 bg-slate-50 transition-all duration-700 hover:shadow-blue-200/50">
                                <img src="${item.src}" alt="${
                                  item.caption || "Project Image"
                                }" class="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-1000 ease-out" />
                                ${
                                  item.caption && item.caption !== "undefined"
                                    ? `
                                    <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 md:p-12 translate-y-2 group-hover/item:translate-y-0 transition-transform">
                                        <p class="text-white text-sm md:text-base font-bold leading-relaxed opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 delay-100 italic">
                                            "${item.caption}"
                                        </p>
                                    </div>
                                `
                                    : ""
                                }
                            </div>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            </div>
        </section>
        `
            : ""
        }

        <!-- Deep Dive Section -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
            <!-- Left: Sidebar Info -->
            <aside class="md:col-span-4 space-y-12">
                <div class="space-y-6">
                    <h4 class="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em] border-b border-slate-100 pb-4">Technologies</h4>
                    <div class="flex flex-wrap gap-2">
                        ${details.stack.map((s) => `<span class="px-4 py-2 bg-slate-50 text-slate-600 text-[11px] font-bold rounded-xl border border-slate-100">${s}</span>`).join("")}
                    </div>
                </div>
                <div class="p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 space-y-4">
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <h4 class="text-[11px] font-black text-slate-400 uppercase tracking-widest">Development Status</h4>
                    </div>
                    <p class="text-xs font-bold text-slate-800 leading-relaxed">
                        전 과정을 직접 기획하고 개발한 개인 프로젝트(1인 개발)이며, 디자인 시스템부터 인프라 구축까지 독립적으로 수행되었습니다.
                    </p>
                </div>
            </aside>

            <!-- Right: Deep Dive -->
            <div class="md:col-span-8 space-y-20">
                <article class="space-y-6">
                    <h3 class="text-2xl font-black text-slate-800 tracking-tight italic">01. Perspective</h3>
                    <p class="text-slate-500 text-lg leading-relaxed font-medium">
                        ${details.overview}
                    </p>
                </article>

                <article class="space-y-8">
                    <h3 class="text-2xl font-black text-slate-800 tracking-tight italic">02. Core Implementation</h3>
                    <div class="space-y-4">
                        ${details.features
                          .map(
                            (f, i) => `
                            <div class="group p-8 bg-slate-50/50 rounded-[2.5rem] border border-transparent hover:border-slate-100 hover:bg-white transition-all duration-500">
                                <span class="text-blue-500 font-black text-[10px] uppercase tracking-widest mb-2 block">System Feature 0${i + 1}</span>
                                <p class="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                                    ${f}
                                </p>
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                </article>
            </div>
        </div>
    `;

  // Entrance Sequence
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  // Important: block body scroll
  document.body.style.overflow = "hidden";

  // Reset scroll of modal content
  if (scrollContainer) scrollContainer.scrollTop = 0;

  void modal.offsetWidth;

  modal.classList.remove("opacity-0", "translate-y-4");
};
