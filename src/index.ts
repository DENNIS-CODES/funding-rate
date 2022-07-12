import { GoogleSheet } from "./sheet/sheet";
import { tokens } from "./token/token";
import axios from "axios";
import { sleep } from "./utils";

const googleSheet = new GoogleSheet();
const Start = async () => {
  try {
    await googleSheet
      .setup()
      .then(() => {
        console.log("Google sheet has been setup");
      })
      .catch((error: any) => {
        console.log("error setting up sheet:", error);
      });
  } catch (error) {
    console.log(error);
  }
};
Start();

const funding_rate = async () => {
  for (let i = 0; i < tokens.length; i++) {
    const market = tokens[i];
    let start_time: any = Math.floor(new Date(2022,5,1,0,0,0).getTime() /1000)
    console.log("date", start_time);

    let end_time = Math.floor(Date.now()/1000);
    let resolution = 60;
    let { data } = await axios({
      method: "GET",
      url: `https://ftx.com/api/funding_rates?future=${market}&start_time=${start_time}&end_time=${end_time}`,
      headers: {
        "FTX-KEY": process.env.API_KEY!,
      },
    });
    let rates: any = [...new Set(data.result)];
    for (let i = 0; i < rates.length; i++) {
      const fund = rates[i];
      console.log("funds", fund);
      await sleep(6000);
      let sheetdata = [fund.future, fund.rate, fund.time];
      console.log("sheet", sheetdata);
      await sleep(2000);
      googleSheet.addRows(sheetdata);
    }
    //   const item = Object.assign({}, data?.result)
  }
};
funding_rate();
