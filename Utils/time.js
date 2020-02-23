import moment from "moment";
/**
 * @param {Date | String | Number} date 
 * 
 * @returns {String} convertedDate
 */
export function dateToLocalString(date) {
	const d = moment(date).format('ddd, DD MMM, HH:mm');
	return d;
}

/**
 * @param {Date | String | Number} date 
 * 
 * @returns {String} convertedDate
 */
export function datefromNow(date) {
	const dayInMs = 1000 * 60 * 60 * 24;

	const d = moment(date);
	if (d.isSame(moment(), 'day')) {
		return `Today, ${d.format('HH:mm')} (${d.fromNow(false)})`;
	}
	if (d.isBefore()) {
		if (d.isSame(Date.now() - dayInMs, 'day')) {
			return 'Yesterday, ' + d.format('HH:mm');
		}
		return d.format('dddd, DD MMM, HH:mm') + ' (' + d.fromNow(false) + ')';
	}
	else {
		if (d.isSame(Date.now() + dayInMs, 'day')) {
			return 'Tomorrow, ' + d.format('HH:mm');
		}
	}
	return d.format('dddd, DD MMM, HH:mm');
}