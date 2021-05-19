import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RequestMethods } from './request-methods';

import { LoggerService } from './../logger/logger.service';

import { environment } from '@app/env';
import { ApiResponseModel } from '../api/index.d';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient, private logger: LoggerService) {
    logger.log('HttpProvider Init OK');
  }
  /**
   * 发起一个get请求
   * @param url //
   * @param paramMap //
   * @param header //
   */
  get(url: string, paramMap: {} = {}, header: {} = {}): Observable<ApiResponseModel> {
    return this.sendRequest(url, paramMap, RequestMethods.GET, header);
  }

  /**
   * 发起一个post请求
   * @param url //
   * @param paramMap //
   * @param header //
   */
  post(url: string, paramMap: {} = {}, header: {} = {}, body: any): Observable<ApiResponseModel> {
    return this.sendRequest(url, paramMap, RequestMethods.POST, header, body);
  }

  /**
   * 发起一个delete请求
   * @param url //
   * @param paramMap //
   * @param header //
   */
  delete(url: string, paramMap: {} = {}, header: {} = {}): Observable<ApiResponseModel> {
    return this.sendRequest(url, paramMap, RequestMethods.DELETE, header);
  }

  /**
   * 发起一个put请求
   * @param url //
   * @param paramMap //
   * @param header //
   */
   put(url: string, paramMap: {} = {}, header: {} = {}, body?: any): Observable<ApiResponseModel> {
    return this.sendRequest(url, paramMap, RequestMethods.PUT, header, body);
  }

  /**
   * 发起一个options请求
   * @param url //
   * @param paramMap //
   * @param header //
   */
  options(url: string, paramMap: {} = {}, header: {} = {}): Observable<ApiResponseModel> {
    return this.sendRequest(url, paramMap, RequestMethods.OPTIONS, header);
  }

  /**
   * 发起一个trace请求
   * @param url //
   * @param paramMap //
   * @param header //
   */
  trace(url: string, paramMap: {} = {}, header: {} = {}): Observable<ApiResponseModel> {
    return this.sendRequest(url, paramMap, RequestMethods.TRACE, header);
  }

  /**
   * 发起一个head请求
   * @param url //
   * @param paramMap //
   * @param header //
   */
  HEAD(url: string, paramMap: {} = {}, header: {} = {}): Observable<ApiResponseModel> {
    return this.sendRequest(url, paramMap, RequestMethods.HEAD, header);
  }

  /**
   * 发起一个patch请求
   * @param url //
   * @param paramMap //
   * @param header //
   */
  patch(url: string, paramMap: {} = {}, header: {} = {}): Observable<ApiResponseModel> {
    return this.sendRequest(url, paramMap, RequestMethods.PATCH, header);
  }

  /**
   * 通用的请求方法，通过传入RequestMethods不同以发起不用类型的请求。
   * 默认发起一个Get请求
   * @param url 必传参数
   * @param paramMap 默认为空
   * @param method 默认GET
   */
  request(url: string, paramMap: {} = {}, method: RequestMethods = RequestMethods.GET, header: {} = {}): Observable<object> {
    return this.sendRequest(url, paramMap, method, header);
  }


  protected sendRequest(
    url: string,
    paramMap: any = {},
    method: RequestMethods = RequestMethods.GET,
    header: any = {},
    body?: any): Observable<ApiResponseModel> {
    if (url.includes('http://') || url.includes('https://') || header?.isLocal) {
      this.logger.log('其他请求地址');
    } else {
      url = environment.API_URL + url;
    }
    this.logger.log('准备发起请求:');
    this.logger.log('请求路径:', url);
    this.logger.log('请求参数:', JSON.stringify(paramMap));
    this.logger.log('请求方法:', method);
    this.logger.log('请求头:', JSON.stringify(header));
    return new Observable((observer: { next: (arg0: any) => void; error: (arg0: any) => void; }) => {
      // console.log(method, url, {params: paramMap, headers: header});
      // console.log(1);
      // console.log(this.httpClient.request(method, url, {params: paramMap, headers: header}));
      // console.log(this.httpClient);
      this.httpClient
      .request(method, url, {params: paramMap, headers: header, body})
      .subscribe(
        (res: any) => {
          observer.next(res);
        },
        (err: any) => {
          observer.error(err);
        }
      );
      //   err => {
      //     console.log(err);
      //   }
      // );
    });
  }
}
