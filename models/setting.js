const mongoose  = require('mongoose');
const Schema = mongoose.Schema;


const Settings = new Schema({
    topicTab: {
        type : Array,
        required : true
    },
},{
    versionKey: false 
}
);

module.exports = mongoose.model('Settings', Settings)