

$(document).on("pageshow","#home",function(){
	$.ajax({
		url: "http://127.0.0.1:8001/computer/product_list/?limit=9&ordering=-sold", 
		success: function(res){
	    	console.log(res);
			$("#view").html("");
			for (var i = 0; i < res.results.length; i++) {
				$("#view").append(
		            '<div class="ui-block-a" id="' + res.results[i].id + '">'+
		                '<img style="max-height:160px;" src="' + res.results[i].image + '">'+
		            '</div>'+
		            '<div class="ui-block-b" id="b' + res.results[i].id + '" style="padding-top:50px;">'+
		                res.results[i].price +
		                '<br><br>'+
		                res.results[i].model +
		            '</div>'
				);    	
				$("#"+res.results[i].id).on("tap",function(){
					console.log("hey");
					console.log($(this).attr("id"));    
                    window.location.href = "product_details.html?id=" + $(this).attr("id");
				});  
				$("#b"+res.results[i].id).on("tap",function(){
					console.log("hey");
					console.log($(this).attr("id").slice(1));    
                    window.location.href = "product_details.html?id=" + $(this).attr("id").slice(1);
				});  				
			};
		}
	});
});




$(document).on("pageshow","#productList",function(){



    var url = window.location.href;

    var category = url.split("?")[1].split("=")[1];
    console.log(category); 

    switch(category) {
        case "1":
            $("#title").html("笔记本");
            break;
        case "2":
            $("#title").html("平板电脑");
            break;
        case "3":
            $("#title").html("一体机");
            break;
        case "4":
            $("#title").html("台式机");
            break;
        case "5":
            $("#title").html("服务器");
            break;                        
        default:
            $("#title").html("产品分类");
    }


    var global_prev = "";
    var global_next = "";


    $.ajax({
    	url: "http://127.0.0.1:8001/computer/product_list_by_category/?ordering=-sold&category="+category, 
    	success: function(res){
        	console.log(res);

            if (res.next != null){
                
                global_next = res.next;
            }else{
                
                global_next = "http://127.0.0.1:8001/computer/product_list_by_category/?ordering=-sold&category="+category;                       
            }

            if (res.previous != null){
                
                global_prev = res.previous;
            }else{
                
                global_prev = "http://127.0.0.1:8001/computer/product_list_by_category/?ordering=-sold&category="+category;                       
            }

    		$("#view").html("");

            for (var i = 0; i < res.results.length; i++) {
                $("#view").append(
                    '<div class="ui-block-a" id="' + res.results[i].id + '">'+
                        '<img style="max-height:160px;" src="' + res.results[i].image + '">'+
                    '</div>'+
                    '<div class="ui-block-b" id="b' + res.results[i].id + '" style="padding-top:50px;">'+
                        res.results[i].price +
                        '<br><br>'+
                        res.results[i].model +
                    '</div>'
                );      
                $("#"+res.results[i].id).on("tap",function(){
                    console.log("hey");
                    console.log($(this).attr("id"));    
                    window.location.href = "product_details.html?id=" + $(this).attr("id");
                });  
                $("#b"+res.results[i].id).on("tap",function(){
                    console.log("hey");
                    console.log($(this).attr("id").slice(1));    
                    window.location.href = "product_details.html?id=" + $(this).attr("id").slice(1);
                });                 
            };

    }});







    $("#prev").click(function(){

        $.ajax({
            url: global_prev, 
            success: function(res){
                console.log(res);

                $("#page_no").html((global_prev.split("page=")[1])?(global_prev.split("page=")[1]):"1");

                if (res.previous != null){
                    
                    global_prev = res.previous;
                }else{
                    
                               
                }

                if (res.next != null){
                    
                    global_next = res.next;
                }else{
                    
                               
                }

                $("#view").html("");

                for (var i = 0; i < res.results.length; i++) {
                    $("#view").append(
                        '<div class="ui-block-a" id="' + res.results[i].id + '">'+
                            '<img style="max-height:160px;" src="' + res.results[i].image + '">'+
                        '</div>'+
                        '<div class="ui-block-b" id="b' + res.results[i].id + '" style="padding-top:50px;">'+
                            res.results[i].price +
                            '<br><br>'+
                            res.results[i].model +
                        '</div>'
                    );      
                    $("#"+res.results[i].id).on("tap",function(){
                        console.log("hey");
                        console.log($(this).attr("id"));    
                        window.location.href = "product_details.html?id=" + $(this).attr("id");
                    });  
                    $("#b"+res.results[i].id).on("tap",function(){
                        console.log("hey");
                        console.log($(this).attr("id").slice(1));    
                        window.location.href = "product_details.html?id=" + $(this).attr("id").slice(1);
                    });                 
                };

        }});

    });




    $("#next").click(function(){

        $.ajax({
            url: global_next, 
            success: function(res){
                console.log(res);

                $("#page_no").html(global_next.split("page=")[1]);

                if (res.previous != null){
                    
                    global_prev = res.previous;
                }else{
                    
                               
                }

                if (res.next != null){
                    
                    global_next = res.next;
                }else{
                    
                               
                }

                $("#view").html("");

                for (var i = 0; i < res.results.length; i++) {
                    $("#view").append(
                        '<div class="ui-block-a" id="' + res.results[i].id + '">'+
                            '<img style="max-height:160px;" src="' + res.results[i].image + '">'+
                        '</div>'+
                        '<div class="ui-block-b" id="b' + res.results[i].id + '" style="padding-top:50px;">'+
                            res.results[i].price +
                            '<br><br>'+
                            res.results[i].model +
                        '</div>'
                    );      
                    $("#"+res.results[i].id).on("tap",function(){
                        console.log("hey");
                        console.log($(this).attr("id"));    
                        window.location.href = "product_details.html?id=" + $(this).attr("id");
                    });  
                    $("#b"+res.results[i].id).on("tap",function(){
                        console.log("hey");
                        console.log($(this).attr("id").slice(1));    
                        window.location.href = "product_details.html?id=" + $(this).attr("id").slice(1);
                    });                 
                };

        }});

    });







    $(".manufacturer").click(function(){
        console.log($(this).attr("value"));

        var tmp = "http://127.0.0.1:8001/computer/product_list_by_category_manufacturer/?ordering="+$(this).attr("ordering")+"&category="+category+"&manufacturer="+$(this).attr("value");

        $.ajax({
            url: "http://127.0.0.1:8001/computer/product_list_by_category_manufacturer/?ordering="+$(this).attr("ordering")+"&category="+category+"&manufacturer="+$(this).attr("value"), 
            success: function(res){
                console.log(res);
                $("#page_no").html("1");

                if (res.next != null){
                    
                    global_next = res.next;
                }else{
                    global_next = tmp;
                }

                if (res.previous != null){
                    
                    global_prev = res.previous;
                }else{
                    global_prev = tmp;                           
                }

                $("#view").html("");

                for (var i = 0; i < res.results.length; i++) {
                    $("#view").append(
                        '<div class="ui-block-a" id="' + res.results[i].id + '">'+
                            '<img style="max-height:160px;" src="' + res.results[i].image + '">'+
                        '</div>'+
                        '<div class="ui-block-b" id="b' + res.results[i].id + '" style="padding-top:50px;">'+
                            res.results[i].price +
                            '<br><br>'+
                            res.results[i].model +
                        '</div>'
                    );      
                    $("#"+res.results[i].id).on("tap",function(){
                        console.log("hey");
                        console.log($(this).attr("id"));    
                        window.location.href = "product_details.html?id=" + $(this).attr("id");
                    });  
                    $("#b"+res.results[i].id).on("tap",function(){
                        console.log("hey");
                        console.log($(this).attr("id").slice(1));    
                        window.location.href = "product_details.html?id=" + $(this).attr("id").slice(1);
                    });                 
                };

        }});


}); 



$(".ordering").click(function(){
    console.log($(this).attr("value"));

    var tmp = "http://127.0.0.1:8001/computer/product_list_by_category/?ordering="+$(this).attr("value")+"&category="+category;

    $.ajax({
        url: "http://127.0.0.1:8001/computer/product_list_by_category/?ordering="+$(this).attr("value")+"&category="+category, 
        success: function(res){
            console.log(res);
            $("#page_no").html("1");

            if (res.next != null){
                
                global_next = res.next;
            }else{
                global_next = tmp;
            }

            if (res.previous != null){
                
                global_prev = res.previous;
            }else{
                global_prev = tmp;                           
            }

            $("#view").html("");

            for (var i = 0; i < res.results.length; i++) {
                $("#view").append(
                    '<div class="ui-block-a" id="' + res.results[i].id + '">'+
                        '<img style="max-height:160px;" src="' + res.results[i].image + '">'+
                    '</div>'+
                    '<div class="ui-block-b" id="b' + res.results[i].id + '" style="padding-top:50px;">'+
                        res.results[i].price +
                        '<br><br>'+
                        res.results[i].model +
                    '</div>'
                );      
                $("#"+res.results[i].id).on("tap",function(){
                    console.log("hey");
                    console.log($(this).attr("id"));    
                    window.location.href = "product_details.html?id=" + $(this).attr("id");
                });  
                $("#b"+res.results[i].id).on("tap",function(){
                    console.log("hey");
                    console.log($(this).attr("id").slice(1));    
                    window.location.href = "product_details.html?id=" + $(this).attr("id").slice(1);
                });                 
            };

    }});


}); 








});


