<?php
  $inData = getRequestInfo();

  $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "CRUD");
  if( $conn->connect_error )
  {
    returnWithError( $conn->connect_error );
  }
  else
  {
    $stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, PhoneNumber=?, Email=? WHERE FirstName=? AND LastName =? AND ID = ?");
    $stmt->bind_param("ssssssi", $inData["firstname"], $inData["lastname"],$inData["phonenumber"],$inData["email"],$inData["previousfirstname"],$inData["previouslastname"],$inData["id"]);
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
