// Contacto (editá CFG arriba)
$$('.js-tel').forEach(a=>{a.href='tel:+54'+CFG.telefono;a.lastElementChild.textContent=CFG.telefono.slice(0,4)+' '+CFG.telefono.slice(4)});
$$('.js-wa').forEach(a=>a.href='https://wa.me/'+CFG.whatsapp);
if(CFG.instagram){const u=CFG.instagram.replace('@','');$$('.js-ig').forEach(a=>{a.href='https://instagram.com/'+u;a.hidden=false;a.lastElementChild.textContent='@'+u})}
// Menú móvil
$('#burger').onclick=()=>{const m=$('#mmenu');m.classList.toggle('hidden');m.classList.toggle('flex')};
$$('#mmenu a').forEach(a=>a.onclick=()=>{$('#mmenu').classList.add('hidden');$('#mmenu').classList.remove('flex')});
// Aparición al hacer scroll + contadores
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);e.target.classList.add('on');
 const n=e.target.dataset.n;if(n&&!reduce){const t=+n,t0=performance.now(),f=x=>{const p=Math.min((x-t0)/1400,1);e.target.textContent=Math.round(t*(1-Math.pow(1-p,3))).toLocaleString('es-AR');if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}}),{threshold:.2});
$$('.rv,[data-n]').forEach(el=>io.observe(el));