function myheader(){
    return {Authorization: 'Token ' + localStorage.getItem("token")};
};




$(document).on("pageshow","#productDetails",function(){
    var url = window.location.href;
    var id = url.split("?")[1].split("=")[1];
    $.ajax({
        url: "http://127.0.0.1:8001/computer/product_retrieve/" + id + "/", 
        success: function(res){
            console.log(res);

            $("#img").attr("src", res.image);
            $("#price").html(res.price);
            $("#model").html(res.model);
            $("#description").html(res.description);
            $("#manufacturer").html(res.manufacturer);

    }});
    $("#addtocart").click(function(){

        var quantity = $("#quantity").val();

        data = {quantity:quantity, product:id};

        console.log(data);

        $.ajax({
            url: "http://127.0.0.1:8001/computer/order_create/", 
            type: "POST",
            data: data,
            headers: myheader(),        
            success: function(res){
                console.log(res);
                alert("已成功添加到购物车！")
                window.location.href = "usercart.html";                 
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                console.log(jqXHR, textStatus, errorThrown);
                alert("咦，好像出错了！请确认您已经设定默认收货地址!")                     
            }    
        });
    });
});





$(document).on("pageshow","#usercenter",function(){
    var id = 0;
    $.ajax({
        url: "http://127.0.0.1:8001/computer/user_info/", 
        headers: myheader(),
        success: function(res){
            console.log(res);
            id = res.id;
            // $("#id").html("id：" + res.id);
            $("#username").html("用户名：" + res.username);
            $("#email").html("邮箱：" + res.email);
            $("#last_name").html("姓：" + res.last_name);
            $("#first_name").html("名：" + res.first_name);
            $("#date_joined").html("注册时间：" + res.date_joined.substring(0,10));
            $("#mobile_phone").val(res.profile_of.mobile_phone);
            $("#nickname").val(res.profile_of.nickname);
            $("#description").val(res.profile_of.description);
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
             console.log(jqXHR, textStatus, errorThrown);
             window.location.href = "userlogin.html";
        }    
    });
    $("#logout").click(function(){

        localStorage.removeItem('token');
        window.location.href = "usercenter.html";

    });
    $("#update").click(function(){

        var data = {
            mobile_phone: $("#mobile_phone").val(),
            nickname: $("#nickname").val(),
            description: $("#description").val()
        }; 
        $.ajax({
            url: "http://127.0.0.1:8001/computer/user_profile_ru/" + id + "/", 
            type: "PATCH",
            data: data,
            headers: myheader(),        
            success: function(res){
                console.log(res);
                window.location.href = "usercenter.html";           
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                 console.log(jqXHR, textStatus, errorThrown);
            }    
        });
    });
});





