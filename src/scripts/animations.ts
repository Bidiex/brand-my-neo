// Micro animaciones de la landing con GSAP.
// Todo se envuelve en matchMedia para respetar "reducir movimiento":
// si el sistema lo pide, no se anima nada y el contenido se ve tal cual.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel) as NodeListOf<T>);

const ease = 'power3.out';

// Aparece al entrar en pantalla, con stagger si hay varios elementos
function reveal(targets: Element[] | string, vars: gsap.TweenVars = {}, trigger?: Element | string) {
  const els = typeof targets === 'string' ? $(targets) : targets;
  if (!els.length) return;
  gsap.from(els, {
    autoAlpha: 0, y: 24, duration: 0.8, ease, stagger: 0.08,
    ...vars,
    scrollTrigger: { trigger: trigger ?? els[0], start: 'clamp(top 85%)', once: true },
  });
}

function intro() {
  const tl = gsap.timeline({ defaults: { ease, duration: 0.8 } });
  const title = document.querySelector('.hero__title');
  const split = title ? SplitText.create(title, { type: 'words', mask: 'words' }) : null;

  tl.from('.header__inner > *', { autoAlpha: 0, y: -10, stagger: 0.06, duration: 0.6 })
    .from('.hero__stats', { autoAlpha: 0, y: 12 }, 0.1)
    // Al terminar se deshace el split: la máscara recortaría descendentes como la "g"
    .from(split?.words ?? [], { yPercent: 110, stagger: 0.07, duration: 0.9, onComplete: () => split?.revert() }, 0.15)
    .from('.hero__lead', { autoAlpha: 0, y: 16 }, 0.45)
    .from('.progress', { autoAlpha: 0, y: 16 }, 0.55)
    .from('.progress__fill', { scaleX: 0, transformOrigin: 'left center', duration: 1.2, ease: 'power2.inOut' }, 0.7)
    .from('.hero .perfil', { autoAlpha: 0, y: 16 }, 0.7);

  // El título ya está dividido: se puede mostrar el hero (ver .anim-pending en Base.astro)
  document.documentElement.classList.remove('anim-pending');
}

function spots() {
  const lid = document.querySelector('.lid');
  if (!lid) return;
  const tl = gsap.timeline({ scrollTrigger: { trigger: lid, start: 'clamp(top 85%)', once: true }, defaults: { ease } });
  tl.from('.spots__hint', { autoAlpha: 0, y: 16, duration: 0.7 })
    .from('.lid', { autoAlpha: 0, y: 40, scale: 0.96, duration: 1 }, 0.1)
    // .spot tiene transition en transform (hover): se anima solo la opacidad y su contenido
    .from('.spot', { autoAlpha: 0, duration: 0.5, stagger: { each: 0.05, from: 'center' } }, 0.55)
    .from('.spot > span:not(.spot__tip)', { y: 8, duration: 0.5, stagger: { each: 0.05, from: 'center' } }, 0.55);

  reveal('.tier', { stagger: 0.1 });
  reveal('.spots .note');
}

function sections() {
  // Cabeceras de sección: eyebrow, título y entradilla
  $('.section').forEach((section) => {
    const head = $('.eyebrow, .section-title, .section-lead', section).filter((el) => !el.closest('.historia__text'));
    reveal(head, {}, head[0]);
  });

  // Historia: foto desde la izquierda, texto desde la derecha
  reveal('.historia__media', { x: -40, y: 0, duration: 1 });
  reveal($('.historia__text > *'), { x: 30, y: 0, stagger: 0.07 });
  const foto = document.querySelector('.historia__media img');
  if (foto) {
    gsap.fromTo(foto, { yPercent: -4 }, {
      yPercent: 4, ease: 'none',
      scrollTrigger: { trigger: '.historia__media', start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }

  reveal('.empty > *');
  reveal('.sponsors > li', { y: 20, scale: 0.96 });
  reveal('.paso', { stagger: 0.12 });
  reveal('.paso__n', { scale: 0.4, y: 0, ease: 'back.out(2)', duration: 0.6, stagger: 0.12 }, '.pasos');

  // La máquina: sube con un poco de escala y flota al hacer scroll
  const machine = document.querySelector('.machine__img');
  if (machine) {
    reveal([machine], { y: 60, scale: 0.94, duration: 1.2 });
    gsap.to(machine, {
      y: -30, ease: 'none',
      scrollTrigger: { trigger: machine, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }
  reveal('.spec', { stagger: 0.06 });
  reveal('.machine__link');

  reveal('.faq__list > details', { y: 16, stagger: 0.06 });
  reveal($('.footer p'), { y: 12, stagger: 0.06 });
}

// Barra de progreso de lectura bajo el header
function progressLine() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.querySelector('.header')?.appendChild(bar);
  gsap.fromTo(bar, { scaleX: 0 }, {
    scaleX: 1, ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
  });
}

// FAQ: abrir y cerrar con altura animada en vez del salto nativo
function faq() {
  $<HTMLDetailsElement>('.faq__list details').forEach((d) => {
    const summary = d.querySelector('summary')!;
    const body = d.querySelector('p')!;
    summary.addEventListener('click', (e) => {
      e.preventDefault();
      if (gsap.isTweening(body)) return;
      if (d.open) {
        gsap.to(body, { height: 0, autoAlpha: 0, duration: 0.3, ease: 'power2.in', onComplete: () => { d.open = false; gsap.set(body, { clearProps: 'all' }); } });
      } else {
        d.open = true;
        gsap.from(body, { height: 0, autoAlpha: 0, y: -6, duration: 0.4, ease, clearProps: 'all' });
      }
    });
  });
}

// Botones: pequeño rebote al pulsar
function buttons() {
  $('.btn').forEach((b) => {
    b.addEventListener('pointerdown', () => gsap.to(b, { scale: 0.95, duration: 0.12, ease: 'power2.out' }));
    const release = () => gsap.to(b, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    b.addEventListener('pointerup', release);
    b.addEventListener('pointerleave', release);
  });
}

const mm = gsap.matchMedia();
mm.add('(prefers-reduced-motion: no-preference)', () => {
  intro();
  spots();
  sections();
  progressLine();
  faq();
  buttons();
  // Las imágenes lazy cambian la altura de la página: recalcular posiciones
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
});
mm.add('(prefers-reduced-motion: reduce)', () => {
  document.documentElement.classList.remove('anim-pending');
});
