import { memo, useCallback } from 'react';

import { InputsEnum, usePreferences } from 'data';
import { Switcher } from 'preferences/switcher';

import {
  CloseButton,
  PreferencesContainer,
  PreferencesDrawerFallback,
  PreferencesDrawerWrapper,
} from './preferencesDrawer.styled';

interface IPreferencesProps {
  active: boolean;
  onClose: () => void;
}

const inputsVariants = Object.values(InputsEnum);

export const PreferencesDrawer = memo(
  ({ active, onClose }: IPreferencesProps) => {
    const { inputs, updatePreferences } = usePreferences();

    const updateInputs = useCallback(
      (newInputValue: InputsEnum) =>
        updatePreferences({ inputs: newInputValue }),
      [updatePreferences]
    );

    return (
      <>
        {active && <PreferencesDrawerFallback onClick={onClose} />}
        <PreferencesDrawerWrapper active={active} tabIndex={0}>
          <CloseButton onClick={onClose}>Close</CloseButton>

          <PreferencesContainer>
            <Switcher
              variants={inputsVariants}
              value={inputs}
              onChange={updateInputs}
              description="Inputs to use"
            />
          </PreferencesContainer>
        </PreferencesDrawerWrapper>
      </>
    );
  }
);

PreferencesDrawer.displayName = 'PreferencesDrawer';
