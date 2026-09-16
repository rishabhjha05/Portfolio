const profileLinks = [
  'https://www.linkedin.com/in/rishabh-kumar-jha/',
  'https://github.com/rishabhjha05',
  'https://leetcode.com/u/rishabh_kr_jha/',
  'https://codolio.com/profile/RishabhJha',
];
async function getData() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    console.log('Data fetched successfully');
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
const Data = await getData();
console.log(Data);

const projects = document.querySelectorAll('.project');
projects.forEach((project) => {
  project.addEventListener('dblclick', (e) => {
    const idx = parseInt(project.id.match(/\d+$/)[0])-1;
    window.open(`${Data.projects[idx].checkOutLink}`, '_blank');
  });
});

const certificates = document.querySelectorAll('.certificate');
certificates.forEach((certificate) => {
  certificate.addEventListener('dblclick', (e) => {
    const idx = parseInt(certificate.id.match(/\d+$/)[0]) - 1;
    window.open(`${Data.certificates[idx].checkOutLink}`, '_blank');
  });
});
const body = document.querySelector('body');
const popUp = document.querySelector('#popUp');
const crossPopUp = document.querySelector('#popUp');
crossPopUp.addEventListener('click', () => popUp.classList.add('hide'));
body.addEventListener('click', (e) => {
  if (e.target.closest('.project')) {
    const projectId = e.target.closest('.project').id.match(/\d$/)[0];
    const proj = Data.projects[projectId - 1];
    let techStack = '';
    proj.techStack.forEach((tech) => (techStack += `<span>${tech}</span>`));

    console.log(proj);
    popUp.innerHTML = `
    <i class="fa-solid fa-xmark cross-popup"></i>
        <img src="${proj.src}" alt="globia-preveiw"/>
        <h2>${proj.title}</h2>
        <p>${proj.description}</p>
        <div class="tech-stack">
          ${techStack}
        </div>
        <a href="${proj.checkOutLink}" id="check-out" target="_blank">Check Out</a>
    `;
    console.log(e.target.closest('.project'));
    popUp.classList.remove('hide');
  } else if (e.target.closest('.certificate')) {
    const certificateId = e.target.closest('.certificate').id.match(/\d$/)[0];
    const cert = Data.certificates[certificateId - 1];
    let techStack = '';
    cert.techStack.forEach((tech) => (techStack += `<span>${tech}</span>`));
    console.log(cert);
    popUp.innerHTML = `
        <i class="fa-solid fa-xmark cross-popup"></i>
        <img src="${cert.src}" alt="globia-preveiw" />
        <h2>${cert.title}</h2>
        <p>${cert.description}</p>
        <div class="tech-stack">
          ${techStack}
        </div>
        <a href="${cert.checkOutLink}" id="check-out" target="_blank">Check Out</a>
    `;
    console.log(e.target.closest('#popUp'));
    popUp.classList.remove('hide');
  } else if(!e.target.closest('#popUp') || e.target.closest('.cross-popup')) popUp.classList.add('hide');
  else popUp.classList.remove('hide');
});

const profiles = document.querySelectorAll('#profile-link');
profiles.forEach((profile) => {
  profile.addEventListener('click', (e) => {
    const idx = parseInt(profile.classList[0]) - 1;
    if (idx < 4) window.open(`${profileLinks[idx]}`, '_blank');
    else if (idx === 4)
      window.location.href = 'mailto:rishabhjha012043@gmail.com';
    else window.location.href = 'tel:+918505926128';
  });
});

const changingSpan = document.querySelector('#changing-text');
// const words = ['Rishabh', 'Developer', 'Coder','Thinker'];
const words = ['web developer', 'coder', 'thinker'];
let wordIdx = 0;
let word = words[wordIdx++];
let backTyping = false;
let idx = 0;
const intervalId = setInterval(() => {
  if (idx == word.length) backTyping = true;
  if (!backTyping) {
    changingSpan.textContent += word[idx++];
  } else {
    changingSpan.textContent = word.slice(0, idx - 1);
    idx--;
  }
  if (idx == 0) {
    if (wordIdx == words.length) wordIdx = 0;
    backTyping = false;
    word = words[wordIdx++];
  }
}, 165);

const contactChangingSpan = document.querySelector('#contactChangingSpan');
function TypingOn(obj, word) {
  let backTyping = false;
  let i = 0;
  setInterval(() => {
    if (i == word.length) backTyping = true;
    if (!backTyping) obj.textContent += word[i++];
    else {
      obj.textContent = word.slice(0, i-1);
      i--;
    }
    if (i == 0) backTyping = false;
  }, 250);
}
TypingOn(contactChangingSpan,'...')
