const AuthServices = require('../services/auth.service');
const TokenService = require('../services/token.service');
const mailService  = require('../services/mailService');
const UserController = require('./user.Controller');
const login = async (req, res) => {
	try {
		console.log(req.body)
		const { email, password } = req.body;
		const user = await AuthServices.loginUserWithEmailAndPassword(email, password);
		if (!user) {
			res.status(400).json({ 
				data: {
					message: 'Email or password not correct'
				}
			});
			return;
		}
		console.log("userconteoller",user)
		if (user){
			const access_token = await TokenService.signToken(user);
			const refresh_token = await TokenService.refreshToken(user);
			console.log(access_token,refreshToken)
			res.send(
			{ 
				data:{
					user, access_token, refresh_token
				} ,
				message: 'Login success'
			});
		} else {
			res.status(400).json({message: 'User not found'});
		}
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: e.message || 'Internal server error'});
	}
};

const register = async ( req, res) => {
	try {
		const user = req.body;
		const newUser = await AuthServices.register(user);
		res.status(201).json(
			{
				status: "Success",
				data: {
					name: newUser.name,
					email: newUser.email,
					id: newUser.id,
					avatar: newUser.avatar
				}
			}
		)
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message || 'Internal server error'});
	}
}

const updateUserInfo = async (req, res) => {
	try {
		const id = req.params.id;
		const user = req.body;
		console.log(user);
		const updatedUser = await AuthServices.updateUserInfo(id, user);
		res.status(201).json(
			{
				status: "Success",
				data: {
					name: updatedUser.name,
					email: updatedUser.email,
					age: updatedUser.age
				}
			}
		)
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message || 'Internal server error'});
	}
}
const deleteUser = async (req, res) => {
	try {
		const id = req.params.id;
		const user = await AuthServices.deleteUser(id);
		console.log(user)
		res.status(201).json(
			{
				status: "Delete success",
			}
		)
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message || 'Internal server error'});
	}
}
const forgotPassword = async (req, res) => {
	const { mailTo } = req.body;

	try {
		// Gửi email
		const mailOptions = {
			emailFrom: "nguyencongtrinhqb@gmail.com",
			emailTo: mailTo,
			subject: "Password reset requested",
			// text: `Hi ${user.name}, You requested for a password reset. Here's your token: ${token}`,
			text: "Hello",
		};
		try {
			await mailService.sendEmail(mailOptions);
			return res.status(201).send({ message: 'Email sent successfully' });
		}
		catch (error) {
			console.log(error);
			return res.status(500).send({ message: 'Failed to send email' || 'Internal server error'});
		}
	}
	catch (error) {
		console.log(error);
	}
}
const refreshToken = async (req, res) => { 
	try {
		const token = req.headers.authorization.split(' ').length == 2 ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
		console.log(token)
	if (token) {
		const response = await TokenService.refreshTokenService(token)
		return res.status(201).json({
			newToken: response
		});
	} else {
		return res.status(400).json({ message: 'The refresh token is not valid' });
	}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message || 'Internal server error'});
	}

}
module.exports = {
	login,
	register,
	updateUserInfo,
	deleteUser,
	forgotPassword,
	refreshToken,
}