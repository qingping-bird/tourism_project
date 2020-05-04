export function checkInputIsEmpty(changeValue,changeItem){ //判断输入框是否为空
        if(changeValue.length===0){
            this.setState(state => ({
                [changeItem]:true
          }));
          return false;
        }
        else{
            this.setState(state => ({
                [changeItem]:false
          }));
          return true;
        }
}

export function checkPhone(changeValue,changeItem){ //判断手机号
    if(!(/^1[3456789]\d{9}$/.test(changeValue))){
        this.setState(state => ({
            [changeItem]:true
      }));
      return false;
    }
    else{
        this.setState(state => ({
            [changeItem]:false
      }));
      return true;
    }
}

export function checkCode(value1,value2,changeItem){ //值相等
    if(value1===value2){
        this.setState(state => ({
            [changeItem]:false
      }));
      return true;
    }
    else{
        this.setState(state => ({
            [changeItem]:true
      }));
      return false;
    }
}