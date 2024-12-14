precision lowp float;
varying vec4 v_normal;

// Implementation of Phong illumination model
// which calculates for each surface point the light that is reflected towards the viewer

void main() {
  // ambient lighting (global illuminance)
  vec3 Lindirect = vec3(1.0, 1.0, 1.0);

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
  
  // light source direction 
  // illumination strength proportional to cosine of angle between n and l
  // dont consider angles greater than 90 degrees
  float illustrength = max(0.0, dot(n, l));
  // surface illumination caused by Llight which depends on angle between n and l
  vec3 Lsurf = Llight * illustrength;
  // surface reflectance (material color)
  vec3 reflectance = vec3(1.0, 0, 0);
  // overall reflected light
  //vec3 Lrefl = roh * Lsurf;
  
  // Specular reflection
  /**/
  //float illustrength = dot(n, l);
  //vec3 Lsurf = Llight * illustrength;
  // shiny surfaces reflect entire color spectrum
  vec3 reflectanceWhite = vec3(1.0, 1.0, 1.0);
  //vec3 Lrefl = rohWhite * Lsurf;
  // (r * v)**m where m governs size of shiny area
  // dont consider angles greater than 90 degrees
  float specularstrength = max(0.0, dot(r, v));
  specularstrength = pow(specularstrength, 30.0);
  // reflected lights towards viewer considering reflection direction and shininess parameter
  vec3 ambientTerm = reflectance * Lindirect;
  vec3 diffuseTerm = reflectance * Lsurf;
  vec3 specularTerm = reflectanceWhite * Lsurf * specularstrength;
  vec3 Lcam = ambientTerm * 0.4 + diffuseTerm + specularTerm;
  // write color to model
  gl_FragColor = vec4(Lcam, 1.0);
}