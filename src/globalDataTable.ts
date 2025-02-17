import { GlobalDataTable, DataEntry } from "./dataTypes";

export let globalDataTable: GlobalDataTable = {};

export function updateGlobalDataTable(dataName: string, dataValue: string, found: boolean): void {
    const timeRetrieved = new Date().toISOString();
    const newEntry: DataEntry = {
        timeRetrieved,
        dataName,
        dataValue,
        found,
    };

    globalDataTable[dataName] = newEntry;

    console.log(`Updated global data table:`, globalDataTable);
}

export function importTable (scriptOutput: string[]): void {
    if (!Array.isArray(scriptOutput)) {
        console.error("scriptOutput is not an array:", scriptOutput);
        return;
    }
    scriptOutput.forEach((line) => {
        const [dataName, dataValue, found] = line.split(',');
        updateGlobalDataTable(dataName, dataValue, found === 'true');
    });
}