$(document).on("pageshow","#useraddress",function(){
    $.ajax({
        url: "http://127.0.0.1:8001/computer/delivery_address_lc/", 
        headers: myheader(),
        success: function(res){
            console.log(res);

            $("#view").html("");

            for (var i = 0; i < res.results.length; i++) {

                $("#view").append(

    '<div style="padding-top:20px;" class="col-xs-12 col-sm-12 col-md-12 col-lg-12" value="' + res.results[i].id + '">' +
      '<div style="text-align:left;padding-left:0px;">收货地址' + (i+1) + '</div>' +
      '<div style="text-align:left;padding-left:0px;">联系人：' + res.results[i].contact_person + '</div>' +  
      '<div style="text-align:left;padding-left:0px;">联系电话：' + res.results[i].contact_mobile_phone + '</div>' +  
      '<div style="text-align:left;padding-left:0px;">收货地址：' + res.results[i].delivery_address + '</div>' +  

      '<button type="submit" class="btn btn-default gotoDetails" id="create" value="' + res.results[i].id + '">管理</button>'+

    '</div>'

                );      

                $(".gotoDetails").click(function(){
                    console.log($(this).attr("value"));
                    window.location.href = "useraddress_details.html?id=" + $(this).attr("value");
                }); 

            };


        },
        error: function (jqXHR, textStatus, errorThrown)
        {
             console.log(jqXHR, textStatus, errorThrown);
        }    
    });





    $("#create").click(function(){

        var data = {
            contact_person: $("#contact_person").val(),
            contact_mobile_phone: $("#contact_mobile_phone").val(),     
            delivery_address: $("#delivery_address").val()
        }; 


        $.ajax({
            url: "http://127.0.0.1:8001/computer/delivery_address_lc/", 
            type: "POST",
            data: data,
            headers: myheader(),        
            success: function(res){
                console.log(res);
                window.location.href = "useraddress.html";

            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                 console.log(jqXHR, textStatus, errorThrown);
            }    
        });



    });



});





