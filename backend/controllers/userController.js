const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const register = async (req, res) => {
    try {
        const {name,email,role,phone,gender,password} = req.body;
        const hashedPassword=await bcrypt.hash(password, 10);
        let emptyFields=[];
        if(!name){
            emptyFields.push('name')
        }
        if(!email){
            emptyFields.push('email')
        }
        if(!role){
            emptyFields.push('role')
        }
        if(!phone){
            emptyFields.push('phone')
        }
        if(!gender){
            emptyFields.push('gender')
        }
        if(!password){
            emptyFields.push('password')
        }
        if(emptyFields.length>0){
            return res.status(400).json({error:'Please fill in all the fields',emptyFields})
        }
        const user=new User({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword,
            role:req.body.role,
            phone:req.body.phone,
            gender:req.body.gender
        })
        await user.save();
        if(!user){
            return res.status(400).json({message:"Something went wrong"})
        }
         res.status(200).json({message:"User created successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const login = async (req, res) => {
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({error:"Please fill in all the fields"})
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"User does not exist"})
        }else{
            const isMatch=await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({error:"Invalid credentials"})
            }
            const token=jwt.sign({id:user._id,role:user.role}, process.env.JWT_SECRET, {expiresIn:"1h"});
            res.status(200).json({message:"User logged in successfully",token:token,user:user})
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const getUsers = async (req, res) => {
    try {
        const users=await User.find();
        if(!users){
            return res.status(400).json({message:"No users found"})
        }
        res.status(200).json({users})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const getUser=async(req,res)=>{
    try {
        const {id}=req.params
        const user=await User.findById(id);
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const updateUser=async(req,res)=>{
    try {
        const {id}=req.params
        const user=await User.findByIdAndUpdate(id,req.body);
        if(!user){
            return res.status(400).json({message:"User not found"}) 
        }
        res.status(200).json({message:"User updated successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const changePassword=async(req,res)=>{
    try {
        const {id}=req.params
        const {oldPassword,newPassword}=req.body
        const user=await User.findById(id);
        if(!user){
            return res.status(400).json({message:"User not found"})
        }else{
            const isMatch=await bcrypt.compare(oldPassword, user.password);
            if(!isMatch){
                return res.status(400).json({error:"Invalid credentials"})
            }
            const hashedPassword=await bcrypt.hash(newPassword, 10);
            user.password=hashedPassword
            await user.save();
            res.status(200).json({message:"Password changed successfully"})
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const deleteUser=async(req,res)=>{
    try {
        const {id}=req.params
        const user=await User.findByIdAndDelete(id);
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        res.status(200).json({message:"User deleted successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
module.exports = {
    register,
    login,
    getUsers,
    getUser,
    updateUser,
    changePassword,
    deleteUser
}