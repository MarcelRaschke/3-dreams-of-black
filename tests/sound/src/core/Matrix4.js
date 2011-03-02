/**
 * @author mr.doob / http://mrdoob.com/
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author jordi_ros / http://plattsoft.com
 * @author D1plo1d / http://github.com/D1plo1d
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 */

THREE.Matrix4 = function ( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {

	this.n11 = n11 || 1; this.n12 = n12 || 0; this.n13 = n13 || 0; this.n14 = n14 || 0;
	this.n21 = n21 || 0; this.n22 = n22 || 1; this.n23 = n23 || 0; this.n24 = n24 || 0;
	this.n31 = n31 || 0; this.n32 = n32 || 0; this.n33 = n33 || 1; this.n34 = n34 || 0;
	this.n41 = n41 || 0; this.n42 = n42 || 0; this.n43 = n43 || 0; this.n44 = n44 || 1;

	this.flat = new Array( 16 );
	this.m33 = new THREE.Matrix3();

};

THREE.Matrix4.prototype = {

	identity: function () {

		this.n11 = 1; this.n12 = 0; this.n13 = 0; this.n14 = 0;
		this.n21 = 0; this.n22 = 1; this.n23 = 0; this.n24 = 0;
		this.n31 = 0; this.n32 = 0; this.n33 = 1; this.n34 = 0;
		this.n41 = 0; this.n42 = 0; this.n43 = 0; this.n44 = 1;

		return this;

	},

	set: function ( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {

		this.n11 = n11; this.n12 = n12; this.n13 = n13; this.n14 = n14;
		this.n21 = n21; this.n22 = n22; this.n23 = n23; this.n24 = n24;
		this.n31 = n31; this.n32 = n32; this.n33 = n33; this.n34 = n34;
		this.n41 = n41; this.n42 = n42; this.n43 = n43; this.n44 = n44;

		return this;

	},

	copy: function ( m ) {

		this.n11 = m.n11; this.n12 = m.n12; this.n13 = m.n13; this.n14 = m.n14;
		this.n21 = m.n21; this.n22 = m.n22; this.n23 = m.n23; this.n24 = m.n24;
		this.n31 = m.n31; this.n32 = m.n32; this.n33 = m.n33; this.n34 = m.n34;
		this.n41 = m.n41; this.n42 = m.n42; this.n43 = m.n43; this.n44 = m.n44;

		return this;

	},

	lookAt: function ( eye, center, up ) {

/*		var x = THREE.Matrix4.__tmpVec1, y = THREE.Matrix4.__tmpVec2, z = THREE.Matrix4.__tmpVec3;

		z.sub( eye, center ).normalize();
		x.cross( up, z ).normalize();
		y.cross( z, x ).normalize();

		this.n11 = x.x; this.n12 = x.y; this.n13 = x.z; this.n14 = - x.dot( eye );
		this.n21 = y.x; this.n22 = y.y; this.n23 = y.z; this.n24 = - y.dot( eye );
		this.n31 = z.x; this.n32 = z.y; this.n33 = z.z; this.n34 = - z.dot( eye );
		this.n41 = 0; this.n42 = 0; this.n43 = 0; this.n44 = 1;
*/

		var x = THREE.Matrix4.__tmpVec1, y = THREE.Matrix4.__tmpVec2, z = THREE.Matrix4.__tmpVec3;

		z.sub( eye, center ).normalize();
		x.cross( up, z ).normalize();
		y.cross( z, x ).normalize();

		this.n11 = x.x; this.n12 = y.x; this.n13 = z.x; this.n14 = eye.x;
		this.n21 = x.y; this.n22 = y.y; this.n23 = z.y; this.n24 = eye.y;
		this.n31 = x.z; this.n32 = y.z; this.n33 = z.z; this.n34 = eye.z;

		return this;
	},

	multiplyVector3: function ( v ) {

		var vx = v.x, vy = v.y, vz = v.z,
		d = 1 / ( this.n41 * vx + this.n42 * vy + this.n43 * vz + this.n44 );

		v.x = ( this.n11 * vx + this.n12 * vy + this.n13 * vz + this.n14 ) * d;
		v.y = ( this.n21 * vx + this.n22 * vy + this.n23 * vz + this.n24 ) * d;
		v.z = ( this.n31 * vx + this.n32 * vy + this.n33 * vz + this.n34 ) * d;

		return v;

	},

	multiplyVector3OnlyZ: function( v ) {

		var vx = v.x, vy = v.y, vz = v.z,
		d = 1 / ( this.n41 * vx + this.n42 * vy + this.n43 * vz + this.n44 );

		return ( this.n31 * vx + this.n32 * vy + this.n33 * vz + this.n34 ) * d;

	},

	multiplyVector4: function ( v ) {

		var vx = v.x, vy = v.y, vz = v.z, vw = v.w;

		v.x = this.n11 * vx + this.n12 * vy + this.n13 * vz + this.n14 * vw;
		v.y = this.n21 * vx + this.n22 * vy + this.n23 * vz + this.n24 * vw;
		v.z = this.n31 * vx + this.n32 * vy + this.n33 * vz + this.n34 * vw;
		v.w = this.n41 * vx + this.n42 * vy + this.n43 * vz + this.n44 * vw;

		return v;

	},

	crossVector: function ( a ) {

		var v = new THREE.Vector4();

		v.x = this.n11 * a.x + this.n12 * a.y + this.n13 * a.z + this.n14 * a.w;
		v.y = this.n21 * a.x + this.n22 * a.y + this.n23 * a.z + this.n24 * a.w;
		v.z = this.n31 * a.x + this.n32 * a.y + this.n33 * a.z + this.n34 * a.w;

		v.w = ( a.w ) ? this.n41 * a.x + this.n42 * a.y + this.n43 * a.z + this.n44 * a.w : 1;

		return v;

	},

	multiply: function ( a, b ) {

		var a11 = a.n11, a12 = a.n12, a13 = a.n13, a14 = a.n14,
		a21 = a.n21, a22 = a.n22, a23 = a.n23, a24 = a.n24,
		a31 = a.n31, a32 = a.n32, a33 = a.n33, a34 = a.n34,
		a41 = a.n41, a42 = a.n42, a43 = a.n43, a44 = a.n44,

		b11 = b.n11, b12 = b.n12, b13 = b.n13, b14 = b.n14,
		b21 = b.n21, b22 = b.n22, b23 = b.n23, b24 = b.n24,
		b31 = b.n31, b32 = b.n32, b33 = b.n33, b34 = b.n34,
		b41 = b.n41, b42 = b.n42, b43 = b.n43, b44 = b.n44;

		this.n11 = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
		this.n12 = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
		this.n13 = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
		this.n14 = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

		this.n21 = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
		this.n22 = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
		this.n23 = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
		this.n24 = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

		this.n31 = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
		this.n32 = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
		this.n33 = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
		this.n34 = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

		this.n41 = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
		this.n42 = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
		this.n43 = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
		this.n44 = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

		return this;

	},

	multiplyToArray: function ( a, b, r ) {

		var a11 = a.n11, a12 = a.n12, a13 = a.n13, a14 = a.n14,
		a21 = a.n21, a22 = a.n22, a23 = a.n23, a24 = a.n24,
		a31 = a.n31, a32 = a.n32, a33 = a.n33, a34 = a.n34,
		a41 = a.n41, a42 = a.n42, a43 = a.n43, a44 = a.n44,

		b11 = b.n11, b12 = b.n12, b13 = b.n13, b14 = b.n14,
		b21 = b.n21, b22 = b.n22, b23 = b.n23, b24 = b.n24,
		b31 = b.n31, b32 = b.n32, b33 = b.n33, b34 = b.n34,
		b41 = b.n41, b42 = b.n42, b43 = b.n43, b44 = b.n44;

		this.n11 = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
		this.n12 = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
		this.n13 = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
		this.n14 = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

		this.n21 = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
		this.n22 = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
		this.n23 = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
		this.n24 = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

		this.n31 = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
		this.n32 = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
		this.n33 = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
		this.n34 = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

		this.n41 = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
		this.n42 = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
		this.n43 = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
		this.n44 = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

		r[ 0 ] = this.n11;
		r[ 1 ] = this.n21;
		r[ 2 ] = this.n31;
		r[ 3 ] = this.n41;

		r[ 4 ] = this.n12;
		r[ 5 ] = this.n22;
		r[ 6 ] = this.n32;
		r[ 7 ] = this.n42;

		r[ 8 ]  = this.n13;
		r[ 9 ]  = this.n23;
		r[ 10 ] = this.n33;
		r[ 11 ] = this.n43;

		r[ 12 ] = this.n14;
		r[ 13 ] = this.n24;
		r[ 14 ] = this.n34;
		r[ 15 ] = this.n44;

		return this;

	},

	multiplySelf: function ( m ) {

		var n11 = this.n11, n12 = this.n12, n13 = this.n13, n14 = this.n14,
		n21 = this.n21, n22 = this.n22, n23 = this.n23, n24 = this.n24,
		n31 = this.n31, n32 = this.n32, n33 = this.n33, n34 = this.n34,
		n41 = this.n41, n42 = this.n42, n43 = this.n43, n44 = this.n44,
		mn11 = m.n11, mn21 = m.n21, mn31 = m.n31, mn41 = m.n41,
		mn12 = m.n12, mn22 = m.n22, mn32 = m.n32, mn42 = m.n42,
		mn13 = m.n13, mn23 = m.n23, mn33 = m.n33, mn43 = m.n43,
		mn14 = m.n14, mn24 = m.n24, mn34 = m.n34, mn44 = m.n44;

		this.n11 = n11 * mn11 + n12 * mn21 + n13 * mn31 + n14 * mn41;
		this.n12 = n11 * mn12 + n12 * mn22 + n13 * mn32 + n14 * mn42;
		this.n13 = n11 * mn13 + n12 * mn23 + n13 * mn33 + n14 * mn43;
		this.n14 = n11 * mn14 + n12 * mn24 + n13 * mn34 + n14 * mn44;

		this.n21 = n21 * mn11 + n22 * mn21 + n23 * mn31 + n24 * mn41;
		this.n22 = n21 * mn12 + n22 * mn22 + n23 * mn32 + n24 * mn42;
		this.n23 = n21 * mn13 + n22 * mn23 + n23 * mn33 + n24 * mn43;
		this.n24 = n21 * mn14 + n22 * mn24 + n23 * mn34 + n24 * mn44;

		this.n31 = n31 * mn11 + n32 * mn21 + n33 * mn31 + n34 * mn41;
		this.n32 = n31 * mn12 + n32 * mn22 + n33 * mn32 + n34 * mn42;
		this.n33 = n31 * mn13 + n32 * mn23 + n33 * mn33 + n34 * mn43;
		this.n34 = n31 * mn14 + n32 * mn24 + n33 * mn34 + n34 * mn44;

		this.n41 = n41 * mn11 + n42 * mn21 + n43 * mn31 + n44 * mn41;
		this.n42 = n41 * mn12 + n42 * mn22 + n43 * mn32 + n44 * mn42;
		this.n43 = n41 * mn13 + n42 * mn23 + n43 * mn33 + n44 * mn43;
		this.n44 = n41 * mn14 + n42 * mn24 + n43 * mn34 + n44 * mn44;

		return this;

	},

	multiplyScalar: function ( s ) {

		this.n11 *= s; this.n12 *= s; this.n13 *= s; this.n14 *= s;
		this.n21 *= s; this.n22 *= s; this.n23 *= s; this.n24 *= s;
		this.n31 *= s; this.n32 *= s; this.n33 *= s; this.n34 *= s;
		this.n41 *= s; this.n42 *= s; this.n43 *= s; this.n44 *= s;

		return this;

	},

	determinant: function () {

		var n11 = this.n11, n12 = this.n12, n13 = this.n13, n14 = this.n14,
		n21 = this.n21, n22 = this.n22, n23 = this.n23, n24 = this.n24,
		n31 = this.n31, n32 = this.n32, n33 = this.n33, n34 = this.n34,
		n41 = this.n41, n42 = this.n42, n43 = this.n43, n44 = this.n44;

		//TODO: make this more efficient
		//( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )
		return (
			n14 * n23 * n32 * n41-
			n13 * n24 * n32 * n41-
			n14 * n22 * n33 * n41+
			n12 * n24 * n33 * n41+

			n13 * n22 * n34 * n41-
			n12 * n23 * n34 * n41-
			n14 * n23 * n31 * n42+
			n13 * n24 * n31 * n42+

			n14 * n21 * n33 * n42-
			n11 * n24 * n33 * n42-
			n13 * n21 * n34 * n42+
			n11 * n23 * n34 * n42+

			n14 * n22 * n31 * n43-
			n12 * n24 * n31 * n43-
			n14 * n21 * n32 * n43+
			n11 * n24 * n32 * n43+

			n12 * n21 * n34 * n43-
			n11 * n22 * n34 * n43-
			n13 * n22 * n31 * n44+
			n12 * n23 * n31 * n44+

			n13 * n21 * n32 * n44-
			n11 * n23 * n32 * n44-
			n12 * n21 * n33 * n44+
			n11 * n22 * n33 * n44 );

	},

	transpose: function () {

		function swap( obj, p1, p2 ) {

			var aux = obj[ p1 ];
			obj[ p1 ] = obj[ p2 ];
			obj[ p2 ] = aux;

		}

		swap( this, 'n21', 'n12' );
		swap( this, 'n31', 'n13' );
		swap( this, 'n32', 'n23' );
		swap( this, 'n41', 'n14' );
		swap( this, 'n42', 'n24' );
		swap( this, 'n43', 'n34' );

		return this;

	},

	clone: function () {

		var m = new THREE.Matrix4();

		m.n11 = this.n11; m.n12 = this.n12; m.n13 = this.n13; m.n14 = this.n14;
		m.n21 = this.n21; m.n22 = this.n22; m.n23 = this.n23; m.n24 = this.n24;
		m.n31 = this.n31; m.n32 = this.n32; m.n33 = this.n33; m.n34 = this.n34;
		m.n41 = this.n41; m.n42 = this.n42; m.n43 = this.n43; m.n44 = this.n44;

		return m;

	},

	flatten: function() {

		var flat = this.flat;

		flat[ 0 ] = this.n11;
		flat[ 1 ] = this.n21;
		flat[ 2 ] = this.n31;
		flat[ 3 ] = this.n41;

		flat[ 4 ] = this.n12;
		flat[ 5 ] = this.n22;
		flat[ 6 ] = this.n32;
		flat[ 7 ] = this.n42;

		flat[ 8 ]  = this.n13;
		flat[ 9 ]  = this.n23;
		flat[ 10 ] = this.n33;
		flat[ 11 ] = this.n43;

		flat[ 12 ] = this.n14;
		flat[ 13 ] = this.n24;
		flat[ 14 ] = this.n34;
		flat[ 15 ] = this.n44;

		return flat;

	},

	flattenToArray: function( flat ) {

		flat[ 0 ] = this.n11;
		flat[ 1 ] = this.n21;
		flat[ 2 ] = this.n31;
		flat[ 3 ] = this.n41;

		flat[ 4 ] = this.n12;
		flat[ 5 ] = this.n22;
		flat[ 6 ] = this.n32;
		flat[ 7 ] = this.n42;

		flat[ 8 ]  = this.n13;
		flat[ 9 ]  = this.n23;
		flat[ 10 ] = this.n33;
		flat[ 11 ] = this.n43;

		flat[ 12 ] = this.n14;
		flat[ 13 ] = this.n24;
		flat[ 14 ] = this.n34;
		flat[ 15 ] = this.n44;

		return flat;

	},

	flattenToArrayOffset: function( flat, offset ) {

		flat[ offset ] 	   = this.n11;
		flat[ offset + 1 ] = this.n21;
		flat[ offset + 2 ] = this.n31;
		flat[ offset + 3 ] = this.n41;

		flat[ offset + 4 ] = this.n12;
		flat[ offset + 5 ] = this.n22;
		flat[ offset + 6 ] = this.n32;
		flat[ offset + 7 ] = this.n42;

		flat[ offset + 8 ]  = this.n13;
		flat[ offset + 9 ]  = this.n23;
		flat[ offset + 10 ] = this.n33;
		flat[ offset + 11 ] = this.n43;

		flat[ offset + 12 ] = this.n14;
		flat[ offset + 13 ] = this.n24;
		flat[ offset + 14 ] = this.n34;
		flat[ offset + 15 ] = this.n44;

		return flat;

	},

	setTranslation: function( x, y, z ) {

		this.set( 1, 0, 0, x,
				  0, 1, 0, y,
				  0, 0, 1, z,
				  0, 0, 0, 1 );

		return this;

	},

	setScale: function( x, y, z ) {

		this.set( x, 0, 0, 0,
				  0, y, 0, 0,
				  0, 0, z, 0,
				  0, 0, 0, 1 );

		return this;

	},

	setRotX: function( theta ) {

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set( 1, 0,  0, 0,
				  0, c, -s, 0,
				  0, s,  c, 0,
				  0, 0,  0, 1 );

		return this;

	},

	setRotY: function( theta ) {

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set( c, 0, s, 0,
				  0, 1, 0, 0,
				 -s, 0, c, 0,
				  0, 0, 0, 1 );

		return this;

	},

	setRotZ: function( theta ) {

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set( c, -s, 0, 0,
				  s,  c, 0, 0,
				  0,  0, 1, 0,
				  0,  0, 0, 1 );

		return this;

	},

	setRotAxis: function( axis, angle ) {

		//Based on http://www.gamedev.net/reference/articles/article1199.asp

		var c = Math.cos( angle ),
			s = Math.sin( angle ),
			t = 1 - c,
			x = axis.x, y = axis.y, z = axis.z,
			tx = t * x, ty = t * y;

		 this.set( tx * x + c, tx * y - s * z, tx * z + s * y, 0,
				  tx * y + s * z, ty * y + c, ty * z - s * x, 0,
				  tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
				  0, 0, 0, 1 );

		 return this;

	},

	setPosition: function( vec3 ) {

		this.n14 = vec3.x;
		this.n24 = vec3.y;
		this.n34 = vec3.z;

		return this;

	},
	/*
	setRotationFromEuler: function( vec3 ) {

		//var c = Math.PI / 180;
		var x = vec3.x,// * c;
			y = vec3.y,// * c;
			z = vec3.z,// * c;

			ch = Math.cos( y  ),
			sh = Math.sin( y  ),
			ca = Math.cos( -z ),
			sa = Math.sin( -z ),
			cb = Math.cos( x  ),
			sb = Math.sin( x  ),

			chsa = ch * sa,
			shsa = sh * sa;

	    this.n11 = ch * ca;
	    this.n12 = sh * sb - chsa * cb;
	    this.n13 = chsa * sb + sh * cb;

	    this.n21 = sa;
	    this.n22 = ca * cb;
	    this.n23 = - ca * sb;

	    this.n31 = - sh * ca;
	    this.n32 = shsa * cb + ch * sb;
	    this.n33 = - shsa * sb + ch * cb;

	},
	*/

	setRotationFromEuler: function( vec3 ) {

		var x = vec3.x, y = vec3.y, z = vec3.z,
		a = Math.cos( x ), b = Math.sin( x ),
		c = Math.cos( y ), d = Math.sin( y ),
		e = Math.cos( z ), f = Math.sin( z ),
		ad = a * d, bd = b * d;

		this.n11 = c * e;
		this.n12 = - c * f;
		this.n13 = d;

		this.n21 = bd * e + a * f;
		this.n22 = - bd * f + a * e;
		this.n23 = - b * c;

		this.n31 = - ad * e + b * f;
		this.n32 = ad * f + b * e;
		this.n33 = a * c;

        },

	setRotationFromQuaternion: function( quat ) {

		var x = quat.x, y = quat.y, z = quat.z, w = quat.w,

			x2 = x + x,
			y2 = y + y,
			z2 = z + z,

			xx = x * x2,
			xy = x * y2,
			xz = x * z2,

			yy = y * y2,
			yz = y * z2,
			zz = z * z2,

			wx = w * x2,
			wy = w * y2,
			wz = w * z2;

		this.n11 = 1 - ( yy + zz );
		this.n12 = xy - wz;
		this.n13 = xz + wy;

		this.n21 = xy + wz;
		this.n22 = 1 - ( xx + zz );
		this.n23 = yz - wx;

		this.n31 = xz - wy;
		this.n32 = yz + wx;
		this.n33 = 1 - ( xx + yy );

	},

	scale: function( vec3 ) {

		var x = vec3.x, y = vec3.y, z = vec3.z;

		this.n11 *= x; this.n12 *= x; this.n13 *= x;
		this.n21 *= y; this.n22 *= y; this.n23 *= y;
		this.n31 *= z; this.n32 *= z; this.n33 *= z;

		return this;

	},

	extractRotationMatrix: function( m ) {

		m.n11 = this.n11; m.n12 = this.n12; m.n13 = this.n13; m.n14 = 0;
		m.n21 = this.n21; m.n22 = this.n22; m.n23 = this.n23; m.n24 = 0;
		m.n31 = this.n31; m.n32 = this.n32; m.n33 = this.n33; m.n34 = 0;
		m.n41 = 0; m.n42 = 0; m.n43 = 0; m.n44 = 1;

	},

	toString: function() {

		return  "| " + this.n11 + " " + this.n12 + " " + this.n13 + " " + this.n14 + " |\n" +
			"| " + this.n21 + " " + this.n22 + " " + this.n23 + " " + this.n24 + " |\n" +
			"| " + this.n31 + " " + this.n32 + " " + this.n33 + " " + this.n34 + " |\n" +
			"| " + this.n41 + " " + this.n42 + " " + this.n43 + " " + this.n44 + " |";

	}

};

THREE.Matrix4.translationMatrix = function ( x, y, z ) {

	var m = new THREE.Matrix4();

	m.setTranslation( x, y, z );

	return m;

};

THREE.Matrix4.scaleMatrix = function ( x, y, z ) {

	var m = new THREE.Matrix4();

	m.setScale( x, y, z );

	return m;

};

THREE.Matrix4.rotationXMatrix = function ( theta ) {

	var m = new THREE.Matrix4();

	m.setRotX( theta );

	return m;

};

THREE.Matrix4.rotationYMatrix = function ( theta ) {

	var m = new THREE.Matrix4();

	m.setRotY( theta );

	return m;

};

THREE.Matrix4.rotationZMatrix = function ( theta ) {

	var m = new THREE.Matrix4();

	m.setRotZ( theta );

	return m;

};

THREE.Matrix4.rotationAxisAngleMatrix = function ( axis, angle ) {

	var m = new THREE.Matrix4();

	m.setRotAxis( axis, angle );

	return m;

};

THREE.Matrix4.makeInvert = function ( m1, m2 ) {

	// based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm

	var n11 = m1.n11, n12 = m1.n12, n13 = m1.n13, n14 = m1.n14,
		n21 = m1.n21, n22 = m1.n22, n23 = m1.n23, n24 = m1.n24,
		n31 = m1.n31, n32 = m1.n32, n33 = m1.n33, n34 = m1.n34,
		n41 = m1.n41, n42 = m1.n42, n43 = m1.n43, n44 = m1.n44;

	if( m2 === undefined ) m2 = new THREE.Matrix4();

	m2.n11 = n23*n34*n42 - n24*n33*n42 + n24*n32*n43 - n22*n34*n43 - n23*n32*n44 + n22*n33*n44;
	m2.n12 = n14*n33*n42 - n13*n34*n42 - n14*n32*n43 + n12*n34*n43 + n13*n32*n44 - n12*n33*n44;
	m2.n13 = n13*n24*n42 - n14*n23*n42 + n14*n22*n43 - n12*n24*n43 - n13*n22*n44 + n12*n23*n44;
	m2.n14 = n14*n23*n32 - n13*n24*n32 - n14*n22*n33 + n12*n24*n33 + n13*n22*n34 - n12*n23*n34;
	m2.n21 = n24*n33*n41 - n23*n34*n41 - n24*n31*n43 + n21*n34*n43 + n23*n31*n44 - n21*n33*n44;
	m2.n22 = n13*n34*n41 - n14*n33*n41 + n14*n31*n43 - n11*n34*n43 - n13*n31*n44 + n11*n33*n44;
	m2.n23 = n14*n23*n41 - n13*n24*n41 - n14*n21*n43 + n11*n24*n43 + n13*n21*n44 - n11*n23*n44;
	m2.n24 = n13*n24*n31 - n14*n23*n31 + n14*n21*n33 - n11*n24*n33 - n13*n21*n34 + n11*n23*n34;
	m2.n31 = n22*n34*n41 - n24*n32*n41 + n24*n31*n42 - n21*n34*n42 - n22*n31*n44 + n21*n32*n44;
	m2.n32 = n14*n32*n41 - n12*n34*n41 - n14*n31*n42 + n11*n34*n42 + n12*n31*n44 - n11*n32*n44;
	m2.n33 = n13*n24*n41 - n14*n22*n41 + n14*n21*n42 - n11*n24*n42 - n12*n21*n44 + n11*n22*n44;
	m2.n34 = n14*n22*n31 - n12*n24*n31 - n14*n21*n32 + n11*n24*n32 + n12*n21*n34 - n11*n22*n34;
	m2.n41 = n23*n32*n41 - n22*n33*n41 - n23*n31*n42 + n21*n33*n42 + n22*n31*n43 - n21*n32*n43;
	m2.n42 = n12*n33*n41 - n13*n32*n41 + n13*n31*n42 - n11*n33*n42 - n12*n31*n43 + n11*n32*n43;
	m2.n43 = n13*n22*n41 - n12*n23*n41 - n13*n21*n42 + n11*n23*n42 + n12*n21*n43 - n11*n22*n43;
	m2.n44 = n12*n23*n31 - n13*n22*n31 + n13*n21*n32 - n11*n23*n32 - n12*n21*n33 + n11*n22*n33;
	m2.multiplyScalar( 1 / m1.determinant() );

	return m2;

};

THREE.Matrix4.makeInvert2 = function( m1, m2 ) {
	
    var a00 = m1.n11, a01 = m1.n12, a02 = m1.n13, a03 = m1.n14;
    var a10 = m1.n21, a11 = m1.n22, a12 = m1.n23, a13 = m1.n24;
    var a20 = m1.n31, a21 = m1.n32, a22 = m1.n33, a23 = m1.n34;
    var a30 = m1.n41, a31 = m1.n42, a32 = m1.n43, a33 = m1.n44;
    
    var b00 = a00*a11 - a01*a10;
    var b01 = a00*a12 - a02*a10;
    var b02 = a00*a13 - a03*a10;
    var b03 = a01*a12 - a02*a11;
    var b04 = a01*a13 - a03*a11;
    var b05 = a02*a13 - a03*a12;
    var b06 = a20*a31 - a21*a30;
    var b07 = a20*a32 - a22*a30;
    var b08 = a20*a33 - a23*a30;
    var b09 = a21*a32 - a22*a31;
    var b10 = a21*a33 - a23*a31;
    var b11 = a22*a33 - a23*a32;
    
    var invDet = 1/( b00*b11 - b01*b10 + b02*b09 + b03*b08 - b04*b07 + b05*b06);
 
 	if( m2 === undefined ) m2 = new THREE.Matrix4();
   
    m2.n11 = (  a11*b11 - a12*b10 + a13*b09 ) * invDet;
    m2.n12 = ( -a01*b11 + a02*b10 - a03*b09 ) * invDet;
    m2.n13 = (  a31*b05 - a32*b04 + a33*b03 ) * invDet;
    m2.n14 = ( -a21*b05 + a22*b04 - a23*b03 ) * invDet;
    m2.n21 = ( -a10*b11 + a12*b08 - a13*b07 ) * invDet;
    m2.n22 = (  a00*b11 - a02*b08 + a03*b07 ) * invDet;
    m2.n23 = ( -a30*b05 + a32*b02 - a33*b01 ) * invDet;
    m2.n24 = (  a20*b05 - a22*b02 + a23*b01 ) * invDet;
    m2.n31 = (  a10*b10 - a11*b08 + a13*b06 ) * invDet;
    m2.n32 = ( -a00*b10 + a01*b08 - a03*b06 ) * invDet;
    m2.n33 = (  a30*b04 - a31*b02 + a33*b00 ) * invDet;
    m2.n34 = ( -a20*b04 + a21*b02 - a23*b00 ) * invDet;
    m2.n41 = ( -a10*b09 + a11*b07 - a12*b06 ) * invDet;
    m2.n42 = (  a00*b09 - a01*b07 + a02*b06 ) * invDet;
    m2.n43 = ( -a30*b03 + a31*b01 - a32*b00 ) * invDet;
    m2.n44 = (  a20*b03 - a21*b01 + a22*b00 ) * invDet;
    
    return m2;
}

/*
THREE.Matrix4.makeInvert = function ( m1 ) {

	var m2 = new THREE.Matrix4();
	
	return THREE.Matrix4.makeInvertTo( m1, m2 );

};

THREE.Matrix4.makeInvertTo = function ( m1, m2 ) {

	var n11 = m1.n11, n12 = m1.n12, n13 = m1.n13, n14 = m1.n14,
		n21 = m1.n21, n22 = m1.n22, n23 = m1.n23, n24 = m1.n24,
		n31 = m1.n31, n32 = m1.n32, n33 = m1.n33, n34 = m1.n34,
		n41 = m1.n41, n42 = m1.n42, n43 = m1.n43, n44 = m1.n44;

	//TODO: make this more efficient
	//( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )

	m2.n11 = n23*n34*n42 - n24*n33*n42 + n24*n32*n43 - n22*n34*n43 - n23*n32*n44 + n22*n33*n44;
	m2.n12 = n14*n33*n42 - n13*n34*n42 - n14*n32*n43 + n12*n34*n43 + n13*n32*n44 - n12*n33*n44;
	m2.n13 = n13*n24*n42 - n14*n23*n42 + n14*n22*n43 - n12*n24*n43 - n13*n22*n44 + n12*n23*n44;
	m2.n14 = n14*n23*n32 - n13*n24*n32 - n14*n22*n33 + n12*n24*n33 + n13*n22*n34 - n12*n23*n34;
	m2.n21 = n24*n33*n41 - n23*n34*n41 - n24*n31*n43 + n21*n34*n43 + n23*n31*n44 - n21*n33*n44;
	m2.n22 = n13*n34*n41 - n14*n33*n41 + n14*n31*n43 - n11*n34*n43 - n13*n31*n44 + n11*n33*n44;
	m2.n23 = n14*n23*n41 - n13*n24*n41 - n14*n21*n43 + n11*n24*n43 + n13*n21*n44 - n11*n23*n44;
	m2.n24 = n13*n24*n31 - n14*n23*n31 + n14*n21*n33 - n11*n24*n33 - n13*n21*n34 + n11*n23*n34;
	m2.n31 = n22*n34*n41 - n24*n32*n41 + n24*n31*n42 - n21*n34*n42 - n22*n31*n44 + n21*n32*n44;
	m2.n32 = n14*n32*n41 - n12*n34*n41 - n14*n31*n42 + n11*n34*n42 + n12*n31*n44 - n11*n32*n44;
	m2.n33 = n13*n24*n41 - n14*n22*n41 + n14*n21*n42 - n11*n24*n42 - n12*n21*n44 + n11*n22*n44;
	m2.n34 = n14*n22*n31 - n12*n24*n31 - n14*n21*n32 + n11*n24*n32 + n12*n21*n34 - n11*n22*n34;
	m2.n41 = n23*n32*n41 - n22*n33*n41 - n23*n31*n42 + n21*n33*n42 + n22*n31*n43 - n21*n32*n43;
	m2.n42 = n12*n33*n41 - n13*n32*n41 + n13*n31*n42 - n11*n33*n42 - n12*n31*n43 + n11*n32*n43;
	m2.n43 = n13*n22*n41 - n12*n23*n41 - n13*n21*n42 + n11*n23*n42 + n12*n21*n43 - n11*n22*n43;
	m2.n44 = n12*n23*n31 - n13*n22*n31 + n13*n21*n32 - n11*n23*n32 - n12*n21*n33 + n11*n22*n33;
	m2.multiplyScalar( 1 / m1.determinant() );

	return m2;

};
*/
THREE.Matrix4.makeInvert3x3 = function ( m1 ) {

	// input:  THREE.Matrix4, output: THREE.Matrix3
	// ( based on http://code.google.com/p/webgl-mjs/ )

	var m33 = m1.m33,
		m33m = m33.m,

	a11 =   m1.n33 * m1.n22 - m1.n32 * m1.n23,
	a21 = - m1.n33 * m1.n21 + m1.n31 * m1.n23,
	a31 =   m1.n32 * m1.n21 - m1.n31 * m1.n22,
	a12 = - m1.n33 * m1.n12 + m1.n32 * m1.n13,
	a22 =   m1.n33 * m1.n11 - m1.n31 * m1.n13,
	a32 = - m1.n32 * m1.n11 + m1.n31 * m1.n12,
	a13 =   m1.n23 * m1.n12 - m1.n22 * m1.n13,
	a23 = - m1.n23 * m1.n11 + m1.n21 * m1.n13,
	a33 =   m1.n22 * m1.n11 - m1.n21 * m1.n12,
	
	det = m1.n11 * a11 + m1.n21 * a12 + m1.n31 * a13,
	
	idet;

	// no inverse
	if (det == 0) throw "matrix not invertible";

	idet = 1.0 / det;

	m33m[ 0 ] = idet * a11; m33m[ 1 ] = idet * a21; m33m[ 2 ] = idet * a31;
	m33m[ 3 ] = idet * a12; m33m[ 4 ] = idet * a22; m33m[ 5 ] = idet * a32;
	m33m[ 6 ] = idet * a13; m33m[ 7 ] = idet * a23; m33m[ 8 ] = idet * a33;

	return m33;

}

THREE.Matrix4.makeFrustum = function ( left, right, bottom, top, near, far ) {

	var m, x, y, a, b, c, d;

	m = new THREE.Matrix4();
	x = 2 * near / ( right - left );
	y = 2 * near / ( top - bottom );
	a = ( right + left ) / ( right - left );
	b = ( top + bottom ) / ( top - bottom );
	c = - ( far + near ) / ( far - near );
	d = - 2 * far * near / ( far - near );

	m.n11 = x;  m.n12 = 0;  m.n13 = a;   m.n14 = 0;
	m.n21 = 0;  m.n22 = y;  m.n23 = b;   m.n24 = 0;
	m.n31 = 0;  m.n32 = 0;  m.n33 = c;   m.n34 = d;
	m.n41 = 0;  m.n42 = 0;  m.n43 = - 1; m.n44 = 0;

	return m;

};

THREE.Matrix4.makePerspective = function ( fov, aspect, near, far ) {

	var ymax, ymin, xmin, xmax;

	ymax = near * Math.tan( fov * Math.PI / 360 );
	ymin = - ymax;
	xmin = ymin * aspect;
	xmax = ymax * aspect;

	return THREE.Matrix4.makeFrustum( xmin, xmax, ymin, ymax, near, far );

};

THREE.Matrix4.makeOrtho = function ( left, right, top, bottom, near, far ) {

	var m, x, y, z, w, h, p;

	m = new THREE.Matrix4();
	w = right - left;
	h = top - bottom;
	p = far - near;
	x = ( right + left ) / w;
	y = ( top + bottom ) / h;
	z = ( far + near ) / p;

	m.n11 = 2 / w; m.n12 = 0;     m.n13 = 0;      m.n14 = -x;
	m.n21 = 0;     m.n22 = 2 / h; m.n23 = 0;      m.n24 = -y;
	m.n31 = 0;     m.n32 = 0;     m.n33 = -2 / p; m.n34 = -z;
	m.n41 = 0;     m.n42 = 0;     m.n43 = 0;      m.n44 = 1;

	return m;

};

THREE.Matrix4.__tmpVec1 = new THREE.Vector3();
THREE.Matrix4.__tmpVec2 = new THREE.Vector3();
THREE.Matrix4.__tmpVec3 = new THREE.Vector3();
