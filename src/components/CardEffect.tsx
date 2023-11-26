// import './CardEffect.css';

// export interface CardEffectProps {
//   class: string;
//   children: ComponentChildren;
//   onClick?: (event: MouseEvent) => void;
// }

// export function CardEffect(props: CardEffectProps) {
//   const ref = createRef<HTMLDivElement>();

//   function handleMouseMove(event: MouseEvent) {
//     handlePointerMove(event, event.clientX, event.clientY);
//   }

//   function handleTouchMove(event: TouchEvent) {
//     handlePointerMove(
//       event,
//       event.touches[0].clientX,
//       event.touches[0].clientY
//     );
//   }

//   function handlePointerMove(
//     event: MouseEvent | TouchEvent,
//     pointerX: number,
//     pointerY: number
//   ) {
//     event.preventDefault();

//     const card = ref.current!;
//     const bounds = card.getBoundingClientRect();

//     const h = bounds.height;
//     const w = bounds.width;
//     const x = pointerX - bounds.left;
//     const y = pointerY - bounds.top;

//     const px = Math.abs(Math.floor((100 / w) * x) - 100);
//     const py = Math.abs(Math.floor((100 / h) * y) - 100);
//     const pa = 50 - px + (50 - py);

//     // math for gradient / background positions
//     const lp = 50 + (px - 50) / 1.5;
//     const tp = 50 + (py - 50) / 1.5;
//     const px_spark = 50 + (px - 50) / 7;
//     const py_spark = 50 + (py - 50) / 7;
//     const p_opc = 20 + Math.abs(pa) * 1.5;
//     const ty = ((tp - 50) / 2) * -1;
//     const tx = ((lp - 50) / 1.5) * 0.5;

//     card.style.setProperty('--rotate-x', `${ty}deg`);
//     card.style.setProperty('--rotate-y', `${tx}deg`);
//     card.style.setProperty('--gradient-position', `${lp}% ${tp}%`);
//     card.style.setProperty('--sparkle-position', `${px_spark}% ${py_spark}%`);
//     card.style.setProperty('--sparkle-opacity', `${p_opc / 100}`);
//   }

//   function reset() {
//     const card = ref.current!;
//     card.style.setProperty('--rotate-x', `0deg`);
//     card.style.setProperty('--rotate-y', `0deg`);
//   }

//   return (
//     <div
//       ref={ref}
//       class={props.class}
//       onClick={props.onClick}
//       onMouseMove={handleMouseMove}
//       onTouchMove={handleTouchMove}
//       onMouseOut={reset}
//       onTouchEnd={reset}
//       onTouchCancel={reset}
//     >
//       <div class="card-effect">{props.children}</div>
//     </div>
//   );
// }
