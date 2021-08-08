import { memo, useCallback, useState } from 'react';

import { PreferencesButton } from './button';
import { PreferencesDrawer } from './drawer';

export const Preferences = memo(() => {
  const [active, setActive] = useState(false);

  const onClick = useCallback(() => setActive((value) => !value), []);

  const onClose = useCallback(() => setActive(false), []);

  return (
    <>
      <PreferencesButton onClick={onClick} />
      <PreferencesDrawer active={active} onClose={onClose} />
    </>
  );
});

Preferences.displayName = 'Preferences';
