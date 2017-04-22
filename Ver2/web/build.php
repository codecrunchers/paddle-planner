<?php
exec('echo "Running Build" > /tmp/build');
$tmpdir = tempdir(); 
exec("git clone https://github.com/codecrunchers/paddle-planner.git $tmpdir");
exec("rm /var/www/html/* -fR");
exec("cp $tmpdir/Ver2/web/* /var/www/html/ -R");
exec('cat /var/www/html/version >> /tmp/build');
exec("rm -fR $tmpdir");


function tempdir() {
    $tempfile=tempnam(sys_get_temp_dir(),'');
    mkdir($tempfile);
    if (is_dir($tempfile)) { return $tempfile; }
}

?>
