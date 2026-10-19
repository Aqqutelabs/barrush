const navLogistics=[['L01','VIP Transport','services/vip-transportation/'],['L02','Fleet Management','services/fleet-management/'],['L03','Personnel Transportation','services/personnel-transportation/'],['L04','Goods and Cargo','services/goods-and-cargo/'],['L05','Vehicle Rentals','services/vehicle-rentals/'],['L06','Project Logistics','services/project-logistics/'],['L07','Procurement & Supply Chain','services/procurement-supply-chain/'],['L08','Haulage & Trucking','services/haulage-trucking/']];
const navSecurity=[['S01','VIP Protection','services/vip-protection/'],['S02','Armed Escorts','services/armed-escort-coordination/'],['S03','Marine Security','services/marine-security/'],['S04','CCTV','services/cctv-surveillance/'],['S05','Event Security','services/event-security/'],['S06','Security Risk Assessment','services/security-risk-assessment/']];
function initServiceNavigation(){
  const siteScript=[...document.scripts].find(script=>script.src.includes('/assets/js/site.js'));
  if(!siteScript)return;
  const root=new URL('../../',siteScript.src);
  const url=path=>new URL(path,root).href;
  const current=location.pathname.replace(/\/+$/,'/');
  const basic=[['About','about.html'],['Contact','contact.html']];
  const createLink=([label,path])=>{const link=document.createElement('a');link.href=url(path);link.textContent=label;const target=new URL(link.href).pathname.replace(/\/+$/,'/');if(current===target||(!current.endsWith('/')&&current===target.replace(/\/$/,'')))link.classList.add('active');return link};
  const createGroup=(label,items)=>{const group=document.createElement('div');group.className='nav-group';const trigger=document.createElement('button');trigger.type='button';trigger.className='nav-trigger';trigger.setAttribute('aria-expanded','false');trigger.innerHTML=`${label}<span aria-hidden="true">+</span>`;const drop=document.createElement('div');drop.className='nav-drop';items.forEach(([id,name,path])=>{const link=createLink([name,path]);link.innerHTML=`<span>${id}</span>${name}`;drop.append(link)});if(drop.querySelector('.active'))trigger.classList.add('active');trigger.addEventListener('click',event=>{event.stopPropagation();const open=group.classList.toggle('is-open');trigger.setAttribute('aria-expanded',String(open))});group.append(trigger,drop);return group};
  document.querySelectorAll('.header>nav,.mobile-menu>nav').forEach(nav=>{nav.replaceChildren(createLink(basic[0]),createGroup('Security',navSecurity),createGroup('Logistics',navLogistics),createLink(basic[1]))});
  document.addEventListener('click',()=>document.querySelectorAll('.nav-group.is-open').forEach(group=>{group.classList.remove('is-open');group.querySelector('.nav-trigger')?.setAttribute('aria-expanded','false')}));
}
initServiceNavigation();

