var fs = require('fs');
var writeStream = fs.createWriteStream('masterReport3.csv');


let header = 'JEID,Project,Geo_typ,Proc_code,Norm,x,y,z,STPOS1,STPOS2,STPOS3,STPOS4\n';

let project = ['car','pkw','van'];
let geo_typ = ['point','curve','pattern'];
let proc_code=['21','23','71','66'];
let norm_dir = ['+x','+y','-x','-y','+z','-z'];
let STPOS = ['-1','-11','-7','-14','-21','1'];

//dataArray.push(header);
writeStream.write(header);
let min = Math.ceil(1);
  let max = Math.floor(500);
for(i=0;i<50;i++) {
let row = '';

let JEID = 'JE' + Math.floor(1000 + Math.random() * 9000);
  let randomProj = project[Math.floor(Math.random()*project.length)];
  let randomGeo = geo_typ[Math.floor(Math.random()*geo_typ.length)];
  let randomProc = proc_code[Math.floor(Math.random()*proc_code.length)];
  let randomNorm = norm_dir[Math.floor(Math.random()*norm_dir.length)];


  let randomX =  Math.floor(Math.random() * (max - min + 1)) + min;
  let randomY =  Math.floor(Math.random() * (max - min + 1)) + min;
  let randomZ =  Math.floor(Math.random() * (max - min + 1)) + min;
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
row = JEID+','+randomProj+','+randomGeo+','+randomProc+','+randomNorm+','+randomX+','+randomY+','+randomZ+','+STPOS1+','+STPOS2+','+STPOS3+','+STPOS4;
row = row + '\n';

writeStream.write(row);
 // dataArray.push(randomProj+','+randomGeo);
}

writeStream.end();
