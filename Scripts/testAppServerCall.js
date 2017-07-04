$(document).ready(function(){
    $("#appServer").click(function(){
        alert("ok here");
        

		$.ajax({                                      
		  url: 'PHP/phptest.php',                          
		  data: "",                       							   
		  dataType: 'text',                    
		  success: function(data)          
		  {
			  alert("Data :" + data);
		  },
		  error: function(obj,str,exobj)
		  {
			  alert("error: " + str + ".");
		  }
		  });
				


	});
});
