angular.module('app.controllers', [])
  
.controller('generalInfoCtrl', function($scope) {

})
   
.controller('riskLevelCtrl', function($scope) {

})
   
.controller('weightCtrl',['$scope','db','ref', function(scope,db,refa) {
	scope.weight = {}
	 
	scope.submitweight = function() {

	var user=db.user();
	if(!user)
		{
			state.go("login");
		}
	if(user)
	{
		console.log("Hello");
		var ref = new Firebase("https://jikimu.firebaseio.com/");
		console.log(scope.weight);
		 	scope.weight.birthda= scope.weight.birthday.toString();
		    var childRef = ref.child("weight").child(user.uid).push(scope.weight,function(er,dat)
		{
			if(!er)
			{
				console.log("weight  successful");
			}
			else
			{
				console.log("Failed to update");
			}
		});
		   
		    scope.retrieve();
}
	    		// ref.child("weight").child(data.uid).set(
	    		// 	scope.usera
  };

  

//   scope.firebaseObj = {}
//   scope.wtArray = function(){

//   }


// $scope.data = [];
//  for (var i = 0; i < $scope.firebaseObj.length; i++) {
//       $scope.data[i]['name']= $scope.firebaseObj[i].name;
//       $scope.data[i]['description']= $scope.firebaseObj[i].description;
//       $scope.data[i]['type'] =  $scope.firebaseObj[i].type;
//       $scope.data[i]['etc1'] =  $scope.firebaseObj[i].etc1;
//       $scope.data[i]['etc12'] =  $scope.firebaseObj[i].etc2;
//       .
//       .
//       . 
//  }


}])
   
.controller('bloodPressureCtrl', function($scope) {

})
   
.controller('profileCtrl',['$scope','ref','$state','$ionicPopup','db','$state', function(scope,ref,state,popup,db,state) {
	scope.prof={};
	//ref.unauth();
	
	 scope.show=function(data){
			 popup.alert({
  	              title: 'Success',
  	              content: JSON.stringify(data)
  	            }).then(function(res){
  	
  	              console.log('Test Alert Box');	  		  	             
  	              // $location.path("menu.generalInfo") 
  	            });

    		
	
		
  	        };
    scope.er=function(data){
    	  popup.alert({
  title: 'ERROR',
  content: data
}).then(function(){
// $location.path('menu.generalInfo') {
  console.log('Test Alert Box');              
	 });

    }
var user=ref.getAuth();
scope.d=0;
scope.risk={};
scope.risk.text="Waiting for results";
if(!user)
{
scope.er("Please login !!");
state.go("login");
}
else
{
var dat=ref.child("users").child(user.uid).toString();
var data=ref.child("pregnancy").child(user.uid).toString();
var dd=ref.child("srisk").child(user.uid).toString();
db.get(data).once("value",function(snap){
	var profa=snap.val();
	var d=new Date(profa.date);
	var n=new Date(profa.date);
	scope.duration=new Date(d.setDate(n.getDate()+252)) ;
});

db.get(dd).once("value",function(snap){
	
	var data=snap.val();
	console.log(data);
	if(snap.val())
{
	//alert(age(new Date(data.date)));
	//console.log(data.nonpregs)
	if(data.nonpregs)
	{
	if(data.nonpregs > 3)
	{
		scope.d++;
	}
	if(data.pregs <= 1)
	{
		scope.d++;
	}
	if(data.age > 35)
	{
		scope.d++;
	}
	if((data.pregs+data.nopregs) > 5)
	{
		scope.d++;
	}
	if(data.hyper)
	{
		scope.d++;

	}
	if(age(data.date) > 5)
	{
		scope.d++;
	}
}
else
{
	console.log("first");
	if(data.age>35 && data.hyper)
{
scope.risk.text="High Risk Level";
scope.risk.color="red";
}else if(data.age>35 || data.hyper)
{
scope.risk.text="Medium Risk Level";
scope.risk.color="orange";
}
else{
scope.risk.text="Low Risk Level";
scope.risk.color="green";
}
}
}
else
{
	alert("no dtaa")
	state.go("menu.subsequentPregnancy");
}
});

db.get(dat).once("value",function(snap){
var profa=snap.val();
//console.log(profa);

profa.birthday=new Date(profa.birthda);
scope.prof=profa;
//scope.show(snap.val());

});

console.log(dat);
}
scope.$watch('d',function(value)
{
console.log("change:"+value);
if(value < 3)
{
scope.risk.text="Low Risk Level";
scope.risk.color="green";
}
else if(value == 3 )
{
scope.risk.text="Medium Risk Level";
scope.risk.color="orange";
//state.go("menu.weightChart")
}
else
{
	scope.risk.text="High Risk Level";
scope.risk.color="red";
}
});
scope.update=function(){
	var user=db.user();
	if(user.uid)
	{
		scope.prof.birthda=scope.prof.birthday.toString();
		ref.child("users").child(user.uid).set(scope.prof,function(er,dat)
		{
			if(!er)
			{
				scope.show("Update successful");
			}
			else
			{
				scope.er("Failed to update");
			}
		})
	}
	else
	{
		scope.er("Not logged in");
	}
};



}])
      
