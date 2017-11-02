
VERSION:=$(shell grep VERSION src/v.js | ruby -e "puts gets.match(/VERSION = '([\d\.]+)/)[1]")

#SHA:=$(shell git log -1 --format="%H")
SHA:=$(shell git log -1 --format="%h")
NOW:=$(shell date)


v:
	@echo $(VERSION)

spec:
	bundle exec rspec

pkg_plain:
	mkdir -p pkg
	cp src/v.js pkg/v-$(VERSION).js
	echo "/* from commit $(SHA) on $(NOW) */" >> pkg/v-$(VERSION).js
	cp pkg/v-$(VERSION).js pkg/v-$(VERSION)-$(SHA).js

pkg_mini:
	mkdir -p pkg
	printf "/* v-$(VERSION).min.js | MIT license: http://github.com/jmettraux/v.js/LICENSE.txt */" > pkg/v-$(VERSION).min.js
	java -jar tools/closure-compiler.jar --js src/v.js >> pkg/v-$(VERSION).min.js
	echo "/* minified from commit $(SHA) on $(NOW) */" >> pkg/v-$(VERSION).min.js
	cp pkg/v-$(VERSION).min.js pkg/v-$(VERSION)-$(SHA).min.js

pkg_comp:
	mkdir -p pkg
	printf "/* v-$(VERSION).com.js | MIT license: http://github.com/jmettraux/v.js/LICENSE.txt */\n" > pkg/v-$(VERSION).com.js
	cat src/h.js | ruby tools/compactor.rb >> pkg/v-$(VERSION).com.js
	echo "/* compacted from commit $(SHA) on $(NOW) */" >> pkg/v-$(VERSION).com.js
	cp pkg/v-$(VERSION).com.js pkg/v-$(VERSION)-$(SHA).com.js

pkg: pkg_plain pkg_mini pkg_comp
#pkg: pkg_plain pkg_comp

clean-sha:
	find pkg -name "v-*-*js" | xargs rm
clean:
	rm -fR pkg/

serve: # just for test.html
	ruby -run -ehttpd . -p7001


.PHONY: spec pkg clean serve

