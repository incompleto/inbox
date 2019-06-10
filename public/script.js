// script.js

const TAU = Zdog.TAU;

let illo = new Zdog.Illustration({
  element: ".zdog-canvas",
  dragRotate: true,
  zoom: 2
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
  color: "#eee",
  backface: "#eee"
});

new Zdog.Shape({
  addTo: mail,
  path: [
    { x: -25, y: -20, z: 0 },
    { x: 0, y: 8, z: 0 },
    { x: 25, y: -20, z: 0 }
  ],
  closed: false,
  color: "#ccc"
});

new Zdog.Shape({
  addTo: mail,
  path: [{ x: -25, y: 20, z: 0 }, { x: -8, y: 0, z: 0 }],
  closed: false,
  color: "#ccc"
});

new Zdog.Shape({
  addTo: mail,
  path: [{ x: 25, y: 20, z: 0 }, { x: 8, y: 0, z: 0 }],
  closed: false,
  color: "#ccc"
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
  color: "#f21e05",
  cornerRadius: 12
});

new Zdog.Rect({
  addTo: flag,
  width: 26,
  height: 12,
  translate: { x: -10, y: -20 },
  fill: true,
  color: "#f21e05",
  backface: "#f00",
  cornerRadius: 30
});

// Box

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
  color: "#4196bf",
  backface: "#4196bf",
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
  color: "#4196bf",
  backface: "#4196bf",
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
  color: "#4196bf",
  backface: "#4196bf",
  fill: true
});

cover.copyGraph({
  addTo: illo,
  rotate: { y: -TAU / 4 },
  translate: { x: 40, y: -20, z: 20 }
});

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
  color: "#308bb6",
  backface: "#307597",
  fill: true,
  translate: { x: -40, y: -20, z: -20 },
  rotate: { y: TAU / 4 }
});

let right = new Zdog.Rect({
  addTo: illo,
  width: 80,
  height: 40,
  translate: { z: 20 },
  fill: true,
  color: "#4196bf",
  backface: "#307597"
});

let left = new Zdog.Rect({
  addTo: illo,
  width: 80,
  height: 40,
  translate: { z: -20 },
  rotate: { x: TAU / 2 },
  fill: true,
  color: "#4196bf",
  backface: "#307597"
});

let back = new Zdog.Rect({
  addTo: illo,
  width: 40,
  height: 40,
  translate: { x: -40 },
  rotate: { y: TAU / 4 },
  fill: true,
  color: "#308bb6",
  backface: "#307597"
});

let bottom = new Zdog.Rect({
  addTo: illo,
  width: 80,
  height: 40,
  translate: { y: 20 },
  rotate: { x: -TAU / 4 },
  fill: true,
  color: "#4196bf",
  backface: "#307597"
});

// Pole

new Zdog.Cylinder({
  addTo: illo,
  diameter: 15,
  length: 60,
  color: "#ccc",
  backface: "#aaa",
  translate: { y: 50 },
  rotate: { x: TAU / 4 }
});

function animate() {
  illo.rotate.x = -0.75;
  illo.rotate.y += 0.015;
  illo.updateRenderGraph();
  requestAnimationFrame(animate);
}

animate();
