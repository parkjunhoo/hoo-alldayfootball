const Setting = require('../../../models/setting')
const jwt = require('jsonwebtoken')

exports.edit = (req, res) => {
    const {id , topicTab} = req.body
    const token = req.session.token;
    if(!token) {
        return res.send('not_logged')
    }
    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )

    const onError = (error) => {
        res.status(403).json({
            success: false,
            message: error.message
        })
    }

    p.then((decoded)=>{
        if(decoded.admin)
        {
            Setting.findOneAndUpdate({_id:id,},{$set:{topicTab:topicTab}})
            .then(()=>{
                res.send('updated');
            })
        }
        else res.send('not_admin')
    }).catch(onError)


    // Board.findOneAndUpdate({_id:id,},{$set:{title:title,contents:contents}})
    // .then(()=>{
    //     res.send('updated');
    // })
}

exports.find = (req, res) => {
    Setting.find(function(err, setting){
        if(err) return res.send(err);
        res.json(setting);
    })
}
