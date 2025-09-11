let start = 0;

const promoMessageContainer = document.getElementById("message-container");
const message = `<div 
class="bg-red-400 text-white p-4 rounded-lg text-center" 
id="message-container-div
">
Special offer: Get 50% off on all products
</div>`;

setTimeout(() => {
  if (start === 0) {
    start = 1;
    promoMessageContainer.insertAdjacentHTML("beforeend", message);
  }
}, 5000);
