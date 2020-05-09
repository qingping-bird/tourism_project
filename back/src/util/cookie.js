export function setNewCookie(phone,id){
    document.cookie ="phone="+phone;
    document.cookie ="id="+id;
}

export function deleteCookie(){
    document.cookie="phone=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
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