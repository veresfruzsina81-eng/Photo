// Header background on scroll
const header = document.getElementById('header');
function onScroll(){
  const y = window.scrollY || document.documentElement.scrollTop;
  header.style.background = y > 30 ? 'rgba(255,255,255,0.9)' : 'transparent';
  header.style.borderBottom = y > 30 ? '1px solid var(--line)' : '1px solid transparent';
}
window.addEventListener('scroll', onScroll); onScroll();

// Mobile drawer
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
burger?.addEventListener('click', ()=>{
  drawer.style.display = drawer.style.display === 'block' ? 'none' : 'block';
});

// Reveal on scroll
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); obs.unobserve(e.target);} });
},{threshold:.18});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// Portfolio filter
const chips = document.querySelectorAll('.chip');
const items = document.querySelectorAll('#gallery figure');
chips.forEach(ch=>ch.addEventListener('click', ()=>{
  chips.forEach(c=>c.classList.remove('active'));
  ch.classList.add('active');
  const cat = ch.dataset.filter;
  items.forEach(it=>{
    it.style.display = (cat==='all'||it.dataset.cat===cat) ? 'block' : 'none';
  });
}));

// i18n
const langData = {
  en:{
    "menu-about":"About","menu-portfolio":"Portfolio","menu-pricing":"Pricing","menu-reviews":"Reviews","menu-contact":"Contact",
    "hero-title":"I capture the moment that today is still just a smile.","hero-sub":"Family, maternity and newborn photography in natural light.",
    "hero-cta-1":"View portfolio","hero-cta-2":"Request a quote",
    "about-title":"About me","about-txt":"I believe the most beautiful photos are born from natural, honest moments. With 8+ years of experience I shoot in a warm, friendly atmosphere — smiles come naturally.",
    "about-b1":"Natural light & gentle retouch","about-b2":"Family‑friendly, patient attitude","about-b3":"Fast delivery: 3–7 business days","about-cta":"Get an appointment",
    "port-title":"Portfolio","filter-all":"All","filter-family":"Family","filter-newborn":"Newborn","filter-couple":"Couple",
    "pricing-title":"Packages & pricing","pricing-sub":"Prices include selection and basic retouch. Hair & make‑up on request.",
    "p1-title":"Family session","p1-1":"90 minutes (studio / outdoor)","p1-2":"25 retouched images","p1-3":"Online gallery + download",
    "p2-title":"Newborn session","p2-1":"2–3 hours, safe posing","p2-2":"15 retouched images + props","p2-3":"Family images included",
    "p3-title":"Couple session","p3-1":"60 minutes creative shoot","p3-2":"20 retouched images","p3-3":"Flexible location",
    "btn-book":"Book now","popular":"Popular",
    "reviews-title":"Reviews","rev1":"The best family photos we’ve ever had — the kids loved it!","rev2":"Patient, kind, professional — newborn session was pure magic.","rev3":"Our couple photos feel warm and natural — we love them!",
    "contact-title":"Contact","contact-sub":"Tell me your idea — I reply within 24 hours.",
    "ph-name":"Name","ph-email":"E‑mail","ph-date":"Date","ph-package":"Choose package","pkg-family":"Family","pkg-newborn":"Newborn","pkg-couple":"Couple","ph-message":"Message",
    "send":"Send"
  },
  hu:{
    "menu-about":"Rólam","menu-portfolio":"Portfólió","menu-pricing":"Csomagok","menu-reviews":"Vélemények","menu-contact":"Kapcsolat",
    "hero-title":"Megőrzöm a pillanatot, ami ma még csak mosoly.","hero-sub":"Családi, baba‑mama és újszülött fotózás természetes fényben.",
    "hero-cta-1":"Nézd meg a portfóliót","hero-cta-2":"Kérj ajánlatot",
    "about-title":"Rólam","about-txt":"Hiszem, hogy a legszebb képek a természetes, őszinte pillanatokból születnek. 8+ év tapasztalattal, meleg, barátságos légkörben fotózom — a mosoly nem kényszer, hanem élmény.",
    "about-b1":"Természetes fény és finom retus","about-b2":"Családbarát, türelmes hozzáállás","about-b3":"Gyors átadás: 3–7 munkanap","about-cta":"Időpontot kérek",
    "port-title":"Portfólió","filter-all":"Összes","filter-family":"Család","filter-newborn":"Újszülött","filter-couple":"Páros",
    "pricing-title":"Csomagok és árak","pricing-sub":"Az árak tartalmazzák a válogatást és az alapretust. Smink és frizura kérhető.",
    "p1-title":"Családi fotózás","p1-1":"90 perc (stúdió / kültér)","p1-2":"25 retusált fotó","p1-3":"Online galéria + letöltés",
    "p2-title":"Újszülött fotózás","p2-1":"2–3 óra, biztonságos pózok","p2-2":"15 retusált fotó + kellékek","p2-3":"Családi képek az árban",
    "p3-title":"Páros fotózás","p3-1":"60 perc kreatív fotózás","p3-2":"20 retusált fotó","p3-3":"Választható helyszín",
    "btn-book":"Időpontot foglalok","popular":"Népszerű",
    "reviews-title":"Vélemények","rev1":"Életünk legszebb családi képei! A gyerekek is imádták.","rev2":"Türelmes, kedves, profi — az újszülött fotózás varázslat volt.","rev3":"Páros fotóink meleg hangulatúak, természetesek — imádjuk!",
    "contact-title":"Kapcsolat","contact-sub":"Írd meg röviden az elképzelésed — 24 órán belül válaszolok.",
    "ph-name":"Név","ph-email":"E‑mail","ph-date":"Dátum","ph-package":"Válassz csomagot","pkg-family":"Családi","pkg-newborn":"Újszülött","pkg-couple":"Páros","ph-message":"Üzenet",
    "send":"Küldés"
  }
};
const successMsgs={hu:'Köszönöm! Hamarosan válaszolok.',en:'Thank you! I will get back to you shortly.'};
let currentLang='hu'; let successMsg=successMsgs.hu;

function applyLang(lang){
  currentLang=lang; successMsg=successMsgs[lang];
  document.querySelectorAll('[data-key]').forEach(el=>{
    const key=el.getAttribute('data-key'); const t=langData[lang][key];
    if(!t) return;
    if(el.tagName==='INPUT' || el.tagName==='TEXTAREA' || el.tagName==='SELECT'){
      if(el.placeholder !== undefined) el.placeholder = t;
      if(el.options && el.options.length){
        for(let i=0;i<el.options.length;i++){
          const opt = el.options[i];
          const k = opt.getAttribute('data-key');
          if(k && langData[lang][k]) opt.textContent = langData[lang][k];
        }
      }
    } else {
      el.textContent = t;
    }
  });
  document.querySelectorAll('.flag').forEach(f=>f.classList.remove('active'));
  const act = (lang==='hu')?['lang-hu','lang-hu-m']:['lang-en','lang-en-m'];
  act.forEach(id=>document.getElementById(id)?.classList.add('active'));
}
document.getElementById('lang-hu')?.addEventListener('click',()=>applyLang('hu'));
document.getElementById('lang-en')?.addEventListener('click',()=>applyLang('en'));
document.getElementById('lang-hu-m')?.addEventListener('click',()=>applyLang('hu'));
document.getElementById('lang-en-m')?.addEventListener('click',()=>applyLang('en'));
applyLang('hu');
