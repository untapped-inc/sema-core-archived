require('datejs');

class PeriodData {
	constructor() {
		this.beginDate = "N/A";
		this.endDate = "N/A;";
		this.periodValue = "N/A";
	}
	setValue(periodValue){
		this.periodValue = periodValue;
	}

	setDates( beginDate, endDate ){
		this.endDate = endDate;
		this.beginDate = beginDate;

	}
	static init3Periods(){
		return [ new PeriodData(), new PeriodData(), new PeriodData() ];
	}
	static CalcBeginDate( endDate, period, periodCount ){
		let beginDate = endDate;

		switch( period ) {
			case 'month':
			default:
				let beginDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
				beginDate.addMonths(periodCount);
				return beginDate;
		}
		return beginDate;
	}
	static UpdatePeriodDates( periods, endDateIn, period ){
		let endDate = new Date(endDateIn);
		let beginDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
		switch( period ) {
			case 'month':
			default:
				for( let i = 0; i < periods.length; i++ ){
					periods[i].setDates(beginDate, endDate);
					if( i == 0 ){
						endDate =  new Date( endDate.getFullYear(), endDate.getMonth(), endDate.getDaysInMonth( endDate.getFullYear(), endDate.getMonth()) );
					}
					beginDate = new Date(beginDate);
					endDate = new Date(endDate);
					beginDate.addMonths(-1);
					endDate.addMonths(-1);
				}
		}
	}

	static IsExpected( periodData, checkDate){
		if( periodData.beginDate.getFullYear() === checkDate.getFullYear() &&
			periodData.beginDate.getMonth() === checkDate.getMonth()){
			return true;
		}
		return false;
	}

}


module.exports = { PeriodData };
