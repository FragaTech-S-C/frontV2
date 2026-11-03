import{a as s}from"./api.Dxlh498E.js";const n=document.getElementById("groups-list");if(!n)throw new Error("Missing groups list root");const r=i=>{if(!i.length){n.innerHTML=`
          <div class="box">
            <h3>Sin grupos todavía</h3>
            <p>Aún no pertenecés a ningún grupo o no recibiste invitaciones.</p>
          </div>
        `;return}n.innerHTML=i.map(t=>{const e=t.institutionId||t.type==="institutional"?"Institucional":"Personal",a=t.avatar?`<img src="${t.avatar}" alt="${t.name}" style="width:56px;height:56px;border-radius:50%;object-fit:cover;" />`:`<div style="display:grid;place-items:center;width:56px;height:56px;border-radius:50%;background:#e6e7ff;color:#293a70;font-weight:700;">${t.name?.charAt(0)??"G"}</div>`;return`
            <a class="box" href="/groups/${encodeURIComponent(t.id)}" style="display:flex;gap:12px;align-items:center;text-decoration:none;color:inherit;">
              ${a}
              <div>
                <h3 style="margin:0 0 4px;">${t.name}</h3>
                <p style="margin:0;">${e} · Líder: ${t.owner?.firstName||"Yo"}</p>
                <small>${t.institutionId?"Institución asociada":"Grupo personal"}</small>
              </div>
            </a>
          `}).join("")},o=async()=>{try{const i=await s.getGroups();r(Array.isArray(i)?i:[])}catch(i){n.innerHTML=`
          <div class="box">
            <h3>No se pudieron cargar tus grupos</h3>
            <p>${i instanceof Error?i.message:"Intentalo nuevamente más tarde."}</p>
          </div>
        `}};o();
