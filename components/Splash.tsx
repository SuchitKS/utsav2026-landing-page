import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  radius: number;
  color: string;
}

interface SplashAnimationProps {
  onAnimationComplete: () => void;
}

export default function SplashAnimation({
  onAnimationComplete,
}: SplashAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: Star[] = [];
    const starCount = 500;
    const initialSpeed = 2;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * 1500,
        radius: Math.random() * 2,
        color: `rgba(${155 + Math.random() * 100}, ${
          155 + Math.random() * 100
        }, ${255}, ${0.5 + Math.random() * 0.5})`,
      });
    }

    const animationStartTime = Date.now();
    const wormholeAccelerationDuration = 4000;
    const wormholeDecelerationDuration = 2000;
    const logoAppearDuration = 1000;
    const logoGrowDuration = 2000;
    const blastAnimationDuration = 1500;
    const logoFinalShowDuration = 2000;
    const finalFadeDuration = 1500;

    const totalAnimationDuration =
      wormholeAccelerationDuration +
      wormholeDecelerationDuration +
      logoAppearDuration +
      logoGrowDuration +
      blastAnimationDuration +
      logoFinalShowDuration +
      finalFadeDuration;

    const logoImage = new Image();
    logoImage.src = "/themelogo.png";
    logoImage.onload = () => {
      logoRef.current = logoImage;
    };

    const animate = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - animationStartTime;
      const totalProgress = Math.min(elapsedTime / totalAnimationDuration, 1);

      ctx.fillStyle = "rgba(3, 9, 28, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (elapsedTime <= wormholeAccelerationDuration) {
        const accelerationProgress = elapsedTime / wormholeAccelerationDuration;

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);

        const currentSpeed = initialSpeed * (1 + accelerationProgress * 4);

        stars.forEach((star) => {
          star.z -= currentSpeed;

          if (star.z <= 0) {
            star.z = 1500;
            star.x = Math.random() * canvas.width - canvas.width / 2;
            star.y = Math.random() * canvas.height - canvas.height / 2;
          }

          const x = star.x / (star.z * 0.001);
          const y = star.y / (star.z * 0.001);

          const radius = star.radius * (1 - star.z / 1500);

          const stretch = 1 + (1 - star.z / 1500) * 5;

          ctx.beginPath();
          ctx.fillStyle = star.color;
          ctx.ellipse(
            x,
            y,
            radius * stretch,
            radius,
            Math.atan2(y, x),
            0,
            Math.PI * 2
          );
          ctx.fill();
        });

        ctx.restore();
      } else if (
        elapsedTime <=
        wormholeAccelerationDuration + wormholeDecelerationDuration
      ) {
        const decelerationProgress =
          (elapsedTime - wormholeAccelerationDuration) /
          wormholeDecelerationDuration;

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);

        const currentSpeed = initialSpeed * (5 - decelerationProgress * 3);

        stars.forEach((star) => {
          star.z -= currentSpeed;

          if (star.z <= 0) {
            star.z = 1500;
            star.x = Math.random() * canvas.width - canvas.width / 2;
            star.y = Math.random() * canvas.height - canvas.height / 2;
          }

          const x = star.x / (star.z * 0.001);
          const y = star.y / (star.z * 0.001);

          const radius = star.radius * (1 - star.z / 1500);
          const stretch = 1 + (1 - star.z / 1500) * 5;

          ctx.beginPath();
          ctx.fillStyle = star.color;
          ctx.ellipse(
            x,
            y,
            radius * stretch,
            radius,
            Math.atan2(y, x),
            0,
            Math.PI * 2
          );
          ctx.fill();
        });

        ctx.restore();
      } else if (
        elapsedTime <=
        wormholeAccelerationDuration +
          wormholeDecelerationDuration +
          logoAppearDuration
      ) {
        const logoAppearProgress =
          (elapsedTime -
            wormholeAccelerationDuration -
            wormholeDecelerationDuration) /
          logoAppearDuration;

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);

        const starOpacity = Math.max(0, 1 - logoAppearProgress * 0.3);
        const currentSpeed = initialSpeed * 2;

        stars.forEach((star) => {
          star.z -= currentSpeed;

          if (star.z <= 0) {
            star.z = 1500;
            star.x = Math.random() * canvas.width - canvas.width / 2;
            star.y = Math.random() * canvas.height - canvas.height / 2;
          }

          const x = star.x / (star.z * 0.001);
          const y = star.y / (star.z * 0.001);

          const radius = star.radius * (1 - star.z / 1500);

          const starColor = star.color.replace(
            /rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/,
            (_, r, g, b) => `rgba(${r}, ${g}, ${b}, ${starOpacity})`
          );

          ctx.beginPath();
          ctx.fillStyle = starColor;
          ctx.ellipse(x, y, radius, radius, 0, 0, Math.PI * 2);
          ctx.fill();
        });

        if (logoRef.current) {
          const initialLogoSize = Math.min(canvas.width, canvas.height) * 0.1;
          const logoOpacity = Math.min(1, logoAppearProgress);

          ctx.globalAlpha = logoOpacity;

          const aspectRatio =
            logoRef.current.naturalWidth / logoRef.current.naturalHeight;
          const logoWidth = initialLogoSize * aspectRatio;
          const logoHeight = initialLogoSize;

          ctx.drawImage(
            logoRef.current,
            -logoWidth / 2,
            -logoHeight / 2,
            logoWidth,
            logoHeight
          );

          ctx.globalAlpha = 1;
        }

        ctx.restore();
      } else if (
        elapsedTime <=
        wormholeAccelerationDuration +
          wormholeDecelerationDuration +
          logoAppearDuration +
          logoGrowDuration
      ) {
        const logoGrowProgress =
          (elapsedTime -
            wormholeAccelerationDuration -
            wormholeDecelerationDuration -
            logoAppearDuration) /
          logoGrowDuration;

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);

        const starOpacity = Math.max(0, 1 - logoGrowProgress * 0.5);
        const currentSpeed = initialSpeed * 2;

        stars.forEach((star) => {
          star.z -= currentSpeed;

          if (star.z <= 0) {
            star.z = 1500;
            star.x = Math.random() * canvas.width - canvas.width / 2;
            star.y = Math.random() * canvas.height - canvas.height / 2;
          }

          const x = star.x / (star.z * 0.001);
          const y = star.y / (star.z * 0.001);

          const radius = star.radius * (1 - star.z / 1500);

          const starColor = star.color.replace(
            /rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/,
            (_, r, g, b) => `rgba(${r}, ${g}, ${b}, ${starOpacity})`
          );

          ctx.beginPath();
          ctx.fillStyle = starColor;
          ctx.ellipse(x, y, radius, radius, 0, 0, Math.PI * 2);
          ctx.fill();
        });

        if (logoRef.current) {
          const finalLogoSize = Math.min(canvas.width, canvas.height) * 0.3;
          const initialLogoSize = Math.min(canvas.width, canvas.height) * 0.1;

          const easeInOutCubic = (t: number): number =>
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
          const easedProgress = easeInOutCubic(logoGrowProgress);

          const currentLogoSize =
            initialLogoSize + (finalLogoSize - initialLogoSize) * easedProgress;

          const aspectRatio =
            logoRef.current.naturalWidth / logoRef.current.naturalHeight;
          const logoWidth = currentLogoSize * aspectRatio;
          const logoHeight = currentLogoSize;

          ctx.drawImage(
            logoRef.current,
            -logoWidth / 2,
            -logoHeight / 2,
            logoWidth,
            logoHeight
          );
        }

        ctx.restore();
      } else if (
        elapsedTime <=
        wormholeAccelerationDuration +
          wormholeDecelerationDuration +
          logoAppearDuration +
          logoGrowDuration +
          blastAnimationDuration
      ) {
        const blastProgress =
          (elapsedTime -
            wormholeAccelerationDuration -
            wormholeDecelerationDuration -
            logoAppearDuration -
            logoGrowDuration) /
          blastAnimationDuration;

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);

        if (logoRef.current) {
          const logoSize = Math.min(canvas.width, canvas.height) * 0.3;

          const blastParticleCount = 100;
          const blastRadius = blastProgress * logoSize * 3;

          for (let i = 0; i < blastParticleCount; i++) {
            const angle = (i / blastParticleCount) * Math.PI * 2;
            const distance = blastRadius * (0.7 + Math.random() * 0.3);
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            const particleSize = 2 + Math.random() * 4;
            const particleOpacity = Math.max(0, 1 - blastProgress * 1.2);

            const hue = 180 + Math.random() * 60;
            const saturation = 70 + Math.random() * 30;
            const lightness = 50 + Math.random() * 40;

            ctx.beginPath();
            ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${particleOpacity})`;
            ctx.arc(x, y, particleSize, 0, Math.PI * 2);
            ctx.fill();
          }

          const pulseScale = 1 + Math.sin(blastProgress * Math.PI) * 0.1;

          const aspectRatio =
            logoRef.current.naturalWidth / logoRef.current.naturalHeight;
          const logoWidth = logoSize * pulseScale * aspectRatio;
          const logoHeight = logoSize * pulseScale;

          ctx.drawImage(
            logoRef.current,
            -logoWidth / 2,
            -logoHeight / 2,
            logoWidth,
            logoHeight
          );
        }

        ctx.restore();
      } else if (
        elapsedTime <=
        wormholeAccelerationDuration +
          wormholeDecelerationDuration +
          logoAppearDuration +
          logoGrowDuration +
          blastAnimationDuration +
          logoFinalShowDuration
      ) {
        const finalShowProgress =
          (elapsedTime -
            wormholeAccelerationDuration -
            wormholeDecelerationDuration -
            logoAppearDuration -
            logoGrowDuration -
            blastAnimationDuration) /
          logoFinalShowDuration;

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);

        if (logoRef.current) {
          const logoSize = Math.min(canvas.width, canvas.height) * 0.3;

          const remainingParticles = 20;
          const maxParticleDistance = logoSize * 3;

          for (let i = 0; i < remainingParticles; i++) {
            const angle = (i / remainingParticles) * Math.PI * 2;
            const distance = maxParticleDistance * (0.9 + Math.random() * 0.2);
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            const particleSize = 1 + Math.random() * 2;
            const particleOpacity = Math.max(0, 0.3 - finalShowProgress * 0.3);

            ctx.beginPath();
            ctx.fillStyle = `rgba(100, 149, 237, ${particleOpacity})`;
            ctx.arc(x, y, particleSize, 0, Math.PI * 2);
            ctx.fill();
          }

          const breatheScale =
            1 + Math.sin(finalShowProgress * Math.PI * 2) * 0.02;

          const aspectRatio =
            logoRef.current.naturalWidth / logoRef.current.naturalHeight;
          const logoWidth = logoSize * breatheScale * aspectRatio;
          const logoHeight = logoSize * breatheScale;

          ctx.drawImage(
            logoRef.current,
            -logoWidth / 2,
            -logoHeight / 2,
            logoWidth,
            logoHeight
          );
        }

        ctx.restore();
      } else if (elapsedTime <= totalAnimationDuration) {
        const fadeOutProgress =
          (elapsedTime -
            wormholeAccelerationDuration -
            wormholeDecelerationDuration -
            logoAppearDuration -
            logoGrowDuration -
            blastAnimationDuration -
            logoFinalShowDuration) /
          finalFadeDuration;

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);

        if (logoRef.current) {
          const logoSize = Math.min(canvas.width, canvas.height) * 0.3;
          const logoOpacity = Math.max(0, 1 - fadeOutProgress * 1.5);

          ctx.globalAlpha = logoOpacity;

          const aspectRatio =
            logoRef.current.naturalWidth / logoRef.current.naturalHeight;
          const logoWidth = logoSize * aspectRatio;
          const logoHeight = logoSize;

          ctx.drawImage(
            logoRef.current,
            -logoWidth / 2,
            -logoHeight / 2,
            logoWidth,
            logoHeight
          );

          ctx.globalAlpha = 1;
        }

        ctx.restore();

        ctx.fillStyle = `rgba(3, 9, 28, ${fadeOutProgress})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      if (totalProgress < 1) {
        requestAnimationFrame(animate);
      } else {
        onAnimationComplete();
      }
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [onAnimationComplete]);

  return (
    <div className="w-full h-screen fixed top-0 left-0 bg-[#03091c] z-50">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
