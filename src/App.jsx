import React, { useEffect } from "react";
import Aurora from "./components/Aurora/Aurora";
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
    title: "ALIBABA GLASS PACKAGING",
    subtitle: "玻璃瓶 Alibaba B2B 产品视觉系统",
    image: "/assets/project-glass.webp",
    width: 1536,
    height: 1024,
    type: "CONCEPT CASE / 概念商业案例",
    platform: "ALIBABA B2B",
    goal: "突出玻璃材质、瓶型结构与 OEM 定制能力，让海外买家快速理解产品价值。",
    outputs: ["产品主图", "材质卖点图", "OEM 定制图", "详情页结构"],
    tags: ["3D RENDERING", "PRODUCT IMAGE", "DETAIL PAGE"],
    description:
      "围绕采购决策组织产品信息，以可信渲染呈现玻璃折射、液体颜色与金属细节。",
    className: "project--wide",
  },
  {
    id: "02",
    title: "OEM PACKAGING FAMILY",
    subtitle: "PET / PP 包装产品家族与定制视觉",
    image: "/assets/project-package.webp",
    width: 1535,
    height: 1024,
    type: "CONCEPT CASE / 概念商业案例",
    platform: "ALIBABA · 1688",
    goal: "统一多规格产品形象，清晰展示容量、结构、颜色与品牌定制选项。",
    outputs: ["SKU 图", "尺寸图", "产品家族图", "定制说明图"],
    tags: ["PACKAGING", "SKU SYSTEM", "OEM / ODM"],
    description:
      "从包装结构到电商呈现建立统一视觉系统，帮助买家快速比较规格并理解定制范围。",
    className: "project--tall",
  },
  {
    id: "03",
    title: "PERFUME LAUNCH VISUALS",
    subtitle: "香水产品主图与场景视觉提案",
    image: "/assets/project-ai.webp",
    width: 1600,
    height: 800,
    type: "CONCEPT CASE / 概念商业案例",
    platform: "AMAZON · SOCIAL",
    goal: "在统一品牌气质下建立产品主图、场景图与多版本营销视觉。",
    outputs: ["白底主图", "产品场景图", "卖点信息图", "多版本精修"],
    tags: ["PRODUCT VISUAL", "AI RETOUCH", "SCENE IMAGE"],
    description:
      "结合三维渲染与 AI 辅助精修，高效完成场景探索、材质调整和营销版本迭代。",
    className: "project--tall",
  },
];

