import Clutter from 'gi://Clutter';

import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

export default class PlainExampleExtension extends Extension {
  _handleEvent(actor, event) {
    log('Handling captured event!!');
    let value = event.type();
    log('Event type:', Object.keys(Clutter.EventType).find(key => Clutter.EventType[key] === value));
  }

  enable() {
    this._stageCaptureEvent = global.stage.connect('captured-event', this._handleEvent.bind(this));
    log('touch debug is enabled');
  }

  disable() {
    log('touch debug is disabled');
    if (this._stageCaptureEvent) {
      global.stage.disconnect(this._stageCaptureEvent);
      this._stageCaptureEvent = null;
    }
  }
}
