<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Hello!</title>
</head>

<body>

<?php

// List Directory Contents

    $path = "./"; // full path to the folder
    $url = "http://localhost/"; // URL to files
    // you must add slash (/) at the end

    // Open the folder
    $dir_handle = @opendir($path) or die("Unable to open $path");
    $a=array("file"=>array(),"dir"=>array());
    $i=array("file"=>0,"dir"=>0);
    // Loop through the files
    while ($file = readdir($dir_handle)) {
      if($file == "." || $file == "..")
        continue;
      if (is_file($path.$file)) {
        $a["file"][$i["file"]]="<a href=\"$url$file\">[FILE] $file</a><br />";
        $i["file"]++;
        //echo "<a href=\"$url$file\">[FILE] $file</a><br />";
      } else {
        $a["dir"][$i["dir"]]="<a href=\"$url$file\">[DIR] $file</a><br />";
        $i["dir"]++;
        //echo "<a href=\"$url$file\">[DIR] $file</a><br />";
        //echo "$file [DIR]<br />";
      }
    }
    sort($a["file"]);
    sort($a["dir"]);
    //print_r($a);
    //echo count($a["dir"]);
    for($j=0;$j<=(count($a["dir"])-1);$j++)
    {
       echo $a["dir"][$j];
    }
    for($j=0;$j<=(count($a["file"])-1);$j++)
    {
       echo $a["file"][$j];
    }

    // Close
    closedir($dir_handle);
?>

</body>

</html>
