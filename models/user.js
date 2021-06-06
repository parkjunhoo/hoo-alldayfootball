  
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto')
const config = require('../config')


const Users = new Schema({
    id: {
        type : String,
        required : true
    },
    password:{
        type: String,
        required : true
    },
    admin: {
        type: Boolean, 
        default: false,
    },
    regTime:{
        type: Date,
        default: Date.now
    },
},{
    versionKey: false 
}
);

Users.statics.create = function(id, password) {
    const encrypted = crypto.createHmac('sha1', config.secret)
                      .update(password)
                      .digest('base64')

    const user = new this({
        id,
        password: encrypted
    })

    return user.save()
}

Users.statics.findOneById = function(id) {
    return this.findOne({
        id
    }).exec()
}


Users.methods.verify = function(password) {
    const encrypted = crypto.createHmac('sha1', config.secret)
                      .update(password)
                      .digest('base64')

    return this.password === encrypted
}

Users.methods.assignAdmin = function() {
    this.admin = true
    return this.save()
}

module.exports = mongoose.model('Users', Users)