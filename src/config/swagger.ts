import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Freelance marketplace API",
            version: "1.0.0",
            description: "project about managing freelancer gigs and client orders"
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter your JWT token directly'
                }
            }
        },
        servers : [{
            url: "/"
        }]
    },

    apis: [
        "./src/routes/*.ts",
        "./src/models/*.ts",
        "./dist/routes/*.js",  
        "./dist/models/*.js"
    ]
}

export const specs = swaggerJSDoc(options);