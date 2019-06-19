// script.js

const TAU = Zdog.TAU;

let illo = new Zdog.Illustration({
  element: ".zdog-canvas",
  zoom: 1.5
});

// Flag

let flag = new Zdog.Group({
  addTo: illo,
  translate: { x: 25, y: -20, z: -25 }
});

new Zdog.RoundedRect({
  addTo: flag,
  width: 6,
  height: 50,
  fill: true,
  color: "#fe2800",
  cornerRadius: 12
});

new Zdog.Rect({
  addTo: flag,
  width: 26,
  height: 12,
  translate: { x: -10, y: -20 },
  fill: true,
  color: "#fe2800",
  cornerRadius: 30
});

// Mail

let mail = new Zdog.Group({
  addTo: illo,
  translate: { x: 20, y: -5, z: 0 },
  rotate: { x: TAU / 8 }
});

new Zdog.Rect({
  addTo: mail,
  width: 50,
  height: 40,
  fill: true,
  color: "#fff",
  backface: "#fff"
});

new Zdog.Shape({
  addTo: mail,
  path: [
    { x: -25, y: -20, z: 0 },
    { x: 0, y: 8, z: 0 },
    { x: 25, y: -20, z: 0 }
  ],
  closed: false,
  color: "#ddd"
});

new Zdog.Shape({
  addTo: mail,
  path: [{ x: -25, y: 20, z: 0 }, { x: -8, y: 0, z: 0 }],
  closed: false,
  color: "#ddd"
});

new Zdog.Shape({
  addTo: mail,
  path: [{ x: 25, y: 20, z: 0 }, { x: 8, y: 0, z: 0 }],
  closed: false,
  color: "#ddd"
});

// Box top

let cover = new Zdog.Group({
  addTo: illo,
  translate: { x: -40, y: -20, z: -20 },
  rotate: { y: TAU / 4 }
});

new Zdog.Shape({
  addTo: cover,
  path: [
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: -80 },
    { x: 4, y: -9, z: -80 },
    { x: 4, y: -9, z: 0 }
  ],
  closed: true,
  color: "#016ec8",
  backface: "#016ec8",
  fill: true
});

new Zdog.Shape({
  addTo: cover,
  path: [
    { x: 4, y: -9, z: 0 },
    { x: 4, y: -9, z: -80 },
    { x: 12, y: -15, z: -80 },
    { x: 12, y: -15, z: 0 }
  ],
  closed: true,
  color: "#016ec8",
  backface: "#016ec8",
  fill: true
});

new Zdog.Shape({
  addTo: cover,
  path: [
    { x: 12, y: -15, z: 0 },
    { x: 12, y: -15, z: -80 },
    { x: 20, y: -17, z: -80 },
    { x: 20, y: -17, z: 0 }
  ],
  closed: true,
  color: "#016ec8",
  backface: "#016ec8",
  fill: true
});

cover.copyGraph({
  addTo: illo,
  rotate: { y: -TAU / 4 },
  translate: { x: 40, y: -20, z: 20 }
});

// Box sides

let right = new Zdog.Rect({
  addTo: illo,
  width: 80,
  height: 40,
  translate: { z: 20 },
  fill: true,
  color: "#016ec8",
  backface: "#00458a"
});

let left = new Zdog.Rect({
  addTo: illo,
  width: 80,
  height: 40,
  translate: { z: -20 },
  rotate: { x: TAU / 2 },
  fill: true,
  color: "#016ec8",
  backface: "#00458a"
});

let bottom = new Zdog.Rect({
  addTo: illo,
  width: 80,
  height: 40,
  translate: { y: 20 },
  rotate: { x: -TAU / 4 },
  fill: true,
  color: "#016ec8",
  backface: "#00458a"
});

// Box back

new Zdog.Shape({
  addTo: illo,
  path: [
    { x: 0, y: 0, z: 0 },
    { x: 4, y: -9, z: 0 },
    { x: 12, y: -15, z: 0 },
    { x: 20, y: -17, z: 0 },
    { x: 28, y: -15, z: 0 },
    { x: 36, y: -9, z: 0 },
    { x: 40, y: 0, z: 0 }
  ],
  closed: true,
  color: "#005cb3",
  backface: "#016ec8",
  fill: true,
  translate: { x: -40, y: -20, z: -20 },
  rotate: { y: TAU / 4 }
});

let back = new Zdog.Rect({
  addTo: illo,
  width: 40,
  height: 40,
  translate: { x: -40 },
  rotate: { y: TAU / 4 },
  fill: true,
  color: "#005cb3",
  backface: "#016ec8"
});

// Pole

new Zdog.Cylinder({
  addTo: illo,
  diameter: 15,
  length: 60,
  color: "#bcbcbc",
  backface: "#aaa",
  translate: { y: 50 },
  rotate: { x: TAU / 4 }
});

function animate() {
  illo.rotate.x = -0.75;
  illo.rotate.y += 0.01;
  illo.updateRenderGraph();
  requestAnimationFrame(animate);
}

animate();

// Popover

const popover = document.createElement("div");
popover.className = "popover";
const image = document.createElement("img");
popover.appendChild(image);
const body = document.querySelectorAll("body")[0];
body.appendChild(popover);

const links = document.getElementsByClassName("link");

let wait = false;

const move = function(event) {
  popover.style.left = event.pageX + 15 + "px";
  popover.style.top = event.pageY + 25 + "px";
};

let show = function() {
  image.src = this.getAttribute("data-preview");
  popover.style.visibility = "visible";
  move(event);
};

let hide = function() {
  image.src = "";
  popover.style.visibility = "hidden";
  move(event);
};

Array.from(links).forEach(function(link) {
  link.addEventListener("mouseenter", show, false);
  link.addEventListener("mousemove", move, false);
  link.addEventListener("mouseleave", hide, false);
});
