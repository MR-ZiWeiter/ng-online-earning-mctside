import { Component, OnInit , Input} from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
@Component({
  selector: 'swipe-swipe-upload',
  templateUrl: './swipe-upload.component.html',
  styleUrls: ['./swipe-upload.component.scss']
})
export class SwipeUploadComponent implements OnInit {
  @Input() public ListType: 'text' | 'picture' | 'picture-card' = 'picture-card';
  @Input() public Action = 'https://www.mocky.io/v2/5cc8019d300000980a055e76';
  @Input() public maxFileListLength = 2;
  @Input() public coustom = false;
  constructor() { }

  // tslint:disable-next-line:member-ordering
  public fileList: NzUploadFile[] = [
  ];
  // tslint:disable-next-line:member-ordering
  public previewImage: string | undefined = '';
  public previewVisible = false;

  ngOnInit() {
  }

  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      // tslint:disable-next-line:no-non-null-assertion
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

}


function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}