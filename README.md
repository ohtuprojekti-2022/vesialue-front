# vesialue-front

Vesialueen inventointi-ilmoitus frontend

- Production branch: main
- Staging branch: staging

## Heroku
- [Staging](https://vesialue-front-staging.herokuapp.com)
- [Production](https://vesialue-front.herokuapp.com)

There are GitHub Actions building and pushing the Docker containers to Heroku on each commit to main and staging branches

## Installation

Requires Node version 16 or newer and npm.

Install depedencies and start the application with the following commands:

```bash
npm install
npm start
```
The application starts locally at port 3000.

## Commands

### ESLint

Static code analysis:
```bash
npm run lint
```

Analyse and automatically fix errors:
```bash
npm run lint:fix
```

## Docker
### Building Docker image
```docker build -t vesialue-front .```

### Running the container locally
```docker run --rm -p 80:80 vesialue-front```
The service will be available at port 80.

The port can be specified using the PORT environment variable
(used when running on Heroku). The default is 80.
