import { readFile, utils } from 'xlsx';
import path from 'path';

export interface TestDataRow {
    TestCaseID: string;
    Postcode: string;
    SearchResultsTitle: string;
    RestaurantName: string;
    LoginPageTitle: string;
}

export class ExcelReader {
    /**
     * Reads a specific sheet from an Excel file and returns an array of typed data rows.
     */
    static getSheetData(sheetName: string, relativeFilePath: string = './test-data/qa/TestData.xlsx'): TestDataRow[] {
        const absolutePath = path.resolve(relativeFilePath);
        
        // Load the workbook
        const workbook = readFile(absolutePath);
        
        // Grab the specific worksheet
        const worksheet = workbook.Sheets[sheetName];
        if (!worksheet) {
            throw new Error(`Sheet with name "${sheetName}" not found in Excel file.`);
        }
        
        // Convert the sheet matrix into an array of JSON objects
        return utils.sheet_to_json<TestDataRow>(worksheet);
    }
}