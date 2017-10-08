import { BrowserPolicy } from 'meteor/browser-policy-common';

BrowserPolicy.content.allowEval();

BrowserPolicy.content.allowOriginForAll('*.googleusercontent.com');
BrowserPolicy.content.allowOriginForAll('*.googleapis.com');
BrowserPolicy.content.allowOriginForAll('*.gstatic.com');
BrowserPolicy.content.allowOriginForAll('*.google-analytics.com');
BrowserPolicy.content.allowOriginForAll('*.google.com');
BrowserPolicy.content.allowOriginForAll('*.cloudflare.com');
BrowserPolicy.content.allowOriginForAll('*.stripe.com');
BrowserPolicy.content.allowOriginForAll('*.cdnjs.com');
BrowserPolicy.content.allowOriginForAll('*.ionicframework.com');
BrowserPolicy.content.allowOriginForAll('*.wrld3d.com');
BrowserPolicy.content.allowOriginForAll('*.facebook.com');
BrowserPolicy.content.allowOriginForAll('*.facebook.net');
BrowserPolicy.content.allowOriginForAll('scontent.xx.fbcdn.net');
BrowserPolicy.content.allowOriginForAll('blob:');
BrowserPolicy.content.allowOriginForAll('data:');