import dotenv from "dotenv";

dotenv.config()

const SERVER_HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
const SERVER_PORT = process.env.PORT || 3000;
const APP_DEBUG = process.env.APP_DEBUG || true;




const config  = {
    server: {
        appDebug: APP_DEBUG as boolean,
        port: SERVER_PORT as number,
        hostname: SERVER_HOSTNAME as string,
    }
}


  export default config;