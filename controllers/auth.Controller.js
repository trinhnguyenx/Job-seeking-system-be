const AuthServices = require('../services/auth.service');
const TokenService = require('../services/token.service');
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
			const token = await TokenService.signToken(user);
			res.send(
			{ 
				data:{
					user, token
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
module.exports = {
	login,
	register,
	updateUserInfo,
	deleteUser
}