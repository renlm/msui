import { eventFactory } from '../events/eventFactory.js';
import { BusEventWithPayload, BusEventBase } from '../events/types.js';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const AppEvents = {
  alertSuccess: eventFactory("alert-success"),
  alertWarning: eventFactory("alert-warning"),
  alertError: eventFactory("alert-error")
};
const PanelEvents = {
  refresh: eventFactory("refresh"),
  componentDidMount: eventFactory("component-did-mount"),
  dataReceived: eventFactory("data-received"),
  dataError: eventFactory("data-error"),
  dataFramesReceived: eventFactory("data-frames-received"),
  dataSnapshotLoad: eventFactory("data-snapshot-load"),
  editModeInitialized: eventFactory("init-edit-mode"),
  initPanelActions: eventFactory("init-panel-actions"),
  initialized: eventFactory("panel-initialized"),
  panelTeardown: eventFactory("panel-teardown"),
  render: eventFactory("render")
};
class LegacyGraphHoverEvent extends BusEventWithPayload {
}
__publicField(LegacyGraphHoverEvent, "type", "graph-hover");
class LegacyGraphHoverClearEvent extends BusEventBase {
  constructor() {
    super(...arguments);
    __publicField(this, "payload", { point: {} });
  }
}
__publicField(LegacyGraphHoverClearEvent, "type", "graph-hover-clear");

export { AppEvents, LegacyGraphHoverClearEvent, LegacyGraphHoverEvent, PanelEvents };
//# sourceMappingURL=legacyEvents.js.map
