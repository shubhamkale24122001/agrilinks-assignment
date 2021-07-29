const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const reportSchema= new Schema({
    cmdtyName:{
        type: String,
        required: true
    },
    cmdtyID:{
        type: String,
        required: true
    },
    marketID:{
        type: String,
        required: true
    },
    marketName:{
        type: String,
        required: true
    },
    users:[{
        type: String,
    }],
    placeUnit:{
        type: String,
        default: "Kg"
    },
    price:{
        type: Number,
        min: 0,
        required: true
    }
}, {
    timestamps: true
});

const Reports= mongoose.model('Report', reportSchema);
module.exports= Reports;