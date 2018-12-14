export class Report {
  id: string;
  name: string;
  lastModi: Date;
  fileTyp: String;
  content: [{
    JEID: string,
    Project: string,
    Geo_typ: string,
    x: number,
    y: number,
    z: number,
    Proc_code: string,
    Norm: string,
    STPOS1: number,
    STPOS2: number,
    STPOS3: number,
    STPOS4: number
  }];
  creator: string;

}
