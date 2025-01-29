'use strict'

import express from 'express'
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from './mongo.js'
import authRoutes from "../src/auth/auth.routers.js"
import apiLimiter from '../src/middlewares/validar-cant-peticiones.js'

const middelwares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) => {
    app.use("/adoptionSystem/v1/auth", authRoutes)
}

const conectarDB = async () =>{
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
    }
}

export const initServer = () => {
    const app = express()
    try{
        middelwares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server runnig on port: ${process.env.PORT}`)
    }catch(err){
        cosole.log(`Server init failed: ${err}`)
    }
}