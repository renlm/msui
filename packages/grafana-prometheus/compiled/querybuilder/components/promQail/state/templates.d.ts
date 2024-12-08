import { QuerySuggestion } from '../types';
interface TemplateData {
    template: string;
    description: string;
}
export declare const generalTemplates: TemplateData[];
export declare const counterTemplates: TemplateData[];
export declare const histogramTemplates: TemplateData[];
export declare const gaugeTemplates: TemplateData[];
export declare function getTemplateSuggestions(metricName: string, metricType: string, labels: string): QuerySuggestion[];
export {};
