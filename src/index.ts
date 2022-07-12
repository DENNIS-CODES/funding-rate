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
    funding_rate();
  } catch (error) {
    console.log(error);
  }
};
Start();

const funding_rate = async () => {
  for (let i = 0; i < tokens.length; i++) {
    const market = tokens[i];
    let start_time = Date.parse("06 Jun 2022 00:00:00 GMT");
    console.log("date", start_time);

    let end_time = Date.parse("2022-07-11 00:00:00");
    let resolution = 60;
    let { data } = await axios({
      method: "GET",
      url: `https://ftx.com/api/funding_rates?future=${market}`,
      headers: {
        "FTX-KEY": process.env.API_KEY!,
      },
    });
    //   console.log(data.result);
    let rates: any = data.result;
    //   console.log(rates);
    rates.forEach(function (item: any) {
      console.log(item);
      let sheetdata = [item.future, item.rate, item.time];
      setTimeout(() => {
        console.log(sheetdata);
        googleSheet.addRows(sheetdata);
    }, 1000);
    });

    //   const item = Object.assign({}, data?.result)
  }
};
funding_rate();
