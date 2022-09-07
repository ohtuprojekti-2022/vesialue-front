# vesialue-front
Vesialueen inventointi-ilmoitus frontend


## Docker
### Building Docker image
```docker build -t vesialue-front .```

### Running the container locally
```docker run --rm -p 80:80 vesialue-front```
The service will be available at port 80.

The port can be specified using the PORT environment variable
(used when running on Heroku). The default is 80.
