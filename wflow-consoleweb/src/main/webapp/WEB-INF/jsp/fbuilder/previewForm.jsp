<%@ include file="/WEB-INF/jsp/includes/taglibs.jsp" %>
<%@ page import="org.joget.workflow.util.WorkflowUtil"%>

<%
    String rightToLeft = WorkflowUtil.getSystemSetupValue("rightToLeft");
    pageContext.setAttribute("rightToLeft", rightToLeft);
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/jquery/themes/ui-lightness/jquery-ui-1.10.3.custom.css">
        <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery/jquery-1.9.1.min.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery/jquery-migrate-1.2.1.min.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery/ui/jquery-ui-1.10.3.min.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/js/json/formUtil.js?build=<fmt:message key="build.number"/>"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/js/json/ui.js?build=<fmt:message key="build.number"/>"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/js/json/util.js?build=<fmt:message key="build.number"/>"></script>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/form.css?build=<fmt:message key="build.number"/>" />
        
        <c:if test="${rightToLeft == 'true' || fn:startsWith(currentLocale, 'ar') == true}">
            <link rel="stylesheet" href="${pageContext.request.contextPath}/css/form_rtl.css?build=<fmt:message key="build.number"/>" />
        </c:if>
            
        <script type="text/javascript">
            var reloadForm = function() {
                $('#form-preview').submit();
                return false;
            };
            $(document).ready(function() {
                // add toggle json link
                $("#form-json-link").click(function() {
                    if ($("#form-info").css("display") != "block") {
                        $("#form-info").css("display", "block");
                    } else {
                        $("#form-info").css("display", "none");
                    }
                });
                // disable form buttons
                $("#form-view .form-button").attr("disabled", "disabled");
            });
        </script>
    </head>
    <body>

        <fieldset id="form-canvas">

            <c:out value="${elementTemplate}" escapeXml="false" />

            <p>&nbsp;</p>
            <!--a href="#" id="form-json-link" style="font-size: smaller" onclick="return false">DEBUG: Show JSON</a>
            <div id="form-info" style="display: none">
                <form id="form-preview" method="post">
                    <textarea id="form-json" name="json" cols="80" rows="10" style="font-size: smaller"><c:out value="${elementJson}" escapeXml="false" /></textarea>
                </form>
                <button onclick="reloadForm()">Reload</button>
            </div-->
        </fieldset>

        <!--[if IE]><div id="preview-label" class="ie"><fmt:message key="fbuilder.preview"/></div><![endif]-->
        <!--[if !IE]><!--><div id="preview-label"><fmt:message key="fbuilder.preview"/></div><!--<![endif]-->        
                
    </body>
</html>
