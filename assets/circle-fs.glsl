uniform sampler2D tInput;
uniform vec2 resolution;
uniform float time;

varying vec2 vUv;

void main( void ) {

	float d = 1. - 2. * length( .5 - vUv );
	d = clamp( d, 0., 1. );
	d *= sin( 100. * ( d + .1 * time ) );
	gl_FragColor = vec4( 1., 1., 1., d );

}