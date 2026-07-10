// Gallery page script — uses Vite import.meta.glob to load images from /assets
const modules = import.meta.glob('/assets/*.{jpg,jpeg,png}', { eager: true, as: 'url' });

const images = Object.values(modules)
  .filter((url) => Boolean(url) && !/\/assets\/logo\.[a-z0-9]+$/i.test(url))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const grid = document.getElementById('grid');
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbClose = document.getElementById('lbClose');
const downloadAll = document.getElementById('downloadAll');

function createCard(src, idx){
  const a = document.createElement('a');
  a.className = 'card';
  a.href = '#';
  a.dataset.src = src;
  const img = document.createElement('img');
  img.src = src;
  img.alt = 'Gallery image';
  a.appendChild(img);
  a.addEventListener('click', (e) => {
    e.preventDefault();
    openLightbox(src);
  });
  return a;
}

function openLightbox(src){
  lbImg.src = src;
  lb.classList.add('open');
  lb.setAttribute('aria-hidden','false');
}

function closeLightbox(){
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden','true');
  lbImg.src = '';
}

lbClose.addEventListener('click', (e)=>{ e.preventDefault(); closeLightbox(); });
lb.addEventListener('click', (e)=>{ if(e.target===lb) closeLightbox(); });
window.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeLightbox(); });

if(images.length){
  images.forEach((src, i)=>{
    const card = createCard(src, i);
    grid.appendChild(card);
  });
  // download all: create zip? fallback to opening folder — here we'll compile a simple multi-download helper
  downloadAll.addEventListener('click', async (e)=>{
    e.preventDefault();
    // For each image, open in new tab (browser will handle downloads if user right-clicks)
    images.forEach((src)=> window.open(src, '_blank'));
  });
} else {
  const p = document.createElement('p');
  p.className = 'note';
  p.textContent = 'No images found in /assets. Please add images to the repo assets folder.';
  grid.appendChild(p);
}

// Lazy load images (optional) — images loaded already thanks to eager glob, but browsers will still lazy if set
const imgs = document.querySelectorAll('#grid img');
imgs.forEach(img => img.loading = 'lazy');
