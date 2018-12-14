const Report = require('../models/report');

exports.saveReport = (req,res,next)=>{

  const report = new Report({
    name : req.body.name,
    lastModi:req.body.lastModi,
    fileTyp:req.body.fileTyp,
    content: req.body.content,
    creator:req.userData.userId
  });



  report.save().then(result => {

    res.status(201).json({
      message: 'Report Saved',
     id : result._id
  });
  }).catch(error => {
    res.status(500).json({
      message: 'Report Saving Failed'
  });

  });
  }

  exports.fetchReports = (req,res,next)=>{
    let fetchedReports ;

Report.find({creator:req.userData.userId}).then((documents) => {
    fetchedReports = documents;

    res.status(200).json({
      message:'Fetched Reports',
      reports:fetchedReports
    })
  }).catch(error => {
    res.status(500).json({
      message: 'Unable to fetch Reports'
  });
  });
  }

  exports.deleteReports = (req,res,next) => {
let ids;
if(req.params.ids.indexOf(':') == -1)
{
ids = req.params.ids;
}
else
{
  ids =  req.params.ids.split(":");
}



 Report.deleteMany({_id:ids,creator:req.userData.userId}).then(
      result => {
        console.log(result);
        if(result.n > 0)
        {
          res.status(200).json(
            {
              message:'Report Deleted in DB'
            }
          );
        }
        else
        {
          res.status(401).json(
            {
              message:'Report Deletion failed'
            }
          );
        }
      }
    ).catch(error => {
      res.status(500).json({
        message: 'Report deletion failed'
    });
    });
  }

  exports.renameReport = (req, res, next) => {

      const report = {
        _id:req.body.id,
        name : req.body.name,
        lastModi:req.body.lastModi,
        fileTyp:req.body.fileTyp,
        content: req.body.content,
        creator:req.userData.userId
      };




    Report.updateOne({_id:req.params.id,creator:req.userData.userId}, report).then(
  result => {
    if(result.n > 0)
    {
      res.status(200).json({message:'Report Renamed Sucessfully'});
    }
    else
    {
      res.status(401).json({message:'Report Update Failed'});
    }

  }
    ).catch(error => {
      res.status(500).json({
        message: 'Report update failed'
    });
    });
  }

