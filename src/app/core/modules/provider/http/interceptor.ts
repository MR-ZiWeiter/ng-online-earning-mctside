import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService } from './../logger/logger.service';
import { catchError, map, tap, mergeMap, retry, retryWhen } from 'rxjs/operators';
import { Observable, throwError, timer, of } from 'rxjs';
import { RequestProcessedHandler } from './handler/request-processed-handler';
import { RequestPreviewHandler } from './handler/request-preview-handler';
import { RequestExceptionHandler } from './handler/request-exception-handler';

// import {Constants} from '../../../common/Constants';

@Injectable()

export class LarkHttpInterceptor implements HttpInterceptor {
  private timeoutMillis;

  constructor(public http: HttpClient,
              public logger: LoggerService,
              private requestProcessedHandler: RequestProcessedHandler,
              private requestPreviewHandler: RequestPreviewHandler,
              private requestExceptionHandler: RequestExceptionHandler) {
    logger.log('Hello InterceptorProvider Provider');
    // Constants.TIMEOUT_MILLS ||
    this.timeoutMillis = 3000;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /**
     * 请求前置处理
     */
    const handleRequest = this.requestPreviewHandler.handle(request);
    return next.handle(handleRequest)
      .pipe(
        map((event: any) => {
          if (event instanceof HttpResponse) {
            /**
             * 请求后置处理
             */
            return this.requestProcessedHandler.handle(event);
          }
          return event;
        }),
        tap(resp => {
          if (resp instanceof HttpErrorResponse) {
            this.requestExceptionHandler.handle(resp);
          }
        }),
        // retry(3),
        catchError((err: any) => {
          throw err;
          // return this.requestExceptionHandler.handle(err);
        })
        // retryWhen((err: Observable<any>) => timer(5000))
      );
  }
}
