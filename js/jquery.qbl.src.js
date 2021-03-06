(function(window){
	var jQMethod = function () {
		// body...
	};
	jQMethod.fn = jQMethod.prototype={
		storage : {
			//setUserFlag
			setParam: function(_k, _v) {
			    localStorage.setItem(_k, _v);
			},
			clear: function() {
			    localStorage.clear();
			},
		},
		/**
		 * [objIsEmpty description] 判断map 是否为空
		 * @param  {[type]} _k [description]
		 * @return {[type]}    [description]
		 */
		objIsEmpty:function (_obj) {
			return jQuery.isEmptyObject(_obj);
		}

	};
	var JQMethod = new jQMethod();
    jQMethod.prototype = JQMethod;
 	window.JQMethod = new jQMethod();
	/**
	 * [formatDate description] 时间格式化
	 * @param  {[type]} obj    [description] 时间
	 * @param  {[type]} format [description] 格式
	 * @return {[type]}        [description]
	 */
	$.formatDate = function(obj, format) {
		var date;
		if (obj instanceof Date) {
			date = obj;
		} else if (this.type(obj) === "number") {
			date = new Date(obj);
		} else {
			throw new Error('illegal arguments,only can be Date or millisecond');
		}
		if (!format) {
			format = "yyyy-MM-dd hh:mm:ss";
		}
		var o = {
			"M+": date.getMonth() + 1, //month 
			"d+": date.getDate(), //day 
			"h+": date.getHours(), //hour 
			"m+": date.getMinutes(), //minute 
			"s+": date.getSeconds(), //second 
			"q+": Math.floor((date.getMonth() + 3) / 3), //quarter 
			"S": date.getMilliseconds() //millisecond 
		};
		if (/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
			}
		}
		return format;
	};

	/**
	 * [getUrlParam description] 获取URL 参数
	 * @param  {[type]} name [description] 参数
	 * @return {[type]}      [description]
	 */
	$.getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r !== null) return unescape(r[2]);
		return null;
	};

	/* 
	* 判断object是否空，未定义或null 
	* @param object  
	* @return 
	*/  
	$.isNull = function (obj) {  
	    if (obj == "" || typeof(obj) == "undefined" || obj == null) {  
	        return true;  
	    }  
	    else {  
	        return false;  
	    }  
	};  

	/* 
	* 正则验证 
	* @param str 验证字符串 
	* @param type 验证类型 money,china,mobile等  
	* @return 
	*/  
	$.regExp = function (str, type) {  
	    var objbool = false;  
	    var objexp = "";  
	    switch (type) {  
	        case 'money': //金额格式,格式定义为带小数的正数，小数点后最多三位  
	            objexp = "^[0-9]+[\.][0-9]{0,3}$";  
	            break;  
	        case 'numletter_': //英文字母和数字和下划线组成     
	            objexp = "^[0-9a-zA-Z\_]+$";  
	            break;  
	        case 'numletter': //英文字母和数字组成  
	            objexp = "^[0-9a-zA-Z]+$";  
	            break;  
	        case 'numletterchina': //汉字、字母、数字组成   
	            objexp = "^[0-9a-zA-Z\u4e00-\u9fa5]+$";  
	            break;  
	        case 'email': //邮件地址格式   
	            objexp = "^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$";  
	            break;    
	        case 'tel': //固话格式   
	            objexp = /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/;  
	            break;  
	        case 'mobile': //手机号码   
	            objexp = "^(13[0-9]|15[0-9]|18[0-9])([0-9]{8})$";  
	            break;  
	        case 'decimal': //浮点数   
	            objexp = "^[0-9]+([.][0-9]+)?$";  
	            break;  
	        case 'url': //网址   
	            objexp = "(http://|https://){0,1}[\w\/\.\?\&\=]+";  
	            break;  
	        case 'date': //日期 YYYY-MM-DD格式  
	            objexp = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;  
	            break;  
	        case 'int': //整数   
	            objexp = "^[0-9]*[1-9][0-9]*$";  
	            break;  
	        case 'int+': //正整数包含0  
	            objexp = "^\\d+$";  
	            break;  
	        case 'int-': //负整数包含0
	            objexp = "^((-\\d+)|(0+))$";
	            break;
	        case 'china': //中文   
	            objexp = /^[\u0391-\uFFE5]+$/;
	            break;
	    }  
	    var re = new RegExp(objexp);  
		re.test(str) ?
			return true: return false;
	};  

	/**
	 * [pagging description] 分页
	 * @param  {[type]} opts [description]
	 * @return {[type]}      [description]
	 */
	$.fn.pagging = function(opts){

		var defaults = {
			current : 1,
			pagesize : 10,
			sum : 0,
			param : {},
			callback:null
		};

		var options = $.extend(defaults, opts || {} );

		return this.each(function() {
			$this = $(this);

			var pages = Math.ceil(options.sum / options.pagesize);

			var html = [];
			html.push('<ul >');

			if (pages === 0 || pages === 1) {

				html.push('<li class="disabled" data-idx = "-1"><a href ="javascript:void(0);">上一页</a></li>');
				html.push('<li class="active" data-idx = "-1"><a href ="javascript:void(0);">1</a></li>');
				html.push('<li class="disabled" data-idx = "-1"><a href ="javascript:void(0);">下一页</a></li>');

			} else {
				html.push('<li ' + (options.current == 1 ? 'class="disabled" data-idx = "-1"' : 'data-idx="' + (options.current - 1) + '"') + '>');
				html.push('<a href ="javascript:void(0);">上一页</a></li>');
				
				if(pages>10){
					var flag = false;
					for(var i = 1 ;i<=pages;i++){
						
						if( i<=3){
//							if( i<=3 || i>= pages -2 ){
							html.push('<li ' + (options.current == i ? 'class="active" data-idx = "-1"' : 'data-idx="' + i + '"') + '>');
							html.push( '<a href ="javascript:void(0);">' + i + '</a></li>');
							continue;
						}
						
						if((i==4)&& !flag && (options.current <= 3 || options.current == pages)){
							html.push('<li class="disabled" data-idx = "-1" ><a href ="javascript:void(0);"> ... </a></li>');
							flag = true;
						}
						
						if(options.current >= 4 && options.current <= pages-1){
							if(i == options.current -2){
								html.push('<li class="disabled" data-idx = "-1" ><a href ="javascript:void(0);"> ... </a></li>');
							}
							if(i>= options.current -1&& i<= options.current +1){
								html.push('<li ' + (options.current == i ? 'class="active" data-idx = "-1"' : 'data-idx="' + i + '"') + '>');
								html.push('<a href ="javascript:void(0);">' + i + '</a></li>');
							}
							if(i == options.current + 2){
								html.push('<li class="disabled" data-idx = "-1" ><a href ="javascript:void(0);"> ... </a></li>');
							}
						}
					}
					
				}else{
					for ( var j = 1; j <= pages; j++) {
						html.push('<li ' + (options.current == j ? 'class="active" data-idx = "-1"' : 'data-idx="' + j + '"') + '>');
						html.push('<a href ="javascript:void(0);">' + j + '</a></li>');
					}
				}
				html.push('<li ' + (options.current == pages ? 'class="disabled" data-idx = "-1"' : 'data-idx="' + (options.current + 1) + '"') + '>');
				html.push('<a href ="javascript:void(0);">下一页</a></li>');
			}
			html.push('</ul>');
			$this.html(html.join(''));

			if($.isFunction(options.callback)){
				$this.find("ul>li").click(function() {
					var idx = $(this).data("idx");
					if (idx != -1) {
						options.callback(idx,options.param);
					}
				});
			}
		});
	};

	/**
	 * ajax封装
	 * url 发送请求的地址
	 * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
	 * async 默认值: true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。
	 *       注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
	 * type 请求方式("POST" 或 "GET")， 默认为 "GET"
	 * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
	 * beforeSendfn 在发送请求之前调用
	 * successfn 成功回调函数
	 * errorfn 失败回调函数
	 * completefn 当请求完成之后调用这个函数
	 * qbl
	 */
	$.fn.customAjax = function(url, data, async, type, dataType, beforeSendfn, successfn, errorfn, completefn) {
	    async = (async == null || async == "" || typeof(async) == "undefined") ? "true" : async;
	    type = (type == null || type == "" || typeof(type) == "undefined") ? "post" : type;
	    dataType = (dataType == null || dataType == "" || typeof(dataType) == "undefined") ? "json" : dataType;
	    data = (data == null || data == "" || typeof(data) == "undefined") ? {
	        "date": new Date().getTime()
	    } : data;
	    $.ajax({
	        type: type,
	        async: async,
	        data: data,
	        url: url,
	        dataType: dataType,
	        timeout: 20000,
	        beforeSend: function() {
	           // AJAX 请求前显示loading
	        },
	        success: function(data) {
	            successfn(data);
	        },
	        error: function(data, status,thrown) {
	            errorfn(data,status,thrown);
	        },
	        complete: function() {
	            // AJAX 请求介绍关闭loading
	        }
	    });
	}

})(window);