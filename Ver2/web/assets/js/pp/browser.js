function supportsImports() {
    return 'import' in document.createElement('link');
}

if (supportsImports()) {
    console.log("Pass");
} else {
    $('.spinner').append($('<div class="alert alert-danger" role="alert">"Browser is <strong>not</strong> compatible. Sorry - try chrom*</div>'));
}
