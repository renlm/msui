import * as React from 'react';
import { TextArea } from '../TextArea/TextArea';
export type Props = React.ComponentProps<typeof TextArea> & {
    /** TRUE if the secret was already configured. (It is needed as often the backend doesn't send back the actual secret, only the information that it was configured) */
    isConfigured: boolean;
    /** Called when the user clicks on the "Reset" button in order to clear the secret */
    onReset: () => void;
};
export declare const CONFIGURED_TEXT = "configured";
export declare const RESET_BUTTON_TEXT = "Reset";
/**
 * Text area that does not disclose an already configured value but lets the user reset the current value and enter a new one.
 * Typically useful for asymmetric cryptography keys.
 */
export declare const SecretTextArea: ({ isConfigured, onReset, ...props }: Props) => React.JSX.Element;
