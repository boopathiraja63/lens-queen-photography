const WHATSAPP_NUMBER = "916374727954"; // Change this to your number, e.g. 919876543210

const categories = [
  ["Wedding","Elegant frames for wedding portraits"],
  ["Birthday","Birthday memories and celebration frames"],
  ["Baby","Newborn and baby milestone frames"],
  ["Family","Classic family photo frames"],
  ["God","Devotional and temple frames"],
  ["Memorial","Respectful remembrance frames"],
  ["Collage","Multiple photos in one frame"]
];

const sizes = [
  {label:"6×4", value:"6x4", price:300},
  {label:"12×8", value:"12x8", price:600},
  {label:"10×15", value:"10x15", price:900},
  {label:"12×15", value:"12x15", price:1200},
  {label:"12×18", value:"12x18", price:1600},
  {label:"16×24", value:"16x24", price:2200},
  {label:"16×36", value:"16x36", price:2700},
  {label:"18×24", value:"18x24", price:3200},
  {label:"20×24", value:"20x24", price:3600},
  {label:"30×40", value:"30x40", price:4500}
];

let selectedSize = sizes[0];

const catWrap = document.getElementById("frameCategories");
categories.forEach((c,i)=>{
  const card = document.createElement("div");
  card.className="category-card";
  card.innerHTML = `<span class="num">0${i+1}</span><h3>${c[0]}</h3><p>${c[1]}</p>`;
  card.addEventListener("click",()=>{
    document.getElementById("category").value=c[0];
    document.getElementById("order").scrollIntoView({behavior:"smooth"});
  });
  catWrap.appendChild(card);
});

const sizeGrid = document.getElementById("sizeGrid");
sizes.forEach((s,i)=>{
  const btn=document.createElement("button");
  btn.type="button";
  btn.className="size-btn"+(i===0?" active":"");
  btn.textContent=`${s.label} · ₹${s.price}`;
  btn.addEventListener("click",()=>{
    selectedSize=s;
    document.querySelectorAll(".size-btn").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    updatePrice();
  });
  sizeGrid.appendChild(btn);
});

const previewImage=document.getElementById("previewImage");
const previewPlaceholder=document.getElementById("previewPlaceholder");

document.getElementById("photoUpload").addEventListener("change",(e)=>{
  const file=e.target.files?.[0];
  if(!file) return;
  const reader=new FileReader();
  reader.onload=()=>{
    previewImage.src=reader.result;
    previewImage.style.display="block";
    previewPlaceholder.style.display="none";
  };
  reader.readAsDataURL(file);
});

const frameType=document.getElementById("frameType");
const totalPrice=document.getElementById("totalPrice");
const priceBreakdown=document.getElementById("priceBreakdown");
const preview=document.getElementById("livePreview");

function updatePrice(){
  const extra=Number(frameType.selectedOptions[0].dataset.extra || 0);
  const total=selectedSize.price+extra;
  totalPrice.textContent=`₹${total.toLocaleString("en-IN")}`;
  priceBreakdown.textContent=`${selectedSize.label} · ${frameType.value}`;

  if(frameType.value==="Premium Gold"){
    preview.style.borderColor="#8e6b16";
    preview.style.outlineColor="#f2d978";
  } else if(frameType.value==="Elegant White"){
    preview.style.borderColor="#efefef";
    preview.style.outlineColor="#bfbfbf";
  } else if(frameType.value==="Wood Finish"){
    preview.style.borderColor="#4e2f1b";
    preview.style.outlineColor="#b98b5f";
  } else {
    preview.style.borderColor="#111";
    preview.style.outlineColor="#caa33b";
  }
}
frameType.addEventListener("change",updatePrice);
updatePrice();

document.getElementById("orderForm").addEventListener("submit",(e)=>{
  e.preventDefault();

  const name=document.getElementById("customerName").value.trim();
  const mobile=document.getElementById("mobile").value.trim();
  const address=document.getElementById("address").value.trim();
  const category=document.getElementById("category").value;
  const extra=Number(frameType.selectedOptions[0].dataset.extra || 0);
  const finalPrice=selectedSize.price+extra;

  const msg=`*Lens Queen Photo Frames - New Order*

Name: ${name}
Mobile: ${mobile}
Category: ${category}
Size: ${selectedSize.label}
Frame Type: ${frameType.value}
Price: ₹${finalPrice.toLocaleString("en-IN")}
Address: ${address}

I will send the customer photo separately on WhatsApp.`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,"_blank");
});

document.getElementById("contactWhatsApp").addEventListener("click",(e)=>{
  e.preventDefault();
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Lens Queen Photo Frames, I want to order a photo frame.")}`,"_blank");
});

const lightbox=document.getElementById("lightbox");
const lightboxImage=document.getElementById("lightboxImage");
document.querySelectorAll(".gallery-card.real").forEach(card=>{
  card.addEventListener("click",()=>{
    lightboxImage.src=card.dataset.full;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden","false");
  });
});
function closeLightbox(){
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden","true");
}
document.getElementById("lightboxClose").addEventListener("click",closeLightbox);
lightbox.addEventListener("click",e=>{if(e.target===lightbox) closeLightbox();});
document.addEventListener("keydown",e=>{if(e.key==="Escape") closeLightbox();});
