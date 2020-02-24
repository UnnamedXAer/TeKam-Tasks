import moment from "moment";
/**
 * @param {Date | String | Number} date 
 * 
 * @returns {String} convertedDate
 */
export function dateToLocalString(date, withYear) {
	const d = moment(date).format(`ddd, DD MMM${withYear ? ' YYYY' : ''}, HH:mm`);
	return d;
}

/**
 * @param {Date | String | Number} date 
 * 
 * @returns {String} convertedDate
 */
export function datefromNow(date) {
	const oneDayInMs = 1000 * 60 * 60 * 24;

	const d = moment(date);

	if (d.isSameOrAfter()) {
		if (d.isSame(Date.now() + oneDayInMs, 'day')) {
			return 'Tomorrow, ' + d.format('HH:mm')+ ' (left ' + d.fromNow(true) + ')';
		}
		else {
			return d.format('dddd, DD MMM, HH:mm') + ' (left ' + d.fromNow(true) + ')';
		}
	}
	else {
		if (d.isSame(Date.now() - oneDayInMs, 'day')) {
			return 'Yesterday, ' + d.format('HH:mm')+ ' (expired ' + d.fromNow(false) + ')';
		}
		else {
			return d.format('dddd, DD MMM, HH:mm') + ' (expired ' + d.fromNow(false) + ')';
		}
	}
}