const logistics=[['L01','vip-transport','VIP / Executive Transportation','Planned professional transportation for executives and private clients, shaped around the journey and agreed requirements.','vip-transportation'],['L02','fleet-management','Fleet Management','Vehicle scheduling, coordination and oversight designed to keep operational movement organised.','fleet-management'],['L03','personnel-transport','Personnel Transportation','Coordinated staff and team movement for companies, sites and project requirements.','personnel-transportation'],['L04','cargo-transport','Goods and Cargo Transportation','Practical planning and delivery coordination for goods and cargo across approved routes.','goods-and-cargo'],['L05','vehicle-rentals','Vehicle Rentals','Vehicle rental support matched to availability, journey type and operational need.','vehicle-rentals'],['L06','project-logistics','Project Logistics','Transport and resource coordination shaped around the moving parts of each project.','project-logistics'],['L07','procurement','Procurement / Supply Chain','Procurement, sourcing and logistics support within an agreed operational scope.','procurement-supply-chain'],['L08','haulage','Haulage / Trucking','Commercial transport coordination for heavy goods and project loads, subject to review.','haulage-trucking']];
const security=[['S01','executive-protection','VIP / Executive Protection','Protective support shaped around approved private and executive movement requirements.','vip-protection'],['S02','escort-coordination','Armed Escort Coordination','Coordination through properly authorised agencies or licensed providers, as applicable.','armed-escort-coordination'],['S03','marine-security','Marine Security','Security coordination for appropriate marine and waterfront operating requirements.','marine-security'],['S04','surveillance','CCTV / Electronic Surveillance','Surveillance planning and support based on the environment and approved scope.','cctv-surveillance'],['S05','event-security','Event Security','Access and security support planned around the scale and nature of an event.','event-security'],['S06','risk-assessment','Security Risk Assessment','Structured review, practical consultation and recommendations for identified risks.','security-risk-assessment']];
const serviceIcons={'vip-transport':'vip-tp.png','fleet-management':'fleet.png','personnel-transport':'staff.png','cargo-transport':'cargo.png','vehicle-rentals':'rental.png','project-logistics':'Projectlogistics.png','procurement':'procurement.png','haulage':'projects.png','executive-protection':'vip-pt.png','escort-coordination':'armedescorts.png','marine-security':'marinesec.png','surveillance':'cctv.png','event-security':'eventsec.png','risk-assessment':'risk.png'};
const esc=s=>encodeURIComponent(s); document.querySelectorAll('[data-services]').forEach(box=>{const type=box.dataset.services,list=type==='logistics'?logistics:security,category=type==='logistics'?'Logistics':'Security';box.innerHTML=list.map(x=>`<article id="${x[1]}"><span>${x[0]}</span><div class="service-icon" aria-hidden="true"><img src="assets/img/icons/${serviceIcons[x[1]]}" alt="" loading="lazy"></div><div class="service-copy"><h3>${x[2]}</h3><p>${x[3]}</p><div class="service-actions"><a href="services/${x[4]}/">Explore service ↗</a><a href="contact.html?category=${category}&service=${esc(x[2])}">${type==='logistics'?'Request this service':'Enquire'} ↗</a></div></div></article>`).join('')});
document.querySelectorAll('[data-year]').forEach(x=>x.textContent=new Date().getFullYear()); const header=document.querySelector('[data-header]'); addEventListener('scroll',()=>header?.classList.toggle('solid',scrollY>70),{passive:true});
const btn=document.querySelector('[data-menu-btn]'),menu=document.querySelector('[data-menu]'); btn?.addEventListener('click',()=>{const open=document.body.classList.toggle('menu-open');btn.setAttribute('aria-expanded',open);btn.setAttribute('aria-label',open?'Close menu':'Open menu')}); addEventListener('keydown',e=>{if(e.key==='Escape')document.body.classList.remove('menu-open')});
const video=document.querySelector('[data-video]'); if(matchMedia('(prefers-reduced-motion: reduce)').matches)video?.pause();
document.querySelectorAll('[data-rail-section]').forEach(section=>{const rail=section.querySelector('[data-rail]');const move=()=>{const r=section.getBoundingClientRect(),p=Math.max(0,Math.min(1,-r.top/(section.offsetHeight-innerHeight))),travel=Math.max(0,rail.scrollWidth-innerWidth+innerWidth*.18);rail.style.transform=`translate3d(${innerWidth*.12-p*travel}px,0,0)`};addEventListener('scroll',()=>requestAnimationFrame(move),{passive:true});addEventListener('resize',move);move()});
const form=document.querySelector('[data-form]'); if(form){const q=new URLSearchParams(location.search);['category','service'].forEach(k=>{if(q.get(k)&&form.elements[k])form.elements[k].value=q.get(k)});form.addEventListener('submit',e=>{e.preventDefault();const status=document.querySelector('[data-status]');if(!form.checkValidity()){form.reportValidity();return}status.textContent='This draft is not connected yet. Please call +234 703 057 2492 while email delivery is being configured.'})}

/**
 * One continuous, document-level route for the homepage.
 * The path is rebuilt only when layout geometry changes; scroll only updates
 * stroke reveal and the arrowhead's position along the cached path length.
 */
