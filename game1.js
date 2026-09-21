const levels = [
{
  title:"La primera llave", difficulty:2,
  hint:"No es una palabra cualquiera. Entre ustedes empezó a significar algo enorme.",
  render(){return `
    <p class="level-intro">La primera llave está incompleta. Reconoce una forma de nombrar algo que “mundo” ya no alcanza a explicar.</p>
    <div class="challenge-box">
      <div class="code">M _ &nbsp; C _ S M _ S</div>
      <input id="answer" type="text" autocomplete="off" placeholder="Escribe la frase completa">
      <div class="action-row"><button class="primary" onclick="checkText(0,'mi cosmos')">Comprobar</button></div>
      <div id="feedback" class="feedback"></div>
    </div>`},
  reward:"Una palabra suya quedó convertida en constelación: “mi cosmos”."
},
{
  title:"El mensaje numerado", difficulty:3,
  hint:"Usa A=1, B=2, C=3… pero no olvides los espacios.",
  render(){return `
    <p class="level-intro">Los números también pueden hablar. Descifra la frase:</p>
    <div class="challenge-box">
      <div class="code">3-21-9-4-1-20-5 / 13-21-3-8-15</div>
      <input id="answer" type="text" autocomplete="off" placeholder="¿Qué dice?">
      <div class="action-row"><button class="primary" onclick="checkText(1,'cuidate mucho')">Comprobar</button></div>
      <div id="feedback" class="feedback"></div>
    </div>`},
  reward:"Una frase que se repite porque el cariño también se nota en el cuidado."
},
{
  title:"La secuencia invisible", difficulty:3,
  hint:"Piensa en el orden natural de un día juntos, no en números.",
  render(){
    const opts=["Bonita noche","Buenos días","¿Cómo estás?","Cuídate mucho"];
    return `
      <p class="level-intro">Ordena estos momentos como si fueran parte de un día. Toca los cuatro en el orden correcto.</p>
      <div class="sequence-grid">${opts.map(o=>`<button class="tile" data-v="${o}" onclick="seqPick(this)">${o}</button>`).join("")}</div>
      <div class="sort-zone" id="sequenceZone"></div>
      <div class="action-row"><button class="primary" onclick="checkSequence()">Comprobar orden</button><button class="ghost" onclick="resetSequence()">Reiniciar</button></div>
      <div id="feedback" class="feedback"></div>`},
  reward:"Lo cotidiano también cuenta una historia cuando viene de alguien especial."
},
{
  title:"La memoria de las estrellas", difficulty:4,
  hint:"No necesitas rapidez. Mira, recuerda y empareja.",
  render(){
    const pairs=seededShuffle(["☀️","🌙","💛","✨","☀️","🌙","💛","✨"],42);
    return `
      <p class="level-intro">Encuentra las cuatro parejas. Aquí no gana quien corre: gana quien observa.</p>
      <div class="memory-grid" id="memoryGrid">${pairs.map((v,i)=>`<button class="memory-card" data-v="${v}" data-i="${i}" onclick="flipMemory(this)">✦</button>`).join("")}</div>
      <div id="feedback" class="feedback">Parejas encontradas: <span id="pairCount">0</span>/4</div>`},
  reward:"Observar también es una forma de querer: notar lo que otros dejarían pasar."
},
{
  title:"El idioma de nosotros", difficulty:4,
  hint:"Una de estas expresiones aparece como algo muy suyo. No es 'mi mundo'.",
  render(){
    const opts=["Mi universo entero","Mi cosmos","Mi estrella favorita","Mi planeta"];
    return `
      <p class="level-intro">Entre palabras bonitas, una terminó tomando un significado especial. Elige la correcta.</p>
      <div class="options">${opts.map((o,i)=>`<button class="option" onclick="checkOption(this,${i===1},4)">${o}</button>`).join("")}</div>
      <div id="feedback" class="feedback"></div>`},
  reward:"Hay palabras que cualquiera puede decir. Y hay palabras que, entre dos personas, cambian para siempre."
},
{
  title:"El cifrado de la heroína", difficulty:5,
  hint:"Cada símbolo representa una letra. Usa la clave visual y arma una frase de tres palabras.",
  render(){return `
    <p class="level-intro">Esta vez no basta con leer. Usa la clave:</p>
    <div class="challenge-box">
      <div class="code">☾=E &nbsp; ✦=R &nbsp; ♡=S &nbsp; ☀=M &nbsp; ◇=I &nbsp; ♧=H &nbsp; △=O &nbsp; ○=N &nbsp; ☆=A</div>
      <div class="code" style="margin-top:18px">☾ ✦ ♡ / ☀ ◇ / ♧ ☾ ✦ △ ◇ ○ ☆</div>
      <input id="answer" type="text" autocomplete="off" placeholder="Descifra la frase">
      <div class="action-row"><button class="primary" onclick="checkText(5,'eres mi heroina')">Comprobar</button></div>
      <div id="feedback" class="feedback"></div>
    </div>`},
  reward:"La respuesta estaba en los símbolos, pero la idea ya estaba en el corazón: eres mi heroína."
},
{
  title:"El camino correcto", difficulty:4,
  hint:"Busca el camino que habla de construir, no de escapar ni de adivinar.",
  render(){return `
    <p class="level-intro">Son casi las doce. Frente a ti aparecen tres caminos. Solo uno representa la forma en que quiero vivir esto contigo.</p>
    <div class="path-grid">
      <div class="path-card" onclick="pathChoice(this,false)"><h4>La puerta del silencio</h4><p>No hablar, esperar y suponer que el tiempo resuelva todo.</p></div>
      <div class="path-card" onclick="pathChoice(this,true)"><h4>La ruta de construir</h4><p>Hablar, aprender, cuidar, mejorar y seguir demostrando con hechos.</p></div>
      <div class="path-card" onclick="pathChoice(this,false)"><h4>La escalera de la suerte</h4><p>Confiar en que todo funcione sin hacer nada diferente.</p></div>
    </div>
    <div id="feedback" class="feedback"></div>`},
  reward:"No quiero que lo nuestro dependa de suerte. Quiero construirlo contigo."
},
{
  title:"Las tres palabras", difficulty:5,
  hint:"Las tres palabras no describen objetos. Describen lo que debe sostener una relación.",
  render(){
    const words=["DISTANCIA","CONFIANZA","RUIDO","CUIDADO","PRISA","AMOR","MIEDO","DUDA"];
    return `
      <p class="level-intro">Elige exactamente tres palabras que, juntas, formen la base del mensaje que quiero dejarte hoy.</p>
      <div class="sequence-grid">${words.map(w=>`<button class="tile" data-v="${w}" onclick="multiPick(this)">${w}</button>`).join("")}</div>
      <div class="action-row"><button class="primary" onclick="checkThree()">Comprobar</button></div>
      <div id="feedback" class="feedback"></div>`},
  reward:"Confianza, cuidado y amor: tres palabras simples, pero enormes cuando son constantes."
},
{
  title:"La frase escondida", difficulty:5,
  hint:"La respuesta es una idea que se repite en este regalo: P _ E N S O / E N / T I / D _ A / A / D _ A.",
  render(){return `
    <p class="level-intro">Completa la frase escondida. No todo lo importante necesita un cifrado imposible; a veces basta reconocer el patrón.</p>
    <div class="challenge-box">
      <div class="code">P _ E N S O / E N / T I / D _ A / A / D _ A</div>
      <input id="answer" type="text" autocomplete="off" placeholder="Escribe la frase completa">
      <div class="action-row"><button class="primary" onclick="checkText(8,'pienso en ti dia a dia')">Comprobar</button></div>
      <div id="feedback" class="feedback"></div>
    </div>`},
  reward:"Una idea constante: pienso en ti día a día."
},
{
  title:"El corazón", difficulty:5,
  hint:"La respuesta tiene nombre propio.",
  render(){return `
    <div class="final-heart">💛</div>
    <p class="level-intro" style="text-align:center">La última puerta de la primera etapa no se abre con números, símbolos ni memoria.</p>
    <div class="challenge-box">
      <p style="text-align:center;font-size:1.18rem;line-height:1.7">“¿Quién es mi heroína?”</p>
      <input id="answer" type="text" autocomplete="off" placeholder="Escribe el nombre">
      <div class="action-row" style="justify-content:center"><button class="primary" onclick="checkText(9,'cynthia')">Abrir</button></div>
      <div id="feedback" class="feedback" style="text-align:center"></div>
    </div>`},
  reward:"Primera constelación completa. Pero el universo todavía guarda diez estrellas más."
},

// ==================== NIVELES 11–20 ====================

{
  title:"César entre estrellas", difficulty:6,
  hint:"Es un cifrado César. Cada letra fue desplazada 3 lugares hacia adelante. Para leer, retrocede 3.",
  render(){return `
    <p class="level-intro">Ahora empieza la segunda constelación. Descifra este mensaje usando un desplazamiento César de 3.</p>
    <div class="challenge-box">
      <div class="code">VLHPSUH WH HOLMR</div>
      <input id="answer" type="text" autocomplete="off" placeholder="Frase descifrada">
      <div class="action-row"><button class="primary" onclick="checkText(10,'siempre te elijo')">Comprobar</button></div>
      <div id="feedback" class="feedback"></div>
    </div>`},
  reward:"No fue casualidad: incluso después de descifrarlo, la frase sigue siendo la misma. Siempre te elijo."
},
{
  title:"Coordenadas del corazón", difficulty:6,
  hint:"Cada par indica fila-columna dentro de la tabla 5×5. I/J comparten casilla.",
  render(){return `
    <p class="level-intro">Usa el cuadrado de Polybius para leer el mensaje.</p>
    <div class="challenge-box">
      <div class="code">
        11=A 12=B 13=C 14=D 15=E<br>
        21=F 22=G 23=H 24=I/J 25=K<br>
        31=L 32=M 33=N 34=O 35=P<br>
        41=Q 42=R 43=S 44=T 45=U<br>
        51=V 52=W 53=X 54=Y 55=Z
      </div>
      <div class="code" style="margin-top:14px">13 45 24 14 11 / 44 45 / 13 34 42 11 55 34 33</div>
      <input id="answer" type="text" autocomplete="off" placeholder="¿Qué frase obtienes?">
      <div class="action-row"><button class="primary" onclick="checkText(11,'cuida tu corazon')">Comprobar</button></div>
      <div id="feedback" class="feedback"></div>
    </div>`},
  reward:"Cuidarte también significa querer que cuides tu propio corazón."
},
{
  title:"Orden lógico", difficulty:6,
  hint:"Primero despiertas. La pregunta ocurre antes del cuidado. La despedida siempre cierra.",
  render(){
    const items=["Bonita noche","Cuídate mucho","Buenos días","¿Cómo estás?","Pensé en ti"];
    return `
      <p class="level-intro">Ordena cinco momentos usando las pistas, no solo intuición:</p>
      <div class="challenge-box">
        <div class="logic-card"><b>Pista 1:</b> “Buenos días” ocurre antes que todo lo demás.</div>
        <div class="logic-card"><b>Pista 2:</b> “Pensé en ti” ocurre después de “¿Cómo estás?”.</div>
        <div class="logic-card"><b>Pista 3:</b> “Cuídate mucho” ocurre después de “Pensé en ti”.</div>
        <div class="logic-card"><b>Pista 4:</b> “Bonita noche” es el último momento.</div>
      </div>
      <div class="sequence-grid">${items.map(o=>`<button class="tile" data-v="${o}" onclick="seqPickHard(this)">${o}</button>`).join("")}</div>
      <div class="sort-zone" id="sequenceZone"></div>
      <div class="action-row"><button class="primary" onclick="checkSequenceHard()">Comprobar</button><button class="ghost" onclick="resetSequence()">Reiniciar</button></div>
      <div id="feedback" class="feedback"></div>`},
  reward:"Hay cosas que se sienten espontáneas, pero también tienen un orden: estar, preguntar, pensar, cuidar y cerrar el día contigo."
},
{
  title:"ASCII sentimental", difficulty:7,
  hint:"Convierte cada número decimal a su carácter ASCII. No uses hexadecimal.",
  render(){return `
    <p class="level-intro">Esta vez el mensaje está escondido como datos.</p>
    <div class="challenge-box">
      <div class="code">77 73 / 72 69 82 79 73 78 65</div>
      <input id="answer" type="text" autocomplete="off" placeholder="Frase en texto">
      <div class="action-row"><button class="primary" onclick="checkText(13,'mi heroina')">Comprobar</button></div>
      <div id="feedback" class="feedback"></div>
    </div>`},
  reward:"Hasta los números pueden terminar diciendo algo bonito: mi heroína."
},
{
  title:"Sopa de palabras", difficulty:7,
  hint:"Busca tres palabras horizontales. Dos van de izquierda a derecha y una de derecha a izquierda.",
  render(){
    const grid = [
      "C","O","N","F","I","A","N","Z",
      "R","Q","T","U","V","W","A","A",
      "C","U","I","D","A","D","O","M",
      "P","L","K","J","H","G","F","O",
      "R","O","M","A","X","X","X","R",
      "E","S","T","R","E","L","L","A",
      "N","O","C","H","E","Q","W","E",
      "C","O","S","M","O","S","Y","Z"
    ];
    return `
      <p class="level-intro">Encuentra y escribe las tres palabras relacionadas con lo que quiero construir: una empieza por C, otra por C y otra por A.</p>
      <div class="word-grid">${grid.map((c,i)=>`<div class="word-cell" data-i="${i}" onclick="this.classList.toggle('on')">${c}</div>`).join("")}</div>
      <div class="challenge-box">
        <input id="answer" type="text" autocomplete="off" placeholder="PALABRA1 PALABRA2 PALABRA3">
        <div class="action-row"><button class="primary" onclick="checkWords15()">Comprobar</button></div>
        <div id="feedback" class="feedback"></div>
      </div>`},
  reward:"Confianza, cuidado y amor reaparecen porque no son decoración: son parte de lo que quiero sostener."
},
{
  title:"Índices secretos", difficulty:8,
  hint:"Resuelve cada operación. El resultado es la posición de una letra dentro de la palabra indicada, empezando en 1.",
  render(){return `
    <p class="level-intro">Resuelve cada operación y usa el resultado como índice dentro de la palabra.</p>
    <div class="challenge-box">
      <div class="code">
        (7−4) en <b>CORAZÓN</b><br>
        (2×2) en <b>COSMOS</b><br>
        (9−8) en <b>SIEMPRE</b><br>
        (8÷2) en <b>HEROÍNA</b><br>
        (6−3) en <b>AMOR</b>
      </div>
      <p style="color:var(--muted)">Une las cinco letras obtenidas.</p>
      <input id="answer" type="text" autocomplete="off" placeholder="Cinco letras">
      <div class="action-row"><button class="primary" onclick="checkText(15,'rmsoo')">Comprobar</button></div>
      <div id="feedback" class="feedback"></div>
    </div>`},
  reward:"No todas las respuestas forman una frase bonita. Algunas solo prueban que supiste seguir una cadena de reglas."
},
{
  title:"Doble transformación", difficulty:8,
  hint:"Primero invierte cada palabra. Después aplica ROT13.",
  render(){return `
    <p class="level-intro">Hay dos capas. No intentes resolver la segunda antes de quitar la primera.</p>
    <div class="challenge-box">
      <div class="code">RVZ / FBCFZBP</div>
      <p style="color:var(--muted)">Regla: 1) invierte cada palabra; 2) aplica ROT13 al resultado.</p>
      <input id="answer" type="text" autocomplete="off" placeholder="Frase final">
      <div class="action-row"><button class="primary" onclick="checkText(16,'mi cosmos')">Comprobar</button></div>
      <div id="feedback" class="feedback"></div>
    </div>`},
  reward:"Dos capas después, vuelves al mismo lugar: mi cosmos."
},
{
  title:"La ecuación de nosotros", difficulty:9,
  hint:"Cada símbolo vale un número del 1 al 9. Usa las tres ecuaciones y después convierte el resultado final con A=1, B=2…",
  render(){return `
    <p class="level-intro">Resuelve primero los símbolos. Después usa los resultados para obtener tres letras.</p>
    <div class="challenge-box">
      <div class="code">
        ★ + ★ = 10<br>
        ★ + ☾ = 12<br>
        ☾ + ♡ = 11<br><br>
        Ahora calcula:<br>
        ★ + ☾ = ?<br>
        ♡ + ☾ = ?<br>
        ★ − ♡ = ?
      </div>
      <p style="color:var(--muted)">Convierte esos tres resultados a letras con A=1, B=2, C=3...</p>
      <input id="answer" type="text" autocomplete="off" placeholder="Tres letras">
      <div class="action-row"><button class="primary" onclick="checkText(17,'lke')">Comprobar</button></div>
      <div id="feedback" class="feedback"></div>
    </div>`},
  reward:"A veces el reto no da una frase. Da una prueba de que pudiste sostener varias reglas a la vez."
},
{
  title:"El mensaje maestro", difficulty:10,
  hint:"Paso 1: números→letras con A=1. Paso 2: invierte cada palabra obtenida. Paso 3: la frase final tiene cuatro palabras.",
  render(){return `
    <p class="level-intro">Este reto combina dos técnicas de niveles anteriores.</p>
    <div class="challenge-box">
      <div class="code">
        19-15-13-19-15-3 / 9-13 / 15-20-9-21-3 / 5-20
      </div>
      <p style="color:var(--muted)">Convierte números a letras. Después invierte el orden de letras de cada palabra.</p>
      <input id="answer" type="text" autocomplete="off" placeholder="Frase final">
      <div class="action-row"><button class="primary" onclick="checkText(18,'cosmos mi cuido te')">Comprobar</button></div>
      <div id="feedback" class="feedback"></div>
    </div>`},
  reward:"Llegaste a un mensaje extraño porque este nivel evaluaba proceso, no poesía. Solo falta una estrella."
},
{
  title:"La bóveda final", difficulty:10,
  hint:"Necesitas cuatro respuestas anteriores: nivel 1, nivel 2, nivel 8 y nivel 10. Escríbelas en ese orden, separadas por guiones.",
  render(){return `
    <div class="final-heart">💛</div>
    <p class="level-intro" style="text-align:center">
      La última bóveda no te da una clave nueva. Te obliga a recordar el camino.
    </p>
    <div class="challenge-box">
      <p style="line-height:1.8;text-align:center">
        Recupera estas cuatro respuestas:<br>
        <b>Nivel 1</b> · <b>Nivel 2</b> · <b>Nivel 8</b> · <b>Nivel 10</b><br><br>
        Para el nivel 8 usa solo la palabra <b>CONFIANZA</b>.<br>
        Escríbelas con guiones.
      </p>
      <input id="answer" type="text" autocomplete="off" placeholder="respuesta-respuesta-respuesta-respuesta">
      <div class="action-row" style="justify-content:center"><button class="primary" onclick="checkVault()">Abrir la bóveda</button></div>
      <div id="feedback" class="feedback" style="text-align:center"></div>
    </div>`},
  reward:"Veinte niveles. Veinte estrellas. Y una sola persona en el centro de todo este universo: Cynthia."
}
];

