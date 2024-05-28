import express from 'express'
const db = require('../Config/Db')
const jwt = require('jsonwebtoken')
require('dotenv').config()

export const SignUp = async (req: express.Request, res: express.Response) => {
    const { name, email, contactNumber, password } = req.body;
    try {
        let query1 = 'select email,password,role,status from users WHERE email=?'
        const user = await db.query(query1, [email])
        const b = user[0]
        if (b[0]) {
            res.send({
                success: false,
                message: "User already Exist"
            })
        } else {
            let query2 = 'insert into users(name,contactNumber,email,password,status,role)values(?,?,?,?,"false","user" ) ';
            const resp = await db.query(query2, [name, contactNumber, email, password])
            if (resp) {
                res.send({
                    success: true,
                    message: "Registation successFully",
                    data: resp
                })
            } else {
                res.send({
                    success: false,
                    message: "Something went wrong"
                })
            }
        }
    } catch (error) {
        res.send({
            success: false,
            message: "Server error"
        })
    }

}

export const Login = async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body
    try {
        let query1 = 'select email,password,role,status from users WHERE email=?'
        const user = await db.query(query1, [email])
        const b = user[0]
        if (b[0]) {
            if (b[0].password === password) {
                const token = jwt.sign({
                    email: email, role: b[0].role
                }, process.env.SECRET, { expiresIn: '1h' })
                res.send({
                    success: true,
                    message: "Login success",
                    token: token
                })
            } else {
                res.send({
                    data: b.email,
                    success: false,
                    message: "password incorrect"
                })
            }
        } else {
            res.send({
                success: false,
                message: "user not found"
            })
        }
    } catch (error) {
        res.send({
            success: false,
            message: "Server error"
        })
    }
}