const Post = require('../model/post');
const User = require('../model/User');


exports.loadNotifications = async (req,res) => {
    try{
        const notific= await User.find({_id:req.body._id},{notifications:1});
        // var xx=[];
      
        // console.log("Notifications loaded ");
        // for(i in notific[0].notifications){
        //    // i=0 & i=1 weddin dala thiyen data wala awlk nisa if eka demme
        //     if(i == 0 || i==1){

        //     }else{
        //         xx.push(await Post.find({_id:notific[0].notifications[i]._id}))
             
        //         console.log(xx)
        //     }
          
        // }
        console.log("Notifications loaded ");
        res.json(notific);
    }catch(err){
        console.log("err loadNotifications:"+err);
        res.status(400).send(err);
    }

};