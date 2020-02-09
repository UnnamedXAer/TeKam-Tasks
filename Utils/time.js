import moment from "moment";
/**
 * @param {Date | String | Number} date 
 * 
 * @returns {String} convertedDate
 */
export function dateToLocalString(date) {
	const d = moment(date).format('DD MMM YYYY, HH:mm');
	return d;
}