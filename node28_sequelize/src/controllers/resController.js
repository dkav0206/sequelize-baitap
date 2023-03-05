const { Sequelize } = require('sequelize');
const { successCode, failCode, errorCode, successCodeAdd} = require('../config/response');

const initModels = require('../models/init-models');
const sequelize = require('../models/index');
const model = initModels(sequelize);

const Op = Sequelize.Op;

const getLike = async(req,res) => { 
    try{
        let {res_id} = req.params;

        let checkLike = await model.like_res.findOne({
            where:{
                res_id
            }
        })

        let data = await model.restaurant.findOne({
            where: {
                res_id
            },
            include:['user_id_users']
        });

        if (checkLike){
            successCode(res, data, "Lấy dữ liệu thành công");
        } else if (!checkLike && data) {
            successCodeAdd(res, data, "Lấy dữ liệu thành công", "Nhà hàng chưa có like nào");
        } else if (!data){
            failCode(res, "", "Không tìm thấy nhà hàng");
        }



    }catch(err){
        errorCode(res, "Lỗi BE");
    }
}

const getRate = async(req,res) => { 
    try{
        let {res_id} = req.params;

        let checkRate = await model.rate_res.findOne({
            where:{
                res_id
            }
        })

        let data = await model.restaurant.findOne({
            where: {
                res_id
            },
            include:['user_id_user_rate_res']
        });

        if (checkRate){
            successCode(res, data, "Lấy dữ liệu thành công");
        } else if (!checkRate && data) {
            successCodeAdd(res, data, "Lấy dữ liệu thành công", "Nhà hàng chưa có đánh giá nào");
        } else if (!data){
            failCode(res, "", "Không tìm thấy nhà hàng");
        }
    }catch(err){
        console.log(err)
        errorCode(res, "Lỗi BE");
    }
}

module.exports = {
    getLike,
    getRate
}