supper: test
	bash -c "time git push origin master" # use bash for human-readable timing

test:
	 ./node_modules/.bin/mocha --check-leaks --recursive -R list

testwatch:
	./node_modules/.bin/chicken -c 'clear; date; time make test' .

.PHONY: dev supper test testwatch
