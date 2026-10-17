export interface AppcBackgroundStatusResult { enabled: boolean; running: boolean; }
export interface AppcBackgroundRequestResult extends AppcBackgroundStatusResult { granted: boolean; }
export interface AppcBackgroundDisableResult { disabled: boolean; }
