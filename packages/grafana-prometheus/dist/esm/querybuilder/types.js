var PromVisualQueryOperationCategory = /* @__PURE__ */ ((PromVisualQueryOperationCategory2) => {
  PromVisualQueryOperationCategory2["Aggregations"] = "Aggregations";
  PromVisualQueryOperationCategory2["RangeFunctions"] = "Range functions";
  PromVisualQueryOperationCategory2["Functions"] = "Functions";
  PromVisualQueryOperationCategory2["BinaryOps"] = "Binary operations";
  PromVisualQueryOperationCategory2["Trigonometric"] = "Trigonometric";
  PromVisualQueryOperationCategory2["Time"] = "Time Functions";
  return PromVisualQueryOperationCategory2;
})(PromVisualQueryOperationCategory || {});
var PromOperationId = /* @__PURE__ */ ((PromOperationId2) => {
  PromOperationId2["Abs"] = "abs";
  PromOperationId2["Absent"] = "absent";
  PromOperationId2["AbsentOverTime"] = "absent_over_time";
  PromOperationId2["Acos"] = "acos";
  PromOperationId2["Acosh"] = "acosh";
  PromOperationId2["Asin"] = "asin";
  PromOperationId2["Asinh"] = "asinh";
  PromOperationId2["Atan"] = "atan";
  PromOperationId2["Atanh"] = "atanh";
  PromOperationId2["Avg"] = "avg";
  PromOperationId2["AvgOverTime"] = "avg_over_time";
  PromOperationId2["BottomK"] = "bottomk";
  PromOperationId2["Ceil"] = "ceil";
  PromOperationId2["Changes"] = "changes";
  PromOperationId2["Clamp"] = "clamp";
  PromOperationId2["ClampMax"] = "clamp_max";
  PromOperationId2["ClampMin"] = "clamp_min";
  PromOperationId2["Cos"] = "cos";
  PromOperationId2["Cosh"] = "cosh";
  PromOperationId2["Count"] = "count";
  PromOperationId2["CountOverTime"] = "count_over_time";
  PromOperationId2["CountScalar"] = "count_scalar";
  PromOperationId2["CountValues"] = "count_values";
  PromOperationId2["DayOfMonth"] = "day_of_month";
  PromOperationId2["DayOfWeek"] = "day_of_week";
  PromOperationId2["DayOfYear"] = "day_of_year";
  PromOperationId2["DaysInMonth"] = "days_in_month";
  PromOperationId2["Deg"] = "deg";
  PromOperationId2["Delta"] = "delta";
  PromOperationId2["Deriv"] = "deriv";
  PromOperationId2["DropCommonLabels"] = "drop_common_labels";
  PromOperationId2["Exp"] = "exp";
  PromOperationId2["Floor"] = "floor";
  PromOperationId2["Group"] = "group";
  PromOperationId2["HistogramQuantile"] = "histogram_quantile";
  PromOperationId2["HistogramAvg"] = "histogram_avg";
  PromOperationId2["HistogramCount"] = "histogram_count";
  PromOperationId2["HistogramSum"] = "histogram_sum";
  PromOperationId2["HistogramFraction"] = "histogram_fraction";
  PromOperationId2["HistogramStddev"] = "histogram_stddev";
  PromOperationId2["HistogramStdvar"] = "histogram_stdvar";
  PromOperationId2["HoltWinters"] = "holt_winters";
  PromOperationId2["Hour"] = "hour";
  PromOperationId2["Idelta"] = "idelta";
  PromOperationId2["Increase"] = "increase";
  PromOperationId2["Irate"] = "irate";
  PromOperationId2["LabelJoin"] = "label_join";
  PromOperationId2["LabelReplace"] = "label_replace";
  PromOperationId2["Last"] = "last";
  PromOperationId2["LastOverTime"] = "last_over_time";
  PromOperationId2["Ln"] = "ln";
  PromOperationId2["Log10"] = "log10";
  PromOperationId2["Log2"] = "log2";
  PromOperationId2["Max"] = "max";
  PromOperationId2["MaxOverTime"] = "max_over_time";
  PromOperationId2["Min"] = "min";
  PromOperationId2["MinOverTime"] = "min_over_time";
  PromOperationId2["Minute"] = "minute";
  PromOperationId2["Month"] = "month";
  PromOperationId2["Pi"] = "pi";
  PromOperationId2["PredictLinear"] = "predict_linear";
  PromOperationId2["Present"] = "present";
  PromOperationId2["PresentOverTime"] = "present_over_time";
  PromOperationId2["Quantile"] = "quantile";
  PromOperationId2["QuantileOverTime"] = "quantile_over_time";
  PromOperationId2["Rad"] = "rad";
  PromOperationId2["Rate"] = "rate";
  PromOperationId2["Resets"] = "resets";
  PromOperationId2["Round"] = "round";
  PromOperationId2["Scalar"] = "scalar";
  PromOperationId2["Sgn"] = "sgn";
  PromOperationId2["Sin"] = "sin";
  PromOperationId2["Sinh"] = "sinh";
  PromOperationId2["Sort"] = "sort";
  PromOperationId2["SortDesc"] = "sort_desc";
  PromOperationId2["Sqrt"] = "sqrt";
  PromOperationId2["Stddev"] = "stddev";
  PromOperationId2["StddevOverTime"] = "stddev_over_time";
  PromOperationId2["Sum"] = "sum";
  PromOperationId2["SumOverTime"] = "sum_over_time";
  PromOperationId2["Tan"] = "tan";
  PromOperationId2["Tanh"] = "tanh";
  PromOperationId2["Time"] = "time";
  PromOperationId2["Timestamp"] = "timestamp";
  PromOperationId2["TopK"] = "topk";
  PromOperationId2["Vector"] = "vector";
  PromOperationId2["Year"] = "year";
  PromOperationId2["Addition"] = "__addition";
  PromOperationId2["Subtraction"] = "__subtraction";
  PromOperationId2["MultiplyBy"] = "__multiply_by";
  PromOperationId2["DivideBy"] = "__divide_by";
  PromOperationId2["Modulo"] = "__modulo";
  PromOperationId2["Exponent"] = "__exponent";
  PromOperationId2["NestedQuery"] = "__nested_query";
  PromOperationId2["EqualTo"] = "__equal_to";
  PromOperationId2["NotEqualTo"] = "__not_equal_to";
  PromOperationId2["GreaterThan"] = "__greater_than";
  PromOperationId2["LessThan"] = "__less_than";
  PromOperationId2["GreaterOrEqual"] = "__greater_or_equal";
  PromOperationId2["LessOrEqual"] = "__less_or_equal";
  return PromOperationId2;
})(PromOperationId || {});
var PromQueryPatternType = /* @__PURE__ */ ((PromQueryPatternType2) => {
  PromQueryPatternType2["Rate"] = "rate";
  PromQueryPatternType2["Histogram"] = "histogram";
  PromQueryPatternType2["Binary"] = "binary";
  return PromQueryPatternType2;
})(PromQueryPatternType || {});

export { PromOperationId, PromQueryPatternType, PromVisualQueryOperationCategory };
//# sourceMappingURL=types.js.map
