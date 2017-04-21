function supportsImports() {
  return 'import' in document.createElement('link');
}

if (supportsImports()) {
console.log("Pass");  
} else {
console.log("Fail");
}
