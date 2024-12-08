import { HistoryItem } from '@grafana/data';
import { PrometheusDatasource } from '../../datasource';
import type PromQlLanguageProvider from '../../language_provider';
import { PromQuery } from '../../types';
export type Props = {
    initialValue: string;
    languageProvider: PromQlLanguageProvider;
    history: Array<HistoryItem<PromQuery>>;
    placeholder: string;
    onRunQuery: (value: string) => void;
    onBlur: (value: string) => void;
    onChange: (value: string) => void;
    datasource: PrometheusDatasource;
};
