// src/dataTypes.ts

export interface DataEntry {
    timeRetrieved: string; // Time when the data was retrieved
    dataName: string;      // Name of the data (e.g., "IP", "Platform")
    dataValue: string;     // The actual data value
    found: boolean;        // Boolean indicating if the data was found
}

export interface GlobalDataTable {
    [key: string]: DataEntry; // Keyed by dataName, each entry is a DataEntry object
}

