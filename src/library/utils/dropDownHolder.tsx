export default class DropDownHolder {
  static dropDown: any;

  static setDropDown(dropDown: any) {
    this.dropDown = dropDown;
  }
  static alert(type: string, title: string, message: string, callBack?: Function) {
    this.dropDown.alertWithType(type, title, message);
    callBack && callBack();
  }
  static showError(title: string, message: string, callBack?: Function) {
    this.dropDown.alertWithType('error', title, message);
    callBack && callBack();
  }
  static showSuccess(title: string, message: string, callBack?: Function) {
    this.dropDown.alertWithType('success', title, message);
    callBack && callBack();
  }
  static showWarning(title: string, message: string, callBack?: Function) {
    this.dropDown.alertWithType('warn', title, message);
    callBack && callBack();
  }
  static showInfo(title: string, message: string, callBack?: Function) {
    this.dropDown.alertWithType('info', title, message);
    callBack && callBack();
  }
}
