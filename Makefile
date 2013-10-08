###
# glitxt Makefile
###

hint:
	@node node_modules/.bin/jshint lib/

test: hint
	@node node_modules/.bin/mocha --reporter spec

docs:
	@node node_modules/.bin/jsdox --reporter spec

report:
	@node node_modules/.bin/plato -t "glitxt" -r --dir report lib/

.PHONY: hint test docs report
