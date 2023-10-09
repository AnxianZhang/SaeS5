<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="CSS/Connexion.css" />
    <title>Insert title here</title>
</head>
<style>
</style>

<body>
    <div class="flex-container">
        <div>
            <img src="Assets/LogoSae.png">
        </div>
        <div class="A-propos">
            <a href="#">
                <p>A propos</p>
            </a>
        </div>
        <div class="end-container">
            <div class="world">
            	<a href="#">
                	<img src="Assets/world.png">
                </a>
            </div>
			<div class="connect">
                <a href="/ProjetSae/connexion">
                	<p>Se connecter</p>
            	</a>
            </div>
            <div class="jouer">
                <a href="#">
                	<p><img src="Assets/Play.png" >Jouer</p>
            	</a>
            </div>
        </div>
    </div>
     <div class="page">
     	<div class="GlobalForm">
     		<p>Connexion</p>
    		<form action="/ProjetSae/Connexion" method="get">
  				<label>Email:</label>
  				<input type="email" name="email">
  				<label>Mot de passe: </label>
  				<input type="text" name="password">
  				<input type="submit" value="Submit">
  				<a href="/ProjetSae/register">
  					<p>Pas de compte ?</p>
  				</a>
			</form>
		</div>
    </div>
</body>

</html>