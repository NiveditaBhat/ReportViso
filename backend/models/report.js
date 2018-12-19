const mongoose = require('mongoose');
const mongooseValidator = require('mongoose-unique-validator');
const reportSchema = mongoose.Schema({
  name: {type: String, required: true, unique:true},
  lastModi:{type: Date, required: true},
  fileTyp:{type: String, required: true},
  quality:{type: String, required: true},
  content :[{
    JEID :{type: String, required: true},
    Project :{type: String, required: true},
    Geo_typ :{type: String, required: true},
    x :{type: Number, required: true},
    y :{type: Number, required: true},
    z :{type: Number, required: true},
    curveArray:[],
    Proc_code :{type: String, required: true},
    Norm :{type: String, required: true},
    STPOS1 :{type: Number, required: true},
    STPOS2 :{type: Number, required: true},
    STPOS3 :{type: Number, required: true},
    STPOS4 :{type: Number, required: true}
  }],
  creator: {type:mongoose.Schema.Types.ObjectId,ref:'User', required:true}
});
reportSchema.plugin(mongooseValidator);
module.exports = mongoose.model('Report',reportSchema);
