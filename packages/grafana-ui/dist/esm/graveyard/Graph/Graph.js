import $ from 'jquery';
import { uniqBy } from 'lodash';
import React__default, { PureComponent } from 'react';
import { createDimension } from '@grafana/data';
import { TooltipDisplayMode } from '@grafana/schema';
import { VizTooltip } from '../../components/VizTooltip/VizTooltip.js';
import '../../components/VizTooltip/VizTooltipContainer.js';
import '@emotion/css';
import 'hoist-non-react-statics';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import '../../components/VizLegend/SeriesIcon.js';
import { GraphContextMenu } from './GraphContextMenu.js';
import { GraphTooltip } from './GraphTooltip/GraphTooltip.js';
import { graphTimeFormat, graphTickFormatter } from './utils.js';

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Graph extends PureComponent {
  constructor() {
    super(...arguments);
    __publicField(this, "state", {
      isTooltipVisible: false,
      isContextVisible: false
    });
    __publicField(this, "element", null);
    __publicField(this, "$element", null);
    __publicField(this, "onPlotSelected", (event, ranges) => {
      const { onHorizontalRegionSelected } = this.props;
      if (onHorizontalRegionSelected) {
        onHorizontalRegionSelected(ranges.xaxis.from, ranges.xaxis.to);
      }
    });
    __publicField(this, "onPlotHover", (event, pos, item) => {
      this.setState({
        isTooltipVisible: true,
        activeItem: item,
        pos
      });
    });
    __publicField(this, "onPlotClick", (event, contextPos, item) => {
      this.setState({
        isContextVisible: true,
        isTooltipVisible: false,
        contextItem: item,
        contextPos
      });
    });
    __publicField(this, "renderTooltip", () => {
      const { children, series, timeZone } = this.props;
      const { pos, activeItem, isTooltipVisible } = this.state;
      let tooltipElement;
      if (!isTooltipVisible || !pos || series.length === 0) {
        return null;
      }
      React__default.Children.forEach(children, (c) => {
        if (tooltipElement) {
          return;
        }
        const childType = c && c.type && (c.type.displayName || c.type.name);
        if (childType === VizTooltip.displayName) {
          tooltipElement = c;
        }
      });
      if (!tooltipElement) {
        return null;
      }
      const tooltipElementProps = tooltipElement.props;
      const tooltipMode = tooltipElementProps.mode || "single";
      if (!activeItem && tooltipMode === "single") {
        return null;
      }
      const tooltipContentRenderer = tooltipElementProps.tooltipComponent || GraphTooltip;
      const seriesIndex = activeItem ? activeItem.series.seriesIndex : 0;
      const rowIndex = activeItem ? activeItem.dataIndex : void 0;
      const activeDimensions = {
        // Described x-axis active item
        // When hovering over an item - let's take it's dataIndex, otherwise undefined
        // Tooltip itself needs to figure out correct datapoint display information based on pos passed to it
        xAxis: [seriesIndex, rowIndex],
        // Describes y-axis active item
        yAxis: activeItem ? [activeItem.series.seriesIndex, activeItem.dataIndex] : null
      };
      const tooltipContentProps = {
        dimensions: {
          // time/value dimension columns are index-aligned - see getGraphSeriesModel
          xAxis: createDimension(
            "xAxis",
            series.map((s) => s.timeField)
          ),
          yAxis: createDimension(
            "yAxis",
            series.map((s) => s.valueField)
          )
        },
        activeDimensions,
        pos,
        mode: tooltipElementProps.mode || TooltipDisplayMode.Single,
        timeZone
      };
      const tooltipContent = React__default.createElement(tooltipContentRenderer, __spreadValues({}, tooltipContentProps));
      return React__default.cloneElement(tooltipElement, {
        content: tooltipContent,
        position: { x: pos.pageX, y: pos.pageY },
        offset: { x: 10, y: 10 }
      });
    });
    __publicField(this, "renderContextMenu", () => {
      const { series } = this.props;
      const { contextPos, contextItem, isContextVisible } = this.state;
      if (!isContextVisible || !contextPos || !contextItem || series.length === 0) {
        return null;
      }
      const seriesIndex = contextItem ? contextItem.series.seriesIndex : 0;
      const rowIndex = contextItem ? contextItem.dataIndex : void 0;
      const contextDimensions = {
        // Described x-axis context item
        xAxis: [seriesIndex, rowIndex],
        // Describes y-axis context item
        yAxis: contextItem ? [contextItem.series.seriesIndex, contextItem.dataIndex] : null
      };
      const dimensions = {
        // time/value dimension columns are index-aligned - see getGraphSeriesModel
        xAxis: createDimension(
          "xAxis",
          series.map((s) => s.timeField)
        ),
        yAxis: createDimension(
          "yAxis",
          series.map((s) => s.valueField)
        )
      };
      const closeContext = () => this.setState({ isContextVisible: false });
      const getContextMenuSource = () => {
        return {
          datapoint: contextItem.datapoint,
          dataIndex: contextItem.dataIndex,
          series: contextItem.series,
          seriesIndex: contextItem.series.seriesIndex,
          pageX: contextPos.pageX,
          pageY: contextPos.pageY
        };
      };
      const contextContentProps = {
        x: contextPos.pageX,
        y: contextPos.pageY,
        onClose: closeContext,
        getContextMenuSource,
        timeZone: this.props.timeZone,
        dimensions,
        contextDimensions
      };
      return /* @__PURE__ */ React__default.createElement(GraphContextMenu, __spreadValues({}, contextContentProps));
    });
    __publicField(this, "getBarWidth", () => {
      const { series } = this.props;
      return Math.min(...series.map((s) => s.timeStep));
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.draw();
    }
  }
  componentDidMount() {
    this.draw();
    if (this.element) {
      this.$element = $(this.element);
      this.$element.bind("plotselected", this.onPlotSelected);
      this.$element.bind("plothover", this.onPlotHover);
      this.$element.bind("plotclick", this.onPlotClick);
    }
  }
  componentWillUnmount() {
    if (this.$element) {
      this.$element.unbind("plotselected", this.onPlotSelected);
    }
  }
  getYAxes(series) {
    if (series.length === 0) {
      return [{ show: true, min: -1, max: 1 }];
    }
    return uniqBy(
      series.map((s) => {
        const index = s.yAxis ? s.yAxis.index : 1;
        const min = s.yAxis && s.yAxis.min && !isNaN(s.yAxis.min) ? s.yAxis.min : null;
        const tickDecimals = s.yAxis && s.yAxis.tickDecimals && !isNaN(s.yAxis.tickDecimals) ? s.yAxis.tickDecimals : null;
        return {
          show: true,
          index,
          position: index === 1 ? "left" : "right",
          min,
          tickDecimals
        };
      }),
      (yAxisConfig) => yAxisConfig.index
    );
  }
  draw() {
    if (this.element === null) {
      return;
    }
    const {
      width,
      series,
      timeRange,
      showLines,
      showBars,
      showPoints,
      isStacked,
      lineWidth,
      timeZone,
      onHorizontalRegionSelected
    } = this.props;
    if (!width) {
      return;
    }
    const ticks = width / 100;
    const min = timeRange.from.valueOf();
    const max = timeRange.to.valueOf();
    const yaxes = this.getYAxes(series);
    const flotOptions = {
      legend: {
        show: false
      },
      series: {
        stack: isStacked,
        lines: {
          show: showLines,
          lineWidth,
          zero: false
        },
        points: {
          show: showPoints,
          fill: 1,
          fillColor: false,
          radius: 2
        },
        bars: {
          show: showBars,
          fill: 1,
          // Dividig the width by 1.5 to make the bars not touch each other
          barWidth: showBars ? this.getBarWidth() / 1.5 : 1,
          zero: false,
          lineWidth
        },
        shadowSize: 0
      },
      xaxis: {
        timezone: timeZone,
        show: true,
        mode: "time",
        min,
        max,
        label: "Datetime",
        ticks,
        timeformat: graphTimeFormat(ticks, min, max),
        tickFormatter: graphTickFormatter
      },
      yaxes,
      grid: {
        minBorderMargin: 0,
        markings: [],
        backgroundColor: null,
        borderWidth: 0,
        hoverable: true,
        clickable: true,
        color: "#a1a1a1",
        margin: { left: 0, right: 0 },
        labelMarginX: 0,
        mouseActiveRadius: 30
      },
      selection: {
        mode: onHorizontalRegionSelected ? "x" : null,
        color: "#666"
      },
      crosshair: {
        mode: "x"
      }
    };
    try {
      $.plot(
        this.element,
        series.filter((s) => s.isVisible),
        flotOptions
      );
    } catch (err) {
      console.error("Graph rendering error", err, flotOptions, series);
      throw new Error("Error rendering panel");
    }
  }
  render() {
    const { ariaLabel, height, width, series } = this.props;
    const noDataToBeDisplayed = series.length === 0;
    const tooltip = this.renderTooltip();
    const context = this.renderContextMenu();
    return /* @__PURE__ */ React__default.createElement("div", { className: "graph-panel", "aria-label": ariaLabel }, /* @__PURE__ */ React__default.createElement(
      "div",
      {
        className: "graph-panel__chart",
        ref: (e) => this.element = e,
        style: { height, width },
        onMouseLeave: () => {
          this.setState({ isTooltipVisible: false });
        }
      }
    ), noDataToBeDisplayed && /* @__PURE__ */ React__default.createElement("div", { className: "datapoints-warning" }, "No data"), tooltip, context);
  }
}
__publicField(Graph, "defaultProps", {
  showLines: true,
  showPoints: false,
  showBars: false,
  isStacked: false,
  lineWidth: 1
});

export { Graph, Graph as default };
//# sourceMappingURL=Graph.js.map
