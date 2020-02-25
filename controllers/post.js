const Post = require('../model/post');


exports.newpost = async (req,res,next) => {
 const newPost = new Post({
    posters_id: req.body.posters_id,
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
    attachments: req.file.path,

 })
 console.log(req.file);
 try {
    await newPost.save();
     console.log("Added new post");
     res.json({success:1})
 }catch(err){
    console.log("err new post:"+err);
    res.status(400).send(err);
 }
}

exports.loadPosts = async (req,res) => {

      const posts= await Post.find() ;
      console.log("loading posts");
      res.json(posts);

        };
    
