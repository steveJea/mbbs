(()=>{const $=s=>document.querySelector(s);
const TL={update:"업데이트",event:"이벤트",patch:"패치노트"};
let nt="all";function news(){const L=(window.MBBS_NEWS||[]).filter(n=>nt=="all"||n.type==nt).sort((a,b)=>b.date.localeCompare(a.date));
$("#newsList").innerHTML=L.length?L.map(n=>`<li><div class="nh"><span class="nt t-${n.type}">${TL[n.type]||n.type}</span>${n.sample?'<span class="smp">샘플</span>':''}<time>${n.date}</time></div><h4>${n.title}</h4><p>${n.body}</p></li>`).join(""):'<li class="empty">아직 글이 없어요.</li>';}
document.querySelectorAll("#newsTabs button").forEach(b=>b.onclick=()=>{nt=b.dataset.t;document.querySelectorAll("#newsTabs button").forEach(x=>x.classList.toggle("on",x==b));news();});news();
const G=["N","R","HR","SR","UR","MR"],C=[["wind","바람"],["ice","얼음"],["fire","불"],["dark","DARK"],["light","빛"],["abyss","ABYSS"]],CL=Object.fromEntries(C);
let g="all",c="all";const chip=(v,l,cur,k)=>`<button data-${k}="${v}" class="${cur==v?'on':''}">${l}</button>`;
function dex(){$("#fGrade").innerHTML=chip("all","전체",g,"g")+G.map(x=>chip(x,x,g,"g")).join("");
$("#fCls").innerHTML=chip("all","전체",c,"c")+C.map(([v,l])=>chip(v,l,c,"c")).join("");
const L=(window.VR_CHARACTERS||[]).filter(x=>(g=="all"||x.grade==g)&&(c=="all"||x.cls==c));
$("#dexCnt").textContent=`${L.length}명`;
$("#dexGrid").innerHTML=L.length?L.map(x=>`<figure class="cc"><img src="assets/img/${x.img}" alt="${x.name}" loading="lazy"><figcaption><b><em class="gr gr-${x.grade.toLowerCase()}">[${x.grade}]</em> ${x.name}</b><span class="el el-${x.cls}">${CL[x.cls]}</span></figcaption></figure>`).join(""):'<p class="empty">해당 조건의 캐릭터가 아직 없어요.</p>';
document.querySelectorAll("#fGrade button").forEach(b=>b.onclick=()=>{g=b.dataset.g;dex()});
document.querySelectorAll("#fCls button").forEach(b=>b.onclick=()=>{c=b.dataset.c;dex()});}dex();})();
