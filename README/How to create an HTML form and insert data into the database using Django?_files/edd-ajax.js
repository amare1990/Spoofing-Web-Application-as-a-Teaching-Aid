var edd_scripts;function edd_load_gateway(payment_mode){jQuery(".edd-cart-ajax").show(),jQuery("#edd_purchase_form_wrap").html('<span class="edd-loading-ajax edd-loading"></span>');var nonce=document.getElementById("edd-gateway-"+payment_mode).getAttribute("data-"+payment_mode+"-nonce"),url=edd_scripts.ajaxurl;0<url.indexOf("?")?url+="&":url+="?",url=url+"payment-mode="+payment_mode,jQuery.post(url,{action:"edd_load_gateway",edd_payment_mode:payment_mode,nonce:nonce},function(response){jQuery("#edd_purchase_form_wrap").html(response),jQuery(".edd-no-js").hide(),jQuery("body").trigger("edd_gateway_loaded",[payment_mode])})}jQuery(document).ready(function($){var chosen_gateway,ajax_needed;$(".edd-no-js").hide(),$("a.edd-add-to-cart").addClass("edd-has-js"),$(document.body).on("click.eddRemoveFromCart",".edd-remove-from-cart",function(event){var nonce=$(this),item=nonce.data("cart-item"),action=nonce.data("action"),id=nonce.data("download-id"),nonce=nonce.data("nonce");return $.ajax({type:"POST",data:{action:action,cart_item:item,nonce:nonce},dataType:"json",url:edd_scripts.ajaxurl,xhrFields:{withCredentials:!0},success:function(response){if(response.removed){if(parseInt(edd_scripts.position_in_cart,10)===parseInt(item,10)||edd_scripts.has_purchase_links)return window.location=window.location,!1;$(".edd-cart").each(function(){$(this).find("[data-cart-item='"+item+"']").parent().remove()}),$(".edd-cart").each(function(){var cart_item_counter=0;$(this).find("[data-cart-item]").each(function(){$(this).attr("data-cart-item",cart_item_counter),cart_item_counter+=1})}),$("[id^=edd_purchase_"+id+"]").length&&($("[id^=edd_purchase_"+id+"] .edd_go_to_checkout").hide(),$("[id^=edd_purchase_"+id+"] a.edd-add-to-cart").show().removeAttr("data-edd-loading"),"1"==edd_scripts.quantities_enabled&&$("[id^=edd_purchase_"+id+"] .edd_download_quantity_wrapper").show()),$("span.edd-cart-quantity").text(response.cart_quantity),$(document.body).trigger("edd_quantity_updated",[response.cart_quantity]),edd_scripts.taxes_enabled&&($(".cart_item.edd_subtotal span").html(response.subtotal),$(".cart_item.edd_cart_tax span").html(response.tax)),$(".cart_item.edd_total span").html(response.total),0==response.cart_quantity&&($(".cart_item.edd_subtotal,.edd-cart-number-of-items,.cart_item.edd_checkout,.cart_item.edd_cart_tax,.cart_item.edd_total").hide(),$(".edd-cart").each(function(){var cart_wrapper=$(this).parent();cart_wrapper.length&&(cart_wrapper.addClass("cart-empty"),cart_wrapper.removeClass("cart-not-empty")),$(this).append('<li class="cart_item empty">'+edd_scripts.empty_cart_message+"</li>")})),$(document.body).trigger("edd_cart_item_removed",[response])}}}).fail(function(response){window.console&&window.console.log&&console.log(response)}).done(function(response){}),!1}),$(document.body).on("click.eddAddToCart",".edd-add-to-cart",function(e){e.preventDefault();var $this=$(this),form=$this.closest("form");$this.prop("disabled",!0);$this.find(".edd-loading");var container=$this.closest("div");$this.attr("data-edd-loading","");var form=$this.parents("form").last(),download=$this.data("download-id"),variable_price=$this.data("variable-price"),price_mode=$this.data("price-mode"),data=$this.data("nonce"),item_price_ids=[],free_items=!0;if("yes"==variable_price)if(0<form.find(".edd_price_option_"+download+'[type="hidden"]').length)item_price_ids[0]=$(".edd_price_option_"+download,form).val(),form.find(".edd-submit").data("price")&&0<form.find(".edd-submit").data("price")&&(free_items=!1);else{if(!form.find(".edd_price_option_"+download+":checked",form).length)return $this.removeAttr("data-edd-loading"),alert(edd_scripts.select_option),e.stopPropagation(),$this.prop("disabled",!1),!1;form.find(".edd_price_option_"+download+":checked",form).each(function(item_price){item_price_ids[item_price]=$(this).val(),!0!==free_items||(item_price=$(this).data("price"))&&0<item_price&&(free_items=!1)})}else item_price_ids[0]=download,$this.data("price")&&0<$this.data("price")&&(free_items=!1);if(free_items&&form.find(".edd_action_input").val("add_to_cart"),"straight_to_gateway"==form.find(".edd_action_input").val())return form.submit(),!0;data={action:$this.data("action"),download_id:download,price_ids:item_price_ids,post_data:$(form).serialize(),nonce:data,timestamp:$this.data("timestamp"),token:$this.data("token")};return $.ajax({type:"POST",data:data,dataType:"json",url:edd_scripts.ajaxurl,xhrFields:{withCredentials:!0},success:function(response){var store_redirect="1"==edd_scripts.redirect_to_checkout,parent_form="1"==form.find("#edd_redirect_to_checkout").val();store_redirect&&parent_form||!store_redirect&&parent_form?window.location=edd_scripts.checkout_page:("1"===edd_scripts.taxes_enabled&&($(".cart_item.edd_subtotal").show(),$(".cart_item.edd_cart_tax").show()),$(".cart_item.edd_total").show(),$(".cart_item.edd_checkout").show(),$(".cart_item.empty").length&&$(".cart_item.empty").hide(),$(".widget_edd_cart_widget .edd-cart").each(function(cart){var cart_wrapper=$(this).find(".edd-cart-meta:first");$(response.cart_item).insertBefore(cart_wrapper);cart_wrapper=$(this).parent();cart_wrapper.length&&(cart_wrapper.addClass("cart-not-empty"),cart_wrapper.removeClass("cart-empty"))}),"1"===edd_scripts.taxes_enabled&&($(".edd-cart-meta.edd_subtotal span").html(response.subtotal),$(".edd-cart-meta.edd_cart_tax span").html(response.tax)),$(".edd-cart-meta.edd_total span").html(response.total),$(".edd-cart-item-title",response.cart_item).length,$("span.edd-cart-quantity").each(function(){$(this).text(response.cart_quantity),$(document.body).trigger("edd_quantity_updated",[response.cart_quantity])}),"none"==$(".edd-cart-number-of-items").css("display")&&$(".edd-cart-number-of-items").show("slow"),"no"!=variable_price&&"multi"==price_mode||($("a.edd-add-to-cart",container).toggle(),$(".edd_go_to_checkout",container).css("display","inline-block")),"multi"==price_mode&&$this.removeAttr("data-edd-loading"),!$(".edd_download_purchase_form").length||"no"!=variable_price&&form.find(".edd_price_option_"+download).is("input:hidden")||(parent_form=$('.edd_download_purchase_form *[data-download-id="'+download+'"]').parents("form"),$("a.edd-add-to-cart",parent_form).hide(),"multi"!=price_mode&&parent_form.find(".edd_download_quantity_wrapper").slideUp(),$(".edd_go_to_checkout",parent_form).show().removeAttr("data-edd-loading")),"incart"!=response&&($(".edd-cart-added-alert",container).fadeIn(),setTimeout(function(){$(".edd-cart-added-alert",container).fadeOut()},3e3)),$this.prop("disabled",!1),$(document.body).trigger("edd_cart_item_added",[response]))}}).fail(function(response){window.console&&window.console.log&&console.log(response)}).done(function(response){}),!1}),$("#edd_checkout_form_wrap").on("click",".edd_checkout_register_login",function(){var data=$(this),data={action:data.data("action"),nonce:data.data("nonce")};return $(".edd-cart-ajax").show(),$.post(edd_scripts.ajaxurl,data,function(checkout_response){$("#edd_checkout_login_register").html(edd_scripts.loading),$("#edd_checkout_login_register").html(checkout_response),$(".edd-cart-ajax").hide()}),!1}),$(document).on("click","#edd_purchase_form #edd_login_fields input[type=submit]",function(data){data.preventDefault();var complete_purchase_val=$(this).val();$(this).val(edd_global_vars.purchase_loading),$(this).after('<span class="edd-loading-ajax edd-loading"></span>');data={action:"edd_process_checkout_login",edd_ajax:1,edd_user_login:$("#edd_login_fields #edd_user_login").val(),edd_user_pass:$("#edd_login_fields #edd_user_pass").val(),edd_login_nonce:$("#edd_login_nonce").val()};$.post(edd_global_vars.ajaxurl,data,function(data){"success"==$.trim(data)?($(".edd_errors").remove(),window.location=edd_scripts.checkout_page):($("#edd_login_fields input[type=submit]").val(complete_purchase_val),$(".edd-loading-ajax").remove(),$(".edd_errors").remove(),$("#edd-user-login-submit").before(data))})}),$(document).on("change","select#edd-gateway, input.edd-gateway",function(e){var payment_mode=$("#edd-gateway option:selected, input.edd-gateway:checked").val();return"0"==payment_mode||edd_load_gateway(payment_mode),!1}),"1"==edd_scripts.is_checkout&&(ajax_needed=chosen_gateway=!1,$("select#edd-gateway, input.edd-gateway").length&&(chosen_gateway=$("meta[name='edd-chosen-gateway']").attr("content"),ajax_needed=!0),chosen_gateway=chosen_gateway||edd_scripts.default_gateway,ajax_needed?setTimeout(function(){edd_load_gateway(chosen_gateway)},200):$("body").trigger("edd_gateway_loaded",[chosen_gateway])),$(document).on("click","#edd_purchase_form #edd_purchase_submit [type=submit]",function(e){var complete_purchase_val,eddPurchaseform=document.getElementById("edd_purchase_form");"function"==typeof eddPurchaseform.checkValidity&&!1===eddPurchaseform.checkValidity()||(e.preventDefault(),complete_purchase_val=$(this).val(),$(this).attr("data-original-value",complete_purchase_val),$(this).val(edd_global_vars.purchase_loading),$(this).prop("disabled",!0),$(this).after('<span class="edd-loading-ajax edd-loading"></span>'),$.post(edd_global_vars.ajaxurl,$("#edd_purchase_form").serialize()+"&action=edd_process_checkout&edd_ajax=true",function(data){"success"==$.trim(data)?($(".edd_errors").remove(),$(".edd-error").hide(),$(eddPurchaseform).submit()):($("#edd-purchase-button").val(complete_purchase_val),$(".edd-loading-ajax").remove(),$(".edd_errors").remove(),$(".edd-error").hide(),$(edd_global_vars.checkout_error_anchor).before(data),$("#edd-purchase-button").prop("disabled",!1),$(document.body).trigger("edd_checkout_error",[data]))}))}),$(document.body).on("change","#edd_cc_address input.card_state, #edd_cc_address select, #edd_address_country",function(){var $form,$this=$(this),is_checkout="undefined"!=typeof edd_global_vars,field_name="card_state";"edd_address_country"==$(this).attr("id")&&(field_name="edd_address_state");var postData=document.getElementById(field_name);"card_state"!=$this.attr("id")&&null!=postData?(postData=$(this).data("nonce"),postData={action:"edd_get_shop_states",country:$this.val(),field_name:field_name,nonce:postData},$.ajax({type:"POST",data:postData,url:edd_scripts.ajaxurl,xhrFields:{withCredentials:!0},success:function(response){$form=is_checkout?$("#edd_purchase_form"):$this.closest("form");var text_field,state_inputs='input[name="card_state"], select[name="card_state"], input[name="edd_address_state"], select[name="edd_address_state"]';"nostates"==$.trim(response)?(text_field='<input type="text" id='+field_name+' name="card_state" class="card-state edd-input required" value=""/>',$form.find(state_inputs).replaceWith(text_field)):$form.find(state_inputs).replaceWith(response),is_checkout&&$(document.body).trigger("edd_cart_billing_address_updated",[response])}}).fail(function(data){window.console&&window.console.log&&console.log(data)}).done(function(data){is_checkout&&recalculate_taxes()})):is_checkout&&recalculate_taxes();return!1}),$(document.body).on("change","#edd_cc_address input[name=card_zip]",function(){"undefined"!=typeof edd_global_vars&&recalculate_taxes()})});