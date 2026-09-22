const levels = [
{
n:21,title:"El acróstico escondido",difficulty:3,
hint:"Ayuda 1: no leas las frases completas.\nAyuda 2: observa la primera letra de cada línea.\nMétodo: un acróstico forma una palabra o frase usando las iniciales.",
render(){return `
<p class="level-intro">Ocho líneas guardan el primer mensaje. Lo importante está al principio.</p>
<div class="challenge-box"><div class="code">
Tantas veces apareces en mi mente.<br>
Entre días normales, haces diferencia.<br>
Quiero seguir construyendo contigo.<br>
Una sonrisa tuya cambia el ambiente.<br>
Incluso en silencio, te recuerdo.<br>
Eres una parte bonita de mis días.<br>
Regreso a ti en mis pensamientos.<br>
Otra vez, y otra vez.
</div><input id="answer" type="text" placeholder="¿Qué frase forman?">
<div class="action-row"><button class="primary" onclick="checkText(0,'te quiero')">Comprobar</button></div><div id="feedback" class="feedback"></div></div>`},
reward:"Primera estrella de esta expansión: TE QUIERO."
},
{
n:22,title:"César romántico",difficulty:4,
hint:"Ayuda 1: es un cifrado César.\nAyuda 2: cada letra fue movida 2 lugares hacia adelante.\nMétodo: para descifrar, retrocede 2 posiciones en el alfabeto. Ejemplo: G→E.",
render(){return `
<p class="level-intro">Una frase fue desplazada dos lugares en el alfabeto.</p>
<div class="challenge-box"><div class="code">GTGU OK RCB</div>
<input id="answer" type="text" placeholder="Frase descifrada">
<div class="action-row"><button class="primary" onclick="checkText(1,'eres mi paz')">Comprobar</button></div><div id="feedback" class="feedback"></div></div>`},
reward:"A veces una frase sencilla dice muchísimo: eres mi paz."
},
{
n:23,title:"Números con significado",difficulty:4,
hint:"Ayuda 1: A=1, B=2, C=3… Z=26.\nAyuda 2: cada grupo separado por / es una palabra.\nEjemplo: 13-9 = MI.",
render(){return `
<p class="level-intro">Convierte cada número a letra.</p>
<div class="challenge-box"><div class="code">13-9 / 12-21-7-1-18 / 19-5-7-21-18-15</div>
<input id="answer" type="text" placeholder="Frase completa">
<div class="action-row"><button class="primary" onclick="checkText(2,'mi lugar seguro')">Comprobar</button></div><div id="feedback" class="feedback"></div></div>`},
reward:"Hay personas que se vuelven refugio. Mi lugar seguro."
},
{
n:24,title:"La lógica de un día",difficulty:5,
hint:"Ayuda 1: no es al azar.\nAyuda 2: la mañana abre el día y la noche lo cierra.\nAyuda 3: preguntar cómo está alguien ocurre antes de desearle que se cuide.",
render(){
const x=["Bonita noche","Cuídate mucho","Pensé en ti","Buenos días","¿Cómo estás?"];
return `
<p class="level-intro">Ordena cinco momentos en una secuencia natural.</p>
<div class="sequence-grid">${x.map(v=>`<button class="tile" data-v="${v}" onclick="seqPick(this)">${v}</button>`).join("")}</div>
<div id="sequenceZone" class="sort-zone"></div>
<div class="action-row"><button class="primary" onclick="checkSequence24()">Comprobar</button><button class="ghost" onclick="resetSequence()">Reiniciar</button></div>
<div id="feedback" class="feedback"></div>`},
reward:"Un día entero también puede contarse con pequeños cuidados."
},
{
n:25,title:"Señales en Morse",difficulty:5,
hint:"Ayuda 1: los espacios separan letras y / separa palabras.\nAyuda 2: T = -, E = ., L = .-.., I = .., J = .---, O = ---.\nCon eso ya tienes todo lo necesario.",
render(){return `
<p class="level-intro">Descifra el mensaje Morse.</p>
<div class="challenge-box"><div class="code">- . / . .-.. .. .--- ---</div>
<input id="answer" type="text" placeholder="Mensaje">
<div class="action-row"><button class="primary" onclick="checkText(4,'te elijo')">Comprobar</button></div><div id="feedback" class="feedback"></div></div>`},
reward:"Entre muchas posibilidades, una elección: te elijo."
},
{
n:26,title:"El amor en binario",difficulty:5,
hint:"Ayuda 1: cada bloque de 8 bits representa un carácter ASCII.\nAyuda 2: 01000001 = 65 decimal = A.\nPuedes convertir cada bloque de binario a decimal y luego buscar su letra ASCII.",
render(){return `
<p class="level-intro">Cuatro bytes guardan una palabra.</p>
<div class="challenge-box"><div class="code">01000001 01001101 01001111 01010010</div>
<input id="answer" type="text" placeholder="Palabra">
<div class="action-row"><button class="primary" onclick="checkText(5,'amor')">Comprobar</button></div><div id="feedback" class="feedback"></div></div>`},
reward:"Hasta en binario termina apareciendo la misma palabra: amor."
},
{
n:27,title:"Vigenère bajo la luna",difficulty:6,
hint:"Ayuda 1: es un cifrado Vigenère.\nAyuda 2: la clave es LUNA y se repite: LUNALUNA.\nAyuda 3: para descifrar, resta el valor de la letra de la clave al valor de la letra cifrada, módulo 26.\nA=0, B=1… Z=25.",
render(){return `
<p class="level-intro">Descifra el texto usando la clave <b>LUNA</b>.</p>
<div class="challenge-box"><div class="code">XCPODGBS</div>
<input id="answer" type="text" placeholder="Respuesta">
<div class="action-row"><button class="primary" onclick="checkText(6,'mi cosmos')">Comprobar</button></div><div id="feedback" class="feedback"></div></div>`},
reward:"La clave era LUNA, pero el destino volvió a ser el mismo: mi cosmos."
},
{
n:28,title:"Transposición",difficulty:6,
hint:"Ayuda 1: el mensaje original tiene 15 letras contando una X de relleno.\nAyuda 2: imagina una cuadrícula de 3 filas × 5 columnas.\nAyuda 3: el texto cifrado fue leído por columnas; para descifrar, llena por columnas y después lee las filas.",
render(){return `
<p class="level-intro">Reconstruye la cuadrícula y recupera el mensaje.</p>
<div class="challenge-box"><div class="code">SRTIEIECGMOOPNX</div>
<input id="answer" type="text" placeholder="Frase sin la X de relleno">
<div class="action-row"><button class="primary" onclick="checkText(7,'siempre contigo')">Comprobar</button></div><div id="feedback" class="feedback"></div></div>`},
reward:"Después de reordenarlo todo, queda una idea: siempre contigo."
},
{
n:29,title:"Álgebra de estrellas",difficulty:6,
hint:"Ayuda 1: primero descubre cuánto vale cada símbolo.\n♡+♡=20, por lo tanto ♡=10.\n★+★=12, por lo tanto ★=6.\n☾+★=13, por lo tanto ☾=7.\nDespués calcula las tres expresiones y conviértelas con A=1…Z=26.",
render(){return `
<p class="level-intro">Resuelve los símbolos y convierte los tres resultados a letras.</p>
<div class="challenge-box"><div class="code">
♡ + ♡ = 20<br>★ + ★ = 12<br>☾ + ★ = 13<br><br>
♡ + ★ = ?<br>☾ − ★ = ?<br>♡ + ♡ + ★ = ?
</div>
<input id="answer" type="text" placeholder="Tres letras">
<div class="action-row"><button class="primary" onclick="checkText(8,'paz')">Comprobar</button></div><div id="feedback" class="feedback"></div></div>`},
reward:"Tres operaciones y una palabra: PAZ."
},
{
n:30,title:"Cada tercera letra",difficulty:6,
hint:"Ayuda 1: ignora las dos primeras letras de cada grupo de tres.\nAyuda 2: toma las posiciones 3, 6, 9, 12…\nSi empiezas bien, las primeras letras obtenidas son C-U-I…",
render(){return `
<p class="level-intro">Hay ruido. Solo una de cada tres letras importa.</p>
<div class="challenge-box"><div class="code">abCcdUefIghDijAklRmnTopE</div>
<input id="answer" type="text" placeholder="Palabra">
<div class="action-row"><button class="primary" onclick="checkText(9,'cuidarte')">Comprobar</button></div><div id="feedback" class="feedback"></div></div>`},
reward:"Una palabra escondida entre ruido: cuidarte."
},
{
n:31,title:"Cuadrado de Polybius",difficulty:7,
hint:"Ayuda 1: cada número tiene dos dígitos: fila y columna.\nAyuda 2: usa esta tabla 5×5: ABCDE / FGHIK / LMNOP / QRSTU / VWXYZ.\nI y J comparten casilla.\nEjemplo: 44 = T.",
render(){return `
<p class="level-intro">Convierte coordenadas en letras.</p>
<div class="challenge-box"><div class="code">44 15 / 41 45 24 15 42 34</div>
<input id="answer" type="text" placeholder="Frase">
<div class="action-row"><button class="primary" onclick="checkText(10,'te quiero')">Comprobar</button></div><div id="feedback" class="feedback"></div></div>`},
reward:"Otra ruta distinta, la misma verdad: te quiero."
},
{
n:32,title:"La caja verdadera",difficulty:7,
hint:"Ayuda 1: exactamente UNA de las cuatro afirmaciones es verdadera.\nAyuda 2: prueba mentalmente cada posible caja y cuenta cuántas frases resultarían verdaderas.\nSolo una ubicación deja exactamente una afirmación verdadera.",
render(){return `
<p class="level-intro">El corazón está en una de cuatro cajas: A, B, C o D. Exactamente una frase es verdadera.</p>
<div class="logic-list">
<div class="logic-card"><b>A:</b> El corazón NO está en B.</div>
<div class="logic-card"><b>B:</b> El corazón está en D.</div>
<div class="logic-card"><b>C:</b> El corazón está en A.</div>
<div class="logic-card"><b>D:</b> El corazón NO está en A.</div>
</div>
<div class="challenge-box"><input id="answer" type="text" placeholder="A, B, C o D">
<div class="action-row"><button class="primary" onclick="checkText(11,'b')">Comprobar</button></div><div id="feedback" class="feedback"></div></div>`},
reward:"La lógica también puede encontrar un corazón: estaba en la caja B."
},
{
n:33,title:"Dos capas",difficulty:7,
hint:"Ayuda 1: primero invierte cada bloque por separado.\nEjemplo: ABC → CBA.\nAyuda 2: después aplica César −3.\nEs decir, D→A, E→B, F→C…",
render(){return `
<p class="level-intro">El mensaje tiene dos transformaciones.</p>
<div class="challenge-box"><div class="code">HUSPHLV XW</div>
<input id="answer" type="text" placeholder="Frase final">
<div class="action-row"><button class="primary" onclick="checkText(12,'siempre tu')">Comprobar</button></div><div id="feedback" class="feedback"></div></div>`},
reward:"Después de dos capas: siempre tú."
},
{
n:34,title:"El espejo del alfabeto",difficulty:7,
hint:"Ayuda 1: usa Atbash.\nAyuda 2: el alfabeto se refleja: A↔Z, B↔Y, C↔X, D↔W…\nSustituye cada letra por su opuesta.",
render(){return `
<p class="level-intro">El alfabeto fue puesto frente a un espejo.</p>
<div class="challenge-box"><div class="code">ZNLI YLMRGL</div>
<input id="answer" type="text" placeholder="Frase">
<div class="action-row"><button class="primary" onclick="checkText(13,'amor bonito')">Comprobar</button></div><div id="feedback" class="feedback"></div></div>`},
reward:"El espejo devolvió una frase conocida: amor bonito."
},
{
n:35,title:"Base64",difficulty:8,
hint:"Ayuda 1: esto no es un cifrado clásico, es una codificación Base64.\nAyuda 2: puedes reconocerla porque usa letras, números y a veces =.\nAyuda 3: al decodificar TUkgTFVHQVIgU0VHVVJP obtendrás texto ASCII legible.",
render(){return `
<p class="level-intro">Decodifica esta cadena Base64.</p>
<div class="challenge-box"><div class="code">TUkgTFVHQVIgU0VHVVJP</div>
<input id="answer" type="text" placeholder="Texto decodificado">
<div class="action-row"><button class="primary" onclick="checkText(14,'mi lugar seguro')">Comprobar</button></div><div id="feedback" class="feedback"></div></div>`},
reward:"Incluso codificado, el lugar sigue siendo el mismo: mi lugar seguro."
},
{
n:36,title:"Teclado desplazado",difficulty:8,
hint:"Ayuda 1: imagina un teclado QWERTY.\nAyuda 2: cada letra fue escrita pulsando la tecla inmediatamente a la DERECHA de la que se quería escribir.\nPara descifrar, mueve cada letra una tecla a la IZQUIERDA.\nEjemplo: Y→T, R→E.",
render(){return `
<p class="level-intro">Alguien escribió con los dedos desplazados una tecla hacia la derecha.</p>
<div class="challenge-box"><div class="code">YR WIORTP</div>
<input id="answer" type="text" placeholder="¿Qué quiso escribir?">
<div class="action-row"><button class="primary" onclick="checkText(15,'te quiero')">Comprobar</button></div><div id="feedback" class="feedback"></div></div>`},
reward:"Hasta equivocándose de teclas, termina diciendo: te quiero."
},
{
n:37,title:"Cifrado de libro",difficulty:8,
hint:"Ayuda 1: cada coordenada tiene formato LÍNEA-PALABRA-LETRA.\nEjemplo: 1-1-1 = primera línea, primera palabra, primera letra.\nHazlo para las siete coordenadas y une las letras.",
render(){return `
<p class="level-intro">Usa el pequeño texto como “libro” y extrae siete letras.</p>
<div class="challenge-box"><div class="code">
1. Cielo sereno guarda tus risas<br>
2. Hoy encuentro refugio en ti<br>
3. Nuestros instantes dibujan caminos<br>
4. Amarte inspira futuros tranquilos<br><br>
Coordenadas:<br>
1-1-1 / 2-1-3 / 3-1-1 / 1-4-1 / 2-1-1 / 3-2-1 / 4-1-1
</div>
<input id="answer" type="text" placeholder="Siete letras">
<div class="action-row"><button class="primary" onclick="checkText(16,'cynthia')">Comprobar</button></div><div id="feedback" class="feedback"></div></div>`},
reward:"El nombre estaba escondido dentro del propio texto: Cynthia."
},
{
n:38,title:"Código Maestro",difficulty:9,
hint:"Ayuda 1: el código tiene 4 dígitos distintos.\nEn cada intento se indica: “dígitos correctos en total / de ellos, cuántos están en posición correcta”.\nAyuda 2: 5427 tiene 3 dígitos correctos, pero NINGUNO está en su sitio.\nAyuda 3: 7241 contiene los cuatro dígitos correctos y dos ya están bien colocados.",
render(){return `
<p class="level-intro">Encuentra un código de cuatro dígitos distintos.</p>
<div class="logic-list">
<div class="logic-card"><b>1234</b> → 3 correctos / 1 en posición correcta</div>
<div class="logic-card"><b>4178</b> → 3 correctos / 2 en posición correcta</div>
<div class="logic-card"><b>2701</b> → 3 correctos / 1 en posición correcta</div>
<div class="logic-card"><b>5427</b> → 3 correctos / 0 en posición correcta</div>
<div class="logic-card"><b>7241</b> → 4 correctos / 2 en posición correcta</div>
</div>
<div class="challenge-box"><input id="answer" inputmode="numeric" type="text" placeholder="Código de 4 dígitos">
<div class="action-row"><button class="primary" onclick="checkText(17,'4271')">Comprobar</button></div><div id="feedback" class="feedback"></div></div>`},
reward:"Código abierto: 4271."
},
{
n:39,title:"Dos sistemas a la vez",difficulty:10,
hint:"Ayuda 1: convierte primero los números con A=1, B=2… Z=26.\nEso produce una frase todavía cifrada.\nAyuda 2: esa frase está en César +3.\nAyuda 3: después de convertir números obtendrás: VLHPSUH WH HOLMR. Retrocede 3 letras.",
render(){return `
<p class="level-intro">Este mensaje combina A1Z26 y César. Debes hacer ambos pasos en el orden correcto.</p>
<div class="challenge-box"><div class="code">
22 12 8 16 19 21 8 / 23 8 / 8 15 12 13 18
</div>
<input id="answer" type="text" placeholder="Frase final">
<div class="action-row"><button class="primary" onclick="checkText(18,'siempre te elijo')">Comprobar</button></div><div id="feedback" class="feedback"></div></div>`},
reward:"Dos sistemas diferentes terminaron en una frase: siempre te elijo."
},
{
n:40,title:"La última bóveda",difficulty:10,
hint:"Ayuda 1: hay DOS pasos.\nPaso 1: invierte toda la cadena ZRSGMBX → XBMGSRZ.\nPaso 2: aplica Atbash: A↔Z, B↔Y, C↔X…\nLa respuesta final es un nombre de siete letras.",
render(){return `
<div class="final-heart">💛</div>
<p class="level-intro" style="text-align:center">Última estrella. Dos transformaciones separan la bóveda de su respuesta.</p>
<div class="challenge-box"><div class="code" style="text-align:center;font-size:1.35rem">ZRSGMBX</div>
<input id="answer" type="text" placeholder="Nombre final">
<div class="action-row" style="justify-content:center"><button class="primary" onclick="checkText(19,'cynthia')">Abrir la bóveda</button></div><div id="feedback" class="feedback" style="text-align:center"></div></div>`},
reward:"Cuarenta niveles después, el centro de todo este universo sigue teniendo el mismo nombre: Cynthia."
}
];

