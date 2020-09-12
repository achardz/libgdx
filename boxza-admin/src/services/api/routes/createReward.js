const express = require('express')
const Http = require('../../http')
const AWS = require('aws-sdk')
const bodyParser = require('body-parser');
const formidable = require('formidable')
const fs = require('fs')

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// boxzacdn	
// RKAU4ATLFXVBBUXG7VR5 Copy	3 hours ago	More 
// Secret	
// UcRFUr6+9fviNE/weyCzYeWV9gRn4mcLLTczsJk6OtU Copy
// Configure client for use with Spaces
const spacesEndpoint = new AWS.Endpoint('sgp1.digitaloceanspaces.com');
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: 'RKAU4ATLFXVBBUXG7VR5',
  secretAccessKey: 'UcRFUr6+9fviNE/weyCzYeWV9gRn4mcLLTczsJk6OtU'
});
const router = express()
router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({ extended: true })); 
// ประเภทกล่อง by id
router.get('/create-reward/box', (req, res) => {
  Http.get('/list/box', { params: req.query })
    .then((response) => {
      res.send({ status: response.status, data: response.data.data })
    })
    .catch((e) => {
      res.status(e.response.status)
      res.send({ status: e.response.status, data: e.response.data })
    })
})

router.get('/create-reward/getall', (req, res) => {
  Http.get('/v1/items', { params: req.query })
    .then((response) => {
      res.send({ status: response.status, data: response.data.data })
    })
    .catch((e) => {
      res.status(e.response.status)
      res.send({ status: e.response.status, data: e.response.data })
    })
})
//
// ส่ง item
router.post('/create-reward/item', (req, res) => {
  Http.post('/v1/items', req.body)
    .then((response) => {
      res.send({ status: response.status, data: response.data })
    })
    .catch((e) => {
      res.status(e.response.status)
      res.send({ status: e.response.status, data: e.response.data })
    })
})

router.post('/create-reward/upload', (req, res) => {
  /**/
  var name = makeid(50);
   new formidable.IncomingForm().parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error', err)
      throw err
    }
    //console.log('Fields', fields)
   // console.log('Files', files)
    for (const file of Object.entries(files)) {
      const fileContent = fs.readFileSync(file[1].path);
      //fs.readFile(file[1].path, 'utf8', function(err, data){ 
        // res.send(fileContent)
        var params = {
          Body: fileContent,
          Bucket: "cdnboxza",
          Key: name+".png",
          ACL:'public-read',
        };
        s3.upload(params, function(err, data) {
          if (err) console.log(err, err.stack);
          else {
            res.send({ data: "https://cdnboxza.sgp1.digitaloceanspaces.com/"+name+".png" })
          }    //console.log(data);
        });
        //console.log(data); 
     // });
    }
  })
  /*fs.readFile('Demo.txt', 'utf8', function(err, data){ 
    console.log(data); 
  }); */
  /*s3.listBuckets({}, function(err, data) {
    if (err) console.log(err, err.stack);
        else {
            data['Buckets'].forEach(function(space) {
            console.log(space);
        })};
  });*/
  // console.log(req.body)

  /*s3.upload(params, function(err, data) {
      if (err) console.log(err, err.stack);
      else     console.log(data);
  });*/
  //console.log(req)
  /*Http.post('/v1/items', req.body)
    .then((response) => {
      res.send({ status: response.status, data: response.data })
    })
    .catch((e) => {
      res.status(e.response.status)
      res.send({ status: e.response.status, data: e.response.data })
    })*/
    name
})


module.exports = router
