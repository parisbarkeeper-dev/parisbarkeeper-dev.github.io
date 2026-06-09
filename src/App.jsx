import React, { useEffect } from "react";
import Aurora from "./components/Aurora/Aurora";
import BorderGlow from "./components/BorderGlow/BorderGlow";
import GlassSurface from "./components/GlassSurface/GlassSurface";
import ProfileCard from "./components/ProfileCard/ProfileCard";

const experiences = [
  {
    period: "2025.08 — 2026.04",
    company: "银脉玻璃",
    role: "视觉设计 / AI 精修",
    summary: "围绕玻璃瓶身与包装完成建模、渲染、电商视觉及 AI 辅助迭代。",
  },
  {
    period: "2025.01 — 2025.07",
    company: "淇胜塑业",
    role: "产品设计师",
    summary: "主导香水与衍生产品可视化，覆盖产品、包装与营销素材全流程。",
  },
  {
    period: "2024.01 — 2024.12",
    company: "广州博辰家具有限公司",
    role: "3D 设计师",
    summary: "负责产品建模、场景搭建、光影优化与宣传视频视觉输出。",
  },
  {
    period: "2022.12 — 2023.12",
    company: "苏州灰计划工作室",
    role: "3D 设计师",
    summary: "独立完成室内设计效果图绘制，并根据客户需求持续深化方案。",
  },
];

const projects = [
  {
    id: "01",
    title: "GLASS OBJECTS",
    subtitle: "玻璃瓶产品可视化",
    image: "/assets/project-glass.webp",
    width: 1536,
    height: 1024,
    tags: ["3D MODELING", "CORONA", "MATERIAL"],
    description:
      "以材质真实性和产品轮廓为核心，精细处理玻璃折射、液体颜色与金属细节。",
    className: "project--wide",
  },
  {
    id: "02",
    title: "FORM & PACKAGE",
    subtitle: "包装系统与产品家族",
    image: "/assets/project-package.webp",
    width: 1535,
    height: 1024,
    tags: ["PACKAGING", "ART DIRECTION", "ECOMMERCE"],
    description:
      "从异形结构、包装语言到电商呈现，建立可延展的产品视觉系统。",
    className: "project--tall",
  },
  {
    id: "03",
    title: "AI MATERIAL STUDY",
    subtitle: "AI 辅助材质迭代",
    image: "/assets/project-ai.webp",
    width: 1600,
    height: 800,
    tags: ["AI WORKFLOW", "RETOUCH", "A/B TEST"],
    description:
      "将生成式工具引入精修与版本迭代，在保持视觉标准的同时显著提升修改效率。",
    className: "project--tall",
  },
];

const strengths = [
  {
    id: "01",
    title: "形态与材质",
    en: "FORM / MATERIAL",
    body: "熟练使用 3ds Max、Corona 与 V-Ray，能把抽象概念转化为可信、细腻的产品视觉。",
    meta: "MODELING · RENDERING",
  },
  {
    id: "02",
    title: "AI 视觉提效",
    en: "AI / ITERATION",
    body: "使用 Nano Banana、生成式填充等工具快速调整材质、Logo 与色彩，缩短迭代链路。",
    meta: "EFFICIENCY +80%",
  },
  {
    id: "03",
    title: "商业化落地",
    en: "COMMERCE / OUTPUT",
    body: "理解天猫、京东、1688 与亚马逊等平台的视觉需求，能够衔接运营与转化目标。",
    meta: "MULTI-PLATFORM",
  },
  {
    id: "04",
    title: "全流程协同",
    en: "SYSTEM / DELIVERY",
    body: "覆盖产品建模、包装设计、后期精修与营销素材，让设计概念稳定走到最终交付。",
    meta: "END TO END",
  },
];

