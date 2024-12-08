/// <reference types="react" />
import { AnyAction } from 'redux';
import { llms } from '@grafana/experimental';
import { PrometheusDatasource } from '../../../../datasource';
import { PromVisualQuery } from '../../../types';
import { Interaction } from '../types';
export declare function getExplainMessage(query: string, metric: string, datasource: PrometheusDatasource): llms.openai.Message[];
/**
 * Calls the API and adds suggestions to the interaction
 *
 * @param dispatch
 * @param idx
 * @param interaction
 * @returns
 */
export declare function promQailExplain(dispatch: React.Dispatch<AnyAction>, idx: number, query: PromVisualQuery, interaction: Interaction, suggIdx: number, datasource: PrometheusDatasource): Promise<import("rxjs").Subscription>;
/**
 * Guess the type of a metric, based on its name and its relation to other metrics available
 *
 * @param metric     - name of metric whose type to guess
 * @param allMetrics - list of all available metrics
 * @returns          - the guess of the type (string): counter,gauge,summary,histogram,'histogram,summary'
 */
export declare function guessMetricType(metric: string, allMetrics: string[]): string;
/**
 * Check if the LLM plugin is enabled.
 * Used in the PromQueryBuilder to enable/disable the button based on openai and vector db checks
 * @returns true if the LLM plugin is enabled.
 */
export declare function isLLMPluginEnabled(): Promise<boolean>;
/**
 * Calls the API and adds suggestions to the interaction
 *
 * @param dispatch
 * @param idx
 * @param interaction
 * @returns
 */
export declare function promQailSuggest(dispatch: React.Dispatch<AnyAction>, idx: number, query: PromVisualQuery, labelNames: string[], datasource: PrometheusDatasource, interaction?: Interaction): Promise<void | import("rxjs").Subscription>;
