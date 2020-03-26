const Post = require('../model/post');
const User = require('../model/User');

// load notifications based on user id
exports.loadNotifications = async (req,res) => {
    try{
        const notific= await User.find({_id:req.body._id},{notifications:1});
        var xx=[];
        var notifi = [];
        
        console.log("Notifications loaded ");
        for(i in notific[0].notifications){
           // i=0 & i=1 weddin dala thiyen data wala awlk nisa if eka demme
            if(i == 0 || i==1){

            }else{
                xx = await Post.find({_id:notific[0].notifications[i]._id})
                var noti={
                    _id: xx[0]._id,
                    user_id:  xx[0].user_id,
                    price: xx[0].price ,
                    match_date: xx[0].match_date ,
                    start_time: xx[0].start_time ,
                    ground_name: xx[0].ground_name ,
                    location:xx[0].location ,
                    lat: xx[0].lat ,
                    lng:xx[0].lng ,
                    contact_no: xx[0].contact_no ,
                    team_size: xx[0].team_size ,
                    entrace_fee:xx[0].entrace_fee ,
                    other_rules: xx[0].other_rules ,
                    attachments: xx[0].attachments ,
                    date: xx[0]. date ,
                    isViewed:notific[0].notifications[i].isViewed
                }
             notifi.push(noti);
                
            }
          
        }
        console.log("Notifications loaded ");
        res.json(notifi);
    }catch(err){
        console.log("err loadNotifications:"+err);
        res.status(400).send(err);
    }

};