$(document).on("pageshow","#useraddress_details",function(){
    var url = window.location.href;

    var id = url.split("?")[1].split("=")[1];


    $.ajax({
        url: "http://127.0.0.1:8001/computer/delivery_address_rud/" + id + "/", 
        headers: myheader(),
        success: function(res){
            console.log(res);

            $("#contact_person").val(res.contact_person);
            $("#contact_mobile_phone").val(res.contact_mobile_phone);
            $("#delivery_address").val(res.delivery_address);



        },
        error: function (jqXHR, textStatus, errorThrown)
        {
             console.log(jqXHR, textStatus, errorThrown);
        }    
    });





    $("#update").click(function(){

        var data = {
            contact_person: $("#contact_person").val(),
            contact_mobile_phone: $("#contact_mobile_phone").val(),     
            delivery_address: $("#delivery_address").val()
        }; 


        $.ajax({
            url: "http://127.0.0.1:8001/computer/delivery_address_rud/" + id + "/", 
            type: "PATCH",
            data: data,
            headers: myheader(),        
            success: function(res){
                console.log(res);
                window.location.href = "useraddress.html";          
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                 console.log(jqXHR, textStatus, errorThrown);
            }    
        });



    });




    $("#delete").click(function(){

        $.ajax({
            url: "http://127.0.0.1:8001/computer/delivery_address_rud/" + id + "/", 
            type: "DELETE",
            headers: myheader(),        
            success: function(res){
                // console.log(res);
                window.location.href = "useraddress.html";
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                 console.log(jqXHR, textStatus, errorThrown);
            }    
        });



    });


});






$(document).on("pageshow","#usercart",function(){

    var address_chosen = 0;


    $.ajax({
        url: "http://127.0.0.1:8001/computer/cart_list/", 
        headers: myheader(),
        success: function(res){
            console.log(res);


            $("#view").html("");

            for (var i = 0; i < res.results.length; i++) {
                $("#view").append(
                    '<div class="ui-block-a" id="' + res.results[i].id + '">'+
                        '<img style="max-height:160px;" src="' + res.results[i].product.image + '">'+
                    '</div>'+
                    '<div class="ui-block-b" style="padding-top:20px;">'+
                        '商品：' + res.results[i].product.model + '<br>' +
                        '单价：' + res.results[i].price + '<br>' +
                        '数量：' + res.results[i].quantity + '<br>' +
                        '小计：' + (res.results[i].price * res.results[i].quantity) + '<br>' +
                        '送货地址：' + res.results[i].address.delivery_address + ' --- ' + res.results[i].address.contact_person + ' --- ' + res.results[i].address.contact_mobile_phone + '<br>' +
                    '</div>' +
                    '<div class="ui-block-a" id="' + res.results[i].id + '">'+
                        '<div class="gotoDetails" style="text-align:center;" value="'+ res.results[i].id +'"><button class="ui-btn ui-btn-inline">删除</button></div>'+
                    '</div>'+
                    '<div class="ui-block-b">'+
                        '<div class="gotoDetails2" style="text-align:center;" value="'+ res.results[i].id +'"><button class="ui-btn ui-btn-inline">下单</button></div>'+
                    '</div>'
                );  
    
                $(".gotoDetails").click(function(){

                    $.ajax({
                        url: "http://127.0.0.1:8001/computer/order_rud/" + $(this).attr("value") + "/", 
                        type: "DELETE",                 
                        headers: myheader(),
                        success: function(res){
                            console.log(res);
                            window.location.href = "usercart.html";

                        },
                        error: function (jqXHR, textStatus, errorThrown)
                        {
                             console.log(jqXHR, textStatus, errorThrown);
                        }    
                    });

                }); 

                $(".gotoDetails2").click(function(){

                    $.ajax({
                        url: "http://127.0.0.1:8001/computer/order_rud/" + $(this).attr("value") + "/", 
                        type: "PATCH",                  
                        headers: myheader(),
                        success: function(res){
                            console.log(res);
                            window.location.href = "order_success.html";

                        },
                        error: function (jqXHR, textStatus, errorThrown)
                        {
                             console.log(jqXHR, textStatus, errorThrown);
                        }    
                    });

                }); 

            };


        },
        error: function (jqXHR, textStatus, errorThrown)
        {
             console.log(jqXHR, textStatus, errorThrown);
        }    
    });


});





