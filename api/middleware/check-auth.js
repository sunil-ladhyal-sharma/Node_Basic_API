const jwt = require("jsonwebtoken");
module.exports = ( req, res, next ) => {
    console.log(req.headers)
    try {
        // Authorization
        const token =  req.headers.authorization.split(" ")[1];
        // console.log(token, proces.env.TOKEN_SECRET_KEY)
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        // req.userData = decoded;
        next();
    } catch (error) {
        // console.log(error);
         res.status(401).json(error);
    }
   
}