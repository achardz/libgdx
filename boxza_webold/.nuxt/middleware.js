const middleware = {}

middleware['redirect'] = require('..\\src\\middleware\\redirect.js')
middleware['redirect'] = middleware['redirect'].default || middleware['redirect']

export default middleware
