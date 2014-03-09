install:
	npm install

clean:
	rm -rf node_modules

package: install
	npm dedupe
	npm shrinkwrap

test:
	bash -c "time ./node_modules/.bin/mocha --check-leaks --recursive -R list" # use bash for human-readable timing

testwatch:
	./node_modules/.bin/chicken -c 'clear; date; make test' .

.PHONY: install clean package test testwatch
