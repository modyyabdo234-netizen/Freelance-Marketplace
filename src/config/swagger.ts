import swaggerJSDoc from "swagger-jsdoc"
import path from "path";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Freelance marketplace API",
            version: "1.0.0",
            description: "project about managing freelancer gigs and client orders "
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
           url: "/"} 
        ]
    },
    apis: [
        path.join(__dirname, "../routes/*.ts"),
        path.join(__dirname, "../models/*.ts"),
        path.join(__dirname, "../routes/*.js"),
        path.join(__dirname, "../models/*.js")
    ]
}

export const specs = swaggerJSDoc(options)