###
# glitxt Makefile
###


COMMON_MAKEFILES_PATH=node_modules/CommonMakefiles
include $(COMMON_MAKEFILES_PATH)/index.make
include $(COMMON_MAKEFILES_PATH)/node/all.make


###
# Tasks
###
docs:
	@node node_modules/.bin/jsdox --output docs lib

report:
	@node node_modules/.bin/plato -t "glitxt" -r --dir report lib/

.PHONY: test docs report