.controller('signupCtrl',["$scope",'$ionicPopup','$location','$window','ref','$state',function(scope,popup,$location,$window,ref,state){
	 scope.user = {};
	 scope.usera={};

	  scope.submitlogin = function() {
	  	//alert("hello");
	
	 // 	console.log("betty");
	   if(scope.user.password != scope.cpassword)
	   {
		scope.er("Password Dont Match");
	   }
	   else
	   {
  	console.log("Registrating");

	    ref.createUser(scope.user


	    ,function(error,data){
	    	if(error)
	    	{
	    		console.log(error);
	    		scope.er(error.code);
	    	}else{
	    		
	    		scope.usera.birthda=scope.usera.birthday.toString();
	    		scope.usera.age=age(scope.usera.birthday);
	    		ref.child("users").child(data.uid).set(
	    			scope.usera
	    		);
	    		ref.authWithPassword(scope.user,function(er,data){
				if(er)
						{
							scope.er(er.code);

						}else
						{

							//scope.show("Logge");
							state.go("menu.home");

						}
	    		})
	    		console.log(data);
	    		scope.show("Registration successful");
	    	
	    }
	    console.log(scope.user);
	    
	  });
	}
	}
	   // if (response.success) {

    //                     FlashService.Success('Registration successful', true);
    //                     $location.path('/login');
    //                 } else {
    //                     FlashService.Error(response.message);
    //                     vm.dataLoading = false;
    //                 }

    scope.show=function(data){  
	 	 popup.alert({
	              title: 'Success',
	              content: data
	            }).then(function(res){
	
	              console.log('Test Alert Box');	  		  	             
	              // $location.path("menu.generalInfo") 
	            });   				
	
	        };
    scope.er=function(data){
    	  popup.alert({
  title: 'ERROR',
  content: JSON.stringify(data)
}).then(function(){
// $location.path('menu.generalInfo') {
  console.log('Test Alert Box');              
	 });

    }

	  // if(!$scope.submitlogin)
	  // {
	  
             

           
	  // }
	  
	  // $scope.showAlert=function(){
	  // 	  $ionicPopup.alert({
   //            title: 'Success',
   //            content: 'Hello World!!!'
   //          }).then(function(res) {
   //            console.log('Test Alert Box');
   //          });
	  // }
	      
  

}])
.controller("menuCtrl",['$scope','ref','db','$state',function(scope,ref,db,state){
var user=db.user();
console.log("menu");
if(!user)
{

	state.go("login");
}
}])
.controller("logoutCtrl",['$scope','ref','$ionicPopup','$state',function(scope,ref,popup,state){

ref.unauth();
state.go("login");
}])
   
.controller('loginCtrl',['$scope','$ionicPopup','ref','$state','db' ,function(scope,popup,ref,state,db) {
scope.data={};
var user=db.user();
if(user)
{
state.go("menu.home");
}



scope.login=function(){
	console.log("loggin");
if(!scope.data.email)
{
scope.er("username and password must be provided");
}
else
{
	
	
ref.authWithPassword(scope.data,function(error,data){

		if(error)
		{
			scope.er("Erro "+error);

		}else
		{

			scope.show("Login successful");
			state.go("menu.home");

		}


});
}

};
 scope.show=function(data){
		 				 popup.alert({
	  		  	              title: 'Success',
	  		  	              content: JSON.stringify(data)
	  		  	            }).then(function(res){
	  		  	
	  		  	              console.log('Test Alert Box');	  		  	             
	  		  	              // $location.path("menu.generalInfo") 
	  		  	            });
    			
				    		
    				
    					
	  		  	        };
	  		  	        scope.er=function(data){
	  		  	        	  popup.alert({
				              title: 'ERROR',
				              content: data
				            }).then(function(){
				// $location.path('menu.generalInfo') {
				              console.log('Test Alert Box');              
           					 });

	  		  	        }
}])
   
