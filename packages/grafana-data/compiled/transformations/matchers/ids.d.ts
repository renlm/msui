export declare enum MatcherID {
    anyMatch = "anyMatch",// checks children
    allMatch = "allMatch",// checks children
    invertMatch = "invertMatch",// checks child
    alwaysMatch = "alwaysMatch",
    neverMatch = "neverMatch"
}
export declare enum FieldMatcherID {
    numeric = "numeric",
    time = "time",// Can be multiple times
    first = "first",
    firstTimeField = "firstTimeField",// Only the first time field
    byType = "byType",
    byTypes = "byTypes",
    byName = "byName",
    byNames = "byNames",
    byRegexp = "byRegexp",
    byRegexpOrNames = "byRegexpOrNames",
    byFrameRefID = "byFrameRefID",
    byValue = "byValue"
}
/**
 * Field name matchers
 */
export declare enum FrameMatcherID {
    byName = "byName",
    byRefId = "byRefId",
    byIndex = "byIndex"
}
/**
 * @public
 */
export declare enum ValueMatcherID {
    regex = "regex",
    isNull = "isNull",
    isNotNull = "isNotNull",
    greater = "greater",
    greaterOrEqual = "greaterOrEqual",
    lower = "lower",
    lowerOrEqual = "lowerOrEqual",
    equal = "equal",
    notEqual = "notEqual",
    substring = "substring",
    notSubstring = "notSubstring",
    between = "between"
}
