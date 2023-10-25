import { PropsWithChildren, createRef } from 'react';
import { useDispatch } from 'react-redux';
import { ScaledImage } from '../components/ScaledImage';
import { DeckEntry } from '../types/Deck';
import './CardView.css';
import { set as setFocusedCard } from './focused-card';

export function CardView({
  card,
  large = false,
}: {
  card: DeckEntry;
  large?: boolean;
}) {
  const dispatch = useDispatch();
  const ref = createRef<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="card"
      onClick={() => {
        const { top, left, width, height } =
          ref.current!.getBoundingClientRect();

        dispatch(
          setFocusedCard({
            card,
            bounds: { top, left, width, height },
          })
        );
      }}
    >
      <CardEffect>
        {large ? (
          <ScaledImage small={card.images.small} large={card.images.large} />
        ) : (
          <img src={card.images.small} />
        )}
        <code className="id">{card.id}</code>
        <span className="emojis">{card.emojis}</span>
        {card.count != 1 ? <span className="amount">{card.count}</span> : null}
      </CardEffect>
    </div>
  );
}

function CardEffect(props: PropsWithChildren<Record<string, never>>) {
  const ref = createRef<HTMLDivElement>();

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    handlePointerMove(event, event.clientX, event.clientY);
  }

  function handleTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    handlePointerMove(
      event,
      event.touches[0].clientX,
      event.touches[0].clientY
    );
  }
  function handlePointerMove(
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    ...pos: [number, number]
  ) {
    event.preventDefault();

    const card = ref.current!.parentElement!;
    const bounds = card.getBoundingClientRect();

    const [l, t] = pos;
    const h = bounds.height;
    const w = bounds.width;

    const px = Math.abs(Math.floor((100 / w) * l) - 100);
    const py = Math.abs(Math.floor((100 / h) * t) - 100);
    const pa = 50 - px + (50 - py);

    // console.log({
    //   l,
    //   t,
    //   h,
    //   w,
    //   px,
    //   py,
    //   pa,
    //   pos,
    //   bounds,
    // });

    // math for gradient / background positions
    const lp = 50 + (px - 50) / 1.5;
    const tp = 50 + (py - 50) / 1.5;
    const px_spark = 50 + (px - 50) / 7;
    const py_spark = 50 + (py - 50) / 7;
    const p_opc = 20 + Math.abs(pa) * 1.5;
    const ty = ((tp - 50) / 2) * -1;
    const tx = ((lp - 50) / 1.5) * 0.5;
    // css to apply for active card

    card.style.setProperty('--rotate-x', `${tx}deg`);
    card.style.setProperty('--rotate-y', `${ty}deg`);
  }

  function reset() {
    const card = ref.current!;
    card.style.transform = '';
  }

  return (
    <div
      ref={ref}
      className="card-effect"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseOut={reset}
      onTouchEnd={reset}
      onTouchCancel={reset}
    >
      {props.children}
    </div>
  );
}

/*

  using
    - an animated gif of sparkles.
    - an animated gradient as a holo effect.
    - color-dodge mix blend mode
*/
// var x;
// var $cards = $('.card');
// var $style = $('.hover');

// $cards
// .on('mousemove touchmove', function (e) {
//   var l = pos[0];
//   var t = pos[1];
//   var h = $card.height();
//   var w = $card.width();
//   var px = Math.abs(Math.floor((100 / w) * l) - 100);
//   var py = Math.abs(Math.floor((100 / h) * t) - 100);
//   var pa = 50 - px + (50 - py);
//   // math for gradient / background positions
//   var lp = 50 + (px - 50) / 1.5;
//   var tp = 50 + (py - 50) / 1.5;
//   var px_spark = 50 + (px - 50) / 7;
//   var py_spark = 50 + (py - 50) / 7;
//   var p_opc = 20 + Math.abs(pa) * 1.5;
//   var ty = ((tp - 50) / 2) * -1;
//   var tx = ((lp - 50) / 1.5) * 0.5;
//   // css to apply for active card
//   var grad_pos = `background-position: ${lp}% ${tp}%;`;
//   var sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`;
//   var opc = `opacity: ${p_opc / 100};`;
//   var tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`;
//   // need to use a <style> tag for psuedo elements
//   var style = `
//     .card:hover:before { ${grad_pos} }  /* gradient */
//     .card:hover:after { ${sprk_pos} ${opc} }   /* sparkles */
//   `;
//   // set / apply css class and style
//   $cards.removeClass('active');
//   $card.removeClass('animated');
//   $card.attr('style', tf);
//   $style.html(style);
//   if (e.type === 'touchmove') {
//     return false;
//   }
//   clearTimeout(x);
// })
// .on('mouseout touchend touchcancel', function () {
//   // remove css, apply custom animation on end
//   var $card = $(this);
//   $style.html('');
//   $card.removeAttr('style');
//   x = setTimeout(function () {
//     $card.addClass('animated');
//   }, 2500);
// });
