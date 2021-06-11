exports.instructor = function (req, res, next) {
    console.log(req.signedData.role)
    if(!(req.signedData.role == "Instructor" || req.signedData.role == "Admin")) return res.status(403).send('Access denied.');
    next();
}

exports.parent = function (req, res, next) {
    console.log(req.signedData.role)
    if(!(req.signedData.role == "Parent" || req.signedData.role == "Admin")) return res.status(403).send('Access denied.');
    next();
}

exports.student = function (req, res, next) {
    console.log(req.signedData.role)
    if(!(req.signedData.role == "Student" || req.signedData.role == "Admin")) return res.status(403).send('Access denied.');
    next();
}

exports.admin = function (req, res, next) {
    console.log(req.signedData.role)
    if(!(req.signedData.role == "Admin")) return res.status(403).send('Access denied.');
    next();
}
