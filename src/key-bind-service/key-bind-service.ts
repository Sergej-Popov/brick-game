import { singleton } from 'tsyringe';
import { KeyBind, KeyBindSlot } from '~/@types';
import { KeyBindButtonBinded, KeyBindHandler } from './types';

@singleton()
export class KeyBindService implements KeyBind {
  private mapSlot2Key: Record<KeyBindSlot, KeyBindButtonBinded> = {
    [KeyBindSlot.Top]: 'ArrowUp',
    [KeyBindSlot.Right]: 'ArrowRight',
    [KeyBindSlot.Down]: 'ArrowDown',
    [KeyBindSlot.Left]: 'ArrowLeft',
    [KeyBindSlot.Rotate]: ' ',
    [KeyBindSlot.OnOff]: 'o',
    [KeyBindSlot.StartPause]: 'p',
    [KeyBindSlot.Sound]: 's',
    [KeyBindSlot.Reset]: 'r',
  };

  private mapSlot2Buttons: Record<KeyBindSlot, KeyBindButtonBinded> = {
    [KeyBindSlot.Top]: 'filter5_di_1_2',
    [KeyBindSlot.Right]: 'filter3_di_1_2',
    [KeyBindSlot.Down]: 'filter2_di_1_2',
    [KeyBindSlot.Left]: 'filter4_di_1_2',
    [KeyBindSlot.Rotate]: 'filter1_di_1_2',
    [KeyBindSlot.OnOff]: 'filter6_di_1_2',
    [KeyBindSlot.StartPause]: 'filter7_di_1_2',
    [KeyBindSlot.Sound]: 'filter9_di_1_2',
    [KeyBindSlot.Reset]: 'filter8_di_1_2',
  };

  private mapSlot2Handler: Record<KeyBindSlot, Array<KeyBindHandler>> = {
    [KeyBindSlot.Top]: [],
    [KeyBindSlot.Down]: [],
    [KeyBindSlot.Left]: [],
    [KeyBindSlot.Right]: [],
    [KeyBindSlot.Reset]: [],
    [KeyBindSlot.Rotate]: [],
    [KeyBindSlot.OnOff]: [],
    [KeyBindSlot.StartPause]: [],
    [KeyBindSlot.Sound]: [],
  };

  constructor() {
    document.onkeydown = ({ key: pressedKey }) => {
      const slotKeyPars = Object.entries(this.mapSlot2Key) as Array<[KeyBindSlot, KeyBindButtonBinded]>;
      slotKeyPars.forEach(([slot, boundKey]) => {
        if (boundKey === pressedKey) {
          this.mapSlot2Handler[slot].forEach((handler) => handler());
        }
      });
    };

    const slotButtonPairs = Object.entries(this.mapSlot2Buttons) as Array<[KeyBindSlot, string]>;
    slotButtonPairs.forEach(([slot, boundButton]) => {
      const gamepadButton = document.querySelector(`[filter="url(#${boundButton})"]`);
      gamepadButton?.addEventListener('click', () => {
        this.mapSlot2Handler[slot].forEach((handler) => handler());
      });
    });
  }

  public bindHandler(button: KeyBindSlot, handler: KeyBindHandler) {
    this.mapSlot2Handler[button].push(handler);
  }
}

