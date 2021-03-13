/**
 * @param {boolean} eyeCareMode 是否护眼模式
 * @param {number} id 索引
 */
interface settingsConfig {
  id?: number;
  eyeCareMode?: boolean;
  [propsName: string]: any;
}
