import { TooltipDisplayMode, SortOrder } from '@grafana/schema';

function addTooltipOptions(builder, singleOnly = false, setProximity = false, defaultOptions) {
  var _a, _b, _c, _d;
  const category = ["Tooltip"];
  const modeOptions = singleOnly ? [
    { value: TooltipDisplayMode.Single, label: "Single" },
    { value: TooltipDisplayMode.None, label: "Hidden" }
  ] : [
    { value: TooltipDisplayMode.Single, label: "Single" },
    { value: TooltipDisplayMode.Multi, label: "All" },
    { value: TooltipDisplayMode.None, label: "Hidden" }
  ];
  const sortOptions = [
    { value: SortOrder.None, label: "None" },
    { value: SortOrder.Ascending, label: "Ascending" },
    { value: SortOrder.Descending, label: "Descending" }
  ];
  builder.addRadio({
    path: "tooltip.mode",
    name: "Tooltip mode",
    category,
    defaultValue: (_b = (_a = defaultOptions == null ? void 0 : defaultOptions.tooltip) == null ? void 0 : _a.mode) != null ? _b : TooltipDisplayMode.Single,
    settings: {
      options: modeOptions
    }
  }).addRadio({
    path: "tooltip.sort",
    name: "Values sort order",
    category,
    defaultValue: (_d = (_c = defaultOptions == null ? void 0 : defaultOptions.tooltip) == null ? void 0 : _c.sort) != null ? _d : SortOrder.None,
    showIf: (options) => {
      var _a2;
      return ((_a2 = options.tooltip) == null ? void 0 : _a2.mode) === TooltipDisplayMode.Multi;
    },
    settings: {
      options: sortOptions
    }
  });
  if (setProximity) {
    builder.addNumberInput({
      path: "tooltip.hoverProximity",
      name: "Hover proximity",
      description: "How close the cursor must be to a point to trigger the tooltip, in pixels",
      category,
      settings: {
        integer: true
      }
    });
  }
  builder.addNumberInput({
    path: "tooltip.maxWidth",
    name: "Max width",
    category,
    settings: {
      integer: true
    }
  }).addNumberInput({
    path: "tooltip.maxHeight",
    name: "Max height",
    category,
    defaultValue: void 0,
    settings: {
      integer: true
    },
    showIf: (options) => {
      var _a2;
      return ((_a2 = options.tooltip) == null ? void 0 : _a2.mode) === TooltipDisplayMode.Multi;
    }
  });
}

export { addTooltipOptions };
//# sourceMappingURL=tooltip.js.map
