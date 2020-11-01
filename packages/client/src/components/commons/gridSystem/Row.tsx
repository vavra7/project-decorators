import { FC, ReactNode } from 'react';
import { AlignItems, JustifyContent } from './types';

interface Props {
  children?: ReactNode;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  id?: string;
  className?: string;
  style?: object;
}

export const Row: FC<Props> = props => {
  let classes = 'row';

  if (props.className) classes = classes.concat(` ${props.className}`);
  if (props.justifyContent) classes = classes.concat(` jc-${props.justifyContent}`);
  if (props.alignItems) classes = classes.concat(` ai-${props.alignItems}`);

  return (
    <div className={classes} id={props.id} style={props.style}>
      {props.children}
    </div>
  );
};