let currentLevel=0;
let progress=Number(localStorage.getItem("cynthiaProgress20")||0);
let seq=[];
let memoryOpen=[];
let memoryMatched=0;
let multi=new Set();

const levelTitle=document.getElementById("levelTitle");
const levelNumber=document.getElementById("levelNumber");
const difficulty=document.getElementById("difficulty");
const levelBody=document.getElementById("levelBody");
const hintBtn=document.getElementById("hintBtn");
const hintText=document.getElementById("hintText");
const unlockOverlay=document.getElementById("unlockOverlay");
const unlockTitle=document.getElementById("unlockTitle");
const unlockReward=document.getElementById("unlockReward");

document.getElementById("beginBtn").onclick=()=>{
  document.getElementById("intro").classList.add("hidden");
  renderMap();
  loadLevel(Math.min(progress,19));
};

document.getElementById("nextBtn").onclick=()=>{
  unlockOverlay.classList.add("hidden");
  if(progress>=20){showFinalMessage();return;}
  loadLevel(Math.min(progress,19));
};

document.getElementById("resetBtn").onclick=()=>{
  if(confirm("¿Reiniciar los 20 niveles y borrar el progreso guardado?")){
    localStorage.removeItem("cynthiaProgress20");
    progress=0;currentLevel=0;renderMap();loadLevel(0);
  }
};

