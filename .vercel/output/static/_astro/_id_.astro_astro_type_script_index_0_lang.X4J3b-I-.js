import{a as p}from"./api.Dxlh498E.js";const c=document.getElementById("group-shell");if(!c)throw new Error("Missing group shell");const A=window.location.pathname.split("/").filter(Boolean).pop()||"",E=decodeURIComponent(A),v=async()=>{try{const o=await p.getGroups(),e=(Array.isArray(o)?o:[]).find(r=>String(r.id)===String(E))||null;if(!e){c.innerHTML=`
            <div class="box">
              <h2>Grupo no encontrado</h2>
              <p>No tenés acceso a este grupo o aún no fue invitado a él.</p>
              <a class="btn" href="/groups">Volver a mis grupos</a>
            </div>
          `;return}const l=Array.isArray(e.members)?e.members:[],h=Array.isArray(e.events)?e.events:[],b=e.coverImage?`<img src="${e.coverImage}" alt="${e.name||"Grupo"}" class="group-cover" />`:'<div class="group-cover placeholder">Portada del grupo</div>',y=e.avatar?`<img src="${e.avatar}" alt="${e.name||"Grupo"}" class="group-avatar" />`:`<div class="group-avatar letter">${(e.name||"G").charAt(0).toUpperCase()}</div>`,f=l.map(r=>`<div class="member-pill">${r.firstName||r.nickname||"Usuario"}</div>`).join(""),$=h.map(r=>{const t=r.startDate?new Date(r.startDate):null,i=t&&!Number.isNaN(t.getTime())?new Intl.DateTimeFormat("es-AR",{day:"2-digit",month:"2-digit",year:"numeric"}).format(t):"Sin fecha";return`
            <article class="mini-event">
              <div class="mini-event__thumb">${r.category||"Evento"}</div>
              <div>
                <strong>${r.title||"Evento sin título"}</strong>
                <p>${i}</p>
                <p>${r.location||r.city||"Sin ubicación"}</p>
              </div>
            </article>
          `}).join("");c.innerHTML=`
          <section class="box group-header">
            ${b}
            <div class="group-summary">
              <div class="group-title-row">
                ${y}
                <div>
                  <h2>${e.name||"Grupo sin nombre"}</h2>
                  <p>${e.institutionId?"Grupo institucional":"Grupo personal"} · ${e.owner?.firstName||"Líder"}</p>
                </div>
              </div>
              <p>${e.description||"Sin descripción aún."}</p>
              <div class="row">
                <a class="btn" href="/events/new?groupId=${encodeURIComponent(e.id||"")}">Crear evento</a>
              </div>
            </div>
          </section>

          <div class="group-grid">
            <section class="box">
              <h3>Administrar grupo</h3>
              <div class="status-row">
                <span>Miembros</span>
                <strong>${l.length}</strong>
              </div>
              <div class="status-row">
                <span>Privacidad</span>
                <strong>${e.institutionId?"Institucional":"Personal"}</strong>
              </div>
              <div class="status-row">
                <span>Estado</span>
                <strong>Activo</strong>
              </div>
            </section>

            <section class="box">
              <h3>Crear nuevo evento</h3>
              <p>Prepará una nueva actividad para este grupo.</p>
              <a class="btn" href="/events/new?groupId=${encodeURIComponent(e.id||"")}">Ir al formulario</a>
            </section>

            <section class="box">
              <h3>Miembros</h3>
              <div class="member-list">${f||"<p>No hay miembros aún.</p>"}</div>
            </section>

            <section class="box">
              <h3>Añadir personas</h3>
              <input id="group-member-search" type="search" placeholder="Buscar por email" autocomplete="off" style="width:100%;margin-bottom:0.75rem;" />
              <div id="group-member-results" style="display:grid; gap:0.5rem;"></div>
            </section>

            <section class="box events-box">
              <h3>Eventos del grupo</h3>
              <div class="mini-event-list">${$||"<p>No hay eventos creados.</p>"}</div>
            </section>
          </div>
        `;const n=document.getElementById("group-member-search"),a=document.getElementById("group-member-results"),d=JSON.parse(localStorage.getItem("meetia-auth")||"{}"),I=d?.user?.id??d?.id??d?.userId??localStorage.getItem("meetia-user-id"),u=async()=>{if(!n||!a)return;const r=String(n.value||"").trim();if(!r){a.innerHTML="<span>Escribí un email para buscar personas.</span>";return}try{const t=await p.searchUsersByEmail(r),i=Array.isArray(t)?t.filter(s=>String(s.id)!==String(I)):[];if(!i.length){a.innerHTML="<span>No se encontraron personas.</span>";return}a.innerHTML=i.slice(0,6).map(s=>`
              <button type="button" class="btn out" data-user-id="${s.id}" style="justify-content:flex-start; width:100%;">
                ${s.firstName||s.nickname||"Usuario"} ${s.lastName||""} (@${s.nickname||s.email||"sin-nick"})
              </button>
            `).join(""),a.querySelectorAll("[data-user-id]").forEach(s=>{s.addEventListener("click",async()=>{const m=s.getAttribute("data-user-id");if(m)try{await p.addMemberToGroup(e.id,m),n.value="",await v()}catch(g){const w=g instanceof Error?g.message:"No se pudo agregar la persona.";a.innerHTML=`<span>${w}</span>`}})})}catch{a.innerHTML="<span>No se pudo buscar usuarios.</span>"}};n&&n.addEventListener("input",()=>{u()}),u()}catch(o){c.innerHTML=`
          <div class="box">
            <h2>No se pudo cargar el grupo</h2>
            <p>${o instanceof Error?o.message:"Intentalo nuevamente más tarde."}</p>
            <a class="btn" href="/groups">Volver a mis grupos</a>
          </div>
        `}};v();
