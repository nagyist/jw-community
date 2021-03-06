(function($){
    $.fn.extend({
        dynamicOptions : function(o){
            var target = this;
            if($(target)){
                if (o.nonce === '') {
                    $('[name='+o.controlField+']').live("change", function(){
                        showHideOption(target, o);
                    });
                    showHideOption(target, o);
                } else {
                    $('[name='+o.controlField+']').live("change", function(){
                        ajaxOptions(target, o);
                    });
                }
            }
            return target;
        }
    });
    
    function getValues(name) {
        //get enabled input field oni
        var el = $('[name='+name+']').filter("input[type=hidden]:not([disabled=true]), :enabled, [disabled=false]");
        var values = new Array();
        
        if ($(el).is("select")) {
            el = $(el).find("option:selected");
        } else if ($(el).is("input[type=checkbox], input[type=radio]")) {
            el = $(el).filter(":checked");
        } 
        
        $(el).each(function() {
            values.push($(this).val());
        });
        
        return values;
    }
    
    function ajaxOptions(target, o){
        var controlValues = getValues(o.controlField);
        var values = getValues(o.paramName);
        
        var cv = controlValues.join(";");
        $.getJSON(o.contextPath + "/web/json/app/"+o.appId+"/"+o.appVersion+"/form/options",
            {
                _dv: cv, 
                _n: o.nonce,
                _bd: o.binderData
            }, 
            function(data){
                if (o.type === "selectbox") {
                    var options = "";
                    for (var i=0, len=data.length; i < len; i++) {
                        var selected = "";
                        if ($.inArray(UI.escapeHTML(data[i].value), values) !== -1) {
                            selected = "selected=\"selected\"";
                        }
                        options += "<option "+selected+" value=\""+UI.escapeHTML(data[i].value)+"\">"+UI.escapeHTML(data[i].label)+"</option>"
                    }
                    $(target).html(options);
                } else {
                    var options = "";
                    for (var i=0, len=data.length; i < len; i++) {
                        var checked = "";
                        if ($.inArray(UI.escapeHTML(data[i].value), values) !== -1) {
                            checked = "checked=\"checked\"";
                        }
                        options += "<label><input "+checked+" id=\""+o.paramName+"\" name=\""+o.paramName+"\" type=\""+o.type+"\" value=\""+UI.escapeHTML(data[i].value)+"\" />"+UI.escapeHTML(data[i].label)+"</label>";
                    }
                    $(target).html(options);
                    
                    if (o.readonly === "true") {
                        $(target).find("input").click(function(){
                            return false;
                        });         
                    }
                }
                $('[name='+o.paramName+']').trigger("change");
            }
        );
    }
    
    function showHideOption(target, o){
        var controlValues = getValues(o.controlField);
        
        if ($(target).is("select")) {
            if ($(target).closest(".form-cell").find('select.dynamic_option_container').length == 0) {
                $(target).after('<div class="ui-screen-hidden"><select class="dynamic_option_container" style="display:none;">'+$(target).html()+'</select></div>');
            }
            
            $(target).html($(target).closest(".form-cell").find('select.dynamic_option_container').html());
            
            $(target).find("option").each(function(){
                var option = $(this);
                if ($(option).attr("grouping") != "" && $.inArray($(option).attr("grouping"), controlValues) == -1) {
                    $(option).remove();
                }
            });
        } else {
              
            $(target).find("input").each(function(){
                var option = $(this);
                var label = $(option).parent();
                if ($(option).attr("grouping") == "" || $.inArray($(option).attr("grouping"), controlValues) > -1) {
                    $(label).show();
                } else {
                    if ($(option).is(":checked")) {
                        $(option).removeAttr("checked");
                    }
                    $(label).hide();
                }
            });
        }
        $('[name='+o.paramName+']').trigger("change");
    }
})(jQuery);