(() => {
const css = String.raw`
:root{
  --bg:#071225;
  --bg2:#0c1d38;
  --gold:#f4cf7f;
  --gold2:#e2ae4f;
  --cream:#fff8ed;
  --ink:#f4eee6;
  --muted:#cfc8be;
  --pink:#ff9fcf;
  --blue:#8db7ff;
  --green:#9ce8b9;
  --red:#ff8ca6;
  --line:rgba(244,207,127,.28);
  --glass:rgba(255,255,255,.075);
  --shadow:0 24px 70px rgba(0,0,0,.38);
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  margin:0;min-height:100vh;overflow-x:hidden;
  font-family:ui-serif,Georgia,Cambria,"Times New Roman",serif;
  color:var(--ink);
  background:
    radial-gradient(circle at 15% 10%,rgba(255,159,207,.10),transparent 28%),
    radial-gradient(circle at 80% 18%,rgba(111,160,255,.10),transparent 30%),
    linear-gradient(180deg,var(--bg),var(--bg2) 45%,#07101e);
}
#stars{position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none}
.aurora{
  position:fixed;inset:-20%;pointer-events:none;z-index:0;
  background:
    radial-gradient(ellipse at 20% 30%,rgba(255,154,207,.09),transparent 35%),
    radial-gradient(ellipse at 75% 25%,rgba(125,180,255,.09),transparent 38%),
    radial-gradient(ellipse at 50% 90%,rgba(244,207,127,.08),transparent 40%);
  filter:blur(42px);animation:drift 16s ease-in-out infinite alternate;
}
@keyframes drift{from{transform:translate3d(-1%,0,0) scale(1)}to{transform:translate3d(1%,-1%,0) scale(1.05)}}
.app-shell{
  position:relative;z-index:2;
  width:min(1120px,calc(100% - 22px));
  margin:0 auto;
  padding:max(18px,env(safe-area-inset-top)) 0 max(34px,env(safe-area-inset-bottom));
}
.glass{
  background:var(--glass);
  border:1px solid var(--line);
  backdrop-filter:blur(14px);
  -webkit-backdrop-filter:blur(14px);
  box-shadow:var(--shadow);
}
.topbar{
  position:sticky;top:10px;z-index:10;
  display:grid;grid-template-columns:1fr minmax(160px,320px) auto;
  gap:18px;align-items:center;
  border-radius:22px;padding:14px 16px;
}
.brand{font-size:1.12rem;color:var(--gold)}
.tiny{font-size:.72rem;letter-spacing:.18em;text-transform:uppercase;color:var(--muted)}
.progress-text{font-size:.82rem;color:var(--muted);margin-bottom:6px;text-align:right}
.progress-track{height:8px;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden}
.progress-bar{height:100%;width:0;background:linear-gradient(90deg,var(--gold2),var(--gold));transition:width .5s ease}
.hero{
  min-height:80svh;
  display:grid;grid-template-columns:1fr 1fr;
  gap:34px;align-items:center;
  padding:58px 8px 38px;
}
.eyebrow{color:var(--gold);letter-spacing:.16em;font-size:.77rem;margin-bottom:16px}
.hero h2{font-size:clamp(2.6rem,7vw,5.4rem);line-height:.96;margin:.05em 0 .24em;color:var(--cream);font-weight:600}
.hero p{font-size:clamp(1.05rem,2.6vw,1.25rem);line-height:1.75;color:#eee6dc;max-width:690px}
.legend{display:flex;flex-wrap:wrap;gap:10px 16px;margin-top:22px;color:var(--muted);font-size:.86rem}
.legend span{display:flex;align-items:center;gap:7px}
.dot{display:inline-block;width:9px;height:9px;border-radius:50%}
.dot.easy{background:#a7d8ff}.dot.mid{background:#f4cf7f}.dot.hard{background:#ffb0d6}.dot.extreme{background:#c6a4ff}
.constellation-map{
  position:relative;min-height:590px;border-radius:32px;
  border:1px solid rgba(255,255,255,.08);
  background:radial-gradient(circle at 50% 50%,rgba(244,207,127,.06),transparent 42%),rgba(255,255,255,.025);
  overflow:hidden;
}
.constellation-map::before{
  content:"";position:absolute;inset:0;
  background-image:
    linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);
  background-size:38px 38px;
}
.star-node{
  position:absolute;width:46px;height:46px;border-radius:50%;
  display:grid;place-items:center;
  border:1px solid rgba(255,255,255,.12);
  background:rgba(255,255,255,.05);
  color:#a9a398;cursor:pointer;
  transition:.25s ease;font-weight:700;
}
.star-node.unlocked{
  color:#2b2112;
  background:radial-gradient(circle,#fff4c7,var(--gold));
  box-shadow:0 0 28px rgba(244,207,127,.33);
}
.star-node.hard-zone.unlocked{
  background:radial-gradient(circle,#ffe6f2,#ff9fcf);
  box-shadow:0 0 28px rgba(255,159,207,.28);
}
.star-node.extreme-zone.unlocked{
  background:radial-gradient(circle,#efe5ff,#b998ff);
  box-shadow:0 0 30px rgba(185,152,255,.33);
}
.star-node.active{transform:scale(1.16);outline:2px solid rgba(255,255,255,.24)}
.star-node.locked{opacity:.38;cursor:not-allowed}
.star-node::after{
  content:attr(data-label);position:absolute;top:54px;left:50%;transform:translateX(-50%);
  white-space:nowrap;font-size:.65rem;color:var(--muted);
}
.game-area{padding:18px 0 44px}
.level-card{border-radius:28px;padding:clamp(22px,5vw,42px)}
.level-head{display:flex;justify-content:space-between;align-items:flex-start;gap:18px;margin-bottom:18px}
.level-head h3{font-size:clamp(1.7rem,4vw,2.5rem);margin:.18em 0;color:var(--gold)}
.difficulty{color:var(--gold);letter-spacing:.1em;white-space:nowrap}
.level-intro{font-size:1.08rem;line-height:1.75;color:#f2ebe2}
.challenge-box{
  margin-top:18px;padding:22px;border-radius:22px;
  background:rgba(255,255,255,.045);
  border:1px solid rgba(255,255,255,.11);
}
.code{
  font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;
  letter-spacing:.08em;color:#fff3c9;font-size:clamp(.95rem,2.8vw,1.2rem);
  word-break:break-word;line-height:1.7;
}
input[type="text"],input[type="number"]{
  width:100%;margin-top:14px;padding:14px 16px;border-radius:16px;
  border:1px solid var(--line);background:rgba(0,0,0,.18);color:white;
  font-size:1rem;outline:none;
}
input:focus{border-color:rgba(244,207,127,.65);box-shadow:0 0 0 3px rgba(244,207,127,.08)}
button{font:inherit}
.primary,.ghost,.option,.tile,.symbol-btn{
  border:none;cursor:pointer;border-radius:999px;padding:12px 18px;transition:.2s ease;
}
.primary{background:linear-gradient(135deg,var(--gold),var(--gold2));color:#241c10;font-weight:700;box-shadow:0 14px 30px rgba(244,207,127,.18)}
.primary:active,.ghost:active,.option:active,.tile:active,.symbol-btn:active{transform:scale(.98)}
.ghost{color:var(--cream);background:rgba(255,255,255,.055);border:1px solid var(--line)}
.small{padding:9px 12px;font-size:.82rem}
.action-row{display:flex;gap:10px;flex-wrap:wrap;margin-top:14px}
.hint-row{display:flex;align-items:center;gap:14px;margin-top:18px;min-height:42px}
.hint-text{color:#ffe8ad;font-size:.95rem}
.options{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:16px}
.option{min-height:64px;color:var(--cream);background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.11);text-align:left}
.option.correct{border-color:rgba(126,233,168,.6);background:rgba(126,233,168,.09)}
.option.wrong{border-color:rgba(255,122,150,.6);background:rgba(255,122,150,.08)}
.feedback{min-height:28px;margin-top:12px;color:#ffecbd}
.hidden{display:none!important}
.overlay{
  position:fixed;inset:0;z-index:50;display:grid;place-items:center;
  background:linear-gradient(180deg,rgba(4,9,18,.95),rgba(7,18,37,.98));padding:20px;
}
.intro-card,.unlock-card{width:min(92vw,640px);border-radius:30px;padding:34px 24px;text-align:center}
.intro-card h1,.unlock-card h2{color:var(--gold);font-size:clamp(2.5rem,8vw,4.6rem);margin:.15em 0 .28em}
.intro-card p,.unlock-card p{font-size:1.12rem;line-height:1.75}
.intro-sub{color:var(--muted);font-size:1rem!important}
.moon{
  width:86px;height:86px;border-radius:50%;margin:12px auto 22px;position:relative;
  background:radial-gradient(circle at 35% 30%,#fff2bd,#e6b85a 55%,#684719);
  box-shadow:0 0 42px rgba(244,207,127,.28)
}
.moon:after{content:"";position:absolute;inset:8px 0 0 20px;border-radius:50%;background:#071225}
.unlock-star{font-size:4rem;color:var(--gold);animation:pulse 1.4s infinite}
@keyframes pulse{0%,100%{transform:scale(.92)}50%{transform:scale(1.08)}}
.sequence-grid,.symbol-grid,.memory-grid{
  display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-top:16px
}
.tile,.symbol-btn{
  border-radius:16px;min-height:58px;background:rgba(255,255,255,.05);
  color:var(--cream);border:1px solid rgba(255,255,255,.12)
}
.tile.selected,.symbol-btn.selected{background:rgba(244,207,127,.13);border-color:rgba(244,207,127,.52)}
.memory-card{
  aspect-ratio:1.2/1;border-radius:18px;display:grid;place-items:center;
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.11);
  cursor:pointer;font-size:1.6rem;user-select:none;
}
.memory-card.revealed{background:rgba(244,207,127,.10)}
.path-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:16px}
.path-card{
  border-radius:22px;padding:18px;min-height:150px;background:rgba(255,255,255,.045);
  border:1px solid rgba(255,255,255,.11);cursor:pointer
}
.path-card h4{color:var(--gold);margin:.1em 0 .45em}
.path-card p{line-height:1.55}
.sort-zone{
  display:flex;flex-wrap:wrap;gap:10px;margin-top:14px;padding:16px;border-radius:18px;
  min-height:82px;border:1px dashed rgba(244,207,127,.38);background:rgba(255,255,255,.03)
}
.sort-item{padding:10px 13px;border-radius:14px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);cursor:pointer}
.final-heart{font-size:4rem;text-align:center;margin:12px 0;animation:pulse 1.6s infinite}
.grid-5{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin-top:14px}
.logic-card{padding:14px;border-radius:18px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.11)}
.logic-card b{color:var(--gold)}
.word-grid{
  display:grid;grid-template-columns:repeat(8,1fr);gap:5px;margin-top:14px;
  font-family:ui-monospace,SFMono-Regular,Menlo,monospace
}
.word-cell{
  aspect-ratio:1/1;border-radius:8px;display:grid;place-items:center;
  border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.04);
  font-size:.95rem;cursor:pointer;user-select:none
}
.word-cell.on{background:rgba(255,159,207,.15);border-color:rgba(255,159,207,.55);color:#ffe9f3}
.combo-row{display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center;margin-top:12px}
.combo-row span{text-align:center;color:var(--gold)}
.mini-input{margin-top:0!important}
.toast{
  position:fixed;left:50%;bottom:26px;transform:translateX(-50%);z-index:90;
  padding:12px 16px;border-radius:999px;background:rgba(10,20,38,.96);
  border:1px solid var(--line);color:var(--cream);box-shadow:var(--shadow)
}
footer{text-align:center;padding:18px 0 6px;color:#aaa39a;font-size:.86rem}
@media(max-width:820px){
  .topbar{grid-template-columns:1fr auto;gap:12px}
  .progress-wrap{grid-column:1/-1;order:3}.progress-text{text-align:left}
  .hero{grid-template-columns:1fr;min-height:auto;padding-top:42px}
  .constellation-map{min-height:560px}
  .options,.path-grid{grid-template-columns:1fr}
  .sequence-grid,.symbol-grid,.memory-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .grid-5{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media(max-width:560px){
  .constellation-map{min-height:620px}
  .star-node{width:42px;height:42px}
  .star-node::after{top:49px}
  .combo-row{grid-template-columns:1fr}
  .combo-row span{transform:rotate(90deg)}
}
@media(prefers-reduced-motion:reduce){
  *{animation:none!important;transition:none!important}
  html{scroll-behavior:auto}
}
`;
const style = document.createElement('style');
style.id = 'cynthia-universe-styles';
style.textContent = css;
document.head.appendChild(style);
})();