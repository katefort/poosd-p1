<?php
  $inData = getRequestInfo();

  $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "CRUD");
  if( $conn->connect_error )
  {
    returnWithError( $conn->connect_error );
  }
  else
  {
    $stmt = $conn->prepare("INSERT INTO Users (FirstName, LastName,Login,Password) VALUES (?,?,?,?)");
    $stmt->bind_param("ssss", $inData["firstname"], $inData["lastname"], $inData["login"], $inData["password"]);

     $stmt->execute();
    $stmt->close();
    $conn->close();
    returnWithError("");
  }

  function getRequestInfo()
  {
    return json_decode(file_get_contents('php://input'), true);
  }

  function sendResultInfoAsJson( $obj )
  {
    header('Content-type: application/json');
    echo $obj;
  }

  function returnWithError( $err )
  {
    $retValue = '{"error":"' . $err . '"}';
    sendResultInfoAsJson( $retValue );
  }

?>
