const handleprofile = (req, res) => {
    const {id} = req.params
    db.select('*').from('users').where({id})
    .then(user => {
        if (user.length){
           res.json(user[0]) 
        }else{
             res.status(400).json('not found bro')
        }
        
    })
    .catch(err => res.status(400).json('error getting user'))
};

module.exports = {
    handleprofile: handleprofile
}