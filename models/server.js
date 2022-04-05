const express = require('express');
require('dotenv').config();
const cors = require('cors');
const dbConnection = require('../db/config');





class Server{

    constructor(){

        this.app = express();

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/search',
            cocheras:'/api/cocheras',
            user: '/api/user',
            vehiculos:'/api/vehiculos'
        }
        
        
        this.conectarDB()
        this.middlewares()
        this.routes()
        
        this.corsOptions = {
            origin: 'https://parking-now.herokuapp.com',
            optionsSuccessStatus: 200 
        }
    }
    
    async conectarDB(){
        await dbConnection()
    }
    
    middlewares(){
        
        // cors
        this.app.use( cors(this.corsOptions))
        
        // lectura y parseo del body
        this.app.use( express.json() )
        
        
        // servir carpeta pública , construir path

        /* this.app.use( express.static('public')) */
    }

    routes(){

        this.app.use( this.paths.auth, require('../routes/auth') )
        this.app.use( this.paths.buscar, require('../routes/search') )
        this.app.use( this.paths.user, require('../routes/user') )
        this.app.use( this.paths.cocheras, require('../routes/cocheras') )
        this.app.use( this.paths.vehiculos, require('../routes/vehiculos') )
    }

    listen(){
        this.app.listen( process.env.PORT, () => {
            console.log( 'server on port : ' , process.env.PORT )
        })
    }

}

module.exports = Server;