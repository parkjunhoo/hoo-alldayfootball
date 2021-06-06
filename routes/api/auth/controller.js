const jwt = require('jsonwebtoken')
const User = require('../../../models/user')


exports.register = (req, res) => {
    const { id, password } = req.body
    let newUser = null

    const create = (user) => {
        if(user) {
            res.send("id_exists");
        } else {
            return User.create(id, password)
        }
    }

    const count = (user) => {
        newUser = user
        return User.count({}).exec()
    }

    const assign = (count) => {
        if(count === 1) {
            return newUser.assignAdmin()
        } else {
            return Promise.resolve(false)
        }
    }

    const respond = (isAdmin) => {
        res.json({
            message: 'registered',
            admin: isAdmin ? true : false
        })
    }

    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    User.findOneById(id)
    .then(create)
    .then(count)
    .then(assign)
    .then(respond)
    .catch(onError)
}

exports.login = (req, res) => {
    const {id, password} = req.body
    const secret = req.app.get('jwt-secret')

    const check = (user) => {
        const token = req.session.token;
        if(token) {
            return res.send('already_logged_in');
        }
        if(!user) {
            return res.send('not_user');
        } else {
            if(user.verify(password)) {
                const p = new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            _id: user._id,
                            id: user.id,
                            admin: user.admin
                        }, 
                        secret, 
                        {
                            expiresIn: '7d',
                            // issuer: 'allground.net',
                            subject: 'userInfo'
                        }, (err, token) => {
                            if (err) reject(err)
                            resolve(token) 
                        })
                })
                return p
            } else {
                return res.send('not_password');
            }
        }
    }

    const respond = (token) => {
        req.session.token = token;
        console.log(req.session);
        res.send('logged_in')
    }

    const onError = (error) => {
        res.status(403).json({
            message: error.message
        })
    }

    User.findOneById(id)
    .then(check)
    .then(respond)
    .catch(onError)

}

exports.check = (req, res) => {
    res.json({
        success: true,
        info: req.decoded
    })
}

exports.logout = (req, res) => {
    if(req.session){
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send('logged_out');
            }
        })
    }
    else{
        res.send('not_logged');
    }

}