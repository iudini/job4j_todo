<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/auth.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <title>Регистрация</title>
</head>
<body class="text-center">
<div class="container">
    <h1 class="h3 mb-3 font-weight-normal">Регистрация</h1>
    <form class="form-signin" action="<%=request.getContextPath()%>/reg.do" method="post">
        <div id="auth-info"></div>
        <input type="text" class="form-control" id="login" name="login" placeholder="Введите имя">
        <input type="password" class="form-control" id="password" name="password" placeholder="Введите пароль">
        <p><c:out value="${error}"/></p>
        <button class="btn btn-lg btn-primary btn-block" type="submit" onclick="return validate();">Регистрация</button>
    </form>
</div>
</body>
<script>
    function validate() {
        if ($('#login').val()==='') {
            alert('Введите логин');
            return false;
        }
        if ($('#password').val()==='') {
            alert('Введите пароль');
            return false;
        }
        return true;
    }
</script>
</html>