const Arrow = ({ diagonal = false }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={diagonal ? "arrow arrow--diagonal" : "arrow"}
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function App() {
  useEffect(() => {
    const textSelectors = [
      "h1",
      "h2",
      "h3",
      "p",
      "a",
      "li",
      "time",
      "strong",
      ".section-label span",
      ".hero__eyebrow span",
      ".hero__index",
      ".portrait-card span",
      ".contact-row > span",
      ".metric__number",
      ".metric__unit",
      ".timeline__row > span",
      ".project__id",
      ".project__view",
      ".strength-card__meta",
      ".tool-line span",
      ".contact__top span",
    ].join(",");

    const textNodes = [...document.querySelectorAll(textSelectors)].filter(
      (node) => node.textContent.trim() && !node.closest("[data-text-skip]"),
    );

    const staggerGroups = new Map();
    textNodes.forEach((node) => {
      node.dataset.textReveal = "";
      const group =
        node.closest("section, footer, header, article") ?? document.body;
      const index = staggerGroups.get(group) ?? 0;
      node.style.setProperty("--text-delay", `${Math.min(index * 42, 420)}ms`);
      staggerGroups.set(group, index + 1);
    });

    const revealNodes = document.querySelectorAll("[data-reveal]");
    const textRevealNodes = document.querySelectorAll("[data-text-reveal]");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );

    const textObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            textObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.04, rootMargin: "0px 0px -4% 0px" },
    );

    revealNodes.forEach((node) => revealObserver.observe(node));
    textRevealNodes.forEach((node) => textObserver.observe(node));
    return () => {
      revealObserver.disconnect();
      textObserver.disconnect();
      textNodes.forEach((node) => {
        delete node.dataset.textReveal;
        node.style.removeProperty("--text-delay");
      });
    };
  }, []);

  return (
    <main>
      <div className="site-background" aria-hidden="true">
        <Aurora
          colorStops={["#0205fc", "#f5e400", "#ff0202"]}
          blend={0.58}
          amplitude={1.15}
          speed={0.48}
        />
        <div className="site-background__veil" />
        <div className="site-background__grid" />
      </div>

      <header className="nav-shell">
        <a className="wordmark" href="#top" aria-label="返回首页">
          GP<span>®</span>
        </a>
        <nav aria-label="主导航">
          <a href="#about">经历</a>
          <a href="#work">项目</a>
          <a href="#strengths">优势</a>
        </nav>
        <GlassSurface
          width={132}
          height={48}
          borderRadius={24}
          brightness={70}
          backgroundOpacity={0.08}
          saturation={1.4}
          distortionScale={-120}
          redOffset={4}
          greenOffset={12}
          blueOffset={22}
          mixBlendMode="screen"
          className="nav-contact-glass"
        >
          <a className="nav-contact" href="#contact">
            联系我 <Arrow />
          </a>
        </GlassSurface>
      </header>

      <section className="hero" id="top">
        <div className="hero__content content">
          <div className="hero__eyebrow" data-reveal>
            <span>BASED IN GUANGZHOU</span>
            <span>AVAILABLE FOR WORK</span>
          </div>
          <div className="hero__title-wrap" data-reveal>
            <p>VISUAL / AI / PRODUCT DESIGNER</p>
            <h1>
              <span>GAO</span>
              <span className="hero__title-offset">PENG</span>
            </h1>
          </div>
          <div className="hero__footer">
            <p data-reveal>
              从产品形态到商业视觉，
              <br />
              构建清晰、准确、有质感的设计表达。
            </p>
            <GlassSurface
              width={72}
              height={72}
              borderRadius={36}
              brightness={72}
              backgroundOpacity={0.05}
              saturation={1.5}
              distortionScale={-95}
              redOffset={4}
              greenOffset={14}
              blueOffset={24}
              mixBlendMode="screen"
              className="hero-cta-glass"
            >
              <a href="#work" className="circle-link" aria-label="查看精选项目">
                <Arrow diagonal />
              </a>
            </GlassSurface>
            <span className="hero__index">PORTFOLIO / 26</span>
          </div>
        </div>
      </section>

      <section className="about section" id="about">
        <div className="content">
          <div className="section-label" data-reveal>
            <span>01 / PROFILE</span>
            <span>视觉与产品之间</span>
          </div>

          <div className="about__intro">
            <div className="portrait-card" data-reveal>
              <div className="portrait-card__grid" />
              <div className="portrait-card__initials">GP</div>
              <div className="portrait-card__accent" />
              <span>VISUAL COMMUNICATION</span>
            </div>
            <div className="about__copy" data-reveal>
              <p className="kicker">HELLO, I AM GAO PENG.</p>
              <h2>
                用<span>三维构建形态</span>，
                <br />
                用视觉连接产品与市场。
              </h2>
              <p className="about__body">
                我是一名视觉 / AI / 产品设计师，毕业于上海大学视觉传达设计专业。
                工作实践覆盖室内效果图、家具产品、塑料包装与玻璃瓶电商视觉。
                我关心材质如何被感知，也关心设计如何更高效地走向市场。
              </p>
              <div className="contact-row">
                <a href="mailto:parisbarkeeper@gmail.com">
                  parisbarkeeper@gmail.com
                </a>
                <a href="tel:+8617666573428">+86 176 6657 3428</a>
                <span>广州，中国</span>
              </div>
            </div>
          </div>

          <div className="metrics">
            <article data-reveal>
              <span className="metric__number">04</span>
              <span className="metric__unit">YEARS</span>
              <p>跨行业设计实践</p>
            </article>
            <article data-reveal>
              <span className="metric__number">80</span>
              <span className="metric__unit">%</span>
              <p>AI 辅助修改提效</p>
            </article>
            <article data-reveal>
              <span className="metric__number">04</span>
              <span className="metric__unit">PLATFORMS</span>
              <p>多平台商业输出</p>
            </article>
            <article data-reveal>
              <span className="metric__number">10</span>
              <span className="metric__unit">+ TOOLS</span>
              <p>完整视觉工具链</p>
            </article>
          </div>

          <div className="timeline">
            <div className="timeline__heading" data-reveal>
              <p>EXPERIENCE</p>
              <p>从效果图到产品系统</p>
            </div>
            {experiences.map((item, index) => (
              <article className="timeline__row" data-reveal key={item.company}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <time>{item.period}</time>
                <div>
                  <h3>{item.company}</h3>
                  <p>{item.summary}</p>
                </div>
                <strong>{item.role}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="work section" id="work">
        <div className="content">
          <div className="section-label section-label--light" data-reveal>
            <span>02 / SELECTED WORK</span>
            <span>精选项目</span>
          </div>
          <div className="work__heading" data-reveal>
            <h2>
              SELECTED
              <br />
              <span>WORKS</span>
            </h2>
            <p>
              建模、材质、包装与 AI 工作流的交叉实践。
            </p>
          </div>

          <div className="projects">
            {projects.map((project) => (
              <article
                className={`project ${project.className}`}
                data-reveal
                key={project.id}
              >
                <div className="project__image-wrap">
                  <img
                    src={project.image}
                    alt={project.subtitle}
                    width={project.width}
                    height={project.height}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                  />
                  <span className="project__id">{project.id}</span>
                  <span className="project__view">
                    VIEW <Arrow diagonal />
                  </span>
                </div>
                <div className="project__meta">
                  <div>
                    <p>{project.subtitle}</p>
                    <h3>{project.title}</h3>
                  </div>
                  <p>{project.description}</p>
                  <ul>
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="strengths section" id="strengths">
        <div className="content">
          <div className="section-label" data-reveal>
            <span>03 / CAPABILITIES</span>
            <span>个人优势</span>
          </div>
          <div className="strengths__heading" data-reveal>
            <h2>DESIGN WITH RANGE.</h2>
            <p>
              在视觉表达、产品理解和商业目标之间，
              <br />
              保持系统化、可交付的工作方式。
            </p>
          </div>
          <div className="strength-grid">
            {strengths.map((item) => (
              <BorderGlow
                className="strength-glow-card"
                edgeSensitivity={28}
                glowColor="24 100 72"
                backgroundColor="rgba(8, 9, 14, 0.58)"
                borderRadius={22}
                glowRadius={30}
                glowIntensity={1.25}
                coneSpread={23}
                fillOpacity={0.2}
                colors={["#0205fc", "#f5e400", "#ff0202"]}
                reveal
                key={item.id}
              >
                <article>
                  <div className="strength-card__top">
                    <span>{item.id}</span>
                    <Arrow diagonal />
                  </div>
                  <div>
                    <p className="strength-card__en">{item.en}</p>
                    <h3>{item.title}</h3>
                    <p className="strength-card__body">{item.body}</p>
                  </div>
                  <span className="strength-card__meta">{item.meta}</span>
                </article>
              </BorderGlow>
            ))}
          </div>
          <div className="tool-line" data-reveal>
            <span>3DS MAX</span>
            <span>CORONA</span>
            <span>V-RAY</span>
            <span>PHOTOSHOP</span>
            <span>ILLUSTRATOR</span>
            <span>AI WORKFLOW</span>
            <span>PREMIERE</span>
          </div>
        </div>
      </section>

      <footer className="contact" id="contact">
        <div className="contact__grid" aria-hidden="true" />
        <div className="content contact__content">
          <div className="contact__top" data-reveal>
            <span>04 / CONTACT</span>
            <span>LET'S MAKE SOMETHING PRECISE.</span>
          </div>
          <div className="contact__main" data-reveal>
            <div className="contact__copy">
              <p>下一个项目 / 一次交流 / 一个新想法</p>
              <h2>
                LET'S
                <br />
                <span>TALK.</span>
              </h2>
              <a
                href="mailto:parisbarkeeper@gmail.com"
                className="contact__mail"
              >
                <span>发送邮件</span>
                <strong>parisbarkeeper@gmail.com</strong>
                <Arrow diagonal />
              </a>
            </div>
            <div className="contact__profile">
              <ProfileCard
                avatarUrl="/assets/profile-avatar.svg"
                miniAvatarUrl="/assets/profile-avatar.svg"
                name="GAO PENG"
                title="VISUAL / AI / PRODUCT DESIGNER"
                handle="gaopeng.design"
                status="AVAILABLE FOR WORK"
                contactText="CONTACT"
                showUserInfo
                enableTilt
                behindGlowEnabled
                behindGlowColor="rgba(23, 71, 255, 0.72)"
                behindGlowSize="58%"
                innerGradient="linear-gradient(145deg,rgba(2,5,252,.42) 0%,rgba(245,228,0,.12) 54%,rgba(255,2,2,.26) 100%)"
                onContactClick={() => {
                  window.location.href = "mailto:parisbarkeeper@gmail.com";
                }}
              />
            </div>
          </div>
          <div className="contact__bottom">
            <p>GAO PENG © 2026</p>
            <div>
              <a href="tel:+8617666573428">PHONE</a>
              <a href="#top">BACK TO TOP ↑</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
