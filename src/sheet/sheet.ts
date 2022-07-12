import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import { configs } from "../config/config";
import { sleep } from "../utils";

export class GoogleSheet {
  readonly doc: GoogleSpreadsheet;
  sheet: GoogleSpreadsheetWorksheet | undefined;
  readonly header_to_key!: object;
  constructor(doc_id = configs.sheed_id) {
    this.doc = new GoogleSpreadsheet(doc_id);
  }
  setup = async () => {
    await this.doc.useServiceAccountAuth({
      client_email: configs.google_email,
      private_key: configs.google_key,
    });
    await this.doc.loadInfo();
    this.sheet = this.doc.sheetsByTitle["nkx_fr"];
    await this.sheet.loadCells("A1:Z1");
  };
  addRows = async (data: any) => {
    // try {
    //     await this.sheet?.clear();
    //   } catch (error) {}
    try {
      await this.sheet?.setHeaderRow(["future", "rate", "time"]);
    } catch (error) {
      console.log("error setting up sheet:", error);
    }
    try {
    await sleep(5000)
      await this.sheet?.addRow(data, {
        raw: false,
        insert: false,
      });
    } catch (error) {
      console.log("error adding data to rows:", error);
    }
  };
}
