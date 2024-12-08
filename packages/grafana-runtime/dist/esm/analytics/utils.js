import { config } from '../config.js';
import { getEchoSrv, EchoEventType } from '../services/EchoSrv.js';
import '@grafana/data';
import { locationService } from '../services/LocationService.js';
import '../services/appEvents.js';
import 'react';

const reportMetaAnalytics = (payload) => {
  getEchoSrv().addEvent({
    type: EchoEventType.MetaAnalytics,
    payload
  });
};
const reportPageview = () => {
  var _a;
  const location = locationService.getLocation();
  const page = `${(_a = config.appSubUrl) != null ? _a : ""}${location.pathname}${location.search}${location.hash}`;
  getEchoSrv().addEvent({
    type: EchoEventType.Pageview,
    payload: {
      page
    }
  });
};
const reportInteraction = (interactionName, properties) => {
  getEchoSrv().addEvent({
    type: EchoEventType.Interaction,
    payload: {
      interactionName,
      properties
    }
  });
};
const reportExperimentView = (id, group, variant) => {
  getEchoSrv().addEvent({
    type: EchoEventType.ExperimentView,
    payload: {
      experimentId: id,
      experimentGroup: group,
      experimentVariant: variant
    }
  });
};

export { reportExperimentView, reportInteraction, reportMetaAnalytics, reportPageview };
//# sourceMappingURL=utils.js.map
