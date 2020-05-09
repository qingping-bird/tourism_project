export function handleImg(str){
    let tem=str.split('//')
    return tem[tem.length-1]
}

export function handleTime(str){
    let tem1=str[0].split('-')
    let tem2=str[1].split('-')
    return({
        start_year:tem1[0]-'0',
        end_year:tem2[0]-'0',
        start_month:tem1[1]-'0',
        end_month:tem2[1]-'0',
        start_day:tem1[2]-'0',
        end_day:tem2[2]-'0',
    })
}

export function handleTimeCheck(year,month,day,str){
    let {start_year,end_year,start_month,end_month,start_day,end_day}=handleTime(str)
    if(!checkDay(year,month,day)) return false;
    if(year>start_year&&year<end_year) return true;
    else if(start_year==end_year){
        if(((month*31+day)>=(start_month*31+start_day))&&((month*31+day)<=(end_month*31+end_day))) return true;
        else return false;
    }
    else{
        if(year==start_year){
        if((month*31+day)<(start_month*31+start_day)) return false;
        else return true;
    }
    else{
        if((month*31+day)>(end_month*31+end_day)) return false;
        else return true;
    }
    }
    
    return true
}

export function replaceStr(str){
    let tem=str.replace(/\s+/g,"<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
    return "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+tem;
}

function checkDay(year,month,day){//判断日期合法性
    let isLeapYear=false
    if (((year % 4)==0) && ((year % 100)!=0) || ((year % 400)==0)) { //判断闰年
        isLeapYear=true
    }
    const monthDay=[31,28,31,30,31,30,31,31,30,31,30,31]
    if(isLeapYear&&month==2&&day==29) return true;
    if(monthDay[month-1]<day) return false;
    return true;
}