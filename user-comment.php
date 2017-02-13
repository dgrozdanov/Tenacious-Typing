<html>
  <body>

<?php

require('/var/www/sqlconnect.php');

$name = $_POST['name'];
$comment = $_POST['comment'];

//echo "login acquired";

//mysql_select_db("usercomments", $con);

//echo "database selected";

//echo 'INSERT INTO comments(name, comment) VALUES (' . "$name" . ',' . "$comment" . ')';

$sql = "INSERT INTO comments(name, comment)
VALUES ('$name', '$comment')";

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
