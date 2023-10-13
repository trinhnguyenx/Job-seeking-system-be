const jwt = require('jsonwebtoken');
require('dotenv').config()
const acl = require('./acl.middleware');
const authorize = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(401).json({ message: 'Unauthorized' });
	} else {
		try {
			const token = req.headers.authorization.split(' ').length == 2 ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
			const decoded = jwt.verify(token, process.env.SECRET);

			const userRole = decoded.role;
			acl.areAnyRolesAllowed(userRole, req.route.path, req.method.toLowerCase(), (err, result) => {
				if (err) {
					console.log(err);
				} else {
					if (result) {
						next();
					} else {
						return res.status(401).json({ message: 'Forbidden' });
					}
				}
			})
		} catch (error) {
			console.log(error);
			return res.status(401).json({ message: 'Unauthorized' });
		}
	}
};
module.exports = {authorize};