
app.factory('$itemMirror',function($q){



var itemMirror = {};

var itemArray = {};




var startMirrorConnectionThread = function(){
  	var defered = $q.defer();
    var dropboxClientCredentials = {
          key:'yd9mzxt3wzy4age',
          secret:'xyf9f7gpg4q8owa'
    };

    var dropboxClient = new Dropbox.Client(dropboxClientCredentials);
    var auth = new Dropbox.AuthDriver.Popup({
        receiverUrl: 'localhost:3000/app/misc/oauth_receiver.html'
    });

    defered.resolve(dropboxClient, auth);	

    return defered.promise;
};

var login = function(){
	  	startMirrorConnectionThread().then( function(dropboxClient,auth){
	      	dropboxClient.authDriver(auth);
	        dropboxClient.authenticate(function (error, client){
	             if(!error){
	                authenticatedClient = client;
	             }else{
	                console.log("error in authentication");
	             } 
	        });
	        var rootGroupingItemURI = '/';

	        
	        dropboxXooMLUtility = {
	          fragmentURI: '/XooML2.xml',
	          driverURI: 'DropboxXooMLUtility',
	          dropboxClient: dropboxClient
	        };
	        dropboxItemUtility = {
	          driverURI: 'DropboxItemUtility',
	          dropboxClient: dropboxClient
	        };
	        mirrorSyncUtility = {
	          utilityURI: 'MirrorSyncUtility'
	        };
	        options = {
	          groupingItemURI: rootGroupingItemURI,
	          xooMLDriver: dropboxXooMLUtility,
	          itemDriver: dropboxItemUtility,
	          syncDriver: mirrorSyncUtility
	        };
	      
	        itemMirror = new ItemMirror(options, function(error,im){
	          console.log("Item mirror created");
	          refreshLoop();
	        });
	  	});
   };



var refreshLoop = function(){

//idea!! paste a folder in there 
	if(thereIsChanges){
		itemMirror.save(function(err){
			thereIsChanges= false;
			refreshLoop();
		}); 
	}
	else{
		itemMirror.listAssociations().forEach(function(GUID){
			  console.log("Getting notes property for " + GUID);
				 
			  itemArray[GUID] = {
   			  id:GUID,
              content:itemMirror.getAssociationNamespaceAttribute('content',GUID,namespaceURI),
              x:parseInt(itemMirror.getAssociationNamespaceAttribute('x',GUID,namespaceURI),10),
              y:parseInt(itemMirror.getAssociationNamespaceAttribute('y',GUID,namespaceURI),10)
	          };

	    });
		refreshLoop();
	}
               
}

var add = function(obj){


	noteOptions ={
    	displayText:"Note",
    	itemURI:"Note" + generateUUID(),
    	localItemRequested:false
    };
   itemMirror.createAssociation ( noteOptions, function(err,GUID){
    	console.log("Creating new note..." + GUID);
    	if(err){
    		console.log(err);
    	}
    	// local copy
    	itemArray[GUID] = {
    		  id:GUID,
              content:obj.content,
              x:obj.x,
              y:obj.y
    	}

		console.log("Adding new attrs");

		
		itemMirror.setAssociationNamespaceAttribute ('content',obj.content, GUID, namespaceURI );
		itemMirror.setAssociationNamespaceAttribute ('x',obj.x, GUID, namespaceURI );
		itemMirror.setAssociationNamespaceAttribute ('y',obj.y, GUID, namespaceURI );
		
		console.log("New note created:" + GUID);	

		thereIsChanges = true;
		  		
    });	 


}


var remove = function(deleteId){
	
	delete itemArray[deleteId];
	
	itemMirror.deleteAssociation(deleteId,function(){
        thereIsChanges = true;	
    });
}



var save = function(obj){



	itemArray[obj.id] = {
		  id:obj.id,
          content:obj.content,
          x:obj.x,
          y:obj.y
	}


	itemMirror.setAssociationNamespaceAttribute('x',obj.x,obj.id,namespaceURI);          	
   	itemMirror.setAssociationNamespaceAttribute('y',obj.y,obj.id,namespaceURI);



}










return{
	$login:login,
	$add:add,
	$remove:remove,
	$save:save,
	$itemArray:itemArray
}






})



