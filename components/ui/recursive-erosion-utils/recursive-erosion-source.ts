/**
 * Recursive Erosion — self-contained HTML document source.
 * Rendered inside a sandboxed iframe (allow-scripts only).
 * Three.js dependency removed: Canvas 2D API used instead for zero external network requests.
 *
 * Contract required by recursive-erosion.tsx:
 *  - #stage element (promoted to fixed fullscreen background)
 *  - #badge and .sr elements (hidden by the focus script)
 *  - </head> and </body> injection points
 */
export const recursiveErosionSource = String.raw`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Recursive Erosion</title>
<style>
  html, body { margin: 0; padding: 0; width: 100%; height: 100%; background: #0a0908; overflow: hidden; }
  #stage { position: absolute; inset: 0; width: 100%; height: 100%; }
  #stage canvas { display: block; width: 100%; height: 100%; }
  #badge { position: fixed; left: 12px; bottom: 10px; font: 11px/1.4 monospace; color: #d4af37; opacity: 0.6; letter-spacing: 0.12em; text-transform: uppercase; }
  .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
  #fallback { position: absolute; inset: 0; display: none; background: radial-gradient(ellipse at 50% 45%, rgba(212,175,55,0.16), rgba(10,9,8,0) 60%); }
</style>
</head>
<body>
<div id="stage"></div>
<div id="fallback"></div>
<div id="badge">Recursive Erosion</div>
<p class="sr">Animated particle sphere with recursive erosion trails.</p>
<script>
var stage = document.getElementById("stage");
var fallback = document.getElementById("fallback");
var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

var canvas = document.createElement("canvas");
canvas.style.display = "block";
stage.appendChild(canvas);
var ctx = canvas.getContext("2d", { alpha: true });

function resize() {
  var w = stage.clientWidth || window.innerWidth;
  var h = stage.clientHeight || window.innerHeight;
  canvas.width = w;
  canvas.height = h;
}
resize();
window.addEventListener("resize", resize);

var MAX = 1500;
var RADIUS = 1.55;
var positions = new Float32Array(MAX * 3);
var colors = new Float32Array(MAX * 3);
var baseCol = new Float32Array(MAX * 3);
var vel = new Float32Array(MAX * 3);
var age = new Float32Array(MAX);
var life = new Float32Array(MAX);
var gen = new Uint8Array(MAX);

function hslToRgb(h, s, l) {
  var r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    var hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function paint(i) {
  var l = 0.55 + Math.random() * 0.25 - gen[i] * 0.06;
  var rgb = hslToRgb(0.115 + (Math.random() - 0.5) * 0.03, 0.72, Math.max(0.25, l));
  baseCol[i * 3] = rgb[0] / 255;
  baseCol[i * 3 + 1] = rgb[1] / 255;
  baseCol[i * 3 + 2] = rgb[2] / 255;
}

function seedSurface(i) {
  var k = i + 0.5;
  var phi = Math.acos(1 - 2 * k / MAX);
  var theta = Math.PI * (1 + Math.sqrt(5)) * k;
  var x = Math.sin(phi) * Math.cos(theta);
  var y = Math.sin(phi) * Math.sin(theta);
  var z = Math.cos(phi);
  positions[i * 3] = x * RADIUS;
  positions[i * 3 + 1] = y * RADIUS;
  positions[i * 3 + 2] = z * RADIUS;
  var speed = 0.05 + Math.random() * 0.1;
  vel[i * 3] = x * speed + (Math.random() - 0.5) * 0.03;
  vel[i * 3 + 1] = y * speed + (Math.random() - 0.5) * 0.03;
  vel[i * 3 + 2] = z * speed + (Math.random() - 0.5) * 0.03;
  age[i] = 0;
  life[i] = 4 + Math.random() * 5;
  gen[i] = 0;
  paint(i);
}

function seedChild(i, px, py, pz, g) {
  positions[i * 3] = px;
  positions[i * 3 + 1] = py;
  positions[i * 3 + 2] = pz;
  var len = Math.sqrt(px * px + py * py + pz * pz) || 1;
  var speed = 0.06 + Math.random() * 0.12;
  vel[i * 3] = (px / len) * speed + (Math.random() - 0.5) * 0.1;
  vel[i * 3 + 1] = (py / len) * speed + (Math.random() - 0.5) * 0.1;
  vel[i * 3 + 2] = (pz / len) * speed + (Math.random() - 0.5) * 0.1;
  age[i] = 0;
  life[i] = 2.5 + Math.random() * 3.5;
  gen[i] = g;
  paint(i);
}

for (var i = 0; i < MAX; i++) seedSurface(i);

var clock = Date.now();
var running = true;
var cx, cy, cz;

function project(x, y, z) {
  var fov = 500;
  var factor = fov / (fov + z + 4.6);
  return {
    x: x * factor + cx,
    y: y * factor + cy
  };
}

function step(dt, t) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "lighter";

  cx = canvas.width / 2;
  cy = canvas.height / 2;
  cz += dt * 0.06;

  for (var i = 0; i < MAX; i++) {
    age[i] += dt;
    if (age[i] >= life[i]) {
      var px = positions[i * 3], py = positions[i * 3 + 1], pz = positions[i * 3 + 2];
      if (gen[i] < 3 && Math.random() < 0.65) {
        seedChild(i, px, py, pz, gen[i] + 1);
        if (Math.random() < 0.35) {
          var j = (Math.random() * MAX) | 0;
          if (age[j] > life[j] * 0.5) seedChild(j, px, py, pz, gen[i] + 1);
        }
      } else {
        seedSurface(i);
      }
    }
    var ix = i * 3;
    var x = positions[ix], y = positions[ix + 1], z = positions[ix + 2];
    vel[ix] += Math.sin(y * 2.1 + t * 0.35) * 0.0015;
    vel[ix + 1] += Math.sin(z * 2.3 + t * 0.28) * 0.0015;
    vel[ix + 2] += Math.sin(x * 1.9 + t * 0.31) * 0.0015;
    positions[ix] += vel[ix] * dt;
    positions[ix + 1] += vel[ix + 1] * dt;
    positions[ix + 2] += vel[ix + 2] * dt;
    var f = age[i] / life[i];
    var fade = f < 0.15 ? f / 0.15 : f > 0.7 ? (1 - f) / 0.3 : 1;
    var r = baseCol[ix] * fade * 255;
    var g = baseCol[ix + 1] * fade * 255;
    var b = baseCol[ix + 2] * fade * 255;

    var proj = project(x, y, z + cz);
    var size = 1.5 + fade * 1.5;

    ctx.fillStyle = "rgba(" + Math.round(r) + "," + Math.round(g) + "," + Math.round(b) + "," + fade + ")";
    ctx.beginPath();
    ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function tick() {
  if (!running) return;
  var now = Date.now();
  var dt = Math.min((now - clock) / 1000, 0.05);
  clock = now;
  step(dt, clock / 1000);
  requestAnimationFrame(tick);
}

document.addEventListener("visibilitychange", function () {
  running = !document.hidden;
  if (running && !reduced) {
    clock = Date.now();
    requestAnimationFrame(tick);
  }
});

if (reduced) {
  step(0.016, 0);
} else {
  requestAnimationFrame(tick);
}
</script>
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlcyI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIifQ==
</body>
</html>`;
