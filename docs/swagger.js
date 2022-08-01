const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {

        openapi: '3.0.0',
        info:{
            title: 'Cocheras Backend',
            description: 'Documentation for Cocheras backend',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:6000'
            }
        ]
}


const options = {
    swaggerDefinition,
    apis: [`${path.join(__dirname, '..routes/*.js')}`], // donde estan los endpoints que queremos documentar
}

module.exports = swaggerJSDoc(options);