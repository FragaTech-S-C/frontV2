import{a as d}from"./api.Dxlh498E.js";const g=document.getElementById("event-detail-shell"),T=new URLSearchParams(window.location.search),w=String(T.get("id")||window.location.pathname.split("/").filter(Boolean).pop()||"evento"),U=t=>{if(!t)return"Sin fecha";const o=new Date(t);return Number.isNaN(o.getTime())?"Sin fecha":new Intl.DateTimeFormat("es-AR",{day:"2-digit",month:"2-digit",year:"numeric"}).format(o)},P=t=>{if(!g)return;const o=t.id??w,A=t.title||"Evento sin título",S=t.description||"Sin descripción disponible para este evento.",L=[t.location,t.city,t.country,t.address].filter(Boolean),C=t.group?.name?t.group.name:t.creator&&([t.creator.firstName,t.creator.lastName].filter(Boolean).join(" ")||t.creator.nickname)||"Organizador",b=Array.isArray(t.attendees)?t.attendees:[],y=Number(t.latitude??t.location?.lat??t.location?.latitude??-34.6037),f=Number(t.longitude??t.location?.lng??t.location?.longitude??-58.3816),j=Number.isFinite(y)?y:-34.6037,x=Number.isFinite(f)?f:-58.3816,h=`/events/${encodeURIComponent(String(o))}/route?id=${encodeURIComponent(String(o))}&lat=${encodeURIComponent(String(j))}&lng=${encodeURIComponent(String(x))}`;g.innerHTML=`
        <div class="event-header">
          <div>
            <p class="eyebrow">${t.category||"Evento"}</p>
            <h2>${A}</h2>
            <p>${U(t.startDate)} · ${L.join(" - ")||"Sin ubicación"} · ${C}</p>
          </div>
        </div>

        <div class="grid">
          <section class="box">
            <h3>Descripción y notas</h3>
            <p>${S}</p>
            <h3>Asistentes</h3>
            <div class="avatar-row">
              ${b.length?b.map(i=>`<span class="avatar-pill">${[i.firstName,i.lastName].filter(Boolean).join(" ")||i.nickname||"Usuario"}</span>`).join(""):'<span class="avatar-pill">Sin asistentes aún</span>'}
            </div>
          </section>
          <aside class="box actions-box">
            <a href="${h}" class="ph" style="text-decoration:none;display:block;">Mini mapa — ver ruta</a>
            <button class="btn" id="confirm" type="button">Confirmar asistencia</button>
            <button class="btn out" id="open-invite" type="button">Invitar</button>
            <button class="btn out" id="leave_event" type="button">Abandonar evento</button>
          </aside>
        </div>

        <div id="invite-panel" class="invite-panel hidden">
          <div class="invite-header">
            <h3>Invitar personas</h3>
            <button type="button" id="close-invite" class="btn out small">Cerrar</button>
          </div>
          <input id="invite-search" class="grow" type="search" placeholder="Buscar en tus amigos o grupos" />
          <div id="invite-status" class="invite-status"></div>
          <div id="invite-results" class="invite-results"></div>
        </div>
        <div class="row">
          <a class="btn out" href="${h}/edit">Editar evento</a>
          <button class="btn out" type="button">Dejar review</button>
          <button class="btn out" type="button">Denunciar</button>
        </div>
      `;const I=document.getElementById("confirm"),R=document.getElementById("open-invite"),M=document.getElementById("close-invite"),v=document.getElementById("invite-panel"),E=document.getElementById("invite-search"),p=document.getElementById("invite-status"),l=document.getElementById("invite-results"),N=document.getElementById("leave_event"),k=JSON.parse(localStorage.getItem("meetia-auth")||"{}"),u=k?.user?.id??k?.id;let B=[];const s=(i,r=!1)=>{p&&(p.textContent=i||"",p.style.display=i?"block":"none",p.style.color=r?"#b42318":"#1d6f42")},$=()=>{if(!l)return;const i=(E?.value||"").trim().toLowerCase(),r=B.filter(e=>{const c=[e.name,e.email,e.nickname,e.groupName].filter(Boolean).join(" ").toLowerCase();return!i||c.includes(i)});if(!r.length){l.innerHTML='<p class="empty-state">No se encontraron amigos o grupos con ese nombre.</p>';return}l.innerHTML=r.map(e=>`
          <div class="invite-item">
            <div class="invite-person">
              <strong>${e.name}</strong>
              <small>${e.kind==="group"?`${e.groupName} · grupo`:e.groupName?`${e.groupName} · amigo`:"Amigo"}</small>
            </div>
            <button
              class="btn out small"
              type="button"
              data-user-id="${e.kind==="group"?"":e.id||""}"
              data-group-id="${e.kind==="group"&&e.groupId||""}"
            >
              ${e.kind==="group"?"Invitar grupo":"Invitar"}
            </button>
          </div>
        `).join(""),l.querySelectorAll("button[data-user-id], button[data-group-id]").forEach(e=>{e.addEventListener("click",async()=>{const c=e.getAttribute("data-user-id")||void 0,m=e.getAttribute("data-group-id")||void 0;if(!(!c&&!m||!o))try{s("Enviando invitación..."),await d.inviteToEvent(o,c,m),s("Invitación enviada correctamente."),e.textContent=m?"Grupo invitado":"Invitado",e.disabled=!0}catch(n){s(n instanceof Error?n.message:"No se pudo enviar la invitación.",!0)}})})},D=async()=>{if(!l||!u){s("Iniciá sesión para invitar personas.",!0);return}try{s("Cargando amigos y grupos...");const[i,r]=await Promise.all([d.getFriends(u),d.getGroups()]),e=(Array.isArray(i)?i:[]).map(n=>{const a=n.senderId===u?n.receiver:n.sender;return{id:a?.id,kind:"friend",name:[a?.firstName,a?.lastName].filter(Boolean).join(" ")||a?.nickname||a?.email||"Amigo",email:a?.email||"",nickname:a?.nickname||"",groupName:"",groupId:""}}).filter(n=>n.id&&n.id!==u),c=(Array.isArray(r)?r:[]).filter(n=>n&&n.id).map(n=>({id:n.id,kind:"group",name:n.name||"Grupo",email:"",nickname:"",groupName:n.name||"Grupo",groupId:n.id})),m=(Array.isArray(r)?r:[]).flatMap(n=>(Array.isArray(n.members)?n.members:[]).filter(a=>a&&a.id&&a.id!==u).map(a=>({id:a.id,kind:"member",name:[a.firstName,a.lastName].filter(Boolean).join(" ")||a.nickname||a.email||"Miembro",email:a.email||"",nickname:a.nickname||"",groupName:n.name||"Grupo",groupId:n.id})));B=[...e,...c,...m],$(),s("")}catch(i){s(i instanceof Error?i.message:"No se pudieron cargar tus contactos.",!0)}};I?.addEventListener("click",async()=>{try{await d.confirmAssistance(o),I.textContent="Asistencia confirmada"}catch(i){alert(i instanceof Error?i.message:"No se pudo confirmar la asistencia.")}}),R?.addEventListener("click",()=>{v&&(v.classList.toggle("hidden"),v.classList.contains("hidden")||D())}),M?.addEventListener("click",()=>{v?.classList.add("hidden")}),E?.addEventListener("input",$),N?.addEventListener("click",async()=>{try{await d.leaveEvent(o),N.textContent="Has abandonado el evento"}catch(i){alert(i instanceof Error?i.message:"No se pudo abandonar el evento.")}})},G=async()=>{try{const t=await d.getEventsById(w),o=t?.event??t;if(!o||typeof o!="object")throw new Error("No se encontró el evento solicitado.");P(o)}catch(t){if(!g)return;g.innerHTML=`
          <div class="box">
            <h2>Evento no encontrado</h2>
            <p>${t instanceof Error?t.message:"No pudimos cargar este evento."}</p>
            <a class="btn" href="/dashboard">Volver al dashboard</a>
          </div>
        `}};G();
