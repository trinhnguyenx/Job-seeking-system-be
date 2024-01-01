const acl = require('acl');

const aclInstance = new acl(new acl.memoryBackend());

aclInstance.allow([
	{
		roles: 'admin',
		allows: [
			{ resources: '/users', permissions: '*' },
			{ resources: '/users/:id', permissions: '*' },
			{ resources: '/me', permissions: '*'}
		],
	},
	{
		roles: 'user',
		allows: [
			{ resources: '/me', permissions: ['get', 'post', 'put'] },
			{ resources: '/', permissions: ['get', 'post'] },
			{ resources: '/users/:id', permissions: ['get', 'put', 'delete'] },
		],
	}
]);

module.exports = aclInstance;