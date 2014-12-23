var Util = require( 'findhit-util' ),

    connect = require( 'connect' ),
    constructor = require( '../../index' ),

    request = require( 'supertest' ),
    sinon = require( 'sinon' ),
    chai = require( 'chai' ),
    expect = chai.expect;


describe( "connect", function () {
    var app, router;

    beforeEach(function () {
        app = connect();
        router = constructor();

        // Simulate a session middleware
        app.use(function ( req, res, next ) {
            req.session = {};
            next();
        });

        // Use router
        app.use( router );

    });

    describe( "routes", function () {

        it( "basic addRoute", function ( done ) {

            router.addRoute({
                url: '/',
                stack: function ( req, res, next ) {
                    res.statusCode = 300;
                    res.write( "OK" );
                    res.end();
                },
            });

            request( app )
                .get( '/' )
                .expect( 200, '/', done );

        });

    });

});