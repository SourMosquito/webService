const jwt = require ('jsonwebtoken');
//const TOKEN_SECRET = 'phDqedd5a4sd5f4sadf$&$%&/R24dewr563';
exports.jwtGenetator = (datos) => jwt.sign({
    user: datos,
    },
    process.env.TOKEN_SECRET,//process.env.TOKEN_SECRET,
    { expiresIn: process.env.EXPIRE_TOKEN || '24h'},
);

exports.jwtDecode = (token) => jwt.verify(
        token,
        process.env.TOKEN_SECRET, // process.env.TOKEN_SECRET,
        (err, decoded) => {
        if (decoded) {
            return decoded;
        }
        if (err) {
            return null;
        }
        return null;
        },
    );