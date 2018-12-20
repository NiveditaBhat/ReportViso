var fs = require('fs');
var writeStream = fs.createWriteStream('masterReport3.csv');


let header = 'JEID,Project,Geo_typ,Proc_code,Norm,x,y,z,curveArray,STPOS1,STPOS2,STPOS3,STPOS4\n';

let project = ['car','pkw','van'];
let geo_typ = ['point'];
let proc_code=['21','23','71','66'];
let norm_dir = ['+x','+y','-x','-y','+z','-z'];
let STPOS = ['-14','1','2','3'];



function getMax(arr, prop) {
    var max;
    for (var i=0 ; i<arr.length ; i++) {
        if (!max || parseInt(arr[i][prop]) > parseInt(max))
            max = arr[i][prop];
    }
    return max;
}
//dataArray.push(header);
writeStream.write(header);
let min = Math.ceil(1);
  let max = Math.floor(500);
for(i=0;i<100;i++) {
let row = '';

let JEID = 'JE' + Math.floor(1000 + Math.random() * 9000);
  let randomProj = project[Math.floor(Math.random()*project.length)];
  let randomGeo ;

randomGeo = 'point'

  let randomProc = proc_code[Math.floor(Math.random()*proc_code.length)];
  let randomNorm = norm_dir[Math.floor(Math.random()*norm_dir.length)];


  let randomX =  Math.floor(Math.random() * (max - min + 1)) + min;
  let randomY =  Math.floor(Math.random() * (max - min + 1)) + min;
  let randomZ =  Math.floor(Math.random() * (max - min + 1)) + min;
  let curveArray = '[';
if(randomGeo == 'curve') {

/*  let r = [30,80,60,100,150,350];

let c_x;
let c_y;
let cArr = [];
//let angle = Math.random() * 2 * Math.PI;
//let radius = r[Math.floor(r.length * Math.random())];

//let pt_radius_sqr = Math.random() * radius * radius;
for(let j=0;j<=3;j++) {
randomX =  Math.floor(Math.random() * (max - min + 1)) + min;
randomY =  Math.floor(Math.random() * (max - min + 1)) + min;

   c_x = randomX  ;
  c_y = randomY  ;
cArr[j] = {'x':c_x,'y':c_y};

  curveArray = curveArray +  '{"x":'+ Math.round(c_x * 100)/100 + ' "y":'+ Math.round(c_y * 100)/100+'} ';
 //curveArray[j][x]= Math.cos(angle)*radius;
 //curveArray[j][y]= Math.sin(angle)*radius;
}
//console.log(cArr);
//var maxX = getMax(cArr, "x");

randomX = Math.round(c_x  * 100)/100;
//var maxY= getMax(cArr, "y");
randomY = Math.round(c_y * 100)/100;
*/
}
curveArray = curveArray.replace(/\s+$/, "");
curveArray = curveArray+']';

  let STPOS1 = STPOS[Math.floor(Math.random()*STPOS.length)];
  let STPOS2;
  if(STPOS1 == '1' || STPOS1 == '2'  || STPOS1 == '3')
  {
STPOS2 = '2';
  }
  else
  {
     STPOS2 = STPOS[Math.floor(Math.random()*STPOS.length)];
  }

  let STPOS3 = STPOS[Math.floor(Math.random()*STPOS.length)];
  let STPOS4 = STPOS[Math.floor(Math.random()*STPOS.length)];
row = JEID+','+randomProj+','+randomGeo+','+randomProc+','+randomNorm+','+randomX+','+randomY+','+randomZ+','+curveArray+','+STPOS1+','+STPOS2+','+STPOS3+','+STPOS4;
row = row + '\n';

writeStream.write(row);
 // dataArray.push(randomProj+','+randomGeo);
}

writeStream.end();
