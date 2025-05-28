const generateJsTask = require("../../../gulp-core/gulptaskCore").generateJsTask;

module.exports = function () {
    // Original location : .\Plugins\Customer.Ramseier
    let jsFiles = [
       "Content/js/UserGroups.js"

    ];

    generateJsTask(__filename, jsFiles);

};
