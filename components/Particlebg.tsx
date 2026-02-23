import React, { useEffect, useRef, useState } from "react";

const NebulaBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Premium Purple & Silver Palette
    const colors = [
      "rgba(88, 28, 135, 0.15)", // Deep subtle purple
      "rgba(147, 51, 234, 0.1)", // Vibrant purple
      "rgba(216, 180, 254, 0.05)", // Light purple/silver tint
      "rgba(192, 192, 192, 0.05)", // Silver dust
    ];

    const clouds: { x: number; y: number; radius: number; color: string; vx: number; vy: number }[] = [];
    const stars: { x: number; y: number; radius: number; opacity: number; pulse: number; color: string }[] = [];

    const draw = () => {
      // Pure deep black background
      ctx.fillStyle = "#020005"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      // Draw slow-moving ambient purple nebulas
      clouds.forEach((cloud) => {
        const gradient = ctx.createRadialGradient(cloud.x, cloud.y, 0, cloud.x, cloud.y, cloud.radius);
        gradient.addColorStop(0, cloud.color);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw silver & white stardust
      stars.forEach((star) => {
        star.opacity += star.pulse;
        if (star.opacity > 0.8 || star.opacity < 0.1) {
          star.pulse = -star.pulse;
        }

        ctx.beginPath();
        ctx.fillStyle = star.color.replace("1)", `${star.opacity})`);
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = "source-over";
    };

    const createClouds = () => {
      clouds.length = 0;
      const numberOfClouds = isMobile ? 8 : 15;
      for (let i = 0; i < numberOfClouds; i++) {
        clouds.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: isMobile ? Math.random() * 150 + 100 : Math.random() * 300 + 200,
          color: colors[Math.floor(Math.random() * 2)], // Only use the purple shades for clouds
          vx: (Math.random() * 1 - 0.5) * 0.5,
          vy: (Math.random() * 1 - 0.5) * 0.5,
        });
      }
    };

    const createStars = () => {
      stars.length = 0;
      const numberOfStars = isMobile ? 150 : 350;
      for (let i = 0; i < numberOfStars; i++) {
        const isSilver = Math.random() > 0.5;
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.2 + 0.3,
          opacity: Math.random() * 0.5 + 0.1,
          pulse: Math.random() * 0.02 + 0.005,
          color: isSilver ? "rgba(192, 192, 192, 1)" : "rgba(255, 255, 255, 1)", // Silver and White stars
        });
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createClouds();
      createStars();
      draw();
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      clouds.forEach((cloud) => {
        cloud.x += cloud.vx;
        cloud.y += cloud.vy;
        if (cloud.x < -cloud.radius) cloud.x = canvas.width + cloud.radius;
        if (cloud.x > canvas.width + cloud.radius) cloud.x = -cloud.radius;
        if (cloud.y < -cloud.radius) cloud.y = canvas.height + cloud.radius;
        if (cloud.y > canvas.height + cloud.radius) cloud.y = -cloud.radius;
      });
      draw();
      requestAnimationFrame(animate);
    };

    handleResize();
    animate();

    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-20 bg-[#020005]"
      />
      {/* Vignette overlay for deeper edges */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-80" />
    </>
  );
};

export default NebulaBackground;