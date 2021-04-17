const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

exports.dateConversion = function (date) {
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };