import 'dotenv/config'

export const configs = {
    google_key: process.env.gcp_sheets_key || "",
    google_email: process.env.gcp_sheets_email || "",
    sheed_id: process.env.sheet_id || "",
    API_KEY: process.env.API_KEY || "",
}