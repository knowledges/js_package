(function (window) {
	
	var iMethod = function () {
		// body...
	};
	iMethod.fn = iMethod.prototype={
		findPassword:findPassword
	};
	var IMethod = new iMethod();
    iMethod.prototype = IMethod;
 	window.IMethod = new iMethod();


	function findPassword(option) {
		var param = "www.baidu.com?type="+option.index;
		var BASEURL = "www.baidu.com";
	    $.fn.customAjax(
	        BASEURL,
	        param,
	        true,
	        "get",
	        "json",
	        function() {},
	        function(data) {
	        	option.success(data);
	        },
	        function() {
	            option.timeout();
	        },
	        function() {}
	    )
	}
})(window);