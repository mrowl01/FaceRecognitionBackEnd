const clarifai = require('clarifai');
//const API_KEY = '4c0ecd24d8144368a0ad6cb43f0c4579';
const app = new Clarifai.App({
  apiKey: '4c0ecd24d8144368a0ad6cb43f0c4579'
});
const handleAPICall=(req,res)=> {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data=>{
		res.json(data);
	})
	.catch(err=>res.status(400).json("Unable to work with API"))
}


const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports= {
	handleImage:handleImage,
	handleAPICall:handleAPICall
}