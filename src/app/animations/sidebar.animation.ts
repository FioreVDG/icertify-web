import {
  trigger,
  state,
  style,
  transition,
  animate,
  animateChild,
  query,
} from '@angular/animations';

export const onSideNavChange = trigger('onSideNavChange', [
  state(
    'close',
    style({
      'min-width': '70px',
    })
  ),
  state(
    'open',
    style({
      'min-width': '220px',
    })
  ),
  transition('close => open', animate('250ms ease-in')),
  transition('open => close', animate('250ms ease-in')),
]);

export const onMainContentChange = trigger('onMainContentChange', [
  state(
    'close',
    style({
      'margin-left': '0px',
    })
  ),
  state(
    'open',
    style({
      'margin-left': '188px',
    })
  ),
  transition('close => open', animate('250ms ease-in')),
  transition('open => close', animate('250ms ease-out')),
]);

export const animateText = trigger('animateText', [
  state(
    'hide',
    style({
      display: 'none',
      opacity: 0,
    })
  ),
  state(
    'show',
    style({
      display: 'block',
      opacity: 1,
    })
  ),
  transition('close => open', animate('0.5s 0.5s ease-in')),
  transition('open => close', animate('0.5s ease-in')),
]);
