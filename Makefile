###
# glitxt Makefile
###


include node_modules/CommonMakefiles/node.make


###
# Tasks
###
test: mocha

docs:
	@node node_modules/.bin/jsdox --output docs lib

report:
	@node node_modules/.bin/plato -t "glitxt" -r --dir report lib/

.PHONY: test docs report