.controller('homeCtrl',['$scope','ref','$ionicPopup','$state' ,function(scope,ref,popup,state) {


scope.show=function(data){
		 				 popup.alert({
	  		  	              title: 'Success',
	  		  	              content: JSON.stringify(data)
	  		  	            }).then(function(res){
	  		  	
	  		  	              console.log('Test Alert Box');	  		  	             
	  		  	              // $location.path("menu.generalInfo") 
	  		  	            });
    			
				    		
    				
    					
	  		  	        };
scope.er=function(){
		popup.alert({
		title:"Please Login",
		content:"You are not logged in !!"
	}).then(function(){

	});
}


 
}])
   
.controller('firstTimePregnancyCtrl', ['$scope','ref','db','$state','$stateParams',function(scope,ref,db,state,params){
var user=db.user();
scope.p={};
if(!user)
{
	state.go("login");
}
var dat=ref.child('users').child(user.uid).toString();
db.get(dat).once("value",function(snap){
console.log(snap.val().age);
scope.p.age=snap.val().age;
});


}])
   
.controller('subsequentPregnancyCtrl', ['$scope','ref','db','$state','$stateParams',function(scope,ref,db,state,params){
scope.p={};
var user=db.user();
if(!user)
{
	state.go("login");
}
var dat=ref.child('users').child(user.uid).toString();
db.get(dat).once("value",function(snap){
console.log(snap.val().age);
scope.p.age=snap.val().age;
});
scope.save=function(){
	//alert(JSON.stringify(scope.p));
	scope.p.date=scope.p.dat.toString();
ref.child("srisk").child(user.uid).set(scope.p,function(er,data){
if(!er)
{
console.log("done");
state.go("menu.result");
}
else
{

}
});
}
}])
   
.controller("resultCtrl",['$scope','ref','db','$state','$stateParams','$ionicPopup',function(scope,ref,db,state,params,popup){
var user=db.user();
if(!user)
{
	state.go("login");	
}
scope.d=0;
scope.risk={};
var dat=ref.child("srisk").child(user.uid).toString();

scope.$watch('d',function(value)
{
//console.log("change:"+value);
if(value < 3)
{
		scope.risk.text="Low Risk Level";
scope.risk.color="green";
}
else if(value == 3 )
{
scope.risk.text="Medium Risk Level";
scope.risk.color="orange";
//state.go("menu.weightChart")
}
else
{
	scope.risk.text="High Risk Level";
scope.risk.color="red";
}
});


db.get(dat).once("value",function(dat){
	var data=dat.val();
	scope.ddate=new Date(data.date);	
if(dat)
{
	//alert(age(new Date(data.date)));
	//console.log(data.nonpregs)
	if(data.nonpregs > 2)
	{
		scope.d++;
	}
	if(data.pregs <= 1)
	{
		scope.d++;
	}
	if(data.age > 35)
	{
		scope.d++;
	}
	if((data.pregs+data.nopregs) > 5)
	{
		scope.d++;
	}
	if(data.hyper)
	{
		scope.d++;

	}
	if(age(data.date) > 5)
	{
		scope.d++;
	}
}
else
{
	alert("no dtaa")
	state.go("menu.subsequentPregnancy");
}
});


}])
.controller("calc",['$scope','ref','db','$state','$stateParams','$ionicPopup',function(scope,ref,db,state,params,popup){
scope.p={};
scope.sha=true;
scope.leo="hteuv";
scope.saves=function(){
	//alert(JSON.stringify(scope.p));
}
	
}])
.controller('calculateEDDCtrl', ['$scope','ref','db','$state','$stateParams','$ionicPopup',function(scope,ref,db,state,params,popup){
scope.p={};
scope.sha=true;
var user=db.user();
	if(!user)
		{
			state.go("login");
		}
		scope.leo="";
scope.ddd={};
scope.p={};
scope.aa=function(){
//	alert(JSON.stringify(scope.leo));
}
    scope.show=function(){  
	 	 popup.alert({
	              title: 'Success',
	              content: 'successful Registration'
	            }).then(function(res){
	
	              console.log('Test Alert Box');	  		  	             
	              // $location.path("menu.generalInfo") 
	            });   				
	
	        };
    scope.er=function(){
    	  popup.alert({
  title: 'ERROR',
  content: 'username or password is incorrect'
}).then(function(){
// $location.path('menu.generalInfo') {
  console.log('Test Alert Box');              
	 });

    }
    scope.calculate=function(){

    }
scope.saves=function()
{	
	//alert(JSON.stringify(scope.p));
	//scope.p.time=scope.time;
	//scope.p.date=data.toString();
		scope.p.date=scope.p.dat.toString();
		scope.p.da=scope.p.dat.toString();
	ref.child("pregnancy").child(user.uid).set(scope.p,function(er,data){
		if(!er)
		{
			scope.show("Date saved successfully");
			scope.sha=false;
			scope.init();

		}
		else{
		scope.er("Date not saved")
		}
	});
}

scope.sha=true;
scope.init=function()
{
var dat=ref.child("pregnancy").child(user.uid).toString();
db.get(dat).once("value",function(snap){
var profa=snap.val();

if(!profa)
{
	scope.sha=true;


}
else
{
	scope.sha=false;
	scope.pa=profa;
	scope.dda=new Date(profa.date);
	var start_date=scope.dda;
	var end_date=new Date();
	var d=new Date(profa.date);
	var n=new Date(profa.date);
	scope.duration=new Date(d.setDate(n.getDate()+252)) ;
	
	scope.time=profa.time;
	//scope.date=
}

//scope.show(snap.val());

});	
}

scope.init();
}])
   
