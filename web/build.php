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
    // you might want to reconsider this line when using this snippet.
    // it "could" clash with an existing directory and this line will
    // try to delete the existing one. Handle with caution.
    if (file_exists($tempfile)) { unlink($tempfile); }

    mkdir($tempfile);
    if (is_dir($tempfile)) { return $tempfile; }
}

?>
