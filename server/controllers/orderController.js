import orderModel from "../models/orderModel.js";
import orderSchema from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


const placeOrder = async(req,res) =>{

    const frontend_url = "https://zwigato-five.vercel.app"
    try{
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
        })

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_items = req.body.items.map((item) => ({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name,
                },
                unit_amount:item.price*100
            },

            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"delivery charges"
                },
                unit_amount:2*100
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })

        res.json({success:true,session_url:session.url});
    }

    catch(err) {
        res.json({success:false,message:err});
    }
}
const userOrders = async(req,res)=> {
    try{
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders});
    }

    catch(err){
        res.json({success:false,message:err});
    }
}

const listOrders = async (req,res) => {
    try{
        const orders = await orderModel.find({});
        res.json({success:true,data:orders});
    }

    catch(err) {
        console.log(err);
        res.json({success:false,message:err});
    }
};

const updateStatus = async (req,res) => {
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"status updated"});
    }

    catch(err){
        res.json({success:false,message:"status not updated"});
    }
}


export {placeOrder,userOrders,listOrders,updateStatus};