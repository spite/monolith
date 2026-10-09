
WAGNER.BadTvPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'BadTvPass Pass constructor' );
	this.loadShader( 'bad-tv-fs.glsl' );

	this.params.distortion	= 2.0;
	this.params.distortion2	= 0.5;
	this.params.speed		= 0.3;
	this.params.rollSpeed	= 0.1;
	this.params.yOffset		= 0.0;

};

WAGNER.BadTvPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.BadTvPass.prototype.run = function( c ) {

	this.shader.uniforms.distortion.value	= this.params.distortion;
	this.shader.uniforms.distortion2.value	= this.params.distortion2;
	this.shader.uniforms.speed.value		= this.params.speed;
	this.shader.uniforms.rollSpeed.value	= this.params.rollSpeed;
	this.shader.uniforms.yOffset.value		= this.params.yOffset;

	c.pass( this.shader );

};

WAGNER.GlitchPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'GlitchPass Pass constructor' );
	this.loadShader( 'glitch-fs.glsl' );
	this.params.offset = null;
};

WAGNER.GlitchPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.GlitchPass.prototype.run = function( c ) {

	this.shader.uniforms.offset.value = this.params.offset;
	c.pass( this.shader );

};