angular.module('app.services', [])

.factory('ref', [function(){
return new Firebase("https://jikimu.firebaseio.com/");
}])
.factory('db',function(){
	return{
		get:function(url){
			return new Firebase(url);
		},
		user:function()
		{
		return new Firebase("https://jikimu.firebaseio.com/").getAuth();

		}
	}
})

.service('BlankService', [function(){

}]);

// .service('LoginService', function($q) {
//     return {
//         loginUser: function(name, pw) {
//             var deferred = $q.defer();
//             var promise = deferred.promise;
 
//             if (name == 'user' && pw == 'secret') {
//                 deferred.resolve('Welcome ' + name + '!');
//             } else {
//                 deferred.reject('Wrong credentials.');
//             }
//             promise.success = function(fn) {
//                 promise.then(fn);
//                 return promise;
//             }
//             promise.error = function(fn) {
//                 promise.then(null, fn);
//                 return promise;
//             }
//             return promise;
//         }
//     }
// })