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

document.getElementById("btn-michi").addEventListener("click", michiAlAzar);
render();
mostrarIpVisitante();
