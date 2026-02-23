"use client";

import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef, useState } from 'react';
import localFont from "next/font/local";

const jaini = localFont({ src: "../app/fonts/jaini.ttf" });

// --- Helper Utilities for the 3D Engine ---
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number) {
  return p1 + (p2 - p1) * t;
}

// --- 3D Gallery Logic ---
class Title {
  constructor({ gl, plane, text, textColor, font }: any) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    context.font = font;
    const metrics = context.measureText(text);
    canvas.width = Math.ceil(metrics.width) + 20;
    canvas.height = Math.ceil(parseInt(font, 10) * 1.2) + 20;
    context.font = font;
    context.fillStyle = textColor;
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new Texture(gl, { generateMipmaps: false });
    texture.image = canvas;

    const program = new Program(gl, {
      vertex: `attribute vec3 position; attribute vec2 uv; uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragment: `precision highp float; uniform sampler2D tMap; varying vec2 vUv; void main() { vec4 color = texture2D(tMap, vUv); if (color.a < 0.1) discard; gl_FragColor = color; }`,
      uniforms: { tMap: { value: texture } },
      transparent: true
    });

    const mesh = new Mesh(gl, { geometry: new Plane(gl), program });
    const aspect = canvas.width / canvas.height;
    const textHeight = plane.scale.y * 0.15;
    mesh.scale.set(textHeight * aspect, textHeight, 1);
    mesh.position.y = -plane.scale.y * 0.5 - textHeight * 0.5 - 0.05;
    mesh.setParent(plane);
  }
}

class Media {
  plane: any; program: any; extra = 0; width = 0; widthTotal = 0; x = 0;
  constructor({ geometry, gl, image, index, length, scene, screen, text, viewport, bend, textColor, borderRadius, font }: any) {
    const texture = new Texture(gl, { generateMipmaps: true });
    this.program = new Program(gl, {
      vertex: `precision highp float; attribute vec3 position; attribute vec2 uv; uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; uniform float uTime; uniform float uSpeed; varying vec2 vUv; void main() { vUv = uv; vec3 p = position; p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5); gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0); }`,
      fragment: `precision highp float; uniform vec2 uImageSizes; uniform vec2 uPlaneSizes; uniform sampler2D tMap; uniform float uBorderRadius; varying vec2 vUv; float roundedBoxSDF(vec2 p, vec2 b, float r) { vec2 d = abs(p) - b; return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r; } void main() { vec2 ratio = vec2(min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0), min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)); vec2 uv = vec2(vUv.x * ratio.x + (1.0 - ratio.x) * 0.5, vUv.y * ratio.y + (1.0 - ratio.y) * 0.5); vec4 color = texture2D(tMap, uv); float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius); float alpha = 1.0 - smoothstep(-0.002, 0.002, d); gl_FragColor = vec4(color.rgb, alpha); }`,
      uniforms: { tMap: { value: texture }, uPlaneSizes: { value: [0, 0] }, uImageSizes: { value: [0, 0] }, uSpeed: { value: 0 }, uTime: { value: 100 * Math.random() }, uBorderRadius: { value: borderRadius } },
      transparent: true
    });
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = image;
    img.onload = () => { texture.image = img; this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight]; };

    this.plane = new Mesh(gl, { geometry, program: this.program });
    this.plane.setParent(scene);
    new Title({ gl, plane: this.plane, text, textColor, font });

    // Initial sizing
    const scale = screen.height / 1500;
    this.plane.scale.y = (viewport.height * (900 * scale)) / screen.height;
    this.plane.scale.x = (viewport.width * (700 * scale)) / screen.width;
    this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.width = this.plane.scale.x + 2;
    this.widthTotal = this.width * length * 2;
    this.x = this.width * index;
  }

  update(scroll: any, direction: string, bend: number, viewport: any) {
    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x;
    const H = viewport.width / 2;
    if (bend !== 0) {
      const R = (H * H + bend * bend) / (2 * Math.abs(bend));
      const effectiveX = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      this.plane.position.y = bend > 0 ? -arc : arc;
      this.plane.rotation.z = (bend > 0 ? -1 : 1) * Math.sign(x) * Math.asin(effectiveX / R);
    }
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = scroll.current - scroll.last;
    if (direction === 'right' && this.plane.position.x + this.plane.scale.x / 2 < -H) this.extra -= this.widthTotal;
    if (direction === 'left' && this.plane.position.x - this.plane.scale.x / 2 > H) this.extra += this.widthTotal;
  }
}

// --- Main Gallery Component ---
const Gallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = [
    { image: "https://picsum.photos/seed/ut1/800/600", text: "Legacy 2023" },
    { image: "https://picsum.photos/seed/ut2/800/600", text: "Cultural Fest" },
    { image: "https://picsum.photos/seed/ut3/800/600", text: "Night Beats" },
    { image: "https://picsum.photos/seed/ut4/800/600", text: "Euphoria" },
    { image: "https://picsum.photos/seed/ut5/800/600", text: "The Crowd" },
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Renderer Setup
    const renderer = new Renderer({ alpha: true, antialias: true, dpr: 2 });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);

    const camera = new Camera(gl);
    camera.position.z = 20;
    const scene = new Transform();
    const planeGeometry = new Plane(gl, { heightSegments: 50, widthSegments: 100 });

    let screen = { width: container.clientWidth, height: container.clientHeight };
    renderer.setSize(screen.width, screen.height);
    camera.perspective({ aspect: screen.width / screen.height });
    const fov = (camera.fov * Math.PI) / 180;
    const viewport = { height: 2 * Math.tan(fov / 2) * camera.position.z, width: 0 };
    viewport.width = viewport.height * camera.aspect;

    const scroll = { ease: 0.05, current: 0, target: 0, last: 0 };
    const medias = [...items, ...items].map((item, i) => new Media({
      geometry: planeGeometry, gl, image: item.image, index: i, length: items.length,
      scene, screen, text: item.text, viewport, bend: 3, textColor: '#ffffff', borderRadius: 0.05, font: 'bold 30px sans-serif'
    }));

    // Input Handling
    let isDown = false, startX = 0;
    const onDown = (e: any) => { isDown = true; startX = e.touches ? e.touches[0].clientX : e.clientX; };
    const onMove = (e: any) => {
      if (!isDown) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      scroll.target += (startX - x) * 0.05;
      startX = x;
    };
    const onUp = () => isDown = false;
    const onWheel = (e: any) => scroll.target += e.deltaY * 0.01;

    // Optimize: Bind inputs to container where applicable and use passive listeners
    container.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseup', onUp);

    container.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);

    container.addEventListener('wheel', onWheel, { passive: true });

    // Optimize: Only render when visible in viewport
    let isVisible = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
      });
    });
    observer.observe(container);

    let raf: number;
    const update = () => {
      if (isVisible) {
        scroll.current = lerp(scroll.current, scroll.target, scroll.ease);
        const dir = scroll.current > scroll.last ? 'right' : 'left';
        medias.forEach(m => m.update(scroll, dir, 3, viewport));
        renderer.render({ scene, camera });
        scroll.last = scroll.current;
      }
      raf = requestAnimationFrame(update);
    };
    update();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      container.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);

      container.removeEventListener('touchstart', onDown);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);

      container.removeEventListener('wheel', onWheel);
      gl.canvas.remove();
    };
  }, []);

  return (
    <section id="gallery" className="relative w-full py-24 flex flex-col items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <h1 className={`${jaini.className} text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600 text-center mb-4 z-10`}>
        Utsav Legacy
      </h1>

      <div ref={containerRef} className="w-full h-[450px] md:h-[600px] cursor-grab active:cursor-grabbing z-20" />

      <p className="text-gray-500 mt-8 uppercase tracking-widest text-xs animate-pulse">
        Drag or Scroll to Explore
      </p>
    </section>
  );
};

export default Gallery;