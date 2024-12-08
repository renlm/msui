import { Row } from 'react-table';
import { Field, LinkModel } from '@grafana/data';
/**
 * @internal
 */
export declare const getCellLinks: (field: Field, row: Row) => LinkModel<unknown>[] | undefined;
