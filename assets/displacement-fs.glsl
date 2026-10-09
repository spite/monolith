#extension GL_OES_standard_derivatives : enable

uniform sampler2D tMatCap;
uniform mat3 normalMatrix;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vEye;

void main() {
  
  vec3 fdx = vec3(dFdx(vPosition.x),dFdx(vPosition.y),dFdx(vPosition.z));
  vec3 fdy = vec3(dFdy(vPosition.x),dFdy(vPosition.y),dFdy(vPosition.z));
  vec3 normal = normalize(cross(fdx,fdy));

  vec3 r = reflect( normalize( vEye ), normalize( normal ) );
  float m = 2. * sqrt( pow( r.x, 2. ) + pow( r.y, 2. ) + pow( r.z + 1., 2. ) );
  vec2 vN = r.xy / m + .5;

  vec3 base = texture2D( tMatCap, vN ).rgb;
  gl_FragColor = vec4( base, 1. );

}