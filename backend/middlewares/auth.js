const jwt=require('jsonwebtoken');
function onlyEmployer(req,res,next){
    const [type,token]= req.headers['authorization'].split(' ');
    if( type !== "Bearer") return res.sendStatus(401);
    jwt.verify(token,process.env.SECRET,(err,user)=>{
        if(user.role==="employer") next();
        else res.sendStatus(403);
    })
}
function user(req,res,next){
    const authHeader=req.headers['authorization'];
    if(!authHeader) return res.sendStatus(401);
    const [type,token]= authHeader.split(' ');
    if( type !== "Bearer") return res.sendStatus(401);
    jwt.verify(token,process.env.SECRET,(err,data)=>{
        if(err) return res.sendStatus(403);
        else next();
    })
  }
  module.exports={onlyEmployer,user};