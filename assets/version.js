export async function getVersion(){
  const res = await fetch('../package.json');
  const pkg = await res.json();
  return pkg.version;
}