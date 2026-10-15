// Simulador de autonomía (batería 200 Ah x 12 V, 80 % útil; 800 W de paneles al 75 %)
const sim=()=>{const W=$$('.dev[aria-pressed=true]').reduce((a,b)=>a+ +b.dataset.w,0),sun=+$('#sun').value,E=1920,S=800*sun*.75,sa=S/24,c=x=>x.toFixed(1).replace('.',',');
 $('#sun-v').textContent=c(sun);$('#r-w').textContent=W+' W';
 if(!W){$('#r-h').textContent='0';$('#r-bar').style.width='0';$('#r-note').textContent='Elegí al menos un dispositivo para calcular.';return}
 $('#r-h').textContent=Math.round(E/W);let eff,msg;
 if(sa>=W){eff=72;msg=`Con ${c(sun)} h de sol por día los paneles generan ≈${Math.round(S)} Wh y cubren tu consumo (≈${Math.round(W*24)} Wh/día): autonomía sostenida mientras haya sol.`}
 else{eff=E/(W-sa);msg=`Sumando ${c(sun)} h de sol por día (≈${Math.round(S)} Wh), la autonomía estimada sube a ≈${Math.round(eff)} hs (${c(eff/24)} días).`}
 $('#r-bar').style.width=Math.min(100,eff/72*100)+'%';$('#r-note').textContent=msg};
$$('.dev').forEach(b=>b.onclick=()=>{b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true');sim()});$('#sun').oninput=sim;sim();
