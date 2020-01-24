exports.info = function (message) {
    console.log(message);
};

exports.error = function (message, err) {
    console.error(message);
    if (err) {
        console.error(err);
    }
};

exports.debug = function (message) {
    console.log(message);
};