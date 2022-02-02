<?php
  $inData = getRequestInfo();

  $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "CRUD");
  if( $conn->connect_error )
  {
    returnWithError( $conn->connect_error );
  }
  else
  {
    $stmt = $conn->prepare("DELETE FROM Contacts WHERE FirstName=? AND LastName=? AND ID = ?");
    $stmt->bind_param("ssi", $inData["firstname"], $inData["lastname"], $inData["id"]);
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
