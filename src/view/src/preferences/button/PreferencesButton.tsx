import { ButtonHTMLAttributes, memo } from 'react';

import { Button, Icon } from './preferencesButton.styled';

interface IPreferencesButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const PreferencesButton = memo((props: IPreferencesButtonProps) => (
  <Button {...props}>
    <Icon />
  </Button>
));

PreferencesButton.displayName = 'PreferencesButton';
