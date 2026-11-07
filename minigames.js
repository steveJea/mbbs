(()=>{
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const CATS=window.MBBS_MG_CATEGORIES||[];
const GAMES=window.MBBS_MINIGAMES||[];
const ORDER={telegram:0,web:1,toss:2};
const LABEL={web:"웹",telegram:"텔레그램",toss:"토스"};
function pubs(g){return (g.platforms||[]).filter(p=>p&&p.public===true&&LABEL[p.type]&&typeof p.url==="string"&&/^https:\/\/\S+$/.test(p.url)).slice().sort((a,b)=>(ORDER[a.type]??9)-(ORDER[b.type]??9));}
function catalog(){return GAMES.filter(g=>pubs(g).length);}
function count(id){const L=catalog();return id==="all"?L.length:L.filter(g=>g.category===id).length;}
function catId(){const q=new URLSearchParams(location.search).get("mg")||"all";return CATS.some(c=>c.id===q)?q:"all";}
function apply(){
  const cat=catId();
  const tabs=$$("#mgTabs [role=tab]");
  tabs.forEach(t=>{
    const on=t.dataset.cat===cat;
    t.setAttribute("aria-selected",on?"true":"false");
    t.tabIndex=on?0:-1;
    const n=t.querySelector(".mg-n");
    if(n)n.textContent=String(count(t.dataset.cat));
  });
  const active=$("#mgTabs [aria-selected=true]");
  const panel=$("#mgGrid");
  if(panel&&active)panel.setAttribute("aria-labelledby",active.id);
  let n=0;
  $$("#mgGrid .mg-card").forEach(card=>{
    const show=cat==="all"||card.dataset.cat===cat;
    card.hidden=!show;
    if(show)n++;
  });
  const empty=$("#mgEmpty");
  if(empty)empty.hidden=n!==0;
  const live=$("#mgLive");
  const label=(CATS.find(c=>c.id===cat)||{}).label||"";
  if(live)live.textContent=n?`${label} ${n}개`:`${label}, 표시할 게임이 없어요`;
}
function setCat(id,mode){
  const url=new URL(location.href);
  if(id==="all")url.searchParams.delete("mg");else url.searchParams.set("mg",id);
  const keep=new Set(["#news","#dex","#top"]);
  url.hash=keep.has(location.hash)?location.hash.slice(1):"games";
  history[mode==="replace"?"replaceState":"pushState"](null,"",url);
  apply();
}
const tabs=$("#mgTabs");
if(!tabs)return;
tabs.addEventListener("click",e=>{
  const a=e.target.closest("[role=tab]");
  if(!a||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button)return;
  e.preventDefault();
  setCat(a.dataset.cat,"push");
});
tabs.addEventListener("keydown",e=>{
  const items=$$("#mgTabs [role=tab]");
  const i=items.indexOf(document.activeElement);
  if(i<0)return;
  let n=null;
  if(e.key==="ArrowRight")n=(i+1)%items.length;
  else if(e.key==="ArrowLeft")n=(i-1+items.length)%items.length;
  else if(e.key==="Home")n=0;
  else if(e.key==="End")n=items.length-1;
  else return;
  e.preventDefault();
  items[n].focus();
  setCat(items[n].dataset.cat,"push");
});
const reset=$("#mgReset");
if(reset)reset.addEventListener("click",e=>{
  if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button)return;
  e.preventDefault();
  setCat("all","push");
  const all=$("#mgcat-all");
  if(all)all.focus();
});
window.addEventListener("popstate",apply);
apply();
})();