hintBtn.onclick=()=>{hintText.textContent=levels[currentLevel].hint};

function normalize(s){
  return (s||"").toLowerCase().normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .replace(/[^a-z0-9 -]/g,"")
    .replace(/\s+/g," ")
    .trim();
}
function updateProgress(){
  document.getElementById("progressText").textContent=`${progress} / 20`;
  document.getElementById("progressBar").style.width=`${progress*5}%`;
}
function renderMap(){
  const map=document.getElementById("map");
  const pos=[
    [8,8],[29,6],[50,10],[72,7],[86,20],
    [68,23],[47,22],[25,25],[8,31],[18,43],
    [39,39],[60,40],[82,38],[88,53],[67,54],
    [46,53],[24,58],[10,70],[34,75],[64,73]
  ];
  map.innerHTML=levels.map((l,i)=>{
    const unlocked=i<=progress;
    const zone=i>=15?"extreme-zone":i>=10?"hard-zone":"";
    const cls=`${unlocked?"unlocked":"locked"} ${i===currentLevel?"active":""} ${zone}`;
    return `<button class="star-node ${cls}" style="left:${pos[i][0]}%;top:${pos[i][1]}%" data-label="${i+1}" onclick="mapGo(${i})" ${unlocked?"":"disabled"}>${i+1}</button>`;
  }).join("");
  updateProgress();
}
function mapGo(i){if(i<=progress)loadLevel(i)}
function loadLevel(i){
  currentLevel=i;seq=[];memoryOpen=[];memoryMatched=0;multi=new Set();
  levelNumber.textContent=`NIVEL ${i+1}`;
  levelTitle.textContent=levels[i].title;
  difficulty.textContent="✦".repeat(Math.min(levels[i].difficulty,10))+"☆".repeat(Math.max(0,10-levels[i].difficulty));
  hintText.textContent="";
  levelBody.innerHTML=levels[i].render();
  renderMap();
  document.getElementById("gameArea").scrollIntoView({behavior:"smooth",block:"start"});
}
function feedback(msg,good=false){
  const el=document.getElementById("feedback");
  if(el){el.textContent=msg;el.style.color=good?"#c8ffd9":"#ffe3a0"}
}
function completeLevel(i){
  if(i===progress){
    progress++;
    localStorage.setItem("cynthiaProgress20",String(progress));
  }
  renderMap();
  unlockTitle.textContent=i===19?"Bóveda abierta":`Estrella ${i+1} desbloqueada`;
  unlockReward.textContent=levels[i].reward;
  unlockOverlay.classList.remove("hidden");
  burst();
}
function checkText(i,expected){
  const val=normalize(document.getElementById("answer").value);
  if(val===normalize(expected)){
    feedback("Correcto ✨",true);
    setTimeout(()=>completeLevel(i),350);
  }else feedback("Todavía no. Usa la pista y vuelve a revisar el método.");
}
function checkOption(btn,correct,i){
  document.querySelectorAll(".option").forEach(x=>x.classList.remove("correct","wrong"));
  if(correct){btn.classList.add("correct");feedback("Esa es ✨",true);setTimeout(()=>completeLevel(i),400)}
  else{btn.classList.add("wrong");feedback("No es esa. Piensa en la palabra que ustedes hicieron especial.")}
}
function seqPick(btn){
  if(btn.classList.contains("selected"))return;
  btn.classList.add("selected");seq.push(btn.dataset.v);
  document.getElementById("sequenceZone").innerHTML=seq.map((x,i)=>`<span class="sort-item">${i+1}. ${x}</span>`).join("");
}
function seqPickHard(btn){seqPick(btn)}
function resetSequence(){
  seq=[];document.querySelectorAll(".tile").forEach(x=>x.classList.remove("selected"));
  const z=document.getElementById("sequenceZone");if(z)z.innerHTML="";
  feedback("");
}
function checkSequence(){
  const expected=["Buenos días","¿Cómo estás?","Cuídate mucho","Bonita noche"];
  if(seq.length===4&&seq.every((v,i)=>v===expected[i])){feedback("Orden correcto ✨",true);setTimeout(()=>completeLevel(2),350)}
  else feedback("Casi. Piensa en cómo transcurre un día desde la mañana hasta cerrar la noche.");
}
function checkSequenceHard(){
  const expected=["Buenos días","¿Cómo estás?","Pensé en ti","Cuídate mucho","Bonita noche"];
  if(seq.length===5&&seq.every((v,i)=>v===expected[i])){feedback("Orden lógico correcto ✨",true);setTimeout(()=>completeLevel(12),350)}
  else feedback("Alguna posición rompe una de las cuatro pistas.");
}
function seededShuffle(arr,seed){
  let a=[...arr],x=seed;
  for(let i=a.length-1;i>0;i--){
    x=(x*9301+49297)%233280;
    const j=Math.floor((x/233280)*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}
function flipMemory(btn){
  if(btn.classList.contains("revealed")||memoryOpen.length===2)return;
  btn.classList.add("revealed");btn.textContent=btn.dataset.v;memoryOpen.push(btn);
  if(memoryOpen.length===2){
    setTimeout(()=>{
      const[a,b]=memoryOpen;
      if(a.dataset.v===b.dataset.v){
        a.disabled=b.disabled=true;memoryMatched++;
        document.getElementById("pairCount").textContent=memoryMatched;
        if(memoryMatched===4)setTimeout(()=>completeLevel(3),350);
      }else{
        a.classList.remove("revealed");b.classList.remove("revealed");a.textContent=b.textContent="✦";
      }
      memoryOpen=[];
    },700);
  }
}
function pathChoice(card,ok){
  document.querySelectorAll(".path-card").forEach(x=>x.style.borderColor="rgba(255,255,255,.11)");
  if(ok){
    card.style.borderColor="rgba(126,233,168,.7)";
    feedback("Ese es el camino ✨",true);setTimeout(()=>completeLevel(6),350)
  }else{
    card.style.borderColor="rgba(255,122,150,.7)";
    feedback("Ese camino no representa lo que quiero construir contigo.");
  }
}
function multiPick(btn){
  const v=btn.dataset.v;
  if(multi.has(v)){multi.delete(v);btn.classList.remove("selected")}
  else{
    if(multi.size>=3)return;
    multi.add(v);btn.classList.add("selected");
  }
}
function checkThree(){
  const exp=["CONFIANZA","CUIDADO","AMOR"];
  if(multi.size===3&&exp.every(x=>multi.has(x))){
    feedback("Las tres sostienen el mensaje ✨",true);setTimeout(()=>completeLevel(7),350)
  }else feedback("No. Busca tres palabras que hablen de construir algo sano y bonito.");
}
function checkWords15(){
  const val=normalize(document.getElementById("answer").value);
  const parts=val.split(" ").filter(Boolean);
  const ok=["confianza","cuidado","amor"].every(x=>parts.includes(x))&&parts.length===3;
  if(ok){feedback("Encontraste las tres ✨",true);setTimeout(()=>completeLevel(14),350)}
  else feedback("Busca exactamente: una palabra de confianza, una de cuidado y una de amor.");
}
function checkVault(){
  const val=normalize(document.getElementById("answer").value).replace(/\s*-\s*/g,"-");
  const expected="mi cosmos-cuidate mucho-confianza-cynthia";
  if(val===expected){
    feedback("Bóveda abierta ✨",true);
    setTimeout(()=>completeLevel(19),350);
  }else feedback("La combinación no coincide. Revisa los niveles 1, 2, 8 y 10.");
}
function showFinalMessage(){
  levelNumber.textContent="FINAL";
  levelTitle.textContent="Veinte estrellas después";
  difficulty.textContent="★★★★★★★★★★";
  hintText.textContent="";
  levelBody.innerHTML=`
    <div class="final-heart">💛</div>
    <p class="level-intro" style="text-align:center;font-size:1.2rem">
      Llegaste al final. Pero esto nunca fue realmente sobre acertijos.
    </p>
    <div class="challenge-box">
      <p style="font-size:1.12rem;line-height:1.9;text-align:center">
        Era una forma distinta de decirte que pienso en ti, que recuerdo nuestras palabras,
        que valoro tus cuidados, tus buenos días, tus bonitas noches y esa manera tan tuya
        de estar presente.
        <br><br>
        También era mi forma de decirte que no quiero un cariño automático.
        Quiero seguir creando cosas, sorprendiéndote, aprendiendo y encontrando nuevas maneras
        de hacerte sentir importante para mí.
        <br><br>
        <strong>Eres mi heroína, mi cosmos y mi amor bonito.</strong>
        <br><br>
        Y después de veinte niveles, la respuesta más importante sigue siendo la más sencilla:
        <strong>te elijo a ti.</strong>
        <br><br>
        — Juan Carlos
      </p>
    </div>`;
  renderMap();
  document.getElementById("gameArea").scrollIntoView({behavior:"smooth"});
}
function burst(){
  for(let i=0;i<24;i++){
    const e=document.createElement("div");
    e.textContent=i%3===0?"♡":"✦";
    e.style.cssText=`position:fixed;z-index:80;left:${45+Math.random()*10}vw;top:${46+Math.random()*8}vh;color:${i%2?"#f4cf7f":"#ffd6e8"};font-size:${14+Math.random()*18}px;pointer-events:none;transition:1.4s ease;`;
    document.body.appendChild(e);
    requestAnimationFrame(()=>{
      e.style.transform=`translate(${(Math.random()-.5)*260}px,${-80-Math.random()*180}px) rotate(${Math.random()*100}deg)`;
      e.style.opacity=0;
    });
    setTimeout(()=>e.remove(),1500);
  }
}

// Fondo estrellado
const canvas=document.getElementById("stars"),ctx=canvas.getContext("2d");
let W,H,starfield=[];
function resize(){
  const dpr=Math.min(devicePixelRatio||1,2);
  W=canvas.width=innerWidth*dpr;H=canvas.height=innerHeight*dpr;
  canvas.style.width=innerWidth+"px";canvas.style.height=innerHeight+"px";
  starfield=Array.from({length:Math.max(70,Math.floor(innerWidth*innerHeight/9000))},()=>({
    x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.8+.4,a:Math.random()*.8+.2,s:Math.random()*.012+.004
  }));
}
function draw(){
  ctx.clearRect(0,0,W,H);
  for(const s of starfield){
    s.a+=s.s*(Math.random()>.5?1:-1);
    s.a=Math.max(.15,Math.min(1,s.a));
    ctx.beginPath();ctx.fillStyle=`rgba(255,255,255,${s.a})`;
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
  }
  requestAnimationFrame(draw);
}
addEventListener("resize",resize);resize();draw();

renderMap();updateProgress();
