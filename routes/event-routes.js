const express= require("express")
const router= express.Router()


router.get('/Home',(req,res)=>{
res.send('Home')})


module.exports = router 