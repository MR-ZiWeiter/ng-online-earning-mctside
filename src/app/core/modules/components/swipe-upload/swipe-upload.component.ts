import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { SystemService } from 'src/app/core/services/system/system.service';
import { Component, OnInit , Input, OnDestroy, forwardRef} from '@angular/core';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { IAliossConfigModel } from 'src/app/core/model';
import { environment } from '@app/env';
@Component({
  selector: 'swipe-upload',
  templateUrl: './swipe-upload.component.html',
  styleUrls: ['./swipe-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwipeUploadComponent),
      multi: true
    }
  ]
})
export class SwipeUploadComponent implements OnInit, OnDestroy, ControlValueAccessor {

  private ossConfig: IAliossConfigModel = {
    dir: 'mctside/',
    expire: null,
    accessKeyId: null,
    secretKeyId: null,
    securityToken: null
  }

  // tslint:disable-next-line:member-ordering
  public fileList: NzUploadFile[] = [];
  // tslint:disable-next-line:member-ordering
  public previewImage: string | undefined = '';
  public previewVisible = false;

  public value!: any;
  public disabled: boolean = false;
  valueChange: any = () => {};
  valueTouch: any = () => {};

  /* 获取alioss配置监听 */
  private aliossObserver: any;

  @Input() public ListType: 'text' | 'picture' | 'picture-card' = 'picture-card';
  // @Input() public Action = 'http://ll-wangzhuan.oss-cn-shenzhen.aliyuncs.com';
  @Input() public Action = environment.API_URL + '/upload/file';
  @Input() public maxFileListLength = 1;
  @Input() public coustom = false;
  @Input() public isVideo: boolean = false;
  @Input() public isPreview: boolean = false;

  constructor(
    private systemService: SystemService
  ) {
    this.aliossObserver = this.systemService.getAliossConfig().subscribe(renderInfo => {
      // console.log(renderInfo)
      if (renderInfo) {
        this.ossConfig = Object.assign({}, this.ossConfig, renderInfo);
      }
    })
  }
  writeValue(obj: any): void {
    this.value = obj;
    /* 处理传入数据 */
    this.handlerInputFilesChange(obj);
  }
  registerOnChange(fn: any): void {
    this.valueChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.valueTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit() {
  }

  /* 处理初始化数据后的数据同步 */
  private handlerInputFilesChange(fileInfo: Array<string>|string) {
    /* 当数据制空时 */
    if (!fileInfo) {
      this.fileList = [];
    }
    /* 处理是数组时 */
    if (fileInfo instanceof Array) {
      this.fileList = fileInfo.map((item: string) => {
        return {
          uid: `-${Math.random() * 1000000 | 0}`,
          name: item.slice(item.lastIndexOf('/')).substr(1),
          status: 'done',
          url: item
        }
      })
    } else {
      if (fileInfo) {
        this.fileList = [{
          uid: `-${Math.random() * 1000000 | 0}`,
          name: fileInfo.slice(fileInfo.lastIndexOf('/')).substr(1),
          status: 'done',
          url: fileInfo
        }]
      }
    }
  }

  /* 处理上传前文件类型名字等 */
  public transformFile = (file: NzUploadFile) => {
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    file.url = this.ossConfig.dir + filename;
    return file;
  };

  /* 处理拓展数据 */
  public getExtraData = (file: NzUploadFile) => {
    const { accessKeyId, secretKeyId, securityToken } = this.ossConfig;
    return {
      key: file.url,
      OSSAccessKeyId: accessKeyId,
      policy: secretKeyId,
      Signature: securityToken,
      noHeader: true
    };
  };

  public handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      // tslint:disable-next-line:no-non-null-assertion
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  public handleDownload = async (file: NzUploadFile) => {
    window.open(file.url, '_target');
  }

  /* 上传成功后回调 */
  public onChange(e: NzUploadChangeParam): void {
    console.log('Aliyun OSS:', e.fileList);
    if (e.fileList && this.maxFileListLength > 1) {
      const urlList: string[] = [];
      e.fileList.filter(fs => fs.status === 'done').map((item: any) => {
        urlList.push(item.url || item.response.rel.url);
        item.url = item.url || item.response.rel.url;
      })
      this.valueChange(urlList);
    } else if (e.fileList && this.maxFileListLength === 1) {
      let urlString: any;
      e.fileList.filter(fs => fs.status === 'done').map((item: any) => {
        urlString = item.url || item.response.rel.url;
        item.url = item.url || item.response.rel.url
      })
      this.valueChange(urlString);
    }
    this.fileList = e.fileList;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.aliossObserver.unsubscribe()
  }
}


function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


