import{a as l}from"./api.Dxlh498E.js";const o=document.getElementById("friend-request-list"),c=document.getElementById("event-invitation-list"),y=JSON.parse(localStorage.getItem("meetia-auth")||"{}"),r=y?.user?.id??y?.id,d=(t,a)=>{t&&(t.innerHTML=`<p class="empty-state">${a}</p>`)},I=(t={})=>{if(!t||typeof t!="object")return"Usuario";const a=t.firstName||"",i=t.lastName||"",e=t.nickname||"",n=t.email||"";return`${a} ${i}`.trim()||e||n||"Usuario"},f=t=>{t&&t.querySelectorAll("[data-action]").forEach(a=>{a.addEventListener("click",async i=>{const e=i.currentTarget,n=e?.dataset.id,s=e?.dataset.action,u=e?.dataset.type,m=s==="accepted"||s==="rejected"?s:null;if(!(!n||!r||!m))try{u==="friend"?await l.respondToFriendRequest(n,m,r):await l.respondToInvitation(n,m,r),await g(),await b()}catch(v){const N=v instanceof Error?v.message:"No se pudo responder la invitación.",p=e.closest(".invite-card")?.querySelector(".invite-status");p&&(p.textContent=N,p.classList.add("error"))}})})},g=async()=>{if(o){if(!r){d(o,"Iniciá sesión para ver tus solicitudes de amistad.");return}try{const t=await l.getPendingFriendRequests(r),a=Array.isArray(t)?t:[];if(!a.length){d(o,"No tenés solicitudes de amistad pendientes.");return}const i=a.map(e=>{const n=e.sender||{},s=I(n),u=n.email||"usuario@email.com";return`
            <div class="invite-card">
              <div>
                <strong>${s}</strong>
                <p>${u}</p>
                <small>Te envió una solicitud de amistad.</small>
              </div>
              <div class="invite-actions">
                <button class="btn small" type="button" data-type="friend" data-id="${e.id}" data-action="accepted">Aceptar</button>
                <button class="btn small out" type="button" data-type="friend" data-id="${e.id}" data-action="rejected">Rechazar</button>
              </div>
              <div class="invite-status"></div>
            </div>
          `}).join("");o.innerHTML=i,f(o)}catch(t){const a=t instanceof Error?t.message:"No se pudieron cargar las solicitudes de amistad.";d(o,a)}}},b=async()=>{if(c){if(!r){d(c,"Iniciá sesión para ver tus invitaciones.");return}try{const t=await l.getInvitations(r),a=Array.isArray(t)?t.filter(e=>e.type!=="friend"):[];if(!a.length){d(c,"No tenés invitaciones pendientes.");return}const i=a.map(e=>{const n=e.title||(e.type==="event"?"Invitación a evento":"Invitación a grupo"),s=e.message||e.text||"Te invitaron a participar.";return`
            <div class="invite-card">
              <div>
                <strong>${n}</strong>
                <p>${s}</p>
              </div>
              <div class="invite-actions">
                <button class="btn small" type="button" data-type="event" data-id="${e.id}" data-action="accepted">Aceptar</button>
                <button class="btn small out" type="button" data-type="event" data-id="${e.id}" data-action="rejected">Rechazar</button>
              </div>
              <div class="invite-status"></div>
            </div>
          `}).join("");c.innerHTML=i,f(c)}catch(t){const a=t instanceof Error?t.message:"No se pudieron cargar las invitaciones.";d(c,a)}}};g();b();