.controller('resultsCtrl',['$scope','ref','db','$state','$stateParams',function(scope,ref,db,state,params){
scope.para={};
scope.risk={};
var user=db.user();
		//console.log("user "+JSON.stringify(user));
		if(!user)
		{
			state.go("login");
		}
if(params.hyper=='Yes')
{
scope.para.hyper=true;
}
else if(params.hyper=='No')
{
scope.para.hyper=false;
}
scope.para.age=params.age;

scope.save=function(){
	//alert(JSON.stringify(scope.p));
	//scope.p.date=scope.p.dat.toString();
ref.child("srisk").child(user.uid).set(scope.para,function(er,data){
if(!er)
{
console.log("done");
//state.go("menu.result");
}
else
{
console.log(er);
}
});
}
scope.save();
if(scope.para.age>35 && scope.para.hyper)
{
scope.risk.text="High Risk Level";
scope.risk.color="red";
}else if(scope.para.age>35 || scope.para.hyper)
{
scope.risk.text="Medium Risk Level";
scope.risk.color="orange";
}
else{
scope.risk.text="Low Risk Level";
scope.risk.color="green";
}
//alert(JSON.stringify(scope.para));

}])
   
.controller('weightChartCtrl',['$scope','$scope','ref','db', function(scope,$scope,refa,db) {
	 scope.mapData = [];
	 scope.retrieve = function(){
  	console.log("retrieve");
		var ref = new Firebase("https://jikimu.firebaseio.com/weight");
		var user=db.user();
		//console.log("user "+JSON.stringify(user));
		if(!user)
		{
			state.go("login");
		}
		else
		{// Attach an asynchronous callback to read the data at our posts reference
			var dat=refa.child("weight").child(user.uid).toString();
			console.log(dat);
			//var ref = new Firebase(dat);
		db.get(dat).once("value", function(snapshot) {
		var wt_object = snapshot.val();
		
		var pairData = [];
		console.log(wt_object);
		var keys = Object.keys(wt_object);
		console.log(keys);
		for (var i =0; i < keys.length; i++) {
			var da=new Date(wt_object[keys[i]].birthda).getTime();
			scope.mapData.push( [da , parseInt(wt_object[keys[i]].wtvalue.toFixed(1)) ]);
			console.log("pairdata", JSON.stringify(scope.mapData));
		}
		//mapData.push(pairData);
	//	console.log("Map data",scope.mapData)

		//  console.log(wt_object);
		});
	}
		// scope.firebaseObj();
  }
  scope.retrieve();
	    $scope.options = {
            chart: {
                type: 'historicalBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 65,
                    left: 50
                },
                x: function(d){return d[0];},
                y: function(d){return d[1]/100000;},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.1f')(d);
                },
                duration: 100,
                xAxis: {
                    axisLabel: 'week',
                    tickFormat: function(d) {
                        return d3.time.format('%x')(new Date(d))
                    },
                    rotateLabels: 30,
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'mmHg',
                    axisLabelDistance: -10,
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }
                },
                tooltip: {
                    keyFormatter: function(d) {
                        return d3.time.format('%x')(new Date(d));
                    }
                },
                zoom: {
                    enabled: true,
                    scaleExtent: [1, 10],
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: true,
                    unzoomEventType: 'dblclick.zoom'
                }
            }
        };

        $scope.data = [
            {
                "key" : "Quantity" ,
                "bar": true,
                "values" : scope.mapData
            }];
   

}])
   
.controller('settingsCtrl', function($scope) {

})
   
.controller('bPChartCtrl', function($scope) {

});
function age(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
 