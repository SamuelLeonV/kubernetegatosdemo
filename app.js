const GATOS = [
  { nombre: "Pod", desc: "Siempre corriendo, nunca en CrashLoop.", img: "https://cataas.com/cat?type=square", tag: "estable" },
  { nombre: "Kubelet", desc: "Vigila cada nodo y cada siesta.", img: "https://cataas.com/cat?position=center", tag: "nodo" },
  { nombre: "Ingress", desc: "Decide qué caricias entran al clúster.", img: "https://cataas.com/cat/says/hola", tag: "red" },
  { nombre: "Helm", desc: "Empaqueta bigotes en charts versionados.", img: "https://cataas.com/cat/gif", tag: "deploy" },
  { nombre: "Sidecar", desc: "Acompaña a todos los contenedores.", img: "https://cataas.com/cat/cute", tag: "compañero" },
  { nombre: "CronJob", desc: "Pide comida exactamente a las 7:00.", img: "https://cataas.com/cat/small", tag: "tareas" }
];

function tarjeta(gato) {
  const article = document.createElement("article");
  article.className = "card";

  const img = document.createElement("img");
  img.src = gato.img;
  img.alt = "Foto de gato llamado " + gato.nombre;
  img.loading = "lazy";

  const body = document.createElement("div");
  body.className = "card-body";

  const h3 = document.createElement("h3");
  h3.textContent = gato.nombre;

  const p = document.createElement("p");
  p.textContent = gato.desc;

  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = gato.tag;

  body.append(h3, p, tag);
  article.append(img, body);
  return article;
}

function render() {
  const galeria = document.getElementById("galeria");
  galeria.replaceChildren(...GATOS.map(tarjeta));
}

function michiAlAzar() {
  const pick = GATOS[Math.floor(Math.random() * GATOS.length)];
  const galeria = document.getElementById("galeria");
  galeria.replaceChildren(tarjeta(pick));
  const btn = document.getElementById("btn-michi");
  btn.textContent = "Otro michi al azar (" + pick.nombre + ")";
}

function mostrarIpVisitante() {
  const el = document.getElementById("visitante-ip");
  fetch("https://api.ipify.org?format=json")
    .then(function (r) { return r.json(); })
    .then(function (d) { el.textContent = d.ip; })
    .catch(function () { el.textContent = "no disponible"; });
}

function fondoAnimado() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const canvas = document.getElementById("fondo");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const COLORES = ["#fb923c", "#f43f5e", "#eab308", "#22d3ee", "#4ade80", "#db2777"];
  let W = 0, H = 0, partes = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function nueva(y0) {
    return {
      x: Math.random() * W,
      y: y0 !== undefined ? y0 : Math.random() * H,
      r: 3 + Math.random() * 9,
      c: COLORES[Math.floor(Math.random() * COLORES.length)],
      vy: 0.2 + Math.random() * 0.7,
      vx: (Math.random() - 0.5) * 0.4,
      a: 0.12 + Math.random() * 0.22
    };
  }

  function init() {
    resize();
    partes = [];
    const n = Math.min(90, Math.floor(W / 14));
    for (let i = 0; i < n; i++) partes.push(nueva());
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < partes.length; i++) {
      const p = partes[i];
      p.y -= p.vy;
      p.x += p.vx;
      if (p.y < -20) partes[i] = nueva(H + 20);
      ctx.globalAlpha = p.a;
      ctx.fillStyle = p.c;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }

  window.addEventListener("resize", init);
  init();
  frame();
}

function modalBienvenida() {
  const overlay = document.getElementById("modal-bienvenida");
  const cerrar = document.getElementById("modal-cerrar");
  if (!overlay || !cerrar) return;
  if (sessionStorage.getItem("bienvenida-vista")) return;

  function hide() {
    overlay.hidden = true;
    sessionStorage.setItem("bienvenida-vista", "1");
  }

  overlay.hidden = false;
  cerrar.focus();
  cerrar.addEventListener("click", hide);
  overlay.addEventListener("click", function (e) { if (e.target === overlay) hide(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !overlay.hidden) hide(); });
}

document.getElementById("btn-michi").addEventListener("click", michiAlAzar);
render();
mostrarIpVisitante();
fondoAnimado();
modalBienvenida();