function initScrollRoute(){
  if(!document.body.classList.contains('home-page'))return;
  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
  const sections=[...document.querySelectorAll('main > section:not(.hero)')];
  const footer=document.querySelector('.footer');
  if(!sections.length||!footer)return;

  const ns='http://www.w3.org/2000/svg';
  const svg=document.createElementNS(ns,'svg');
  svg.classList.add('scroll-route');
  svg.setAttribute('aria-hidden','true');
  svg.setAttribute('focusable','false');
  const path=document.createElementNS(ns,'path');
  path.classList.add('scroll-route__path');
  const head=document.createElementNS(ns,'polygon');
  head.classList.add('scroll-route__head');
  head.setAttribute('points','0,-8 6,5 0,2 -6,5');
  svg.append(path,head);
  document.body.append(svg);

  let length=0,timeline=[],railPauses=[],ticking=false,resizeTimer=0;
  const pageY=el=>el.getBoundingClientRect().top+scrollY;

  function buildRoute(){
    const width=document.documentElement.clientWidth;
    const height=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
    const mobile=width<801;
    const left=mobile?14:Math.max(28,Math.round(width*.075));
    const right=mobile?Math.min(width-14,left+Math.max(48,width*.16)):Math.round(width*.925);
    const points=[];
    const firstTop=pageY(sections[0]);
    const footerTop=pageY(footer);
    let x=left;
    let y=Math.round(firstTop+Math.min(72,sections[0].offsetHeight*.1));
    let distance=0;
    points.push(`M ${x} ${y}`);
    timeline=[];
    railPauses=[];
    const addAnchor=(scroll,d=distance)=>{
      const previous=timeline.at(-1);
      const safeScroll=previous?Math.max(scroll,previous.scroll+1):scroll;
      timeline.push({scroll:safeScroll,distance:d});
    };
    const addV=target=>{if(target===y)return;points.push(`V ${target}`);distance+=Math.abs(target-y);y=target};
    const addH=target=>{if(target===x)return;points.push(`H ${target}`);distance+=Math.abs(target-x);x=target};
    addAnchor(Math.max(0,firstTop-innerHeight*.72),0);

    sections.forEach((section,index)=>{
      const sectionTop=pageY(section);
      const sectionBottom=sectionTop+section.offsetHeight;
      const boundary=Math.round(index===sections.length-1?Math.min(sectionBottom-26,footerTop-26):sectionBottom-2);
      const isHorizontalRail=!mobile&&section.matches('[data-rail-section]');

      if(isHorizontalRail){
        const railY=Math.round(sectionTop+Math.min(innerHeight*.82,section.offsetHeight*.35));
        addV(Math.max(y,railY));
        addAnchor(sectionTop-innerHeight*.1);

        // Enter the rail with a short horizontal move, then hold the arrow at
        // that point for the complete sticky horizontal-scroll interval.
        // Its visible 100px trail and head both remain horizontal while the
        // service names travel; normal downward movement resumes afterward.
        const direction=x===left?1:-1;
        const nextX=Math.max(left,Math.min(right,x+direction*100));
        addH(nextX);
        addAnchor(sectionTop);
        railPauses.push({start:sectionTop,end:sectionBottom-innerHeight,angle:direction>0?0:180});
        addAnchor(sectionBottom-innerHeight);

        addV(boundary);
        addAnchor(sectionBottom-innerHeight*.12);
        return;
      }

      addV(boundary);
      addAnchor(sectionBottom-innerHeight*.5);
      if(index<sections.length-1){
        addH(x===left?right:left);
        addAnchor(sectionBottom-innerHeight*.22);
      }
    });

    const footerEnd=Math.round(pageY(footer)+footer.offsetHeight-36);
    if(footerEnd>y){addV(footerEnd)}
    addAnchor(footerEnd-innerHeight*.74);
    path.setAttribute('d',points.join(' '));
    svg.setAttribute('viewBox',`0 0 ${width} ${height}`);
    svg.style.height=`${height}px`;
    length=path.getTotalLength();
    update();
  }

  function distanceAtScroll(scroll){
    if(!timeline.length)return 0;
    if(scroll<=timeline[0].scroll)return timeline[0].distance;
    for(let i=1;i<timeline.length;i++){
      const current=timeline[i];
      if(scroll<=current.scroll){
        const previous=timeline[i-1];
        const progress=(scroll-previous.scroll)/(current.scroll-previous.scroll);
        return previous.distance+(current.distance-previous.distance)*progress;
      }
    }
    return timeline.at(-1).distance;
  }

  function update(){
    ticking=false;
    if(!length)return;
    if(reduceMotion.matches){svg.hidden=true;return}
    svg.hidden=false;
    const at=Math.max(0,Math.min(length,distanceAtScroll(scrollY)));
    const trail=Math.min(100,at);
    path.style.strokeDasharray=`${Math.max(.01,trail)} ${length+100}`;
    path.style.strokeDashoffset=`${-Math.max(0,at-trail)}`;
    const point=path.getPointAtLength(at);
    const useAhead=at<length-.5;
    const probe=path.getPointAtLength(useAhead?at+.5:Math.max(0,at-.5));
    const dx=useAhead?probe.x-point.x:point.x-probe.x;
    const dy=useAhead?probe.y-point.y:point.y-probe.y;
    const pause=railPauses.find(range=>scrollY>=range.start&&scrollY<=range.end);
    const angle=pause?pause.angle:(Math.abs(dx)>=Math.abs(dy)?(dx>=0?0:180):(dy>=0?90:-90));
    head.setAttribute('transform',`translate(${point.x} ${point.y}) rotate(${angle+90})`);
    const visible=at>.5;
    path.style.opacity=visible?'1':'0';
    head.style.opacity=visible?'1':'0';
  }

  function requestUpdate(){if(!ticking){ticking=true;requestAnimationFrame(update)}}
  function requestBuild(){clearTimeout(resizeTimer);resizeTimer=setTimeout(buildRoute,140)}
  addEventListener('scroll',requestUpdate,{passive:true});
  addEventListener('resize',requestBuild,{passive:true});
  addEventListener('orientationchange',requestBuild,{passive:true});
  addEventListener('load',requestBuild,{once:true});
  reduceMotion.addEventListener?.('change',()=>{buildRoute()});
  new ResizeObserver(requestBuild).observe(document.querySelector('main'));
  document.fonts?.ready.then(requestBuild);
  buildRoute();
}
initScrollRoute();

