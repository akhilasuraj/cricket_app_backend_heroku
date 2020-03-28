const Post = require('../model/post');
const User = require('../model/User');

// saving new match post
exports.newpost = async (req,res,next) => {
 const newPost = new Post({
   user_id: req.body.user_id,
    price: req.body.price,
    match_date: req.body.match_date,
    start_time: req.body.start_time,
    organizer: req.body.organizer,
    ground_name: req.body.ground_name,
    distric: req.body.distric,
    location: req.body.location,
    lat: req.body.lat,
    lng: req.body.lng,
    contact_no: req.body.contact_no,
    team_size: req.body.team_size,
    entrace_fee: req.body. entrace_fee,
    other_rules: req.body.other_rules,
    attachments: req.file.filename,

 })

 try {
    await newPost.save().then ( async result => {
     await User.updateOne({_id:result.user_id},{$push:{ match_post:result._id}}).then(async reslz =>{
      res.json({success:1})
      console.log("adding post to user array:"+reslz)
      //adding post to users notification array
      await User.updateMany({_id: { $ne: result.user_id}},{$push:{ notifications:{_id:result._id,isViewed:0}}}).then(ress =>{
         console.log("Notification added:"+ress);
      }).catch(err=>{
         console.log('error in notification adding:'+err);
      })
      
      }).catch(err => {
         res.json({"error in adding post to user array":err})
      })
    });
     console.log("Added new post");
    
 }catch(err){
    console.log("err new post:"+err);
    res.status(400).send(err);
 }
}
//load match posts odder by date
exports = async (req,res) => {
      try{loadPostsByDate
      const posts= await Post.find().sort( { match_date: 1 } )
         console.log("loading posts");
         res.json(posts);
        }catch(err){
         console.log("err loadPostsByDate:"+err);
         res.status(400).send(err);
        }
      }

//load match posts odder by price
exports.loadPostsByPrice = async (req,res) => {
   try{
       const posts= await Post.find().sort( { price: -1 } ) ;
       console.log("loading posts");
      res.json(posts);
        }catch(err){
         console.log("err loadPostsByPrice:"+err);
         res.status(400).send(err);
        }
      }
        

    
