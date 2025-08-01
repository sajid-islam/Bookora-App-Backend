import { CronJob } from "cron";
import https from "https";

const job = new CronJob("*/14 * * * *", function () {
    https
        .get(process.env.API_URL, (res) => {
            if (res.statusCode === 200)
                console.log("GET request send successfully");
            else console.log("GET request failed", res.statusCode);
        })
        .on("error", (err) =>
            console.error("Error while sending request", err)
        );
});

export default job;
