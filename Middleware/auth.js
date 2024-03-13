const auth = (req, res, next) => {
    console.log("Hello from middleware");
    
    next();
}

module.exports = auth;