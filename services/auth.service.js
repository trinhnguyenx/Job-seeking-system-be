const TokenService = require('./token.service');
const UserController = require('../controllers/user.Controller');
const { generateUUID } = require('../utils/uuid');
const loginUserWithEmailAndPassword = async (email, password) => {
	const user = await UserController.getUserByEmail(email);
	console.log("userDB",user)
	if (!user){
		return null;
	}
	const passwordHashed = TokenService.hashPasswordWithSalt(password, process.env.SALT);
	if (user.password == passwordHashed.password){
		return {
			id: user.id,
			email : user.email,
			name : user.name,
			avatar: user.avatar,
			role: user.role
		}
	}
}

const register = async ( user ) => {
	try {
		const hashedPassword = TokenService.hashPasswordWithSalt(user.password, process.env.SALT );
		user.password = hashedPassword.password;
		user.id = generateUUID();
		user.role = 'user';
		console.log(user)
		await UserController.createUser(user);
		return user;
	} catch (error) {
		throw new Error(error.message || 'Internal server error');
	}
}

const updateUserInfo = async (id, user) => {
	try {
		const updatedUser = await UserController.updateUser(id, user);
		return updatedUser;
	} catch (error) {
		throw new Error(error.message || 'Internal server error');
	}
}
const deleteUser = async (id) => {
	try {
		const deletedUser = await UserController.deleteUser(id);
		return deletedUser;
	} catch (error) {
		throw new Error(error.message || 'Internal server error');
	}
}
module.exports = {
	loginUserWithEmailAndPassword,
	register,
	updateUserInfo,
	deleteUser
}
