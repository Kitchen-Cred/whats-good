module.exports = function(grunt) {
  grunt.initConfig({
    banner: '/* <%= pkg.name %> <%= pkg.version %> \n' + '* By <%= pkg.author %> \n' + '* Distributed under <%= pkg.license %> \n' + '* Copyrights <%= grunt.template.today("yyyy") %> . All Rights Reserved */\n',
    pkg: grunt.file.readJSON('./package.json'),
    jshint: {
      options: {
        ignores: ['./node_modules',
        './public/bower_components/**/*.js',
        './**/*.min.js', 'src/tmp/**'],
        jshintrc: '.jshintrc'
      },
      gruntfile: 'Gruntfile.js',
      all: ['src/**/*.js']
    },
    copy: {
      imgs: {
        expand: true,
        cwd: 'src/imgs',
        src: ['./**', '!./**/*icon*'],
        dest: 'public/imgs/'
      },
      icons: {
        expand: true,
        cwd: 'src/imgs',
        src: './**/*icon*.png',
        dest: 'public/'
      },
			font_awesome_fonts : {
				expand : true,
				cwd: 'client_components/font-awesome/',
				src: ['fonts/*','css/*.min.css'],
				dest: 'public/components/fa'
			},
			jquery : {
        expand : true,
        cwd : 'client_components/jquery/dist/',
        src : './jquery.min.js',
        dest : 'public/components/jquery/'
      },
      leaflet_awesome_markers : {
        cwd : 'client_components/Leaflet.awesome-markers/dist',
        expand : true,
        src : ['./images/**', './*.css', './*.min.js'],
        dest : 'public/components/leaflet_awesome_markers'
      },
      leaflet_css : {
          cwd : 'client_components/leaflet/dist/',
          expand : true,
          src : '**',
          dest : 'public/components/leaflet/'
      }
    },
    bower: {
      install: {
        options: {
          copy : false
        }
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>',
        mangle: {
          except: ['jQuery', '$']
        }
      },
      clientjs: {
        files: {
          'public/js/main.min.js': 'src/tmp/main.js'
        }
      },
      components : {
        files : {
          'public/components/retina_js/retina.min.js' : 'client_components/retina.js/src/retina.js',
          'public/components/leaflet/leaflet.min.js' : 'src/tmp/leaflet.js'
        }
      }
    },
    less: {
      options: {
        paths: ['client_components/**']
      },
      dev: {
        files: {
          'public/css/style.css': 'src/less/style.less'
        }
      },
      production: {
        options: {
          yuicompress: true
        }
      }
    },
    appcache: {
      options: {
        basePath: 'public'
      },
      all: {
        dest: 'public/manifest.appcache',
        cache: ['public/**/*', '!public/manifest.appcache'],
        network: '*',
        fallback: '/ /offline'
      }
    },
    concat : {
      dist : {
        files : {
          'src/tmp/leaflet.js' : [
            'client_components/leaflet/src/Leaflet.js',
            'client_components/leaflet/src/core/Util.js',
            'client_components/leaflet/src/core/Browser.js',
            'client_components/leaflet/src/core/Class.js',
            'client_components/leaflet/src/core/Events.js',
            'client_components/leaflet/src/core/Handler.js',
            'client_components/leaflet/src/dom/DomUtil.js',
            'client_components/leaflet/src/dom/DomEvent.js',
            'client_components/leaflet/src/dom/DomEvent.DoubleTap.js',
            'client_components/leaflet/src/dom/DomEvent.Pointer.js',
            'client_components/leaflet/src/dom/Draggable.js',
            'client_components/leaflet/src/dom/PosAnimation.Timer.js',
            'client_components/leaflet/src/dom/PosAnimation.js',
            'client_components/leaflet/src/geo/LatLng.js',
            'client_components/leaflet/src/geo/LatLngBounds.js',
            'client_components/leaflet/src/geometry/Bounds.js',
            'client_components/leaflet/src/geometry/LineUtil.js',
            'client_components/leaflet/src/geometry/Point.js',
            'client_components/leaflet/src/geometry/PolyUtil.js',
            'client_components/leaflet/src/geometry/Transformation.js',
            'client_components/leaflet/src/geo/projection/Projection.js',
            'client_components/leaflet/src/geo/projection/Projection.LonLat.js',
            'client_components/leaflet/src/geo/projection/Projection.Mercator.js',
            'client_components/leaflet/src/geo/projection/Projection.SphericalMercator.js',
            'client_components/leaflet/src/geo/crs/CRS.js',
            'client_components/leaflet/src/geo/crs/CRS.EPSG3395.js',
            'client_components/leaflet/src/geo/crs/CRS.EPSG3857.js',
            'client_components/leaflet/src/geo/crs/CRS.EPSG4326.js',
            'client_components/leaflet/src/geo/crs/CRS.Simple.js',
            'client_components/leaflet/src/map/Map.js',
            'client_components/leaflet/src/control/Control.js',
            'client_components/leaflet/src/control/Control.Attribution.js',
            'client_components/leaflet/src/control/Control.Layers.js',
            'client_components/leaflet/src/control/Control.Scale.js',
            'client_components/leaflet/src/control/Control.Zoom.js',
            'client_components/leaflet/src/copyright.js',
            'client_components/leaflet/src/layer/vector/Path.js',
            'client_components/leaflet/src/layer/vector/Path.Popup.js',
            'client_components/leaflet/src/layer/vector/Path.SVG.js',
            'client_components/leaflet/src/layer/vector/Path.VML.js',
            'client_components/leaflet/src/layer/vector/Polyline.js',
            'client_components/leaflet/src/layer/vector/Polygon.js',
            'client_components/leaflet/src/layer/vector/Circle.js',
            'client_components/leaflet/src/layer/vector/CircleMarker.js',
            'client_components/leaflet/src/layer/vector/Rectangle.js',
            'client_components/leaflet/src/layer/vector/canvas/Circle.Canvas.js',
            'client_components/leaflet/src/layer/vector/canvas/CircleMarker.Canvas.js',
            'client_components/leaflet/src/layer/vector/canvas/Path.Canvas.js',
            'client_components/leaflet/src/layer/vector/canvas/Polygon.Canvas.js',
            'client_components/leaflet/src/layer/vector/canvas/Polyline.Canvas.js',
            'client_components/leaflet/src/layer/marker/Icon.js',
            'client_components/leaflet/src/layer/marker/DivIcon.js',
            'client_components/leaflet/src/layer/marker/Icon.Default.js',
            'client_components/leaflet/src/layer/marker/Marker.js',
            'client_components/leaflet/src/layer/marker/Marker.Drag.js',
            'client_components/leaflet/src/layer/marker/Marker.Popup.js',
            'client_components/leaflet/src/layer/LayerGroup.js',
            'client_components/leaflet/src/layer/FeatureGroup.js',
            'client_components/leaflet/src/layer/vector/MultiPoly.js',
            'client_components/leaflet/src/layer/GeoJSON.js',
            'client_components/leaflet/src/layer/ImageOverlay.js',
            'client_components/leaflet/src/layer/Popup.js',
            'client_components/leaflet/src/layer/tile/TileLayer.js',
            'client_components/leaflet/src/layer/tile/TileLayer.Anim.js',
            'client_components/leaflet/src/layer/tile/TileLayer.Canvas.js',
            'client_components/leaflet/src/layer/tile/TileLayer.WMS.js',
            'client_components/leaflet/src/map/anim/Map.PanAnimation.js',
            'client_components/leaflet/src/map/anim/Map.ZoomAnimation.js',
            'client_components/leaflet/src/map/ext/Map.Geolocation.js',
            'client_components/leaflet/src/map/handler/Map.BoxZoom.js',
            'client_components/leaflet/src/map/handler/Map.DoubleClickZoom.js',
            'client_components/leaflet/src/map/handler/Map.Drag.js',
            'client_components/leaflet/src/map/handler/Map.Keyboard.js',
            'client_components/leaflet/src/map/handler/Map.ScrollWheelZoom.js',
            'client_components/leaflet/src/map/handler/Map.Tap.js',
            'client_components/leaflet/src/map/handler/Map.TouchZoom.js'
            ]
        }
      }
    },
    /*
    cssmin: {
      options: {
        banner: '<%= banner %>'
      },
      dev: {
        files: {
          './public/css/style.min.css': ['./public/bower_components/normalize-css/normalize.css', './public/css/style.css']
        }
      },
      production: {
        files: {}
      }
    },
    */
    imagemin: {
      options: {
        optimizationLevel: 3,
        files: {}
      }
    },
    nodemon: {
      options: {
        file: 'src/app.js',
        // put args here
        // the same as running
        // node app [args]
        args: [],
        legacyWatch: true,
        ignoredFiles: ['./node_modules/**', './public/**'],
        watchedExtensions: ['js'],
        watchedFolder: ['src/routes'],
        env: {
          PORT: 7000,
          NODE_ENV: 'development'
        }
      },
      server: {
        options: {
          // your server config
          // check https://github.com/ChrisWren/grunt-nodemon for more information on configuration
          // args: ['development']
        }
      },
      debug: {
        options: {
          nodeArgs: ['--debug'] // you can use --debug-brk
        }
      }
    },
    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile'],
      },
      appcache: {
        files: ['public/**/*', 'src/views/*', '!public/manifest.appcache'],
        tasks: ['appcache']
      },
      scripts: {
        // watch changes for public files
        files: ['!**/node_modules/**', './src/**/*.js'],
        options: {
          livereload: 3355
        },
        tasks: ['jshint', 'browserify', 'uglify']
      },
      copy: {
        files: 'src/imgs/**',
        tasks: ['copy']
      },
      less: {
        files: ['!**/node_modules/**', './**/*less'],
        tasks: ['less']
      },
      jade: {
        files: ['!**/node_modules/**', './views/**/*.jade'],
        options: {
          events: ['all'],
          livereload: 3355
        }
      }
    },
    browserify: {
      dist: {
        files: {
          'src/tmp/main.js': ['src/client/main.js']
        },
        options: {}
      }
    },
    // concurrent task
    // see https://github.com/sindresorhus/grunt-concurrent for more information on setup
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      server: {
        tasks: ['nodemon:server', 'watch']
      },
      debug: {
        tasks: ['nodemon:debug', 'watch']
      }
    }
  });
  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-appcache');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-concat');
  // default tasks
  grunt.registerTask('build', ['bower', 'concat', 'copy', 'jshint', 'browserify', 'uglify', 'imagemin', 'less', 'appcache']);
  grunt.registerTask('default', ['build', 'concurrent:server']);
  // server task
  grunt.registerTask('server', ['concurrent:server']);
  // to use the debug task, install node-inspector
  // in a terminal run node-inspector
  // check out grunt-node-inspector: https://github.com/ChrisWren/grunt-node-inspector to use the grunt task
  grunt.registerTask('debug', ['concurrent:debug']);
  // grunt.registerTask('production', ['uglify:production','less:production', 'cssmin:production']);
  // your test over here
  // grunt.registerTask('test', []);
};
