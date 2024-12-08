
export const Kdate = (date) => {
    const tools = {
        monthName: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", '十二月'],
        weekName: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        dayName: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]

    }
    const typeOfDate = (d) => {
        d = d ? d : new Date();
        if (d instanceof Date) {
            return d;
        }
        if (typeof d === 'number') {
            return new Date(d);
        }
        if (typeof d === 'string') {
            return new Date(d);
        }
        return new Date();
    }
    let datetime = typeOfDate(date);
    const filter = (num) => {
        return (Array(2).join('0') + num).slice(-2);
    }
    const format = (format) => {
        const o = {
            "M+": datetime.getMonth() + 1, // month
            "D+": datetime.getDate(), // day
            "d+": datetime.getDate(), // day
            "H+": datetime.getHours(), // hour
            "h+": datetime.getHours(), // hour
            "m+": datetime.getMinutes(), // minute
            "s+": datetime.getSeconds(), // second
            "q+": Math.floor((datetime.getMonth() + 3) / 3), // quarter
            "S": datetime.getMilliseconds() // millisecond
        };
        if (/(y|Y+)/.test(format)) {
            format = format.replace(RegExp.$1, (datetime.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (let k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : filter(o[k]));
            }
        }
        return format;
    }
    function getMonthLen(year, month) {
        if (month < 1 || month > 12) {
            throw new Error('Month must be between 1 and 12');
        }
        return new Date(year, month, 0).getDate();
    }
    function getTime(d = datetime) {
        return new Date(d).getTime()
    }
    const add = (num, type = 'day') => {
        const date = new Date(datetime);
        switch (type) {
            case 'day':
                date.setDate(date.getDate() + num);
                break;
            case 'month':
                date.setMonth(date.getMonth() + num);
                break;
            case 'year':
                date.setFullYear(date.getFullYear() + num);
                break;
            default:
                break;
        }
        datetime=typeOfDate(date);
        return Kdate(datetime)
    }
    const subtract = (num, type = 'day') => {
        const date = new Date(date);
        switch (type) {
            case 'day':
                date.setDate(date.getDate() - num);
                break;
            case 'month':
                date.setMonth(date.getMonth() - num);
                break;
            case 'year':
                date.setFullYear(date.getFullYear() - num);
                break;
            default:
                break;
        }
        datetime=typeOfDate(date);
        return Kdate(datetime)
    }

   const fromNow = (date=typeOfDate(datetime)) => {
        const now = new Date();
        const diff = getTime(date) - getTime(now);
        if (diff < 0) {     
            return '刚刚';
        }
        const day = Math.floor(diff / (24 * 3600 * 1000));
        if (day > 0) {
            return day + '天前';
        }
        const hour = Math.floor(diff / (3600 * 1000));
        if (hour > 0) {
            return hour + '小时前';
        }
        const min = Math.floor(diff / (60 * 1000));
        if (min > 0) {
            return min + '分钟前';
        }
        return '刚刚';
    }   

    return {
        format, filter, typeOfDate, getMonthLen, getTime, add, subtract,tools,datetime,fromNow
    }
}