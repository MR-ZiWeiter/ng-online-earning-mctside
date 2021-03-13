import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root'
})

export class ApiSystemService {
  constructor(
    private http: HttpService
  ) {}

  // 上传文件
  asyncFetchSystemUpLoadFile(info: any = {}): Observable<any> {
    return new Observable((observer: { next: (arg0: any) => void; error: (arg0: boolean) => void; }) => {
      this.http.post('/service/app/upload/uploadFile', {noHeader: true}, {}, info).subscribe((res: any) => {
        // console.log(res);
        observer.next(res);
      }, (err: any) => {
        observer.error(false);
      });
    });
  }
}