function initContactDetails(){
  const emailLink=(address,label=address)=>{
    const link=document.createElement('a');
    link.href=`mailto:${address}`;
    link.textContent=label;
    return link;
  };

  document.querySelectorAll('.footer').forEach(footer=>{
    let address=footer.querySelector('address');
    if(!address){
      address=document.createElement('address');
      footer.insertBefore(address,footer.querySelector('small'));
    }
    if(!address.querySelector('a[href="mailto:move@barrush.com.ng"]'))address.append(emailLink('move@barrush.com.ng'));
    if(!address.querySelector('a[href="mailto:Sales@barrush.com.ng"]'))address.append(emailLink('Sales@barrush.com.ng'));
  });

  const contactList=document.querySelector('.contact aside dl');
  if(contactList){
    const pending=[...contactList.querySelectorAll('div')].find(item=>item.querySelector('dt')?.textContent.trim()==='Email');
    if(pending){
      pending.querySelector('dt').textContent='General enquiries';
      const value=pending.querySelector('dd');
      value.replaceChildren(emailLink('move@barrush.com.ng'));
    }
    if(!contactList.querySelector('a[href="mailto:Sales@barrush.com.ng"]')){
      const sales=document.createElement('div');
      const term=document.createElement('dt');
      const value=document.createElement('dd');
      term.textContent='Sales & quotes';
      value.append(emailLink('Sales@barrush.com.ng'));
      sales.append(term,value);
      contactList.append(sales);
    }
  }

  const form=document.querySelector('[data-form]');
  const status=document.querySelector('[data-status]');
  if(status)status.innerHTML='Online delivery is being configured. For immediate assistance, email <a href="mailto:Sales@barrush.com.ng">Sales@barrush.com.ng</a>.';
  form?.addEventListener('submit',()=>{
    if(form.checkValidity()&&status)status.innerHTML='Online delivery is not connected yet. Please email <a href="mailto:Sales@barrush.com.ng">Sales@barrush.com.ng</a> or call <a href="https://wa.me/2347030572492" target="_blank" rel="noopener">+234 703 057 2492</a>.';
  });
}
initContactDetails();
