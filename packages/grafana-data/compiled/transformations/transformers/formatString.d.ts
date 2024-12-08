import { DataFrame, Field } from '../../types';
import { DataTransformerInfo, FieldMatcher } from '../../types/transformations';
export declare enum FormatStringOutput {
    UpperCase = "Upper Case",
    LowerCase = "Lower Case",
    SentenceCase = "Sentence Case",
    TitleCase = "Title Case",
    PascalCase = "Pascal Case",
    CamelCase = "Camel Case",
    SnakeCase = "Snake Case",
    KebabCase = "Kebab Case",
    Trim = "Trim",
    Substring = "Substring"
}
export interface FormatStringTransformerOptions {
    stringField: string;
    substringStart: number;
    substringEnd: number;
    outputFormat: FormatStringOutput;
}
export declare const getFormatStringFunction: (options: FormatStringTransformerOptions) => (field: Field) => string[];
export declare const formatStringTransformer: DataTransformerInfo<FormatStringTransformerOptions>;
/**
 * @internal
 */
export declare const createStringFormatter: (fieldMatches: FieldMatcher, formatStringFunction: (field: Field) => string[]) => (frame: DataFrame, allFrames: DataFrame[]) => Field<any>[];
