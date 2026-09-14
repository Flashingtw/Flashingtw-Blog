type SeasonalKind = "sakura" | "snow";

const artwork: Record<SeasonalKind, string> = {
  sakura:
    '<svg viewBox="0 0 24 28" fill="none"><path d="M12 26C-2 18 1 5 8 2L12 6L16 2C24 7 26 19 12 26Z" fill="#ed9dbb" stroke="#cf7195" stroke-width=".7"/><path d="M12 24Q9 15 12 8" stroke="#fff0f5" stroke-width=".9"/></svg>',
  snow: '<svg viewBox="0 0 24 24" fill="none" stroke="#eef6ff" stroke-width="1.8" stroke-linecap="round"><path d="M12 2V22M3.34 7L20.66 17M3.34 17L20.66 7M9 4L12 7L15 4M9 20L12 17L15 20"/></svg>',
};

const readKind = (): SeasonalKind =>
  document.documentElement.dataset.theme === "dark" ? "snow" : "sakura";

export function startSeasonalWeather(layer: HTMLElement): () => void {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let currentKind = readKind();
  const active = new Map<HTMLElement, Animation>();
  let timer: number | undefined;
  let disposed = false;

  const clearTimer = () => {
    if (timer !== undefined) window.clearTimeout(timer);
    timer = undefined;
  };
  const remove = (particle: HTMLElement) => {
    active.delete(particle);
    particle.remove();
  };
  const spawn = (kind: SeasonalKind) => {
    const particle = document.createElement("span");
    particle.className = "seasonal-particle";
    particle.dataset.kind = kind;
    particle.innerHTML = artwork[kind];
    const size = kind === "sakura" ? 11 + Math.random() * 7 : 6 + Math.random() * 5;
    // 從上緣或右側上半部進場，沿著同一股風往左下飄。
    const slope = 0.5 + Math.random() * 0.25;
    const entry = Math.random() * (window.innerWidth + window.innerHeight * slope * 0.5);
    const x = Math.min(entry, window.innerWidth + 30);
    const y = -40 + Math.max(0, entry - x) / slope;
    const fall = window.innerHeight + 50 - y;
    const drift = -fall * slope;
    const rotation = Math.random() * 360;
    particle.style.width = `${size}px`;
    layer.append(particle);
    const animation = particle.animate(
      Array.from({ length: 5 }, (_, index) => {
        const progress = index / 4;
        const sway = Math.sin(progress * Math.PI * 2) * 28;
        return {
          transform: `translate3d(${x + drift * progress + sway}px, ${y + fall * progress}px, 0) rotate(${rotation + progress * (kind === "sakura" ? 250 : 80)}deg)`,
          opacity: index === 0 || index === 4 ? 0 : kind === "sakura" ? 0.72 : 0.65,
          offset: progress,
        };
      }),
      { duration: 12000 + Math.random() * 6000, easing: "linear", fill: "forwards" },
    );
    active.set(particle, animation);
    void animation.finished.then(
      () => remove(particle),
      () => remove(particle),
    );
  };
  const tick = () => {
    timer = undefined;
    if (disposed || document.hidden || motion.matches) return;
    // 每次生成前讀取，避免快速切換或站內換頁留下過期的主題。
    const kind = readKind();
    const limit = window.innerWidth < 768 ? 21 : 42;
    // 各種類分開計數，舊粒子仍在畫面時也能立即生成新種類。
    const count = [...active.keys()].filter((particle) => particle.dataset.kind === kind).length;
    if (count < limit) spawn(kind);
    timer = window.setTimeout(tick, window.innerWidth < 768 ? 650 : 430);
  };
  const sync = () => {
    clearTimer();
    if (motion.matches) {
      for (const [particle, animation] of active) {
        animation.cancel();
        remove(particle);
      }
      return;
    }
    for (const animation of active.values()) {
      if (document.hidden) animation.pause();
      else if (animation.playState === "paused") animation.play();
    }
    if (!document.hidden && !disposed) timer = window.setTimeout(tick, 0);
  };
  const observer = new MutationObserver(() => {
    const nextKind = readKind();
    if (nextKind === currentKind) return;
    currentKind = nextKind;
    sync();
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  motion.addEventListener("change", sync);
  document.addEventListener("visibilitychange", sync);
  sync();

  return () => {
    disposed = true;
    clearTimer();
    observer.disconnect();
    motion.removeEventListener("change", sync);
    document.removeEventListener("visibilitychange", sync);
    for (const [particle, animation] of active) {
      animation.cancel();
      remove(particle);
    }
  };
}
