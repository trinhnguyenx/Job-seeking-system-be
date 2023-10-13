const jwt = require('jsonwebtoken')
require('dotenv').config()
//render js object user
// const SECRECT = "secret"
// const user = {
// 	name: "John",
// 	age: 30,
// 	email: "example@gmail.com",
// 	phone: "0123456789"

// }

//create token
//make payload
// const payload = {
// 	name: user.name,
// 	age: user.age,
// 	email: user.email,
// 	phone: user.phone
// }
// const token = jwt.sign(payload,SECRECT,{
// 	algorithm: "HS256",
// 	expiresIn: '1d',
// 	issuer: "example.com",
// })
//checktoken valid
// const decoded = jwt.verify(token,SECRECT)
// console.log(decoded)
// console.log(token)
const crypto = require('crypto');
function hashPasswordWithSalt(password, saltVal) {
	if(!saltVal){
		saltVal = crypto.randomBytes(16).toString('hex');
	}
	console.log("saltval",saltVal)
	const hashedPassword = crypto.pbkdf2Sync(password, saltVal, 1000, 64, 'sha512').toString('hex');
	return {
		password :hashedPassword, salt :saltVal};
}
function signToken(user){
	return jwt.sign({
		id :user.id,
		name: user.name,
		email : user.email,
		role: user.role
	},process.env.SECRET, {
		algorithm: "HS256",
		expiresIn: "1d",
	})
}
function getInfoFromToken(req){
	try{
		const token = req.headers.authorization.split(' ').length == 2 ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
		const decode = jwt.verify(token, process.env.SECRET)
		return decode
	}	catch(e){
		return false
	}
}
function authorize(req,res,next){
	const authHeader = req.headers.authorization;
	console.log(authHeader)
	if( authHeader && authHeader.split(' ')[0] === 'Bearer'){
		try{
			const decode = jwt.verify(authHeader.split(' ')[1], process.env.SECRET)
			console.log(Date.now() / 1000 , decode.exp)
			if( Date.now() / 1000 < decode.exp)
				{
					next();
				} else {
					return res.status(401).json({message :'Token is inspired'})
				}
		} catch(e){
			console.log("checktoken",e)
			return res.status(401).json({message :'Token not valid'})
		}
	} else return res.status(401).json({message :'Not have permission'})
}
module.exports = {
	signToken,
	authorize,
	getInfoFromToken,
	hashPasswordWithSalt
}