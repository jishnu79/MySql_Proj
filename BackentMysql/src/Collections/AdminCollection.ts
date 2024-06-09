import express from 'express'
const db = require('../Config/Db')
const jwt = require('jsonwebtoken')
require('dotenv').config()

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

export const addProduct = async (req: express.Request, res: express.Response) => {
    const { name, categoryId, description, price } = req.body
    try {
        if (!name || !categoryId || !description || !price) {
            res.send({
                success: false,
                message: "fill all columns"
            })
        } else {
            const query1 = 'insert into product (name,categoryId,description,price,status ) values(?,?,?,?,"true" ) ';
            const data = await db.query(query1, [name, categoryId, description, price])
            if (data[0]) {
                res.send({
                    success: true,
                    message: "success",
                    data: data
                })
            } else {
                res.send({
                    success: false,
                    message: "fail",
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

export const getProduct = async (req: express.Request, res: express.Response) => {
    const query1 = `select p.id,p.name,p.description,p.price,p.status, c.id as categoryId,c.name as categoryName 
                    from product as p inner join category as c where p.categoryId=c.id `
    try {
        const data = await db.query(query1)
        if (data[0]) {
            const a = data[0]
            if (a[0]) {
                res.send({
                    success: true,
                    message: "success",
                    data: data[0]
                })
            } else {
                res.send({
                    success: false,
                    message: "data not found",
                })
            }
        } else {
            res.send({
                success: false,
                message: "data not found",
            })
        }
    } catch (error) {
        res.send({
            success: false,
            message: "SERver Error"
        })
    }
}

export const getByCategory = async (req: express.Request, res: express.Response) => {
    const { id } = req.params
    try {
        const query1 = "select id,name from product where categoryId=? and status ='true'";
        const data = await db.query(query1, [id])
        if (data[0]) {
            const a = data[0]
            if (a[0]) {
                res.send({
                    success: true,
                    message: "data found",
                    data: data[0]
                })
            } else {
                res.send({
                    success: false,
                    message: "data not found",
                })
            }
        } else {
            res.send({
                success: false,
                message: "Somthing went error",
            })
        }
    } catch (error) {
        res.send({
            success: false,
            message: "SERver Error"
        })
    }
}

export const getById = async (req: express.Request, res: express.Response) => {
    const { id } = req.params
    try {
        const query1 = " select id,name,description,price from product where id=? "
        const data = await db.query(query1, [id])
        if (data[0]) {
            const a = data[0]
            if (a[0]) {
                res.send({
                    success: true,
                    message: "data found",
                    data: data[0]
                })
            } else {
                res.send({
                    success: false,
                    message: "data not found",
                })
            }
        } else {
            res.send({
                success: false,
                message: "Somthing went error",
            })
        }
    } catch (error) {
        res.send({
            success: false,
            message: "SERver Error"
        })
    }
}

export const updatePro = async (req: express.Request, res: express.Response) => {
    const { name, categoryId, description, price, id } = req.body
    try {
        const query1 = " update product set name=? ,categoryId=? ,description=? ,price=? where id=? "
        const data = await db.query(query1, [name, categoryId, description, price, id])
        if (data[0]) {
            res.send({
                success: true,
                message: "success",
                data: data[0]
            })
        } else {
            res.send({
                success: false,
                message: "Somthing went error",
            })
        }
    } catch (error) {
        res.send({
            success: false,
            message: "SERver Error"
        })
    }
}

export const deletePro = async (req: express.Request, res: express.Response) => {
    const { id } = req.body
    try {
        const query1 = " delete from product where id=? "
        const data = await db.query(query1, [id])
        if (data[0]) {
            res.send({
                success: true,
                message: "delete success",
            })
        } else {
            res.send({
                success: false,
                message: "Somthing went error",
            })
        }
    } catch (error) {
        res.send({
            success: false,
            message: "SERver Error"
        })
    }
}

export const proStatus = async (req: express.Request, res: express.Response) => {
    const { status, id } = req.body
    if (status || id) {
        const query1 = " update product set status=? where id=? "
        const data = await db.query(query1, [status, id])
        if (data[0].affectedRows == 0) {
            res.send({
                success: false,
                message: "product dosen not found",
            })
        }else{
            res.send({
                success: true,
                message: "product statuse uodated",
            })
        }
    } else {
        res.send({
            success: false,
            message: "id or status missing",
        })
    }
}