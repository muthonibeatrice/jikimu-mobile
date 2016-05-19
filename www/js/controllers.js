angular.module('app.controllers', [])
  
   
.controller('weightCtrl',['$scope','db','ref','$state', function(scope,db,refa,state) {
	scope.weight = {}
	scope.weight.wtvalue=0;
	 scope.prof={};
	 var user=db.user();
	if(!user)
		{
			state.go("login");
		}
		var dat=refa.child("users").child(user.uid).toString();
		db.get(dat).once("value",function(snap){
		var profa=snap.val();
		console.log("details"+JSON.stringify(profa));

		profa.birthday=new Date(profa.birthda);
		scope.prof=profa;
		//scope.show(snap.val());

		});

	scope.submitweight = function() {

	

	if(user)
	{
	
		console.log("Hello");
		var ref = new Firebase("https://jikimu.firebaseio.com/");
		console.log(scope.weight);
		 	scope.weight.birthda= new Date().toString();
		 	scope.prof.weight=scope.weight.wtvalue;
		 	scope.prof.lweight=new Date().toString();
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
		    ref.child("users").child(user.uid).set(scope.prof,function(er,dat){
		    		if(!er)
			{
				console.log("Profile weight  Updated");
				state.go("menu.weightChart");
			}
			else
			{
				console.log("Failed to update");
			}
		    })
		   
		    //scope.retrieve();
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
   
.controller('bloodPressureCtrl',['$scope','db','ref','$state', function(scope,db,refa,state) {

	var user=db.user();
	scope.bp={};
	scope.bp.reading=0;
	scope.bp.read=0;
scope.prof={};
	 var user=db.user();
	if(!user)
		{
			state.go("login");
		}
		

scope.pp=function(n){


	var dat=refa.child("users").child(user.uid).toString();
	db.get(dat).once("value",function(snap){
	var profa=snap.val();
	console.log("details"+JSON.stringify(profa));
	scope.prof=profa;
	scope.prof.lbp=new Date().toString();
	scope.prof.bp=n;
	//scope.show(snap.val());
	 refa.child("users").child(user.uid).set(scope.prof,function(er,dat){
		    		if(!er)
			{
				console.log("Profile Bp  Updated");
				state.go("menu.bPChart");
			}
			else
			{
				console.log("Failed to update");
			}
		    })
	});
	   

}

	scope.submitbp = function() {


	
		console.log("Hello");
		var ref = new Firebase("https://jikimu.firebaseio.com/");
		console.log(scope.bp);
		 	scope.bp.birthda= new Date().toString();
		
		    var BpRef = ref.child("bp").child(user.uid).push(scope.bp,function(er,data1)
		    // var data=ref.child("pregnancy").child(user.uid).toString();
		{
			if(!er)
			{
				console.log("successful BP Entry");
				scope.pp(scope.bp.reading);
			}
			else
			{
				console.log("Failed to update");
			}
		});

		
		   
	

	    		// ref.child("weight").child(data.uid).set(
	    		// 	scope.usera
  };

}])
   
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
			state.go("menu.riskLevel");
		}
		});

		db.get(dat).once("value",function(snap){
		var profa=snap.val();
		//console.log(profa);

		profa.birthday=new Date(profa.birthda);
		scope.prof=profa;
		scope.$apply();
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
	    		scope.usera.email=scope.user.email;
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
   
.controller('homeCtrl',['$scope','ref','$ionicPopup','$state','Notification','db','$filter' ,function(scope,ref,popup,state,Notification,db,filter) {
var user=db.user();
if(!user)
{
	state.go("login");
}

 scope.primary = function(title,message) {
 		console.log("notification");
        Notification({message: '<p style="color:white">'+message+'<p/>', title: '<i style="color:white">'+title+'</i> <u>'});
    };

 var dat=ref.child('users').child(user.uid).toString();
 scope.text="";
db.get(dat).once("value",function(snap){
	var data=snap.val();

console.log(data.age);
var lwt=new Date(data.lweight);
console.log("lwt"+lwt.getTime());
var lbp=new Date(data.lbp);
console.log("bp:"+lbp.getTime());
var nwt=lwt;
var nbp=lbp;
if(data.risk=="low")
{

}
else if (data.riak="medium")
{
scope.nwt = nwt.setDate(lwt.getDate() + 7); 
scope.nbp = nbp.setDate(lbp.getDate() + 7); 
console.log(scope.nwt);
console.log(scope.nbp);
datas();
}
else
{
scope.nwt= nwt.setDate(lwt.getDate() + 14);
scope.nbp = nbp.setDate(lbp.getDate() + 14);  
console.log(scope.nwt);
console.log(scope.nbp);
datas();
}
console.log("new weight date "+scope.nwt);
function datas()
{

var d=lwt.getTime()
if( parseInt(d) >= parseInt(scope.nwt))
{
scope.text+="<p>Weight measurement:<br>"+filter('date')(new Date(scope.nwt),"EEE,d MMM yyyy")+"</p>";
}
else 
{
	scope.text+="<p>Weight measurement:<br>Get a Bp measurement today</p>";

}

if(lbp.getTime() >= scope.nbp)
{
scope.text+="<p>Bp measurement:<br>"+filter('date')(new Date(scope.nbp),"EEE,d MMM yyyy")+"</p>";
}
else
{
	scope.text+="<p>Bp measurement:<br>Get a Bp measurement today</p>";

}

}
if(scope.text!="")
{
    scope.primary("Reminder",scope.text);
}

});
    

 
scope.nTitle = "Title from other scope";
                scope.nClicksLog = [];
                scope.nClick = function() {
                    $scope.nClicksLog.push("Clicked");
                };
                scope.nElements = ['one', 'two', 'three'];
                scope.customTemplateScope = function() {
                    Notification.primary({message: "Just message", templateUrl: "custom_template.html", scope: $scope});
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
scope.p.age=parseInt(snap.val().age);
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
	

scope.update=function(n){
scope.prof={};
var dat=ref.child("users").child(user.uid).toString();
		db.get(dat).once("value",function(snap){
		var profa=snap.val();
		scope.prof=profa;
		scope.prof.risk=n;
		console.log("details"+JSON.stringify(profa));
		//scope.show(snap.val());

			
		    ref.child("users").child(user.uid).set(scope.prof,function(er,dat){
		    if(!er)
			{
				console.log(n);
				console.log("profile  Updated");
			//	state.go("menu.weightChart");
			}
			else
			{
				console.log("Failed to update");
			}
		    })

		});
			



};

scope.d=0;
scope.risk={};
var dat=ref.child("srisk").child(user.uid).toString();

scope.$watch('d',function(value)
{
//console.log("change:"+value);
if(value < 3)
{
		scope.risk.text="Low Risk Level";
		scope.update("low");
scope.risk.color="green";
}
else if(value == 3 )
{
scope.risk.text="Medium Risk Level";
scope.update("medium");
scope.risk.color="orange";
//state.go("menu.weightChart")
}
else
{
	scope.risk.text="High Risk Level";
	scope.update("high");
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
scope.update=function(n){
	scope.prof={};
var dat=ref.child("users").child(user.uid).toString();
		db.get(dat).once("value",function(snap){
		var profa=snap.val();
		scope.prof=profa;
		scope.prof.risk=n;
		console.log("details"+JSON.stringify(profa));
		//scope.show(snap.val());

			
		    ref.child("users").child(user.uid).set(scope.prof,function(er,dat){
		    if(!er)
			{
				console.log(n);
				console.log("profile  Updated");
			//	state.go("menu.weightChart");
			}
			else
			{
				console.log("Failed to update");
			}
		    })

		});
			


};

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
scope.update("high");
}else if(scope.para.age>35 || scope.para.hyper)
{
scope.risk.text="Medium Risk Level";
scope.risk.color="orange";
scope.update("medium");
}
else{
scope.risk.text="Low Risk Level";
scope.risk.color="green";
scope.update("low");
}
//alert(JSON.stringify(scope.para));

}])
   
.controller('weightChartCtrl',['$scope','$scope','ref','db', function(scope,$scope,refa,db) {
	 scope.mapData = [];
	var clr="";
	 var user=db.user();
	 	if(!user)
		{
			state.go("login");
		}
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
		//	console.log(JSON.stringify(wt_object));
		var pairData = [];
		//console.log(wt_object);
		var keys = Object.keys(wt_object);
	    var j=keys.length;

	    if(j > 1)
	    {
	    	   var dif=parseInt(wt_object[keys[j-1]].wtvalue.toFixed(1)) - parseInt(wt_object[keys[j-2]].wtvalue.toFixed(1));
	   dif = Math.abs(dif);
	    if(dif > 15)
	    {
	    	clr="red";

	    }
	    else
	    {
	    	clr="green";
	    }
	  
	  //  console.log(scope.clr);
	    console.log("difference is :"+dif);
	    }
	 
		//console.log(keys);
		for (var i =0; i < keys.length; i++) {
			var da=new Date(wt_object[keys[i]].birthda).getTime();
			scope.mapData.push( [da , parseInt(wt_object[keys[i]].wtvalue.toFixed(1)) ]);
		//	console.log("pairdata", JSON.stringify(scope.mapData));
		}
		console.log("the "+clr);
		//mapData.push(pairData);

           console.log(JSON.stringify(scope.mapData))
		//  console.log(wt_object);

		 scope.highchartsNG = {
        options: {
            chart: {
                type: 'spline',
                 zoomType: 'x'
            },
              xAxis: {
                type: 'datetime'
            },
          
            plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y} Kg'
                },
                color:clr
            }
        },
            tooltip: {

            pointFormat: '<b>{series.name}</b>: <b>{point.y} Kg</b>'
        }
        },
        series: [{
        	name:"<b>Weight</b>",
            data: scope.mapData
        }],
        title: {
            text: 'Weight Chart'
        },
        loading: false
    }

		});




	}
		// scope.firebaseObj();
  }
//  scope.mapData=[[1462222800000,45],[1464296400000,50],[1463432400000,78],[1463432400000,78],[1463432400000,78],[1463432400000,78],[1463605200000,45],[1462395600000,89],[1462395600000,80],[1462309200000,56],[1462914000000,45],[1462395600000,69],[1463173200000,56],[1463173200000,57],[1462914000000,45],[1463605200000,78],[1463518800000,45],[1463086800000,56]];
scope.data = [[1370131200000,0.7695],[1370304000000,0.7645],[1370390400000,0.7638],[1370217600000,0.7648],[1370476800000,0.7549],[1370563200000,0.7562],[1370736000000,0.7574],[1370822400000,0.7543],[1370908800000,0.751],[1370995200000,0.7498],[1371081600000,0.7477],[1371168000000,0.7492],[1371340800000,0.7487],[1371427200000,0.748],[1371513600000,0.7466],[1371600000000,0.7521],[1371686400000,0.7564],[1371772800000,0.7621],[1371945600000,0.763],[1372032000000,0.7623],[1372118400000,0.7644],[1372204800000,0.7685],[1372291200000,0.7671],[1372377600000,0.7687],[1372550400000,0.7687],[1372636800000,0.7654],[1372723200000,0.7705],[1372809600000,0.7687],[1372896000000,0.7744],[1372982400000,0.7793],[1373155200000,0.7804],[1373241600000,0.777],[1373328000000,0.7824],[1373414400000,0.7705],[1373500800000,0.7635],[1373587200000,0.7652],[1373760000000,0.7656],[1373846400000,0.7655],[1373932800000,0.7598],[1374019200000,0.7619],[1374105600000,0.7628],[1374192000000,0.7609],[1374364800000,0.7599],[1374451200000,0.7584],[1374537600000,0.7562],[1374624000000,0.7575],[1374710400000,0.7531],[1374796800000,0.753],[1374969600000,0.7526],[1375056000000,0.754],[1375142400000,0.754],[1375228800000,0.7518],[1375315200000,0.7571],[1375401600000,0.7529],[1375574400000,0.7532],[1375660800000,0.7542],[1375747200000,0.7515],[1375833600000,0.7498],[1375920000000,0.7473],[1376006400000,0.7494],[1376179200000,0.7497],[1376265600000,0.7519],[1376352000000,0.754],[1376438400000,0.7543],[1376524800000,0.7492],[1376611200000,0.7502],[1376784000000,0.7503],[1376870400000,0.7499],[1376956800000,0.7453],[1377043200000,0.7487],[1377129600000,0.7487],[1377216000000,0.7472],[1377388800000,0.7471],[1377475200000,0.748],[1377561600000,0.7467],[1377648000000,0.7497],[1377734400000,0.7552],[1377820800000,0.7562],[1377993600000,0.7572],[1378080000000,0.7581],[1378166400000,0.7593],[1378252800000,0.7571],[1378339200000,0.7622],[1378425600000,0.7588],[1378598400000,0.7591],[1378684800000,0.7544],[1378771200000,0.7537],[1378857600000,0.7512],[1378944000000,0.7519],[1379030400000,0.7522],[1379203200000,0.7486],[1379289600000,0.75],[1379376000000,0.7486],[1379462400000,0.7396],[1379548800000,0.7391],[1379635200000,0.7394],[1379808000000,0.7389],[1379894400000,0.7411],[1379980800000,0.7422],[1380067200000,0.7393],[1380153600000,0.7413],[1380240000000,0.7396],[1380412800000,0.741],[1380499200000,0.7393],[1380585600000,0.7393],[1380672000000,0.7365],[1380758400000,0.7343],[1380844800000,0.7376],[1381017600000,0.737],[1381104000000,0.7362],[1381190400000,0.7368],[1381276800000,0.7393],[1381363200000,0.7397],[1381449600000,0.7385],[1381622400000,0.7377],[1381708800000,0.7374],[1381795200000,0.7395],[1381881600000,0.7389],[1381968000000,0.7312],[1382054400000,0.7307],[1382227200000,0.7309],[1382313600000,0.7308],[1382400000000,0.7256],[1382486400000,0.7258],[1382572800000,0.7247],[1382659200000,0.7244],[1382832000000,0.7244],[1382918400000,0.7255],[1383004800000,0.7275],[1383091200000,0.728],[1383177600000,0.7361],[1383264000000,0.7415],[1383436800000,0.7411],[1383523200000,0.7399],[1383609600000,0.7421],[1383696000000,0.74],[1383782400000,0.7452],[1383868800000,0.7479],[1384041600000,0.7492],[1384128000000,0.746],[1384214400000,0.7442],[1384300800000,0.7415],[1384387200000,0.7429],[1384473600000,0.741],[1384646400000,0.7417],[1384732800000,0.7405],[1384819200000,0.7386],[1384905600000,0.7441],[1384992000000,0.7418],[1385078400000,0.7376],[1385251200000,0.7379],[1385337600000,0.7399],[1385424000000,0.7369],[1385510400000,0.7365],[1385596800000,0.735],[1385683200000,0.7358],[1385856000000,0.7362],[1385942400000,0.7385],[1386028800000,0.7359],[1386115200000,0.7357],[1386201600000,0.7317],[1386288000000,0.7297],[1386460800000,0.7296],[1386547200000,0.7279],[1386633600000,0.7267],[1386720000000,0.7254],[1386806400000,0.727],[1386892800000,0.7276],[1387065600000,0.7278],[1387152000000,0.7267],[1387238400000,0.7263],[1387324800000,0.7307],[1387411200000,0.7319],[1387497600000,0.7315],[1387670400000,0.7311],[1387756800000,0.7301],[1387843200000,0.7308],[1387929600000,0.731],[1388016000000,0.7304],[1388102400000,0.7277],[1388275200000,0.7272],[1388361600000,0.7244],[1388448000000,0.7275],[1388534400000,0.7271],[1388620800000,0.7314],[1388707200000,0.7359],[1388880000000,0.7355],[1388966400000,0.7338],[1389052800000,0.7345],[1389139200000,0.7366],[1389225600000,0.7349],[1389312000000,0.7316],[1389484800000,0.7315],[1389571200000,0.7315],[1389657600000,0.731],[1389744000000,0.735],[1389830400000,0.7341],[1389916800000,0.7385],[1390089600000,0.7392],[1390176000000,0.7379],[1390262400000,0.7373],[1390348800000,0.7381],[1390435200000,0.7301],[1390521600000,0.7311],[1390694400000,0.7306],[1390780800000,0.7314],[1390867200000,0.7316],[1390953600000,0.7319],[1391040000000,0.7377],[1391126400000,0.7415],[1391299200000,0.7414],[1391385600000,0.7393],[1391472000000,0.7397],[1391558400000,0.7389],[1391644800000,0.7358],[1391731200000,0.7334],[1391904000000,0.7343],[1391990400000,0.7328],[1392076800000,0.7332],[1392163200000,0.7356],[1392249600000,0.7309],[1392336000000,0.7304],[1392508800000,0.73],[1392595200000,0.7295],[1392681600000,0.7268],[1392768000000,0.7281],[1392854400000,0.7289],[1392940800000,0.7278],[1393113600000,0.728],[1393200000000,0.728],[1393286400000,0.7275],[1393372800000,0.7306],[1393459200000,0.7295],[1393545600000,0.7245],[1393718400000,0.7259],[1393804800000,0.728],[1393891200000,0.7276],[1393977600000,0.7282],[1394064000000,0.7215],[1394150400000,0.7206],[1394323200000,0.7206],[1394409600000,0.7207],[1394496000000,0.7216],[1394582400000,0.7192],[1394668800000,0.721],[1394755200000,0.7187],[1394928000000,0.7188],[1395014400000,0.7183],[1395100800000,0.7177],[1395187200000,0.7229],[1395273600000,0.7258],[1395360000000,0.7249],[1395532800000,0.7247],[1395619200000,0.7226],[1395705600000,0.7232],[1395792000000,0.7255],[1395878400000,0.7278],[1395964800000,0.7271],[1396137600000,0.7272],[1396224000000,0.7261],[1396310400000,0.725],[1396396800000,0.7264],[1396483200000,0.7289],[1396569600000,0.7298],[1396742400000,0.7298],[1396828800000,0.7278],[1396915200000,0.7248],[1397001600000,0.7218],[1397088000000,0.72],[1397174400000,0.7202],[1397347200000,0.7222],[1397433600000,0.7236],[1397520000000,0.7239],[1397606400000,0.7238],[1397692800000,0.7238],[1397779200000,0.7238],[1397952000000,0.7239],[1398038400000,0.725],[1398124800000,0.7244],[1398211200000,0.7238],[1398297600000,0.7229],[1398384000000,0.7229],[1398556800000,0.7226],[1398643200000,0.722],[1398729600000,0.724],[1398816000000,0.7211],[1398902400000,0.721],[1398988800000,0.7209],[1399161600000,0.7209],[1399248000000,0.7207],[1399334400000,0.718],[1399420800000,0.7188],[1399507200000,0.7225],[1399593600000,0.7268],[1399766400000,0.7267],[1399852800000,0.7269],[1399939200000,0.7297],[1400025600000,0.7291],[1400112000000,0.7294],[1400198400000,0.7302],[1400371200000,0.7298],[1400457600000,0.7295],[1400544000000,0.7298],[1400630400000,0.7307],[1400716800000,0.7323],[1400803200000,0.7335],[1400976000000,0.7338],[1401062400000,0.7329],[1401148800000,0.7335],[1401235200000,0.7358],[1401321600000,0.7351],[1401408000000,0.7337],[1401580800000,0.7338],[1401667200000,0.7355],[1401753600000,0.7338],[1401840000000,0.7353],[1401926400000,0.7321],[1402012800000,0.733],[1402185600000,0.7327],[1402272000000,0.7356],[1402358400000,0.7381],[1402444800000,0.7389],[1402531200000,0.7379],[1402617600000,0.7384],[1402790400000,0.7388],[1402876800000,0.7367],[1402963200000,0.7382],[1403049600000,0.7356],[1403136000000,0.7349],[1403222400000,0.7353],[1403395200000,0.7357],[1403481600000,0.735],[1403568000000,0.735],[1403654400000,0.7337],[1403740800000,0.7347],[1403827200000,0.7327],[1404000000000,0.733],[1404086400000,0.7304],[1404172800000,0.731],[1404259200000,0.732],[1404345600000,0.7347],[1404432000000,0.7356],[1404604800000,0.736],[1404691200000,0.735],[1404777600000,0.7346],[1404864000000,0.7329],[1404950400000,0.7348],[1405036800000,0.7349],[1405209600000,0.7352],[1405296000000,0.7342],[1405382400000,0.7369],[1405468800000,0.7393],[1405555200000,0.7392],[1405641600000,0.7394],[1405814400000,0.739],[1405900800000,0.7395],[1405987200000,0.7427],[1406073600000,0.7427],[1406160000000,0.7428],[1406246400000,0.7446],[1406419200000,0.7447],[1406505600000,0.744],[1406592000000,0.7458],[1406678400000,0.7464],[1406764800000,0.7469],[1406851200000,0.7446],[1407024000000,0.7447],[1407110400000,0.745],[1407196800000,0.7477],[1407283200000,0.7472],[1407369600000,0.7483],[1407456000000,0.7457],[1407628800000,0.746],[1407715200000,0.747],[1407801600000,0.748],[1407888000000,0.7482],[1407974400000,0.7482],[1408060800000,0.7463],[1408233600000,0.7469],[1408320000000,0.7483],[1408406400000,0.7508],[1408492800000,0.7541],[1408579200000,0.7529],[1408665600000,0.7551],[1408838400000,0.7577],[1408924800000,0.758],[1409011200000,0.7593],[1409097600000,0.758],[1409184000000,0.7585],[1409270400000,0.7614],[1409443200000,0.7618],[1409529600000,0.7618],[1409616000000,0.7614],[1409702400000,0.7604],[1409788800000,0.7725],[1409875200000,0.7722],[1410048000000,0.7721],[1410134400000,0.7753],[1410220800000,0.773],[1410307200000,0.7742],[1410393600000,0.7736],[1410480000000,0.7713],[1410652800000,0.7717],[1410739200000,0.7727],[1410825600000,0.7716],[1410912000000,0.7772],[1410998400000,0.7739],[1411084800000,0.7794],[1411257600000,0.7788],[1411344000000,0.7782],[1411430400000,0.7784],[1411516800000,0.7824],[1411603200000,0.7843],[1411689600000,0.7884],[1411862400000,0.7891],[1411948800000,0.7883],[1412035200000,0.7916],[1412121600000,0.7922],[1412208000000,0.7893],[1412294400000,0.7989],[1412467200000,0.7992],[1412553600000,0.7903],[1412640000000,0.7893],[1412726400000,0.7853],[1412812800000,0.788],[1412899200000,0.7919],[1413072000000,0.7912],[1413158400000,0.7842],[1413244800000,0.79],[1413331200000,0.779],[1413417600000,0.7806],[1413504000000,0.7835],[1413676800000,0.7844],[1413763200000,0.7813],[1413849600000,0.7864],[1413936000000,0.7905],[1414022400000,0.7907],[1414108800000,0.7893],[1414281600000,0.7889],[1414368000000,0.7875],[1414454400000,0.7853],[1414540800000,0.7916],[1414627200000,0.7929],[1414713600000,0.7984],[1414886400000,0.7999],[1414972800000,0.8012],[1415059200000,0.7971],[1415145600000,0.8009],[1415232000000,0.8081],[1415318400000,0.803],[1415491200000,0.8025],[1415577600000,0.8051],[1415664000000,0.8016],[1415750400000,0.804],[1415836800000,0.8015],[1415923200000,0.7985],[1416096000000,0.7988],[1416182400000,0.8032],[1416268800000,0.7976],[1416355200000,0.7965],[1416441600000,0.7975],[1416528000000,0.8071],[1416700800000,0.8082],[1416787200000,0.8037],[1416873600000,0.8016],[1416960000000,0.7996],[1417046400000,0.8022],[1417132800000,0.8031],[1417305600000,0.804],[1417392000000,0.802],[1417478400000,0.8075],[1417564800000,0.8123],[1417651200000,0.8078],[1417737600000,0.8139],[1417910400000,0.8135],[1417996800000,0.8119],[1418083200000,0.8081],[1418169600000,0.8034],[1418256000000,0.8057],[1418342400000,0.8024],[1418515200000,0.8024],[1418601600000,0.804],[1418688000000,0.7993],[1418774400000,0.8102],[1418860800000,0.8139],[1418947200000,0.8177],[1419120000000,0.818],[1419206400000,0.8176],[1419292800000,0.8215],[1419379200000,0.82],[1419465600000,0.8182],[1419552000000,0.8213],[1419724800000,0.8218],[1419811200000,0.8229],[1419897600000,0.8225],[1419984000000,0.8266],[1420070400000,0.8262],[1420156800000,0.8331],[1420329600000,0.8371],[1420416000000,0.838],[1420502400000,0.8411],[1420588800000,0.8447],[1420675200000,0.848],[1420761600000,0.8445],[1420934400000,0.8425],[1421020800000,0.8451],[1421107200000,0.8495],[1421193600000,0.8482],[1421280000000,0.8598],[1421366400000,0.8643],[1421539200000,0.8648],[1421625600000,0.8617],[1421712000000,0.8658],[1421798400000,0.8613],[1421884800000,0.8798],[1421971200000,0.8922],[1422144000000,0.899],[1422230400000,0.8898],[1422316800000,0.8787],[1422403200000,0.8859],[1422489600000,0.8834],[1422576000000,0.8859],[1422748800000,0.8843],[1422835200000,0.8817],[1422921600000,0.871],[1423008000000,0.8813],[1423094400000,0.8713],[1423180800000,0.8837],[1423353600000,0.8839],[1423440000000,0.8831],[1423526400000,0.8833],[1423612800000,0.8823],[1423699200000,0.877],[1423785600000,0.8783],[1423958400000,0.8774],[1424044800000,0.8807],[1424131200000,0.8762],[1424217600000,0.8774],[1424304000000,0.8798],[1424390400000,0.8787],[1424563200000,0.8787],[1424649600000,0.8824],[1424736000000,0.8818],[1424822400000,0.8801],[1424908800000,0.8931],[1424995200000,0.8932],[1425168000000,0.896],[1425254400000,0.8941],[1425340800000,0.8948],[1425427200000,0.9026],[1425513600000,0.9066],[1425600000000,0.9222],[1425772800000,0.9221],[1425859200000,0.9214],[1425945600000,0.9347],[1426032000000,0.9482],[1426118400000,0.9403],[1426204800000,0.9528],[1426377600000,0.9541],[1426464000000,0.9462],[1426550400000,0.9435],[1426636800000,0.9203],[1426723200000,0.9381],[1426809600000,0.9241],[1426982400000,0.9237],[1427068800000,0.9135],[1427155200000,0.9152],[1427241600000,0.9114],[1427328000000,0.9188],[1427414400000,0.9184],[1427587200000,0.9188],[1427673600000,0.9231],[1427760000000,0.9319],[1427846400000,0.9291],[1427932800000,0.9188],[1428019200000,0.9109],[1428192000000,0.9091],[1428278400000,0.9154],[1428364800000,0.9246],[1428451200000,0.9276],[1428537600000,0.9382],[1428624000000,0.9431],[1428796800000,0.9426],[1428883200000,0.9463],[1428969600000,0.9386],[1429056000000,0.9357],[1429142400000,0.9293],[1429228800000,0.9254],[1429401600000,0.9251],[1429488000000,0.9312],[1429574400000,0.9315],[1429660800000,0.9323],[1429747200000,0.9236],[1429833600000,0.9196],[1430006400000,0.9201],[1430092800000,0.9184],[1430179200000,0.9106],[1430265600000,0.8983],[1430352000000,0.8909],[1430438400000,0.8928],[1430611200000,0.8941],[1430697600000,0.8972],[1430784000000,0.894],[1430870400000,0.8808],[1430956800000,0.8876],[1431043200000,0.8925],[1431216000000,0.8934],[1431302400000,0.8964],[1431388800000,0.8917],[1431475200000,0.8805],[1431561600000,0.8764],[1431648000000,0.8732],[1431820800000,0.8737],[1431907200000,0.8838],[1431993600000,0.8969],[1432080000000,0.9014],[1432166400000,0.8999],[1432252800000,0.9076],[1432425600000,0.9098],[1432512000000,0.911],[1432598400000,0.9196],[1432684800000,0.917],[1432771200000,0.9133],[1432857600000,0.9101],[1433030400000,0.9126],[1433116800000,0.9151],[1433203200000,0.8965],[1433289600000,0.8871],[1433376000000,0.8898],[1433462400000,0.8999],[1433635200000,0.9004],[1433721600000,0.8857],[1433808000000,0.8862],[1433894400000,0.8829],[1433980800000,0.8882],[1434067200000,0.8873],[1434240000000,0.8913],[1434326400000,0.8862],[1434412800000,0.8891],[1434499200000,0.8821],[1434585600000,0.8802],[1434672000000,0.8808],[1434844800000,0.8794],[1434931200000,0.8818],[1435017600000,0.8952],[1435104000000,0.8924],[1435190400000,0.8925],[1435276800000,0.8955],[1435449600000,0.9113],[1435536000000,0.89],[1435622400000,0.895]];
console.log("the "+scope.clr);

 
  scope.retrieve();
        
   

}])
   
