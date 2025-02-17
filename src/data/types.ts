export type dataType = "IP" | "ISP" | "LOCATION"

export interface iData {
    // datatype: dataType;
    name: string;
    value: string;
    found: boolean;
}

export interface iIP extends iData {
    datatype: "IP";
}
