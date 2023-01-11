import express, {Application} from 'express';
import cors from "cors";
import router from '../routes/user.route';
import db from '../database/config';

class Server {
    
    private app: Application;
    private port: number | string;
    private apiPaths = {
        users: '/api/users'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8000;


        //methods
        this.connection();
        this.middlewares();
        this.routes();
    
    }

    async connection(){
        try {

            await db.authenticate();
            console.log("Connection established!");

        } catch (error) {
            console.log("Error connecting!");
        }
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
    }

    routes(){
        this.app.use( this.apiPaths.users, router )
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto: " + this.port);
        });
    }
}

export default Server;