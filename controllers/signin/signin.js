const handlesignin = (req,res,db,bcrypt) => {
    const salt = 10;
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json('incorrect form submition')
    }
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        if (data.length === 0) {
            return res.status(400).json('wrong credentials');
        }
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if (isValid) {
            return db.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
                if (user.length) {
                    res.json(user[0]);
                } else {
                    res.status(400).json('user not found');
                }
            })
            .catch(err => {
                console.error(err);
                res.status(400).json('error retrieving user');
            });
        } else {
            res.status(400).json('wrong credentials');
        }
    })
    .catch(err => {
        console.error(err);
        res.status(400).json('wrong credentials');
    });
};

module.exports = {
    handlesignin: handlesignin
}