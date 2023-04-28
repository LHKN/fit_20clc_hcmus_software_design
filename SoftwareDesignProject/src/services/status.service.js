const Status = require('../models/order_status.model');

const statusService = {
    getStatusName: (status) =>{
        return new Promise(async (resolve, reject) => {
            try {
                const order = await Status.findOne({
                    where: {
                         id: status
                        },
                    raw: true
                })
                resolve(order);
            }
            catch (err) {
                return reject(err);
            }
        })
    }
}

module.exports = statusService;