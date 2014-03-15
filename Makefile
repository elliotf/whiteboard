install:
	npm install

clean:
	rm -rf node_modules

dev:
	./node_modules/.bin/nodemon -w . server.js

lint:
	bash -c "time ./node_modules/.bin/jshint . --exclude node_modules"

release: lint
	npm prune
	npm install --no-shrinkwrap
	npm dedupe
	npm shrinkwrap

test: lint
	bash -c "export NODE_ENV='test'; time ./node_modules/.bin/mocha --check-leaks --recursive -R list" # use bash for human-readable timing

testwatch:
	./node_modules/.bin/chicken -c 'make test' .

.PHONY: install clean dev release test testwatch
