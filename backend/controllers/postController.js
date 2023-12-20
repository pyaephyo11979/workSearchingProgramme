const Post=require('../models/postModel');
const User=require('../models/userModel');
const getPosts=async(req,res)=>{
    try{
        const posts=await Post.find();
        if(!posts){
            return res.status(400).json({message:"No posts found"});
        }
        res.status(200).json({posts});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}
const getPost=async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(!post){
            return res.status(400).json({message:"No post found"});
        }
        res.status(200).json({post});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}
const createPost=async(req,res)=>{
    try {
        const {uid}=req.body;
        const user=await User.findById(uid);
        if(!user){
            return res.status(400).json({message:"No user found"});
        }else{
            const name=user.name;
            const post=new Post({
                title:req.body.title,
                description:req.body.description,
                requirements:req.body.requirements,
                postedBy:{
                    id:uid,
                    name:name
                }
            })
            await post.save();
            res.status(200).json({message:"Post created successfully",post});
        }
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
const updatePost=async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(!post){
            return res.status(400).json({message:"No post found"});
        }
        const updatePost=await Post.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json({message:"Post updated successfully"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}
const deletePost=async(req,res)=>{
    try {
        const {id}=req.params
        const post=await Post.findById(id);
        if(!post){
            return res.status(400).json({message:"No post found"});
        }
        await Post.findByIdAndDelete(id);
        res.status(200).json({message:"Post deleted successfully"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
const applyJob=async(req,res)=>{
    try {
        const {pid}=req.params
        const {uid}=req.body;
        const user=await User.findById(uid);
        const post=await Post.findById(pid);
        if(!user){
            return res.status(400).json({message:"No user found"});
        }
        const applicant={
            id:uid,
            name:user.name
        }
        post.applicants.push(applicant);
        await post.save();
        res.status(200).json({message:"Applied successfully"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
const getApplicants=async(req,res)=>{
    try{
        const {pid}=req.params
        const post=await Post.findById(pid);
        if(!post){
            return res.status(400).json({message:"No post found"});
        }
        res.status(200).json({applicants:post.applicants});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}
module.exports={
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    applyJob,
    getApplicants
}