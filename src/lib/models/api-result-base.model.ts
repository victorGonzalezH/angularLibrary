export enum ErrorType {
    Domain      = 0,
    ClientSide  = 1,
    ServerSide  = 2
}



export interface ApiResultBase {

    data: any;

    error: any;

    userMessage: string;

    resultCode: number;

    errorType: ErrorType;

    applicationMessage: string;
}
