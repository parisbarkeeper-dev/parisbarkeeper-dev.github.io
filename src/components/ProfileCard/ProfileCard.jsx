import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";

import BorderGlow from "../BorderGlow/BorderGlow";
import "./ProfileCard.css";

const DEFAULT_INNER_GRADIENT =
  "linear-gradient(145deg, rgba(2,5,252,.42) 0%, rgba(255,2,2,.2) 100%)";

const clamp = (value, min = 0, max = 100) =>
  Math.min(Math.max(value, min), max);
const round = (value, precision = 3) =>
  Number.parseFloat(value.toFixed(precision));
const adjust = (value, fromMin, fromMax, toMin, toMax) =>
  round(
    toMin +
      ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin),
  );

function ProfileCardComponent({
  avatarUrl,
  iconUrl,
  grainUrl,
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor = "rgba(23, 71, 255, 0.68)",
  behindGlowSize = "55%",
  className = "",
  enableTilt = true,
  miniAvatarUrl,
  name = "Gao Peng",
  title = "Visual / AI / Product Designer",
  handle = "gaopeng.design",
  status = "Available",
  contactText = "Contact",
  showUserInfo = true,
  onContactClick,
}) {
  const wrapRef = useRef(null);
  const shellRef = useRef(null);
  const rafRef = useRef(0);
  const currentRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const visibleRef = useRef(true);

  const setVarsFromXY = useCallback((x, y) => {
    const shell = shellRef.current;
    const wrap = wrapRef.current;
    if (!shell || !wrap) return;

    const percentX = clamp((100 / (shell.clientWidth || 1)) * x);
    const percentY = clamp((100 / (shell.clientHeight || 1)) * y);
    const centerX = percentX - 50;
    const centerY = percentY - 50;

    const properties = {
      "--pointer-x": `${percentX}%`,
      "--pointer-y": `${percentY}%`,
      "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
      "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
      "--pointer-from-center": `${clamp(
        Math.hypot(percentY - 50, percentX - 50) / 50,
        0,
        1,
      )}`,
      "--pointer-from-top": `${percentY / 100}`,
      "--pointer-from-left": `${percentX / 100}`,
      "--rotate-x": `${round(-(centerX / 6))}deg`,
      "--rotate-y": `${round(centerY / 5)}deg`,
    };

    Object.entries(properties).forEach(([key, value]) => {
      wrap.style.setProperty(key, value);
    });
  }, []);

  const runTilt = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const step = () => {
      if (!visibleRef.current || document.hidden) {
        rafRef.current = 0;
        return;
      }

      const current = currentRef.current;
      const target = targetRef.current;
      current.x += (target.x - current.x) * 0.14;
      current.y += (target.y - current.y) * 0.14;
      setVarsFromXY(current.x, current.y);

      if (
        Math.abs(target.x - current.x) > 0.1 ||
        Math.abs(target.y - current.y) > 0.1
      ) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = 0;
      }
    };
    rafRef.current = requestAnimationFrame(step);
  }, [setVarsFromXY]);

  const setTarget = useCallback(
    (x, y) => {
      targetRef.current = { x, y };
      runTilt();
    },
    [runTilt],
  );

  useEffect(() => {
    if (!enableTilt) return undefined;
    const shell = shellRef.current;
    if (!shell) return undefined;

    const center = () => setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
    const onPointerMove = (event) => {
      const rect = shell.getBoundingClientRect();
      setTarget(event.clientX - rect.left, event.clientY - rect.top);
    };
    const onPointerEnter = (event) => {
      shell.classList.add("active");
      onPointerMove(event);
    };
    const onPointerLeave = () => {
      shell.classList.remove("active");
      center();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      if (!entry.isIntersecting) cancelAnimationFrame(rafRef.current);
    });
    observer.observe(shell);

    shell.addEventListener("pointerenter", onPointerEnter);
    shell.addEventListener("pointermove", onPointerMove);
    shell.addEventListener("pointerleave", onPointerLeave);
    currentRef.current = { x: shell.clientWidth - 70, y: 60 };
    center();

    return () => {
      observer.disconnect();
      shell.removeEventListener("pointerenter", onPointerEnter);
      shell.removeEventListener("pointermove", onPointerMove);
      shell.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [enableTilt, setTarget]);

  const cardStyle = useMemo(
    () => ({
      "--icon": iconUrl ? `url(${iconUrl})` : "none",
      "--grain": grainUrl ? `url(${grainUrl})` : "none",
      "--inner-gradient": innerGradient ?? DEFAULT_INNER_GRADIENT,
      "--behind-glow-color": behindGlowColor,
      "--behind-glow-size": behindGlowSize,
    }),
    [
      iconUrl,
      grainUrl,
      innerGradient,
      behindGlowColor,
      behindGlowSize,
    ],
  );

  return (
    <div
      ref={wrapRef}
      className={`pc-card-wrapper ${className}`.trim()}
      style={cardStyle}
    >
      {behindGlowEnabled && <div className="pc-behind" />}
      <div ref={shellRef} className="pc-card-shell">
        <div className="pc-card">
          <div className="pc-inside">
            <div className="pc-shine" />
            <div className="pc-glare" />
            <div className="pc-avatar-content">
              <img
                className="pc-avatar"
                src={avatarUrl}
                alt={`${name} avatar`}
                loading="lazy"
                decoding="async"
              />
              {showUserInfo && (
                <div className="pc-user-info">
                  <div className="pc-user-details">
                    <div className="pc-mini-avatar">
                      <img
                        src={miniAvatarUrl || avatarUrl}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="pc-user-text">
                      <div className="pc-handle">@{handle}</div>
                      <div className="pc-status">{status}</div>
                    </div>
                  </div>
                  <BorderGlow
                    className="pc-contact-border-glow"
                    edgeSensitivity={10}
                    glowColor="24 100 76"
                    backgroundColor="rgba(255, 255, 255, 0.04)"
                    borderRadius={10}
                    glowRadius={12}
                    glowIntensity={1.1}
                    coneSpread={30}
                    fillOpacity={0.14}
                    colors={["#0205fc", "#f5e400", "#ff0202"]}
                  >
                    <button
                      className="pc-contact-btn"
                      onClick={onContactClick}
                      type="button"
                    >
                      {contactText}
                    </button>
                  </BorderGlow>
                </div>
              )}
            </div>
            <div className="pc-details">
              <h3>{name}</h3>
              <p>{title}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProfileCardComponent);
