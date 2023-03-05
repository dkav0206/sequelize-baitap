// const User = require('../models/user');
const { Sequelize } = require('sequelize');
const { successCode, failCode, errorCode, successCodeAdd } = require('../config/response');

const initModels = require('../models/init-models');
const sequelize = require('../models/index');
const model = initModels(sequelize);

const Op = Sequelize.Op;

const likeRes = async (req,res) => { 
    try{
        let {user_id} = req.params; 
        let {res_id} = req.body; 

        let modelUser = { 
            user_id,
            res_id, 
            date_like: Date.now()
        }

        let checkLike = await model.like_res.findOne({
            where: {
                user_id,
                res_id
            }
        })
        
        if (checkLike){
            failCode(res, "", "Bạn đã like");
        } else{
            await model.like_res.create(modelUser);
            successCode(res, modelUser, "Like thành công");
        }

    }catch(err){
        errorCode(res, "Lỗi BE");
    }
}

const unlikeRes = async (req, res) => { 
    try{
        let {user_id} = req.params;
        let {res_id} = req.body; 
    
        let modelUser = { 
            user_id,
            res_id
        }
    
        let checkUnlike = await model.like_res.findOne({
            where: {
                user_id,
                res_id
            }
        })
    
        if(checkUnlike){
            await model.like_res.destroy({
                where:{
                    user_id,
                    res_id
                }
                
            });
            successCode(res, modelUser, "Unlike thành công");
    
        }else{ 
            failCode(res, "", "Like đi rồi mới unlike được =)");
        }
    }catch(err){
        console.log(err);
        errorCode(res, "Lỗi BE");
    }

}

const getLike = async(req,res) => {
    try{
        let {user_id} = req.params;

        let checkLike = await model.like_res.findOne({
            where:{
                user_id
            }
        })


        let data = await model.user.findAll({
            where: {
                user_id
            },
            include:['res_id_restaurants']
        });

        if (checkLike){
            successCode(res, data, "Lấy dữ liệu thành công");
        } else if(!checkLike && data) {
            successCodeAdd(res, data, "Lấy dữ liệu thành công", "User chưa like nhà hàng nào");
        } else if (!data){
            failCode(res, "", "Không tìm thấy user");
        }

    }catch(err){
        errorCode(res, "Lỗi BE");
    }
}

const rateRes = async(req,res) => { 
    try{
        let {user_id} = req.params; 
        let {res_id, amount} = req.body; 

        let modelUser = { 
            user_id,
            res_id, 
            amount,
            date_rate: Date.now()
        }


        if(modelUser.amount >= 0 && modelUser.amount <= 5){                
            await model.rate_res.create(modelUser);
            successCode(res, modelUser, "Rate thành công");
        } else { 
            
            failCode(res, modelUser, "Số sao đánh giá phải từ 0 đến 5");
        }
        

    }catch(err){
        errorCode(res, "Lỗi BE");
    }

}

const getRate = async(req,res) => {
    try{
        let {user_id} = req.params;

        let checkRate = await model.rate_res.findOne({
            where:{
                user_id
            }
        })

        let data = await model.user.findOne({
            where: {
                user_id
            },
            include:['res_id_restaurant_rate_res']
        });

        if (checkRate){
            successCode(res, data, "Lấy dữ liệu thành công");
        } else if(!checkRate && data) {
            successCodeAdd(res, data, "Lấy dữ liệu thành công", "User chưa đánh giá nhà hàng nào");
        } else if (!data){
            failCode(res, "", "Không tìm thấy user");
        }

    }catch(err){
        errorCode(res, "Lỗi BE");
    }
}

const order = async(req,res) => {
    try{
        let {user_id} = req.params;
        let {food_id, amount, code, arr_sub_id} = req.body;

        let modelUser = { 
            user_id, 
            food_id,
            amount, 
            code, 
            arr_sub_id
        }

        await model.order.create(modelUser);
        successCode(res, modelUser, "Order thành công");
    }catch (err){
        console.log(err);
        errorCode(res, "Lỗi BE");
    }


}

// CTRL C + CTRL V
module.exports = {
    likeRes,
    unlikeRes,
    getLike,
    rateRes,
    getRate,
    order
}