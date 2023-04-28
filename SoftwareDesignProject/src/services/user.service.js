const User = require('../models/user.model');
const db = require('../config/database');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const userService = {
    getAllUsers: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const users = await User.findAll({ raw: true });
                return resolve(users);
            } catch (error) {
                return reject(error);
            }
        })
    },

    getUserById: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({
                    where: {
                        id: id
                    },
                    raw: true
                });
                return resolve(user);
            } catch (error) {
                return reject(error);
            }
        })
    },

    updateUserById: (id, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await User.update(data, {
                    where: {
                        id: id
                    }
                });
                return resolve(result);
            } catch (error) {
                return reject(error);
            }
        })
    },
    findUser: (email, pass) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({ where: { email: email }, raw: true });
                if (_.isEmpty(user)) {
                    return reject(Error('Wrong email or password'));
                }
                bcrypt.compare(pass, user.password)
                    .then((result) => {
                        if (!result) {
                            return reject(Error('Wrong email or password'));
                        }
                        return resolve(user);
                    })
                    .catch((err) => {
                        return reject(err);
                    });

            } catch (error) {
                return reject(error);
            }
        })
    },

    checkIfExists: (email) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({
                    where: {
                        email: {
                            $eq: email
                        }
                    },
                    raw: true
                });
                return resolve(user);
            } catch (error) {
                return reject(error)
            }
        })
    },
    createNewUser: (hashID, newName, newEmail, newPass, newDob, newPhone) => {
        return new Promise(async (resolve, reject) => {
            try {
                const d = new Date();
                const user = await User.create({
                    id: hashID,
                    name: newName,
                    isConfirmed: false,
                    dob: newDob,
                    phone: newPhone,
                    isAdmin: false,
                    password: newPass,
                    email: newEmail,
                    avatarUrl: "https://seud.org/wp-content/uploads/2020/06/avatar-nobody.png",
                    createAt: d,
                    updateAt: null
                });
                return resolve(user);
            } catch (error) {
                return reject(error)
            }
        })
    },
    findUserById: (id) =>{
        return new Promise(async (resolve, reject) => {
            try{
                const user = await User.findOne({
                    where:{
                        id:{
                            $eq:id
                        }
                    },
                    raw:true
                });
                return resolve(user);
            } catch(error){
                return reject(error)
            }
        })
    }
}

module.exports = userService;