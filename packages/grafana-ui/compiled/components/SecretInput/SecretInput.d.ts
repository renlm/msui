import * as React from 'react';
import { Input } from '../Input/Input';
export type Props = React.ComponentProps<typeof Input> & {
    /** TRUE if the secret was already configured. (It is needed as often the backend doesn't send back the actual secret, only the information that it was configured) */
    isConfigured: boolean;
    /** Called when the user clicks on the "Reset" button in order to clear the secret */
    onReset: () => void;
};
export declare const CONFIGURED_TEXT = "configured";
export declare const RESET_BUTTON_TEXT = "Reset";
export declare const SecretInput: ({ isConfigured, onReset, ...props }: Props) => React.JSX.Element;
