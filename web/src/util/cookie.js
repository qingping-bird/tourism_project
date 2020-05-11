export function setNewCookie(userName,password,id,re){
    let rem=re?"; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/":''
    document.cookie ="userName="+userName+rem;
    document.cookie ="password="+password+rem;
    document.cookie ="id="+id+rem;
}

export function deleteCookie(){
    document.cookie="userName=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie="password=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie="id=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
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