install:
	npm install

clean:
	rm -rf node_modules

release:
	npm prune
	npm install --no-shrinkwrap
	npm dedupe
	npm shrinkwrap

test:
	bash -c "export NODE_ENV='test'; time ./node_modules/.bin/mocha --check-leaks --recursive -R list" # use bash for human-readable timing

testwatch:
	./node_modules/.bin/chicken -c 'make test' .

.PHONY: install clean release test testwatch
