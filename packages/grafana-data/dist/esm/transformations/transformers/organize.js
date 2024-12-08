import '@grafana/schema';
import '../../datetime/moment_wrapper.js';
import { TransformationApplicabilityLevels } from '../../types/transformations.js';
import '../../types/vector.js';
import '../../types/datasource.js';
import 'lodash';
import '../../types/legacyEvents.js';
import { filterFieldsByNameTransformer } from './filterByName.js';
import { DataTransformerID } from './ids.js';
import { orderFieldsTransformer } from './order.js';
import { renameFieldsTransformer } from './rename.js';

const organizeFieldsTransformer = {
  id: DataTransformerID.organize,
  name: "Organize fields by name",
  description: "Order, filter and rename fields based on configuration given by user",
  defaultOptions: {
    excludeByName: {},
    indexByName: {},
    renameByName: {},
    includeByName: {}
  },
  isApplicable: (data) => {
    return data.length > 1 ? TransformationApplicabilityLevels.NotPossible : TransformationApplicabilityLevels.Applicable;
  },
  /**
   * Return a modified copy of the series. If the transform is not or should not
   * be applied, just return the input series
   */
  operator: (options, ctx) => (source) => source.pipe(
    filterFieldsByNameTransformer.operator(
      {
        include: options.includeByName ? { names: mapToExcludeArray(options.includeByName) } : void 0,
        exclude: { names: mapToExcludeArray(options.excludeByName) }
      },
      ctx
    ),
    orderFieldsTransformer.operator(options, ctx),
    renameFieldsTransformer.operator(options, ctx)
  )
};
const mapToExcludeArray = (excludeByName) => {
  if (!excludeByName) {
    return [];
  }
  return Object.keys(excludeByName).filter((name) => excludeByName[name]);
};

export { organizeFieldsTransformer };
//# sourceMappingURL=organize.js.map
