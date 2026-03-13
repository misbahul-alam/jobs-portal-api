import {buildApp} from "@/app";

const server = buildApp()

const start = async () => {
    try {
        await server.listen({port:5000, host:'127.0.0.1'});
        console.log(`server running at http://localhost:5000`);
    }catch(err){
        server.log.error(err)
        process.exit(1);
    }
}

start()