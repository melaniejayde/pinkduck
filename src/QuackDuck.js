import { useEffect, useRef, useState } from 'react';

export default function QuackDuck() {
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [overDuck, setOverDuck] = useState(false);

  useEffect(() => {
    const image = imageRef.current;
    const canvas = canvasRef.current;
    if (!image || !canvas) return;

    const prepareHitMap = () => {
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) return;
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      context.drawImage(image, 0, 0);
    };

    if (image.complete && image.naturalWidth) prepareHitMap();
    else image.addEventListener('load', prepareHitMap);
    return () => image.removeEventListener('load', prepareHitMap);
  }, []);

  function isDuckPixel(event) {
    const image = imageRef.current;
    const canvas = canvasRef.current;
    if (!image || !canvas || !image.naturalWidth) return false;

    const rect = image.getBoundingClientRect();
    const x = Math.floor(((event.clientX - rect.left) / rect.width) * canvas.width);
    const y = Math.floor(((event.clientY - rect.top) / rect.height) * canvas.height);
    if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return false;

    const context = canvas.getContext('2d', { willReadFrequently: true });
    return context.getImageData(x, y, 1, 1).data[3] > 16;
  }

  function handlePointerMove(event) {
    setOverDuck(isDuckPixel(event));
  }

  function handleClick(event) {
    if (!isDuckPixel(event)) return;

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Playback may be blocked by the browser; the user can click again.
      });
    }
  }

  return (
    <div className="duck-stage">
      <button
        type="button"
        className={`duck-hit-area${overDuck ? ' is-over-duck' : ''}`}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setOverDuck(false)}
        onClick={handleClick}
        aria-label="Make the pink duck quack"
      >
        <img
          ref={imageRef}
          className="duck-image"
          src="/images/pinkduck.png"
          alt="Hot-pink rubber duck wearing heart-shaped sunglasses"
          draggable="false"
        />
      </button>
      <canvas ref={canvasRef} className="duck-hit-map" aria-hidden="true" />
      <audio ref={audioRef} src="/sounds/duck-quacking.mp3" preload="auto" />
    </div>
  );
}
