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

export const AllUser = async (req: express.Request, res: express.Response) => {
    try {
        var query1 = "SELECT id,name,email,contactNumber,status FROM users WHERE role ='user' ";
        const users = await db.query(query1);
        if (users) {
            res.send({
                success: true,
                message: "user found Succes",
                data: users[0]
            })
        } else {
            res.send({
                success: false,
                message: "user not found"
            })
        }
    } catch (error) {
        res.send({
            success: false,
            message: "Server Error"
        })
    }
}

export const UpdateUserStatus = async (req: express.Request, res: express.Response) => {
    const { status, id } = req.body
    try {
        var query1 = "UPDATE users SET status=? WHERE id=?";
        const user = await db.query(query1, [status, id])
        if (user) {
            res.send({
                success: true,
                message: "Update Success"
            })
        }
    } catch (error) {
        res.send({
            success: false,
            message: "server error"
        })
    }

}

export const ChangePass = async (req: express.Request, res: express.Response) => {
    const { email, oldPassword, newPassword } = req['body']
    try {
        let query1 = 'select email,password,role,status from users WHERE email=?'
        const user = await db.query(query1, [email])
        const b = user[0]
        if (b[0]) {
            if (b[0].password === oldPassword) {
                const query2 = "UPDATE users SET password=? WHERE email=?";
                const u = await db.query(query2, [newPassword, email])
                if (u[0]) {
                    res.send({
                        success: true,
                        message: "Password updation success"
                    })
                } else {
                    res.send({
                        success: false,
                        message: "error"
                    })
                }
            } else {
                res.send({
                    success: false,
                    message: "Wrong Password"
                })
            }
        } else {
            res.send({
                success: false,
                message: "Email wrong"
            })
        }
    } catch (error) {
        res.send({
            success: false,
            message: "Server error"
        })
    }
}

export const addCatogery = async (req: express.Request, res: express.Response) => {
    const { name } = req.body
    try {
        const query1 = 'select name,id from category WHERE name=?';
        const data = await db.query(query1, [name])
        const a = data[0]
        if (a[0]) {
            if (a[0].name === name) {
                res.send({
                    success: false,
                    message: "Catogory already added"
                })
            } else {
                res.send({
                    success: false,
                    message: "Data not found"
                })
            }
        } else {
            const query2 = 'insert into category (name) values(?)';
            const cat = await db.query(query2, [name])
            if (cat[0]) {
                res.send({
                    success: true,
                    message: "Category added success"
                })
            } else {
                res.send({
                    success: false,
                    message: "Somting went Error"
                })
            }
        }
    } catch (error) {
        res.send({
            success: false,
            message: "SERver Error"
        })
    }
}

export const getCatogery = async (req: express.Request, res: express.Response) => {
    try {
        const query1 = 'select * from  category order by name';
        const data = await db.query(query1)
        if (data[0]) {
            res.send({
                success: true,
                message: "data find success",
                data: data[0]
            })
        } else {
            res.send({
                success: false,
                message: "found error"
            })
        }
    } catch (error) {
        res.send({
            success: false,
            message: "SERver Error"
        })
    }
}


export const updatCatogery = async (req: express.Request, res: express.Response) => {
    const { name, id } = req.body
    try {
        const query1 = 'select name,id from category WHERE id=?';
        const data = await db.query(query1, [id])
        const a = data[0]
        if (a[0]) {
            const query1 = 'update category set name=? where id=?'
            const data = await db.query(query1, [name, id])
            res.send({
                success: true,
                message: "Update successfully",
                data: data
            })
        } else {
            res.send({
                success: false,
                message: "Data is not found"
            })
        }
    } catch (error) {
        res.send({
            success: false,
            message: "SERver Error"
        })
    }
}