const strengths = [
  {
    id: "01",
    title: "Alibaba 详情页",
    en: "ALIBABA B2B PAGE",
    body: "按照海外采购者的浏览逻辑组织产品信息，将规格、材质、应用场景与 OEM / ODM 卖点转化为清晰的详情页内容。",
    meta: "STRUCTURE · SELLING POINTS",
  },
  {
    id: "02",
    title: "产品图系统",
    en: "PRODUCT IMAGE SYSTEM",
    body: "可独立完成产品主图、SKU 图、尺寸图、拆解图、场景图与卖点信息图，保持整套视觉一致、易读、可交付。",
    meta: "MAIN · SKU · INFOGRAPHIC",
  },
  {
    id: "03",
    title: "包装与三维视觉",
    en: "PACKAGING / 3D",
    body: "熟悉玻璃瓶、PET / PP 塑料罐及护肤品包装类产品，能够通过建模、材质和灯光准确呈现产品结构与质感。",
    meta: "MODELING · RENDERING",
  },
  {
    id: "04",
    title: "AI 辅助精修",
    en: "AI-ASSISTED RETOUCH",
    body: "将生成式工具用于场景探索、材质调整、Logo 替换与版本迭代，在保证品牌一致性的前提下缩短修改链路。",
    meta: "RETOUCH · ITERATION",
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
      ".contact-row > span",
      ".metric__number",
      ".metric__unit",
      ".timeline__row > span",
      ".project__id",
      ".project__type",
      ".project__meta dt",
      ".project__meta dd",
      ".project__tags span",
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
          <a href="#skills">能力</a>
          <a href="#work">作品</a>
          <a href="#about">经历</a>
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
            <span>CROSS-BORDER E-COMMERCE VISUAL</span>
            <span>AVAILABLE FOR WORK</span>
          </div>
          <div className="hero__title-wrap" data-reveal>
            <p>跨境电商视觉设计师 / E-COMMERCE VISUAL DESIGNER</p>
            <h1>
              <span>GAO</span>
              <span className="hero__title-offset">PENG</span>
            </h1>
          </div>
          <div className="hero__footer">
            <p data-reveal>
              专注 Alibaba / Amazon 产品主图、详情页，
              <br />
              以及 SKU、场景图与包装视觉设计。
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
            <span className="hero__index">ALIBABA · AMAZON · 1688</span>
          </div>
        </div>
      </section>

      <section className="strengths section" id="skills">
        <div className="content">
          <div className="section-label" data-reveal>
            <span>01 / CORE SKILLS</span>
            <span>跨境电商视觉交付能力</span>
          </div>
          <div className="strengths__heading" data-reveal>
            <h2>VISUALS BUILT TO SELL.</h2>
            <p>
              从产品理解、三维呈现到详情页设计，
              <br />
              将复杂卖点转化为海外买家易理解的商业视觉。
            </p>
          </div>
          <div className="strength-grid">
            {strengths.map((item) => (
              <article data-reveal key={item.id}>
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
            ))}
          </div>
          <div className="tool-line" data-reveal>
            <span>ALIBABA B2B</span>
            <span>PRODUCT IMAGE</span>
            <span>DETAIL PAGE</span>
            <span>3DS MAX</span>
            <span>CORONA</span>
            <span>PHOTOSHOP</span>
            <span>AI WORKFLOW</span>
          </div>
        </div>
      </section>

      <section className="work section" id="work">
        <div className="content">
          <div className="section-label section-label--light" data-reveal>
            <span>02 / SELECTED CASES</span>
            <span>产品图 · 详情页 · 包装视觉</span>
          </div>
          <div className="work__heading" data-reveal>
            <h2>
              COMMERCE
              <br />
              <span>CASES</span>
            </h2>
            <p>
              以下为概念商业案例，用于展示从产品理解、视觉策略到电商交付的完整方法。
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
                  <span className="project__type">
                    {project.type}
                  </span>
                </div>
                <div className="project__meta">
                  <div className="project__title">
                    <p>{project.subtitle}</p>
                    <h3>{project.title}</h3>
                  </div>
                  <div className="project__summary">
                    <p>{project.description}</p>
                    <dl>
                      <div>
                        <dt>PLATFORM</dt>
                        <dd>{project.platform}</dd>
                      </div>
                      <div>
                        <dt>DESIGN GOAL</dt>
                        <dd>{project.goal}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="project__deliverables">
                    <p>DELIVERABLES</p>
                    <ul>
                      {project.outputs.map((output) => (
                        <li key={output}>{output}</li>
                      ))}
                    </ul>
                    <div className="project__tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about section" id="about">
        <div className="content">
          <div className="section-label" data-reveal>
            <span>03 / ABOUT & EXPERIENCE</span>
            <span>产品视觉与商业表达</span>
          </div>

          <div className="about__intro">
            <div className="about__copy" data-reveal>
              <p className="kicker">HELLO, I AM GAO PENG.</p>
              <h2>
                把<span>产品卖点</span>，
                <br />
                转化为清晰可信的电商视觉。
              </h2>
              <p className="about__body">
                我是一名跨境电商视觉设计师，毕业于上海大学视觉传达设计专业。
                近年的工作重点集中在玻璃瓶、PET / PP 塑料包装、香水与护肤品类产品视觉。
                能够从三维建模、材质渲染到产品主图、SKU 图、场景图与详情页完成完整交付，
                并将结构、材质、容量和 OEM / ODM 定制信息转化为海外买家易理解的视觉内容。
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
              <span className="metric__number">B2B</span>
              <span className="metric__unit">ALIBABA</span>
              <p>详情页信息结构与卖点表达</p>
            </article>
            <article data-reveal>
              <span className="metric__number">3D</span>
              <span className="metric__unit">VISUAL</span>
              <p>产品建模、材质与场景渲染</p>
            </article>
            <article data-reveal>
              <span className="metric__number">OEM</span>
              <span className="metric__unit">ODM</span>
              <p>定制范围与产品规格可视化</p>
            </article>
            <article data-reveal>
              <span className="metric__number">AI</span>
              <span className="metric__unit">WORKFLOW</span>
              <p>精修、场景探索与版本迭代</p>
            </article>
          </div>

          <div className="timeline">
            <div className="timeline__heading" data-reveal>
              <p>EXPERIENCE</p>
              <p>从三维表现到电商产品视觉</p>
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

      <footer className="contact" id="contact">
        <div className="contact__grid" aria-hidden="true" />
        <div className="content contact__content">
          <div className="contact__top" data-reveal>
            <span>04 / CONTACT</span>
            <span>AVAILABLE FOR E-COMMERCE VISUAL ROLES</span>
          </div>
          <div className="contact__main" data-reveal>
            <div className="contact__copy">
              <p>
                正在寻找跨境电商视觉设计 / 电商美工岗位，
                也接受产品图、详情页与包装视觉项目合作。
              </p>
              <h2>
                LET'S
                <br />
                <span>WORK.</span>
              </h2>
              <a
                href="mailto:parisbarkeeper@gmail.com"
                className="contact__mail"
              >
                <span>发送岗位或项目需求</span>
                <strong>parisbarkeeper@gmail.com</strong>
                <Arrow diagonal />
              </a>
            </div>
            <div className="contact__profile">
              <ProfileCard
                avatarUrl="/assets/profile-avatar.svg"
                miniAvatarUrl="/assets/profile-avatar.svg"
                name="GAO PENG"
                title="CROSS-BORDER E-COMMERCE VISUAL DESIGNER"
                handle="gaopeng.design"
                status="AVAILABLE FOR WORK"
                contactText="EMAIL ME"
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
