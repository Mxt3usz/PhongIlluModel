precision lowp float;
varying vec4 v_normal;

void main() {
  // ambient lighting (global illuminance)
  vec3 ambient = vec3(0.5, 0.5, 0.5); // color - grey

  vec3 l = vec3(1.0, 1.0, 1.0);
   // normalized surface normal 
  vec3 n = normalize(v_normal.xyz);
  // Light from light source
  vec3 Llight = vec3(1.0, 1.0, 1.0);
  // viewer direction
  vec3 v = normalize(vec3(0.0, 0.0, 1.0));
  // reflection direction
  vec3 r = normalize(reflect(-l, n));

  // Diffuse reflection
  /*
  // light source direction 
  // illumination strength proportional to cosine of angle between n and l
  float illustrength = dot(n, l);
  // surface illumination caused by Llight which depends on angle between n and l
  vec3 Lsurf = vec3(0.0, 0.0, 0.0);
  Lsurf = Llight * illustrength;
  // surface reflectance (material color)
  vec3 roh = vec3(1, 1, 0);
  // overall reflected light
  vec3 Lrefl = roh * Lsurf;
  */
  // Specular reflection
  /**/
  float illustrength = dot(n, l);
  vec3 Lsurf = Llight * illustrength;
  // shiny surfaces reflect entire color spectrum
  vec3 rohWhite = vec3(1.0, 1.0, 1.0);
  vec3 Lrefl = rohWhite * Lsurf;
  // (r * v)**m where m governs size of shiny area
  float specularstrength = pow(dot(r, v), 10.0);
  // reflected lights towards viewer considering reflection direction and shininess parameter
  vec3 Lcam = Lrefl * specularstrength;
  
  // write color to model
  gl_FragColor = vec4(Lcam, 1.0);
}