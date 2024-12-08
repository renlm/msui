export declare function getDataSourceSrv(): {
    getList: () => {
        id: number;
        uid: string;
        type: string;
        name: string;
        meta: {
            alerting: boolean;
            info: {
                logos: {
                    small: string;
                };
            };
        };
        jsonData: {};
        access: string;
    }[];
    getInstanceSettings: () => {
        id: number;
        uid: string;
        type: string;
        name: string;
        meta: {
            alerting: boolean;
            info: {
                logos: {
                    small: string;
                };
            };
        };
        jsonData: {};
        access: string;
    };
};
