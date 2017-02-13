<html>
  <body>

<?php

require('/var/www/sqlconnect.php');

$displayName = $_POST['displayName'];
$email = $_POST['email'];
$uid = $_POST['uid'];

//echo "login acquired";

//mysql_select_db("usercomments", $con);

//echo "database selected";

//echo 'INSERT INTO comments(name, comment) VALUES (' . "$name" . ',' . "$comment" . ')';

//IF NOT EXISTS (SELECT * FROM loginInfo WHERE id = displayName)
//BEGIN
//--do what you need if exists
//END

echo 'DisplayName: ' . $displayName . ' email: ' . $email . ' uid ' . $uid;

$sql = "INSERT INTO loginInfo(displayName, email, uid)
VALUES ('$displayName', '$email', '$uid')";

if ($con->query($sql) === TRUE) {

  //echo 'New record created successfully';
}
else {

  echo 'Error: ' . $sql . '<br>' . $con->error;
}

mysqli_close($con);

?>

</body>
</html>
