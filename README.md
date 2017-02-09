GITALENT.COM SITE
====

Gitalent.com website in angular framework.

## Install

* NVM 
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
```

* Node 
```bash
nvm install v6.9.0
```

* YARN 
```bash
curl -o- -L https://yarnpkg.com/install.sh | bash
```

* Project 
```bash
git clone https://github.com/miguelramos/gitalent.com
cd gitalent.com
yarn
yarn start
```

Disable auto tagging on npm

	npm config set git-tag-version false

## Usage

# Dev
Hot reload and server

```bash
yarn start
```

Recompile dll files (vendors and libs)

```bash
yarn build:dll
```
# Production
Tree shaking and AOT compile

```bash
yarn compile
```

Test production

```bash
yarn prodserver
```

# Release

Release a new version will bump version on package.json, create/update the changelog file with all commit in line with convention.

To now more about convention to use in commits please follow the links:

	https://github.com/conventional-changelog/conventional-changelog-cli
	https://github.com/conventional-changelog/conventional-changelog-angular/blob/master/convention.md

1. Make changes
2. Commit those changes
4. Bump version in package.json

		npm version [major | minor | patch]
		
5. Now tag your version following the convention:
	6. git tag -a v0.1.1 -m "release: feat(version): all new features"
	7. git push && git push --tags
8. Done  	 

# Considerations

The following are some things that will make AOT compile fail.

- Don’t use require statements for your templates or styles, use styleUrls and templateUrls, the angular2-template-loader plugin will change it to require at build time.
- Don’t use default exports.
- Don’t use form.controls.controlName, use form.get(‘controlName’)
- Don’t use control.errors?.someError, use control.hasError(‘someError’)
- Don’t use functions in your providers, routes or declarations, export a function and then reference that function name
- Inputs, Outputs, View or Content Child(ren), Hostbindings, and any field you use from the template or annotate for Angular should be public

## Testing

To be described

## Contributors

[![Author](https://img.shields.io/badge/author-miguelramos-blue.svg)](https://twitter.com/miguelonspring)

## License

[MIT](https://raw.githubusercontent.com/miguelramos/gitalent.com/master/LICENSE)
