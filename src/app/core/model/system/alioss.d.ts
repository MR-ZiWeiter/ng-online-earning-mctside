/**
 * 阿里OSS上传服务凭证数据模型
 *
 * @export
 * @interface IAliossConfigModel
 */
export interface IAliossConfigModel {
  /**
   * @param {expire} Number 过期时间 毫秒
   */
  expire: number | null;
  accessKeyId: string | null;
  secretKeyId: string | null;
  securityToken: string | null;
  [x: string]: any;
}
