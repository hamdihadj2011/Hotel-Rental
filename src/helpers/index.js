import titleize from 'titleize'
import * as moment from 'moment'
const  rentalType=(isShared)=> isShared ? 'shared':'entire'

const toUpperCase=value=> value ? titleize(value):''


export {rentalType,toUpperCase}

export const getRangeOfDate=(startAt,endAt,dateFormat)=>{
const temDates=[]
const mEndAt=moment(endAt)
let mStartAt=moment(startAt)
while(mStartAt <mEndAt){
    temDates.push(mStartAt.format(dateFormat))
    mStartAt=mStartAt.add(1,'day')
}

temDates.push(mEndAt.format(dateFormat))
return temDates
}

export const prtifyDate=date=> moment(date).format('MMM Do YY')