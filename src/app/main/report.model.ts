export class Report {
  id: string;
  name: string;
  lastModi: Date;
  fileTyp: String;
  quality: string;
  content: [{
    JEID: string,
    Project: string,
    Geo_typ: string,
    x: number,
    y: number,
    z: number,
    curveArray,
    Proc_code: string,
    Norm: string,
    STPOS1: number,
    STPOS2: number,
    STPOS3: number,
    STPOS4: number
  }];
  creator: string;

}