let current=0;
let progress=Number(localStorage.getItem("cynthiaProgress21_40")||0);
let seq=[];

const $=id=>document.getElementById(id);
$("beginBtn").onclick=()=>{$("intro").classList.add("hidden");renderMap();loadLevel(Math.min(progress,19))}
$("nextBtn").onclick=()=>{$("unlockOverlay").classList.add("hidden");if(progress>=20){showFinal();return}loadLevel(Math.min(progress,19))}
$("resetBtn").onclick=()=>{if(confirm("¿Borrar el progreso de los niveles 21–40?")){localStorage.removeItem("cynthiaProgress21_40");progress=0;current=0;renderMap();loadLevel(0)}}
$("hintBtn").onclick=()=>{$("hintText").textContent=levels[current].hint}

function norm(s){return (s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9 ]/g,"").replace(/\s+/g," ").trim()}
function feedback(msg,good=false){const e=$("feedback");if(e){e.textContent=msg;e.style.color=good?"#c8ffd9":"#ffe3a0"}}
function updateProgress(){$("progressText").textContent=`${progress} / 20`;$("progressBar").style.width=`${progress*5}%`}
function renderMap(){
const pos=[[8,8],[29,6],[50,10],[72,7],[86,19],[68,23],[47,22],[25,25],[8,31],[18,43],[39,39],[60,40],[82,38],[88,53],[67,54],[46,53],[24,58],[10,70],[34,75],[64,73]];
$("map").innerHTML=levels.map((l,i)=>{
const unlocked=i<=progress;const z=i>=15?"extreme":i>=10?"hard":"";
return `<button class="star-node ${unlocked?"unlocked":"locked"} ${i===current?"active":""} ${z}" style="left:${pos[i][0]}%;top:${pos[i][1]}%" data-label="${l.n}" onclick="mapGo(${i})" ${unlocked?"":"disabled"}>${l.n}</button>`
}).join("");updateProgress()
}
function mapGo(i){if(i<=progress)loadLevel(i)}
function loadLevel(i){
current=i;seq=[];$("levelNumber").textContent=`NIVEL ${levels[i].n}`;$("levelTitle").textContent=levels[i].title;
$("difficulty").textContent="✦".repeat(levels[i].difficulty)+"☆".repeat(Math.max(0,10-levels[i].difficulty));
$("hintText").textContent="";$("levelBody").innerHTML=levels[i].render();renderMap();
$("gameArea").scrollIntoView({behavior:"smooth",block:"start"})
}
function checkText(i,expected){
const v=norm($("answer").value);
if(v===norm(expected)){feedback("Correcto ✨",true);setTimeout(()=>complete(i),350)}
else feedback("Aún no. Si ya llevas varios intentos, abre la ayuda: explica el método.")
}
function complete(i){
if(i===progress){progress++;localStorage.setItem("cynthiaProgress21_40",String(progress))}
renderMap();$("unlockTitle").textContent=i===19?"Bóveda abierta":`Nivel ${levels[i].n} superado`;
$("unlockReward").textContent=levels[i].reward;$("unlockOverlay").classList.remove("hidden");burst()
}
function seqPick(btn){
if(btn.classList.contains("selected"))return;btn.classList.add("selected");seq.push(btn.dataset.v);
$("sequenceZone").innerHTML=seq.map((v,i)=>`<span class="sort-item">${i+1}. ${v}</span>`).join("")
}
function resetSequence(){seq=[];document.querySelectorAll(".tile").forEach(x=>x.classList.remove("selected"));$("sequenceZone").innerHTML="";feedback("")}
function checkSequence24(){
const ex=["Buenos días","¿Cómo estás?","Pensé en ti","Cuídate mucho","Bonita noche"];
if(seq.length===5&&seq.every((v,i)=>v===ex[i])){feedback("Orden correcto ✨",true);setTimeout(()=>complete(3),350)}
else feedback("Algún momento está fuera de lugar. Usa las pistas temporales.")
}
function showFinal(){
$("levelNumber").textContent="FINAL";$("levelTitle").textContent="La segunda constelación está completa";$("difficulty").textContent="★★★★★★★★★★";$("hintText").textContent="";
$("levelBody").innerHTML=`<div class="final-heart">💛</div><div class="challenge-box"><p style="text-align:center;font-size:1.15rem;line-height:1.9">
Llegaste del nivel 21 al 40. Esta vez hubo más códigos, más lógica y más vueltas, pero la idea detrás de todos los acertijos seguía siendo sencilla:
<br><br><strong>pienso en ti, te cuido, te elijo y me gusta construir cosas bonitas para ti.</strong>
<br><br>— Juan Carlos
</p></div>`;renderMap();$("gameArea").scrollIntoView({behavior:"smooth"})
}
function burst(){
for(let i=0;i<24;i++){const e=document.createElement("div");e.textContent=i%3?"✦":"♡";e.style.cssText=`position:fixed;z-index:80;left:${45+Math.random()*10}vw;top:${46+Math.random()*8}vh;color:${i%2?"#f4cf7f":"#ffd6e8"};font-size:${14+Math.random()*18}px;pointer-events:none;transition:1.4s ease`;document.body.appendChild(e);requestAnimationFrame(()=>{e.style.transform=`translate(${(Math.random()-.5)*260}px,${-80-Math.random()*180}px) rotate(${Math.random()*100}deg)`;e.style.opacity=0});setTimeout(()=>e.remove(),1500)}
}

// fondo estrellado
const c=$("stars"),ctx=c.getContext("2d");let W,H,field=[];
function resize(){const d=Math.min(devicePixelRatio||1,2);W=c.width=innerWidth*d;H=c.height=innerHeight*d;c.style.width=innerWidth+"px";c.style.height=innerHeight+"px";field=Array.from({length:Math.max(70,Math.floor(innerWidth*innerHeight/9000))},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.8+.4,a:Math.random()*.8+.2,s:Math.random()*.012+.004}))}
function draw(){ctx.clearRect(0,0,W,H);for(const s of field){s.a+=s.s*(Math.random()>.5?1:-1);s.a=Math.max(.15,Math.min(1,s.a));ctx.beginPath();ctx.fillStyle=`rgba(255,255,255,${s.a})`;ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill()}requestAnimationFrame(draw)}
addEventListener("resize",resize);resize();draw();renderMap();updateProgress();