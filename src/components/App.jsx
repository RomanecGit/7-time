import React, {useState} from 'react';

// function wValidate(fnValidator, Component){
//
// }

//валидатор даты - проверяет корректность строки с датой
// function isDateValidator(strDate){
//     return !isNaN(new Date(strDate));
// }

// это, если не ошибаюсь, компонент высшего порядка получился -
// на входе берет один компонент, возвращает другой
// строку с датой превращает в "Х минут/часов/дней назад"
function DatePretty (Component){
    return function (props, ...args){
        let newDate = "",                       //строка "Х минут/часов/дней назад"
            pDate = new Date(props.date);       //дата видео
        const   msMinute = 1000 *60,            //минута в мс
                msHour = msMinute * 60,         //час в мс
                msDay = msHour * 24,            //сутки в мс
                msVideoDate = pDate.getTime(),  //дата видео в милисекундах
                msCur = Date.now(),             //текущее время в мс
                delta = msCur-msVideoDate;      //разница между текущим временем и временем видео в мс
        
        if (delta > msDay)                      //прошло больше суток
            newDate = Math.floor(delta / msDay) + " дней";  // "Х минут"
        else if (delta > msHour)                //прошло больше часа
            newDate = Math.floor(delta / msHour) + " часов";// "Х часов"
        else                                    //прошло <= часа
            newDate = Math.floor(delta / msMinute) + " минут";// "Х минут"
        newDate += " назад";
        return Component.apply(undefined, [{...props, date: newDate}, ...args]);
    }
}

function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    )
}

//оборачиваю DateTime в украшатель дат
const DateTimePretty = DatePretty(DateTime);

function Video(props) {
    return (
        <div className="video">
            <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen/>
            <p className="date">обычная дата:</p> <DateTime date={props.date} />
            <br/>
            <p className="date">дата, обернутая в УкрашательДат:</p> <DateTimePretty date={props.date}/>
        </div>
    )
}

function VideoList(props) {
    return props.list.map((item, i) => <Video key={i} url={item.url} date={item.date} />);
}

export default function App() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2023-03-16 13:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2023-03-18 15:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2023-03-18 12:20:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-01 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-12-02 05:24:00'
        },
    ]);

    return (
        <VideoList list={list} />
    );
}