// Formulario de cotización por pasos
let st=0;const P=$$('[data-step]'),v=n=>($(`[name=${n}]:checked`)||{}).value||'';
const show=()=>{P.forEach((p,i)=>p.hidden=i!==st);$$('.dot').forEach((d,i)=>d.dataset.on=i<=st);$('#w-back').hidden=!st;$('#w-next').hidden=st===2;$('#w-send').hidden=st!==2;$('#w-err').textContent=''};
$('#w-next').onclick=()=>{if(st===0&&!v('tipo'))return $('#w-err').textContent='Elegí una opción para continuar.';if(st===1&&!v('uso'))return $('#w-err').textContent='Contanos cómo lo vas a usar.';st++;show()};
$('#w-back').onclick=()=>{st--;show()};
$('#w-send').onclick=()=>{const n=$('#w-nom').value.trim(),t=$('#w-tel').value.trim();if(!n||!t)return $('#w-err').textContent='Completá tu nombre y teléfono.';
 const m=$('#w-msg').value.trim(),txt=`Hola Aventura Mobile! Soy ${n}. Quiero cotizar: ${v('tipo')}. Uso: ${v('uso')}. Zona: ${$('#w-zona').value}.${m?' '+m:''} Mi teléfono: ${t}`;
 window.open('https://wa.me/'+CFG.whatsapp+'?text='+encodeURIComponent(txt),'_blank','noopener');$('#w-ok').hidden=false};
show();
