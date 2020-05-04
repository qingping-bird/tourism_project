export function setNewCookie(userName,password){
    document.cookie ="userName="+userName+"; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
    document.cookie ="password="+password+"; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
}

export function deleteCookie(){
    document.cookie="userName=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie="password=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

export function readCookie(itemName){
    let str = document.cookie.split(";");
    let items={};
    for(let i=0;i<str.length;i++){
        let tem=str[i].split("=");
        let nm=tem[0].replace(/^\s+/,''); //正则去掉空格
        items[nm]=tem[1];
    }
    if(items[[itemName]]){
        return items[[itemName]];
    }
    return 0;
}