.controller('settingsCtrl', function($scope) {

})
   
.controller('bPChartCtrl',['$scope','$scope','ref','db', function(scope,$scope, refb,db) {
	 scope.mapData2 = [];
	 scope.low = [];
	 scope.x=[];
	 var clr="";
	 scope.retrieve = function(){
  	console.log("retrieve");
		var ref = new Firebase("https://jikimu.firebaseio.com/bp");
		var user=db.user();
		//console.log("user "+JSON.stringify(user));
		if(!user)
		{
			state.go("login");
		}
		else
		{

		// Attach an asynchronous callback to read the data at our posts reference
			var data1=refb.child("bp").child(user.uid).toString();
		//	console.log(data1);
			//var ref = new Firebase(dat);
		db.get(data1).once("value", function(snapshot) {
		var bp_object = snapshot.val();
		//console.log(JSON.stringify(bp_object));
		var pairData2 = [];
		//console.log(bp_object);
		var keys = Object.keys(bp_object);
		 var j=keys.length;
		 if(j > 1)
		 {
			   var dif=parseInt(bp_object[keys[j-1]].reading.toFixed(1)) - parseInt(bp_object[keys[j-2]].reading.toFixed(1));
		   dif = Math.abs(dif);
		   console.log("dif:"+dif);
		    if(dif > 15)
		    {
		    	clr="red";

		    }
		    else
		    {
		    	clr="green";
		    }	
		 }
	  
		console.log(keys.length);
		for (var i =0; i < keys.length; i++) {
			var da=new Date(bp_object[keys[i]].birthda).toString();
			scope.x.push(da);
			scope.mapData2.push( parseInt(bp_object[keys[i]].reading.toFixed(1)) );
			scope.low.push(parseInt(bp_object[keys[i]].read.toFixed(1)))
			//console.log("pairdata2", JSON.stringify(scope.mapData2));
		}
		//mapData.push(pairData);riskLevelCtrlriskLevelCtrlriskLevelCtrlriskLevelCtrlriskLevelCtrlriskLevelCtrl
		console.log("Map data",scope.mapData2)

		//  console.log(wt_object);
		 scope.highchartsNG = {
        options: {
            chart: {
                type: 'spline',
                  zoomType: 'x'
            },
             xAxis: {
                type: 'datetime',
                categories:scope.x
            },
            plotOptions: {
            series: {
                dataLabels: {
                    enabled: false,
                    format: '{point.name}: {point.y} mm Hg',
                   
                },
                  color:clr
            }
        },
            tooltip: {

            pointFormat: '<b>{series.name}</b>: <b>{point.y} mm Hg</b>'
        }
        },
        series: [{
        	name:"<b>Systolic</b>",
            data: scope.mapData2
        },{
        	name:"<b>Dystolic</b>",
            data: scope.low
        }],
        title: {
            text: 'Blood Pressure'
        },
        loading: false
    }

		});
	}
		// scope.firebaseObj();
  }
  scope.retrieve();
//scope.data = [[1370131200000,0.7695],[1370304000000,0.7645],[1370390400000,0.7638],[1370217600000,0.7648],[1370476800000,0.7549],[1370563200000,0.7562],[1370736000000,0.7574],[1370822400000,0.7543],[1370908800000,0.751],[1370995200000,0.7498],[1371081600000,0.7477],[1371168000000,0.7492],[1371340800000,0.7487],[1371427200000,0.748],[1371513600000,0.7466],[1371600000000,0.7521],[1371686400000,0.7564],[1371772800000,0.7621],[1371945600000,0.763],[1372032000000,0.7623],[1372118400000,0.7644],[1372204800000,0.7685],[1372291200000,0.7671],[1372377600000,0.7687],[1372550400000,0.7687],[1372636800000,0.7654],[1372723200000,0.7705],[1372809600000,0.7687],[1372896000000,0.7744],[1372982400000,0.7793],[1373155200000,0.7804],[1373241600000,0.777],[1373328000000,0.7824],[1373414400000,0.7705],[1373500800000,0.7635],[1373587200000,0.7652],[1373760000000,0.7656],[1373846400000,0.7655],[1373932800000,0.7598],[1374019200000,0.7619],[1374105600000,0.7628],[1374192000000,0.7609],[1374364800000,0.7599],[1374451200000,0.7584],[1374537600000,0.7562],[1374624000000,0.7575],[1374710400000,0.7531],[1374796800000,0.753],[1374969600000,0.7526],[1375056000000,0.754],[1375142400000,0.754],[1375228800000,0.7518],[1375315200000,0.7571],[1375401600000,0.7529],[1375574400000,0.7532],[1375660800000,0.7542],[1375747200000,0.7515],[1375833600000,0.7498],[1375920000000,0.7473],[1376006400000,0.7494],[1376179200000,0.7497],[1376265600000,0.7519],[1376352000000,0.754],[1376438400000,0.7543],[1376524800000,0.7492],[1376611200000,0.7502],[1376784000000,0.7503],[1376870400000,0.7499],[1376956800000,0.7453],[1377043200000,0.7487],[1377129600000,0.7487],[1377216000000,0.7472],[1377388800000,0.7471],[1377475200000,0.748],[1377561600000,0.7467],[1377648000000,0.7497],[1377734400000,0.7552],[1377820800000,0.7562],[1377993600000,0.7572],[1378080000000,0.7581],[1378166400000,0.7593],[1378252800000,0.7571],[1378339200000,0.7622],[1378425600000,0.7588],[1378598400000,0.7591],[1378684800000,0.7544],[1378771200000,0.7537],[1378857600000,0.7512],[1378944000000,0.7519],[1379030400000,0.7522],[1379203200000,0.7486],[1379289600000,0.75],[1379376000000,0.7486],[1379462400000,0.7396],[1379548800000,0.7391],[1379635200000,0.7394],[1379808000000,0.7389],[1379894400000,0.7411],[1379980800000,0.7422],[1380067200000,0.7393],[1380153600000,0.7413],[1380240000000,0.7396],[1380412800000,0.741],[1380499200000,0.7393],[1380585600000,0.7393],[1380672000000,0.7365],[1380758400000,0.7343],[1380844800000,0.7376],[1381017600000,0.737],[1381104000000,0.7362],[1381190400000,0.7368],[1381276800000,0.7393],[1381363200000,0.7397],[1381449600000,0.7385],[1381622400000,0.7377],[1381708800000,0.7374],[1381795200000,0.7395],[1381881600000,0.7389],[1381968000000,0.7312],[1382054400000,0.7307],[1382227200000,0.7309],[1382313600000,0.7308],[1382400000000,0.7256],[1382486400000,0.7258],[1382572800000,0.7247],[1382659200000,0.7244],[1382832000000,0.7244],[1382918400000,0.7255],[1383004800000,0.7275],[1383091200000,0.728],[1383177600000,0.7361],[1383264000000,0.7415],[1383436800000,0.7411],[1383523200000,0.7399],[1383609600000,0.7421],[1383696000000,0.74],[1383782400000,0.7452],[1383868800000,0.7479],[1384041600000,0.7492],[1384128000000,0.746],[1384214400000,0.7442],[1384300800000,0.7415],[1384387200000,0.7429],[1384473600000,0.741],[1384646400000,0.7417],[1384732800000,0.7405],[1384819200000,0.7386],[1384905600000,0.7441],[1384992000000,0.7418],[1385078400000,0.7376],[1385251200000,0.7379],[1385337600000,0.7399],[1385424000000,0.7369],[1385510400000,0.7365],[1385596800000,0.735],[1385683200000,0.7358],[1385856000000,0.7362],[1385942400000,0.7385],[1386028800000,0.7359],[1386115200000,0.7357],[1386201600000,0.7317],[1386288000000,0.7297],[1386460800000,0.7296],[1386547200000,0.7279],[1386633600000,0.7267],[1386720000000,0.7254],[1386806400000,0.727],[1386892800000,0.7276],[1387065600000,0.7278],[1387152000000,0.7267],[1387238400000,0.7263],[1387324800000,0.7307],[1387411200000,0.7319],[1387497600000,0.7315],[1387670400000,0.7311],[1387756800000,0.7301],[1387843200000,0.7308],[1387929600000,0.731],[1388016000000,0.7304],[1388102400000,0.7277],[1388275200000,0.7272],[1388361600000,0.7244],[1388448000000,0.7275],[1388534400000,0.7271],[1388620800000,0.7314],[1388707200000,0.7359],[1388880000000,0.7355],[1388966400000,0.7338],[1389052800000,0.7345],[1389139200000,0.7366],[1389225600000,0.7349],[1389312000000,0.7316],[1389484800000,0.7315],[1389571200000,0.7315],[1389657600000,0.731],[1389744000000,0.735],[1389830400000,0.7341],[1389916800000,0.7385],[1390089600000,0.7392],[1390176000000,0.7379],[1390262400000,0.7373],[1390348800000,0.7381],[1390435200000,0.7301],[1390521600000,0.7311],[1390694400000,0.7306],[1390780800000,0.7314],[1390867200000,0.7316],[1390953600000,0.7319],[1391040000000,0.7377],[1391126400000,0.7415],[1391299200000,0.7414],[1391385600000,0.7393],[1391472000000,0.7397],[1391558400000,0.7389],[1391644800000,0.7358],[1391731200000,0.7334],[1391904000000,0.7343],[1391990400000,0.7328],[1392076800000,0.7332],[1392163200000,0.7356],[1392249600000,0.7309],[1392336000000,0.7304],[1392508800000,0.73],[1392595200000,0.7295],[1392681600000,0.7268],[1392768000000,0.7281],[1392854400000,0.7289],[1392940800000,0.7278],[1393113600000,0.728],[1393200000000,0.728],[1393286400000,0.7275],[1393372800000,0.7306],[1393459200000,0.7295],[1393545600000,0.7245],[1393718400000,0.7259],[1393804800000,0.728],[1393891200000,0.7276],[1393977600000,0.7282],[1394064000000,0.7215],[1394150400000,0.7206],[1394323200000,0.7206],[1394409600000,0.7207],[1394496000000,0.7216],[1394582400000,0.7192],[1394668800000,0.721],[1394755200000,0.7187],[1394928000000,0.7188],[1395014400000,0.7183],[1395100800000,0.7177],[1395187200000,0.7229],[1395273600000,0.7258],[1395360000000,0.7249],[1395532800000,0.7247],[1395619200000,0.7226],[1395705600000,0.7232],[1395792000000,0.7255],[1395878400000,0.7278],[1395964800000,0.7271],[1396137600000,0.7272],[1396224000000,0.7261],[1396310400000,0.725],[1396396800000,0.7264],[1396483200000,0.7289],[1396569600000,0.7298],[1396742400000,0.7298],[1396828800000,0.7278],[1396915200000,0.7248],[1397001600000,0.7218],[1397088000000,0.72],[1397174400000,0.7202],[1397347200000,0.7222],[1397433600000,0.7236],[1397520000000,0.7239],[1397606400000,0.7238],[1397692800000,0.7238],[1397779200000,0.7238],[1397952000000,0.7239],[1398038400000,0.725],[1398124800000,0.7244],[1398211200000,0.7238],[1398297600000,0.7229],[1398384000000,0.7229],[1398556800000,0.7226],[1398643200000,0.722],[1398729600000,0.724],[1398816000000,0.7211],[1398902400000,0.721],[1398988800000,0.7209],[1399161600000,0.7209],[1399248000000,0.7207],[1399334400000,0.718],[1399420800000,0.7188],[1399507200000,0.7225],[1399593600000,0.7268],[1399766400000,0.7267],[1399852800000,0.7269],[1399939200000,0.7297],[1400025600000,0.7291],[1400112000000,0.7294],[1400198400000,0.7302],[1400371200000,0.7298],[1400457600000,0.7295],[1400544000000,0.7298],[1400630400000,0.7307],[1400716800000,0.7323],[1400803200000,0.7335],[1400976000000,0.7338],[1401062400000,0.7329],[1401148800000,0.7335],[1401235200000,0.7358],[1401321600000,0.7351],[1401408000000,0.7337],[1401580800000,0.7338],[1401667200000,0.7355],[1401753600000,0.7338],[1401840000000,0.7353],[1401926400000,0.7321],[1402012800000,0.733],[1402185600000,0.7327],[1402272000000,0.7356],[1402358400000,0.7381],[1402444800000,0.7389],[1402531200000,0.7379],[1402617600000,0.7384],[1402790400000,0.7388],[1402876800000,0.7367],[1402963200000,0.7382],[1403049600000,0.7356],[1403136000000,0.7349],[1403222400000,0.7353],[1403395200000,0.7357],[1403481600000,0.735],[1403568000000,0.735],[1403654400000,0.7337],[1403740800000,0.7347],[1403827200000,0.7327],[1404000000000,0.733],[1404086400000,0.7304],[1404172800000,0.731],[1404259200000,0.732],[1404345600000,0.7347],[1404432000000,0.7356],[1404604800000,0.736],[1404691200000,0.735],[1404777600000,0.7346],[1404864000000,0.7329],[1404950400000,0.7348],[1405036800000,0.7349],[1405209600000,0.7352],[1405296000000,0.7342],[1405382400000,0.7369],[1405468800000,0.7393],[1405555200000,0.7392],[1405641600000,0.7394],[1405814400000,0.739],[1405900800000,0.7395],[1405987200000,0.7427],[1406073600000,0.7427],[1406160000000,0.7428],[1406246400000,0.7446],[1406419200000,0.7447],[1406505600000,0.744],[1406592000000,0.7458],[1406678400000,0.7464],[1406764800000,0.7469],[1406851200000,0.7446],[1407024000000,0.7447],[1407110400000,0.745],[1407196800000,0.7477],[1407283200000,0.7472],[1407369600000,0.7483],[1407456000000,0.7457],[1407628800000,0.746],[1407715200000,0.747],[1407801600000,0.748],[1407888000000,0.7482],[1407974400000,0.7482],[1408060800000,0.7463],[1408233600000,0.7469],[1408320000000,0.7483],[1408406400000,0.7508],[1408492800000,0.7541],[1408579200000,0.7529],[1408665600000,0.7551],[1408838400000,0.7577],[1408924800000,0.758],[1409011200000,0.7593],[1409097600000,0.758],[1409184000000,0.7585],[1409270400000,0.7614],[1409443200000,0.7618],[1409529600000,0.7618],[1409616000000,0.7614],[1409702400000,0.7604],[1409788800000,0.7725],[1409875200000,0.7722],[1410048000000,0.7721],[1410134400000,0.7753],[1410220800000,0.773],[1410307200000,0.7742],[1410393600000,0.7736],[1410480000000,0.7713],[1410652800000,0.7717],[1410739200000,0.7727],[1410825600000,0.7716],[1410912000000,0.7772],[1410998400000,0.7739],[1411084800000,0.7794],[1411257600000,0.7788],[1411344000000,0.7782],[1411430400000,0.7784],[1411516800000,0.7824],[1411603200000,0.7843],[1411689600000,0.7884],[1411862400000,0.7891],[1411948800000,0.7883],[1412035200000,0.7916],[1412121600000,0.7922],[1412208000000,0.7893],[1412294400000,0.7989],[1412467200000,0.7992],[1412553600000,0.7903],[1412640000000,0.7893],[1412726400000,0.7853],[1412812800000,0.788],[1412899200000,0.7919],[1413072000000,0.7912],[1413158400000,0.7842],[1413244800000,0.79],[1413331200000,0.779],[1413417600000,0.7806],[1413504000000,0.7835],[1413676800000,0.7844],[1413763200000,0.7813],[1413849600000,0.7864],[1413936000000,0.7905],[1414022400000,0.7907],[1414108800000,0.7893],[1414281600000,0.7889],[1414368000000,0.7875],[1414454400000,0.7853],[1414540800000,0.7916],[1414627200000,0.7929],[1414713600000,0.7984],[1414886400000,0.7999],[1414972800000,0.8012],[1415059200000,0.7971],[1415145600000,0.8009],[1415232000000,0.8081],[1415318400000,0.803],[1415491200000,0.8025],[1415577600000,0.8051],[1415664000000,0.8016],[1415750400000,0.804],[1415836800000,0.8015],[1415923200000,0.7985],[1416096000000,0.7988],[1416182400000,0.8032],[1416268800000,0.7976],[1416355200000,0.7965],[1416441600000,0.7975],[1416528000000,0.8071],[1416700800000,0.8082],[1416787200000,0.8037],[1416873600000,0.8016],[1416960000000,0.7996],[1417046400000,0.8022],[1417132800000,0.8031],[1417305600000,0.804],[1417392000000,0.802],[1417478400000,0.8075],[1417564800000,0.8123],[1417651200000,0.8078],[1417737600000,0.8139],[1417910400000,0.8135],[1417996800000,0.8119],[1418083200000,0.8081],[1418169600000,0.8034],[1418256000000,0.8057],[1418342400000,0.8024],[1418515200000,0.8024],[1418601600000,0.804],[1418688000000,0.7993],[1418774400000,0.8102],[1418860800000,0.8139],[1418947200000,0.8177],[1419120000000,0.818],[1419206400000,0.8176],[1419292800000,0.8215],[1419379200000,0.82],[1419465600000,0.8182],[1419552000000,0.8213],[1419724800000,0.8218],[1419811200000,0.8229],[1419897600000,0.8225],[1419984000000,0.8266],[1420070400000,0.8262],[1420156800000,0.8331],[1420329600000,0.8371],[1420416000000,0.838],[1420502400000,0.8411],[1420588800000,0.8447],[1420675200000,0.848],[1420761600000,0.8445],[1420934400000,0.8425],[1421020800000,0.8451],[1421107200000,0.8495],[1421193600000,0.8482],[1421280000000,0.8598],[1421366400000,0.8643],[1421539200000,0.8648],[1421625600000,0.8617],[1421712000000,0.8658],[1421798400000,0.8613],[1421884800000,0.8798],[1421971200000,0.8922],[1422144000000,0.899],[1422230400000,0.8898],[1422316800000,0.8787],[1422403200000,0.8859],[1422489600000,0.8834],[1422576000000,0.8859],[1422748800000,0.8843],[1422835200000,0.8817],[1422921600000,0.871],[1423008000000,0.8813],[1423094400000,0.8713],[1423180800000,0.8837],[1423353600000,0.8839],[1423440000000,0.8831],[1423526400000,0.8833],[1423612800000,0.8823],[1423699200000,0.877],[1423785600000,0.8783],[1423958400000,0.8774],[1424044800000,0.8807],[1424131200000,0.8762],[1424217600000,0.8774],[1424304000000,0.8798],[1424390400000,0.8787],[1424563200000,0.8787],[1424649600000,0.8824],[1424736000000,0.8818],[1424822400000,0.8801],[1424908800000,0.8931],[1424995200000,0.8932],[1425168000000,0.896],[1425254400000,0.8941],[1425340800000,0.8948],[1425427200000,0.9026],[1425513600000,0.9066],[1425600000000,0.9222],[1425772800000,0.9221],[1425859200000,0.9214],[1425945600000,0.9347],[1426032000000,0.9482],[1426118400000,0.9403],[1426204800000,0.9528],[1426377600000,0.9541],[1426464000000,0.9462],[1426550400000,0.9435],[1426636800000,0.9203],[1426723200000,0.9381],[1426809600000,0.9241],[1426982400000,0.9237],[1427068800000,0.9135],[1427155200000,0.9152],[1427241600000,0.9114],[1427328000000,0.9188],[1427414400000,0.9184],[1427587200000,0.9188],[1427673600000,0.9231],[1427760000000,0.9319],[1427846400000,0.9291],[1427932800000,0.9188],[1428019200000,0.9109],[1428192000000,0.9091],[1428278400000,0.9154],[1428364800000,0.9246],[1428451200000,0.9276],[1428537600000,0.9382],[1428624000000,0.9431],[1428796800000,0.9426],[1428883200000,0.9463],[1428969600000,0.9386],[1429056000000,0.9357],[1429142400000,0.9293],[1429228800000,0.9254],[1429401600000,0.9251],[1429488000000,0.9312],[1429574400000,0.9315],[1429660800000,0.9323],[1429747200000,0.9236],[1429833600000,0.9196],[1430006400000,0.9201],[1430092800000,0.9184],[1430179200000,0.9106],[1430265600000,0.8983],[1430352000000,0.8909],[1430438400000,0.8928],[1430611200000,0.8941],[1430697600000,0.8972],[1430784000000,0.894],[1430870400000,0.8808],[1430956800000,0.8876],[1431043200000,0.8925],[1431216000000,0.8934],[1431302400000,0.8964],[1431388800000,0.8917],[1431475200000,0.8805],[1431561600000,0.8764],[1431648000000,0.8732],[1431820800000,0.8737],[1431907200000,0.8838],[1431993600000,0.8969],[1432080000000,0.9014],[1432166400000,0.8999],[1432252800000,0.9076],[1432425600000,0.9098],[1432512000000,0.911],[1432598400000,0.9196],[1432684800000,0.917],[1432771200000,0.9133],[1432857600000,0.9101],[1433030400000,0.9126],[1433116800000,0.9151],[1433203200000,0.8965],[1433289600000,0.8871],[1433376000000,0.8898],[1433462400000,0.8999],[1433635200000,0.9004],[1433721600000,0.8857],[1433808000000,0.8862],[1433894400000,0.8829],[1433980800000,0.8882],[1434067200000,0.8873],[1434240000000,0.8913],[1434326400000,0.8862],[1434412800000,0.8891],[1434499200000,0.8821],[1434585600000,0.8802],[1434672000000,0.8808],[1434844800000,0.8794],[1434931200000,0.8818],[1435017600000,0.8952],[1435104000000,0.8924],[1435190400000,0.8925],[1435276800000,0.8955],[1435449600000,0.9113],[1435536000000,0.89],[1435622400000,0.895]];


  

}])
.controller('docCtrl',["$scope",'$stateParams','$window','ref','db','$state',
	function(scope,$stateParams,$window,ref,db,$state){
		console.log("doctor recommendation");
		var user=db.user();
		scope.patients=[];
				console.log("fetching data");
				ref.child("diagnosis").child(user.uid).once("value",function(data){
					angular.forEach(data.val(),function(data,key){
					var diagnosis={};
					diagnosis=data;
					
					diagnosis.id=data;
					scope.patients.push(diagnosis);
					console.log(diagnosis);
					});
				//console.log(data.val());
					//console.log("inner patients",scope.patients);
					scope.$apply();
				});
			
}])

function age(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
 