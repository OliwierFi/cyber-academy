
// Simple avatar customizer placeholder
export function initAvatar(){
  // load avatar from localStorage
  const av = JSON.parse(localStorage.getItem('avatar')||'{}');
  console.log('avatar', av);
}
