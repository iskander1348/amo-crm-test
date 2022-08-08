import * as fs from "fs";

export function openJSON(filename: string): Record<string, string> {
    return JSON.parse(openFile(filename));
}

export function openFile(filename: string): string {
    return fs.readFileSync(filename).toString()
}

export function writeJSON(filename: string, data: Record<string, string>) {
    try{
        const dataStr = JSON.stringify(data, null, 2);
        fs.writeFileSync(filename, dataStr);
    }
    catch(err){
        throw err
    }
        
    
}
