import { memo, useCallback } from 'react';

import { InputsEnum } from 'data';

import {
  Description,
  SwitcherButton,
  SwitcherContainer,
  SwitcherVariants,
} from './switcher.styled';

interface ISwitcherProps {
  variants: InputsEnum[];
  value: InputsEnum;
  onChange: (value: InputsEnum) => void;
  description?: string;
}

export const Switcher = memo(
  ({ variants, value, onChange, description }: ISwitcherProps) => {
    const onClick = useCallback(
      (variant: InputsEnum) => () => onChange(variant),
      [onChange]
    );

    return (
      <SwitcherContainer>
        {description && <Description>{description}</Description>}
        <SwitcherVariants>
          {variants.map((variant) => (
            <SwitcherButton
              key={variant}
              onClick={onClick(variant)}
              active={value === variant}>
              {variant}
            </SwitcherButton>
          ))}
        </SwitcherVariants>
      </SwitcherContainer>
    );
  }
);

Switcher.displayName = 'Switcher';