$(document).on("pageshow","#userorder",function(){
    var address_chosen = 0;

    $.ajax({
        url: "http://127.0.0.1:8001/computer/order_list/", 
        headers: myheader(),
        success: function(res){
            console.log(res);


            $("#view").html("");

            for (var i = 0; i < res.results.length; i++) {

                status_text = ""

                switch (res.results[i].status) {
                    case "1":
                        status_text = "尚未付款";
                        break;
                    case "2":
                        status_text = "已付款";
                        break;
                    case "3":
                        status_text = "送货中";
                        break;
                    case "4":
                        status_text = "完成";
                        break;
                }


                $("#view").append(
                    '<div class="ui-block-a" id="' + res.results[i].id + '">'+
                        '<img style="max-height:160px;" src="' + res.results[i].product.image + '">'+
                    '</div>'+
                    '<div class="ui-block-b" style="padding-top:20px;">'+
                        '单号：' + res.results[i].id + '<br>' +
                        '状态：' + status_text + '<br>' +
                        '商品：' + res.results[i].product.model + '<br>' +
                        '单价：' + res.results[i].price + '<br>' +
                        '数量：' + res.results[i].quantity + '<br>' +
                        '小计：' + (res.results[i].price * res.results[i].quantity) + '<br>' +
                        '送货地址：' + res.results[i].address.delivery_address + ' --- ' + res.results[i].address.contact_person + ' --- ' + res.results[i].address.contact_mobile_phone + '<br>' +
                    '</div>'
                );      

                $(".gotoDetails").click(function(){
                    console.log($(this).attr("value"));
                    window.location.href = "userorder_detail.html?id=" + $(this).attr("value");
                }); 

            };



            return 0;


            cart = res.results[0].cart
            cart = JSON.parse(cart);
            console.log(cart);


            $("#view").html("");

            for (i in cart) {

                $("#view").append(
                  '<tr>'+
                    '<td><img class="img-responsive" style="max-height:60px;" src="http://127.0.0.1:8001/media/' + cart[i].image + '"></td>'+
                    '<td>' + cart[i].model + '</td>'+
                    '<td>' + cart[i].price + '</td>'+
                    '<td>' + cart[i].quantity + '</td>'+
                    '<td>' + (cart[i].price * cart[i].quantity) + '</td>'+
                    '<th class="gotoDetails" value=""><button>删除</button></th>'+
                  '</tr>'
                );      

                $(".gotoDetails").click(function(){
                    console.log($(this).attr("value"));
                    window.location.href = "useraddress_details.html?id=" + $(this).attr("value");
                }); 

            };


        },
        error: function (jqXHR, textStatus, errorThrown)
        {
             console.log(jqXHR, textStatus, errorThrown);
        }    
    });



    $(".gotoDetails").click(function(){
        console.log($(this).attr("value"));
        // window.location.href = "useraddress_details.html?id=" + $(this).attr("value");
    }); 


});




$(document).on("pageshow","#userlogin",function(){
    $("#submit").click(function(){

        var data = {
            username: $("#username").val(),
            password: $("#password").val()
        }; 


        $.ajax({
            url: "http://127.0.0.1:8001/api-token-auth/", 
            type: "POST",
            data: data,
            success: function(res){
                // console.log(res.token);
                localStorage.setItem("token", res.token);
                window.location.href = "usercenter.html";

            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                 console.log(jqXHR, textStatus, errorThrown);
                 alert("用户名或密码错误！");
            }    
        });



    });

});






$(document).on("pageshow","#usersignin",function(){
    $("#submit").click(function(){

        var data = {
            username: $("#username").val(),
            password: $("#password").val(),
            last_name: $("#last_name").val(),
            first_name: $("#first_name").val(),
            email: $("#email").val()            
        }; 


        $.ajax({
            url: "http://127.0.0.1:8001/computer/user_create/", 
            type: "POST",
            data: data,
            success: function(res){
                console.log(res);
                alert("注册成功");
                // localStorage.setItem("token", res.token);
                window.location.href = "userlogin.html";

            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                 console.log(jqXHR, textStatus, errorThrown);
            }    
        });



    });

});



