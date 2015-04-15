Flickr list
============

Responsive page showing public photos from flickr tagged as 'London' with option to select and save in localStorage.

Client Installation
--------------------

1. Install nodeJS 

2. Install required nodejs modules via npm:

```
npm install
```

3. Run `grunt` to build JS and CSS files and run tests


### Watching for changes
Grunt has been setup with a watch task to automatically watch JS and CSS files for modifications, then build and test files when they're modified.

To run Grunt in watch mode:
```
grunt watch
```


### Project structure

webapp  
    modules  
        sbcookies.src           - source directory for cookie module  
        sbflickr.src            - source directory for flickr module  
    style  
        main.css                - main css stylesheet  

### TODO
- add unit tests
- run tests on build
- add lazy loading
- auto update
