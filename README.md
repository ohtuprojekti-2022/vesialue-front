# vesialue-front
Vesialueen inventointi-ilmoitus frontend

- Production branch: main
- Staging branch: staging

## Heroku
- [Staging](https://vesialue-front-staging.herokuapp.com)
- [Production](https://vesialue-front.herokuapp.com)

There are GitHub Actions to build the containers and
push them to Heroku on each commit to main and staging branches
## Docker
### Building Docker image
```docker build -t vesialue-front .```

### Running the container locally
```docker run --rm -p 80:80 vesialue-front```
The service will be available at port 80.

The port can be specified using the PORT environment variable
(used when running on Heroku). The default is 80.
