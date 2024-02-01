const verifyRoles = (validRoles) =>{
    return(req, res, next)=>{
        if(!req?.roles) return res.sendStatus(401);
        console.log("Current roles: " + req.roles);
        console.log("Valid roles: " + validRoles);
        const isValidRole = req.roles.map(role => validRoles.includes(role)).find(val => val === true);
        //console.log(isValidRole);
        if(!isValidRole) return res.sendStatus(401);
        next();
    };
};

module.exports = {verifyRoles};