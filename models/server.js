const express = require('express');
require('dotenv').config();
const cors = require('cors');
const dbConnection = require('../db/config');

class Server{

    constructor(){

        this.app = express();

        this.paths = {
            auth: '/api/auth',
            cocheras:'/api/cocheras',
            user: '/api/user',
            vehiculos:'/api/vehiculos',
            uploads:'/api/uploads'
        }
        
        
        this.conectarDB()
        this.middlewares()
        this.routes()
        
        this.corsOptions = {
            origin: 'https://parking-now.netlify.app/',
            optionsSuccessStatus: 200 
        }
    }
    
     async conectarDB(){
        await dbConnection()
    } 
    
    middlewares(){
        
        // cors
        this.app.use( cors())
        
        this.app.use(express.urlencoded({extended: false}));

        // lectura y parseo del body
        this.app.use( express.json() )


        /* this.app.use( express.static('public')) */
    }

    routes(){

        this.app.use( this.paths.auth, require('../routes/auth.routes') )
        this.app.use( this.paths.user, require('../routes/user.routes') )
        this.app.use( this.paths.cocheras, require('../routes/cocheras.routes') )
        this.app.use( this.paths.uploads, require('../routes/uploads') )
        this.app.use( this.paths.vehiculos, require('../routes/vehiculos.routes') )
    }

    listen(){
        this.app.listen( process.env.PORT, () => {
            console.log( 'server on port : ' , process.env.PORT )
        })
    }

}

module.exports = Server;